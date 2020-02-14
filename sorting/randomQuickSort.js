function sort(arr, p=0, r=arr.length-1) {
    if (p < r) {
        let q = randomizedPartition(arr, p, r)
        sort(arr, p, q-1)
        sort(arr, q+1, r)
    }
}

function swap(arr, firstIndex, secondIndex) {
    let temp = arr[firstIndex]
    arr[firstIndex] = arr[secondIndex]
    arr[secondIndex] = temp
}

function randomizedPartition(arr, p, r) {
    let i = Math.floor(Math.random() * (r - p) + p)
    swap(arr, i, r)
    i = p-1
    for (let j = p; j < r; j++) {
        if (arr[j] <= arr[r]) {
            i = i+1
            swap(arr, i, j)
        }
    }
    swap(arr, i+1, r)
    return i+1
}

function randomQuickSort(arr) {
    sort(arr)
    return arr
}

module.exports = randomQuickSort