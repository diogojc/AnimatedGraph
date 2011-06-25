/*
	Physics.js
	Physics library with constants, laws and 4th order Runge-Kutta method to compute final positions and velocities
*/

//library
Physics = {};

//constants
Physics.ke=9*10e9;


//Hookes law
Physics.hooke=function(k,x){
	return -k*x;
};
//Coulumbs law
Physics.coulomb=function(q1,q2,x){
	return Physics.ke*q1*q2/(x*x);
};

/*
Returns object with final position and velocity vectors calculated with 4th order runge-kutta
Receives position and velocity vectors (p and v), acceleration function (a) and time delta (t)
*/
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

/*
Returns intersection point(s) between line segment and sphere
Receives two points (P0,P1) defining a line segment and a sphere defined by center C and radius R.
*/
Physics.Inter_segment_sphere=function(P0,P1,C,R){
	//Consider line defined by position P0 with direction D=P1-P0
	var D = P1.minus(P0);
	var delta = P0.minus(C);
	var gamma = Math.pow(D.dot(delta),2) - D.power(2)*(delta.power(2)-Math.pow(R,2));

	//Calculate line-sphere intersections
	var ts = new Array();
	if(gamma<0){
		//There is no intersection
		;
	}else if(gamma==0){
		//There is one intersection
		var t = -D.dot(delta)/D.power(2);
		ts.push(t);
	}else{
		//There are two intersections
		var t1 = (-D.dot(delta)+Math.sqrt(gamma))/D.power(2);
		var t2 = (-D.dot(delta)-Math.sqrt(gamma))/D.power(2);
		ts.push(t1);
		ts.push(t2);
	}

	//Since we want to detect segment-sphere intersection and not line-sphere we choose intersections that lie between P0 and P1
	var inters = new Array();
	for(var i in ts){
		if(ts[i]>=0 && ts[i]<=1)
			inters.push(P0.add(D.product(ts[i])));
	}
	return inters;
};


/*
Returns intersection point(s) between line segment and plane
Receives two points (P0,P1) defining a line segment and a plane defined by point P and normal vector N.
*/
Physics.Inter_segment_plane=function(P0,P1,P,N){
	var D = P1.minus(P0);
	var num = P.minus(P0).dot(N);
	var den = D.dot(N);
	//There is intersection if numerator and denominator are non zero
	if(num!=0 && den!=0){
		var t = num/den;
		//There is intersection only in a specific segment of line
		if(t>=0 && t<=1)
			return P0.add(D.product(t));
	}

};
