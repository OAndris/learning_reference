"""
This file demonstrates some example situations which cause a deadlock while working with multiprocessing or multithreading.

- Example 1 (task within task):
    - deadlock caused by waiting for a task within a task while there are not enough worker threads available to complete the tasks (i.e. the nested task can't execute and will be stuck in deadlock, causing the outer task to be stuck, which causes the thread pool itself to be stuck)
    - to avoid it, never submit a task to the thread pool from within another task that itself is also executed by the thread pool
- Example 2 (tasks waiting on each other):
    - deadlock caused by two tasks waiting for each other (i.e. both are stuck in deadlock, also causing the thread pool to be stuck, even if there are otherwise plenty of available threads to use)
    - to avoid it, never make a task in the thread pool access the results of other tasks that are also executed by the thread pool
- Example 3 (task waiting on itself):
    - deadlock caused by a task waiting for itself (i.e. a single task waits on its own result and therefore it becomes stuck, even if there are otherwise plenty of available threads to use)
    - to avoid it, never make a task in the thread pool access the Future objects directly, instead, make it receive the results of the Future objects as argument

Sources:
- https://superfastpython.com/threadpoolexecutor-deadlock/
- https://stackoverflow.com/questions/9214214/deadlock-in-concurrent-futures-code

Additional useful links:
- https://pythonspeed.com/articles/python-multiprocessing/
- https://docs.python.org/3/library/multiprocessing.html#contexts-and-start-methods
- https://docs.sqlalchemy.org/en/14/core/pooling.html#pooling-multiprocessing
"""


from time import sleep
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor, as_completed


def deadlock_by_task_within_task():
    """
    Example of a deadlock caused by waiting for a task within a task while there are not enough worker threads available to complete the tasks.
    NOTE:
    - "the worker thread enqueues a task in the thread pool and waits for the result. The worker thread will wait forever because it is occupying the single thread in the pool that is required to execute the tasks that it has submitted."
    - "Key to this example is that the thread pool only has a single worker thread, forcing the deadlock situation. [...] This simulates the situation where worker threads are fully occupied with long running tasks."
    - "Running the example first submits and waits for the results from task1(), which in turn submits and waits for the results of task2(). The limited resources available in the thread pool results in a deadlock and task1 will wait forever, in turn causing the main thread to wait forever. The program will need to be forcibly killed."
    HOW TO AVOID:
    - "Increasing the thread pool so that there is additional capacity will avoid the deadlock in this specific situation, but not in the general case."
    - "You can avoid this deadlock by never waiting on the results of tasks executed by the thread pool within tasks executed by the thread pool."
    - "Further, it may be a good practice to only submit tasks from one thread, e.g. the main thread, and to not expose the thread pool itself to target task functions."
    """
    def task1(executor):
        sleep(0.5)
        future = executor.submit(task2)  # submit a task
        print('Worker in task1 waiting for task2...')  # wait for the result
        return future.result()  # deadlock

    def task2():
        return 'Completed task2'  # this can't complete, because there is no thread available (the only thread is used by task1, which waits for task2, but task2 cannot run)

    with ThreadPoolExecutor(max_workers=1) as executor:
        # Submit task1, which itself will submit task2. However, task2 will never return because task1 already occupies the only worker thread (while stuck waiting for task2 to finish), so both tasks and the entire thread pool gets stuck in deadlock
        future = executor.submit(task1, executor)
        print('Main thread waiting for task1...')
        result = future.result()
        print(result)


def deadlock_by_tasks_waiting_on_each_other():
    """
    Example of a deadlock caused by two tasks waiting on each other.
    Both tasks will end up in deadlock, thus the main thread will also be stuck waiting for them forever (even if there are more than enough worker threads in total).
    NOTE:
    - "You can get a deadlock if two tasks wait on each other. For example, two tasks are submitted to the thread pool for asynchronous execution. The first task has a reference to the second task and waits on a result, and the second task has a reference to the first task and waits on a result. In this case, neither task can ever progress and both are stuck in a deadlock."
    - "This may seem obvious, in the simplest case, but may be less obvious if tasks executed by the thread pool directly interact and wait on the results from other tasks."
    - "As the tasks wait on each other, neither will ever progress and will be stuck in a deadlock. Additionally, the context manager for the ThreadPoolExecutor will wait for all running threads to complete before exiting. As the two threads in the deadlock will never complete, the thread pool will wait forever to close, and the block for the context manager will never exit."
    HOW TO AVOID IT:
    - "You can avoid this deadlock by not accessing the results from tasks within tasks executed by the ThreadPoolExecutor. That is, do not pass around or access Future objects within target task functions."
    """
    def task1():
        sleep(0.1)
        print('Task1 waiting for Task2...')
        result = future2.result()  # deadlock
        return 2 + result

    def task2():
        sleep(0.2)
        print('Task2 waiting for Task1...')
        result = future1.result()  # deadlock
        return 10 + result

    with ThreadPoolExecutor(max_workers=20) as executor:
        # Since both task1 and task2 are stuck in deadlock waiting for each other, the main thread will also be stuck waiting for them (even if there are more than enough worker threads)
        future1 = executor.submit(task1)
        future2 = executor.submit(task2)
        print('Main thread waiting for both Task1 and Task2...')


def deadlock_by_task_waiting_on_itself():
    """
    Example of a deadlock caused by a task waiting on itself (on its own result).
    NOTE:
    - "You can get a deadlock if a target task function waits on its own result. That is, a target task function can attempt to retrieve a result from a Future object, which just so happens to be the Future object that represents the task that is executing."
    - "This might seem obvious and easily preventable, but can happen in situations where target task functions access Future objects for tasks in the same thread pool."
    HOW TO AVOID IT:
    - "This deadlock could be avoided by rearranging the code so that tasks in the thread pool do not access the Future objects directly, and instead receive the results from future objects as arguments."
    """
    def task1():
        sleep(0.5)
        print('Task1 waiting for Task1 itself...')
        value = future.result()  # deadlock (attempt to get a result from itself)
        return 99

    with ThreadPoolExecutor(max_workers=20) as executor:
        # Since task1 tries to access its own result, it will be stuck waiting for itself in a deadlock, also causing the main thread to be stuck
        future = executor.submit(task1)
        print('Main thread waiting for Task1...')


def another_deadlock():
    """
    This example is from https://stackoverflow.com/questions/9214214/deadlock-in-concurrent-futures-code
    If the second for loop is not included, it will end up in deadlock. The reason is probably the Executor shutting down before all the task are complete. So it can be solved by waiting for the futures to complete.
    """
    def task():
        print("doing something")

    with ProcessPoolExecutor(4) as executor:
        fs = []
        for i in range(100):
            print('submitting {}'.format(i))
            future = executor.submit(task)
            fs.append(future)

        for _ in as_completed(fs):  # this waits for the futures to complete, before shutting down the Executor (without it, a deadlock is very likely)
            pass

    print("COMPLETED!")


if __name__ == "__main__":
    # NOTE: running any of these examples will cause a deadlock, i.e. the terminal will be stuck forever

    # deadlock_by_task_within_task()
    deadlock_by_tasks_waiting_on_each_other()
    # deadlock_by_task_waiting_on_itself()

    # another_deadlock()
