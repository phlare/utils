// an array-based queue just using javascript's default push and shift
// used to benchmark against my (hopefully) faster queue
// javascript's array shift method is pretty ineffieceint

var SimpleQueue = function() {
  this.q = [];
  return this;
};

SimpleQueue.prototype = {
  push: function(data) {
    return this.q.push(data);
  },
  enqueue: function(data) {
    // just an alias for push
    this.push(data);
  },
  front: function() {
    if (this.q.length === 0) {
      throw new EmptyQueueException();
    }
    // show the element at the head, but don't dequeue it
    return this.q[0];
  },
  shift: function() {
    if (this.q.length === 0) {
      throw new EmptyQueueException();
    }
    return this.q.shift();
  },
  dequeue: function() {
    // alias for shift
    return this.shift();
  },

  display: function(method, containerId) {
    method = method || 'text';
    containerId = containerId || 'displayArea';
    if (method === 'text') {
      this.displayText(containerId);
    }
  },
  displayText: function(containerId) {

    var displayContainer = document.getElementById(containerId);

    // todo: sanitize for XSS -- right now this is just to help me learn
    var output = '';
    var breakafter = 0;
    var count = this.q.length;
    if (count === 0) {
      output = 'queue is empty';
    }
    // print backwards so the 'top' is at the top
    for (var i = 0; i < count; i++) {
      output += '[ ' + this.q[i] + ' ]';
      if (i === 0) {
        output += ' <-- head';
      }
      if (i == (count -1)) {
        output += ' <-- tail';
      }

      output += '<br />';
    }
    displayContainer.innerHTML = output;
  }
};

function EmptyQueueException() {
  this.message = "This operation cannot be completed because the Queue is empty.";
  this.name = "EmptyQueueException";
}