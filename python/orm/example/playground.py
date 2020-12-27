from datetime import date

from model.actor import Actor
from model.contact_details import ContactDetails
from model.movie import Movie
from model.stuntman import Stuntman


matt_damon = Actor("Matt Damon", date(1970, 10, 8))
print(matt_damon)

bourne_identity = Movie("The Bourne Identity", date(2002, 10, 11))
print(bourne_identity)

matt_contact = ContactDetails("415 555 2671", "Burbank, CA", matt_damon)
print(matt_contact)

matt_stuntman = Stuntman("John Doe", True, matt_damon)
print(matt_stuntman)
