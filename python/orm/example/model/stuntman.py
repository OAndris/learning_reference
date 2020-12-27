"""
This class has a One-to-One relationship with the "Actor" class.

The "actor" property references an instance of Actor and that this actor will get a property called "stuntman" that is not a list (uselist=False).
That is, whenever we load an instance of Stuntman, SQLAlchemy will also load and populate the Actor associated with this stuntman.

Note the only difference between defining a One-to-One and a Many-to-One relationship:
- 1:N --> actor = relationship("Actor", backref="stuntman")
- 1:1 --> actor = relationship("Actor", backref=backref("stuntman", uselist=False))
"""

from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship, backref

from base import Base


class Stuntman(Base):
    __tablename__ = 'stuntmen'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    active = Column(Boolean)
    actor_id = Column(Integer, ForeignKey('actors.id'))
    actor = relationship("Actor", backref=backref("stuntman", uselist=False))

    def __init__(self, name, active, actor):
        self.name = name
        self.active = active
        self.actor = actor

    def __repr__(self):
        return f"{type(self)} {self.name}, {self.active}, {self.actor.name}"
