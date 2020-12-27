from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# create an engine
engine = create_engine('postgresql://usr:pass@localhost:5432/sqlalchemy')

# create a configured "Session" class (a session factory that is bound to the SQLAlchemy engine, and can be used for creating sessions)
Session = sessionmaker(bind=engine)

# create a Session
session = Session()
