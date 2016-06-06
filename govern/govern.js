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

  fs.writeFile(path + '.out', verticesOrder, 'utf8');
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
  let orderSet = new Set(),
    unvisitedVertices = new Set(Object.keys(graph.vertices)),
    unvisitedVerIter = unvisitedVertices.values(),
    visited = {},
    resultString = '',
    currVertex;

  while (unvisitedVertices.size) {
    dfs(graph.vertices[unvisitedVerIter.next().value]);
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
      if (unvisitedVertices.has(vertex.label)) {
        unvisitedVertices.delete(vertex.label);
      }

      for (let i = 0; i < edges.length; i++) {
        if (!visited[edges[i].endVertex]) {
          unvisitedNeighbors.push(graph.vertices[edges[i].endVertex]);
        }
      }

      if (!unvisitedNeighbors.length) {
        if (!orderSet.has(vertex.label)) {
          orderSet.add(vertex.label);
          resultString += vertex.label + '\n';
        }
      } else {
        stack.push(vertex);
        stack = stack.concat(unvisitedNeighbors);
      }
    }
  }
}
