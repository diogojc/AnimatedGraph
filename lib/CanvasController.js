/*
	CanvasController.js
	Controller of a given CanvasView. Associates appropriate event handlers with that view to change associated model.
*/

function CanvasController(model, view){
	this.model = model;
	this.view = view;

	that = this;
	this.view.domelement.addEventListener('mousedown',function(){that.mousedown();},false);
	this.view.domelement.addEventListener('mouseup',function(){that.mouseup();},false);
};

CanvasController.prototype.mousedown=function(){
	//Register mousemove to handle positioning of node
	that = this;
	this.view.domelement.addEventListener('mousemove',function(){that.mousemove();},false);
	
};

CanvasController.prototype.mouseup=function(){
	//Remove handler of positioning of node
	that = this;
	this.view.domelement.removeEventListener('mousemove',function(){that.mousemove();},false);
};

CanvasController.prototype.mousemove=function(){
	//Change node position
};
