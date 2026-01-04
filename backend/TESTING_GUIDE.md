# 🧪 Backend Testing Guide

Complete testing guide to verify your backend is working properly.

---

## Prerequisites

- Backend running on `http://localhost:5000`
- `curl` installed (or use Postman)
- Environment variables configured in `.env`
- Supabase tables created
- At least one valid email address

---

## 1. Health Check ✅

**Test:** Server is running and accessible

```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-03T10:30:00.000Z",
  "environment": "development",
  "uptime": 150.5
}
```

**What it checks:**
- Server is running
- Basic connectivity
- Environment detection

---

## 2. Contact Form Testing

### 2.1 Submit Valid Contact

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "This is a test message with enough characters"
  }'
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Contact form submitted successfully. Check your email for confirmation.",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "john@example.com",
    "submittedAt": "2024-01-03T10:30:00.000Z"
  }
}
```

**What it checks:**
- ✅ Input validation
- ✅ Database insertion
- ✅ Confirmation email sent to user
- ✅ Admin notification email sent
- ✅ Response format

### 2.2 Test Validation Errors

#### Missing Name
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "message": "This is a test message"
  }'
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Name is required"
    }
  ]
}
```

#### Invalid Email
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "invalid-email",
    "message": "This is a test message"
  }'
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

#### Message Too Short
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "message": "Hi"
  }'
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "message",
      "message": "Message must be at least 10 characters"
    }
  ]
}
```

### 2.3 Get All Contacts

```bash
curl http://localhost:5000/api/contact
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "...",
      "created_at": "2024-01-03T...",
      "updated_at": "2024-01-03T..."
    }
  ],
  "count": 1
}
```

### 2.4 Delete Contact

```bash
# Replace {id} with actual contact ID
curl -X DELETE http://localhost:5000/api/contact/123e4567-e89b-12d3-a456-426614174000
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

---

## 3. Payment Testing

### 3.1 Initiate Payment (Main Flow)

```bash
curl -X POST http://localhost:5000/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "amount": 5000
  }'
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Payment initialized successfully",
  "data": {
    "reference": "PSK-1704278400000-abc123def",
    "amount": 5000,
    "email": "test@example.com",
    "paymentId": "uuid-here",
    "authorizationUrl": "https://checkout.paystack.com/...",
    "accessCode": "access_code_here"
  }
}
```

**What it checks:**
- ✅ Input validation
- ✅ Payment record created in database
- ✅ Paystack API communication
- ✅ Authorization URL generated

**Next Step:** User goes to `authorizationUrl` to complete payment

### 3.2 Simple Payment (Quick Flow)

```bash
curl -X POST http://localhost:5000/api/payment/simple \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "amount": 5000
  }'
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Payment ready for checkout",
  "data": {
    "reference": "DIRECT-1704278400000-xyz789",
    "amount": 5000,
    "email": "test@example.com",
    "paymentId": "uuid-here"
  }
}
```

### 3.3 Payment Amount Validation

#### Minimum Amount (50 KES)
```bash
curl -X POST http://localhost:5000/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "amount": 10
  }'
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Invalid input",
  "errors": [
    {
      "field": "amount",
      "message": "Minimum amount is KES 50"
    }
  ]
}
```

#### Invalid Email
```bash
curl -X POST http://localhost:5000/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "email": "not-an-email",
    "amount": 5000
  }'
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Invalid input",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

### 3.4 Verify Payment Status

**After payment is completed on Paystack:**

```bash
# Replace PSK-... with actual reference from step 3.1
curl http://localhost:5000/api/payment/verify/PSK-1704278400000-abc123def
```

**Expected Response (200 - Success):**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "data": {
    "reference": "PSK-1704278400000-abc123def",
    "status": "success",
    "amount": 5000,
    "email": "test@example.com",
    "paystackData": {
      "status": "success",
      "amount": 500000,
      "customer": {...}
    }
  }
}
```

**What it checks:**
- ✅ Paystack verification
- ✅ Database update
- ✅ Thank you email sent
- ✅ Proper response

**Expected Response (400 - Failed/Cancelled):**
```json
{
  "success": false,
  "message": "Payment verification failed. Status: failed",
  "data": {
    "reference": "PSK-1704278400000-abc123def",
    "status": "failed",
    "paystackData": {...}
  }
}
```

### 3.5 Get Payment Status

```bash
# Get status from database (doesn't verify with Paystack)
curl http://localhost:5000/api/payment/status/PSK-1704278400000-abc123def
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "reference": "PSK-1704278400000-abc123def",
    "status": "success",
    "amount": 5000,
    "email": "test@example.com",
    "createdAt": "2024-01-03T...",
    "updatedAt": "2024-01-03T..."
  }
}
```

### 3.6 Get All Payments

```bash
curl http://localhost:5000/api/payment/all
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "email": "test@example.com",
      "amount": 5000,
      "reference": "PSK-1704278400000-abc123def",
      "status": "success",
      "created_at": "2024-01-03T...",
      "updated_at": "2024-01-03T..."
    }
  ],
  "count": 1
}
```

---

## 4. Error Handling Tests

