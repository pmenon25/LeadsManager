from django.db.models import fields
from django import forms
from django.forms import ModelForm
from .models import Lead;

class LeadForm(ModelForm):
    class Meta:
        model = Lead
        fields = ('firstname', 'lastname' , 'email','notes', 'contacted')