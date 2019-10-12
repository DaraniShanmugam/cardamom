from django.db import models
from django.contrib.auth.models import User
import uuid

class TicketCollection(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255, default='Untitled Collection')
    manager = models.ForeignKey(User, models.CASCADE)


class Ticket(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    TICKET_TYPES = (
        ('BUG', 'Bug'),
        ('FEATURE', 'Feature'),
        ('MAINTENANCE', 'Maintenance')
    )

    PRIORITIES = (
        (1, 'VERY LOW'),
        (2, 'LOW'),
        (3, 'MEDIUM'),
        (4, 'HIGH'),
        (5, 'URGENT'),
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    priority = models.IntegerField(choices=PRIORITIES, default=3)
    due_date = models.DateTimeField()
    created = models.DateTimeField(auto_now_add=True)

    started = models.BooleanField(default=False, null=True, blank=True)
    done = models.BooleanField(default=False, null=True, blank=True)
    category = models.CharField(choices=TICKET_TYPES, max_length=32)

    assigned_by = models.ForeignKey(User, models.CASCADE, related_name='tickets_created')
    assigned_to = models.ForeignKey(User, models.CASCADE, related_name='tickets_assigned_to')

    collection = models.ForeignKey(TicketCollection, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, default=None)
    

    def __str__(self):
        return '[{}] (Priority {}) {}'.format(self.category, self.priority, self.title)