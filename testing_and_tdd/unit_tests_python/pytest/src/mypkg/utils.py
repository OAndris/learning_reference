def replace_value_if_invalid(value, array_of_invalids, value_if_invalid):
    return value if value not in array_of_invalids else value_if_invalid
