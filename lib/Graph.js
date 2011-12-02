/*
	Graph.js
	Directed Graph Class.
	Nodes must be objects that are uniquely identifiable by the toString method.
*/

function Graph(){
	this.nodes = {};
	this.edges = new Array();
};

Graph.prototype.hasEdge=function(on,dn){
	for(var i in this.edges)
		if(this.edges[i].origin == on && this.edges[i].destination == dn)
			return true;
	return false;
}

Graph.prototype.addEdge=function(on,dn){
	this.addNode(on);
	this.addNode(dn);

	on=this.getNode(on);
	dn=this.getNode(dn);
	
	if(!this.hasEdge(on,dn))
		this.edges.push({origin:on,destination:dn});
};

Graph.prototype.remEdge=function(on,dn){
	for(var i in this.edges)
		if(this.edges[i].origin == on && this.edges[i].destination == dn){
			delete this.edges[i];
			return;
		}
};

Graph.prototype.addNode=function(n){
	if(!n)
		return;
	if(this.getNode(n))
		return;
	this.nodes[n]=n;
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

Graph.prototype.getNode=function(n){
	for(var node in this.nodes)
		if(node==n)
			return this.nodes[node];
	return null;
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
