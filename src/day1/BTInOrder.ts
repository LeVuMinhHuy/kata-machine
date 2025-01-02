function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
    if (!curr) {
        return path;
    }

    // pre

    // recurse
    walk(curr.left, path);
    path.push(curr.value); // visit the node
    walk(curr.right, path);

    // post
    // do nothing

    return path;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
