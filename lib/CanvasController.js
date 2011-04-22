/*
	CanvasController.js
	Controller of a given CanvasView. Associates appropriate event handlers with that view to change associated model.
*/

function CanvasController(model, view){
	this.model = model;
	this.view = view;

	var that = this;
	this.view.domelement.addEventListener('mousedown',function(e){that.mousedown(e);},false);
	this.view.domelement.addEventListener('mousemove',function(e){that.mousemove(e);},false);
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
	var curleft = 0;
	var curtop = 0;
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
	cursor.x-=this.view.translation.x;
	cursor.y-=this.view.translation.y;

	//Return cursor position
	return new Vector(cursor.x,cursor.y,0);
};

//Callback on mousedown in view
CanvasController.prototype.mousedown=function(e){
	var that=this;
	//If user catches a node register callbacks to drag and release node
	if( (n=this.model.getNodeAt(this.getViewCoord(e))) && n.enabled){
		n.enabled=false;
		this.view.domelement.addEventListener('mousemove',movenode=function(e){that.movenode(e,n);},false);
		this.view.domelement.addEventListener('mouseup',releasenode=function(e){that.releasenode(e,n);},false);
		this.view.domelement.addEventListener('mouseout',releasenode=function(e){that.releasenode(e,n);},false);
	}
};

//Callback to drag selected node
CanvasController.prototype.movenode=function(e,n){
	n.position = this.getViewCoord(e);
};

//Callback to release dragged node
CanvasController.prototype.releasenode=function(e,n){
	this.view.domelement.removeEventListener('mousemove',movenode,false);
	n.enabled=true;
};

//Callback on mousemove in view
CanvasController.prototype.mousemove=function(e){
	if(node=this.model.getNodeAt(this.getViewCoord(e)))
		return;//alert(node);
};
