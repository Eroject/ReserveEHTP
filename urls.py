# user_data/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('user_data/', views.receive_data, name='receive_data'),
]
