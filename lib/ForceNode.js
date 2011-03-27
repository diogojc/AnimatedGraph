/*
	ForceNode.js
	Representation of physical object subject to external forces
*/

function ForceNode(content){
	this.content=content;
	this.position = new Vector(0,0,0);
	this.velocity = new Vector(0,0,0);
	this.mass = 1;
	this.charge = 0.000002;
};

ForceNode.prototype.toString=function(){
	return this.content.toString();
};

