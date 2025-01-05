class TrieNode {
    isWord: boolean;
    children: Record<string, TrieNode>;

    constructor() {
        this.isWord = false;
        this.children = {};
    }
}

export default class Trie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(item: string): void {
        let node = this.root;

        for (let c of item) {
            if (!node.children[c]) {
                node.children[c] = new TrieNode();
            }

            node = node.children[c];
        }

        node.isWord = true;
    }

    delete(item: string): void {
        const dfs = (
            node: TrieNode | undefined,
            item: string,
            index: number,
        ): boolean => {
            // base case
            // 1. out of trie
            if (!node) {
                return false;
            }

            // 2. end of word
            if (index === item.length) {
                if (!node.isWord) {
                    return false;
                }

                node.isWord = false;

                if (Object.keys(node.children).length) {
                    return false;
                }

                return true;
            }

            // recursion
            // pre
            // get character
            const char = item[index];

            // recurse
            const canDelete = dfs(node.children[char], item, index + 1);

            // post
            if (canDelete) {
                delete node.children[char];

                return !Object.keys(node.children).length && !node.isWord;
            }

            return false;
        };

        dfs(this.root, item, 0);
    }

    find(partial: string): string[] {
        const result: string[] = [];
        let node = this.root;

        for (let c of partial) {
            if (!node.children[c]) {
                return [];
            }

            node = node.children[c];
        }

        const dfs = (node: TrieNode, prefix: string): void => {
            if (node.isWord) {
                result.push(prefix);
            }

            for (const c in node.children) {
                dfs(node.children[c], prefix + c);
            }
        };

        dfs(node, partial);

        return result;
    }
}
