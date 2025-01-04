// recursion function
function walk(curr: BinaryNode<number> | null, needle: number): boolean {
    // base case first
    // ===============

    // 1. can't walk anymore
    if (curr === null) {
        return false;
    }
    // 2. found
    if (curr.value === needle) {
        return true;
    }

    // recurse
    // =======

    // still so small, go right ->
    if (curr.value < needle) {
        return walk(curr.right, needle);
    }

    // otherwise, it's too big now, go left <-
    return walk(curr.left, needle);
}

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    // now start to walk
    // from the head
    return walk(head, needle);
}
