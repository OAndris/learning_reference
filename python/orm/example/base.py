import json
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


# Database connection info (https://docs.sqlalchemy.org/en/13/core/engines.html):
# NOTE: if 'driver' is not specified, the default DBAPI will be used (for the 'postgresql' dialect, it is the 'psycopg2' driver)
with open('settings/database.json') as f:
    database_connection_info = json.load(f)

db_url = (
    '{dialect}://{username}:{password}@{host}:{port}/{database}'.format(**database_connection_info)
        if not database_connection_info['driver'] else
    '{dialect}+{driver}://{username}:{password}@{host}:{port}/{database}'.format(**database_connection_info)
)

# Create a SQLAlchemy Engine that will interact with the database:
engine = create_engine(db_url)

# Create a SQLAlchemy ORM sessin factory bound to the engine:
Session = sessionmaker(bind=engine)

# Create a base class for our class definitions:
Base = declarative_base()
