from django.db import models

# Create your models here.
class Book(models.Model):
    book_cover = models.URLField()
    title = models.CharField(max_length = 255)
    author = models.CharField(max_length = 255)
    summary = models.TextField()
    genre = models.CharField(max_length = 255)
    pages = models.PositiveBigIntegerField()
    status_choices = (
        ('read', 'Read'),
        ('reading', 'Reading'),
        ('wishlist', 'Wishlist'),
        ('none', 'None')
    )
    status = models.CharField(max_length=10, choices=status_choices)

    def __str__(self):
        return f'{self.title} - {self.author}'
