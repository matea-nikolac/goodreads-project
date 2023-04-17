from django.contrib import admin
from django.urls import path, include
from .views import BookListView, BookDetailView


# /api/oceans/:id

urlpatterns = [
    path('', BookListView.as_view()),
    path('<int:pk>/', BookDetailView.as_view())
]
