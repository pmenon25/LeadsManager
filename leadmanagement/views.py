from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Lead
from .serializers import *
from django.views.decorators.csrf import csrf_exempt

# XXX: Remove CSRF exemption
@csrf_exempt
@api_view(("POST",))
def add_lead(request):
    form = LeadSerializer(data=request.data)
    if form.is_valid():
        form.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(("GET",))
def get_all_leads(request):
    leads = Lead.objects.all()
    serializer = LeadSerializer(leads, many=True)
    return Response(serializer.data)


@api_view(("GET",))
def get_lead_by_id(request, id):
    leads = Lead.objects.get(id=id)
    serializer = LeadSerializer(leads)
    return Response(serializer.data)


@api_view(("PUT",))
def update_lead(request, id):
    try:
        lead = Lead.objects.get(id=id)
        serializers = LeadSerializer(lead, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    except Lead.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(("DELETE",))
def delete_lead(request, id):
    try:
        lead = Lead.objects.get(id=id)
        lead.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Lead.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)