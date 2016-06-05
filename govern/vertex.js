'use strict';

function Vertex(label) {
  this.label = label;
  this.outboundEdges = [];
}

Vertex.prototype.addEdge = function(edge) {
  this.outboundEdges.push(edge);
}

Vertex.prototype.getEdges = function() {
  return this.outboundEdges;
}

Vertex.prototype.toString = function() {
  return this.label + ':' + this.outboundEdges;
}

module.exports = Vertex;
