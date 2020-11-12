# Based on: https://www.linkedin.com/learning/programming-foundations-algorithms/understanding-recursion

from time import sleep


def countdown(num, delay=1):
    """
    countdown(num, delay=1) -> None
    Count down from a number to 0, waiting between each step.
    Inputs:
        num - integer to count down from
        delay - (optional) integer indicating the number of seconds to wait between each step
    """
    if num == 0:
        print('Done!')
        return
    else:
        print(num,'...')
        sleep(delay)
        countdown(num-1)


def countup(start, end, delay=1):
    if start > end:
        print('Done!')
        return
    else:
        print(f'{start} / {end}...')
        sleep(delay)
        countup(start+1, end)


def main():
    countdown(5)
    countup(7, 10)


if __name__ == '__main__':
    main()
