#!/usr/bin/env python3

import json
import requests
import unittest

TEST_URL = "http://localhost:8000/api/"

def get_request(endpoint):
    url = TEST_URL + endpoint
    print(f"GET request at {url}")
    return requests.get(url)


def post_request(endpoint, body):
    url = TEST_URL + endpoint
    print(f"POST request at {url}")
    return requests.post(url, json=body)


def put_request(endpoint, body):
    url = TEST_URL + endpoint
    print(f"PUT request at {url}")
    return requests.put(url, json=body)


def delete_request(endpoint):
    url = TEST_URL + endpoint
    print(f"delete request at {url}")
    return requests.delete(url)


def pretty_print(response):
    pretty_json = json.loads(response.text)
    print(json.dumps(pretty_json, indent=2))


class TestApi(unittest.TestCase):
    def setUp(self) -> None:
        return super().setUp()

    def tearDown(self) -> None:
        return super().tearDown()

    def test_add_lead(self) -> None:
        data = {
            "firstname": "Poornima",
            "lastname": "Menon",
            "email": "test@gmail.com",
            "notes": "Testing",
            "contacted": "True",
        }
        response = post_request("add/", data)
        self.assertTrue(response.ok)

    def test_get_all_leads(self):
        response = get_request("")
        self.assertTrue(response.ok)

    def test_get_lead_by_id(self):
        # Get all entries
        response = get_request("")
        self.assertTrue(response.ok)
        lead = response.json()[0]
        id = lead["id"]

        # Assert that we can retrieve individual leads
        response = get_request(f"{id}/")
        self.assertTrue(response.ok)
        self.assertTrue(lead == response.json())

    def test_update_lead(self):
        data = {
            "firstname": "Shrikant",
            "lastname": "Giridhar",
            "email": "test@gmail.com",
            "notes": "Testing",
            "contacted": "True",
        }
        response = put_request("1/update/", data)
        self.assertTrue(response.ok)

    def test_update_invalid_lead(self):
        data = {
            "firstname": "Shrikant",
            "lastname": "Giridhar",
            "notes": "Testing",
            "contacted": True,
        }
        response = put_request("1/update/", data)
        self.assertFalse(response.ok)

    def test_delete_lead(self):
        response = delete_request("2/delete/")
        self.assertTrue(response.ok)


def main():
    unittest.main()


main()
