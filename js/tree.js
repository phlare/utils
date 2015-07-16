// A class used to describe a very basic tree
// this is intended as a superclass for other trees
var Tree = function() {
  this.root = null;
  this.count = 0;
  // this.height = 0;  //will implement this later perhaps

  return this;
};

// A class used to describe a basic tree node
// i've decided to include a parent pointer for now
var TreeNode = function(key, data, parent) {
  this.key = key;
  this.data = data || null;
  this.children = [];
  this.parent = parent || null;
  // this.level = 0  // will impelemnt later perhaps;

  return this;
};

// a method to add to the tree.
// if parent is given, it will become the child of that parent
// otherwise, it will become the child of root
// else it will become root
// this function will likely be overwritten in a specialized tree
Tree.prototype.addNode = function(key, data, parent) {
  if (typeof key !== 'undefined') {
    data = data || null;
    if (typeof parent !== 'object') {
      parent = this.root || null;
    }

    // create the new node, with parent, if known
    var newNode = new TreeNode(key, data, parent);
    if (parent !== null) {
      // add this to children of parent, if known
      parent.children.push(newNode);
    } else {
      // this is the root node now
      this.root = newNode;
    }
    this.count++;
  }
  return this;
};

Tree.prototype.findNode = function(key) {
  if (typeof key !== 'undefined') {
    // call the recursive remove function, starting at head
    return this.findNodeDepthFirst(key, this.root, null);
  }
  return false;
};

// a basic method to find a node in the tree
// starts at parent node, recursively searches in children
// this function will likely be overwritten in a specialized tree
Tree.prototype.findNodeDepthFirst = function(key, node, parent) {
  node = node || this.root || null;
  parent = parent || null;
  var found = false;

  if (node.key === key) {
    // console.log("found it!");
    found = node;

  } else if (node.children.length > 0) {
    // recursively call on children of this node, but stop if we find it
    var i = 0;
    while(i < node.children.length && !found) {
      found = this.findNodeDepthFirst(key, node.children[i], node);
      i++;
    }
    return found;
  }
  return found;
};

// basic removal function.
Tree.prototype.removeNode = function(key) {
  if (typeof key !== 'undefined') {
    var nodeToRemove = this.findNode(key);
    if (nodeToRemove) {
      this.performRemoval(nodeToRemove);
    }
  }
  return this;
};

// the guts of the removal function.
// this will probably be overwritten in most specialized trees
// for the base case, no specific rules.
// if a node with children gets deleted, the first of it's children will take it's place
Tree.prototype.performRemoval = function(node) {
  var parent = node.parent;

  if (node.children.length === 0) {
    // if node has no children, just remove it
    if (parent !== null) {
      // remove this record from parent.children
      var idx = parent.children.indexOf(node);
      if (idx !== -1) {
        parent.children.splice(idx,1);
      }
    } else {
      this.root = null;
    }
  } else if (node.children.length === 1) {
    // if only one child,  that child takes this node's place
    node.children[0].parent = parent;
    if (parent !== null) {
      var idx = parent.children.indexOf(node);
      if (idx !== -1) {
        parent.children[idx] = node.children[0];
      }
    } else {
      this.root = node.children[0];
    }

  } else {
    // the first child of the node will replace it
    // and any other siblings will become children of that first child
    var first = node.children.shift();
    var rest = node.children;

    // add the "rest" to the children of first
    first.children = first.children.concat(rest);
    first.parent = parent;
    // now do the replacement
    if (parent !== null) {
      var idx = parent.children.indexOf(node);
      if (idx !== -1) {
        parent.children[idx] = first;
      }
    } else {
      this.root = first;
    }
  }
  delete node;
  this.count --;
  return true;
};


// keeping this one unchainable for now because I don't know how to preserve 'this'
Tree.prototype.display = function() {

  // need to make a now object for D3 to use
  // otherwise passing our list off to D3 can be destructive.
  var displayData = this.createDisplayData(this.root);
  // this way we can print at any point and still return the original Tree
  this.displayTree(displayData, 'd3');
  return this;
};

Tree.prototype.createDisplayData = function(root) {
  var displayData = {
    root: root.data,
    key: root.key,
    children: []
  };
  var numChildren = root.children.length;
  if (numChildren > 0) {
    for (var i=0; i<numChildren; i++) {
      displayData.children.push(this.createDisplayData(root.children[i]));
    }
  }
  return displayData;
};


// at the moment, this function is destructive and breaks root.
// solution for now is to pass it a new object with just the data to be printed
// see Tree.display()
Tree.prototype.displayTree = function(root, method) {

  method = method || 'd3';

  if (method === 'd3' && typeof d3 === 'object') {
    // this d3 code adapted from this collapsible tree block by mbostock
    // http://bl.ocks.org/mbostock/4339083

    // ************** Generate the tree diagram  *****************
    var margin = {top: 50, right: 80, bottom: 50, left: 80},
     width = 960 - margin.right - margin.left,
     height = 500 - margin.top - margin.bottom;

    var i = 0;
    var duration = 750;

    var tree = d3.layout.tree()
      .size([height, width]);

    var diagonal = d3.svg.diagonal()
      .projection(function(d) {
        return [d.x, d.y];
      });

    // kinda hacky for now.  if svg already exists, delete it
    var existingSvg = document.getElementById('treeDisplay');
    if (existingSvg) {
      existingSvg.remove();
    }


    var svg = d3
      .select('body').append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .attr('id', 'treeDisplay')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    root = root || this.root;
    root.x0 = 0;
    root.y0 = 0;

    update(root);

    function update(source) {

      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse();
      var links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * 80; });

      // Declare the nodesâ€¦
      var node = svg.selectAll("g.node")
        .data(nodes, function(d) {
          return d.id || (d.id = ++i);
        });

      // Enter the nodes.
      var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
          return "translate(" + source.x0 + "," + source.y0 + ")";
        })
        .on("click", click);

      nodeEnter.append("circle")
        .attr("r", 0.000001)
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
        });

      nodeEnter.append("text")
        .attr("y", function(d) {
          return d.children || d._children ? -18 : 18;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function(d) {
          return d.key;
        })
        .style("fill-opacity", 0.000001);

      // transition nodes to their new position
      var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

      nodeUpdate.select("circle")
        .attr("r", 8)
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
        });

      nodeUpdate.select("text")
        .style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + source.x + "," + source.y + ")";
        })
        .remove();

      nodeExit.select("circle")
        .attr("r", 0.000001);

      nodeExit.select("text")
        .style("fill-opacity", 0.000001);

      // Declare the linksâ€¦
      var link = svg.selectAll("path.link")
        .data(links, function(d) {
          return d.target.id;
        });

      // Enter the links.
      link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
          var o = {x: source.x0, y: source.y0};
          return diagonal({source: o, target: o});
        });

      // Transition links to their new position.
      link.transition()
        .duration(duration)
        .attr("d", diagonal);

      // Transition exiting links to the parent's new position
      link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
        })
        .remove();

      // stash old positions for transition.
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }
  }
};
