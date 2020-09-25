# Source: https://www.linkedin.com/learning/programming-foundations-algorithms/stacks-and-queues-walkthrough

from collections import deque  # Double-Ended Queue

def stack_example():
    # In Python, the built-in list object is a stack. Some methods: append, pop.
    print("Stack (list):")
    stack = []
    stack.append(1)
    stack.append(2)
    stack.append(3)
    stack.append(4)
    print(stack)
    stack.pop()  # remove the last item that was addded (stacks are LIFO)
    print(stack)
    stack.append(10)  # add to the top of the stack
    print(stack)
    print()


def deque_example():
    # In Python, collections.deque is a queue (using a list as a queue would be inefficient). Some methods: append, popLeft, remove.
    print("Queue (collections.dequeue):")
    queue = deque()
    queue.append(1)
    queue.append(2)
    queue.append(3)
    queue.append(4)
    print(queue)
    popped_item = queue.popleft()  # remove the first item that was addded (queues are FIFO)
    print(popped_item)
    print(queue)
    queue.remove(2)  # remove by value
    print(queue)
    queue.append(10)  # add to the end of the stack
    print(queue)


def main():
    stack_example()
    deque_example()


if __name__ == '__main__':
    main()
