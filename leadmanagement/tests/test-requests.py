#!/usr/bin/env python3

import requests
import unittest

TEST_URL = "http://localhost:8000/api/"

#import http.client as http_client
#http_client.HTTPConnection.debuglevel = 1

def get_request(endpoint):
    url = TEST_URL + endpoint
    print(f"GET request at {url}")
    return requests.get(url)

def post_request(endpoint, body):
    url = TEST_URL + endpoint
    print(f"POST request at {url}")
    return requests.post(url, json=body)


class TestApi(unittest.TestCase):

    def test_add(self):
        data = {"firstname": "Poornima",
                "lastname" : "Menon",
                "email"    : "test@gmail.com",
                "notes"    : "Testing",
                "contacted": True}

        response = post_request("add/", data)
        print(response.status_code)
        self.assertTrue(response.ok)

    def test_get(self):
        response = get_request("")
        print(response.status_code)
        self.assertTrue(response.ok)


def main():
    unittest.main()

main()
