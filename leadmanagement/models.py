from django.db import models
from datetime import date

# Create your models here.

class Lead(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    email  = models.EmailField(max_length=254)
    notes =  models.TextField(max_length=250)
    created = models.DateTimeField(auto_now_add= True)
    updated= models.DateTimeField(auto_now= True)
    contacted = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.firstname}{self.lastname} and {self.email}'