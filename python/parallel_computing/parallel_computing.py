"""
Based on:
- https://www.geeksforgeeks.org/python-run-same-function-in-parallel-with-different-parameters/
- https://stackoverflow.com/questions/7207309/how-to-run-functions-in-parallel
"""

import multiprocessing
import os
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
from datetime import datetime
from time import sleep


def function(x):
    print(f"{x} (#{os.getpid()})")
    sleep(2)
    return x


def run_parallel(function, inputs, processes):
    pool = multiprocessing.Pool(processes)  # multiprocessing pool object with the desired number of workers (if None or omitted, it defaults to the system's number of processes)
    outputs = pool.map(function, inputs)  # map the function to the list and pass function and input list as arguments
    return outputs


def run_cpu_tasks_in_parallel(function, inputs):
    # Ideal for CPU bound operations:
    with ProcessPoolExecutor() as executor:
        outputs = executor.map(function, inputs)
        return list(outputs)


def run_io_tasks_in_parallel(function, inputs):
    # Ideal for IO bound operations:
    with ThreadPoolExecutor() as executor:
        outputs = executor.map(function, inputs)
        return list(outputs)


if __name__ == '__main__':
    inputs = range(100)
    processes = None

    print(f"Input: {inputs}")
    print(f"Processes: {processes}\n")
    start = datetime.now()

    # outputs = run_parallel(function, inputs, processes)  # NOTE: it takes ~32 seconds (with a 100 element long input array, 2 seconds sleep and maximum number of processors)
    # outputs = run_cpu_tasks_in_parallel(function, inputs)  # NOTE: it takes ~26 seconds (with a 100 element long input array, 2 seconds sleep and maximum number of processors)
    outputs = run_io_tasks_in_parallel(function, inputs)  # NOTE: it takes ~18 seconds (with a 100 element long input array, 2 seconds sleep and maximum number of processors)

    end = datetime.now()
    print(f"\nOutput: {outputs}")
    print(f"Time elapsed: {end - start}")
