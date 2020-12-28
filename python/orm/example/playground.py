from datetime import date

from base import Session, engine, Base
from model.actor import Actor
from model.contact_details import ContactDetails
from model.movie import Movie
from model.stuntman import Stuntman


def print_models():
    matt_damon = Actor("Matt Damon", date(1970, 10, 8))
    print(matt_damon)

    matt_contact = ContactDetails("415 555 2671", "Burbank, CA", matt_damon)
    print(matt_contact)

    bourne_identity = Movie("The Bourne Identity", date(2002, 10, 11))
    print(bourne_identity)

    matt_stuntman = Stuntman("John Doe", True, matt_damon)
    print(matt_stuntman)


def drop_schema():
    Base.metadata.drop_all(engine)


def create_schema():
    # Generate database schema (based on the declarations that we made while creating the four main classes)
    Base.metadata.create_all(engine)


def insert_records():
    # (1 - imports)
    # (2 - generate database schema)

    # 3 - create a new session (from the session factory)
    session = Session()

    # 4 - create movies
    bourne_identity = Movie("The Bourne Identity", date(2002, 10, 11))
    furious_7 = Movie("Furious 7", date(2015, 4, 2))
    pain_and_gain = Movie("Pain & Gain", date(2013, 8, 23))

    # 5 - creates actors
    matt_damon = Actor("Matt Damon", date(1970, 10, 8))
    dwayne_johnson = Actor("Dwayne Johnson", date(1972, 5, 2))
    mark_wahlberg = Actor("Mark Wahlberg", date(1971, 6, 5))

    # 6 - add actors to movies
    bourne_identity.actors = [matt_damon]
    furious_7.actors = [dwayne_johnson]
    pain_and_gain.actors = [dwayne_johnson, mark_wahlberg]

    # 7 - add contact details to actors (the last parameter defines the actor that the ContactDetails instance is associated to)
    matt_contact = ContactDetails("415 555 2671", "Burbank, CA", matt_damon)
    dwayne_contact = ContactDetails("423 555 5623", "Glendale, CA", dwayne_johnson)
    dwayne_contact_2 = ContactDetails("421 444 2323", "West Hollywood, CA", dwayne_johnson)
    mark_contact = ContactDetails("421 333 9428", "Glendale, CA", mark_wahlberg)

    # 8 - create stuntmen
    matt_stuntman = Stuntman("John Doe", True, matt_damon)
    dwayne_stuntman = Stuntman("John Roe", True, dwayne_johnson)
    mark_stuntman = Stuntman("Richard Roe", True, mark_wahlberg)

    # 9 - persists data (save the movies, actors, contact details, and stuntment)
    # (note that actors don't need to be explicitly saved, because SQLAlchemy, by default, uses the 'save-update' cascade strategy)
    session.add(bourne_identity)
    session.add(furious_7)
    session.add(pain_and_gain)

    session.add(matt_contact)
    session.add(dwayne_contact)
    session.add(dwayne_contact_2)
    session.add(mark_contact)

    session.add(matt_stuntman)
    session.add(dwayne_stuntman)
    session.add(mark_stuntman)

    # 10 - commit and close session
    session.commit()
    session.close()


def query_data():
    """
    Steps:
    1) Extract a session (from the session factory)
    2) From the session, extract a Query Object associated to a mapped class
    3) Use the Query Object's methods for querying
    -----
    The Query API provides dozens of useful functions, such as:
    - count(): Returns the total number of rows of a query.
    - filter(): Filters the query by applying a criteria.
    - delete(): Removes from the database the rows matched by a query.
    - distinct(): Applies a distinct statement to a query.
    - exists(): Adds an exists operator to a subquery.
    - first(): Returns the first row in a query.
    - get(): Returns the row referenced by the primary key parameter passed as argument.
    - join(): Creates a SQL join in a query.
    - limit(): Limits the number of rows returned by a query.
    - order_by(): Sets an order in the rows returned by a query.
    """

    session = Session()

    print('All movies:')
    movies = session.query(Movie).all()
    for movie in movies:
        print(f'{movie.id} - {movie.title} was released on {movie.release_date}')
    print('')

    print('Movies released since 15-01-01:')
    # movies = session.query(Movie).filter(Movie.release_date >= date(2015, 1, 1)).all()
    movies = (session.query(Movie)
        .filter(Movie.release_date >= date(2015, 1, 1))
        .all()
    )
    for movie in movies:
        print(f'{movie.id} - {movie.title} was released since 2015 (on {movie.release_date})')
    print('')

    print('Movies that Dwayne Johnson participated:')
    movies = (session.query(Movie)
        .join(Actor, Movie.actors)
        .filter(Actor.name == 'Dwayne Johnson')
        .all()
    )
    for movie in movies:
        print(f'{movie.id} - {movie.title}')
    print('')

    print('Actors having a house in Glendale:')
    actors_from_glendale = (session.query(Actor)
        .join(ContactDetails)
        .filter(ContactDetails.address.ilike('%glendale%'))
        .all()
    )
    for actor in actors_from_glendale:
        print(f'{actor.id} - {actor.name}')


def query_metadata():
    session = Session()
    for mapped_class in (Actor, ContactDetails, Movie, Stuntman):
        print(f'There are {session.query(mapped_class).count()} record(s) in {mapped_class.__tablename__}')





if __name__ == '__main__':
    # print_models()
    # drop_schema()
    # create_schema()
    # insert_records()
    # query_data()
    query_metadata()
