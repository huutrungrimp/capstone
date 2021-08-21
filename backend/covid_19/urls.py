from django.urls import path
from . import views

app_name='covid_19'
urlpatterns = [
    path('', views.index, name='index'),
    path('stats', views.stats_view, name='stats'),
    path('maps/<str:health>/', views.viewMap, name='time_series'),
    path('<str:country_name>/<str:health>/', views.daily_covid_by_country, name='daily'),
    path('graphs/<str:vac>/<str:countryName>/', views.vacinationGraph, name='vacination'),
    path('vacinationMap', views.vacinationMap, name='vacinationMap'),
]