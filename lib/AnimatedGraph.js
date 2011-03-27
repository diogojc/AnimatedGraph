/*
	AnimatedGraph.js
	Contains the model and associated views. Responsible for updating everything.
*/

function AnimatedGraph(){
	this.canvas=null;
	this.model = new ForceGraph();
	this.isrunning=null;
};

AnimatedGraph.prototype.createCanvas = function(width,height){
	if(!this.canvas)	
		this.canvas = document.createElement('canvas');
	this.canvas.setAttribute('width',width);
	this.canvas.setAttribute('height',height);
};

AnimatedGraph.prototype.run = function(ts){
	if(this.isrunning!=null)
		clearInterval(this.isrunning);

	var that=this;
	ts = ts || 25;
	function dotimestep(){that.timestep();};
	this.isrunning = setInterval(dotimestep,ts);
};

AnimatedGraph.prototype.timestep = function(){
	this.model.timestep(25);
	this.redrawCanvas();
};

AnimatedGraph.prototype.redrawCanvas = function(){
	var width = this.canvas.getAttribute('width');
	var height = this.canvas.getAttribute('height');

	var cxt = this.canvas.getContext('2d');
	cxt.clearRect(0,0,width,height);

	for(edge in this.model.edges){
		with(this.model.edges[edge]){
			cxt.beginPath();
			cxt.strokeStyle="rgb(186,180,163)";
			cxt.moveTo(origin.position.x, origin.position.y);
			cxt.lineTo(destination.position.x, destination.position.y);
			cxt.stroke();
			cxt.closePath();
		}
	}
	cxt.textAlign="center";
	cxt.textBaseline="middle";
	cxt.font="10pt Arial";
	for(node in this.model.nodes){
		with(this.model.nodes[node]){		
			cxt.beginPath();
			cxt.arc(position.x,position.y,8,0,Math.PI*2,true);
			cxt.strokeStyle="rgb(186,180,163)";
			cxt.fillStyle="rgb(217,147,61)";
			cxt.stroke();
			cxt.fill();
			cxt.fillStyle="rgb(0,0,0)";
			cxt.fillText(node,position.x,position.y);
		}
	}
		
};

AnimatedGraph.prototype.addNode=function(content){
	this.model.addNode(new ForceNode(content));
};

AnimatedGraph.prototype.remNode=function(content){
	this.model.remNode(new ForceNode(content));
};

AnimatedGraph.prototype.addEdge=function(c1,c2){
	this.model.addEdge(new ForceNode(c1),new ForceNode(c2));
};

AnimatedGraph.prototype.remEdge=function(c1,c2){
	this.model.remEdge(new ForceNode(c1),new ForceNode(c2));
};
