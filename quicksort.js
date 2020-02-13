function quickSort(arr) {
    if (arr.length < 2) return arr
    let pivot = arr[arr.length-1]
    let left = [], right = []
    for (let i = 0; i < arr.length-1; i++) {
        if (arr[i] <= pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat(pivot).concat(quickSort(right))
}

module.exports = quickSort