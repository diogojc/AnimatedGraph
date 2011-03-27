/*
	Vector.js
	3 dimentional vector Class
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
}
