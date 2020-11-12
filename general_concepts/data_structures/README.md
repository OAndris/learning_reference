# data_structures

## Common data structures:

- Arrays
- Linked lists
- Stacks and Queues
- Trees
- Hash tables

## Array:

- Collection of elements identified by index or key
- Array operations:
    - Calculate item index: O(1)
    - Insert or delete item at beginning: O(n)
    - Insert or delete item in middle: O(n)
    - Insert or delete item at end: O(1)

## Linked list:

- Collection of data elements, called nodes
- Each node contains whatever data the application needs
- Each node contains a field that references the next node in the list (the last element references null, indicating the end of the list)
- Each node might also contain a field that references the previous node in the list (*"doubly linked list"* instead of *"singly linked list"*)
- Benefits:
    - It is fast and easy to add and remove elements from the linked list 
    - Underlying memory doesn't need to be reorganized (because the individual nodes don't have to be stored contiguously, as opposed to the elements in an array)
- Drawbacks:
    - Can't do constant-time random item access of any item (arrays can)
    - Item lookup is linear in time complexity: O(n)

## Stack and Queue:

- **Stack:**
    - A collection that supports `push` and `pop` operations.
    - **LIFO** (Last In First Out) data structure: the last item pushed is the first one popped
    - Big-O notations:
        - Pushing an item: O(1)
        - Popping an item: O(1)
    - Example usages:
        - Expression processing
        - Backtracking (e.g. web browser back stack)
    - In Python, a list is a stack

- **Queue:**
    - A collection that supports adding and removing
    - **FIFO** (First In First Out) data structure: the first item added is the first one out
    - Big-O notations:
        - Enqueue (add) an item: O(1)
        - Dequeue (remove) an item: O(1)
    - Example usages:
        - Order processing (to ensure that orders are fulfilled in the order they are received by the system)
        - Message processing
    - In Python, lists aren't queues and thus it is inefficient to use them as if they were. E.g. removing an item from the start would be O(n) time complexity, since all the subsequent items have to be shifted down

## Hash Table:

- An associative array. Also called a "dictionary" in some languages.
- It is a data structure that maps keys to their associated values (using a hash function, that also resolves potential collisions)
- Key-value mappings are unique
- Hash tables are typically very fast
- They are ideal for larger datasets. For small datasets, arrays or linked lists are usually more efficient
- Hash tables don't order entries in a predictable way (the data might be spread out randomly in the system's memory)

## Source / further info:
- https://www.linkedin.com/learning/programming-foundations-algorithms
