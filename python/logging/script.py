import logging


def func():
    logging.debug("A debug message to ignore")
    logging.info("An info message")
    try:
        1 / 0
    except ZeroDivisionError:
        logging.exception("Cannot divide by 0")


if __name__ == "__main__":
    func()
