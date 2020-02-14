function heapSort(arr) {
    arr.heapSize = arr.length
    for (let i = Math.floor(arr.heapSize / 2); i >= 0; i--) {
        maxHeapify(arr, i)
    }
    for (let i = arr.heapSize - 1; i > 0; i--) {
        swap(arr, 0, i)
        arr.heapSize--
        maxHeapify(arr, 0)
    }
    delete arr.heapSize
    return arr
}

function maxHeapify(arr, i) {
    let left = 2*i + 1
    let right = 2*i + 2
    let largest = i
    if (left < arr.heapSize && arr[left] > arr[largest]) {
        largest = left
    }
    if (right < arr.heapSize && arr[right] > arr[largest]) {
        largest = right
    }
    if (largest != i) {
        swap(arr, i, largest)
        maxHeapify(arr, largest)
    }
}

function swap(arr, firstIndex, secondIndex) {
    let temp = arr[firstIndex]
    arr[firstIndex] = arr[secondIndex]
    arr[secondIndex] = temp
}

module.exports = heapSort