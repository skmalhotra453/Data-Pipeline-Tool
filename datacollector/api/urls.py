from django.urls import path
from . import views

urlpatterns = [
    path('data-collect/<str:source>/', views.data_collect, name='data_collect'),
    path('visualization/', views.data_visualization, name='data_visualization'),
]
