// an array-based queue
// javascript's array shift method is pretty ineffieceint
//
// this can be improved by using fixed array sizes and doubling only when necessary
// that way we don't have to adjust the array's size on every action.
// we also will keep our own managed head and tail pointers inside this array
// so we don't have to move elements

var Queue = function(initialCapacity) {
  this.q = [];
  // heep our own head/tail/length
  this.head = 0;
  this.tail = 0;
  this.length = 0;
  // keep a fixed capacity and remember the initial capacity
  this.capacity = (typeof initialCapacity !== 'undefined') ? initialCapacity : 200;
  this.initialCapacity = this.capacity;
  this.q.length = this.capacity;

  return this;
};

Queue.prototype = {
  push: function(data) {
    // if the queue is full and we're trying to add a new item
    if (this.length === this.capacity) {
      this.doubleCapacity();
    }
    this.q[this.tail] = data;
    this.length++;
    this.tail++;
    // we need to loop around to 0
    if (this.tail === this.capacity) {
      this.tail = 0;
    }
  },
  enqueue: function(data) {
    // just an alias for push
    this.push(data);
  },
  front: function() {
    if (this.length === 0) {
      throw new EmptyQueueException();
    }
    // show the element at the head, but don't dequeue it
    return this.q[this.head];
  },
  shift: function() {
    if (this.length === 0) {
      throw new EmptyQueueException();
    }
    var tmp = this.q[this.head];
    // this.q[this.head] = undefined;
    this.head++;
    this.length--;
    // loop around to 0 if necessary ()
    if (this.head === this.capacity && this.length > 0) {
      this.head = 0;
    }

    // reduce size of array if necessary
    if (this.length === this.capacity/4 && this.length >= this.initialCapacity) {
      this.shrinkCapacity();
    }
    return tmp;

  },
  dequeue: function() {
    // alias for shift
    return this.shift();
  },
  doubleCapacity: function() {
    // this shouldn't be called manually
    // creates a new array twice the size and moves the items to that array
    var sourceIdx = this.head;
    var targetIdx = 0;
    var newQ = [];
    newQ.length = this.capacity * 2;

    while (targetIdx < this.capacity) {
      newQ[targetIdx] = this.q[sourceIdx];
      sourceIdx++;
      targetIdx++;
      // since we have a floating head and tail we have to loop past the end
      if (sourceIdx === this.capacity) {
        sourceIdx = 0;
      }
    }

    this.q = newQ;
    this.head = 0;
    this.tail = this.capacity;
    this.capacity *= 2;
  },

  shrinkCapacity: function() {
    // this shouldnt' be called manually
    // prevent this from happening in a case where it would be destructive
    // also keep the array at at least size 100
    // or we lose the benefit of doign this in the first place
    var newCapacity = this.capacity / 4;
    // creates a new array a quarter the size and moves the items to that array
    var sourceIdx = this.head;
    var targetIdx = 0;
    var newQ = new Array();
    newQ.length = newCapacity;

    while (targetIdx < this.capacity) {
      newQ[targetIdx] = this.q[sourceIdx];
      sourceIdx++;
      targetIdx++;
      // since we have a floating head and tail we have to loop past the end
      if (sourceIdx === this.capacity) {
        sourceIdx = 0;
      }
    }

    this.q = newQ;
    this.head = 0;
    this.capacity = newCapacity;
    this.tail = newCapacity;
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
      if (this.head === i) {
        output += ' <-- head';
      }
      if (this.tail === i) {
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