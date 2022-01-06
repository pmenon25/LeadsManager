from django.urls import path
from . import views

urlpatterns = [
    path("lead/add/", views.add_lead),
    path("lead/", views.get_all_leads),
    path("lead/<int:id>/", views.get_lead_by_id),
    path("lead/<int:id>/update/", views.update_lead),
    path("lead/<int:id>/delete/", views.delete_lead),
]