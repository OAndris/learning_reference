from sqlalchemy import create_engine, Column, Integer, String, Boolean, Numeric, Table, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship


engine = create_engine('postgresql://usr:pass@localhost:5432/sqlalchemy')
Base = declarative_base()


# One to Many (an instance of the Article class could be associated with many instances of the Comment class):
class Article(Base):
    __tablename__ = 'articles'
    id = Column(Integer, primary_key=True)
    comments = relationship("Comment")

class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True)
    article_id = Column(Integer, ForeignKey('articles.id'))


# Many to One (many tires belong to one car and this car contains many tires):
class Tire(Base):
    __tablename__ = 'tires'
    id = Column(Integer, primary_key=True)
    car_id = Column(Integer, ForeignKey('cars.id'))
    car = relationship("Car")

class Car(Base):
    __tablename__ = 'cars'
    id = Column(Integer, primary_key=True)


# One to One (one person possesses one mobile phone and this mobile phone belongs to this person only):
class Person(Base):
    __tablename__ = 'people'
    id = Column(Integer, primary_key=True)
    mobile_phone = relationship("MobilePhone", uselist=False, back_populates="person")  # uselist=False marks that mobile_phone will hold only a single instance

class MobilePhone(Base):
    __tablename__ = 'mobile_phones'
    id = Column(Integer, primary_key=True)
    person_id = Column(Integer, ForeignKey('people.id'))
    person = relationship("Person", back_populates="mobile_phone")  # back_populates="mobile_phone" marks that the other side of the mapping should be populated


# Many to Many (many students can participate in many classes):
students_classes_association = Table('students_classes', Base.metadata,
    Column('student_id', Integer, ForeignKey('students.id')),
    Column('class_id', Integer, ForeignKey('classes.id'))
)

class Student(Base):
    __tablename__ = 'students'
    id = Column(Integer, primary_key=True)
    classes = relationship("Class", secondary=students_classes_association)  # make SQLAlchemy aware of the helper table (that is required for many-to-many relationships)

class Class(Base):
    __tablename__ = 'classes'
    id = Column(Integer, primary_key=True)
