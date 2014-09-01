#AnimatedGraph

### Purpose
Animated Graph is a graph representation and visualization tool, made possible by Javascript and the canvas element.

### Preview
[Try it live](https://cdn.rawgit.com/diogojc/AnimatedGraph/master/index.html) and you should see something like this:
![Preview](https://raw.githubusercontent.com/diogojc/AnimatedGraph/master/example.png)

### Usage
Include js files

	<script src='lib/Graph.js' type='application/javascript'></script>
	<script src='lib/ForceGraph.js' type='application/javascript'></script>
	<script src='lib/ForceNode.js' type='application/javascript'></script>
	<script src='lib/Physics.js' type='application/javascript'></script>
	<script src='lib/Vector.js' type='application/javascript'></script>
	<script src='lib/CanvasView.js' type='application/javascript'></script>
	<script src='lib/CanvasController.js' type='application/javascript'></script>
	<script src='lib/AnimatedGraph.js' type='application/javascript'></script>
	<script src='lib/Publisher.js' type='application/javascript'></script>

Create graph

	var ag = new AnimatedGraph();
	ag.addEdge("A",2);
	ag.addEdge("B","A");
	ag.addEdge("B",2);

Show the graph

	document.body.appendChild(ag.createCanvas('view1'));
	document.body.appendChild(ag.createCanvas('view2',300,300));


### Final notes

I have used hooke's and coulumb's laws to position the nodes, and the 4th order Runge-Kutta method to calculate approximate positions.

The graph can contain any type of objects, the only requirement is that they specify the toString method, since this is used to identify nodes in the graph structure.

The code should be compatible with all the latest browsers that support the canvas element.
