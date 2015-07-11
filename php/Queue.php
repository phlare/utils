<?php
/**
 * Queue is a basic php implementation of a Queue data structure (FIFO)
 *
 * @package    Utils
 * @author     Mark Nelson <mark@nelsonwebsolutions.com>
 * @license    dunno yet. MIT probably
 * @version    0.01
 */
class Queue {

	private $_front; // front of queue (next to be dequeued)
	private $_end;   // end of queue (most recent node queued)
	private $_count;

	public function __construct() {
		$this->_front = null;
		$this->_end = null;
		$this->_count = 0;

	}

	// getters / setters
	public function getCount() {
		return $this->_count;
	}

	// enqueue a new node
	public function enqueue($data) {
		$newNode = new QueueNode($data);
		if ($this->_end !== null) {
			$this->_end->next = &$newNode;
		}
		if ($this->_front === null) {
			$this->_front = &$newNode;
		}
		$this->_end = &$newNode;
		$this->_count++;
	}

	// dequeue the next node
	public function dequeue() {
		if ($this->_front === null) {
			return null;
		}
		$tmp = $this->_front;
		if ($tmp->next !== null) {
			$this->_front = $tmp->next;
		} else {
			$this->_front = $this->end = null;
		}
		$this->_count--;

		// return only the data
		$data = $tmp->getData();
		unset($tmp); // clean up this node
		return $data;
	}

	// just using print_r on each node for now
	public function display() {
		if ($this->_front === null) {
			echo "queue is empty";
		}

		$printData = array(
			'count' => $this->_count,
			'queue' => $this->_front
		);

		print_r($printData);
	}


}

/**
 * QueueNode class defines the individual nodes in our LinkedList
 */
class QueueNode {
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
