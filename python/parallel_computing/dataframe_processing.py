import dask.dataframe as dask_df
import numpy as np
import mapply
import pandas as pd
from pandarallel import pandarallel
import swifter
import time


"""
Some alternatives for speeding up the processing of a large dataframe, i.e. applying a function to each row of a large dataframe (instead of using a for loop with iterrows):
- vanilla Python dataframe apply (dataframe.apply)
- swifter (dataframe.swifter.apply)
- dask (dask.dataframe.apply)
- mapply (dataframe.mapply)
- pandarallel (dataframe.parallel_apply)
- vectorization: by far the best solution, if it can be applied to the use case at hand (it can be order of magnitudes faster than even parallelization) + further, slighter improvements are possible by using NumPy vectorization instead of Pandas vectorization, i.e. just calling .values on the Series to get the underlying NumPy array
- in general, further improvements are also possible by reducing the size (memory cost) of the dataframe, by specifying sufficient data types (e.g. np.float32 or whatever works best, using df[col] = df[col].astype(np.int16))

NOTE:
- there is no best method, the speed and actual ranking of these methods varies based on multiple factors
- the factors that affect performance (and the ranking of these methods) include the size of the dataframe, the type of function that is applied to the dataframe, and the hardware
- on relatively small datasets, advanced methods may perform actually worse than the more basic methods, due to their initial overhead (even if they scale better and are more efficient on large datasets)
- scroll to the end of file for detailed execution time comparions, summary and conclusions

Useful links:
- General:
    - https://sparkbyexamples.com/pandas/pandas-apply-function-to-every-row/
    - https://stackoverflow.com/questions/12182744/python-pandas-apply-a-function-with-arguments-to-a-series
    - https://stackoverflow.com/questions/26658240/getting-the-index-of-a-row-in-a-pandas-apply-function
    - https://stackoverflow.com/questions/45545110/make-pandas-dataframe-apply-use-all-cores
    - https://stackoverflow.com/questions/58310509/why-is-swifter-slower-than-vanilla-df-apply
    - https://towardsdatascience.com/do-you-use-apply-in-pandas-there-is-a-600x-faster-way-d2497facfa66
- Swifter: https://github.com/jmcarpenter2/swifter/issues/51
- Mapply: https://github.com/ddelange/mapply
- Pandarallel: https://towardsdatascience.com/pandaral-lel-a-simple-and-efficient-tool-to-parallelize-your-pandas-operations-on-all-your-cpus-bb5ff2a409ae + https://nalepae.github.io/pandarallel/troubleshooting/
- Vectorization: https://towardsdatascience.com/do-you-use-apply-in-pandas-there-is-a-600x-faster-way-d2497facfa66 (excellent article)
"""


def timeit(func_to_be_timed):
    # This is just a decorator for timing purposes.
    def wrapper(*args, **kwargs):
        start_time = time.time()
        func_to_be_timed(*args, **kwargs)
        end_time = time.time()
        print(f'Elapsed time: {(end_time - start_time) * 1000} ms ({func_to_be_timed.__name__})')
    return wrapper


def func_to_apply_to_df_rows(row, x, y):
    # This function is used for processing each row of a dataframe. NOTE: the first argument is received by default (i.e. the current row of the dataframe), all others have to be provided explicitly.
    # Based on a single row of a dataframe, create the corresponding row of the final dataframe:
    new_row = pd.Series({
        'aa': row["A"],
        'bb': row["B"],
        'cc': row["C"],
        'sum': row[0] + row[1] + row[2],  # NOTE: either column names and/or integer indices can be used, and row.name can be used for accessing the index
        'x': x,
        'y': y,
        'x+y': x + y,
    })
    return new_row


