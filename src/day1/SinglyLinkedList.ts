type Node<T> = {
    val: T;
    next?: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    private traverseIdx(idx: number): Node<T> | undefined {
        let cur = this.head;

        for (let i = 0; i < idx; i++) {
            if (cur?.next) {
                cur = cur.next;
            } else {
                return undefined;
            }
        }

        return cur;
    }

    private traverseItem(item: T): number {
        let cur = this.head;

        for (let i = 0; i < this.length; i++) {
            if (cur?.val === item) {
                return i;
            }

            if (cur?.next) {
                cur = cur.next;
            }
        }

        return -1;
    }

    // append it at head
    prepend(item: T): void {
        this.length++;

        const itemNode: Node<T> = { val: item };

        if (this.head) {
            itemNode.next = this.head;
        }

        this.head = itemNode;
    }

    insertAt(item: T, idx: number): void {
        const prev = this.traverseIdx(idx - 1);
        const itemNode: Node<T> = { val: item };

        if (idx === 0) {
            this.prepend(item);
            return;
        }

        if (idx === length - 1) {
            this.append(item);
            return;
        }

        if (prev) {
            itemNode.next = prev.next?.next;
            prev.next = itemNode;
        }
    }

    // append it at tail
    append(item: T): void {
        const itemNode: Node<T> = { val: item };

        this.length++;

        if (!this.head && !this.tail) {
            this.head = this.tail = itemNode;
            return;
        }

        if (this.tail) {
            this.tail.next = itemNode;
        }

        this.tail = itemNode;
    }

    remove(item: T): T | undefined {
        const idx = this.traverseItem(item);

        if (idx === -1) {
            return undefined;
        }

        return this.removeAt(idx);
    }

    get(idx: number): T | undefined {
        return this.traverseIdx(idx)?.val;
    }

    removeAt(idx: number): T | undefined {
        if (idx >= this.length) {
            return undefined;
        }

        if (this.length > 0) {
            this.length--;
        }

        if (idx === 0) {
            if (this.head) {
                const head = this.head;
                this.head = this.head.next;
                head.next = undefined;

                return head.val;
            } else {
                return undefined;
            }
        }

        const prev = this.traverseIdx(idx - 1);

        if (prev && prev.next) {
            const cur = prev.next;
            prev.next = prev.next?.next;
            cur.next = undefined;

            return cur.val;
        }

        return undefined;
    }
}
