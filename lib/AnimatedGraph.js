/*
	AnimatedGraph.js
	Contains the model, associated views and controllers. Responsible for updating everything.
*/

function AnimatedGraph(ts){
	this.model = new ForceGraph();
	this.views = new Array();
	this.controllers = new Array();
	this.run(ts);
};

AnimatedGraph.prototype.createCanvas=function(id,width,height){
	this.views[id] = new CanvasView(id,this.model,width||640,height||480);
	this.controllers[id] = new CanvasController(this.model,this.views[id]);
	return this.getCanvas(id);
};

AnimatedGraph.prototype.getCanvas = function(id){
	return this.views[id].domelement;
};

AnimatedGraph.prototype.timestep = function(ts){
	this.model.timestep(ts);
	for(var view in this.views)
		this.views[view].redraw();
};

AnimatedGraph.prototype.run = function(ts){
	this.stop();
	var that=this;
	ts = ts || 25;
	function dotimestep(){that.timestep(ts);};
	this.isrunning = setInterval(dotimestep,ts);	
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
