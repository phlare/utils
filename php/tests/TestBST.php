<?php
include(dirname(__FILE__)."/../BST.php");

/**
 * just a quick-and-dirty test class I used when building and just kept in.
 */
class testBST {
	/* not sure if i'll keep these tests here */

	public static function init() {
		self::testNode();
		self::testStructure();
	}

	public static function testNode() {
		// test ListNode()
		$node1 = new BSTNode(1,'test');
		if ($node1->getData() !== 'test') {
			self::printError("problem setting intial node");
		}

		// $node2 = new BSTNode('test2');
		// $node2->next = &$node1;
		// if ($node2->next->getData() !== 'test') {
		// 	self::printError("problem updating next Node");
		// }
	}

	public static function testStructure() {
		$bst = new BST();
		if ($bst->getCount() !== 0) {
			self::printError("problem creating a new BST - count not 0");
		}

		$existingKeys = array();
		for ($i = 1; $i <= 15; $i++) {
			do {
				// keep trying until we have a unique key
				$key = rand(1,99);
			} while (in_array($key, $existingKeys));

			$bst->insert($key);
			$existingKeys[] = $key;
		}

		// display... for now
		$bst->display();
	}

	public static function printError($message) {
		echo "ERROR: " . $message . "\n";
	}

}

testBST::init();
