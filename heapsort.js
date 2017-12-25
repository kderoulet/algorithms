var arrayLength;

function buildHeap(array) {
    arrayLength = array.length;

    for (var i = Math.floor(arrayLength / 2); i >= 0; i -= 1) {
        heapify(array, i);
    }
}

function heapify(array, i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var largest = i;

    if (left < arrayLength && array[left] > array[largest]) {
        largest = left;
    }

    if (right < arrayLength && array[right] > array[largest]) {
        largest = right;
    }

    if (largest != i) {
        swap(array, i, largest);
        heapify(array, largest);
    }
}

function swap(array, index_A, index_B) {
    var temp = array[index_A];

    array[index_A] = array[index_B];
    array[index_B] = temp;
}

function heapSort(array) {
    buildHeap(array);

    for (var i = array.length - 1; i > 0; i--) {
        swap(array, 0, i);
        arrayLength--;
        heapify(array, 0);
    }
}

var exampleArray = [7, 5, 2, 1, 4, 3, 6];
heapSort(exampleArray);
console.log(exampleArray)
