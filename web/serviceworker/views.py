from django.shortcuts import render, HttpResponse
from django.conf import settings
# Create your views here.

def index(request):
    webpush_settings = getattr(settings, 'WEBPUSH_SETTINGS', {})
    vapid_key = webpush_settings.get('VAPID_PUBLIC_KEY')
    user = request.user
    print('Userrrrrrr', user)
    return render(request, 'dummy/index.html', {'user': user, 'vapid_key':vapid_key})