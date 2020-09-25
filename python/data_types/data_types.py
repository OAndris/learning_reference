data_types_in_python = {
    'primitives': {
        'integer': 1,
        'float': 1.0,
        'string': 'whatever',
        'boolean': True,
        'NoneType': None,
    },
    'data_structures': {
        'list': [0, 1, 'string', True, False, [0, 1, 2], None],
        'tuple': (0, 1, 'string', True, False, [0, 1, 2], None),
        'dictionary': {1: 'abc', 'b': 'falkfja'},
        'set': {0, 1, 'string', True, False, None},
        'frozenset': frozenset((0, 1, 'string', True, False, None)),
    },
    'data_structures_from_packages': [
        'pandas.DataFrame',
        'collections.OrderedDict',
        'collections.namedtuple',
        'typing.NamedTuple',
    ],
    'additional_info': [
        'In Python, everything is an object. Functions can also be stored in variables, passed as input to functions, and returned by functions.'
        'Primitives are passed by value',
        'Collections are passed by reference',
        'Use "type()" to check the type of a variable',
        'Use "==" to check equality, "id()" to check identity',
        'Prefer tuples over lists when possible. They are immutable (less error-prone), and they are also faster and consume less memory.',
        [
            'list():      Mutable,   ordered sequence of elements',
            'tuple():     Immutable, ordered sequence of elements',
            'dict():      Mutable,   unordered mapping of key-value pairs',
            'set():       Mutable,   unordered collection of unique elements',
            'frozenset(): Immutable, unordered collection of unique elements',

            'collections.namedtuple():  Tuple with named fields',
            'collections.OrderedDict(): Dictionairy with special properties',
            'collections.defaultdict(): Dictionairy with special properties',
            'collections.Counter():     Counts distinct values',
            'collections.deque():       Double-ended list object,',
        ],
    ],
}

print(data_types_in_python['data_structures']['frozenset'])  # Use bracket notation to access the keys of a dictionary
# print(data_types_in_python.data_structures.dictionary)  # This (dot notation) doesn't work in Python!
