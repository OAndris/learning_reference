# Source: https://www.linkedin.com/learning/python-essential-training-2/iterator-objects

class InclusiveRange:
    """Note that using a generator function (with the 'yield' keyword) is usually simpler than implementing an iterator class."""
    def __init__(self, *args):
        numargs = len(args)
        self._start = 0
        self._step = 1

        if numargs < 1:
            raise TypeError(f'Expected at least 1 arguments, got {numargs}.')
        elif numargs == 1:
            self._stop = args[0]
        elif numargs == 2:
            (self._start, self._stop) = args
        elif numargs == 3:
            (self._start, self._stop, self._step) = args
        else:
            raise TypeError(f'Expected at most 3 arguments, got {numargs}.')
        
        self._next = self._start
    
    def __iter__(self):
        # This special '__iter__' method simply identifies the object as an iterator object.
        return self
    
    def __next__(self):
        # This special '__next__' method is the iterator itself.
        if self._next > self._stop:
            raise StopIteration  # StopIteration can be raised in an iterator class to stop the execution
        else:
            _r = self._next
            self._next += self._step
            return _r

def main():
    for n in InclusiveRange(5, 25, 2):
        print(n, end=' ')
    print()

if __name__ == '__main__':
    main()
