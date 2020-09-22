# Source: https://www.linkedin.com/learning/python-essential-training-2/inheritance

class RevStr(str):
    # A custom class can also inherit from a built-in class and extend and/or overwrite it.
    def __str__(self):
        return self[::-1]

def main():
    string = 'Hello, World!'
    print(f'{string} (type is {type(string)})')
    print(f'{RevStr(string)} (type is {type(RevStr(string))})')

if __name__ == '__main__':
    main()