@timeit
def dataframe_vectorization(raw_df, x, y):
    print("\n--> vectorization:")
    df = pd.DataFrame()
    df['aa'] = raw_df["A"]
    df['bb'] = raw_df["B"]
    df['cc'] = raw_df["C"]
    df['sum'] = raw_df["A"] + raw_df["B"] + raw_df["C"]
    df['x'] = x
    df['y'] = y
    df['x+y'] = x + y
    # NOTE: if a column's values depend on conditions, then df.loc can be used like this: df.loc[df['e'] < 5, 'new'] = df['a'] + df['b']
    # print(df)


def func_to_apply_to_df_rows_for_pandarallel(row, x, y):
    # Import required for Pandarallel: "On Windows, because of the multiprocessing system (spawn), the function you send to pandarallel must be self contained, and should not depend on external resources."
    import pandas as pd
    new_row = pd.Series({
        'aa': row["A"],
        'bb': row["B"],
        'cc': row["C"],
        'sum': row[0] + row[1] + row[2],
        'x': x,
        'y': y,
        'x+y': x + y,
    })
    return new_row


@timeit
def dataframe_iterrows(raw_df, func_to_apply_to_df_rows):
    # NOTE: this solution is EXTREMELY BAD from performance point of view (growing and reallocating a dataframe each time in a for loop is a really bad idea)
    print("\n--> dataframe.iterrows (growing a dataframe in a for loop)")
    df = pd.DataFrame()
    for idx, row in raw_df.iterrows():
        df_row = func_to_apply_to_df_rows(row, 11, 22)
        df = df.append(df_row, ignore_index=True)
    # print(df)


@timeit
def dataframe_iterrows_with_list(raw_df, func_to_apply_to_df_rows):
    # NOTE: this solution is EXTREMELY BAD from performance point of view (growing a list each time in a for loop is better than doing so with a dataframe, but it is still a really bad idea)
    print("\n--> dataframe.iterrows (growing a list in a for loop)")
    result = []
    for idx, row in raw_df.iterrows():
        df_row = func_to_apply_to_df_rows(row, 11, 22)
        result.append(df_row)  # as opposed to dataframe.append (which returns a new dataframe), list.append operates in-place (and also with less overhead than a dataframe)
    df = pd.DataFrame(result)
    # print(df)


@timeit
def dataframe_apply(raw_df, func_to_apply_to_df_rows):
    print("\n--> dataframe.apply:")
    df = raw_df.apply(func_to_apply_to_df_rows, args=(11, 22), axis=1)
    # print(df)


@timeit
def dataframe_swifter_apply(raw_df, func_to_apply_to_df_rows):
    print("\n--> dataframe.swifter.apply:")
    df = raw_df.swifter.apply(func_to_apply_to_df_rows, args=(11, 22), axis=1)
    # print(df)


@timeit
def dask_dataframe_apply(raw_df, func_to_apply_to_df_rows):
    print("\n--> using dask.dataframe:")
    ddf = dask_df.from_pandas(raw_df, npartitions=30)  # find your own number of partitions
    # ddf_update = ddf.apply(func_to_apply_to_df_rows, args=(11, 22), axis=1).compute()  # NOTE: if called without the "meta=" keyword, Dask will run your function on a small dataset first, to guess output types
    ddf_update = ddf.apply(func_to_apply_to_df_rows, args=(11, 22), axis=1, meta={'aa': 'int64', 'bb': 'int64', 'cc': 'int64', 'sum': 'int64', 'x': 'int64', 'y': 'int64', 'x+y': 'int64'}).compute()
    # print(ddf_update)


@timeit
def dataframe_mapply(raw_df, func_to_apply_to_df_rows):
    print("\n--> using dataframe.mapply:")
    mapply.init(
        n_workers=-1,
        # chunk_size=
        # max_chunks_per_worker=
        # progressbar=False,
    )  # More info about mapply: https://github.com/ddelange/mapply + https://mapply.readthedocs.io/en/stable/_code_reference/mapply.html
    df = raw_df.mapply(func_to_apply_to_df_rows, args=(11, 22), axis=1)
    # print(df)


