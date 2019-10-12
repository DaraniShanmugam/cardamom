from rest_framework import serializers
from .models import TicketCollection, Ticket
from account.serializers import UserSerializer


class TicketCollectionMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketCollection
        fields = ('id', 'title')


class TicketCollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketCollection
        fields = '__all__'


class TicketCollectionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketCollection
        fields = ('title', )


class TicketMiniSerializer(serializers.ModelSerializer):
    collection = TicketCollectionMiniSerializer()
    assigned_by = UserSerializer()

    class Meta:
        model = Ticket
        exclude = ('description', 'created', 'parent', 'assigned_to')


class TicketSerializer(serializers.ModelSerializer):
    collection = TicketCollectionMiniSerializer()
    assigned_by = UserSerializer()
    assigned_to = UserSerializer()

    class Meta:
        model = Ticket
        fields = '__all__'


class TicketUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('done', 'started')


class TicketCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        exclude = ('assigned_by', 'created', 'done', 'started')
