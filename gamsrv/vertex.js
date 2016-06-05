'use strict';

function Vertex(label) {
  this.label = label;
  this.isClient = false;
  this.outboundEdges = [];
}

Vertex.prototype.addEdge = function(edge) {
  this.outboundEdges.push(edge);
}

Vertex.prototype.toString = function() {
  return this.label + ':' + this.outboundEdges;
}

module.exports = Vertex;
