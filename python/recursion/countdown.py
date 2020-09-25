from time import sleep


def countdown(x, delay=1):
    """
    countdown(x, delay=1) -> None
    Count down from a number to 0, waiting between each step.
    Inputs:
        x - integer to count down from
        delay - (optional) integer indicating the number of seconds to wait between each step
    """
    if x == 0:
        print('Done!')
        return
    else:
        print(x,'...')
        sleep(delay)
        countdown(x-1)


def main():
    countdown(5)


if __name__ == '__main__':
    main()
