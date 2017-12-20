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

All iterative functions can be written recursively, and all recursive functions can be written iteratively. So, when do we choose one or the other? Essentially, when an iterative solution makes sense, it's a good time for for iteration. When recursion makes more sense then it's a good time for recursion. Recursive functions tend to be a good option when a "divide and conquer" approach is needed for solving a problem, such as our next section: mergesort.

## Mergesort (mergesort.js)

Mergesort is a pretty cool sorting algorithm. It's efficient, it's effective, and it's pretty!

Mergesort accepts an array as an argument, and it returns a new array with all of the old array's values sorted from least to greatest.

#### So how does mergesort work?

Essentially, mergesort breaks our array down into a bunch of tiny arrays, and then it reassembles our initial array in ascending order.

So, let's say that we have the example array ```[26, 35, 11, 197, 4]```

The first step in mergesort is to break this array down into smaller arrays. This happens recursively rather than iteratively (see above section on recursion).

#### Mergesort in action

```js
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
```
