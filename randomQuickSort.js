function randomQuickSort(arr) {
    if (arr.length < 2) return arr
    let pivotIndex = Math.floor(Math.random() * 2)
    let pivot = arr[pivotIndex]
    let left = [], right = []
    for (let i = 0; i < arr.length; i++) {
        if (i === pivotIndex) {
            continue
        } else if (arr[i] <= pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return randomQuickSort(left).concat(pivot).concat(randomQuickSort(right))
}

module.exports = randomQuickSort