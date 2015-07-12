<?php
/**
 * BST is a basic php implementation of a BST data structure (FILO)
 *
 * super basic BST,  not self balancing, no duplicate keys allowed
 *
 * @package    Utils
 * @author     Mark Nelson <mark@nelsonwebsolutions.com>
 * @license    dunno yet. MIT probably
 * @version    0.01
 */
class BST {

	private $_count;
	private $_root; // points to the top of the stack

	public function __construct() {
		$this->_count = 0;
		$this->_root = null;
	}

	// getters / setters
	public function getCount() {
		return $this->_count;
	}

	// public insert function
	// this can be configured to use recursive insertion or not
	// TODO: possibly extend this option to be set at the creation of tree insted of on insert
	public function insert($key, $data=null, $recursive=false) {
		if ($recursive) {
			return $this->_recursiveInsert($key, $data, $this->_root);
		} else {
			return $this->_insert($key, $data);
		}
	}

	// push new node to BST
	protected function _insert($key, $data=null, $root=null) {

		if ($this->_root === null) {
			// tree is empty, just create a node and point _root there.
			$this->_root = new BSTNode($key, $data);
			$this->_count ++;
		} else {
			// iterate through and figure out where to put this item
			$current = $this->_root;
			while ($key !== $current->key) {
				if ($key > $current->key) {
					// if key is greater, look right
					if ($current->right) {
						$current = $current->right;
					} else {
						$current->right = new BSTNode($key, $data);
						$this->_count ++;
						break;
					}
				} elseif ($key < $current->key) {
					// key is lesser, look left
					if ($current->left) {
						$current = $current->left;
					} else {
						$current->left = new BSTNode($key, $data);
						$this->_count ++;
						break;
					}
				}
			}
		}
	}

	protected function _recursiveInsert($key, $data=null, &$root=null) {
		if (!$root) {
			// make the new node
			$root = $newNode = new BSTNode($key, $data);
			$this->_count ++;
			return $newNode;
		} elseif ($key === $root->key) {
			// key already exists.
			return $root;
		} elseif ($key > $root->key) {
			// return new BSTNode($key, $data, $root->left, $this->insert($key, $data, $root->right));
			return $this->_recursiveInsert($key, $data, $root->right);

		} elseif ($key < $root->key) {
			// return new BSTNode($key, $data, $this->insert($key, $data, $root->left), $root->right);
			return $this->_recursiveInsert($key, $data, $root->left);
		}
	}

	// attempts to find and remove a node.  returns true on successfull removal
	public function remove($key) {
		// iterate through, and find the key
		$direction = null;  // keep track of the direction we just traversed
		$current = $this->_root;
		$parent = null;
		while ($current !== null) {
			if ($key > $current->key) {
				if ($current->right) {
					$parent = $current;
					$current = $current->right;
					$direction = 'right';
				} else {
					return false;
				}
			} elseif ($key < $current->key) {
				if ($current->left) {
					$parent = $current;
					$current = $current->left;
					$direction = 'left';
				} else {
					return false;
				}
			} else {
				// key matches
				if ($current->right && $current->left) {
					// node has both children. we need to do the following:
					// find the leftmost descendant of the immediate right child
					// copy it's key and data to the current node, and delete the original child
					$successorData = $this->_getMinChild($current->right);
					// now that we have it's data, delete the successor
					$this->remove($successorData->key);
					// set the values from the successor to the node to be deleted
					$current->key = $successorData->key;
					$current->data = $successorData->data;
					// clean up that temporary node
					unset($successorData);
					return true;
				} elseif ($current->left) {
					// node has just left
					if ($parent && $direction) {
						$parent->$direction = $current->left;
					} else {
						$this->_root = $current->left;
					}
				} elseif ($current->right) {
					// node has just right
					if ($parent && $direction) {
						$parent->$direction = $current->right;
					} else {
						$this->_root = $current->right;
					}
				} else {
					// node has neither child
					if ($parent && $direction) {
						$parent->$direction = null;
					} else {
						// this is the only node in the tree
						$this->_root = null;
					}
				}
				$this->_count--;
				return true;
			}
		}
	}

	// finds the leftmost descendant, deletes it, and returns it's key and data
	protected function _getMinChild(&$root=null) {
		// keep iterating left until we can't, keeping track of parent
		$current = $root;
		$parent = null;
		while ($current->left) {
			$parent = $current;
			$current = $current->left;
		}
		// return a new node with this data
		return new BSTNode($current->key, $current->data);
	}

	// just using print_r on the root for now
	public function display($type='print_r') {

		if (!$this->_root) {
			echo "this tree is empty" . "\n";
			return;
		}

		if ($type === 'pretty') {
			// TODO: some way to dynamically print
		} else {
			$printData = array(
				'count' => $this->_count,
				'BST' => $this->_root
			);

			print_r($printData);
		}
	}

}

/**
 * BSTNode class defines the individual nodes in our LinkedList
 */
class BSTNode {
	public $key;
	public $data;
	public $left;
	public $right;

	public function __construct($key, $data=null, $left=null, $right=null) {
		$this->key = $key;
		$this->data = $data;
		$this->left = $left;
		$this->right = $right;
	}

	// gets the data in a particular node
	public function getData() {
		return $this->data;
	}
}
