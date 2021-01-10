
x = 'Hello, reißverschluss!'
print(x.upper())
print(x.lower())
print(x.casefold())
print(x.capitalize())
print(x.title())
print(x.swapcase())
print()

phrase = 'Make it work, make it right, make it fast.'
print(phrase)
print(' - '.join(phrase.split(', ')))
print(phrase.replace(', ', ' - '))
print('. '.join([substring.capitalize() for substring in phrase.split(', ')]))
print(f'Number of "make" in the phrase: {phrase.count("make")}')
print()

names = 'Tom Jacob Martha Jane'.split()
ages = (37, 121, 30, 5)
for name, age in zip(names, ages):
    print(f'{name:<10} {age}')  # ":<10" indicates 10 characters (in total), and left-aligned text
print('')
for name, age in zip(names, ages):
    print(f'{name:^10} {age}')  # ":^10" indicates 10 characters (in total), and centered-aligned text
print('')
for name, age in zip(names, ages):
    print(f'{name:>10} {age:>03}')  # ":>10" indicates 10 characters (in total), and right-aligned text. ":>03" indicates 3 digits, preceeded by zeros if needed
print('')


x = 5
y = 17
print('{} {}'.format(x, y))
print('{0} {1}'.format(x, y))
print('{1} {0}'.format(x, y))
print('{1} {0} {1}'.format(x, y))
print('{a} {b}'.format(a=x, b=y))
print('{a:*<5} {b:+>5}'.format(a=x, b=y))  # left-adjust and right-adjust
print()
print(f'{x} {y}')  # f-strings (mode modern string formatting since Python v3.6, it is built on the format method and is simply a shortcut for it)
print(f'{x:*<5} {y:.>10}')  # left-adjust and right-adjust
print(f'{123456789:,}')  # thousands limiter
print(f'{123456789:,}'.replace(',', '.'))
print(f'{123456789/1e6:.4f}')  # precision
print(f'{123456789:x}')  # hexadecimal
print(f'{123456789:o}')  # octal
print(f'{123456789:b}')  # binary
