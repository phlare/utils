// Challenge of the Week #1 - CoinSums
//
// Write a function to calculate the number of combinations
// of American currency denominations to make up a certain total.
// Assume the denominations up to $5 (in cents, that’s 1, 5, 10, 25, 50, 100, 500).
// For example, an input of 10 would output 4 (10x1, 5x2, 5x1+1x5, 1x10).
var CoinSum = function() {
  this.combinations = 0;
  this.tailPointers = [];
};

var CoinSumNode = function(total, step, value, children) {
  this.total = total || 0;
  this.step = step || 0;
  this.value = value || null;
  this.children = children || [];

  return this;
};

CoinSum.prototype = {

  init: function(data) {
    return this;
  },
  denoms: [1,5,10,25,50,100,500],
  // find the set of combinations that total the given number
  findCombinations: function(total) {
    // clear the previous count if necessary
    this.combinations = 0;
    console.log('----------------------------');
    console.log('finding Combinations for ' + total);

    // make sure input is valid
    if (typeof total != 'number') {
      return this.complain('invalid input. expecting number of cents.  $1.25 = 125');
    } else if (total < 0) {
      return this.complain('total must be >= 0');
    }
    total = Math.round(total) || 0;
    // now find combinations.
    var combinations = (total === 0) ? 0 : this.calculateCombinations(total,0, null);
    console.log(combinations + ' combinations found.');
    return combinations;

  },
  calculateCombinations: function(total, step, value) {
    var node = new CoinSumNode(total, step, value);
    this.addChildren(total, step, node);

    console.log(node);
    // return number of combinations
    return this.combinations;
  },
  addChildren: function(total, step, node) {
    console.log('adding children');
    console.log({total:total, step:step});
    var len = this.denoms.length;
    // loop through the possible denominations
    for (var i = 0; i < len; i++) {
      // if we can subtract this denomination from our running total, we can make this child
      var newTotal = total - this.denoms[i];
      if (newTotal >= 0) {
        // make the child node and attach to this node in children array
        console.log('adding new child of value ' + this.denoms[i] + ' at step ' + (step + 1));
        var child = new CoinSumNode(newTotal, step+1, this.denoms[i]);
        node.children.push(child);
        if (newTotal == 0) {
          this.combinations += 1;
        }
      }
    }
  },
  // just to standardize errors.
  complain: function(message) {
    message = message || 'what u do?';
    console.log('Error: ' + message);
    return false;
  }
}