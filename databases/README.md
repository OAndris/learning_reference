# Databases

## Steps:
1. Plan and design the database
2. Normalize it
3. Create it (either with SQL commands, the GUI of a RDBMS, or an ORM)

## Types (categories) of SQL commands:
- DDL: Data Definition Language
    - CREATE
    - ALTER
    - DROP
    - RENAME
    - TRUNCATE
    - COMMENT
- DQL: Data Query Language
    - SELECT
- DML: Data Manipulation Language
    - INSERT
    - UPDATE
    - DELETE
    - MERGE
    - CALL
    - EXPLAIN PLAN
    - LOCK TABLE
- DCL: Data Control Language
    - GRANT
    - REVOKE

## Modeling and planning a database (using an Entity-Relationship Diagram):
1. **Tables:** What tables are needed?
2. **Fields:** What are the required fields for each table?
3. **Data types:** Determine the data types for each field
4. **Primary key:** Determine the primary key for each table
5. **Relationships:** Determine the foreign keys and relationships (including any referential constraints) between tables (to organize tables, reduce redundancy and improve the integrity of our data)

## Relationships:
- **One-to-Many (1 : N) relationship**
    - E.g. 
- **Many-to-Many (N : M) relationship**
    - E.g. 
- **One-to-One (1 : 1) relationship**
    - E.g. 
- **Denormalization**
    - E.g. 

## Notes:
- For security reasons, consider using a UUID (Universally-Unique Identifier) instead of an integer key. It is much longer and thus more difficult for an attacker to guess
- SQL commands can be written in a DBMS, an application's source code, or in the command line
- 

## Querying a database:
- Index
- Transaction
- Stored Procedure
- Access Control
- Compliance
- SQL Injection
    - Type of attack that includes part of a SQL command entered as a value to hijack a query and change how it works
    - The attacker could delete tables, modify values, delete the entire the database, or retrieve sensitive information, for example
    - Example: user input on UI is "Tom" for first name and "''); DROP TABLE customers; --" for last name could end up executed as "INSERT INTO customers (first_name, last_name) VALUE('Tom', ''); DROP TABLE customers; --" (note: the "--" at the end of the statement prevents the database from using any potential remaining part of the original command)
    - How to avoid an injection attack:
        - Proper design of access control
        - Best practices for interacting with data
        - Safety features offered by programming languages
        - Proper processing of data that's entered

## Common Relational Database Management Systems (RDBMSs):
- Softwares:
    - Microsoft SQL Server
    - Oracle
    - dBase
    - FileMaker Pro
    - Microsoft Access
    - MySQL
    - MariaDB
    - SAP HANA
    - SQLite
- Some offer a GUI, others just a console for writing SQL commands
- Use case:
    - Desktop database: used for smaller solutions, hosted on workstation (e.g. Access, Filemaker Pro)
    - Enterprise database: used by large number of people, services millions of interactions (e.g. SQL Server, Oracle, SAP HANA)
    - In-between: for many different applications, and for prototyping an idea or handling just several thousands of clients, there are completely free and great RDBMSs, like MariaDB and MySQL
- Solutions for different database sizes:
    - SQLite is great for smaller databases (e.g. storing user preferences on a mobile device)
    - "Big Data" may require processing frameworks like Hadoop or Spark

## NoSQL (Not Only SQL):
- Not every information can be stored in a relational database
- Types:
    - Unstructured data
    - Key-value pairs
    - Graphs
    - Objects
    - Geographic data points
    - Stream of information (e.g. posts and comments on social media websites)

## Examples:
    CREATE DATABASE`
    CREATE TABLE customers (
        customer_id INT(6) NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(200),
        last_name
        email
        address
        city
        state
        phone
        birthday
        favourite_dish INT(6) REFERENCES dishes(dish_id),
    )

    SELECT * FROM customers;
    SELECT first_name, last_name, email FROM customers;
    SELECT first_name, last_name, email FROM customers WHERE state="CA";
    SELECT first_name, last_name, email FROM customers WHERE state="CA" OR state="CO";
    SELECT first_name, last_name, email FROM customers WHERE state LIKE "%C";

    SELECT * FROM reservations WHERE `date` > "2019-02-06" AND `date` < "2019-02-07";

    SELECT * FROM reservations ORDER BY `date`;

    SELECT COUNT(first_name) FROM customers;
    SELECT SUM(price), AVG(price), MIN(price), MAX(price) FROM dishes;

    SELECT first_name, last_name, dishes.`name` FROM customers JOIN dishes ON customers.favourite_dish = dishes.dish_id;

    INSERT INTO customers(first_name, last_name, email) VALUE ("Jane", "Smith", "jsmith2019@landonhotel.com");

    DELETE FROM customers WHERE customer_id=26;

    

## Sources:
- [Programming Foundations: Databases](https://www.linkedin.com/learning/programming-foundations-databases-2) by Scott Simpson (LinkedIn Learning)
- [SQL | DDL, DQL, DML, DCL and TCL Commands](https://www.geeksforgeeks.org/sql-ddl-dql-dml-dcl-tcl-commands/)
