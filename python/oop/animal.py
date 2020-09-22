# Source: https://www.linkedin.com/learning/python-essential-training-2/constructing-an-object
# Source: https://www.linkedin.com/learning/python-essential-training-2/inheritance

class Animal:
    # Class variables are accessible directly from the class. They are also accessible from the objects (through the class), and shared between all objects (any change affects all objects).
    counter = 0

    def __init__(self, **kwargs):
        # Using '**kwargs' enables us to define and handle an arbitrary number of keyword arguments (and receive them all as key-value pairs in a dict).
        # Anything starting with an underscore are meant to be private, this indicates that they should not be used or changed directly (only via getters and setters).
        # Object variables are bound to the object and are only accessible from the object itself (not from the class).
        Animal.counter += 1
        if 'type' in kwargs:
            self._type = kwargs['type']
        if 'name' in kwargs:
            self._name = kwargs['name']
        if 'sound' in kwargs:
            self._sound = kwargs['sound']
    
    def __str__(self):
        # The special '__str__' method provides the string representation of the object when 'print(obj)' is called.
        return f'The {self.type()} is named "{self.name()}" and says "{self.sound()}".'
    
    def type(self, value=None):
        # These type of methods can be used as both getters (when called without an input value) and setters (when called with an input value)
        if value != None:
            self._type = value
        return self._type
    
    def name(self, value=None):
        if value:
            self._name = value
        try:
            return self._name
        except AttributeError:
            return None
    
    def sound(self, value=None):
        if value:
            print(f'The sound of {self.name()} has changed from {self.sound()} to {value}!')
            self._sound = value
        try:
            return self._sound
        except AttributeError:
            return None

class Duck(Animal):
    def __init__(self, **kwargs):
        self._type = 'duck'
        if 'type' in kwargs:
            del kwargs['type']
        super().__init__(**kwargs)

class Kitten(Animal):
    def __init__(self, **kwargs):
        self._type = 'kitten'
        if 'type' in kwargs:
            del kwargs['type']
        super().__init__(**kwargs)
    
    def eat(self, food):
        print(f'{self.name()} is now eating {food}.')


def main():
    def print_animal(obj):
        # This is just an example of a nested function, type checking, error throwing, and the use of the 'getter-setters' as getters.
        if not isinstance(obj, Animal):
            raise TypeError('print_animal() requires an Animal.')
        print(f'The {obj.type()} is named "{obj.name()}" and says "{obj.sound()}".')
    
    fluffy = Animal(type='kitten', name='Fluffy', sound='rwar')
    garfield = Kitten(name='Garfield', sound='meow')
    donald = Duck(name='Donald', sound='quack')

    print_animal(fluffy)
    fluffy.sound('bark')
    print_animal(fluffy)
    print()
    print(garfield)
    print(donald)
    garfield.eat(donald.name())
    
    print_animal(Animal(type='velociraptor', name='Veronica', sound='hello'))
    print()
    print(f'The Animal class has been instantiated {Animal.counter} times.')
    print()
    print('This will error out:')
    try:
        print_animal(5)
    except TypeError:
        print('This would have thrown an error!')

if __name__ == '__main__':
    main()
