/*
	AnimatedGraph.js
	Contains the model, associated views and controllers. Responsible for updating everything.
*/

function AnimatedGraph(ts){
	this.model = new ForceGraph(ts);
	this.views = new Array();
	this.controllers = new Array();
};

AnimatedGraph.prototype.createCanvas=function(id,width,height){
	//Create view and subscribe it to model
	this.views[id] = new CanvasView(id,width||640,height||480);
	this.model.subscribe(this.views[id].redraw, this.views[id]);
	//Create controller of the view and connect it to the model
	this.controllers[id] = new CanvasController(this.model,this.views[id]);
	//Return the new canvas
	return this.getCanvas(id);
};

AnimatedGraph.prototype.getCanvas = function(id){
	return this.views[id].domelement;
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
