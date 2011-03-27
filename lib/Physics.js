/*
	Physics.js
	Physics library with constants, laws and 4th order Runge-Kutta method to compute final positions and velocities
*/

//library
Physics = {};

//constants
Physics.ke=9*10e9;

//laws
Physics.hooke=function(k,x){
	return -k*x;
};

Physics.coulomb=function(q1,q2,x){
	return Physics.ke*q1*q2/(x*x);
};

/*receives position and velocity vectors (p and v), acceleration function (a) and time delta (t)
returns object with final position and velocity vectors calculated with 4th order runge-kutta*/
Physics.rk4o_3d=function(p,v,a,dt){
	var p1=p;
	var v1=v;
	var a1=a(p1,v1,0);

	var p2=new Vector(p.x+0.5*v1.x*dt, p.y+0.5*v1.y*dt, p.z+0.5*v1.z*dt);
	var v2=new Vector(v.x+0.5*a1.x*dt, v.y+0.5*a1.y*dt, v.z+0.5*a1.z*dt);
	var a2=a(p2,v2,dt/2.0);

	var p3=new Vector(p.x+0.5*v2.x*dt, p.y+0.5*v2.y*dt, p.z+0.5*v2.z*dt);
	var v3=new Vector(v.x+0.5*a2.x*dt, v.y+0.5*a2.y*dt, v.z+0.5*a2.z*dt);
	var a3=a(p3,v3,dt/2.0);

	var p4=new Vector(p.x+v3.x*dt, p.y+v3.y*dt, p.z+v3.z*dt);
	var v4=new Vector(v.x+a3.x*dt, v.y+a3.y*dt, v.z+a3.z*dt);
	var a4=a(p4,v4,dt);
	
	var fp=new Vector(p.x+(dt/6.0)*(v1.x+2*v2.x+2*v3.x+v4.x), p.y+(dt/6.0)*(v1.y+2*v2.y+2*v3.y+v4.y), p.z+(dt/6.0)*(v1.z+2*v2.z+2*v3.z+v4.z));
	var fv=new Vector(v.x+(dt/6.0)*(a1.x+2*a2.x+2*a3.x+a4.x), v.y+(dt/6.0)*(a1.y+2*a2.y+2*a3.y+a4.y), v.z+(dt/6.0)*(a1.z+2*a2.z+2*a3.z+a4.z));

	return {position: fp, velocity: fv};
};

