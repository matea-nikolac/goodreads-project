from .common import UserSerializer
from books.serializers.common import BookSerializer

class PopulatedUserSerializer(UserSerializer):
    books_added = BookSerializer(many=True)