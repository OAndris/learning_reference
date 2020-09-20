# Source: https://www.linkedin.com/learning/python-essential-training-2/objects

class Duck:
    sound = 'Quacks like a duck.'
    walking = 'Walks like a duck.'

    def quack(self):
        print(self.sound)
    
    def walk(self):
        print(self.walking)

def main():
    donald = Duck()
    donald.quack()
    donald.walk()

if __name__ == '__main__':
    main()
