var LinkedList = function() {
  this.head = null;
  this.tail = null;
  this.count = 0;

  // function for adding nodes
  this.insertAt = function(data, idx) {
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
      // set tail if it's empty
      if (this.tail === null) {
        this.tail = newNode;
      }
      // increment count
      this.count++;
    }
    return this;
  };

  // a few insert helpers
  this.insertFront = function(data) {
    return this.insertAt(data,0);
  };
  this.insertEnd = function(data) {
    return this.insertAt(data, this.count);
  }


  // helper function for reverse, allows specifying reverse method
  this.reverseList = function(reverseMethod) {

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

  this.reverseIterative = function() {
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

  this.reverseRecursive = function(node) {
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

  this.reverseRecursive2 = function(node, previous) {
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

  this.emptyList = function() {
    this.head = null;
    this.tail = null;
    this.count = 0;
    return this;
  }

};



var ListNode = function(data) {
  this.data = data;
  this.next = null;
};

console.log('------ creating Linked List');
var testLL = new LinkedList();
console.log('------ adding Nodes Linked List');
testLL.insertEnd(1);
testLL.insertEnd(2);
testLL.insertEnd(3);
testLL.insertEnd(4);
testLL.insertEnd(5);
// console.log(testLL.head);

console.log('------ reversing list (iterative)');
testLL.reverseList();
console.log(testLL.head);

console.log('------ reversing list (recursive 1)');
testLL.reverseList('recursive');
  console.log(testLL.head)

console.log('------ reversing list (recursive 2)');
testLL.reverseList('recursive');
  console.log(testLL.head)
