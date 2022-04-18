# Based on: https://pythonspeed.com/articles/faster-pandas-dask/

import pandas
from functools import reduce

# 1. Load. Read the data in chunks of 40000 records at a time.
chunks = pandas.read_csv("voters.csv", chunksize=40000, usecols=[
    "Residential Address Street Name ",
    "Party Affiliation "
])


# 2. Map. For each chunk, calculate the per-street counts:
def get_counts(chunk):
    by_party = chunk.groupby("Party Affiliation ")
    street = by_party["Residential Address Street Name "]
    return street.value_counts()


processed_chunks = map(get_counts, chunks)


# 3. Reduce. Combine the per-chunk voter counts:
def add(previous_result, new_result):
    return previous_result.add(new_result, fill_value=0)


result = reduce(add, processed_chunks)


# 4. Post-process.
result.sort_values(ascending=False, inplace=True)

print(result)
