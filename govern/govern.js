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

  fs.writeFile(path + '2.out', verticesOrder, 'utf8');
});

function shapeDAG(data) {
  let edgesCount = data.length - 1,
    vertices = {},
    edges = [],
    verticesCount = 0,
    startVertex, endVertex, edgeData, currEdge;

  for (let i = 0; i < edgesCount; i++) {
    edgeData = data[i].split(' ');
    startVertex = edgeData[0];
    endVertex = edgeData[1];

    if (!vertices.hasOwnProperty(startVertex)) {
      vertices[startVertex] = new Vertex(startVertex);
      verticesCount++;
    }

    if (!vertices.hasOwnProperty(endVertex)) {
      vertices[endVertex] = new Vertex(endVertex);
      verticesCount++;
    }

    currEdge = new Edge(startVertex, endVertex);

    vertices[startVertex].addEdge(currEdge);
    edges.push(currEdge);
  }

  return new Graph(vertices, edges, verticesCount);
}

function tarjanDfs(graph) {
  let correctOrder = [],
    visited = {},
    resultString = '',
    currVertex;

  for (let i = 0; i < graph.verticesCount; i++) {
    currVertex = graph.vertices[Object.keys(graph.vertices)[i]];

    if (!visited[currVertex.label]) {
      dfs(currVertex);
    }
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

  function dfsRecursive(vertex) {
    let edges = vertex.getEdges();

    if (!visited[vertex.label]) {
      visited[vertex.label] = true;

      for (let i = 0; i < edges.length; i++) {
        dfsRecursive(graph.vertices[edges[i].endVertex]);
      }

      correctOrder.push(vertex.label)
    }
  }
}
