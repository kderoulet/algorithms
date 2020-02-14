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
    let i = p-1
    if (r - p > 10) {
        random(p, r)
        let piv1 = random(p, r),
         piv2 = random(p, r), 
         piv3 = random(p, r)
        while(piv1 == piv2) {
            piv2 = random(p, r)
        }
        while (piv1 == piv3) {
            piv3 = random(p, r)
        }
        while (piv2 == piv3) {
            random(p, r)
        }
        if (piv1 > piv2 && piv1 < piv3) {
            i = piv1
        } else if (piv2 > piv1 && piv2 < piv3) {
            i = piv2
        } else {
            i = piv3
        }
    }
    for (let j = p; j < r; j++) {
        if (arr[j] <= arr[r]) {
            i = i+1
            swap(arr, i, j)
        }
    }
    swap(arr, i+1, r)
    return i+1
}

function random(p, r) {
    return Math.floor(Math.random() * (r - p) + p)
}

function randomQuickSort(arr) {
    sort(arr)
    return arr
}

module.exports = randomQuickSort