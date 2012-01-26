/*
	CanvasController.js
	Controller of a given CanvasView. Associates appropriate event handlers with that view to change associated model.
*/

function CanvasController(model, view){
	//Register model and view
	this.model = model;
	this.view = view;

	//Register callbacks
	var that = this;
	this.view.domelement.addEventListener('mousedown',function(e){that.mousedown(e);},false);
	this.view.domelement.addEventListener('mousemove',function(e){that.mousemove(e);},false);
	this.view.domelement.addEventListener('DOMMouseScroll',function(e){that.mousescroll(e);},false);
	this.view.domelement.addEventListener('mousewheel',function(e){that.mousescroll(e);},false);
}




/*
Helper functions
*/

//Finds cursor position relative to the DOMElement of view, the absolute position inside the referencial of view.
CanvasController.prototype.getAbsoluteCoord=function(e){
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

	//Return cursor position
	return new Vector(cursor.x,cursor.y,0);
};

//Using the absolute position finds the relative position inside the referencial view, the real position.
CanvasController.prototype.getRelativeCoord=function(e){
	//Get the absolute position of mouse inside the view DOM element
	var absolutecoord = this.getAbsoluteCoord(e);
	//Apply transformations of view and get real position
	return this.AbsoluteToRelativeCoord(absolutecoord);
};
CanvasController.prototype.AbsoluteToRelativeCoord=function(absolutecoord){
	//Translate coord
	var relativecoord = absolutecoord.minus(this.view.translation);
	//Scale coord
	var k = this.view.scale;
	relativecoord = new Vector(relativecoord.x/k,relativecoord.y/k,relativecoord.z/k);

	return relativecoord;
};
CanvasController.prototype.getScrollDirection=function(event){
	//Adapted from http://www.adomas.org/javascript-mouse-wheel/
	var delta = 0;
        if (!event) /* For IE. */
                event = window.event;
        if (event.wheelDelta) { /* IE/Opera. */
                delta = event.wheelDelta/120;
                /* In Opera 9, delta differs in sign as compared to IE. */
                if (window.opera)
                        delta = -delta;
        } else if (event.detail) { /* Mozilla case. */
                /* In Mozilla, sign of delta is different than in IE. Also, delta is multiple of 3. */
                delta = -event.detail/3;
        }
        /* If delta is nonzero, handle it.
         * Basically, delta is now positive if wheel was scrolled up,
         * and negative, if wheel was scrolled down.
         */
	if( delta<0 )
		return 'down';
	else if( delta>0 )
		return 'up';
	else
		return null;
};















/*
Callbacks
*/

//Callback on mousedown in view
CanvasController.prototype.mousedown=function(e){
	var that = this;

	//If button pressed on top of node not being currently dragged start dragging node
	var n = this.model.getNodeAt(this.getRelativeCoord(e));
	if( n && n.enabled){
		n.enabled=false;
		this.view.domelement.addEventListener('mousemove',movenode=function(e){that.movenode(e,n);},false);
		this.view.domelement.addEventListener('mouseup',releasenode=function(e){that.releasenode(e,n);},false);
		this.view.domelement.addEventListener('mouseout',releasenode2=function(e){that.releasenode(e,n);},false);
	}

	//If button pressed on top of empty space start panning view
	else {
		var absoluteorig = that.getAbsoluteCoord(e);
		var inittrans = this.view.translation;
		this.view.domelement.addEventListener('mousemove',pan=function(e){that.pan(e,absoluteorig,inittrans);},false);
		this.view.domelement.addEventListener('mouseup',endpan=function(e){that.endpan(e);},false);
		this.view.domelement.addEventListener('mouseout',endpan2=function(e){that.endpan(e);},false);
	}

};
//Callback to drag selected node
CanvasController.prototype.movenode=function(e,n){
	n.position = this.getRelativeCoord(e);
};
//Callback to release dragged node
CanvasController.prototype.releasenode=function(e,n){
	n.enabled=true;
	this.view.domelement.removeEventListener('mousemove',movenode,false);
	this.view.domelement.removeEventListener('mouseup',releasenode,false);
	this.view.domelement.removeEventListener('mouseout',releasenode2,false);
};
//Callback to pan view
CanvasController.prototype.pan=function(e,absoluteorig,inittrans){
	var relativeorig = this.AbsoluteToRelativeCoord(absoluteorig);
	var relativedest = this.getRelativeCoord(e);
	var relativedisplacement = relativedest.minus(relativeorig).product(this.view.scale);
	this.view.translation = inittrans.add(relativedisplacement);
};
//Callback to end pan
CanvasController.prototype.endpan=function(e){
	this.view.domelement.removeEventListener('mousemove',pan,false);
	this.view.domelement.removeEventListener('mouseup',endpan,false);
	this.view.domelement.removeEventListener('mouseout',endpan2,false);
};







//Callback on mousemove in view
CanvasController.prototype.mousemove=function(e){
	var node=this.model.getNodeAt(this.getRelativeCoord(e));
	if(node)
		return;//alert(node);
};







//Callback on mousescroll in view
CanvasController.prototype.mousescroll=function(e){
	var direction = this.getScrollDirection(e);
	if(!direction)
		return;
	//Zoom in/out around view center
	var width = this.view.domelement.getAttribute('width');
	var height = this.view.domelement.getAttribute('height');
	var oldcenter = this.AbsoluteToRelativeCoord(new Vector(width/2,height/2,0));
	if(direction=='up'){
		//Zoom in
		this.view.scale *= 1.05;
	}else{
		//Zoom out
		this.view.scale *= 0.95;
	}
	var newcenter = this.AbsoluteToRelativeCoord(new Vector(width/2,height/2,0));
	var D = newcenter.minus(oldcenter).product(this.view.scale);
	this.view.translation = this.view.translation.add(D);

};
