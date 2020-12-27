from sqlalchemy import create_engine, Column, Integer, String, Boolean, Numeric
from sqlalchemy.ext.declarative import declarative_base


engine = create_engine('postgresql://usr:pass@localhost:5432/sqlalchemy')
Base = declarative_base()


class Product(Base):
    __tablename__ = 'products'
    
    id = Column(Integer, primary_key=True)
    title = Column('title', String(32))
    in_stock = Column('in_stock', Boolean)
    quantity = Column('quantity', Integer)
    price = Column('price', Numeric)
