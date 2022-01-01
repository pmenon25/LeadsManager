from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Lead
from .forms import LeadForm
from django.views.decorators.csrf import csrf_exempt

# XXX: Remove CSRF exemption
@csrf_exempt
@api_view(('POST',))
def add_lead(request):
    form = LeadForm(request.data)
    if form.is_valid():
        form.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(form.errors,status = status.HTTP_400_BAD_REQUEST)

@api_view(('GET',))
def view_leads(request):
    leads = Lead.objects.all()
    form =  LeadForm(request.query.params)
    return Response(form.data)