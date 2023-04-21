from .common import UserSerializer
from books.serializers.common import BookSerializer

class PopulatedUserSerializer(UserSerializer):
    read = BookSerializer(many=True)
    reading = BookSerializer(many=True)
    wishlist = BookSerializer(many=True)