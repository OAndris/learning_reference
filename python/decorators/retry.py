from functools import wraps, partial
import requests

# Example from PyBites @ Twitter


def retry(func=None, *, times=3):
    if func is None:
        return partial(retry, times=times)

    @wraps(func)
    def wrapper(*args, **kwargs):
        attempt = 0
        while attempt < times:
            try:
                return func(*args, **kwargs)
            except Exception as exc:
                attempt += 1
                print(f"Exception {func}: {exc} (attempt: {attempt})")
        return func(*args, **kwargs)
    return wrapper


@retry
# @retry(times=5)
def get(url):
    resp = requests.get(url)
    print(resp)
    resp.raise_for_status()


get('https://httpbin.org/status/200')
get('https://httpbin.org/status/404')  # Exception <function get at 0x031A3B68>: 404 Client Error: NOT FOUND for url: https://httpbin.org/status/404 (attempt: 3)
