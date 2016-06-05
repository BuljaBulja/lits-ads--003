'use strict';

const fs = require('fs'),
  Vertex = require('./vertex.js'),
  Edge = require('./edge.js'),
  Graph = require('./graph.js');

let fileName = process.argv[2] || 'govern',
  path = __dirname + '/' + fileName;

fs.readFile(path + '.in', 'utf8', (err, data) => {
  const fileData = data.split('\n');

  let graph = shapeDAG(fileData),
    verticesOrder = tarjanDfs(graph);

    console.log(verticesOrder);
  // fs.writeFile(path + '.out', verticesOrder, 'utf8');
});

function shapeDAG(data) {
  let edgesCount = data.length - 1,
    vertices = {},
    edges = [],
    primaryVertices = [],
    verticesKeys, startVertex, endVertex, edgeData, currEdge;

  for (let i = 0; i < edgesCount; i++) {
    edgeData = data[i].split(' ');
    startVertex = edgeData[0];
    endVertex = edgeData[1];

    if (!vertices.hasOwnProperty(startVertex)) {
      vertices[startVertex] = new Vertex(startVertex);
    }

    if (!vertices.hasOwnProperty(endVertex)) {
      vertices[endVertex] = new Vertex(endVertex);
    }

    currEdge = new Edge(startVertex, endVertex);

    vertices[startVertex].addEdge(currEdge);
    vertices[endVertex].hasParent = true;
    edges.push(currEdge);
  }

  verticesKeys = Object.keys(vertices);

  for (let i = 0; i < verticesKeys.length; i++) {
    if (!vertices[verticesKeys[i]].hasParent) {
      primaryVertices.push(vertices[verticesKeys[i]].label);
    }
  }

  return new Graph(vertices, edges, primaryVertices);
}

function tarjanDfs(graph) {
  let correctOrder = [],
    visited = {},
    resultString = '';

  for(let i = 0; i < graph.primaryVertices.length; i++) {
    dfs(graph.vertices[graph.primaryVertices[i]]);
  }

  return resultString;

  function dfs(startVertex) {
    let stack = [startVertex],
      unvisitedNeighbors, vertex, edges;

    while (stack.length) {
      unvisitedNeighbors = [];
      vertex = stack.pop();
      edges = vertex.getEdges();

      visited[vertex.label] = true;

      for (let i = 0; i < edges.length; i++) {
        if (!visited[edges[i].endVertex]) {
          unvisitedNeighbors.push(graph.vertices[edges[i].endVertex]);
        }
      }

      if (!unvisitedNeighbors.length) {
        if (correctOrder.indexOf(vertex.label) === -1) {
          correctOrder.push(vertex.label);
          resultString += vertex.label + '\n';
        }
      } else {
        stack.push(vertex);
        stack = stack.concat(unvisitedNeighbors);
      }
    }
  }
}
