<?php
/**
 * Stack is a basic php implementation of a Stack data structure (FILO)
 *
 * @package    Utils
 * @author     Mark Nelson <mark@nelsonwebsolutions.com>
 * @license    dunno yet. MIT probably
 * @version    0.01
 */
class Stack {

	private $_count;
	private $_top; // points to the top of the stack

	public function __construct() {
		$this->_count = 0;
		$this->_top = null;
	}

	// getters / setters
	public function getCount() {
		return $this->_count;
	}

	// push new node to stack
	public function push($data) {
		$newNode = new StackNode($data);
		if ($this->_top !== null) {
			$newNode->next = $this->_top;
		}
		$this->_top = &$newNode;
		$this->_count++;
	}

	// pop node off top of stack
	public function pop() {
		if ($this->_top === null) {
			return null;
		}
		$tmp = $this->_top;
		$this->_top = $this->_top->next;
		$this->_count--;
		return $tmp;
	}

	// just using print_r on each node for now
	public function display() {
		if ($this->_top === null) {
			echo "list is empty";
		}

		$printData = array(
			'count' => $this->_count,
			'list' => $this->_top
		);

		print_r($printData);
	}


}

/**
 * StackNode class defines the individual nodes in our LinkedList
 */
class StackNode {
	public $data;
	public $next;

	public function __construct($data=null) {
		$this->data = $data;
		$this->next = null;
	}

	// gets the data in a particular node
	public function getData() {
		return $this->data;
	}
}
