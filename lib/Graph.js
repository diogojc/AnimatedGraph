/*
	Graph.js
	Directed Graph Class.
	Nodes must be objects that are uniquely identifiable by the toString method.
*/

function Graph(){
	this.nodes = {};
	this.edges = new Array();
};

Graph.prototype.getEdge=function(on,dn){
	for(var i in this.edges)
		if(this.edges[i].origin == on && this.edges[i].destination == dn)
			return this.edges[i];
	return undefined;
}

Graph.prototype.addEdge=function(on,dn){
	on = this.addNode(on);
	dn = this.addNode(dn);

	var e = this.getEdge(on,dn)
	if(!e){
		e = {origin:on,destination:dn};
		this.edges.push(e);
	}
	return e;
};

Graph.prototype.remEdge=function(on,dn){
	for(var i in this.edges)
		if(this.edges[i].origin == on && this.edges[i].destination == dn){
			delete this.edges[i];
			return;
		}
};

Graph.prototype.getNode=function(n){
	if(n in this.nodes)
		return this.nodes[n];
	return undefined;
};

Graph.prototype.addNode=function(n){
	if(!n)
		return;

	var localn = this.getNode(n);
	if(localn)
		return localn;

	this.nodes[n]=n;
	return n;
};

Graph.prototype.remNode=function(n){
	if(!n)
		return;
	n = this.getNode(n);
	if(!n)
		return;
	for(var edge in this.edges)
		if(this.edges[edge].origin==n || this.edges[edge].destination==n)
			delete this.edges[edge];
	delete this.nodes[n];
};

Graph.prototype.toString=function(m){
	var text = "Directed Weighted Graph object.";
	for(var node in this.nodes){
		text+="\n"+node+" --> ";
		for(var edge in this.edges){
			if(this.edges[edge].origin==node)
				text+=this.edges[edge].destination+", ";
		}
	}
	return text;
};
