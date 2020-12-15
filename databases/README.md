# Databases

This document is a summary about SQL relational databases.


## Basics:
- Databases let us work with large amounts of data efficiently
- They make storing, organizing, updating and searching data easy and reliable
- They help to ensure accuracy and help to avoid redundancy
- They offer security features to control access
- SQL vs. NoSQL:
    - **SQL (Structured Query Language)**
        - relational database
        - table-based database
        - predefined schema (data is structured)
        - data is partitioned across multiple tables
    - **NoSQL (Not Only SQL)**
        - non-relational database
        - various types, e.g. document-, graph-, object-based
        - non-fixed schema (potentially unstructured data)
        - data for an entity is stored together
        - some examples:
            - Document (e.g. CouchDB, MongoDB)
            - Graphs (e.g. Neo4j)
            - Objects (e.g. Realm, ObjectivityDB)
            - Geographic data points
            - Stream of information (e.g. posts and comments on social media websites)
    - Each has different use cases, pros and cons
- **ORM (Object-Relational Mapping)**
    - ORM tools allow converting data between the otherwise incompatible objects (in object-oriented programming) and database tables
    - ORMs, therefore, enable us to create and use databases directly from the programming language (using the same language as the rest of the application, instead of SQL)
    - ORMs are high-level tools for abstracting database interactions
    - ORMs also have their pros and cons
    - there are various ORM tools for different programming languages, such as:
        - **Python** - SQLAlchemy, Django (backend framework that includes ORM)
        - **Java** - Hibernate
        - **Node.js** - Sequelize, TypeORM
    - three different layers of abstracting database interactions:
        - low-level database drivers
        - query builders (e.g. "knex" for Node.js)
        - high-level ORMs
- **DBMS (Database Management System)**
    - DBMS refers to the actual software that provides the necessary features for users to manage a database and its data, including the common CRUD (Create, Read, Update, Delete) operations, as well as administration and access control
    - some DBMS softwares include MySQL, MariaDB, SQLite, PostgreSQL, MSSQL, Oracle Database, Microsoft Access. Various DBMSs might have slightly different syntax
    - some offer a GUI, others just a console for writing SQL commands
    - Use case:
        - **Desktop database** - used for smaller solutions, hosted on a workstation (e.g. Access, Filemaker Pro)
        - **Enterprise database** - used by large number of people, hosted on a dedicated server, serves millions of interactions (e.g. SQL Server, Oracle, SAP HANA)
        - **In-between** - for many different applications, and for prototyping an idea or handling just several thousands of clients, there are completely free and great RDBMSs, like MariaDB and MySQL
    - Solutions for different database sizes:
        - SQLite is great for very small databases (e.g. storing user preferences on a mobile device)
        - "Big Data" may require processing frameworks like Hadoop or Spark


## Concepts:
- SQL commands can be written in a DBMS, an application's source code, or in the command line
- A relational database is made up of tables (relations)
- **Tables** represent entities
- **Columns** (fields) represent the attributes of an entity
- **Rows** (records) represent instances of an entity
- **Primary key** - a unique value that can be used to refer to a specific record
    - **Natural key** - a key that represents some kind of useful data on its own
    - **Surrogate key** - a key that was created specifically and solely to serve as a key (e.g. an incremented ID)
- **Foreign key** - a key that references the primary key of an other, related table
- **Composite key** - a key composed of multiple fields (to uniquely identify a record)

A **UUID (Universally-Unique Identifier)** is a longer ID (as opposed to e.g. an auto-incremented integer ID), which is harder for an attacker to guess.


## Types of SQL commands, and some related SQL keywords:
- **DDL: Data Definition Language** (organizing data)
    - CREATE
    - ALTER
    - DROP
    - RENAME
    - TRUNCATE
    - COMMENT
- **DQL: Data Query Language** (searching data)
    - SELECT
- **DML: Data Manipulation Language** (interacting with data)
    - INSERT
    - UPDATE
    - DELETE
    - MERGE
    - CALL
    - EXPLAIN PLAN
    - LOCK TABLE
- **DCL: Data Control Language** (controlling access)
    - GRANT
    - REVOKE

---

## Steps of creating a database:
1. Plan and design the database
2. Normalize database
3. Create database (either with SQL commands, the GUI of a RDBMS, or an ORM)


## 1) Planning and modeling a database:

