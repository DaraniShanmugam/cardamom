from uuid import UUID
from django.shortcuts import get_object_or_404
from rest_framework import generics, response, status
from django.db.models import Q
from webpush import send_user_notification
from .models import TicketCollection, Ticket
from .serializers import TicketCollectionSerializer, TicketSerializer, TicketMiniSerializer, TicketUpdateSerializer, TicketCreateSerializer, TicketCollectionCreateSerializer
from .forms import CreateTicketCollectionForm, CreateTicketForm
from account.permissions import IsManager
from .permissions import IsAssignedUser
from django.contrib.sites.models import Site
from drf_yasg.utils import swagger_auto_schema

class TicketCollectionListCreateView(generics.ListCreateAPIView):
    serializer_class = TicketCollectionSerializer
    permission_classes = (IsManager,)

    def get_queryset(self):
        return TicketCollection.objects.filter(manager=self.request.user)

    def get(self, request, *args, **kwargs):
        '''Fetch list of Collections'''
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(request_body=TicketCollectionCreateSerializer, responses={201: TicketCollectionSerializer})
    def post(self, request, *args, **kwargs):
        '''Create new Ticket collection'''
        form = CreateTicketCollectionForm(request.data)
        form.instance.manager = self.request.user
        form.save(commit=True)
        
        return response.Response(data=TicketCollectionSerializer(form.instance).data,
                                 status=status.HTTP_201_CREATED)


class TicketListCreateView(generics.ListCreateAPIView):
    serializer_class = TicketMiniSerializer

    def get_queryset(self):
        if self.request.user.groups.filter(name='Manager'):
            queryset = Ticket.objects.filter(assigned_by=self.request.user)
        else:
            queryset = Ticket.objects.filter(assigned_to=self.request.user)
            # Filter out requests with incomplete parents
            q = Q(parent__isnull=True) | Q(parent__done=True)
            queryset = queryset.filter(q)

        if self.request.GET.get('collection'):
            # Filter by collection ID
            collection_id = self.request.GET.get('collection')
            try:
                UUID(collection_id)
                queryset = queryset.filter(collection__id=collection_id)
            except ValueError:
                queryset = None

        if self.request.GET.get('status'):
            # Filter by status (Pending/Active/Done)
            ticket_status = self.request.GET.get('status')
            if ticket_status.upper() == 'PENDING':
                queryset.objects.filter(started=False, done=False)
            elif ticket_status.upper() == 'ACTIVE':
                queryset.objects.filter(started=True, done=False)
            if ticket_status.upper() == 'DONE':
                queryset.objects.filter(started=True, done=True)
            else:
                queryset = None
        return queryset

    @swagger_auto_schema(request_body=TicketCreateSerializer, responses={201: TicketMiniSerializer})
    def post(self, request, *args, **kwargs):
        '''Create new Ticket'''
        form = CreateTicketForm(request.data)
        # request.data['due_date'] = datetime.datetime.strptime(request.data.get('due_date'), '%Y-%m-%d %H:%M:%S')
        form.instance.assigned_by = self.request.user

        form.save(commit=True)

        # Send generic message since push notifs work even when token expires
        payload = {'head': 'Task Assigned', 'body': 'Check your dashboard for new task', 'url': 'http://{}'.format(Site.objects.get_current().domain)}
        try:
            print(form.instance.assigned_to.id)
            send_user_notification(form.instance.assigned_to, payload, 1500)
        except:
            import traceback
            traceback.print_exc()
            pass
        return response.Response(data=TicketMiniSerializer(form.instance).data,
                                 status=status.HTTP_201_CREATED)


class TicketDetailUpdateView(generics.RetrieveUpdateAPIView):
    # serializer_class = TicketSerializer
    permission_classes = (IsAssignedUser,)
    queryset = Ticket.objects.all()

    def get_serializer_class(self):
        if self.request and self.request.method == 'GET':
            return TicketSerializer
        return TicketUpdateSerializer

    def get_object(self):
        obj = get_object_or_404(Ticket, pk=self.kwargs.get('pk', 0))
        self.check_object_permissions(self.request, obj)
        return obj


    @swagger_auto_schema(responses={200: TicketMiniSerializer})
    def put(self, request, *args, **kwargs):
        '''Update status of a ticket'''
        obj = self.get_object()

        if request.data.get('started') and bool(request.data.get('started')):
            obj.started = True

        if request.data.get('done') and bool(request.data.get('done')):
            obj.started = True
            obj.done = True

        obj.save()
        return response.Response(data=TicketMiniSerializer(obj).data, status=status.HTTP_200_OK)

    @swagger_auto_schema(responses={200: TicketMiniSerializer})
    def patch(self, request, *args, **kwargs):
        return self.put(self, request, *args, **kwargs)
