def replace_value_if_invalid(value, array_of_invalids, value_if_invalid):
    return value if value not in array_of_invalids else value_if_invalid

def higher_than_5(num):
    if num > 5:
        return "Higher than 5"
    else:
        return "Not higher than 5"

def smaller_than_5(num):
    if num < 5:
        return "Smaller than 5"
    else:
        return "Not smaller than 5"
