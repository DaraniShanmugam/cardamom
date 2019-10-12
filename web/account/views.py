from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework.views import status
from rest_framework import generics
from rest_framework_jwt.settings import api_settings
from rest_framework import permissions
from django.db.utils import IntegrityError
from django.core.exceptions import ValidationError
from django.db.models import Q
from drf_yasg.utils import swagger_auto_schema
from .serializers import TokenSerializer, UserLoginSerializer, UserRegisterSuccessSerializer, UserSerializer
from .permissions import IsManager


jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class LoginView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)

    queryset = User.objects.all()
    serializer_class = UserLoginSerializer

    @swagger_auto_schema(responses={
        200: TokenSerializer,
        401: 'Unauthorized'
    })
    def post(self, request, *args, **kwargs):
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            serializer = TokenSerializer(data={
                'token': jwt_encode_handler(
                    jwt_payload_handler(user)
                ),
                'id': user.id,
                'is_manager': len(user.groups.filter(name='Manager')) > 0})
            serializer.is_valid()
            return Response(serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class RegisterView(generics.CreateAPIView):
    permission_classes = (IsManager,)

    queryset = User.objects.all()
    serializer_class = UserLoginSerializer

    @swagger_auto_schema(responses={
        201: UserSerializer,
        400: UserRegisterSuccessSerializer
    })
    def post(self, request, *args, **kwargs):
        '''
            Create new user. Only managers can create users.
        '''
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        confirm_password = request.data.get("confirm_password", "")

        out_status = status.HTTP_400_BAD_REQUEST
        out_data = {'success': False, 'message': ''}
        if '' in [username, password, confirm_password]:
            out_data['message'] = 'ALL_FIELDS_REQUIRED'

        elif password != confirm_password:
            out_data['message'] = 'PASSWORD_MISMATCH'

        else:
            user = User(username=username)
            user.set_password(password)

            try:
                # validate_password(password, user)
                user.save()

                # out_data['message'] = 'USER_CREATED'
                # out_data['success'] = True
                out_status = status.HTTP_201_CREATED

                serializer = UserSerializer(instance=user)
                return Response(serializer.data, out_status)


            except IntegrityError as e:
                
                out_data['message'] = 'USERNAME_EXISTS'
                
            except ValidationError as e:
                out_data['message'] = 'VALIDATION_ERROR',
                out_data['details'] = e.messages

            except:
                import traceback
                traceback.print_exc()
                out_data['message'] = 'UNKNOWN_EXCEPTION'

        serializer = UserRegisterSuccessSerializer(data=out_data)
        serializer.is_valid()
        return Response(serializer.data, out_status)


class UserListView(generics.ListAPIView):
    pagination_class = None
    permission_classes = (IsManager,)
    serializer_class = UserSerializer
    queryset = User.objects.filter(~Q(groups__name='Manager'))
