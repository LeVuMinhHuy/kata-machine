type Node<T> = {
    val: T;
    next?: Node<T>;
    prev?: Node<T>;
};

export default class DoublyLinkedList<T> {
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

    prepend(item: T): void {
        this.length++;

        const itemNode: Node<T> = { val: item };

        if (!this.head && !this.tail) {
            this.head = this.tail = itemNode;
            return;
        }

        if (this.head) {
            itemNode.next = this.head;
            this.head.prev = itemNode;
            this.head = itemNode;
        }
    }

    insertAt(item: T, idx: number): void {
        this.length++;

        if (idx === 0) {
            this.prepend(item);
            return;
        }

        const prev = this.traverseIdx(idx - 1);
        const itemNode: Node<T> = { val: item };

        if (prev) {
            const cur = prev.next;

            prev.next = itemNode;
            itemNode.prev = prev;

            if (cur) {
                itemNode.next = cur;
                cur.prev = itemNode;
                cur.next = undefined;
            }
        }
    }

    append(item: T): void {
        this.length++;

        const itemNode: Node<T> = { val: item };

        if (!this.head && !this.tail) {
            this.head = this.tail = itemNode;
            return;
        }

        if (this.tail) {
            this.tail.next = itemNode;
            itemNode.prev = this.tail;
            this.tail = itemNode;
        }
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

            if (this.length === 0) {
                const head = this.head;
                this.head = this.tail = undefined;
                return head?.val;
            }
        }

        if (idx === 0) {
            if (this.head) {
                const head = this.head;
                this.head = this.head.next;

                if (this.head) {
                    this.head.prev = undefined;
                }

                return head.val;
            } else {
                return undefined;
            }
        }

        if (idx === this.length) {
            if (this.tail) {
                const tail = this.tail;
                this.tail = this.tail.prev;

                if (this.tail) {
                    this.tail.next = undefined;
                }

                return tail.val;
            } else {
                return undefined;
            }
        }

        const prev = this.traverseIdx(idx - 1);

        if (prev) {
            const cur = prev.next;
            prev.next = cur?.next;

            if (cur?.next) {
                cur.next.prev = prev;
            }

            if (cur) {
                cur.next = undefined;
                return cur.val;
            }
        }

        return undefined;
    }
}