@timeit
def dataframe_pandarallel(raw_df, func_to_apply_to_df_rows):
    print("\n--> using pandarallel:")
    pandarallel.initialize(
        progress_bar=False,  # if True, displays one progress bar per working CPU
    )
    raw_df.parallel_apply(func_to_apply_to_df_rows, axis=1, args=(11, 22))
    # print(df)


if __name__ == "__main__":

    number_of_rows = 1e4

    # Raw data:
    raw_df = pd.DataFrame(np.random.randint(0, 100, size=(int(number_of_rows), 3)), columns=list('ABC'))
    # print("raw data:")
    # print(raw_df)

    # Various methods for processing:
    dataframe_iterrows(raw_df, func_to_apply_to_df_rows)
    dataframe_iterrows_with_list(raw_df, func_to_apply_to_df_rows)
    dataframe_apply(raw_df, func_to_apply_to_df_rows)
    dataframe_swifter_apply(raw_df, func_to_apply_to_df_rows)
    dask_dataframe_apply(raw_df, func_to_apply_to_df_rows)
    dataframe_mapply(raw_df, func_to_apply_to_df_rows)
    dataframe_pandarallel(raw_df, func_to_apply_to_df_rows_for_pandarallel)
    dataframe_vectorization(raw_df, x=11, y=12)

    """
    SUMMARY:
                        1e1      1e2     1e3      1e4       1e5        1e6
                        --------------------------------------------------
    df.iterrows (df)    26 ms    218 ms  1938 ms  18336 ms  278753 ms  N/A (didn't try)   --> terrible solution, terrible performance; scales linearly
    df.iterrows (list)  6 ms     59 ms   653 ms   4622 ms   48523 ms   N/A (MemoryError)  --> bad solution, although better performance; scales linearly
    df.apply            7 ms     56 ms   555 ms   4331 ms   44623 ms   441608 ms          --> better solution, better performance; scales linearly
    swifter             26 ms    74 ms   607 ms   5527 ms   50672 ms   494352 ms          --> even though it is supposed to parallelize apply and thus be "swifter" than df.apply, it was about the same, or even worse (maybe it could be faster with different settings or in case of more complex operations)
    dask                36 ms    114 ms  565 ms   4522 ms   46724 ms   457256 ms          --> even though it is supposed to parallelize apply and thus be faster than df.apply, it was about the same, or even worse (maybe it could be faster with different settings or in case of more complex operations)
    mapply              9 ms     59 ms   1709 ms  3004 ms   13915 ms   138166 ms          --> significantly better performance, proper 100% CPU usage (as intended) and may scale better than linear (up to the point where it becomes limited by the CPU, from where it scales linearly)
    pandarallel         2311 ms  2571 ms 2454 ms  3578 ms   17822 ms   160185 ms          --> significantly better performance, proper 100% CPU usage (as intended) and may scale better than linear (up to the point where it becomes limited by the CPU, from where it scales linearly)
    vectorization       4 ms     4 ms    4 ms     6 ms      20 ms      114 ms             --> amazing solution, more than 100x faster, scales better than linear, should be used whenever possible

    CONCLUSIONS:
    - at a minimum, use df.apply instead of dt.iterrows (forget about the latter)
    - as long as the datasets are known to be small, df.apply is enough and there is no need for parallelization, libraries and their overhead
    - even though both "swifter" and "dask" are supposed to parallelize df.apply, in this test they have failed to use the available CPUs, thus their execution time was not better than that of df.apply (in fact, it was a bit worse, due to their overhead)
    - both "mapply" and "parallel" have successfully used the available CPUs, utilizing 100% CPU processing power, thus significantly improving execution time on larger datasets (mapply was faster than pandarallel on all dataset sizes)
    - in all cases, the ultimate winner is the vectorized solution, which is more than 100x faster and also scales better - thus, vectorization should be preferred over anything else, and used whenever possible

    NOTE: these tests were performed on Lenovo Think15 (Intel(R) Core(TM) i5-10210U CPU @ 1.60GHz, 2.10 GHz), having 4 physical CPUs, 8 logical processors and 8 GM RAM.
    """
