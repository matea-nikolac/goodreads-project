from django.urls import path
from .views import ReviewListView, ReviewDetailView

urlpatterns = [
    path('', ReviewListView.as_view()),
    path('<int:pk>/', ReviewDetailView.as_view())
]