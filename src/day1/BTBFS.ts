class QueueNode<T> {
    public val: T;
    public next?: QueueNode<T>;

    constructor(val: T) {
        this.val = val;
        this.next = undefined;
    }
}

class Queue<T> {
    public length: number;
    private head?: QueueNode<T>;
    private tail?: QueueNode<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    dequeue(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length--;
        const headValue = this.head.val;

        if (this.length === 0) {
            this.head = this.tail = undefined;
        } else {
            this.head = this.head.next;
        }

        return headValue;
    }

    enqueue(item: T): void {
        this.length++;

        const itemNode = new QueueNode(item);

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
}

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const queue = new Queue<BinaryNode<number>>();

    queue.enqueue(head);

    while (queue.length) {
        const curr = queue.dequeue() as BinaryNode<number>;

        if (curr.value === needle) {
            return true;
        }

        if (curr.left) {
            queue.enqueue(curr.left);
        }

        if (curr.right) {
            queue.enqueue(curr.right);
        }
    }

    return false;
}
