"""
TASK ("buy low, sell high"):
Given a stock's price history as a sequence, and assuming that you are only allowed to make one purchase and one sale, what is the maximum profit that can be obtained?
For example, given prices = (20, 18, 14, 17, 20, 21, 15), the max profit would be 7, from buying at 14 and selling at 21.

Example based on: https://realpython.com/numpy-array-programming/
"""

import matplotlib.pyplot as plt
import numpy as np
import time


# def _generate_dataset():
#     # Create mostly NaN array with a few 'turning points' (local min/max).
#     prices = np.full(100, fill_value=np.nan)
#     prices[[0, 25, 60, -1]] = [80., 30., 75., 50.]

#     # Linearly interpolate the missing values and add some noise.
#     x = np.arange(len(prices))
#     is_valid = ~np.isnan(prices)
#     prices = np.interp(x=x, xp=x[is_valid], fp=prices[is_valid])
#     prices += np.random.randn(len(prices)) * 2
#     return prices


# def _view_dataset(prices):
#     # Warning! This isn't a fully correct solution, but it works for now. If the absolute min came after the absolute max, you'd have trouble.
#     mn = np.argmin(prices)
#     mx = mn + np.argmax(prices[mn:])
#     kwargs = {'markersize': 12, 'linestyle': ''}

#     fig, ax = plt.subplots()
#     ax.plot(prices)
#     ax.set_title('Price History')
#     ax.set_xlabel('Time')
#     ax.set_ylabel('Price')
#     ax.plot(mn, prices[mn], color='green', **kwargs)
#     ax.plot(mx, prices[mx], color='red', **kwargs)
#     fig.show()


def timeit(func):
    def decorated_func(*args, **kwargs):
        start_time = time.time()
        func(*args, **kwargs)
        end_time = time.time()
        print(f'--> "{func.__name__}()" done in {round(end_time - start_time, 2)} seconds.\n')
    return decorated_func


@timeit
def naive_solution(prices):
    """
    Take every combination of two prices where the second price “comes after” the first and determining the maximum difference.
    Quadratic Time Complexity: O(N^2)
    """
    max_diff = 0
    for idx, price in enumerate(prices):
        for later_price in prices[idx+1:]:
            max_diff = max(max_diff, later_price - price)
    print(max_diff)


@timeit
def better_solution(prices):
    """
    Iterate through the sequence just once and find the difference between each price and a running minimum.
    Linear Time Complexity: O(N)
    """
    max_diff = 0
    running_min = prices[0]
    for price in prices[1:]:
        max_diff = max(max_diff, price - running_min)
        running_min = min(running_min, price)
    print(max_diff)


@timeit
def best_solution(prices):
    """
    Find the difference between each price and a running minimum (element-wise), and then take the max of this sequence.
    Vectorized solution using NumPy, which delegates to C, thus it uses highly optimized low-level solutions in the background to solve the problem much faster.
    Linear Time Complexity: O(N) - i.e. the same theoretical time complexity as a single for loop, but nevertheless much more efficient and also scales much better
    """
    cummin = np.minimum.accumulate  # one of NumPy's universal functions (ufuncs) is called "minimum" and it has an "accumulate" method (https://numpy.org/doc/stable/reference/ufuncs.html#available-ufuncs)
    prices = np.asarray(prices)  # convert to NumPy array (numpy.ndarray)
    max_diff = np.max(prices - cummin(prices))  # the maximum of the element-wise difference of price (array) and cumulative minimum price (array)
    print(max_diff)


if __name__ == "__main__":
    # prices = (20, 18, 14, 17, 21, 21, 15)
    prices = np.random.randint(0, 100, size=int(1e7))

    # naive_solution(prices)
    better_solution(prices)
    best_solution(prices)
