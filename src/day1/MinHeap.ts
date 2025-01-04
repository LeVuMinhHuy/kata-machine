export default class MinHeap {
    public data: number[];
    public length: number;

    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }

    delete(): number {
        if (this.length === 0) {
            return -1;
        }

        const min = this.data[0];

        // swap the last item up to become the root
        this.swapItem(0, this.length - 1);

        // remove that min item (now in the last item)
        this.data.pop();

        // update the length
        this.length--;

        // heapify new root item down
        this.heapifyDown(0);

        return min;
    }

    // need some internal utils to support this min heap structure
    //
    // first one is get parent and childs from an index since we're using array list as storage

    // get parent index from child index: (i - 1) / 2 (integer division)
    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    // get left child index from parent index: i * 2 + 1
    private leftChild(idx: number): number {
        // okay so what if it doesn't have a left child
        // means the index of left child is out of range of the array
        // we better return -1 here

        const lIdx = idx * 2 + 1;

        if (lIdx >= this.length) return -1;

        return lIdx;
    }

    // get left child index from parent index: i * 2 + 1
    private rightChild(idx: number): number {
        // okay so what if it doesn't have a left child
        // means the index of left child is out of range of the array
        // we better return -1 here

        const rIdx = idx * 2 + 2;

        if (rIdx >= this.length) return -1;

        return rIdx;
    }

    // okay so then we got all the node
    // what we need now is 2 functions to support the heap's algorithm
    // that is heapifyUp and heapifyDown

    // heap up: move the current index up to it's right place
    // to make sure all the items below it must be larger than itself
    private heapifyUp(idx: number): void {
        // first we get its parent to compare with
        const parentIdx = this.parent(idx);
        const parentVal = this.data[parentIdx];
        const currVal = this.data[idx];

        // we will use recursion to keep checking and moving current item up
        // so we need a basecase first

        // base case
        // 1 . always check if we running out of scope first
        // and because we are moving it up, so idx will be decreased down
        // need to make sure if it reach to 0 -> stop
        if (idx === 0) {
            return;
        }

        // 2. okay so now, if our item value is larger than its parent value
        // it should stop moving up
        if (currVal >= parentVal) {
            return;
        }

        // compare: if current value is still smaller than its parent -> move it up

        if (currVal < parentVal) {
            this.swapItem(idx, parentIdx);

            // then recursively call heapifyUp on the parentIdx
            // (after swapping it's our idx now) to keep move it up
            this.heapifyUp(parentIdx);
        }
    }

    // heap down: move the current index down to it's right place
    // to make sure all the items below it must be larger than itself
    private heapifyDown(idx: number): void {
        // because heap is a week ordered tree, so we don't know
        // left child or right child is smaller, right child can also
        // be smaller than left child (it isn't happen in strong ordered
        // tree like Binary tree)
        // so we need to compare with both left and right child

        // get left and right child
        const lChildIdx = this.leftChild(idx);
        const rChildIdx = this.rightChild(idx);
        const currVal = this.data[idx];
        let sChildIdx = -1;

        // find the smaller one
        if (this.data[lChildIdx] < this.data[rChildIdx]) {
            sChildIdx = lChildIdx;
        } else {
            sChildIdx = rChildIdx;
        }

        // and we also use recursion here so we need a base case first
        // base case
        // always check if it running out of scope yet
        // 1. because we're going down, so idx will be increased
        // need to make sure it doesn't out of length
        if (idx >= this.length || sChildIdx === -1) {
            return;
        }

        // 3.. it can't go down anymore, means it will be smaller
        // than the smaller child
        if (this.data[sChildIdx] && currVal < this.data[sChildIdx]) {
            return;
        }

        // now we recurse to make it goes down
        this.swapItem(idx, sChildIdx);
        this.heapifyDown(sChildIdx);
    }

    private swapItem(currIdx: number, nextIdx: number): void {
        const temp = this.data[currIdx];
        this.data[currIdx] = this.data[nextIdx];
        this.data[nextIdx] = temp;
    }
}
