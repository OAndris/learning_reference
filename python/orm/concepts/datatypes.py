"""
https://www.tutorialspoint.com/sqlalchemy/sqlalchemy_core_creating_table.htm
"""

# from sqlalchemy import create_engine, MetaData, Table, Column, BigInteger, Boolean, Date, DateTime, Float, Integer, Numeric, SmallInteger, String, Text, Time
import sqlalchemy as sa

engine = sa.create_engine('postgresql://usr:pass@localhost:5432/sqlalchemy')

meta = sa.MetaData()
users_table = sa.Table('a_test_test', meta,
    sa.Column('id', sa.Integer, primary_key=True),
    sa.Column('BigInteger', sa.BigInteger),
    sa.Column('Boolean', sa.Boolean),
    sa.Column('Date', sa.Date),
    sa.Column('DateTime',sa. DateTime),
    sa.Column('Float', sa.Float),
    sa.Column('Integer', sa.Integer),
    sa.Column('Numeric', sa.Numeric),
    sa.Column('SmallInteger', sa.SmallInteger),
    sa.Column('String(50)', sa.String(50)),
    sa.Column('Text', sa.Text),
    sa.Column('Time', sa.Time),
)
meta.create_all(engine)  # Creates the table
