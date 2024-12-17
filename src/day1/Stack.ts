type Node<T> = {
    val: T;
    next?: Node<T>;
};

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    push(item: T): void {
        this.length++;

        const itemNode: Node<T> = { val: item };

        if (!this.head) {
            this.head = itemNode;
            return;
        }

        itemNode.next = this.head;
        this.head = itemNode;
    }

    pop(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length--;

        const head = this.head;

        if (this.length === 0) {
            this.head = undefined;
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
