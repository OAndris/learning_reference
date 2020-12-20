import pytest
import requests
import json

def test_login_valid(supply_url):
	url = f"{supply_url}/login/" 
	data = {
        'email': 'eve.holt@reqres.in',
        'password':'cityslicka'
    }
	resp = requests.post(url, data=data)
	j = json.loads(resp.text)
	assert resp.status_code == 200, resp.text
	assert j['token'] == "QpwL5tke4Pnpja7X4", resp.text

def test_login_no_password(supply_url):
	url = f"{supply_url}/login/" 
	data = {
        'email': 'eve.holt@reqres.in'
    }
	resp = requests.post(url, data=data)
	j = json.loads(resp.text)
	assert resp.status_code == 400, resp.text
	assert j['error'] == "Missing password", resp.text

def test_login_no_email(supply_url):
	url = f"{supply_url}/login/" 
	data = {}
	resp = requests.post(url, data=data)
	j = json.loads(resp.text)
	assert resp.status_code == 400, resp.text
	assert j['error'] == "Missing email or username", resp.text
