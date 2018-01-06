function swap(array, firstIndex, secondIndex) {
    let temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
}

function partition(array, left, right) {
    let pivot = array[Math.floor((left + right) / 2)]
    let i = left;
    let j = right;

    while (i <= j) {
        while (array[i] < pivot) {
            i++;
        }
        while (array[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(array, i, j)
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(array, left, right) {
    let index;
    if (array.length > 1) {
        index = partition(array, left, right)
        if (left < index - 1) {
            quickSort(array, left, index - 1)
        }
        if (index < right) {
            quickSort(array, index, right)
        }
    }
    return array;
}
let arr = [5, 2, 4, 9, 6, 1, 3, 8, 7]
let result = quickSort(arr, 0, arr.length - 1)
console.log(result)