# Sorting Algorithms
A repository for learning algorithms and other relevant computer science topics, all modeled in JavaScript. 

## Intro to Recursion (recursion.js)

Recursive functions call themselves until their stopping condition is met. Recursive functions begin with a base case, and that case is modified until the stopping condition is met. 

Consider a simple factorial function. Such a function might look like this:

```js
function getFactorial(number) {
    if (number == 1) {
        return number
    }
    return number * getFactorial(number-1)
}
```
As a reminder, a factorial takes a value and multiplies it by each descending non-negative, non-zero integer. So 5 factorial (5!) gives us `5*4*3*2*1` = 120. (The above function ignores edge cases; see recursion.js for a fleshed out example)

So, how does the above function work? Let's take getFactorial(5) as our example.
1. The function is called with the number 5 as an argument.
2. Since 5 != 1, the number is not returned.
3. So 5 * getFactorial(4) is returned.
4. The function continues to loop until `number == 1`, when only 1 is returned, so we are left with `5*4*3*2*1`. 

Now, the factorial example might not be the best use case for a recursive function, but hopefully the above example does demonstrate essentially how recursive functions work. 

#### An aside: Recursion or Iteration?

All iterative functions can be written recursively, and all recursive functions can be written iteratively. So, when do we choose one or the other? Essentially, when an iterative solution makes sense, it's a good time for iteration. When recursion makes more sense, then it's a good time for recursion. Often, those with traditional computer science backgrounds prefer recursive approaches, while developers without traditional computer science backgrounds tend to first learn iterative solutions (especially for-loops). Iterative functions often make the most sense with linear processes, such as comparing each value in an array to each value in another array. Recursive functions tend to be an especially good option when a "divide and conquer" approach is needed for solving a problem, such as our next alogorithm: mergesort.

#### Divide and Conquer

Dividing and conquering has 3 steps at each level of recursion: 
1. Divide the problem into subproblems that replicate the problem at a smaller scale.
2. Conquer the problems by solving recursively (or, if the subproblems are sufficiently small, solve the subproblems in a cleaner, more straightforward manner).
3. Combine the solutions to the subproblems into the solution for the original problem. 

## Big O notation

Before diving into sorting algorithms, it's worth understanding the way in which sorting algorithms are evaluated. Algorithms are typically evaluated in big O notation, which is meant to show how the algorithm's runtime increases in proportion to its input. For instance, a perfectly efficient algorithm would have a runtime of O(1)--this demonstrates that as the input length increases, the algorithm's runtime stays constant. O(n) depicts linear growth--as the input length increases, the runtime increases proportionally. O(n^2) depicts exponential growth--as the input length increases, the runtime increases exponentially.

## Mergesort (mergesort.js)

An advantage of mergesort is that its runtime is consistant O(n log n). Of course, in some situations, this can be a disadvantage--mergesort takes just as long to sort an already ordered array as a randomly ordered array. Furthermore, because of the overhead processes of mergesort, it can be slower for sorting small arrays than algorithms which are inefficient for sorting large arrays. Mergesort is roughly what array.sort() performs when run in Mozilla. 

Mergesort accepts an array as an argument, and it returns a new array with all of the old array's values sorted from least to greatest.

#### So how does mergesort work?

Essentially, mergesort breaks our array down into a bunch of tiny arrays, and then it reassembles our initial array in ascending order. As an intermediate step, the arrays are reassembled into two sorted arrays, and those sorted arrays are compared in order to give us a final array.

So, let's say that we have the example array `[26, 35, 11, 197, 4]`

The first step in mergesort is to break this array down into smaller arrays. This happens recursively rather than iteratively (see above section on recursion). So, with our sample array above, we could expect mergesort to break it down as follows:
```js
[26, 35, 11, 197, 4]
[26, 35] [11, 197, 4]
[26] [35] [11] [197, 4]
[26] [35] [11] [197] [4]
```
So, the arrays are recursively divided in half until each array's length is `<2`. Next, the values on each side are reassembled into a sorted array. Finally, the two remaining sorted arrays are compared with each other, and the result array is built through comparing the two sorted arrays. 

