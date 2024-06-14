from django.urls import path
from .views import collect_data

urlpatterns = [
    path('collect/<str:source>/', collect_data)
]
