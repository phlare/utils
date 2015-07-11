<?php
/**
 * LinkedList is a basic php implementation of a Linked List
 *
 * @package    Utils
 * @author     Mark Nelson <mark@nelsonwebsolutions.com>
 * @license    dunno yet. MIT probably
 * @version    0.01
 */
class LinkedList {
	private $_firstNode;
	private $_lastNode;
	private $_count;

	public function __construct() {
		$this->_firstNode = null;
		$this->_lastNode = null;
		$this->_count = 0;
	}

	public function getCount() {
		return $this->_count;
	}

	public function insertFront($data) {
		// just use insertAt
		$this->insertAt($data, 0);
	}

	public function insertEnd($data) {
		// just use insertAt
		$this->insertAt($data, $key = $this->_count);
	}

	public function insertAt($data, $key) {
		// verify this is a reasonable key
		if ($key <= $this->_count && $key >= 0) {

			// create our new node
			$newNode = new ListNode($data);
			// iterate through, keeping track of previous as well
			$current = $this->_firstNode;
			$previous = NULL;
			for ($i = 0; $i < $key; $i++) {
				$previous = $current;
				$current = $current->next;
			}
			// set the next property of the new node to the node currently at the key
			$newNode->next = $current;
			// set the next property of the previous node to the new node
			$previous->next = &$newNode;
			// if there isnt' any firstNode yet, this is it
			if ($this->_firstNode === null || $key == 0) {
				$this->_firstNode = &$newNode;
			}
			// if there isnt' any lastNode yet, this is it
			if ($this->_lastNode === null) {
				$this->_lastNode = &$newNode;
			}
			// increment the count
			$this->_count++;
		}
	}

	public function find($value) {

	}

	public function reverse() {

	}

	// deletes by value
	public function delete($value) {

	}

	// deltes by key
	public function deleteAt($key) {
		// verify this is a reasonable key
		if ($key < $this->_count && $key >= 0) {
			// iterate through, keeping a pointer to previous
			$current = $this->_firstNode;
			$previous = NULL;
			for($i = 0; $i < $key; $i++) {
				$previous = $current;
				$current = $current->next;
			}
			if ($key === 0) {
				$this->_firstNode = $current->next;
			} else {
				//  set the next property of the previous item to be the item after the one we're deleting
				$previous->next = $current->next;
			}

			$this->_count--;
		}
	}

	public function emptyList() {
		$this->_firstNode = $this->_lastNode = null;
		$this->_count = 0;
	}

	public function getAt($key) {
		// use _count to make sure this is a reasonable key
		if ($key >= $this->_count || $key < 0) {
			return null;
		}
		// iterate through and call getData on the node at the proper key
		$current = $this->_firstNode;
		for ($i = 0; $i < $key; $i++) {
			$current = $current->next;
		}
		return $current->getData();
	}

	// just using print_r on each node for now
	public function display() {
		// if ($this->_firstNode === null) {
		// 	echo "list is empty";
		// }
		// // iterate through and print each node
		// $current = $this->_firstNode;
		// while($current !== null) {
		// 	print_r($current);
		// 	$current = $current->next;
		// }

		// for now just doing print_r on the first node
		print_r($this->_firstNode);
	}


}

class ListNode {
	public $data;
	public $next;

	public function __construct($data = null, &$next = null) {
		$this->data = $data;
		$this->next = $next; // not sure if i'll use this yet
	}

	public function getData() {
		return $this->data;
	}
}
