# Generated by Django 2.2.6 on 2019-10-10 05:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('priority', models.IntegerField(choices=[(1, 'VERY LOW'), (2, 'LOW'), (3, 'MEDIUM'), (4, 'HIGH'), (5, 'URGENT')], default=3)),
                ('due_date', models.DateTimeField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('done', models.BooleanField(blank=True, default=False, null=True)),
                ('category', models.CharField(choices=[('BG', 'BUG'), ('FT', 'FEATURE'), ('MT', 'MAINTENANCE')], max_length=2)),
                ('assigned_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tickets_created', to=settings.AUTH_USER_MODEL)),
                ('assigned_to', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tickets_assigned_to', to=settings.AUTH_USER_MODEL)),
                ('parent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ticket.Ticket')),
            ],
        ),
    ]