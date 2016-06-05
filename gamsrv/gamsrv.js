'use strict';

const fs = require('fs'),
  Vertex = require('./vertex.js'),
  Edge = require('./edge.js'),
  Graph = require('./graph.js');

let fileName = process.argv[2] || 'gamsrv',
  path = __dirname + '/' + fileName;

fs.readFile(path + '.in', 'utf8', (err, data) => {
  const fileData = data.split('\n');

  let graph = shapeGraph(fileData),
    shortestDistance = getShortestDistance(graph);

  console.log(shortestDistance);

  // fs.writeFile(path + '.out', verticesOrder, 'utf8');
});

function shapeGraph(data) {
  let vertices = [],
    edges = [],
    verticesCount = parseInt(data[0].split(' ')[0], 10),
    edgesCount = parseInt(data[0].split(' ')[1], 10),
    clients = data[1].split(' ').map(x => parseInt(x, 10)),
    startVertex, endVertex, weight, edgeData, currEdge, reverseEdge;

  for (let i = 0; i < verticesCount + 1; i++) {
    vertices.push(new Vertex(i));
  }

  for (let i = 2; i < edgesCount + 2; i++) {
    edgeData = data[i].split(' ');
    startVertex = parseInt(edgeData[0], 10);
    endVertex = parseInt(edgeData[1], 10);
    weight = parseInt(edgeData[2], 10);

    currEdge = new Edge(startVertex, endVertex, weight);
    vertices[startVertex].addEdge(currEdge);

    reverseEdge = new Edge(endVertex, startVertex, weight);
    vertices[endVertex].addEdge(reverseEdge);

    edges.push(currEdge);
    edges.push(reverseEdge);
  }

  for (let i = 0; i < clients.length; i++) {
    vertices[clients[i]].isClient = true;
  }

  return new Graph(vertices, edges, clients);
}

function getShortestDistance(graph) {
  let distances = [],
    resultArray = [],
    currVertexDist;

  for (let i = 0; i < graph.clients.length; i++) {
    distances.push(dijkstra(graph, graph.clients[i]));
  }

  for (let i = 1; i < graph.vertices.length; i++) {
    if (!graph.vertices[i].isClient) {
      currVertexDist = [];

      for (let j = 0; j < distances.length; j++) {
        currVertexDist.push(distances[j][graph.vertices[i].label]);
      }

      resultArray.push(Math.max.apply(Math, currVertexDist));
    }
  }
  console.log(graph.vertices);
  return Math.min.apply(Math, resultArray);
}

function dijkstra(graph, startVertex) {
  const INFINITY = Math.pow(10, 12);

  let distances = [],
    visitList = [],
    shortestVertex, shortestVertexIndex, neighbor, altDistance, currEdge;

  for (let i = 0; i < graph.vertices.length; i++) {
    distances.push(INFINITY);
    visitList.push(graph.vertices[i]);
  }

  distances[startVertex] = 0;

  while (visitList.length) {
    shortestVertex = visitList[0];
    shortestVertexIndex = 0;

    for (let i = 0; i < visitList.length; i++) {
      if (distances[visitList[i].label] < distances[shortestVertexIndex]) {
        shortestVertex = visitList[i];
        shortestVertexIndex = i;
      }
    }

    visitList.splice(shortestVertexIndex, 1)

    for (let i = 0; i < shortestVertex.outboundEdges.length; i++) {
      currEdge = shortestVertex.outboundEdges[i];
      neighbor = currEdge.endVertex;
      altDistance = distances[shortestVertex.label] + currEdge.weight;

      if (altDistance < distances[neighbor]) {
        distances[neighbor] = altDistance;
      }
    }
  }

  return distances;
}
