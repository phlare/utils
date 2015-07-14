// A class to describe a Linked list.
// Used for practice and demonstration rather than as a production library
var LinkedList = function() {
  this.head = null;
  this.tail = null;
  this.count = 0;
  return this;
};

// function for adding nodes
LinkedList.prototype.insertAt = function(idx, data) {
  // default to 0
  idx = idx || 0;
  // reject bad keys
  if (idx >= 0 && idx <= this.count) {

    // create our new node
    var newNode = new ListNode(data);
    // iterate from head to key, keeping current and previous pointers
    var current = this.head;
    var previous = null;
    for (var i=0; i < idx; i++) {
      previous = current;
      current = current.next;
    }
    // insert this node between current and previous
    if (previous) {
      previous.next = newNode;
    }
    newNode.next = current;
    // set head if we inserted at the top
    if (this.head === null || idx === 0) {
      this.head = newNode;
    }
    // set tail if it's empty or if we inserted at end
    // make sure to do this before incrementing count
    if (this.tail === null || idx === this.count) {
      this.tail = newNode;
    }
    // increment count
    this.count++;
  }
  return this;
};

// a few insert helpers
LinkedList.prototype.insertFront = function(data) {
  return this.insertAt(0, data);
};
LinkedList.prototype.insertEnd = function(data) {
  return this.insertAt(this.count, data);
};

// delete an item by key
LinkedList.prototype.deleteAt = function(idx) {
  if (idx >= 0 && idx < this.count) {
    var current = this.head;
    var previous = null;
    for (var i=0; i<idx; i++) {
      previous = current;
      current = current.next;
    }
    return this.executeDelete(current, previous);
  }
  return this;
};

LinkedList.prototype.deleteByValue = function(value) {
  var current = this.head;
  var previous = null;
  while (current.data !== value) {
    if (current.next === null) {
      return this;
    }
    previous = current;
    current = current.next;
  }
  return this.executeDelete(current, previous);
};

// helper function for the other delet methods
LinkedList.prototype.executeDelete = function(current, previous) {
  if (previous === null) {
      this.head = current.next;
    } else {
      previous.next = current.next;
    }
    if (current.next === null) {
      this.tail = previous;
    }
    this.count --;
    return this;
};

// helper function for reverse, allows specifying reverse method
LinkedList.prototype.reverseList = function(reverseMethod) {

  reverseMethod = reverseMethod || 'iterative';

  if (reverseMethod === 'recursive') {
    this.head =  this.reverseRecursive(this.head, null);
  } else if (reverseMethod === 'recursive2') {
    this.head =  this.reverseRecursive2(this.head, null);
  } else if (reverseMethod === 'iterative') {
    this.reverseIterative();
  }
  return this;
};

LinkedList.prototype.reverseIterative = function() {
  if (this.count <= 1) {
    return this;  // no need to reverse
  }
  // iterate through, keeping track of current previous next
  var current = this.head;
  var previous = null;
  var next = null;
  while (current !== null) {
    // set tail if we're at the head
    if (current === this.head) {
      this.tail = current;
    }
    next = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }
  this.head = previous;
  return this;
};

LinkedList.prototype.reverseRecursive = function(node) {
  // split node into first and "rest"
  var first = node;
  var rest = node.next;

  if (!rest) {
    return node;
  }
  var ret = this.reverseRecursive(rest);
  first.next.next = first;
  first.next = null;
  return ret;

};

LinkedList.prototype.reverseRecursive2 = function(node, previous) {
  // if this is the last node, switch it with previous and return
  var rest = node.next;
  if (rest === null) {
    node.next = previous;
    return node;
  }

  // otherwise, switch it with the reverse of what is next
  var ret = this.reverseRecursive2(rest, node);
  node.next = previous;
  return ret;
};

LinkedList.prototype.emptyList = function() {
  this.head = null;
  this.tail = null;
  this.count = 0;
  return this;
};

// simple class to describe a node of the linked list
var ListNode = function(data) {
  this.data = data;
  this.next = null;
  return this;
};
