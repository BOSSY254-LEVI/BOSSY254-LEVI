# 🏗️ Backend Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (React)                          │
│                      (http://localhost:5173)                        │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
        ┌───────────────────────┐     ┌──────────────────┐
        │  Contact Form API     │     │  Payment API     │
        │  POST /api/contact    │     │  POST /initiate  │
        └───────────┬───────────┘     └────────┬─────────┘
                    │                          │
                    ▼                          ▼
        ┌─────────────────────────────────────────────┐
        │     Express.js Backend Server (Node.js)     │
        │        (http://localhost:5000)              │
        │                                             │
        │  ┌─────────────────────────────────────┐   │
        │  │         Middleware Stack            │   │
        │  ├─ Helmet (Security Headers)          │   │
        │  ├─ Rate Limiter (100/15min)          │   │
        │  ├─ CORS (Allowed Origins)            │   │
        │  ├─ Request Logger                    │   │
        │  └─ Error Handler                     │   │
        │                                       │   │
        │  ┌─────────────────────────────────────┐   │
        │  │      Route Handlers                 │   │
        │  ├─ Contact Routes                    │   │
        │  ├─ Payment Routes                    │   │
        │  └─ System Routes                     │   │
        │                                       │   │
        │  ┌─────────────────────────────────────┐   │
        │  │      Controllers                    │   │
        │  ├─ Contact Controller                │   │
        │  └─ Payment Controller                │   │
        │                                       │   │
        │  ┌─────────────────────────────────────┐   │
        │  │      Business Logic                 │   │
        │  ├─ Contact Services                  │   │
        │  ├─ Payment Services                  │   │
        │  └─ Email Services                    │   │
        │                                       │   │
        │  ┌─────────────────────────────────────┐   │
        │  │      Data Layer                     │   │
        │  ├─ Supabase Service                  │   │
        │  ├─ Paystack Service                  │   │
        │  └─ Email Service                     │   │
        └─────────────────────────────────────────────┘
                    │            │           │
        ┌───────────┴─┐   ┌──────┴────┐   ┌──┴──────┐
        │             │   │           │   │         │
        ▼             ▼   ▼           ▼   ▼         ▼
    ┌────────────┐ ┌──────────┐ ┌─────────────┐ ┌────────┐
    │ Supabase   │ │ Paystack │ │ Namecheap   │ │ Logging│
    │(Database)  │ │(Payments)│ │(Email SMTP) │ │(Files) │
    └────────────┘ └──────────┘ └─────────────┘ └────────┘
         │               │            │              │
         ▼               ▼            ▼              ▼
    PostgreSQL    Paystack API   SMTP Server   Log Files
```

---

## Request Flow - Contact Submission

```
User (Frontend)
    │
    │ POST /api/contact
    │ { name, email, message }
    │
    ▼
Express Server
    │
    ├─→ Rate Limiter ✓ (Check limits)
    │
    ├─→ CORS Check ✓ (Verify origin)
    │
    ├─→ Request Logger → Winston Logger
    │
    ├─→ Contact Controller
    │   ├─→ Validate with Zod ✓
    │   │
    │   ├─→ Supabase Service
    │   │   └─→ Insert into contacts table
    │   │       └─→ Response: Contact record created
    │   │
    │   ├─→ Email Service
    │   │   ├─→ Send confirmation to user
    │   │   │   └─→ Namecheap SMTP
    │   │   │       └─→ Email delivered
    │   │   │
    │   │   └─→ Send admin notification
    │   │       └─→ Namecheap SMTP
    │   │           └─→ Email delivered
    │   │
    │   └─→ Return response: { success, data }
    │
    ▼
User (Frontend)
    └─→ Display: "Contact submitted successfully"
        User receives confirmation email
        Admin receives notification
```

---

## Request Flow - Payment Processing

```
User (Frontend)
    │
    │ 1. POST /api/payment/initiate
    │    { email, amount }
    │
    ▼
Express Server
    │
    ├─→ Validate Input ✓
    │
    ├─→ Payment Controller
    │   ├─→ Generate reference: PSK-{timestamp}-{random}
    │   │
    │   ├─→ Create in Supabase
    │   │   └─→ payments table { email, amount, reference, status: 'pending' }
    │   │
    │   ├─→ Call Paystack Service
    │   │   └─→ POST to https://api.paystack.co/transaction/initialize
    │   │       └─→ Response: { authorization_url, access_code }
    │   │
    │   └─→ Return: { reference, authorizationUrl }
    │
    ▼
User (Frontend)
    │
    │ 2. Redirect to Paystack Checkout
    │    window.location = authorizationUrl
    │
    ▼
Paystack UI
    │
    │ User enters card/payment details
    │
    ▼
Paystack Processes Payment
    │
    ▼ Success OR Failure
    │
    ├─→ Option A: Paystack Webhook
    │   │
    │   ▼
    │   POST /api/payment/webhook
    │   │
    │   ├─→ Verify signature ✓
    │   │
    │   ├─→ Update in Supabase
    │   │   └─→ payments table: status = 'success'
    │   │
    │   └─→ Send thank you email
    │       └─→ Namecheap SMTP
    │
    └─→ Option B: User Callback
        │
        ▼
        GET /api/payment/verify/{reference}
        │
        ├─→ Call Paystack Verify API
        │   └─→ GET https://api.paystack.co/transaction/verify/{reference}
        │
        ├─→ Update in Supabase if success
        │
        └─→ Send thank you email if success
            └─→ Namecheap SMTP
    │
    ▼
User (Frontend)
    └─→ Display: "Payment successful!"
        Database updated
        Confirmation email sent
```

---

## Data Flow - Database Operations

```
┌─────────────────────────────────────────────┐
│         Supabase Database                   │
│      (PostgreSQL + Auth)                    │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │       contacts table                 │   │
│  ├──────────────────────────────────────┤   │
│  │ id (UUID)                            │   │
│  │ name (VARCHAR 100)                   │   │
│  │ email (VARCHAR 255)                  │   │
│  │ message (TEXT)                       │   │
│  │ created_at (TIMESTAMP)               │   │
│  │ updated_at (TIMESTAMP)               │   │
│  └──────────────────────────────────────┘   │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │       payments table                 │   │
│  ├──────────────────────────────────────┤   │
│  │ id (UUID)                            │   │
│  │ email (VARCHAR 255)                  │   │
│  │ amount (INTEGER - KES)               │   │
│  │ reference (VARCHAR 255 UNIQUE)       │   │
│  │ status (VARCHAR 50)                  │   │
│  │   - pending                          │   │
│  │   - processing                       │   │
│  │   - success                          │   │
│  │   - failed                           │   │
│  │   - cancelled                        │   │
│  │ paystack_ref (VARCHAR 255)           │   │
│  │ notes (TEXT)                         │   │
│  │ created_at (TIMESTAMP)               │   │
│  │ updated_at (TIMESTAMP)               │   │
│  └──────────────────────────────────────┘   │
│                                             │
│  Indexes:                                   │
│  - contacts(email)                         │
│  - contacts(created_at DESC)               │
│  - payments(reference UNIQUE)              │
│  - payments(email)                         │
│  - payments(status)                        │
│  - payments(created_at DESC)               │
└─────────────────────────────────────────────┘
```

---

## File Structure with Layers

```
backend/
├── src/
│   ├── server.ts              ◄─── Entry point (starts Express)
│   │
│   ├── app.ts                 ◄─── Express app setup, middleware
│   │                              Routes mounted here
│   │
│   ├── config/
│   │   └── env.ts             ◄─── Environment variables & validation
│   │
│   ├── middleware/
│   │   └── auth.middleware.ts ◄─── Auth, rate limiting, etc.
│   │
│   ├── controllers/
│   │   ├── contact.controller.ts   ◄─── Request handlers
│   │   └── payment.controller.ts
│   │
│   ├── services/
│   │   ├── supabase.service.ts     ◄─── Database operations
│   │   ├── paystack.service.ts     ◄─── Payment processing
│   │   └── email.service.ts        ◄─── Email sending
│   │
│   ├── routes/
│   │   ├── contact.routes.ts       ◄─── Route definitions
│   │   └── payment.routes.ts
│   │
│   └── utils/
│       └── helpers.ts          ◄─── Utility functions
│
├── error.log                   ◄─── Error logs
├── combined.log                ◄─── All logs
│
├── .env                        ◄─── Environment variables (not committed)
├── .env.example                ◄─── Template
├── package.json
└── tsconfig.json
```

---

## Service Dependencies

```
Payment Controller
    │
    ├─→ Paystack Service (Payment processing)
    │   └─→ Axios (HTTP client)
    │
    ├─→ Supabase Service (Database)
    │   └─→ Supabase JS client
    │
    ├─→ Email Service (Notifications)
    │   └─→ Nodemailer
    │
    └─→ Logger
        └─→ Winston

Contact Controller
    │
    ├─→ Supabase Service (Database)
    │   └─→ Supabase JS client
    │
    ├─→ Email Service (Notifications)
    │   └─→ Nodemailer
    │
    └─→ Logger
        └─→ Winston
```

---

## Error Handling Flow

```
Request → Middleware
    │
    ├─→ CORS Check ✗ → Error Response (403)
    │
    ├─→ Rate Limit ✗ → Error Response (429)
    │
    └─→ Continue ✓
        │
        ▼ Controller
        │
        ├─→ Validation ✗ → Error Response (400)
        │   └─→ Log validation error
        │
        ├─→ Database Error ✗ → Error Response (500)
        │   └─→ Log database error
        │
        ├─→ Paystack Error ✗ → Error Response (400/500)
        │   └─→ Log Paystack error
        │
        ├─→ Email Error ? → Continue (non-blocking)
        │   └─→ Log email error
        │
        └─→ Success ✓ → Response (200/201)
            └─→ Log success
```

---

## Deployment Architecture

```
Production:

    DNS
     │
     ▼
CDN (CloudFlare)
     │
     ▼
Load Balancer
     │
  ┌──┴──┐
  │     │
  ▼     ▼
Backend 1  Backend 2  (Vercel/Heroku/AWS)
  │         │
  └──┬───┬──┘
     │   │
     ▼   ▼
  Supabase   (PostgreSQL + Auth)
  
  External APIs:
  - Paystack (Payment)
  - Namecheap (Email SMTP)
  
  Storage:
  - Log files (error.log, combined.log)
  - Database backups
```

---

## Security Architecture

```
┌─────────────────────────────────────────────┐
│          Frontend (HTTPS)                   │
└─────────────────────────────────────────────┘
              │
              ▼
    ┌──────────────────────┐
    │  CORS Check          │ ◄─── Only allowed origins
    └──────────────────────┘
              │
              ▼
    ┌──────────────────────┐
    │  Rate Limit          │ ◄─── 100 requests/15min
    └──────────────────────┘
              │
              ▼
    ┌──────────────────────┐
    │  Helmet Security     │ ◄─── Security headers
    └──────────────────────┘
              │
              ▼
    ┌──────────────────────┐
    │  Input Validation    │ ◄─── Zod schemas
    └──────────────────────┘
              │
              ▼
    ┌──────────────────────┐
    │  Authentication      │ ◄─── API keys, tokens
    └──────────────────────┘
              │
              ▼
    ┌──────────────────────┐
    │  Database            │ ◄─── RLS policies
    └──────────────────────┘
              │
              ▼
    ┌──────────────────────┐
    │  External APIs       │ ◄─── Webhook verification
    └──────────────────────┘
```

---

## Performance Considerations

```
Request Optimization:
├─ Rate Limiting (prevent abuse)
├─ Input Validation (fail fast)
├─ Database Indexes (query speed)
├─ Connection Pooling (Supabase)
├─ Async Operations (non-blocking)
└─ Error Handling (quick failures)

Scaling:
├─ Stateless Backend (multiple instances)
├─ Database (Supabase manages)
├─ Caching (Redis if needed)
├─ CDN (CloudFlare)
├─ Load Balancing (automatic)
└─ Monitoring (logging)

Production Checklist:
├─ Environment variables
├─ Database backups
├─ Error logging
├─ Payment reconciliation
├─ Email delivery monitoring
├─ API rate limits
├─ Webhook monitoring
└─ Security updates
```

---

**Architecture last updated:** January 3, 2026  
**Backend Version:** 1.0.0 (Production Ready)
