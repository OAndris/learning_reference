# Source: https://www.linkedin.com/learning/python-essential-training-2/python-database-api

import sqlite3

def main():
    """
    The Python DB API can be used for simple tasks. For anything more serious, use a more robust class, module, or library.
    The Python DB API is a consolidated interface for a number of database systems - it works with many of them, but it won't be exactly the same for them all.
    Python ships with SQL Lite.
    The typical sequence of commands is to 1) Connect --> 2) Get a cursor --> 3) Execute a command --> 4) Process the results
    """

    print('Connect')
    db = sqlite3.connect('simple_sqlite.db')
    cur = db.cursor()

    print('Create')
    cur.execute('DROP TABLE IF EXISTS test')
    cur.execute('CREATE TABLE test (id INTEGER PRIMARY KEY, string TEXT, number INTEGER)')
    
    print('Insert row')
    cur.execute("INSERT INTO test (string, number) VALUES ('one', 1)")
    print('Insert row')
    cur.execute("INSERT INTO test (string, number) VALUES ('two', 2)")
    print('Insert row')
    cur.execute("INSERT INTO test (string, number) VALUES ('three', 3)")
    
    print('Commit')
    db.commit()
    
    print('Count')
    cur.execute('SELECT COUNT(*) FROM test')
    print(f'There are {cur.fetchone()[0]} rows in the table')
    
    print('Read')
    for row in cur.execute('SELECT * FROM test'):
        print(row)
    
    # print('Drop')
    # cur.execute('DROP TABLE test')
    
    print('Close')
    db.close()

if __name__ == '__main__':
    main()
