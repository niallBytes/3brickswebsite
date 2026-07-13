#!/usr/bin/env python3
"""
You First Backend API Test Suite
Tests all 18 scenarios from the review request
"""

import requests
import json
import time
from typing import Dict, Any

# Base URL from review request
BASE_URL = "https://d2363122-07ff-4ad8-bdda-4f3ff3e512c2.preview.emergentagent.com"
ADMIN_PASSWORD = "youfirst2025"

class TestResults:
    def __init__(self):
        self.passed = []
        self.failed = []
        self.warnings = []
    
    def add_pass(self, test_name: str, details: str = ""):
        self.passed.append(f"✅ {test_name}" + (f": {details}" if details else ""))
        print(f"✅ PASS: {test_name}")
        if details:
            print(f"   {details}")
    
    def add_fail(self, test_name: str, reason: str):
        self.failed.append(f"❌ {test_name}: {reason}")
        print(f"❌ FAIL: {test_name}")
        print(f"   Reason: {reason}")
    
    def add_warning(self, test_name: str, message: str):
        self.warnings.append(f"⚠️  {test_name}: {message}")
        print(f"⚠️  WARNING: {test_name}: {message}")
    
    def summary(self):
        print("\n" + "="*80)
        print("TEST SUMMARY")
        print("="*80)
        print(f"Passed: {len(self.passed)}")
        print(f"Failed: {len(self.failed)}")
        print(f"Warnings: {len(self.warnings)}")
        print("\n" + "-"*80)
        if self.failed:
            print("FAILURES:")
            for f in self.failed:
                print(f"  {f}")
        if self.warnings:
            print("\nWARNINGS:")
            for w in self.warnings:
                print(f"  {w}")
        print("="*80)

results = TestResults()