```js
 [26] [35] [11] [197] [4]
  [26, 35]    [4, 11] [197]
  [26, 35]    [4, 11, 197]
           [4]
         [4, 11]
        [4, 11, 26]
      [4, 11, 26, 35]
   [4, 11, 26, 35, 197]
```

#### Mergesort in action

```js
function mergeSort(arr) {
    // our base case:
    // array length < 2 
    if (arr.length < 2) return arr
    // our recursive case: all longer arrays
    // here we cut the larger arrays into halves
    let middle = Math.floor(arr.length / 2)
    let left = arr.slice(0, middle)
    let right = arr.slice(middle)
    // we call mergeSort recursively, and we call merge once each
    // array is broken down
    return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
    // we're creating an empty array for our results, and we need 
    // j and k (index values) to cycle through the left and right arrays
    let result = []
    let j = 0
    let k = 0
    // here we compare the values and push the lowers values 
    // into the results array first
    while (j < left.length && k < right.length) {
        if (left[j] <= right[k]) {
            result.push(left[j])
            j++
        } else {
            result.push(right[k])
            k++
        }
    }
    // finally, we concatenate the remaining values into
    // our results array
    return result.concat(left.slice(j)).concat(right.slice(k))
}
```

The next sorting algorithm we'll look at--called insertion sort--has a best-case runtime of O(n) but a worst-case runtime of 0(n^2).

## Insertion Sort 

Insertion sort is an interesting sorting algorithm because it closely mimicks how people might sort things (such as a hand of cards) in real life. Similar to real-life sorting, it can be quite efficient for small data sets but inefficient for very large data sets. In Google Chrome, insertion sort is the method used for array.sort() for small arrays. 

#### How insertion sort works

Insertion sort mutates the original array into a sorted array rather than returning a new sorted array. Insertion sort iterates through an array, checking to see whether or not each value is less than the value before it. If the value is less than the previous value, then insertion sort iterates back through the array to find the value's proper position in the array. Given an example array of `[7, 5, 2, 1, 4, 3, 6]`, an insertion sort would look something like this:

```js
[ 7, 5, 2, 1, 4, 3, 6 ]
[ 5, 7, 2, 1, 4, 3, 6 ]
[ 2, 5, 7, 1, 4, 3, 6 ]
[ 1, 2, 5, 7, 4, 3, 6 ]
[ 1, 2, 4, 5, 7, 3, 6 ]
[ 1, 2, 3, 4, 5, 7, 6 ]
[ 1, 2, 3, 4, 5, 6, 7 ]
```

The runtime of insertion sort is totally dependent on the state of the given array. The best-case scenario is that insertion sort is given an already sorted array, in which case the runtime is O(n). An array which is sorted in reverse order(ex: `[3, 2, 1]`) will have a runtime of O(n^2). 

#### Insertion sort implemented
```js
function insertionSort(arr) {
    // declare our index variables
    let i
    let j
    // iterate through the array
    for (i = 0; i < arr.length; i++) {
        // store current position's value in a temporary variable
        let temp = arr[i]
        // iterate back through the array,
        // swapping values until we find a value > temp
        for (j = i-1; j > -1 && arr[j] > temp; j--) {
            arr[j+1] = arr[j]
        }
        // place temp where it belongs in the array
        arr[j+1] = temp
    }
    return arr
}

let exampleArray = [7, 5, 2, 1, 4, 3, 6]
insertionSort(exampleArray) // [1, 2, 3, 4, 5, 6, 7]
```

Insertion sort is very useful for small datasets, but its worst-case (and average) run-time make it too slow to use for large datasets. Because insertion sort has very little overhead, it can be substantially faster than mergesort for small arrays--in fact, one way to improve mergesort's performance is to incoporate insertionsort once the arrays get small enough:

