from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers.common import UserSerializer, UserBookSerializer
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
import jwt
from datetime import datetime, timedelta
from django.conf import settings

from lib.exceptions import exceptions

from django.contrib.auth import get_user_model
User = get_user_model()

class RegisterView(APIView):

    # REGISTER ROUTE
    # Endpoint: POST /api/auth/register/
    @exceptions
    def post(self, request):
        user_to_add = UserSerializer(data=request.data)
        user_to_add.is_valid(raise_exception=True)
        user_to_add.save()
        return Response(user_to_add.data, status.HTTP_201_CREATED)
    

class LoginView(APIView):

    # LOGIN ROUTE
    # Endpoint: POST /api/auth/login/
    @exceptions
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user_to_login = User.objects.get(email=email)
        if not user_to_login.check_password(password):
            print('PASSWORDS DONT MATCH')
            raise PermissionDenied('Unauthorized')
    
        dt = datetime.now() + timedelta(days=7)

        token = jwt.encode({ 'sub':  user_to_login.id, 'exp': int(dt.strftime('%s')) }, settings.SECRET_KEY, algorithm='HS256')
        print('TOKEN ->', token)
        
        return Response({ 'message': f"Welcome back, {user_to_login.username}", 'token': token })
    
class UserListView(APIView):
    
  @exceptions
  def get(self, request):
    users = User.objects.all()
    serialized_users = UserSerializer(users, many=True)
    return Response(serialized_users.data)
  

class UserDetailView(APIView):

  @exceptions
  def get(self, request, pk):
      user = User.objects.get(pk=pk)
      serialized_user = UserSerializer(user)
      return Response(serialized_user.data)
  
  @exceptions
  def put(self, request, pk):
      user= User.objects.get(pk=pk)

      # copy the original read, reading and wishlist fields
      original_read = list(user.read.all())
      original_reading = list(user.reading.all())
      original_wishlist = list(user.wishlist.all())
      # original_read_ids = [book.id for book in original_read]
      # print(original_read_ids)

      # print('READ', list(user.read.values_list('id', flat=True)))
      # print('REQ DATA --> KEYS: ', list(request.data.keys())[0])
      # print('REQ DATA --> VALUES: ', list(request.data.values())[0])

      # serializing
      
      serialized_user = UserBookSerializer(user, request.data, partial=True)
      serialized_user.is_valid(raise_exception=True)
      serialized_user.save()

      # get the read, reading and wishlist fields
      updated_read = serialized_user.validated_data.get('read', [])
      updated_reading = serialized_user.validated_data.get('reading', [])
      updated_wishlist = serialized_user.validated_data.get('wishlist', [])


      # update the read, reading and wishlist fields with the updated values
      if updated_read:
        user.read.set(original_read + updated_read)
      if updated_reading:
        user.read.set(original_reading + updated_reading)
      if updated_wishlist:
        user.read.set(original_wishlist + updated_wishlist)

      return Response(serialized_user.data)
  