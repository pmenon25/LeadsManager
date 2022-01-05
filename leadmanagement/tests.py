import json
from django.test import TestCase, Client
from rest_framework import response, status
from .models import Lead
from django.urls import path
from .serializers import LeadSerializer
from .views import *



client = Client()


class LeadTest(TestCase):
    def setUp(self):
        Lead.objects.create(
            firstname="Pio",
            lastname="Henry",
            email="pio.H@gmail.com",
            notes="This lead has been added for testing",
            contacted=True,
        )

        Lead.objects.create(
            firstname="Greg",
            lastname="William",
            email="greg25@gmail.com",
            notes="Preparation Stage ",
            contacted=False,
        )


class GetAllLeads(TestCase):
    def setUp(self):
        Lead.objects.create(
            firstname="Pio",
            lastname="Henry",
            email="pio.H@gmail.com",
            notes="This lead has been added for testing",
            contacted=True,
        )

        Lead.objects.create(
            firstname="Greg",
            lastname="William",
            email="greg25@gmail.com",
            notes="Preparation Stage ",
            contacted=False,
        )

        Lead.objects.create(
            firstname="Sammy",
            lastname="R",
            email="sammyR@gmail.com",
            notes="This lead has been added for testing",
            contacted=True,
        )

        Lead.objects.create(
            firstname="Greg",
            lastname="William",
            email="gregW@gmail.com",
            notes="Preparation Stage ",
            contacted=True,
        )

    def test_all_leads(self):
        response = self.client.get("/api/", HTTP_ACCEPT="application/json")
        leads = Lead.objects.all()
        serializer = LeadSerializer(leads, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class GetSingleLead(TestCase):
    def setUp(self):
        self.pio = Lead.objects.create(
            firstname="Pio",
            lastname="Henry",
            email="pio.H@gmail.com",
            notes="This lead has been added for testing",
            contacted=True,
        )

        self.greg = Lead.objects.create(
            firstname="Greg",
            lastname="William",
            email="gregW@gmail.com",
            notes="Preparation Stage ",
            contacted=True,
        )

        self.sammy = Lead.objects.create(
            firstname="Sammy",
            lastname="R",
            email="sammyR@gmail.com",
            notes="This lead has been added for testing",
            contacted=True,
        )


    def test_get_valid_single_lead(self):
        response = self.client.get('/api/', args=[self.pio.id])
        lead = LeadSerializer(Lead.objects.get(id=self.pio.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content)[0], lead.data)


    def test_get_invalid_single_lead(self):
        response = self.client.get('/api/89989/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class CreateNewLead(TestCase):
    def setUp(self):
        self.valid_payload = {
            "firstname":"Sammy",
            "lastname":"R",
            "email":"sammyR@gmail.com",
            "notes":"This lead has been added for testing",
            "contacted":True, 
        }
        self.invalid_payload = {
            "firstname":"",
            "lastname":"R",
            "email":"sammyR@gmail.com",
            "notes":"This lead has been added for testing",
            "contacted":True, 
        }

    def test_create_valid_lead(self):
        response = self.client.post('/api/add/' , 
        data=json.dumps(self.valid_payload),
        content_type = 'application/json'
        )
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
    
    def test_create_invalid_lead(self):
        response = self.client.post('/api/add/',
        data=json.dumps(self.invalid_payload),
        content_type = 'application/json'
        )
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

class UpdateSingleLead(TestCase):
    def setUp(self):
        self.pio = Lead.objects.create(
            firstname="Pio",
            lastname="Henry",
            email="pio.H@gmail.com",
            notes="This lead has been added for testing",
            contacted=True,
        )

        self.greg = Lead.objects.create(
            firstname="Greg",
            lastname="William",
            email="gregW@gmail.com",
            notes="Preparation Stage ",
            contacted=True,
        )
        self.valid_payload = {
            "firstname":"Greg",
            "lastname":"Williams",
            "email":"gregW@gmail.com",
            "notes":"Preparation Stage ",
            "contacted":False,
        }
        self.invalid_payload = {
            "firstname":"Greg",
            "lastname":"",
            "email":"gregW@gmail.com",
            "notes":"",
            "contacted":False,
        }
    
    def test_valid_update_lead(self):
        response = self.client.put(f'/api/{self.greg.id}/update/',
        data = json.dumps(self.valid_payload),
        content_type="application/json"
        )
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
    
    def test_invalid_update_lead(self):
        response = self.client.put(f'/api/{self.greg.id}/update/',
        data = json.dumps(self.invalid_payload),
        content_type="application/json"
        )
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

class DeleteSingleLead(TestCase):
    def setUp(self):
        self.pio = Lead.objects.create(
            firstname="Pio",
            lastname="Henry",
            email="pio.H@gmail.com",
            notes="This lead has been added for testing",
            contacted=True,
        )

        self.greg = Lead.objects.create(
            firstname="Greg",
            lastname="William",
            email="gregW@gmail.com",
            notes="Preparation Stage ",
            contacted=True,
        )
    def test_valid_delete_lead(self):
        response=self.client.delete(f'/api/{self.pio.id}/delete/')
        self.assertEqual(response.status_code,status.HTTP_204_NO_CONTENT)
    
    def test_valid_delete_lead(self):
        response=self.client.delete(f'/api/100/delete/')
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)