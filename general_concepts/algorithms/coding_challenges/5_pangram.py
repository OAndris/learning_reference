"""
Code Warriors' Challenge 2022
Challenge #05

Introduction
A pangram is a sentence that contains every single letter of the alphabet at least once. For example, the sentence "The quick brown fox jumps over the lazy dog" is a pangram, because it uses the letters A-Z at least once (case is irrelevant).

Task
Given a string, detect whether or not it is a pangram. Return True if it is, False if not. Ignore numbers and punctuation.

Code form
def is_pangram(s):
    return …
"""


def is_pangram(s):
    alphabet = list(map(chr, range(97, 123)))  # array of lowercase characters of the English alphabet from "a" to "z"
    return all([alphabet_char in s.lower() for alphabet_char in alphabet])


print(is_pangram(("hello")))
print(is_pangram(("The quick brown fox jumps over a lazy dog")))
