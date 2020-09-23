import random
import sys
import traceback  # https://docs.python.org/3/library/traceback.html

def main():
    try:
        random_integer = random.randint(0, 4)
        if random_integer == 0:
            x = 5 / 0
        elif random_integer == 1:
            x = int('foo')
        elif random_integer == 2:
            x = 5 / '1'
        elif random_integer == 3:
            if 3 != 5:
                raise AssertionError('I feel like throwing an AssertionError...')
        else:
            x = 17

    except ZeroDivisionError:
        print('Cannot divide by zero.')
    except ValueError as err:
        print(f'A ValueError has occured: {err}.')
    except:
        print('Unknown error!')
        (err, msg, tb_obj) = sys.exc_info()
        print(f'Type: "{err}". Value: "{msg}". Traceback object: "{tb_obj}"')
        print('Full traceback:')
        print(traceback.print_exc())
    else:
        print('No error :)')

if __name__ == '__main__':
    main()
