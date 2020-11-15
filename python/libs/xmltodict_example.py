"""
Turn an XML string into a Python dictionary.
Source of example: PyBites at Twitter.
"""

import xmltodict

xml = """<?xml version="1.0" encoding="UTF-8"?>
<root response="True">
    <movie title="The Prestige" year="2006" released="20 Oct 2006" runtime="130 min" />
    <movie title="The Dark Knight" year="2008" released="18 Jul 2008" runtime="152 min" />
    <movie title="Interstellar" year="2014" released="07 Nov 2014" runtime="169 min" />
</root>
"""

movies = xmltodict.parse(xml)

print(type(movies))
print("=====")
print(movies)
print("=====")
print(movies["root"]["movie"])
print("=====")
for movie in movies["root"]["movie"]:
    print(f'{movie["@title"]}, {movie["@year"]} ({movie["@runtime"]})')
