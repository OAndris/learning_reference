# Source: https://www.linkedin.com/learning/python-essential-training-2/argument-lists

def main():
    args = ('meow', 'grrr', 'purr')
    kitten(*args)
    kitten()

def kitten(*args):
    if len(args):
        for s in args:
            print(s)
    else:
        print('Meow.')

if __name__ == '__main__':
    main()
