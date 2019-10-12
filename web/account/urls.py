from django.urls import path
from . import views


APPNAME = 'account'

urlpatterns = [
    path('login', views.LoginView.as_view(), name='login'),
    path('create', views.RegisterView.as_view(), name='register'),
    path('users', views.UserListView.as_view(), name='list'),
]