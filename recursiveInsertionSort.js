function recursiveInsertionSort(arr, j) {
    if (arr.length < 2) return arr
    if (j > arr.length) return arr
    console.log(arr.length)
    console.log(j)
    if (!j) {
        let j = 0
    }
    console.log(j)
    let i = j-1
    let temp = arr[i]
    while (i > -1 && arr[i] > temp) {
        arr[i-1] = arr[i]
        i--
    }
    arr[i+1] = temp
    return recursiveInsertionSort(arr, j+1)
    return arr
}

module.exports = recursiveInsertionSort

console.log(recursiveInsertionSort([6, 15, 221, 9, 11, 43]))