type Node<T> = {
    val: T;
    next?: Node<T>;
};

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    enqueue(item: T): void {
        this.length++;

        const itemNode: Node<T> = { val: item };

        if (!this.head && !this.tail) {
            this.head = this.tail = itemNode;
            return;
        }

        if (this.tail) {
            this.tail.next = itemNode;
            this.tail = itemNode;
        }

        return;
    }

    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length--;
        const head = this.head;

        if (this.length === 0) {
            this.head = this.tail = undefined;
            return head.val;
        }

        this.head = this.head.next;
        head.next = undefined;

        return head.val;
    }

    peek(): T | undefined {
        return this.head?.val;
    }
}
