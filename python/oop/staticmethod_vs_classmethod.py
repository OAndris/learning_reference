"""
Python program to demonstrate class methods and static methods.

Similarities:
- Both @classmethod and @staticmethod are built-in function decorators (enhancing the base functionality of the functions they wrap).
- Both are bound to the class (thus they can be accessed as the methods of the class).

Differences:
- Signature:
    - Class methods receive the class as an implicit first argument.
    - Static methods don't receive any implicit argument.
- Access to the class:
    - Class methods can access and modify class state (e.g. a class variable that will be applicable to all instances).
    - Static methods don't know about the class and can't modify it.
- Usage:
    - Class methods are generally used to create factory methods (returning a class object, as a constructor does, for different use cases).
    - Static methods are generally used to create utility functions (which do not need access to the class, but are somewhat still related to the class and thus it makes sense to define them as part of the class).

Sources:
- https://www.geeksforgeeks.org/class-method-vs-static-method-python/
- https://stackoverflow.com/questions/136097/difference-between-staticmethod-and-classmethod
"""

from datetime import date

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # A class method to create a Person object by birth year.
    @classmethod
    def from_birth_year(cls, name, year):
        return cls(name, date.today().year - year)

    # A static method to check if a Person is adult or not.
    @staticmethod
    def is_adult(age):
        return age >= 18

person1 = Person('Mary', 33)
person2 = Person.from_birth_year('Joe', 1990)

print(person1.name, person1.age)
print(person2.name, person2.age)
print(Person.is_adult(18), Person.is_adult(17))
