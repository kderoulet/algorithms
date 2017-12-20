function mergeSort(arr) {
    if (arr.length < 2)
    return arr;

    let middle = Math.floor(arr.length / 2)
    let left = arr.slice(0, middle);
    let right = arr.slice(middle)
    return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
    let result = [];
    let j = 0;
    let k = 0;
    while (j < left.length && k < right.length) {
        if (left[j] <= right[k]) {
            result.push(left[j]);
            j++;
        } else {
            result.push(right[k]);
            k++
        }
    }
    return result.concat(left.slice(j)).concat(right.slice(k));
}

let exampleArray = [26, 35, 11, 197, 4]
let sortedArray = mergeSort(exampleArray)
console.log(sortedArray)