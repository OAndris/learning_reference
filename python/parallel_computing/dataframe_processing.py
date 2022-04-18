import dask.dataframe as dask_df
import numpy as np
import pandas as pd
import swifter


"""
Useful links:
- https://sparkbyexamples.com/pandas/pandas-apply-function-to-every-row/
- https://stackoverflow.com/questions/12182744/python-pandas-apply-a-function-with-arguments-to-a-series
- https://stackoverflow.com/questions/26658240/getting-the-index-of-a-row-in-a-pandas-apply-function
- https://stackoverflow.com/questions/45545110/make-pandas-dataframe-apply-use-all-cores
"""


def func(row, x, y):
    # NOTE: the first argument is received by default (i.e. the current row of the dataframe), all others have to be provided explicitly.
    # print(f"{row.name} - {x}, {y}")
    new_row = pd.Series({
        'aa': row["A"],
        'bb': row["B"],
        'cc': row["C"],
        'sum': row[0]+row[1]+row[2],  # NOTE: either column names and/or integer indices can be used
        'x': x,
        'y': y,
        'x+y': x+y,
    })
    return new_row


if __name__ == "__main__":
    raw_df = pd.DataFrame([(3, 5, 7), (2, 4, 6), (5, 8, 9)], columns=['A', 'B', 'C'])
    # raw_df = pd.DataFrame(np.random.randint(0, 100, size=(100, 3)), columns=list('ABC'))
    print(raw_df)

    # Method 1 (faster than a for loop of the dataframe's rows, e.g. with iterrows):
    print("\n\ndataframe.apply:\n")
    df = raw_df.apply(func, args=(11, 22), axis=1)
    print(df)

    # Method 2 (faster than dataframe.apply):
    print("\n\ndataframe.swifter.apply:\n")
    df = raw_df.swifter.apply(func, args=(11, 22), axis=1)
    print(df)

    # Method 3 (faster than dataframe.apply):
    print("\n\nusing dask.dataframe:\n")
    ddf = dask_df.from_pandas(raw_df, npartitions=30)  # find your own number of partitions
    # ddf_update = ddf.apply(func, args=(11, 22), axis=1).compute()  # NOTE: if called without the "meta=" keyword, Dask will run your function on a small dataset first, to guess output types
    ddf_update = ddf.apply(func, args=(11, 22), axis=1, meta={'aa': 'int64', 'bb': 'int64', 'cc': 'int64', 'sum': 'int64', 'x': 'int64', 'y': 'int64', 'x+y': 'int64'}).compute()
    print(ddf_update)
