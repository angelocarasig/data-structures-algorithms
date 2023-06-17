import 'core-js'

import Trie from "./Trie";

function testTrie(): void {
    const trie = new Trie();
    trie.insert("Apple");
    trie.insert("App");
    trie.printAllWords();

    trie.delete("Apple");
    trie.printAllWords();

}

function testStructures(): void {
    testTrie();
}

testStructures();