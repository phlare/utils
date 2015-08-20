// Challenge of the Week #1 - CoinSums
//
// Write a function to calculate the number of combinations
// of American currency denominations to make up a certain total.
// Assume the denominations up to $5 (in cents, that’s 1, 5, 10, 25, 50, 100, 500).
// For example, an input of 10 would output 4 (10x1, 5x2, 5x1+1x5, 1x10).

var CoinSums = function(total) {
  total = total || 0;
  console.log('constructing coinSum for ' + total);
  return this;
};

CoinSums.prototype = {
  test: function(data) {
    console.log('test happened');
    return this;
  }
}