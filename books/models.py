from django.db import models

# Create your models here.
class Book(models.Model):
    book_cover = models.URLField()
    title = models.CharField(max_length = 255)
    author = models.CharField(max_length = 255)
    summary = models.TextField()
    genre = models.CharField(max_length = 255)
    pages = models.PositiveBigIntegerField()

    def __str__(self):
        return f'{self.title} - {self.author}'
