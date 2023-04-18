from .common import ReviewSerializer
from books.serializers.common import BookSerializer
from users.serializers.common import UserSerializer

class PopulatedReviewSerializer(ReviewSerializer):
    book = BookSerializer()
    owner = UserSerializer()