Create an **Entity Relationship (ER) Diagram**, it is extremely useful in planning.

Steps to perform:
1. **Tables** - What tables are needed? How to name them? (use plurals)
2. **Fields** - What are the required fields for each table?
3. **Data types** - Determine the data types for each field
4. **Primary key** - Determine the primary key for each table
5. **Relationships** - Determine the foreign keys and relationships (including any referential constraints) between tables (to organize tables, reduce redundancy and improve the integrity of our data)


### Data types:
- Strings - alphanumeric characters and text:
    - **CHAR** - fixed number of characters
    - **VARCHAR** - variable number of characters up to a maximum length
    - **LONGTEXT**
    - etc.
- Dates:
    - **DATE** - YYYY-MM-DD
    - **DATETIME** - YYYY-MM-DD hh:mm:ss
    - **TIMESTAMP** - stored as the number of seconds since the Unix epoch ('1970-01-01 00:00:00' UTC)
    - **YEAR** - YYYY
    - etc.
- Numbers:
    - **DECIMAL**
    - **INT**
    - **BIGINT**
    - **BOOL**
    - **FLOAT**
    - **DOUBLE**
    - etc.


### Relationships:
- **One-to-Many (1 : N) relationship**
    - The most common relationship
    - It associates a single record from a table with multiple records of another table
    - E.g. one dish can be associated to multiple customers (the primary key of the Dishes table can be referenced by multiple records of the Customers table with its foreign key)
- **Many-to-Many (N : M) relationship**
    - Multiple records from a table can be associated with multiple records of another table
    - Requires a linking table with two foreign keys for referencing the primary keys of the two connected tables
- **One-to-One (1 : 1) relationship**
    - Associates a single record from a table with a single record from another table (exclusively)
    - It is rarely used. A use case might be to outsource related, but sensitive data to another table (which can have different access rights than the original table)
- **Referential Integrity**
    - Databases can be made aware of relationships between tables and prevent users from modifying data in a way that violates those relationships
    - It helps us to maintain the integrity, consistency of the data
    - Examples:
        - a foreign key cannot reference to a non-existing record
        - a child cannot be deleted for as long as it is being referenced by any parent
        - deleting a parent might automatically delete all of its referenced children
        - etc.


## 2) Normalization:
- "Normal Forms" are normalization rules for organizing data in a database, for optimizing its structure
- They help us to reduce redundancy and improve the integrity of our data
- Among the many normal forms, there are 3 that are critically important. Normalizing database to third normal form is a best practice
- Applying the normalization rules is an important step in designing any database
- The normal forms / normalization rules build on top of each other (step by step), each further optimizing the database
- On very rare occasion (e.g. due to business needs or performance issues), violating the normal forms might be necessary. **Denormalization** is the process of intentionally duplicating information in a table (in violation of normalization rules). It doesn't mean skipping normalization, as it is done to a previously normalized database. It is a trade-off: increasing speed, but potentially reducing consistency.

Normalization rules:
- **First normal form (1NF)**
    - **Values in each cell should be atomic and tables should have no repeating groups** (each field in each table has only one value in it - there are no columns representing repeated kinds of data for each row)
    - The order of fields and the order of rows shouldn't matter (if the sequence is important, use an auto-incremented unique value, or a timestamp)
    - E.g. the favourite foods of a person should neither be stored in N separate fields, nor in a single field with comma separated values (instead, a linking table should be used)
- **Second normal form (2NF)**
    - **No value in a table should depend on only part of a key** that can be used to uniquely identify a row (for every non-key column in the table, each value must rely on only the whole key)
    - E.g. if a composite key composed of 2 fields is used for uniquely identifying rows, but 1 of 2 keys is enough for uniquely identifying it, then only it should be used (and the second field's values, as well as their mapping to the first field's values can be outsourced to a new table)
- **Third normal form (3NF)**
    - **Values should not be stored if they can be calculated from another non-key field**
    - E.g. when prices are stored in a field, discount prices that could be calculated by a formula shouldn't be stored in a second field (it is a meaningless waste of resources, and might as well cause inconsistency in our data)


