# Object-Relational Mapping (ORM) in Python

## Basics:

Mappers are responsible for moving data between objects and a database while keeping them independent of each other. As object-oriented programming languages and relational databases structure data on different ways, we need specific code to translate from one schema to the other.

SQLAlchemy is an ORM solution for Python:

- translates Python classes into/from tables of relation databases (helps to move data between instances of these classes and rows of these tables)
- automatically converts function calls to SQL statements
- provides a standard interface that allows developers to create database-agnostic code to communicate with a wide variety of database engines


## Dialects:

SQLAlchemy is a facade that enables Python developers to create applications that communicate to different database engines through the same API.

Most of the popular relational databases available out there adhere to the SQL (Structured Query Language) standard, but they also introduce proprietary variations.

These variations are the solely responsible for the existence of dialects.

Example: `SELECT TOP 10 * FROM people;` (Microsoft SQL Server) vs. `SELECT * FROM people LIMIT 10;` (MySQL)

To know precisely what query to issue, SQLAlchemy needs to be aware of the type of the database that it is dealing with. This is exactly what Dialects do.

## Sources:
- https://auth0.com/blog/sqlalchemy-orm-tutorial-for-python-developers/
