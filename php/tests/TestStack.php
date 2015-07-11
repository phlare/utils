<?php
include(dirname(__FILE__)."/../Stack.php");

/**
 * just a quick-and-dirty test class I used when building and just kept in.
 */
class testStack {
	/* not sure if i'll keep these tests here */

	public static function init() {
		self::testNode();
		self::testStructure();
	}

	public static function testNode() {
		// test ListNode()
		$node1 = new StackNode('test');
		if ($node1->getData() !== 'test') {
			self::printError("problem setting intial node");
		}

		$node2 = new StackNode('test2');
		$node2->next = &$node1;
		if ($node2->next->getData() !== 'test') {
			self::printError("problem updating next on Stack Node");
		}
	}

	public static function testStructure() {
		$stack = new Stack();
		if ($stack->getCount() !== 0) {
			self::printError("problem creating a new stack - count not 0");
		}

		// test push
		$stack->push('push1');
		$stack->push('push2');
		$stack->push('push3');
		$stack->push('push4');
		$stack->push('push5');
		$stack->push('push6');
		if ($stack->getCount() !== 6) {
			self::printError("problem pushing to stack - count not 6");
		}

		// test pop
		$data1 = $stack->pop();
		if ($data1 !== 'push6') {
			self::printError("problem popping from stack - wrong item found");
		}
		if ($stack->getCount() !== 5) {
			self::printError("problem popping from stack - count not 5");
		}


		// display... for now
		$stack->display();
	}

	public static function printError($message) {
		echo "ERROR: " . $message . "\n";
	}

}

testStack::init();
