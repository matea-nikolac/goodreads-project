from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers.common import BookSerializer  
# from .serializers.populated import PopulatedBookerializer
from .models import Book # used to query the data
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

# Create your views here.

from lib.exceptions import exceptions
class BookListView(APIView):
    # permission_classes = (IsAuthenticatedOrReadOnly,)

    @exceptions
    def get(self, request):
        books = Book.objects.all()
        serialized_books = BookSerializer(books, many=True)
        return Response(serialized_books.data)
    
    @exceptions
    def post(self, request):
        book = BookSerializer(data = request.data)
        book.is_valid(raise_exception=True)
        book.save()
        return Response(book.data, status.HTTP_201_CREATED)
    
# View is for /api/books/:pk
class BookDetailView(APIView):
    # permission_classes = (IsAuthenticated,)

    @exceptions
    def get(self, request, pk):
        book = Book.objects.get(pk=pk)
        serialized_book = BookSerializer(book)
        return Response(serialized_book.data)
    
    @exceptions
    def put(self, request, pk):
        book= Book.objects.get(pk=pk)
        serialized_book = BookSerializer(book, request.data, partial=True)
        serialized_book.is_valid(raise_exception=True)
        serialized_book.save()
        return Response(serialized_book.data)
    
    @exceptions
    def delete(self, request, pk):
        book = Book.objects.get(pk=pk)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)