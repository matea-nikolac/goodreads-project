from .common import BookSerializer
from reviews.serializers.common import ReviewSerializer
from users.serializers.common import UserSerializer

class PopulatedBookSerializer(BookSerializer):
    reviews = ReviewSerializer(many=True)
    added_by = UserSerializer(many=True)
