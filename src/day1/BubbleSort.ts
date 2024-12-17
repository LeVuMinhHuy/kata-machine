// Approach 1, do it myself

//export default function bubble_sort(arr: number[]): void {
//    const l = arr.length;
//    let i = 0;
//
//    while (l - i > 0) {
//        for (let j = 0; j < l - i - 1; j++) {
//            if (arr[j] > arr[j + 1]) {
//                const temp = arr[j + 1];
//                arr[j + 1] = arr[j];
//                arr[j] = temp;
//            }
//        }
//
//        i++;
//    }
//}
//
export default function bubble_sort(arr: number[]): void {
    const l = arr.length;

    for (let i = 0; i < l; i++) {
        for (let j = 0; j < l - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                const tmp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = tmp;
            }
        }
    }
}
