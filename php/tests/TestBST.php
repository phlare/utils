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
		$bst->insert(40, '40');
		$bst->insert(20, '20');
		$bst->insert(60, '60');
		$bst->insert(10, '10');
		$bst->insert(30, '30');
		$bst->insert(50, '50');
		$bst->insert(70, '70');
		$bst->insert(90, '90');
		$bst->insert(15, '15');
		$bst->insert(45, '45');
		$bst->insert(55, '55');
		$bst->insert(35, '35');
		$bst->insert(25, '25');
		$bst->insert(75, '75');
		$bst->insert(5, '5');
		// for ($i = 1; $i <= 15; $i++) {
		// 	do {
		// 		// keep trying until we have a unique key
		// 		$key = rand(1,99);
		// 	} while (in_array($key, $existingKeys));

		// 	$bst->insert($key);
		// 	$existingKeys[] = $key;
		// }
		if ($bst->getCount() !== 15) {
			self::printError("problem with insertion. should be 15 keys");
		}

		// display... for now
		$bst->display();

		// test remove
		$result = $bst->remove(50);
		$result = $bst->remove(70);


		// display... for now
		$bst->display();


	}

	public static function printError($message) {
		echo "ERROR: " . $message . "\n";
	}

}

testBST::init();
