/*
	CanvasView.js
	View of model using the canvas element
*/

function CanvasView(id,model,width,height){
	this.domelement = document.createElement('canvas');
	this.domelement.setAttribute('id',id)
	this.domelement.setAttribute('width',width);
	this.domelement.setAttribute('height',height);
	this.model = model;

	this.translation = new Vector(width/2.0,height/2.0,0);
	this.rotation = 0;
	this.scaling = new Vector(1,1,0);
};

CanvasView.prototype.redraw=function(){
	var width = this.domelement.getAttribute('width');
	var height = this.domelement.getAttribute('height');

	var cxt = this.domelement.getContext('2d');
	cxt.save();
	cxt.clearRect(0,0,width,height);
	cxt.translate(this.translation.x,this.translation.y);
	cxt.rotate(this.rotation);
	cxt.scale(this.scaling.x,this.scaling.y);

	cxt.textAlign="center";
	cxt.textBaseline="middle";
	cxt.font="10pt Arial";
	cxt.strokeStyle="rgb(186,180,163)";


	for(var edge in this.model.edges){
		with(this.model.edges[edge]){
			cxt.beginPath();
			cxt.moveTo(origin.position.x, origin.position.y);
			cxt.lineTo(destination.position.x, destination.position.y);
			cxt.stroke();
		}
	}

	for(var node in this.model.nodes){
		with(this.model.nodes[node]){		
			cxt.beginPath();
			cxt.arc(position.x,position.y,radius,0,Math.PI*2,true);
			cxt.fillStyle="rgb(217,147,61)";
			cxt.stroke();
			cxt.fill();
			cxt.fillStyle="rgb(0,0,0)";
			cxt.fillText(node,position.x,position.y);
		}
	}
	cxt.restore();
};
