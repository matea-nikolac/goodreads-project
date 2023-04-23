from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import URLValidator

# Create your models here.
class User(AbstractUser):
    email = models.CharField(max_length=50)
    profile_image = models.URLField(validators=[URLValidator()], blank=True)
    # books_added = models.ManyToManyField('books.Book',related_name='books_added')
    read = models.ManyToManyField('books.Book',related_name='read', blank=True)
    reading = models.ManyToManyField('books.Book',related_name='reading', blank=True)
    wishlist = models.ManyToManyField('books.Book',related_name='wishlist', blank=True)