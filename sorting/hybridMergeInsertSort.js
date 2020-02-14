function hybridMergeInsertSort(arr) {
    if (arr.length < 10) return insertionSort(arr)
    let middle = Math.floor(arr.length / 2)
    let left = arr.slice(0, middle)
    let right = arr.slice(middle)
    return merge(hybridMergeInsertSort(left), hybridMergeInsertSort(right))
}

function merge(left, right) {
    let result = []
    let i = 0, j = 0
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i])
            i++
        } else {
            result.push(right[j])
            j++
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j))
}

function insertionSort(arr) {
    let i, j
    for (i = 0; i < arr.length; i++) {
        let temp = arr[i]
        for (j = i-1; j > -1 && arr[j] > temp; j--) {
            arr[j+1] = arr[j]
        }
        arr[j+1] = temp
    }
    return arr
}

module.exports = hybridMergeInsertSort