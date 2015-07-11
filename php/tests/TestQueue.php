<?php
include(dirname(__FILE__)."/../Queue.php");

/**
 * just a quick-and-dirty test class I used when building and just kept in.
 */
class testQueue {
	/* not sure if i'll keep these tests here */

	public static function init() {
		self::testNode();
		self::testStructure();
	}

	public static function testNode() {
		// test ListNode()
		$node1 = new QueueNode('test');
		if ($node1->getData() !== 'test') {
			self::printError("problem setting intial node");
		}

		$node2 = new QueueNode('test2');
		$node2->next = &$node1;
		if ($node2->next->getData() !== 'test') {
			self::printError("problem updating next on Queue Node");
		}
	}

	public static function testStructure() {
		$queue = new Queue();
		if ($queue->getCount() !== 0) {
			self::printError("problem creating a new queue - count not 0");
		}

		// test enqueue
		$queue->enqueue(1);
		$queue->enqueue(2);
		$queue->enqueue(3);
		$queue->enqueue(4);
		$queue->enqueue(5);
		if ($queue->getCount() !== 5) {
			self::printError("problem enqueueing.  count not 5");
		}

		// display... for now
		$queue->display();

		// test dequeue
		$data = $queue->dequeue();
		if ($data !== 1) {
			self::printError("problem dequeueing. value not 1");
		}
		if ($queue->getCount() !== 4) {
			self::printError("problem dequeueing. count not 4");
		}
		$data = $queue->dequeue();
		$data = $queue->dequeue();
		$data = $queue->dequeue();
		$data = $queue->dequeue();
		if ($data !== 5) {
			self::printError("problem dequeueing. value not 5");
		}
		if ($queue->getCount() !== 0) {
			self::printError("problem dequeueing. count not 0");
		}

		// display... for now
		$queue->display();
	}

	public static function printError($message) {
		echo "ERROR: " . $message . "\n";
	}

}

testQueue::init();
