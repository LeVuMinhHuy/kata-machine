function walk(
    graph: WeightedAdjacencyList,
    curr: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {
    // basecase
    if (curr === needle) {
        path.push(curr);
        return true;
    }

    if (seen[curr]) {
        return false;
    }

    seen[curr] = true;

    // recurse

    // prev
    path.push(curr);

    // recurse
    const edges = graph[curr];

    for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];

        if (walk(graph, edge.to, needle, seen, path)) {
            return true;
        }
    }

    // post
    path.pop();

    return false;
}

export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = [];

    walk(graph, source, needle, seen, path);

    if (!path.length) return null;

    return path;
}
