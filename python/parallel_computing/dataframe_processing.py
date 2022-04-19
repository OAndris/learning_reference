import dask.dataframe as dask_df
import numpy as np
import mapply
import pandas as pd
import swifter
import time


"""
Some alternatives for speeding up the processing of a large dataframe, i.e. applying a function to each row of a large dataframe (instead of using a for loop with iterrows):
- vanilla Python dataframe apply (dataframe.apply)
- swifter (dataframe.swifter.apply)
- dask (dask.dataframe.apply)
- pandarallel
- mapply
- vectorization

NOTE:
- there is no best method, the speed and actual ranking of these methods varies based on multiple factors
- the factors that affect performance (and the ranking of these methods) include the size of the dataframe, the type of function that is applied to the dataframe, and the hardware
- on relatively small datasets, advanced methods may perform actually worse than the more basic methods, due to their initial overhead (even if they scale better and are more efficient on large datasets)

Useful links:
- https://sparkbyexamples.com/pandas/pandas-apply-function-to-every-row/
- https://stackoverflow.com/questions/12182744/python-pandas-apply-a-function-with-arguments-to-a-series
- https://stackoverflow.com/questions/26658240/getting-the-index-of-a-row-in-a-pandas-apply-function
- https://stackoverflow.com/questions/45545110/make-pandas-dataframe-apply-use-all-cores
- https://stackoverflow.com/questions/58310509/why-is-swifter-slower-than-vanilla-df-apply
- https://github.com/jmcarpenter2/swifter/issues/51
- https://towardsdatascience.com/pandaral-lel-a-simple-and-efficient-tool-to-parallelize-your-pandas-operations-on-all-your-cpus-bb5ff2a409ae
- https://towardsdatascience.com/do-you-use-apply-in-pandas-there-is-a-600x-faster-way-d2497facfa66
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
    # This function is used for processing each row of a dataframe.
    # NOTE: the first argument is received by default (i.e. the current row of the dataframe), all others have to be provided explicitly.
    new_row = pd.Series({
        'aa': row["A"],
        'bb': row["B"],
        'cc': row["C"],
        'sum': row[0]+row[1]+row[2],  # NOTE: either column names and/or integer indices can be used, and row.name can be used for accessing the index
        'x': x,
        'y': y,
        'x+y': x+y,
    })
    return new_row


@timeit
def dataframe_iterrows(raw_df, func_to_apply_to_df_rows):
    print("\n--> dataframe.iterrows")
    df = pd.DataFrame()
    for idx, row in raw_df.iterrows():
        df_row = func_to_apply_to_df_rows(row, 11, 22)
        df = df.append(df_row, ignore_index=True)
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


if __name__ == "__main__":

    # number_of_rows = 1e4
    number_of_rows = 1e5

    # Raw data:
    raw_df = pd.DataFrame(np.random.randint(0, 100, size=(int(number_of_rows), 3)), columns=list('ABC'))
    # print("raw data:")
    # print(raw_df)

    # Various methods for processing:
    # dataframe_iterrows(raw_df, func_to_apply_to_df_rows)
    dataframe_apply(raw_df, func_to_apply_to_df_rows)
    # dataframe_swifter_apply(raw_df, func_to_apply_to_df_rows)
    # dask_dataframe_apply(raw_df, func_to_apply_to_df_rows)
    dataframe_mapply(raw_df, func_to_apply_to_df_rows)
