# recursion

## Recursion:

- Recursive functions are functions calling themselves. This often allows for easier implementation (e.g. for discovering all subfolders in a folder structure).
- Recursive functions need to have a breaking condition. This prevents infinite loops and eventual crashes when the computer runs out of memory.
- Each time the function is called, the previous call with the old arguments are saved by being pushed to the `call stack` (which is indeed implemented using a `stack` data structure).
- Use cases:
    - Discover a multi-level folder structure, the depth of which is unknown
    - Math operations
    - Counters
    - etc.

## Source / further info:
- https://www.linkedin.com/learning/programming-foundations-algorithms