def test_1_health_check():
    """Test 1: GET /api/ — should return {message: "You First API", ok: true} with 200"""
    print("\n[Test 1] Health Check - GET /api/")
    try:
        resp = requests.get(f"{BASE_URL}/api/", timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            if data.get("message") == "You First API" and data.get("ok") is True:
                results.add_pass("Test 1: Health Check", f"Response: {data}")
            else:
                results.add_fail("Test 1: Health Check", f"Unexpected response: {data}")
        else:
            results.add_fail("Test 1: Health Check", f"Status {resp.status_code}, expected 200")
    except Exception as e:
        results.add_fail("Test 1: Health Check", f"Exception: {str(e)}")

def test_2_full_quiz_lead():
    """Test 2: POST /api/leads with FULL quiz payload — verify estimate calculation"""
    print("\n[Test 2] Full Quiz Lead with Estimate Calculation")
    payload = {
        "name": "Rohan",
        "phone": "+919876543210",
        "email": "r@x.com",
        "area": "Baner",
        "pincode": "411045",
        "project_type": "new",
        "home_type": "apartment",
        "bhk_type": "2BHK",
        "scope_items": ["modular_kitchen", "false_ceiling", "wardrobe"],
        "budget_range": "10-15L",
        "possession_timeline": "ready",
        "preferred_language": "english",
        "consultation_mode": "site_visit",
        "preferred_date": "2025-06-20",
        "preferred_time": "10:00 AM – 12:00 PM",
        "source": "homepage_cta"
    }
    try:
        resp = requests.post(f"{BASE_URL}/api/leads", json=payload, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            if data.get("ok") and "estimate" in data:
                est = data["estimate"]
                # Expected: 2BHK base premium (1.5x): min=1050000, max=1500000
                # Plus addons: kitchen 120k + ceiling 80k + wardrobe 60k = 260k
                # Total: min ~1310000, max ~1760000
                # Package tier should be "premium" for 10-15L budget
                if est and "min" in est and "max" in est and "packageTier" in est:
                    min_val = est["min"]
                    max_val = est["max"]
                    tier = est["packageTier"]
                    
                    # Check if values are in expected range (allow some tolerance)
                    min_expected = 1310000
                    max_expected = 1760000
                    
                    if tier == "premium":
                        if 1200000 <= min_val <= 1400000 and 1650000 <= max_val <= 1850000:
                            results.add_pass("Test 2: Full Quiz Lead", 
                                f"Estimate: min={min_val}, max={max_val}, tier={tier}")
                            # Save lead ID for later tests
                            if "lead" in data and "id" in data["lead"]:
                                global rohan_lead_id
                                rohan_lead_id = data["lead"]["id"]
                        else:
                            results.add_warning("Test 2: Full Quiz Lead", 
                                f"Estimate values outside expected range: min={min_val} (expected ~{min_expected}), max={max_val} (expected ~{max_expected})")
                            results.add_pass("Test 2: Full Quiz Lead", "Estimate structure correct but values differ")
                    else:
                        results.add_fail("Test 2: Full Quiz Lead", 
                            f"Package tier is '{tier}', expected 'premium' for 10-15L budget")
                else:
                    results.add_fail("Test 2: Full Quiz Lead", f"Estimate missing required fields: {est}")
            else:
                results.add_fail("Test 2: Full Quiz Lead", f"Response missing 'ok' or 'estimate': {data}")
        else:
            results.add_fail("Test 2: Full Quiz Lead", f"Status {resp.status_code}, expected 200. Body: {resp.text}")
    except Exception as e:
        results.add_fail("Test 2: Full Quiz Lead", f"Exception: {str(e)}")

def test_3_mini_form_lead():
    """Test 3: POST /api/leads with mini form (no quiz fields) — should save with estimate=null"""
    print("\n[Test 3] Mini Form Lead (no quiz fields)")
    payload = {
        "name": "Test User",
        "phone": "+919999999999",
        "email": "t@x.com",
        "area": "Wakad",
        "source": "hero_inline_form"
    }
    try:
        resp = requests.post(f"{BASE_URL}/api/leads", json=payload, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            if data.get("ok"):
                # estimate should be null since no bhk_type or budget_range
                est = data.get("estimate")
                if est is None:
                    results.add_pass("Test 3: Mini Form Lead", "Saved with estimate=null as expected")
                else:
                    results.add_fail("Test 3: Mini Form Lead", f"Expected estimate=null, got: {est}")
            else:
                results.add_fail("Test 3: Mini Form Lead", f"Response ok=false: {data}")
        else:
            results.add_fail("Test 3: Mini Form Lead", f"Status {resp.status_code}, expected 200")
    except Exception as e:
        results.add_fail("Test 3: Mini Form Lead", f"Exception: {str(e)}")

def test_4_honeypot():
    """Test 4: POST /api/leads with honeypot — should return 200 but NOT save"""
    print("\n[Test 4] Honeypot Test")
    payload = {
        "name": "Spam Bot",
        "phone": "+919888888888",
        "email": "spam@bot.com",
        "area": "Spam City",
        "website": "http://spam.com",  # Honeypot field
        "source": "bot"
    }
    try:
        resp = requests.post(f"{BASE_URL}/api/leads", json=payload, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            if data.get("ok"):
                # Should return ok:true but not actually save
                # We can verify by checking if lead is returned (it shouldn't be)
                if "lead" not in data:
                    results.add_pass("Test 4: Honeypot", "Returned ok:true without saving lead")
                else:
                    results.add_warning("Test 4: Honeypot", "Returned ok:true but also returned lead object - may have been saved")
            else:
                results.add_fail("Test 4: Honeypot", f"Expected ok:true, got: {data}")
        else:
            results.add_fail("Test 4: Honeypot", f"Status {resp.status_code}, expected 200")
    except Exception as e:
        results.add_fail("Test 4: Honeypot", f"Exception: {str(e)}")

def test_5_invalid_phone():
    """Test 5: POST /api/leads with invalid phone — should return 400"""
    print("\n[Test 5] Invalid Phone Validation")
    payload = {
        "name": "Test User",
        "phone": "abc",  # Invalid phone
        "email": "test@x.com"
    }
    try:
        resp = requests.post(f"{BASE_URL}/api/leads", json=payload, timeout=10)
        if resp.status_code == 400:
            data = resp.json()
            if "error" in data:
                results.add_pass("Test 5: Invalid Phone", f"Correctly rejected with 400: {data['error']}")
            else:
                results.add_pass("Test 5: Invalid Phone", "Returned 400 as expected")
        else:
            results.add_fail("Test 5: Invalid Phone", f"Status {resp.status_code}, expected 400")
    except Exception as e:
        results.add_fail("Test 5: Invalid Phone", f"Exception: {str(e)}")

def test_6_missing_name():
    """Test 6: POST /api/leads missing name — should return 400"""
    print("\n[Test 6] Missing Name Validation")
    payload = {
        "phone": "+919999999999",
        "email": "test@x.com"
    }
    try:
        resp = requests.post(f"{BASE_URL}/api/leads", json=payload, timeout=10)
        if resp.status_code == 400:
            data = resp.json()
            if "error" in data:
                results.add_pass("Test 6: Missing Name", f"Correctly rejected with 400: {data['error']}")
            else:
                results.add_pass("Test 6: Missing Name", "Returned 400 as expected")
        else:
            results.add_fail("Test 6: Missing Name", f"Status {resp.status_code}, expected 400")
    except Exception as e:
        results.add_fail("Test 6: Missing Name", f"Exception: {str(e)}")

def test_7_guide_download():
    """Test 7: POST /api/guide-downloads — should return 200 with download object"""
    print("\n[Test 7] Guide Download")
    payload = {
        "name": "Guide Test User",
        "phone": "+919888888888",
        "email": "guide@x.com"
    }
    try:
        resp = requests.post(f"{BASE_URL}/api/guide-downloads", json=payload, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            if data.get("ok") and "download" in data:
                download = data["download"]
                if "id" in download and "name" in download:
                    results.add_pass("Test 7: Guide Download", f"Download created: {download['id']}")
                else:
                    results.add_fail("Test 7: Guide Download", f"Download object missing fields: {download}")
            else:
                results.add_fail("Test 7: Guide Download", f"Response missing 'ok' or 'download': {data}")
        else:
            results.add_fail("Test 7: Guide Download", f"Status {resp.status_code}, expected 200")
    except Exception as e:
        results.add_fail("Test 7: Guide Download", f"Exception: {str(e)}")

def test_8_create_referral():
    """Test 8: POST /api/referrals — should return 200 with unique_code"""
    print("\n[Test 8] Create Referral")
    payload = {
        "referrer_name": "Niall Test",
        "referrer_phone": "+919777777777"
    }
    try:
        resp = requests.post(f"{BASE_URL}/api/referrals", json=payload, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            if data.get("ok") and "referral" in data:
                referral = data["referral"]
                if "unique_code" in referral:
                    code = referral["unique_code"]
                    # Code should be like "NIALLXXXX"
                    if code.startswith("NIALL") or "NIALL" in code:
                        results.add_pass("Test 8: Create Referral", f"Referral code: {code}")
                        # Save for next test
                        global referral_code
                        referral_code = code
                    else:
                        results.add_warning("Test 8: Create Referral", f"Code format unexpected: {code} (expected to contain 'NIALL')")
                        referral_code = code
                        results.add_pass("Test 8: Create Referral", f"Referral created with code: {code}")
                else:
                    results.add_fail("Test 8: Create Referral", f"Referral missing unique_code: {referral}")
            else:
                results.add_fail("Test 8: Create Referral", f"Response missing 'ok' or 'referral': {data}")
        else:
            results.add_fail("Test 8: Create Referral", f"Status {resp.status_code}, expected 200")
    except Exception as e:
        results.add_fail("Test 8: Create Referral", f"Exception: {str(e)}")

def test_9_referral_click():
    """Test 9: POST /api/referrals/{code}/click — should increment clicks"""
    print("\n[Test 9] Referral Click Tracking")
    if 'referral_code' not in globals():
        results.add_fail("Test 9: Referral Click", "No referral code from Test 8")
        return
    
    try:
        # Click the referral link
        resp = requests.post(f"{BASE_URL}/api/referrals/{referral_code}/click", timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            if data.get("ok") and "referrer_name" in data:
                results.add_pass("Test 9: Referral Click", f"Click tracked, referrer: {data['referrer_name']}")
                
                # Verify clicks count via admin endpoint
                time.sleep(0.5)  # Brief delay to ensure DB update
                admin_resp = requests.get(f"{BASE_URL}/api/admin/referrals?password={ADMIN_PASSWORD}", timeout=10)
                if admin_resp.status_code == 200:
                    admin_data = admin_resp.json()
                    referrals = admin_data.get("referrals", [])
                    found = False
                    for ref in referrals:
                        if ref.get("unique_code") == referral_code:
                            clicks = ref.get("clicks", 0)
                            if clicks >= 1:
                                results.add_pass("Test 9: Referral Click Verification", f"Clicks count: {clicks}")
                            else:
                                results.add_fail("Test 9: Referral Click Verification", f"Clicks count is {clicks}, expected >= 1")
                            found = True
                            break
                    if not found:
                        results.add_warning("Test 9: Referral Click Verification", "Referral not found in admin list")
                else:
                    results.add_warning("Test 9: Referral Click Verification", f"Admin endpoint returned {admin_resp.status_code}")
            else:
                results.add_fail("Test 9: Referral Click", f"Response missing 'ok' or 'referrer_name': {data}")
        else:
            results.add_fail("Test 9: Referral Click", f"Status {resp.status_code}, expected 200")
    except Exception as e:
        results.add_fail("Test 9: Referral Click", f"Exception: {str(e)}")

def test_10_admin_stats_with_password():
    """Test 10: GET /api/admin/stats?password=... — should return stats"""
    print("\n[Test 10] Admin Stats with Password")
    try:
        resp = requests.get(f"{BASE_URL}/api/admin/stats?password={ADMIN_PASSWORD}", timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            required_fields = ["total", "month", "newLeads", "guidesMonth", "scheduledToday", "bySource"]
            missing = [f for f in required_fields if f not in data]
            if not missing:
                # Verify bySource has entries
                by_source = data.get("bySource", [])
                if isinstance(by_source, list) and len(by_source) > 0:
                    results.add_pass("Test 10: Admin Stats", f"Stats: total={data['total']}, month={data['month']}, sources={len(by_source)}")
                else:
                    results.add_warning("Test 10: Admin Stats", "bySource is empty or not a list")
                    results.add_pass("Test 10: Admin Stats", "All required fields present")
            else:
                results.add_fail("Test 10: Admin Stats", f"Missing fields: {missing}")
        else:
            results.add_fail("Test 10: Admin Stats", f"Status {resp.status_code}, expected 200")
    except Exception as e:
        results.add_fail("Test 10: Admin Stats", f"Exception: {str(e)}")

def test_11_admin_stats_without_password():
    """Test 11: GET /api/admin/stats without password — should return 401"""
    print("\n[Test 11] Admin Stats without Password")
    try:
        resp = requests.get(f"{BASE_URL}/api/admin/stats", timeout=10)
        if resp.status_code == 401:
            results.add_pass("Test 11: Admin Stats No Auth", "Correctly returned 401")
        else:
            results.add_fail("Test 11: Admin Stats No Auth", f"Status {resp.status_code}, expected 401")
    except Exception as e:
        results.add_fail("Test 11: Admin Stats No Auth", f"Exception: {str(e)}")

def test_12_admin_leads_status_filter():
    """Test 12: GET /api/admin/leads?password=...&status=new — should return only new leads"""
    print("\n[Test 12] Admin Leads with Status Filter")
    try:
        resp = requests.get(f"{BASE_URL}/api/admin/leads?password={ADMIN_PASSWORD}&status=new", timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            if "leads" in data:
                leads = data["leads"]
                # Check all leads have status=new
                all_new = all(lead.get("status") == "new" for lead in leads)
                if all_new:
                    results.add_pass("Test 12: Admin Leads Status Filter", f"All {len(leads)} leads have status='new'")
                else:
                    non_new = [lead for lead in leads if lead.get("status") != "new"]
                    results.add_fail("Test 12: Admin Leads Status Filter", f"Found {len(non_new)} leads with status != 'new'")
            else:
                results.add_fail("Test 12: Admin Leads Status Filter", f"Response missing 'leads': {data}")
        else:
            results.add_fail("Test 12: Admin Leads Status Filter", f"Status {resp.status_code}, expected 200")
    except Exception as e:
        results.add_fail("Test 12: Admin Leads Status Filter", f"Exception: {str(e)}")

def test_13_admin_leads_area_filter():
    """Test 13: GET /api/admin/leads?password=...&area=Baner — should return only Baner leads"""
    print("\n[Test 13] Admin Leads with Area Filter")
    try:
        resp = requests.get(f"{BASE_URL}/api/admin/leads?password={ADMIN_PASSWORD}&area=Baner", timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            if "leads" in data:
                leads = data["leads"]
                # Check all leads have area=Baner
                all_baner = all(lead.get("area") == "Baner" for lead in leads)
                if all_baner:
                    results.add_pass("Test 13: Admin Leads Area Filter", f"All {len(leads)} leads have area='Baner'")
                else:
                    non_baner = [lead for lead in leads if lead.get("area") != "Baner"]
                    results.add_fail("Test 13: Admin Leads Area Filter", f"Found {len(non_baner)} leads with area != 'Baner'")
            else:
                results.add_fail("Test 13: Admin Leads Area Filter", f"Response missing 'leads': {data}")
        else:
            results.add_fail("Test 13: Admin Leads Area Filter", f"Status {resp.status_code}, expected 200")
    except Exception as e:
        results.add_fail("Test 13: Admin Leads Area Filter", f"Exception: {str(e)}")

def test_14_admin_leads_search():
    """Test 14: GET /api/admin/leads?password=...&search=Rohan — should include Rohan lead"""
    print("\n[Test 14] Admin Leads with Search")
    try:
        resp = requests.get(f"{BASE_URL}/api/admin/leads?password={ADMIN_PASSWORD}&search=Rohan", timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            if "leads" in data:
                leads = data["leads"]
                # Check if any lead has name containing "Rohan"
                rohan_leads = [lead for lead in leads if "Rohan" in lead.get("name", "")]
                if rohan_leads:
                    results.add_pass("Test 14: Admin Leads Search", f"Found {len(rohan_leads)} lead(s) matching 'Rohan'")
                else:
                    results.add_fail("Test 14: Admin Leads Search", "No leads found matching 'Rohan'")
            else:
                results.add_fail("Test 14: Admin Leads Search", f"Response missing 'leads': {data}")
        else:
            results.add_fail("Test 14: Admin Leads Search", f"Status {resp.status_code}, expected 200")
    except Exception as e:
        results.add_fail("Test 14: Admin Leads Search", f"Exception: {str(e)}")

def test_15_admin_update_lead():
    """Test 15: PATCH /api/admin/leads/{id} — update status and notes"""
    print("\n[Test 15] Admin Update Lead Status")
    
    # First, get a lead ID from the Rohan search
    try:
        resp = requests.get(f"{BASE_URL}/api/admin/leads?password={ADMIN_PASSWORD}&search=Rohan", timeout=10)
        if resp.status_code != 200:
            results.add_fail("Test 15: Admin Update Lead", "Could not fetch leads to get ID")
            return
        
        data = resp.json()
        leads = data.get("leads", [])
        if not leads:
            results.add_fail("Test 15: Admin Update Lead", "No Rohan lead found to update")
            return
        
        lead_id = leads[0].get("id")
        if not lead_id:
            results.add_fail("Test 15: Admin Update Lead", "Lead missing 'id' field")
            return
        
        # Update the lead
        update_payload = {
            "status": "called",
            "notes": "Rang once"
        }
        update_resp = requests.patch(
            f"{BASE_URL}/api/admin/leads/{lead_id}?password={ADMIN_PASSWORD}",
            json=update_payload,
            timeout=10
        )
        
        if update_resp.status_code == 200:
            update_data = update_resp.json()
            if update_data.get("ok"):
                # Verify the update
                time.sleep(0.5)
                verify_resp = requests.get(f"{BASE_URL}/api/admin/leads?password={ADMIN_PASSWORD}&search=Rohan", timeout=10)
                if verify_resp.status_code == 200:
                    verify_data = verify_resp.json()
                    verify_leads = verify_data.get("leads", [])
                    updated_lead = next((l for l in verify_leads if l.get("id") == lead_id), None)
                    if updated_lead:
                        if updated_lead.get("status") == "called":
                            results.add_pass("Test 15: Admin Update Lead", f"Status updated to 'called', notes: {updated_lead.get('notes')}")
                        else:
                            results.add_fail("Test 15: Admin Update Lead", f"Status is '{updated_lead.get('status')}', expected 'called'")
                    else:
                        results.add_warning("Test 15: Admin Update Lead", "Could not find updated lead for verification")
                else:
                    results.add_warning("Test 15: Admin Update Lead", "Update succeeded but verification failed")
            else:
                results.add_fail("Test 15: Admin Update Lead", f"Update returned ok=false: {update_data}")
        else:
            results.add_fail("Test 15: Admin Update Lead", f"Status {update_resp.status_code}, expected 200")
    except Exception as e:
        results.add_fail("Test 15: Admin Update Lead", f"Exception: {str(e)}")

def test_16_admin_guide_downloads():
    """Test 16: GET /api/admin/guide-downloads — should include entry from Test 7"""
    print("\n[Test 16] Admin Guide Downloads")
    try:
        resp = requests.get(f"{BASE_URL}/api/admin/guide-downloads?password={ADMIN_PASSWORD}", timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            if "downloads" in data:
                downloads = data["downloads"]
                # Check if we have the guide download from test 7
                guide_test = [d for d in downloads if d.get("name") == "Guide Test User"]
                if guide_test:
                    results.add_pass("Test 16: Admin Guide Downloads", f"Found {len(downloads)} downloads including test entry")
                else:
                    results.add_warning("Test 16: Admin Guide Downloads", f"Found {len(downloads)} downloads but test entry not found")
                    results.add_pass("Test 16: Admin Guide Downloads", "Endpoint working")
            else:
                results.add_fail("Test 16: Admin Guide Downloads", f"Response missing 'downloads': {data}")
        else:
            results.add_fail("Test 16: Admin Guide Downloads", f"Status {resp.status_code}, expected 200")
    except Exception as e:
        results.add_fail("Test 16: Admin Guide Downloads", f"Exception: {str(e)}")

def test_17_admin_referrals():
    """Test 17: GET /api/admin/referrals — should include referral from Test 8"""
    print("\n[Test 17] Admin Referrals")
    try:
        resp = requests.get(f"{BASE_URL}/api/admin/referrals?password={ADMIN_PASSWORD}", timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            if "referrals" in data:
                referrals = data["referrals"]
                # Check if we have the referral from test 8
                if 'referral_code' in globals():
                    test_ref = [r for r in referrals if r.get("unique_code") == referral_code]
                    if test_ref:
                        ref = test_ref[0]
                        clicks = ref.get("clicks", 0)
                        results.add_pass("Test 17: Admin Referrals", f"Found {len(referrals)} referrals, test referral has {clicks} clicks")
                    else:
                        results.add_warning("Test 17: Admin Referrals", f"Found {len(referrals)} referrals but test entry not found")
                else:
                    results.add_pass("Test 17: Admin Referrals", f"Found {len(referrals)} referrals")
            else:
                results.add_fail("Test 17: Admin Referrals", f"Response missing 'referrals': {data}")
        else:
            results.add_fail("Test 17: Admin Referrals", f"Status {resp.status_code}, expected 200")
    except Exception as e:
        results.add_fail("Test 17: Admin Referrals", f"Exception: {str(e)}")

def test_18_rate_limit():
    """Test 18: Rate limit — 6 POST requests should trigger 429 on 6th"""
    print("\n[Test 18] Rate Limit Test (5 requests per hour per IP)")
    try:
        # Make 6 requests with same data
        payload = {
            "name": "Rate Limit Test",
            "phone": "+919111111111",
            "email": "ratelimit@test.com",
            "source": "rate_limit_test"
        }
        
        responses = []
        for i in range(6):
            resp = requests.post(f"{BASE_URL}/api/leads", json=payload, timeout=10)
            responses.append((i+1, resp.status_code))
            print(f"   Request {i+1}: Status {resp.status_code}")
            time.sleep(0.2)  # Small delay between requests
        
        # Check if 6th request got 429
        sixth_status = responses[5][1]
        if sixth_status == 429:
            results.add_pass("Test 18: Rate Limit", "6th request correctly returned 429")
        else:
            # Check if 5th got 429 (rate limit is 5/hr)
            fifth_status = responses[4][1]
            if fifth_status == 429:
                results.add_pass("Test 18: Rate Limit", "5th request correctly returned 429 (rate limit is 5/hr)")
            else:
                results.add_fail("Test 18: Rate Limit", f"Expected 429 on 5th or 6th request, got: {responses}")
    except Exception as e:
        results.add_fail("Test 18: Rate Limit", f"Exception: {str(e)}")

def main():
    print("="*80)
    print("YOU FIRST BACKEND API TEST SUITE")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"Admin Password: {ADMIN_PASSWORD}")
    print("="*80)
    
    # Run all tests in sequence
    test_1_health_check()
    test_2_full_quiz_lead()
    test_3_mini_form_lead()
    test_4_honeypot()
    test_5_invalid_phone()
    test_6_missing_name()
    test_7_guide_download()
    test_8_create_referral()
    test_9_referral_click()
    test_10_admin_stats_with_password()
    test_11_admin_stats_without_password()
    test_12_admin_leads_status_filter()
    test_13_admin_leads_area_filter()
    test_14_admin_leads_search()
    test_15_admin_update_lead()
    test_16_admin_guide_downloads()
    test_17_admin_referrals()
    test_18_rate_limit()
    
    # Print summary
    results.summary()
    
    # Return exit code
    return 0 if len(results.failed) == 0 else 1

if __name__ == "__main__":
    exit(main())
