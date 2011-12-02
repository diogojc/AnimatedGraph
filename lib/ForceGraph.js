/*
	ForceGraph.js
	Subclass of Graph. Force directed graph model
*/

function ForceGraph(ts){
	Graph.call(this);

	//Extend functionality from Publisher class	
	var from = Publisher.prototype;
	var to = ForceGraph.prototype;
	for( var f in from )
		if( f != "constructor" && typeof from[f] == "function" && to[f] == undefined)
			to[f] = from[f];

	//Start running the simulation
	this.run(ts);
};

ForceGraph.prototype = new Graph();
ForceGraph.prototype.constructor=ForceGraph;

ForceGraph.springrest=25;
ForceGraph.springconstant=0.0001;
ForceGraph.damping=0.005;

//Start simulation
ForceGraph.prototype.run = function(ts){
	this.stop();
	var that=this;
	ts = ts || 25;
	function dotimestep(){that.timestep(ts);};
	this.isrunning = setInterval(dotimestep,ts);	
};

//Stop simulation
ForceGraph.prototype.stop = function(){
	if(this.isrunning)
		clearInterval(this.isrunning);
};

//update node position based on force directed algorithm
ForceGraph.prototype.timestep = function(dt){
	//update each node position
	for(var key in this.nodes){
		var that=this;
		var node=this.nodes[key];
		if(!node.enabled)
			continue;
		//function defining the net acceleration for the current node "that" at a given position and velocity
		function netAcceleration(p,v,dt){
			var netforce=new Vector(0,0,0);
			//calculate net force
			for(var key in that.edges){
				var origin = that.edges[key].origin;
				var destination = that.edges[key].destination;
				if(origin!=destination && (origin==node || destination==node)){
					//add force caused by edge
					var n2=(origin==node)?destination:origin;
					var distance = (p.minus(n2.position)).norm();
					var unitv = p.minus(n2.position).division(distance);
					var springdisplacement = (distance-ForceGraph.springrest)/2.0;
					var fr = Physics.hooke(ForceGraph.springconstant,springdisplacement);
					netforce = netforce.add(unitv.product(fr));
				}
			}
			for(var key in that.nodes){
				if(key!=node){
					//add force caused by node
					var n2 = that.nodes[key];
					var distance = p.minus(n2.position).norm();
					var unitv = p.minus(n2.position).division(distance);
					var fa = Physics.coulomb(node.charge,n2.charge,distance);
					netforce = netforce.add(unitv.product(fa));
				}
			}
			//obtain and return net acceleration of the node by divind the net force with its mass minus a dampening factor
			return netforce.division(node.mass).minus(node.velocity.product(ForceGraph.damping))
		};

		//calculate approximate final position and velocity with rungekutta method
		var aprox = Physics.rk4o_3d(node.position,node.velocity,netAcceleration,dt);

		//update final position and velocity
		node.position = aprox.position;
		node.velocity = aprox.velocity;
	}

	//Notice all subscribers of update
	this.publish();
};

//Overloading of methods using appropriate forcenodes objects
ForceGraph.prototype.addNode=function(content){
	var node = new ForceNode(content);
	node.position = this.newPosition();
	Graph.prototype.addNode.call(this,node);
};

//Overloading of methods using appropriate forcenodes objects
ForceGraph.prototype.addEdge=function(c1,c2){
	var n1 = new ForceNode(c1);
	Graph.prototype.addNode.call(this,n1);
	var n2 = new ForceNode(c2);
	Graph.prototype.addNode.call(this,n2);

	n1.position = this.newPosition();
	n2.position = this.newPosition();
	Graph.prototype.addEdge.call(this,n1,n2);
};

//Returns a "birth" position. Used when creating a new node in the graph.
ForceGraph.prototype.newPosition=function(){
	//calculate centroid
	var centroid = new Vector(0,0,0);
	for(var node in this.nodes)
		centroid = centroid.add(this.nodes[node].position);
	centroid = centroid.division(this.nodes.length);

	//calculate biggest distance to centroid
	var maxnorm = 50;
	for(var node in this.nodes){
		var norm = centroid.minus(this.nodes[node].position).norm();
		if(norm>maxnorm)
			maxnorm=norm;
	}

	//new position will be somewhere in a circumference that contains all the nodes
	return new Vector(maxnorm*Math.cos(Math.random()*Math.PI*2),maxnorm*Math.sin(Math.random()*Math.PI*2),0);
};

//Get node at position
ForceGraph.prototype.getNodeAt=function(pos){
	for(var node in this.nodes)
		if(this.nodes[node].position.minus(pos).norm()<(this.nodes[node].radius+5))
			return this.nodes[node];
	return null;
};
