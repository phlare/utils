<?php
include(dirname(__FILE__)."/../LinkedList.php");

/**
 * just a quick-and-dirty test class I used when building and just kept in.
 */
class testLinkedList {
	/* not sure if i'll keep these tests here */

	public static function init() {
		self::testNode();
		self::testList();
	}

	public static function testNode() {
		// test ListNode()
		$listNode1 = new ListNode('test');
		if ($listNode1->getData() !== 'test') {
			self::printError("problem setting intial data");
		}
		//
		$listNode2 = new ListNode('test2');
		$listNode2->next = &$listNode1;
		if ($listNode2->next->getData() !== 'test') {
			self::printError("problem updating next on List Node");
		}

		$listNode3 = new ListNode('test3', $listNode2);
		if ($listNode3->next->next->getData() !== 'test') {
			self::printError("problem constructing new node with existing link - next->next->data is not 'test'");
		}
	}

	public static function testList() {
		$linkedList = new LinkedList();
		if ($linkedList->getCount() !== 0) {
			self::printError("problem creating a new list - count not 0");
		}

		// test insertFront
		$linkedList->insertFront('insertFront');
		if ($linkedList->getCount() !== 1) {
			self::printError("problem adding first element to front - count not 1");
		}

		// ad a second item to the front
		$linkedList->insertFront('insertFrontAgain');
		if ($linkedList->getCount() !== 2) {
			self::printError("problem adding second element to front - count not 2");
		}

		// test getAt
		if ($linkedList->getAt(0) !== 'insertFrontAgain') {
			self::printError("problem with getAt: not finding first node");
		}
		// test getAt
		if ($linkedList->getAt(12) !== null) {
			self::printError("problem with getAt: accessing nonexisting node should have returned null");
		}

		// test insertEnd
		$linkedList->insertEnd('insertEnd');
		if ($linkedList->getAt(2) !== 'insertEnd' || $linkedList->getCount() !== 3) {
			self::printError("problem with insertEnd: inserted item not found");
		}

		// test insertAt
		$linkedList->insertAt('insertedAt2', 2);
		if ($linkedList->getAt(2) !== 'insertedAt2' || $linkedList->getAt(3) !== 'insertEnd') {
			self::printError("problem with insertAt: inserted value not found at proper key");
		}
		$linkedList->insertAt('insertedAt3', 3);
		if ($linkedList->getAt(3) !== 'insertedAt3') {
			self::printError("problem with insertAt: inserted value not found at proper key");
		}

		// test deleteAt
		$linkedList->deleteAt(3);
		if ($linkedList->getAt(3) === 'insertedAt3') {
			self::printError("problem with deleteAt: deleted node still present");
		}

		// test deleting by value
		$linkedList->delete('insertedAt2');

		// test reverse
		$linkedList->reverse();
		if ($linkedList->getAt(0) !== 'insertEnd') {
			self::printError("problem with reverse");
		}
		$linkedList->reverse();

		// display... for now
		$linkedList->display();

		// test empty
		$linkedList->emptyList();
		if ($linkedList->getCount() !== 0) {
			self::printError("problem with emptyList: list count not zero");
		}

	}

	public static function printError($message) {
		echo "ERROR: " . $message . "\n";
	}

}

testLinkedList::init();
