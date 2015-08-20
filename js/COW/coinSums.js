// Challenge of the Week #1 - CoinSums
//
// Write a function to calculate the number of combinations
// of American currency denominations to make up a certain total.
// Assume the denominations up to $5 (in cents, that’s 1, 5, 10, 25, 50, 100, 500).
// For example, an input of 10 would output 4 (10x1, 5x2, 5x1+1x5, 1x10).
var CoinSum = function() {
  this.totalCombinations = 0;
  this.comboHashes = [];
  this.combinations = [];
};

var CoinSumNode = function(total, step, value, parent) {
  this.total = total || 0;
  this.step = step || 0;
  this.value = value || null;
  this.parent = parent || null;
  this.children = {};

  return this;
};

CoinSum.prototype = {

  init: function(data) {
    return this;
  },
  denoms: [500,100,50,25,10,5,1],
  clearCombinations: function() {
    this.totalCombinations = 0;
    this.comboHashes = [];
    this.combinations = [];
  },
  // find the set of combinations that total the given number
  findCombinations: function(total) {
    // clear the previous count if necessary
    this.clearCombinations();
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
    var combinations = this.calculateCombinations(total,0, null);
    console.log(combinations + ' combinations found.');
    console.log(this.combinations);
    return combinations;

  },
  calculateCombinations: function(total, step, value) {
    var node = new CoinSumNode(total, step, value);
    this.addChildren(total, step, node);

    // return number of combinations
    return this.totalCombinations;
  },
  addChildren: function(total, step, node) {
    // console.log('adding children');
    // console.log({total:total, step:step});
    var len = this.denoms.length;
    // loop through the possible denominations
    for (var i = 0; i < len; i++) {
      // if we can subtract this denomination from our running total, we can make this child
      var newTotal = total - this.denoms[i];
      if (newTotal >= 0) {
        // make the child node and attach to this node in children array
        // we need to make sure we're not just creating a new permutation of the same steps though.
        var child = new CoinSumNode(newTotal, step+1, this.denoms[i], node);
        var comboHash = this.checkComboHash(child);
        if (comboHash) {
          // console.log('adding new child of value ' + this.denoms[i] + ' at step ' + (step + 1));

          // if new total is 0, then we've found a full combination
          if (newTotal == 0) {
            this.combinations.push(comboHash);
            this.totalCombinations += 1;
          } else {
            // otherwise, recursively add children to this node
            this.addChildren(newTotal, step+1, child);
          }
          node.children[this.denoms[i]] = child;
        }
      }
    }
  },
  checkComboHash: function(node) {
    // create an array of the items used, then sort them and create a hash we can use to compare
    var steps = [];
    var current = node;
    while (current != null && typeof current.value != 'undefined' && current.value != null) {
      steps.push(current.value);
      current = current.parent;
    }
    // sort this array and make a "hash" of it to compare with other nodes already created
    // this will reduce our paths to combinations instead of permutations
    var stepHash = steps.sort().reverse().join('-');
    if (this.comboHashes.indexOf(stepHash) === -1) {
      // doesn't already exist.   add it to existing combinations and return true
      this.comboHashes.push(stepHash);
      return stepHash;
    }
    return false;
  },
  // just to standardize errors.
  complain: function(message) {
    message = message || 'what u do?';
    console.log('Error: ' + message);
    return false;
  }
}