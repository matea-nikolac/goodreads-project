from django.contrib import admin
from django.contrib.auth import get_user_model

# get_user_model() returns back the Authentication Model that is currently in use
# If we change this at a later date, we won't need to change this code as it will update accordingly
User = get_user_model()

# Register your models here.
admin.site.register(User)