'use strict';

function Edge(startVertex, endVertex) {
  this.startVertex = startVertex;
  this.endVertex = endVertex;
}

Edge.prototype.toString = function() {
  return ' ' + this.startVertex + ' -> ' + this.endVertex;
}

module.exports = Edge;
