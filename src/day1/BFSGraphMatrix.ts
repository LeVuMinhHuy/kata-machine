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

export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const seen = new Array(graph.length).fill(false);
    const prev = new Array(graph.length).fill(-1);

    // bfs so we need a queue
    const q: Queue<number> = new Queue();

    // start at source
    q.enqueue(source);
    seen[source] = true;

    do {
        // dequeue first
        const curr = q.dequeue();

        if (curr === undefined || curr === needle) {
            break;
        }

        // get the node that curr point to
        // check if we've seen it ? otherwise mark it as seen and update it's prev as curr
        //
        // we are using adjency matrix so we need to get the node with this loop
        const adjs = graph[curr];

        for (let i = 0; i < adjs.length; i++) {
            const weigth = adjs[i];

            if (weigth === 0 || seen[i]) continue;

            prev[i] = curr;
            seen[i] = true;

            // enqueue it
            q.enqueue(i);
        }
    } while (q.length);

    // if not find neddle
    if (prev[needle] === -1) return null;

    // now we got the prev list, meaning we know which node is come from which node
    // so now we only need to find backwards from our needle, until we get prev as -1, mean it's a source

    let curr = needle;
    const path: number[] = [];

    while (prev[curr] !== -1) {
        path.push(curr);
        curr = prev[curr];
    }

    return [source].concat(path.reverse());
}
