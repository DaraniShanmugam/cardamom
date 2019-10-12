from django.apps import AppConfig
from django.db.models.signals import post_migrate


class AccountConfig(AppConfig):
    name = 'account'

    def ready(self):
        post_migrate.connect(self.create_groups, sender=self)

    def create_groups(self, **kwargs):
        from django.contrib.auth.models import Group
        print('Creating group `Manager`')
        manager_group, created = Group.objects.get_or_create(name='Manager')
