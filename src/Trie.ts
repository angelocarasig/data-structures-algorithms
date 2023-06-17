// Trie is pronounced "try" like in "re-try" or "try again"
class TrieNode {
    public children: Map<string, TrieNode> = new Map();
    public isWord: boolean = false;
}

class Trie {
    public root: TrieNode;
    
    constructor() {
        this.root = new TrieNode();
    }

    public insert(word: string): void {
        // Empty, only holds children
        let currentNode: TrieNode = this.root;

        // Iterate through the tree
        for (let i = 0; i < word.length; i++) {
            // Set the current character
            let char: string = word[i];
            
            // Get next node from the current node's children
            let nextNode: TrieNode | undefined = currentNode.children.get(char);

            // If the current node's children doesn't have the next node, create it and add it to the children
            if (!nextNode) {
                nextNode = new TrieNode();
                currentNode.children.set(char, nextNode);
            }

            currentNode = nextNode;
        }
        currentNode.isWord = true;
    }

    public search(word: string): boolean {
        let currentNode: TrieNode = this.root;
    
        for (let i = 0; i < word.length; i++) {
          const char: string = word[i];
          const nextNode: TrieNode | undefined = currentNode.children.get(char);
    
          if (!nextNode) {
            return false; // Word not found
          }
    
          currentNode = nextNode;
        }
    
        return currentNode.isWord; // True if the word exists in the Trie
    }

    public delete(word: string): void {
        this.deleteHelper(this.root, word, 0);
    }
  
    private deleteHelper(currentNode: TrieNode, word: string, index: number): boolean {
        // WORD LENGTH
        if (index === word.length) {
            // Reached the end of the word
            if (!currentNode.isWord) { 
                return false; // Word doesn't exist in the Trie
            }
  
            currentNode.isWord = false; // Mark the node as not representing a word
            return currentNode.children.size === 0; // Return true if the node has no children
        }
  
        // MISSING WORD
        const char = word[index];
        const nextNode: TrieNode | undefined = currentNode.children.get(char);
  
        if (!nextNode) {
            return false; // Word doesn't exist in the Trie
        }
  
        // RECURSIVE STEP
        const shouldDeleteChild: boolean = this.deleteHelper(nextNode, word, index + 1);
  
        // RECURSIVE STEP: DELETE-CLEANUP
        if (shouldDeleteChild) {
                      if (currentNode.isWord) {
                          return false; //Stop deleting, a substring exists
                      }
            currentNode.children.delete(char); // Delete the child node if it should be deleted and the next word is not a word
            return currentNode.children.size === 0; // Return true if the node has no other children
        }
  
        return false; // Word still exists in the Trie
    }

    public printAllWords(): void {
        this.printAllWordsHelper(this.root, '');
    }

    private printAllWordsHelper(node: TrieNode, currentWord: string): void {
        if (node.isWord) {
            console.log(currentWord);
        }

        for (const [char, childNode] of node.children) {
            this.printAllWordsHelper(childNode, currentWord + char);
        }
    }
}

export default Trie;