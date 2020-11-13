"""
PandasGUI is a GUI for analyzing Pandas DataFrames.

Source of example: "Daily Python Tip" at Twitter.
"""

import pandas as pd
from pandasgui import show

df = pd.DataFrame(
    [[1,2,3], [4,5,6], [7,8,9]],
    columns=['a', 'b', 'c']
)
show(df)
