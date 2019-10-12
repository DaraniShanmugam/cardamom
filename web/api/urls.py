"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
from django.shortcuts import Http404
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static, serve
from rest_framework.schemas import get_schema_view
from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

def serve_build_files(request):
    # print(request.build_absolute_uri('?'))
    path = request.path.lstrip('/')
    if '?' in path:
        path = path[:path.find('?')]
    
    if path is None or path == '':
        path = 'index.html'
    full_path = os.path.join(os.path.join(settings.BASE_DIR, 'build'), path)
    print(full_path)
    if os.path.exists(full_path):
        return serve(request, path, document_root=os.path.dirname(full_path))
    return serve(request, 'index.html', document_root=os.path.dirname(full_path))

schema_view = get_schema_view(
   openapi.Info(
      title="Cardamom Ticketing API",
      default_version='v1',
      description="Test description",
    #   terms_of_service="https://www.google.com/policies/terms/",
    #   contact=openapi.Contact(email="contact@snippets.local"),
   ),
   public=True,
   permission_classes=(AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/ticket/', include('ticket.urls')),
    path('api/v1/account/', include('account.urls')),
    path('webpush/', include('webpush.urls')),    # path('docs/', get_swagger_view('Cardamom Ticketing System')),
    path('serviceworker/', include('serviceworker.urls')),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    # path('docs/', get_schema_view(
    #     title="Your Project",
    #     description="API for all things …",
    #     version="1.0.0",
    #     permission_classes=(AllowAny,)
    # ), name='openapi-schema',),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += [re_path('^', serve_build_files)]