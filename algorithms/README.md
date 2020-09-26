# algorithms

## Algorithm complexity:

- **Space complexity:** How much memory (storage space) does the algorithm need to do what it does?
- **Time complexity:** How much time does the algorithm take to complete, relative to the size of its input?

## Understanding algorithm performance:

- Measure how an algorithm responds to dataset size
- Big-O notation

## Big-O notation:

- Classifies performance as the input size grows
- "O" indicates the *order of operation*: time scale to perform an operation
- Many algorithms and data structures have more than one Big-O value (separate values for inserting data, searching for data, deleting data, etc.)
- Common Big-O notations:
    - **O(1)** or **Constant time** (e.g. looking up a single element in an array)
    - **O(log n)** or **Logarithmic** (e.g. finding an item in a sorted array with a binary search)
    - **O(n)** or **Linear time** (e.g. searching an unsorted array for a specific value)
    - **O(n*log n)** or **Log-linear** (e.g. complex sorting algorithms like heap sort and merge sort)
    - **O(n^2)** or **Quadratic** (e.g. simple sorting algorithms, such as bubble sort, selection sort, and insertion sort)

## Considerations:

- **Inputs and outputs:** What inputs does the algorithm take and what output values does it return?
- **Classification:**
    - Serial / Parallel
    - Exact / Approximate
    - Deterministic / Non-deterministic

## Common algorithms:

- **Sorting algorithms.** Take a dataset and apply a sort order to it
    - **Bubble sort:**
        - Process:
            - Check if the first element is higher than the second and swap them if so
            - Check the 2nd against the 3rd, swap if needed
            - Continue until the end of the array. The highest number is now at the end of the array (it has "bubbled up")
            - Start from the 2nd element, compare it against the 3rd and swap if needed.
            - Repeat until the entire array is sorted.
        - Characteristics:
            - Very simple to understand and implement
            - Performance: **0(n^2)** (nested for loop: for loop inside a for loop)
            - Other sorting algorithms are generally much better
            - Not considered to be a practical solution (rather, it is for teaching only)
    - **Merge sort:**
        - Dividend-and-conquer algorithm
        - Breaks a dataset into smaller parts, sorts the smaller parts and then merges them back together
        - Uses recursion to operate on datasets
        - Performs well on large sets of data
        - In general, it has a performance of **O(n log n)** (logarithmic-linear) time complexity
        - Process:
            - Break down the array into individual elements by separating it into two arrays, then separating each into two, and continuing until it's done
            - Build up the original, but sorted array by joining back together two elements in the proper order, then joining two of these smaller arrays and continuing until it's done
    - **Quicksort:**
        - Divide-and-conquer algorithm (like merge sort)
        - Uses recursion to perform sorting (like merge sort)
        - Generally performs better than merge sort, **O(n log n)** (logarithmic-linear). Worst case is **O(n^2)** when data is mostly sorted already
        - Works by partioning the list. The main purpose of the partioning process is to move items that are on the wrong side of the pivot value, and figure out the point at which to split the array so we can recursively do this again
        - After the end of one recursion step, the pivot element is placed at its correct array location
        - In the quick sort, all the work gets done in the partioning process
        - Operates in place on the data
        - Process:
            - Choose a Pivot Point (e.g. the first element of the array)
            - The element next to the pivot point is the lower index, the last element is the upper index
            - Increment the lower index as long as it is less than the upper index, and until we find a value that is larger than the pivot value
            - If the element at the lower index is now higher than the pivot point, start decrementing the upper index
            - Decrement the upper index until we find a value that is less than the pivot point and greater than the lower index.
            - When this value is found, swap the upper index and the lower index.
            - Continue with these steps
            - When the upper index and lower index cross each other, we have found a split point. Change the pivot value with the upper index (which has an element smaller than the lower index, since they have crossed each other)
            - Now, the left side of the array contains elements smaller than the pivot point; and the right side contains values larger than it.
            - Recursively call the quick sort algorithm on both the left array and right array until we can no longer split the arrays (where each array has just one item)
    - etc.
- **Search algorithms.** Find specific data in a structure
- **Computational algorithms.** Given one set of data, calculate another (e.g. check if a given number is prime)
- **Collection algorithms.** Work with collections of data (count specific items, navigate among data elements, filter out unwanted data, etc.)

## Source / further info:
- [Programming Foundations: Algorithms](https://www.linkedin.com/learning/programming-foundations-algorithms) by Joe Marini (LinkedIn Learning)
