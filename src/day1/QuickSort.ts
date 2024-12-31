// 2. do the recursion
// input: whole array, low, high
// base case: if low >=high -> stop
// do: call partitioning -> get pivot -> call partitioning to [left] and [right]

function qs_recursion(arr: number[], lo: number, hi: number): void {
    if (lo >= hi) {
        return;
    }

    const pivot = partitioning(arr, lo, hi);

    partitioning(arr, lo, pivot - 1);
    partitioning(arr, pivot + 1, hi);
}

// 1. partitioning
// input: whole array, low, high
// -> [less than pivot] : pivot : [greater than pivot]

function partitioning(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi];

    let idx = lo - 1;

    for (let i = lo; i < hi - 1; i++) {
        if (arr[i] < pivot) {
            idx++;

            const tmp = arr[idx];
            arr[idx] = arr[i];
            arr[i] = tmp;
        }
    }

    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;

    return idx;
}

// idea:
// input: array
// do recursion: [less than pivot] : pivot : [greater than pivot]
// until [less] and [greater] array only 1 item left, or empty -> sorted

export default function quick_sort(arr: number[]): void {
    qs_recursion(arr, 0, arr.length - 1);
}
