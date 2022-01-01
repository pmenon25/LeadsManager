from django.urls import path
from . import views

urlpatterns = [
    path('api/add/', views.add_lead),
    path('api/', views.view_leads),
]