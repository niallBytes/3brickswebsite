#!/usr/bin/env python3
"""
Backend API Testing for You First Interior Design Studio
Tests all 9 scenarios as specified in the review request
"""

import requests
import time
import json
from datetime import datetime

# Base URL from environment
BASE_URL = "https://boutique-design-pune.preview.emergentagent.com/api"
ADMIN_PASSWORD = "youfirst2025"

def print_test_header(test_num, description):
    """Print formatted test header"""
    print(f"\n{'='*80}")
    print(f"TEST {test_num}: {description}")
    print(f"{'='*80}")

def print_result(passed, message):
    """Print test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {message}")

def test_1_root_endpoint():
    """Test 1: GET /api/ — should return {message: 'You First API'} with 200"""
    print_test_header(1, "GET /api/ — Root endpoint")
    
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "You First API":
                print_result(True, "Root endpoint returns correct message")
                return True
            else:
                print_result(False, f"Expected message 'You First API', got {data}")
                return False
        else:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_2_leads_happy_path():
    """Test 2: POST /api/leads — Happy path with valid data"""
    print_test_header(2, "POST /api/leads — Happy path")
    
    payload = {
        "name": "Rohan Test",
        "phone": "9876543210",
        "project_type": "Full Home Interior",
        "area": "Baner",
        "budget": "₹10L – ₹20L"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") == True and "lead" in data:
                lead = data["lead"]
                required_fields = ["id", "name", "phone", "project_type", "area", "budget", "created_at"]
                missing_fields = [f for f in required_fields if f not in lead]
                
                if not missing_fields:
                    print_result(True, f"Lead created successfully with ID: {lead.get('id')}")
                    return True, lead
                else:
                    print_result(False, f"Missing fields in response: {missing_fields}")
                    return False, None
            else:
                print_result(False, f"Expected ok:true and lead object, got {data}")
                return False, None
        else:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False, None
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False, None

def test_3_leads_missing_field():
    """Test 3: POST /api/leads — Missing required field (phone)"""
    print_test_header(3, "POST /api/leads — Missing required field")
    
    payload = {
        "name": "Test User",
        "project_type": "Kitchen Remodel",
        "area": "Koregaon Park",
        "budget": "₹5L – ₹10L"
        # Missing "phone"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 400:
            data = response.json()
            if "error" in data:
                print_result(True, f"Correctly rejected with error: {data['error']}")
                return True
            else:
                print_result(False, "Expected error message in response")
                return False
        else:
            print_result(False, f"Expected status 400, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_4_leads_invalid_phone():
    """Test 4: POST /api/leads — Invalid phone number"""
    print_test_header(4, "POST /api/leads — Invalid phone")
    
    test_cases = [
        {"phone": "abc", "description": "alphabetic"},
        {"phone": "12", "description": "too short"}
    ]
    
    all_passed = True
    for test_case in test_cases:
        payload = {
            "name": "Test User",
            "phone": test_case["phone"],
            "project_type": "Bedroom Interior",
            "area": "Viman Nagar",
            "budget": "₹3L – ₹5L"
        }
        
        print(f"\nTesting with {test_case['description']} phone: {test_case['phone']}")
        
        try:
            response = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.json()}")
            
            if response.status_code == 400:
                data = response.json()
                if "error" in data:
                    print_result(True, f"Correctly rejected invalid phone: {data['error']}")
                else:
                    print_result(False, "Expected error message in response")
                    all_passed = False
            else:
                print_result(False, f"Expected status 400, got {response.status_code}")
                all_passed = False
        except Exception as e:
            print_result(False, f"Exception occurred: {str(e)}")
            all_passed = False
    
    return all_passed

def test_5_leads_honeypot():
    """Test 5: POST /api/leads — Honeypot triggered (should return 200 but not save)"""
    print_test_header(5, "POST /api/leads — Honeypot triggered")
    
    # First, get count of leads before honeypot submission
    try:
        admin_response = requests.get(f"{BASE_URL}/admin/leads?password={ADMIN_PASSWORD}", timeout=10)
        leads_before = len(admin_response.json().get("leads", []))
        print(f"Leads count before honeypot: {leads_before}")
    except Exception as e:
        print(f"Warning: Could not get initial lead count: {e}")
        leads_before = None
    
    payload = {
        "name": "Spam Bot",
        "phone": "9999999999",
        "project_type": "Full Home Interior",
        "area": "Spam Area",
        "budget": "₹50L+",
        "website": "http://spam.com"  # Honeypot field
    }
    
    try:
        response = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") == True:
                # Now check if lead was actually saved
                time.sleep(1)  # Brief delay to ensure DB write would have completed
                admin_response = requests.get(f"{BASE_URL}/admin/leads?password={ADMIN_PASSWORD}", timeout=10)
                leads_after = len(admin_response.json().get("leads", []))
                print(f"Leads count after honeypot: {leads_after}")
                
                if leads_before is not None and leads_after == leads_before:
                    print_result(True, "Honeypot correctly returned ok:true but did NOT save the lead")
                    return True
                elif leads_before is not None:
                    print_result(False, f"Honeypot lead was saved! Before: {leads_before}, After: {leads_after}")
                    return False
                else:
                    print_result(True, "Honeypot returned ok:true (could not verify save status)")
                    return True
            else:
                print_result(False, f"Expected ok:true, got {data}")
                return False
        else:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_6_leads_rate_limit():
    """Test 6: POST /api/leads — Rate limit (4th submission should fail with 429)"""
    print_test_header(6, "POST /api/leads — Rate limit")
    
    print("Submitting 4 valid leads in quick succession...")
    
    results = []
    for i in range(4):
        payload = {
            "name": f"Rate Limit Test {i+1}",
            "phone": f"98765432{i:02d}",
            "project_type": "Living Room",
            "area": "Hadapsar",
            "budget": "₹5L – ₹10L"
        }
        
        print(f"\nSubmission {i+1}/4:")
        try:
            response = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.json()}")
            results.append(response.status_code)
            time.sleep(0.5)  # Small delay between requests
        except Exception as e:
            print(f"Exception on submission {i+1}: {str(e)}")
            results.append(None)
    
    # Check results
    if len(results) >= 4:
        if results[3] == 429:
            print_result(True, f"4th submission correctly rate-limited with 429. Results: {results}")
            return True
        else:
            print_result(False, f"Expected 4th submission to return 429, got {results[3]}. All results: {results}")
            return False
    else:
        print_result(False, f"Could not complete all 4 submissions. Results: {results}")
        return False

def test_7_admin_wrong_password():
    """Test 7: GET /api/admin/leads?password=wrong — expect 401"""
    print_test_header(7, "GET /api/admin/leads — Wrong password")
    
    try:
        response = requests.get(f"{BASE_URL}/admin/leads?password=wrongpassword", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 401:
            data = response.json()
            if "error" in data:
                print_result(True, f"Correctly rejected with 401: {data['error']}")
                return True
            else:
                print_result(False, "Expected error message in response")
                return False
        else:
            print_result(False, f"Expected status 401, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_8_admin_no_password():
    """Test 8: GET /api/admin/leads (no password) — expect 401"""
    print_test_header(8, "GET /api/admin/leads — No password")
    
    try:
        response = requests.get(f"{BASE_URL}/admin/leads", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 401:
            data = response.json()
            if "error" in data:
                print_result(True, f"Correctly rejected with 401: {data['error']}")
                return True
            else:
                print_result(False, "Expected error message in response")
                return False
        else:
            print_result(False, f"Expected status 401, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_9_admin_correct_password(expected_lead_name=None):
    """Test 9: GET /api/admin/leads?password=youfirst2025 — expect 200 with leads array"""
    print_test_header(9, "GET /api/admin/leads — Correct password")
    
    try:
        response = requests.get(f"{BASE_URL}/admin/leads?password={ADMIN_PASSWORD}", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if "leads" in data and isinstance(data["leads"], list):
                leads = data["leads"]
                print(f"Response: Retrieved {len(leads)} leads")
                
                # Check if leads are sorted by created_at desc
                if len(leads) > 1:
                    dates = [lead.get("created_at") for lead in leads if "created_at" in lead]
                    is_sorted = all(dates[i] >= dates[i+1] for i in range(len(dates)-1))
                    if is_sorted:
                        print("✓ Leads are sorted by created_at descending")
                    else:
                        print("⚠ Leads may not be sorted correctly")
                
                # Check if expected lead is present
                if expected_lead_name:
                    found = any(lead.get("name") == expected_lead_name for lead in leads)
                    if found:
                        print(f"✓ Found expected lead: {expected_lead_name}")
                    else:
                        print(f"⚠ Expected lead '{expected_lead_name}' not found in list")
                
                # Check that honeypot spam is NOT in the list
                spam_found = any(lead.get("name") == "Spam Bot" for lead in leads)
                if spam_found:
                    print_result(False, "Honeypot spam entry 'Spam Bot' found in leads list!")
                    return False
                else:
                    print("✓ Honeypot spam entry NOT in leads list (correct)")
                
                print_result(True, f"Admin endpoint working correctly with {len(leads)} leads")
                return True
            else:
                print_result(False, f"Expected 'leads' array in response, got {data}")
                return False
        else:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def main():
    """Run all tests"""
    print("\n" + "="*80)
    print("YOU FIRST INTERIOR DESIGN STUDIO - BACKEND API TESTS")
    print(f"Base URL: {BASE_URL}")
    print(f"Timestamp: {datetime.now().isoformat()}")
    print("="*80)
    
    results = {}
    
    # Test 1: Root endpoint
    results["test_1"] = test_1_root_endpoint()
    
    # Test 2: Happy path (save lead for later verification)
    test_2_result, created_lead = test_2_leads_happy_path()
    results["test_2"] = test_2_result
    expected_lead_name = created_lead.get("name") if created_lead else None
    
    # Test 3: Missing field
    results["test_3"] = test_3_leads_missing_field()
    
    # Test 4: Invalid phone
    results["test_4"] = test_4_leads_invalid_phone()
    
    # Test 5: Honeypot
    results["test_5"] = test_5_leads_honeypot()
    
    # Test 6: Rate limit
    results["test_6"] = test_6_leads_rate_limit()
    
    # Test 7: Admin wrong password
    results["test_7"] = test_7_admin_wrong_password()
    
    # Test 8: Admin no password
    results["test_8"] = test_8_admin_no_password()
    
    # Test 9: Admin correct password
    results["test_9"] = test_9_admin_correct_password(expected_lead_name)
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name}: {status}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    print("="*80)
    
    return passed == total

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
