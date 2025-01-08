class Node<T> {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
}

export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;
    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>;

    constructor(private capacity: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        const node = this.lookup.get(key);

        if (!node) {
            const newNode = this.createNode(value);
            this.prepend(newNode);

            this.lookup.set(key, newNode);
            this.reverseLookup.set(newNode, key);

            this.length++;
            this.trimCache();
        } else {
            node.value = value;

            this.detach(node);
            this.prepend(node);
        }
    }

    get(key: K): V | undefined {
        const node = this.lookup.get(key);

        if (!node) {
            return undefined;
        }

        this.detach(node);
        this.prepend(node);

        return node.value;
    }

    private createNode(value: V) {
        return { value };
    }

    private detach(node: Node<V>): void {
        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (this.head === node) {
            this.head = this.head.next;
        }

        if (this.tail === node) {
            this.tail = this.tail.prev;
        }

        node.next = undefined;
        node.prev = undefined;
    }

    private prepend(node: Node<V>): void {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head.prev = node;
        node.next = this.head;

        this.head = node;
    }

    private trimCache(): void {
        if (this.length <= this.capacity) {
            return;
        }

        const tail = this.tail as Node<V>;
        this.detach(this.tail as Node<V>);

        const key = this.reverseLookup.get(tail) as K;

        this.lookup.delete(key);
        this.reverseLookup.delete(tail);

        this.length--;
    }
}
