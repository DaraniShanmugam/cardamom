from django.contrib import admin
from .models import Ticket, TicketCollection

admin.site.register([TicketCollection, Ticket])
