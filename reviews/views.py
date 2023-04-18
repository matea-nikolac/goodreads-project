from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from .models import Review
from .serializers.common import ReviewSerializer
from .serializers.populated import PopulatedReviewSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly

from lib.exceptions import exceptions

class ReviewListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    #GET ALL REVIVEWS
    # Endpoint: GET /api/reviews/
    @exceptions
    def get(self, request):
      reviews = Review.objects.all()
      serialized_review = PopulatedReviewSerializer(reviews, many = True)
      return Response(serialized_review.data)
    
    #CREATE REVIEW
    #Endpoint: POST /api/reviews/
    @exceptions
    def post(self, request):
        review_to_create = ReviewSerializer(data = {**request.data, 'owner': request.user.id})
        review_to_create.is_valid(raise_exception = True)
        review_to_create.save()
        return Response(review_to_create.data, status.HTTP_201_CREATED)


class ReviewDetailView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly,)

    # DELETE REVIEW
    # Endpoint: DELETE /api/reviews/:pk
  @exceptions
  def delete(self, request, pk):
    review_to_delete = Review.objects.get(pk=pk)
    if review_to_delete.owner != request.user and not request.user.is_staff:
      raise PermissionDenied()
    review_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

  @exceptions
  def get(self, request, pk):
      review = Review.objects.get(pk=pk)
      serialized_review= ReviewSerializer(review)
      return Response(serialized_review.data)
  
  @exceptions
  def put(self, request, pk):
        review= Review.objects.get(pk=pk)
        print(review)
        serialized_review = ReviewSerializer(review, request.data, partial=True)
        serialized_review.is_valid(raise_exception=True)
        serialized_review.save()
        return Response(serialized_review.data)
