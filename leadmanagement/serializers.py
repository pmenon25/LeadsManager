from django.db.models import fields
from rest_framework import serializers;
from .models import Lead;

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ('firstname' , 'lastname' , 'email','notes', 'created', 'updated', 'contacted')

