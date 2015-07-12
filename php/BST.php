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

	// push new node to BST
	public function insert($key, $data=null) {

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

	// remove a node by key
	public function remove($key) {

	}

	// just using print_r on the root for now
	public function display() {

		$printData = array(
			'count' => $this->_count,
			'BST' => $this->_root
		);

		print_r($printData);
	}


}

/**
 * BSTNode class defines the individual nodes in our LinkedList
 */
class BSTNode {
	public $key;
	public $left;
	public $right;
	public $data;

	public function __construct($key, $data=null, $left=null, $right=null) {
		$this->key = $key;
		$this->left = $left;
		$this->right = $right;
		$this->data = $data;
	}

	// gets the data in a particular node
	public function getData() {
		return $this->data;
	}
}
