/*
	ForceGraph.js
	Subclass of Graph. Force directed graph model
*/

function ForceGraph(){
	Graph.call(this);
};

ForceGraph.prototype = Graph.prototype;

ForceGraph.springrest=25;
ForceGraph.springconstant=0.0001;
ForceGraph.damping=0.005;

ForceGraph.prototype.scatterNodes=function(width,height){
	for(node in this.nodes){
		this.nodes[node].position.x=Math.random()*width;
		this.nodes[node].position.y=Math.random()*height;
	}
};

//update node position based on force directed algorithm
ForceGraph.prototype.timestep = function(dt){
	//update each node position
	for(key in this.nodes){
		var that=this;
		var node=this.nodes[key];
		//function defining the net acceleration for the current node "that" at a given position and velocity
		function netAcceleration(p,v,dt){
			var netforce=new Vector(0,0,0);
			//calculate net force
			for(key in that.edges){
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
			for(key in that.nodes){
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
};
