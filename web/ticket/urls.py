from django.urls import path
from . import views


APPNAME = 'ticket'

urlpatterns = [
    path('', views.TicketListCreateView.as_view(), name='ticket-list'),
    path('collections', views.TicketCollectionListCreateView.as_view(), name='ticket-collections-list'),
    path('<pk>', views.TicketDetailUpdateView.as_view(), name='ticket-detail'),
]