```js
function hybridMergeInsertSort(arr) {
    if (arr.length < 10) return insertionSort(arr)
    let middle = Math.floor(arr.length / 2)
    let left = arr.slice(0, middle)
    let right = arr.slice(middle)
    return merge(hybridMergeInsertSort(left), hybridMergeInsertSort(right))
}
```
The above hybrid will often be substantially faster than mergesort because of its low-overhead implementation for small arrays, and it is many times faster than a simple insertionsort implementation for large arrays. 

The next sorting method we will look at is heapsort, which has a worst-case sort time of O(n log n), making it suitable for handling large sets of data. 

## Heap Sort

Heapsort is considerably more complex than the sorting methods we have examined so far, so this might be a wild ride. Hold on tight!

#### Comparison with Merge Sort

Earlier in this document, we explored merge sort, an efficient and popular sorting method. Both merge sort and heap sort have runtimes of O(n log n). So, what is difference between merge sort and heap sort?

First, given a sorted input, Heapsort has the better runtime of O(n). Additionally, heap sort typically runs faster on slower machines, as heap sort works "in place", thus requiring less external memory than merge sort. However, on modern computers, merge sort tends to be more efficient because it accesses values sequentially rather than accessing at various points throughout the array, as heapsort does. Additionally, merge sort is "stable" in that equivalent values will retain their ordering, while they could be swapped using heap sort. So, although the two sorting methods are very similar, individual use cases could prefer one sorting method to the other. My own testing has found that for javascript implementations, heapsort's low overhead makes it substantially faster than javascript implementations of mergesort.

#### Okay, but how does heap sort work?

Heap sort has multiple steps to it, so this section will break down what must happen conceptually before we put heap sort into action below.

First, heap sort must accept an array and build a heap with it. A heap is a data structure that resembles a tree--in this case, the result is an array ordered as a binary tree (see aside below for more info). This array is built by taking the first half of the array and comparing values to those with an index `2 * i + 1` and `2 * i + 2`, where i is the index of the original value. Whichever value here is largest among the others will be swapped into the front half of the array, and the process iterates until the entire array is sorted as a binary tree. Our example array of `[7, 5, 2, 1, 4, 3, 6]` would be built into a heap as follows:
```js
[7,5,2,1,4,3,6]
[7,5,6,1,4,3,2]
[7,5,6,1,4,3,2]
[7,5,6,1,4,3,2]
```

Second, heap sort takes this array (starting from the end) and swaps the smallest values to the front by the same process as above. So, heaped array above is sorted as follows:
```js
[6,5,3,1,4,2,7]
[5,4,3,1,2,6,7]
[4,2,3,1,5,6,7]
[3,2,1,4,5,6,7]
[2,1,3,4,5,6,7]
[1,2,3,4,5,6,7]
```
The end result is a sorted array. So, here is an example of an implementation of heap sort. 

#### Heapsort in action

```js
function heapSort(arr) {
    // step 1 is to build a max heap with the array
    buildMaxHeap(arr)
    // once the array is a heap, we swap the largest value
    // into the end of the array, and then repeat
    // 2nd largest into 2nd to last slot
    // 3rd largest into 3rd to last slot etc.
    for (let i = arr.heapSize - 1; i > 0; i--) {
        swap(arr, 0, i)
        arr.heapSize--
        maxHeapify(arr, 0)
    }
    delete arr.heapSize
    return arr
}

function buildMaxHeap(arr) {
    // the heapsize contains the portion of the array that is a heap
    // this decreases as we sort the heap into a sorted array
    arr.heapSize = arr.length
    for (let i = Math.floor(arr.heapSize / 2); i >= 0; i--) {
        maxHeapify(arr, i)
    }
}

function maxHeapify(arr, i) {
    // the left and right values are the indexes
    // of where the child elements should be in the tree
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


let exampleArray = [7, 5, 2, 1, 4, 3, 6]
heapSort(exampleArray) // [1, 2, 3, 4, 5, 6, 7]
```
#### Quick Aside: Binary Trees

