# Algorithms
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

#### Insertion sort implemented (iteratively)
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

#### Insertion sort implemented (recursively)
```js
function insertionSort(arr) {
    
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

First, given a sorted input, Heapsort has the better runtime of O(n). Additionally, heap sort typically runs faster on slower machines, as heap sort requires less external memory than merge sort. However, on modern computers, merge sort tends to be more efficient because it accesses values sequentially rather than accessing at various points throughout the array, as heapsort does. Additionally, merge sort is "stable" in that equivalent values will retain their ordering, while they could be swapped using heap sort. So, although the two sorting methods are very similar, individual use cases could prefer one sorting method to the other.

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
let arrayLength;

function heapSort(array) {
    buildHeap(array);

    for (let i = array.length - 1; i > 0; i--) {
        swap(array, 0, i);
        arrayLength--;
        heapify(array, 0);
    }
}

function buildHeap(array) {
    arrayLength = array.length;
    for (let i = Math.floor(arrayLength / 2); i >= 0; i--) {
        heapify(array, i);
    }
}

function heapify(array, i) {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let largest = i;
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

function swap(array, firstIndex, secondIndex) {
    let temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
}

let exampleArray = [7, 5, 2, 1, 4, 3, 6];
heapSort(exampleArray); // [1, 2, 3, 4, 5, 6, 7]
```
#### Quick Aside: Binary Trees



## Quick Sort

For large arrays, Google Chrome uses quicksort for its implementation of array.sort(). 

#### How Quick Sort works

Quick sort takes a value (the "pivot") and compares values on either side of this pivot. 

## The Fibonacci Sequence

## Dynamic Connectivity

Given a number of points and connections, determine whether or not two points are connected.

Quickfind: 
Here, we have our data represented as an array. An array 10 unconnected numbers might be `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]` while a fully connected array is `[9, 9, 9, 9, 9, 9, 9, 9, 9, 9]`. 
Given quickFind(a, b), if a and b have the same ID, then a is connected to be.

So, given `[0, 1, 1, 3, 4, 5, 3, 3, 8, 9]` quickFind(1, 2) will be true. 

Such an implementation might look like this:

```js 
let array = [0, 1, 1, 3, 4, 5, 3, 3, 8, 9]
function quickFind(a, b) {
    return array[a] == array[b] ? true : false
}
```

However, such an implementation makes the process of connecting two points somewhat more complex. Connecting 2 and 3 in the above example would require us to turn every 1 into a 3 (or every 3 into a 1). So our union function would look something like this:
```js 
let array = [0, 1, 1, 3, 4, 5, 3, 3, 8, 9]
function union(a, b) {
    for (let i = 0; i < array.length, i++) {
        let firstValue = array[a]
        if (array[i] == firstValue) {
            array[i] = array[b]
        }
    }
}
```