# data_structures

## Common data structures:

- Arrays
- Linked lists
- Stacks and Queues
- Trees
- Hash tables

## Arrays:

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
- Each node might also contain a field that references the previous node in the list ("doubly linked list" instead of "singly linked list")
- Benefits:
    - It is fast and easy to add and remove elements from the linked list 
    - Underlying memory doesn't need to be reorganized (because the individual nodes don't have to be stored contiguously, like they do in an array)
- Drawbacks:
    - Can't do constant-time random item access of any item (arrays can)
    - Item lookup is linear in time complexity: O(n)
    

## Source / further info:
- https://www.linkedin.com/learning/programming-foundations-algorithms

