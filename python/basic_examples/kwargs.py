# Source: https://www.linkedin.com/learning/python-essential-training-2/keyword-arguments

def main():
    x = dict(Buffy='meow', Zilla='grr', Angel='rawr')
    kitten(**x)
    kitten()

def kitten(**kwargs):
    if len(kwargs):
        for k in kwargs:
            print(f'Kitten {k} says {kwargs[k]}')
    else:
        print('Meow.')

if __name__ == '__main__':
    main()
