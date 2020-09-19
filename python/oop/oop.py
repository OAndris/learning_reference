# Source: https://www.youtube.com/watch?v=ZDa-Z5JzLYM&list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc (Corey Schafer: Python OOP Tutorials - Working with Classes)

class Employee:
    # Class variables:
    number_of_employees = 0
    raise_amount = 1.04

    def __init__(self, first, last, pay):
        Employee.number_of_employees += 1
        self.first = first  # instance variable
        self.last = last
        self.pay = pay

    def __repr__(self):
        # "Magic Methods" (dunder methods) allow us to emulate built-in behavior within Python, and it is also how we implement "operator overloading".
        # "__repr__" overwrites the value of "repr(self)", used for unambigous identification of the instance. It is often the string value that reproduces the instance.
        return f"Employee('{self.first}', '{self.last}', {self.pay})"

    def __str__(self):
        # "__str__" overwrites the value of "print(self)".
        return f"{self.fullname()} - {self.email}"
    
    def __add__(self, other):
        # Operator overloading example.
        return self.pay + other.pay
    
    def __len__(self):
        # Operator overloading example.
        return len(self.fullname())

    @property
    def email(self):
        # Methods decorated with "@property" allow us to access the return value of a method as an attribute (instead of having to call the method).
        return f'{self.first}.{self.last}@company.com'

    @property
    def fullname(self):
        return f'{self.first} {self.last}'
    
    @fullname.setter
    def fullname(self, name):
        # This "setter" allows us to assign to "self.fullname" directly, and also update the related fields.
        first, last = name.split(' ')
        self.first = first
        self.last = last
    
    @fullname.deleter
    def fullname(self):
        # This "deleter" allows us to delete the "fullname" attribute of the instance via "del self.fullname", and also update the related fields.
        print('Deleted Name!')
        self.first = None
        self.last = None
    
    def apply_raise(self):
        self.pay = int(self.pay * self.raise_amount)
    
    @classmethod
    def set_raise_amount(cls, amount):
        # Class methods implicitly receive (and use) the class itself as their first argument.
        cls.raise_amount = amount
    
    @classmethod
    def from_string(cls, employee_string):
        # This is an example of an "alternative constructor" via classmethod (the class can now also be instantiated by calling it with a single 'employee_string' argument).
        first, last, pay = employee_string.split('-')
        return cls(first, last, pay)
    
    @staticmethod
    def is_workday(day):
        # Static methods do not receive any argument implicitly, as they do not operate on the instance or the class. They are just helper functions assigned to the object, without access to the instance or the class.
        if day.weekday() in (5,6):
            return False
        return True


class Developer(Employee):
    raise_amount = 1.1

    def __init__(self, first, last, pay, prog_lang):
        super().__init__(first, last, pay)
        self.prog_lang = prog_lang


class Manager(Employee):
    def __init__(self, first, last, pay, employees=None):
        super().__init__(first, last, pay)
        if employees is None:
            self.employees = []
        else:
            self.employees = employees
    
    def add_employee(self, employee):
        if employee not in self.employees:
            self.employees.append(employee)
    
    def remove_employee(self, employee):
        if employee in self.employees:
            self.employees.remove(employee)
    
    def print_employees(self):
        print([employee.fullname() for employee in self.employees])




emp_1 = Employee('Corey', 'Schafer', 50_000)
emp_2 = Employee('Test', 'User', 60_000)
emp_3 = Employee.from_string('John-Doe-70000')
dev_1 = Developer('Xyz', 'Schafer', 50_000, 'Python')
mgr_1 = Manager('Sue', 'Smith', 90_000, [emp_1, dev_1])

# print(emp_1.fullname())
# print(Employee.fullname(emp_1))

# emp_1.raise_amount = 1.05
# Employee.set_raise_amount(1.1)
# print(Employee.raise_amount)
# print(emp_1.raise_amount)
# print(emp_2.raise_amount)

# print(emp_3.__dict__)

# import datetime
# my_date = datetime.date(2016, 7, 11)
# print(Employee.is_workday(my_date))

# print(help(Developer))

# print(dev_1.pay)
# dev_1.apply_raise()
# print(dev_1.pay)

# print(mgr_1.print_employees())
# mgr_1.add_employee(emp_2)
# print(mgr_1.print_employees())
# mgr_1.remove_employee(emp_1)
# print(mgr_1.print_employees())

# print(repr(emp_1))
# print(emp_1)
# print(emp_1 + emp_2)
# print(len(emp_1))

print(emp_1.email)
