// an array-based stack
// javascript's builtin push and pop are totally fine for this
var Stack = function() {
  this.s = [];

  return this;
};

Stack.prototype = {
  push: function(data) {
    this.s.push(data);
  },
  peek: function() {
    return this.s[this.s.length-1];
  },
  pop: function() {
    return this.s.pop();
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
    var count = this.s.length;
    if (count === 0) {
      output = 'stack is empty';
    }
    // print backwards so the 'top' is at the top
    for (var i = count-1; i >=0; i--) {
      output += '[ ' + this.s[i] + ' ]';

      output += '<br />';
    }
    displayContainer.innerHTML = output;
  }
};