### 4.1 Invalid JSON

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d 'invalid json'
```

**Expected Response (400):**
```json
{
  "success": false,
  "error": "Invalid JSON"
}
```

### 4.2 Route Not Found

```bash
curl http://localhost:5000/api/nonexistent
```

**Expected Response (404):**
```json
{
  "success": false,
  "error": "Route not found",
  "path": "/api/nonexistent",
  "method": "GET"
}
```

### 4.3 Rate Limiting (after 100 requests in 15 minutes)

```bash
# After 100 requests...
curl http://localhost:5000/health
```

**Expected Response (429):**
```
Too many requests from this IP, please try again later.
```

---

## 5. Email Testing

### 5.1 Check Email Sending

After submitting a contact form, check:

1. **Your inbox** - Should receive confirmation email with:
   - Thank you message
   - Confirmation of submission
   - Professional formatting

2. **Admin email** (EMAIL_FROM) - Should receive:
   - New contact notification
   - Submitter details (name, email, message)
   - Submission timestamp

### 5.2 Check Payment Email

After successful payment, check **payer's email** for:
- "Thank you for your generous support!" message
- Payment details (amount, reference, date)
- Professional formatting

### 5.3 Test Email Configuration

Check `error.log` for email errors:

```bash
tail -f error.log
```

Common issues:
- Invalid credentials
- Wrong SMTP settings
- Port blocked
- SSL/TLS issues

---

## 6. Database Testing

### 6.1 Verify Contacts in Database

Open Supabase dashboard:
1. Go to your project
2. Go to Table Editor
3. Select `contacts` table
4. Should see your test submission

### 6.2 Verify Payments in Database

1. Go to Table Editor
2. Select `payments` table
3. Should see your test payment with:
   - Reference: PSK-...
   - Amount: 5000
   - Status: success/pending

---

## 7. Full End-to-End Test

### Complete Contact Flow

1. ✅ Submit contact form
   ```bash
   curl -X POST http://localhost:5000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"your-email@example.com","message":"Testing the backend implementation"}'
   ```

2. ✅ Check your email for confirmation

3. ✅ Get all contacts
   ```bash
   curl http://localhost:5000/api/contact
   ```

4. ✅ Verify in database

### Complete Payment Flow

1. ✅ Initiate payment
   ```bash
   curl -X POST http://localhost:5000/api/payment/initiate \
     -H "Content-Type: application/json" \
     -d '{"email":"your-email@example.com","amount":5000}'
   ```

2. ✅ Go to checkout URL (from response)

3. ✅ Complete payment on Paystack (test card: 4111111111111111)

4. ✅ Verify payment
   ```bash
   # Use reference from step 1
   curl http://localhost:5000/api/payment/verify/PSK-...
   ```

5. ✅ Check email for thank you message

6. ✅ Verify in database

---

## 8. Postman Testing

### Import Collection

1. Open Postman
2. Create new collection: "Portfolio Backend"
3. Add requests:

```json
{
  "name": "Portfolio Backend",
  "requests": [
    {
      "name": "Health Check",
      "method": "GET",
      "url": "{{base_url}}/health"
    },
    {
      "name": "Submit Contact",
      "method": "POST",
      "url": "{{base_url}}/api/contact",
      "body": {
        "name": "Test User",
        "email": "test@example.com",
        "message": "This is a test message"
      }
    },
    {
      "name": "Initiate Payment",
      "method": "POST",
      "url": "{{base_url}}/api/payment/initiate",
      "body": {
        "email": "test@example.com",
        "amount": 5000
      }
    }
  ]
}
```

4. Set variable: `base_url` = `http://localhost:5000`

---

## 9. Troubleshooting

### Contact Won't Submit

```bash
# Check server is running
curl http://localhost:5000/health

# Check logs
tail -f error.log

# Verify database connection
# Check Supabase dashboard
```

### Email Not Sending

1. Check credentials in `.env`
2. Check `combined.log` for email errors
3. Test SMTP connection:
   ```bash
   telnet mail.privateemail.com 587
   ```

### Payment Stuck on Pending

1. Check Paystack dashboard
2. Verify API keys
3. Check webhook configuration

### Database Errors

1. Verify Supabase URL and key
2. Verify tables exist
3. Check RLS policies
4. Review Supabase logs

---

## 10. Performance Testing

### Measure Response Time

```bash
time curl http://localhost:5000/health
```

**Expected:** < 100ms

### Stress Test (Rate Limiting)

```bash
for i in {1..110}; do
  curl http://localhost:5000/health
done
```

**Expected:** First 100 succeed, next ones get 429 errors

---

## Success Criteria ✅

All tests pass if:
- ✅ Health check returns 200
- ✅ Contact submission works
- ✅ Validation errors are proper
- ✅ Confirmation emails received
- ✅ Payment initiation works
- ✅ Payment verification works
- ✅ Database records created
- ✅ No errors in logs
- ✅ Response times < 500ms
- ✅ Rate limiting works

---

## Testing Checklist

- [ ] Health check
- [ ] Contact submission
- [ ] Contact validation
- [ ] Payment initiation
- [ ] Payment verification
- [ ] Email sending (contact)
- [ ] Email sending (payment)
- [ ] Database entries
- [ ] Error handling
- [ ] Rate limiting
- [ ] 404 handling
- [ ] Invalid JSON handling

---

**Last Updated:** January 3, 2026  
**Backend Version:** 1.0.0
