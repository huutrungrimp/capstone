from django.contrib import admin
from django.urls import path, include
# from django.conf.urls import include
from rest_framework.authtoken import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('covid19/', include('covid_19.urls')),
    path('posts/', include('posts.urls')),
    path('api/token/', views.obtain_auth_token),
]
