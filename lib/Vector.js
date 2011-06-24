/*
	Vector.js
	3D Vector Class 
	Vector stored as Cartesian coordinates. Cartesian and Spherical coordinates are available.
*/

function Vector(x,y,z){
	this.x=x;
	this.y=y;
	this.z=z;
};

Vector.prototype.minus=Vector.prototype.subtract=function(v){
	return new Vector(this.x-v.x, this.y-v.y, this.z-v.z);
};

Vector.prototype.plus=Vector.prototype.add=function(v){
	return new Vector(this.x+v.x, this.y+v.y, this.z+v.z);
};

Vector.prototype.norm=function(){
	return Math.sqrt(
			Math.pow(this.x,2)+
			Math.pow(this.y,2)+
			Math.pow(this.z,2));
};

Vector.prototype.product=function(s){
	return new Vector(this.x*s, this.y*s, this.z*s);
};

Vector.prototype.division=function(s){
	return new Vector(this.x/s, this.y/s, this.z/s);
};

Vector.prototype.dotProduct=Vector.prototype.innerProduct=function(v){

};

Vector.prototype.crossProduct=Vector.prototype.outerProduct=function(v){

};

Vector.prototype.toString=function(){
	return "Vector(x:"+this.x+" y:"+this.y+" z:"+this.z+")";
};

//spherical coordinate system operations
Vector.prototype.getTheta=function(){
	return Math.acos(this.z/this.getRadius());
};

Vector.prototype.getPhi=function(){
	return Math.atan2(this.y,this.x);
};

Vector.prototype.getRadius=function(){
	return this.norm();
};

Vector.prototype.setTheta=function(theta){
	var radius = this.getRadius();
	var phi = this.getPhi();
	this.x = radius*Math.sin(theta)*Math.cos(phi);
	this.y = radius*Math.sin(theta)*Math.sin(phi);
	this.z = radius*Math.cos(theta);
};

Vector.prototype.setPhi=function(phi){
	var radius = this.getRadius();
	var theta = this.getTheta();
	this.x = radius*Math.sin(theta)*Math.cos(phi);
	this.y = radius*Math.sin(theta)*Math.sin(phi);
};

Vector.prototype.setRadius=function(radius){
	var theta = this.getTheta();
	var phi = this.getPhi();
	this.x = radius*Math.sin(theta)*Math.cos(phi);
	this.y = radius*Math.sin(theta)*Math.sin(phi);
	this.z = radius*Math.cos(theta);
};
