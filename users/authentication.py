from rest_framework.authentication import BaseAuthentication
import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
User = get_user_model()

class JWTAuthentication(BaseAuthentication):

    # override default authentication by defining an authenticate method
    def authenticate(self, request):
        # 1. Check headers are present, return None if not
        if not request.headers:
            return None
        
        auth_header = request.headers.get('Authorization')
        # 2. Check Authorization header is on the request
        if not auth_header:
            return None
        # 3. Make sure the Authorization header is a Bearer token
        if not auth_header.startswith('Bearer'):
            return None
        # 4. If Bearer, remove the Bearer part of the string leaving just the token
        token = auth_header.replace('Bearer ', '')
        try:
            # 5. Decode the plain token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
            # 6. Query the user model using the sub if the token is valid
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidSignatureError as e:
            print(e.__class__.__name__)
            print(e)
            return None
        except User.DoesNotExist as e:
            print(e.__class__.__name__)
            print(e)
            return None
        
        # 7. If the user is found, pass it back with the token as part of the two-tuple
        return (user, token)