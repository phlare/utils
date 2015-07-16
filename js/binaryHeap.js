// binary heap implemenation
var BinaryHeap = function(content) {
  this.content = content || [];
  // TODO:  add a scorefunction param
  return this;
};

BinaryHeap.prototype = {
  push: function(element) {
    // add to the end of content
    this.content.push(element);
    // let it bubble up from there
    this.bubbleUp(this.content.length - 1);
  },

  // push an iterable list array of elements
  pushArray: function(elements) {
    // probably would freak out with some objects, but whatever for now
    if (typeof elements === 'object') {
      var length = elements.length;
      for (var i = 0; i < length; i++) {
        bh.push(elements[i]);
      }
    }
  },

  pop: function() {
    // save a pointer to front item
    var front = this.content[0];
    // pop element off end
    var end = this.content.pop();
    // if there's anything left
    if (this.content.length > 0) {
      // put popped element at front
      this.content[0] = end;
      // let it sink down
      this.sinkDown(0);
    }
    // return front item
    return front;
  },

  remove: function(node) {
    // find element in array
    // once found, pop element off end
    // if the one we want was at the end, then we're done
    // otherwise replace the one we're meant to remove with the one popped
    // and the let it bubble up AND sink down
  },

  size: function() {
    return this.content.length;
  },

  // clear the heap
  empty: function() {
    this.content = [];
  },

  // from index n, continually swaps with parent until it reaches the top
  // parent math is a little funny since we're using zero-indexed arrays
  bubbleUp: function(idx) {
    // get the element to be moved
    var element = this.content[idx];
    var score = element;  // to be replaced when i implement scorefunctions
    // loop through while n > 0 (we haven't reached the 'top');
    while (idx > 0) {
      // compute and fetch parent element
      var parentIdx = Math.floor((idx + 1) / 2) - 1;
      var parent = this.content[parentIdx];
      var parentScore = parent; // placeholder
      // if parent has a lesser score then we can break out
      if (score >= parentScore) {
        break;
      }
      // otherwise we swap
      this.content[parentIdx] = element;
      this.content[idx] = parent;
      // continue from parentIdx
      idx = parentIdx;
    }
  },

  sinkDown: function(idx) {
    // get the target element and it's score
    var element = this.content[idx];
    var elementScore = element;
    // save a var for length of content so we don't have to keep calculating it
    var length = this.content.length;

    // loop through (while true)
    while(true) {
      // compute children indices.
      // again a little funky because of zero-indexing
      var firstChildIdx = ((idx + 1) * 2) - 1;   // secondChildIdx - 1;
      var secondChildIdx = firstChildIdx + 1;    // (idx + 1) * 2;

      // set a swap pointer
      var swapIdx = null;

      // if first child exists get it and it's score
      if (firstChildIdx < length) {
        var child1 = this.content[firstChildIdx];
        var child1Score = child1; // to be replaced with scorefunction
        // if the child has a lower score than the current element
        if (child1Score < elementScore) {
          //swap to the first child
          swapIdx = firstChildIdx;
        }
      }
      // if the second child  exists...
      if (secondChildIdx < length) {
        var child2 = this.content[secondChildIdx];
        var child2Score = child2;
        // and is lower than both
        if (child2Score < (swapIdx === null ? elementScore : child1Score)) {
          //swap to the second child instead
          swapIdx = secondChildIdx;
        }
      }
      // break if we don't have a swap index
      if (swapIdx === null) {
        break;
      }
      // execute the actual swap
      this.content[idx] = this.content[swapIdx];
      this.content[swapIdx] = element;
      // carry on iterating with the swap index
      idx = swapIdx;
    }
  },

  display: function(method, containerId) {
    method = method || 'text';
    containerId = containerId || 'displayArea';
    if (method === 'text') {
      this.displayText(containerId);
    }
    return this;
  },
  displayText: function(containerId) {

    var displayContainer = document.getElementById(containerId);

    // todo: sanitize for XSS -- right now this is just to help me learn
    var output = '';
    var breakafter = 0;
    if (this.content.length === 0)
      output = 'heap is empty';

    for (var i = 0; i < this.content.length; i++) {
      output += '[ ' + this.content[i] + ' ]';
      if (i === breakafter) {
        output += '<br />';
        breakafter = (i+1) * 2;
      }
    }
    displayContainer.innerHTML = output;

  }
};