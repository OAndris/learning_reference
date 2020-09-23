# Source: https://www.linkedin.com/learning/python-essential-training-2/objects

class Duck:
    # Class variables, bound to the Duck class:
    sound = 'Quacks like a duck.'
    walking = 'Walks like a duck.'

    def __init__(self, name):
        # Object variables, bound to the specific, instantiated Duck objects (starting underscore indicates that it should be handled as private):
        self._name = name
    
    def __str__(self):
        # Special method that defines how the "print" function should behave
        return f'{type(self)} object with name "{self.name()}".'

    def name(self, value=None):
        # 'Setter-getter' method (setter if a value is provided as input, getter if not)
        if value:
            self._name = value
        return self._name

    def quack(self):
        print(self.sound)
    
    def walk(self):
        print(self.walking)

def main():
    my_duck = Duck('Donald')
    my_duck.quack()
    my_duck.walk()
    print(Duck.sound)
    print(my_duck)
    print(my_duck.name())
    my_duck.name('Daisy')
    print(my_duck)

if __name__ == '__main__':
    main()
