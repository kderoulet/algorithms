A repository for learning algorithms. 

## Intro to Recursion (recursion.js)

Recursive functions call themselves until their stopping condition is met. Recursive functions begin with a base case, and that case is modified until the stopping condition is met. 

Consider a simple factorial function. Such a function might look like this:

```js
function getFactorial(number) {
    if (number == 1) {
        return number;
    }
    return number * getFactorial(number-1);
}
```
As a reminder, a factorial takes a value and multiplies it by each descending non-negative, non-zero integer. So 5 factorial (5!) gives us `5*4*3*2*1` = 120. (The above function ignores edge cases; see recursion.js for a fleshed out example)

So, how does the above function work? Let's take getFactorial(5) as our example.
1. The function is called with the number 5 as an argument.
2. Since 5 != 1, the number is not returned.
3. So 5 * getFactorial(4) is returned.
4. The function continues to loop until `number == 1`, when only , so we are left with `5*4*3*2*1`. 

Now, the factorial example might not be the best use case for a recursive function, but hopefully the above example does demonstrate essentially how recursive functions work. 

#### An aside: Recursion or Iteration?

All iterative functions can be written recursively, and all recursive functions can be written iteratively. So, when do we choose one or the other? Essentially, when an iterative solution makes sense, it's a good time for for iteration. When recursion makes more sense then it's a good time for recursion. Often, those with traditional computer science backgrounds prefer recursive approaches, while developers without traditional computer science backgrounds tend to first learn iterative solutions (especially for-loops). Iterative functions often make the most sense with linear processes, such as comparing each value in an array to each value in another array. Recursive functions tend to be an especially good option when a "divide and conquer" approach is needed for solving a problem, such as our next section: mergesort.

## Mergesort (mergesort.js)

Mergesort is a pretty cool sorting algorithm. It's efficient, it's effective, and it's pretty!

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
So, the arrays are recursively divided in half until each array's length is `<1`. Next, the values on each side are reassembled into a sorted array. Finally, the two remaining sorted arrays are compared with each other, and the result array is built through comparing the two sorted arrays. 

```js
 [26] [35] [11] [197] [4]
   [26]      [11]   [4]
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
    // our base case: we want each array
    // to have a length < 2 
    if (arr.length < 2)
    return arr;
    // here we cut the larger arrays into halves
    let middle = Math.floor(arr.length / 2)
    let left = arr.slice(0, middle);
    let right = arr.slice(middle)
    // we call mergeSort recursively, and we call merge once each
    // array is broken down
    return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
    // we're creating an empty array for our results, and we need 
    // j and k and indexs to cycle through the left and right arrays
    let result = [];
    let j = 0;
    let k = 0;
    // here we compare the values and push the lowers values 
    //into the results array first
    while (j < left.length && k < right.length) {
        if (left[j] <= right[k]) {
            result.push(left[j]);
            j++;
        } else {
            result.push(right[k]);
            k++
        }
    }
    // finally, we concatinate the remaining values into
    // our results array
    return result.concat(left.slice(j)).concat(right.slice(k));
}
```

#### An aside: Big O notation

An advantage of mergesort is that its runtime is consistant O(n log n). Of course, in some situations, this can be a disadvantage--mergesort takes just as long to sort an already ordered array as a randomly ordered array. The next sorting algorithm we'll look at--called insertion sort--has a best-case runtime of O(n) but a worst-case runtime of 0(n^2).

## Insertion Sort 

Insertion sort is an interesting sorting algorithm because it closely mimicks how people might sort things in real life. Similar to real-life sorting, it can be quite efficient for small data sets but inefficient for very large data sets. 

#### So what is insertion sort?

#### How insertion sort works

#### Insertion sort implemented

## Heap Sort

## Quick Sort

## The Fibonacci Sequence