The binary heap data structure is an array that contains the data of a binary tree. The binary heap has two properties: length, which (like a normal array) returns the number of items in the array, and heapSize, which represents the number of elements in the heap which are stored in the array. The heapSize decreases as we sort the heap into a sorted array.

The root of the binary tree is element `[0]`.

## Quick Sort

For large arrays, Google Chrome uses quicksort for its implementation of array.sort(). Although it's worst-case runtime is O(n^2), it has an average runtime of O(n log n), and its low overhead makes it often a very fast option for sorting arrays of many sizes.

#### How Quick Sort works

Quick sort takes a value (the "pivot") and compares values on either side of this pivot. This process is repeated by recursion until the arrays are broken down into their base case. The arrays are then assembled in order.

Given the sample array `[7, 5, 2, 1, 4, 3, 6]`, we would see it broken down as such:

```js
[7, 5, 2, 1, 4, 3, 6]
             // ^ pivot
[5, 2, 1, 4, 3, 6, 7]
    // ^ pivot
[ 2, 1, 3, 4, 5, 6, 7 ]
//^ pivot
[ 1, 2, 3, 4, 5, 6, 7 ]
```

#### Quicksort Implemented
```js
// default values for intitial function call
function quickSort(arr, p=0, r=arr.length-1) {
    //base condition: is the array segment being compared >0
    if (p < r) {
        // q will be the pivot
        let q = partition(arr, p, r)
        quickSort(arr, p, q-1)
        quickSort(arr, q+1, r)
    }
}

// useful swap function to switch the places of two values
function swap(arr, firstIndex, secondIndex) {
    let temp = arr[firstIndex]
    arr[firstIndex] = arr[secondIndex]
    arr[secondIndex] = temp
}

// partition is the meat of quicksort
// splits up values between p and r
// to be on the correct side of the pivot
function partition(arr, p, r) {
    let i = p-1
    for (let j = p; j < r; j++) {
        if (arr[j] <= arr[r]) {
            i = i+1
            swap(arr, i, j)
        }
    }
    swap(arr, i+1, r)
    // return the pivot value
    return i+1
}
```

Quicksort is generally a very fast algorithm due to its low overhead; it is often close to keeping up with insertionsort on small arrays, and it generally keeps up with mergesort depite its slow worst-case runtime of O(n^2) (my testing found that among javascript implementations, mergesort becomes clearly faster when n >= ~1200000). However, it does have a vulnerability: inputs that are sorted in order or in reverse order will cause quicksort to perform quite slowly, even leading to premature stack overflow--when n=2500, my tests found that quicksort takes 4x as long to run given a typical random array and a worst-case array. This is because each recursion splits the arrays into three segments: the left(p...q-1), the pivot, and the right(q+1...r). When the array is sorted (whether in order or in reverse order), each recursion of array n splits the array inefficiently: the left or right (depending on the order) is empty, the pivot has 1 item, and the right or left has n-1 items. This maximizes the number of recursions necessary to complete sorting.

Once way to prevent this is by changing partition to a randomized partition: 

```js
function randomizedPartition(arr, p, r) {
    // we want a random int between p and r
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
```

Using this random swapping strategy makes the algorithm less vulnerable to malicious inputs. My testing found that when n=4000, the randomized pivot implementation sorts the array more than 9x faster than quicksort would alone.

There are still more ways to improve quicksort. The two recursive calls to quicksort limit the amount of data that it can handle without stack overflow. We can rewrite the quickSort function with iteration in place of one of the recursive calls, greatly expanding its capacity, and somewhat increasing its efficiency.

```js
function quickSort(arr, p=0, r=arr.length-1) {
    while (p < r) {
        let q = randomizedPartition(arr, p, r)
        quickSort(arr, p, q-1)
        p = q+1
    }
}
```

We can further improve the runtime of quicksort over picking a random item from the subarray as the pivot; we can make the pivot the median of 3 values in the array. 