from django.urls import path
from . import views

urlpatterns = [
    path("api/add/", views.add_lead),
    path("api/", views.get_all_leads),
    path("api/<int:id>/", views.get_lead_by_id),
    path("api/<int:id>/update/", views.update_lead),
    path("api/<int:id>/delete/", views.delete_lead),
]
