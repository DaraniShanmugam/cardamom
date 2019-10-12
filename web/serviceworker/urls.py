from django.urls import path
from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView
from . import views


APPNAME = 'serviceworker'

urlpatterns = [
    path('sw.js', TemplateView.as_view(template_name='dummy/sw.js', content_type='application/x-javascript')),
]