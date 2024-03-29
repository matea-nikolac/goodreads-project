# Generated by Django 4.2 on 2023-04-21 21:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0003_remove_book_status'),
        ('users', '0008_remove_user_books_added_user_read_user_reading_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='read',
            field=models.ManyToManyField(blank=True, related_name='read', to='books.book'),
        ),
        migrations.AlterField(
            model_name='user',
            name='reading',
            field=models.ManyToManyField(blank=True, related_name='reading', to='books.book'),
        ),
        migrations.AlterField(
            model_name='user',
            name='wishlist',
            field=models.ManyToManyField(blank=True, related_name='wishlist', to='books.book'),
        ),
    ]
