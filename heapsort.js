function heapSort(array) {
    let arrayLength
    buildHeap(array)

    for (let i = array.length - 1; i > 0; i--) {
        swap(array, 0, i)
        arrayLength--
        heapify(array, 0)
        console.log('sorting array ' + array)        
    }
}

function buildHeap(array) {
    arrayLength = array.length
    for (let i = Math.floor(arrayLength / 2); i >= 0; i--) {
        heapify(array, i, arrayLength)
        console.log('building heap: ' + array)        
    }
}

function heapify(array, i, arrayLength) {
    let left = 2 * i + 1
    let right = 2 * i + 2
    let largest = i
    if (left < arrayLength && array[left] > array[largest]) {
        largest = left
    }
    if (right < arrayLength && array[right] > array[largest]) {
        largest = right
    }
    if (largest != i) {
        swap(array, i, largest)
        heapify(array, largest)
    }
}

function swap(array, firstIndex, secondIndex) {
    let temp = array[firstIndex]
    array[firstIndex] = array[secondIndex]
    array[secondIndex] = temp
}

module.export = heapSort

console.log(heapSort([5, 4, 2, 9, 5, 6, 7, 3, 1, 1, 1, 99, 92]))