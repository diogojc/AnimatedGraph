/*
	CanvasController.js
	Controller of a given CanvasView. Associates appropriate event handlers with that view to change associated model.
*/

function CanvasController(model, view){
	this.model = model;
	this.view = view;

	var that = this;
	this.view.domelement.addEventListener('mousedown',function(e){that.mousedown(e);},true);
	this.view.domelement.addEventListener('mouseup',function(e){that.mouseup(e);},true);
};

CanvasController.prototype.getViewCoord=function(e){
	//Get cursor absolute location	
	var cursor = {x:0, y:0};
	if (e.pageX || e.pageY) {
		cursor.x = e.pageX;
		cursor.y = e.pageY;
	}else {
		cursor.x = e.clientX +
		(document.documentElement.scrollLeft ||
		document.body.scrollLeft) -
		document.documentElement.clientLeft;
		cursor.y = e.clientY +
		(document.documentElement.scrollTop ||
		document.body.scrollTop) -
		document.documentElement.clientTop;
	}
	//Get offset of element
	var curleft = curtop = 0;
	var obj = this.view.domelement;
	while(obj) {
		curleft += obj.offsetLeft;
		curtop += obj.offsetTop;
		obj = obj.offsetParent;
	}
	//Find the cursor relative position to view
	cursor.x -= curleft;
	cursor.y -= curtop;

	//Find the cursor real position in view referencial

	//Return cursor position
	return new Vector(cursor.x,cursor.y,0);
}

CanvasController.prototype.mousedown=function(e){
	//Register mousemove to handle positioning of node
	var that = this;
	this.view.domelement.addEventListener('mousemove',function(){that.mousemove();},false);
};

CanvasController.prototype.mouseup=function(){
	//Remove handler of positioning of node
	var that = this;
	this.view.domelement.removeEventListener('mousemove',function(){that.mousemove();},false);
};

CanvasController.prototype.mousemove=function(){
	//Change node position
};
