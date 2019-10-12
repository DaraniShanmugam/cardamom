from rest_framework import serializers
from django.contrib.auth.models import User

class TokenSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=255)
    is_manager = serializers.BooleanField()
    id = serializers.IntegerField()


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=255)

class UserRegisterSuccessSerializer(serializers.Serializer):
    success = serializers.BooleanField()
    message = serializers.CharField(max_length=255)
    details = serializers.ListField(allow_empty=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')