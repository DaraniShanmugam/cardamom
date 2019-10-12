from django.forms import ModelForm, fields
from .models import TicketCollection, Ticket


class CreateTicketCollectionForm(ModelForm):
    class Meta:
        model = TicketCollection
        exclude = ('id', 'manager')


class CreateTicketForm(ModelForm):
    class Meta:
        model = Ticket
        exclude = ('id', 'created', 'assigned_by')