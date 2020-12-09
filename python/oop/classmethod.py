"""
In Python, a classmethod can be used for creating alternative constructors for a class.

Source of example: PyBites
"""

from datetime import date

class MyDate:
    def __init__(self, year, month, day):
        self.date = date(year, month, day)
    
    @classmethod
    def from_str(cls, date_str):
        try:
            year, month, day = date_str.split("-")
            return cls(int(year), int(month), int(day))
        except ValueError:
            raise


d1 = MyDate(2016, 12, 19)
d2 = MyDate.from_str("2016-12-19")

print(f"{d1.date} ({d1})")
print(f"{d2.date} ({d2})")
print(d1.date == d2.date)