### Increasing the speed, integrity and consistency of the database:
- **Indexes**
    - Tables can have indexes, which allows looking up information quickly
    - A primary key also serves as an index, but in larger tables, additional indexes might help to look up relevant information faster
    - Using indexes is a trade-off: they make the lookup of data faster, but the update of data slower
    - E.g. if customers are often searched up directly by their names, then, in a large table, it can become slow. By creating an index for the firstname + lastname fields, the database stores a reference to what each value is in those fields and where it is located, making it faster for the database to return the information
- **Transaction**
    - A set of operations that must all be completed together
    - If any of the operations fails, none of the operations is executed (there is no "partially done", if anything fails, the database is rolled back to the previous, valid, unchanged state)
    - Transactions follow the "ACID" principle, thus transactions are atomic, consistent, isolated, and durable
    - ACID requirements are handled by DBMS when transactions are used
- **Stored procedure**
    - A series of commands stored on the database server
    - They allow reusing long or detailed queries (instead of writing them for each use)
    - They also provide a safe way to deal with sensitive data. In many cases, access to certain sensitive data (or whole tables) is only allowed through stored procedures rather than directly


### Security:
- Access control:
    - User accounts can be created, and different rights can be assigned to each
    - Table and column permissions can granted and restricted
- Compliance:
    - Personally Identifiable Information (PII) is strictly regulated in some regions and industries
    - HIPAA in the US and GDPR in the EU have strict rules about how PII is handled
    - Skipping compliance requirements can become a costly mistake
- SQL injection:
    - A type of attack that includes part of a SQL command entered as a value to hijack a query and change how it works
    - The attacker could delete tables, modify values, delete the entire the database, or retrieve sensitive information, for example
    - Example: user input on the UI is "Tom" for first name and "'); DROP TABLE customers; --" for last name. It could end up executed as "INSERT INTO customers (first_name, last_name) VALUES('Tom', ''); DROP TABLE customers; --', '');" (note: the "--" at the end of the statement prevents the database from using the remaining part of the original command)
    - How to avoid an injection attack:
        - Proper design of access control
        - Best practices for interacting with data
        - Safety features offered by programming languages
        - Proper processing of data that's entered


## 3) Creating and using a database (examples):
    CREATE DATABASE restaurant;

    CREATE TABLE customers (
        customer_id INT(6) NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(200) NOT NULL,
        last_name VARCHAR(200) NOT NULL,
        email VARCHAR(200),
        address VARCHAR(200),
        city VARCHAR(200),
        state CHAR(2),
        phone VARCHAR(20) NOT NULL,
        birthday DATE,
        favourite_dish INT(6) REFERENCES dishes(dish_id),
        PRIMARY KEY(customer_id)
    );

    -- Querying and narrowing records:
    SELECT * FROM customers;
    SELECT first_name, last_name, email FROM customers;
    SELECT first_name, last_name, email FROM customers WHERE state="CA";
    SELECT first_name, last_name, email FROM customers WHERE state="CA" OR state="CO";
    SELECT first_name, last_name, email FROM customers WHERE state LIKE "%C";
    SELECT * FROM reservations WHERE `date` > "2019-02-06" AND `date` < "2019-02-07";

    -- Sorting records:
    SELECT * FROM reservations ORDER BY `date`;

    -- Aggregate functions:
    SELECT COUNT(first_name) FROM customers;
    SELECT SUM(price), AVG(price), MIN(price), MAX(price) FROM dishes;

    -- Joining multiple tables:
    SELECT first_name, last_name, dishes.`name` FROM customers JOIN dishes ON customers.favourite_dish = dishes.dish_id;

    -- Inserting, updating and deleting data:
    INSERT INTO customers(first_name, last_name, email) VALUE ("Jane", "Smith", "jsmith2019@landonhotel.com");
    UPDATE customers SET email = "tjenkins@landonhotel.com" WHERE customer_id = 1;
    DELETE FROM customers WHERE customer_id=26;


## Sources:
- [Programming Foundations: Databases](https://www.linkedin.com/learning/programming-foundations-databases-2) by Scott Simpson (LinkedIn Learning)
- [SQL | DDL, DQL, DML, DCL and TCL Commands](https://www.geeksforgeeks.org/sql-ddl-dql-dml-dcl-tcl-commands/) GeeksforGeeks article
- [Node.js ORMs and why you shouldn’t use them](https://blog.logrocket.com/why-you-should-avoid-orms-with-examples-in-node-js-e0baab73fa5/) by Thomas Hunter on LogRocket
