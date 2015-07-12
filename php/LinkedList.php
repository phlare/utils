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

	// returns count of elements in list
	public function getCount() {
		return $this->_count;
	}

	// insert new node at front of list
	public function insertFront($data) {
		// just use insertAt
		$this->insertAt($data, 0);
	}

	// insert new node at end of list
	public function insertEnd($data) {
		// just use insertAt
		$this->insertAt($data, $key = $this->_count);
	}

	// insert new node at a given index
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

	// reverses order of list
	public function reverse() {
		// if the list is empty or only has one element, do nothing
		if ($this->_count > 1) {

			// iterate through, fixing the pointers as we go
			$current = $this->_firstNode;
			$previous = null;
			while ($current !== null) {
				if ($current == $this->_firstNode) {
					$this->_lastNode = $current;
				}
				$next = $current->next;
				$current->next = $previous;
				$previous = $current;
				$current = $next;
			}
			$this->_firstNode = $previous;
		}
	}

	// deletes by value
	public function delete($value) {
		// iterate through until end or until we find the key
		$current = $this->_firstNode;
		$previous = NULL;
		// while we haven't found the key...
		while ($current->getData() !== $value) {
			// if we've reached the end without finding it, return null
			if ($current->next === null) {
				return null;
			}
			$previous = $current;
			$current = $current->next;
		}
		$this->_executeDelete($current, $previous);
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
			$this->_executeDelete($current, $previous);
		}
	}

	// helper function for the other deletes
	private function _executeDelete(&$current, &$previous) {
		// if there is no previous, than set the firstNode properly to the node after what we're deleting
		if ($previous === NULL) {
			$this->_firstNode = $current->next;
		} else {
			// otherwise set the next property of the previous item to be the item after the one we're deleting
			$previous->next = $current->next;
		}
		// decrement count
		$this->_count--;
	}

	// completely empties the list
	public function emptyList() {
		$this->_firstNode = $this->_lastNode = null;
		$this->_count = 0;
	}

	// get teh value of a node at a given index
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

		$printData = array(
			'count' => $this->_count,
			'list' => $this->_firstNode
		);

		print_r($printData);
	}


}

/**
 * ListNode class defines the individual nodes in our LinkedList
 */
class ListNode {
	public $data;
	public $next;

	public function __construct($data = null, &$next = null) {
		$this->data = $data;
		$this->next = $next; // not sure if i'll use this yet
	}

	// gets the data in a particular node
	public function getData() {
		return $this->data;
	}
}
