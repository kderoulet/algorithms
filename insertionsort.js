function insertionSort(arr) {
    let i;
    let j;
    for (i = 0; i < arr.length; i++) {
        let value = arr[i]
        for (j = i-1; j > -1 && arr[j] > value; j--) {
            arr[j+1] = arr[j]
        }
        arr[j+1] = value;
    }
    return arr;
}

let exampleArray = [7, 5, 2, 1, 4, 3, 6]
console.log(insertionSort(exampleArray))