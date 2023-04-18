from django.db import models

# Create your models here.
class Review(models.Model):
    owner = models.ForeignKey(
      'users.User',
      on_delete = models.CASCADE,
      related_name = 'reviews'
    )
    book = models.ForeignKey(
        'books.Book',
        on_delete=models.CASCADE,
        related_name = 'reviews',
        default = 1
    )
    text = models.TextField(max_length=500)


