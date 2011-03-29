/*
	AnimatedGraph.js
	Contains the model and associated views. Responsible for updating everything.
*/

function AnimatedGraph(){
	this.view = null;
	this.model = new ForceGraph();
	this.isrunning = null;
};

AnimatedGraph.prototype.createView = function(width,height){	
	this.view = this.view || new CanvasView(this.model,width||640,height||480);
	return this.view.domelement;
};

AnimatedGraph.prototype.run = function(ts){
	this.stop();

	var that=this;
	ts = ts || 25;
	function dotimestep(){that.timestep();};
	this.isrunning = setInterval(dotimestep,ts);
};

AnimatedGraph.prototype.timestep = function(){
	this.model.timestep(25);
	this.view.redraw();
};

AnimatedGraph.prototype.stop = function(){
	if(this.isrunning)
		clearInterval(this.isrunning);
};


AnimatedGraph.prototype.addNode=function(content){
	this.model.addNode(content);
};

AnimatedGraph.prototype.remNode=function(content){
	this.model.remNode(content);
};

AnimatedGraph.prototype.addEdge=function(c1,c2){
	this.model.addEdge(c1,c2);
};

AnimatedGraph.prototype.remEdge=function(c1,c2){
	this.model.remEdge(c1,c2);
};
