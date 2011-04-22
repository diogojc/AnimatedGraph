/*
	ForceNode.js
	Representation of a physical spheric object subject to external forces
*/

function ForceNode(content){
	//A sphere positioned in the origin with 0 velocity with 1Kg mass, 2E-6 Coulombs and 8cm radius
	this.content=content;
	this.position = new Vector(0,0,0);
	this.velocity = new Vector(0,0,0);
	this.mass = 1;
	this.charge = 0.000002;
	this.radius = 8.0;
	this.enabled = true;
};

ForceNode.prototype.toString=function(){
	return this.content.toString();
};

