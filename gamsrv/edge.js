'use strict';

function Edge(startVertex, endVertex, weight) {
  this.startVertex = startVertex;
  this.endVertex = endVertex;
  this.weight = weight;
}

Edge.prototype.toString = function() {
  return ' ' + this.startVertex + ' -> ' + this.endVertex;
}

module.exports = Edge;
