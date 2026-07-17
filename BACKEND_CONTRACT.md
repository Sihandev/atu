# Backend Contract Handoff
This document defines the requirements and API contracts for the backend team to integrate with the Next.js frontend application.

## 1. Endpoints List & Data Models
The frontend expects a RESTful API responding with standard JSON envelopes.

### Base Request/Response Structure
All successful responses must wrap data in a `success: true` envelope.
```json
{
  "success": true,
  "data": { ... },
  "meta": { "page": 1 } // optional
}
```
All errors must return `success: false` and an error object.
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR", // e.g., NOT_FOUND, UNAUTHORIZED, INTERNAL_SERVER_ERROR
    "message": "Human readable message",
    "details": {
       "field_name": ["error message 1"]
    }
  }
}
```

### 1.1 POST `/leads`
Creates a quick lead (usually from a WhatsApp CTA or simple form).
- **Request Body:** `{ name: string, phone: string, serviceOfInterest?: string, source?: string }`
- **Response Data:** `{ id: string, status: string, createdAt: string }`
- **Validation:** `name` and `phone` are required.

### 1.2 POST `/quotes`
Creates a detailed quote request from the pricing calculator.
- **Request Body:** `{ origin: string, destination: string, vehicleType: string, runningCondition: string, brand: string, model: string, name: string, whatsapp: string, pickupLocation?: string, deliveryLocation?: string, year?: number, email?: string, preferredMethod?: string, preferredDate?: string, notes?: string }`
- **Response Data:** `{ quoteId: string, status: string, estimatedPriceRange?: { min: number, max: number, currency: string }, createdAt: string }`
- **Validation:** Required fields: `origin`, `destination`, `vehicleType`, `runningCondition`, `brand`, `model`, `name`, `whatsapp`.

### 1.3 GET `/routes`
Fetches a list of available logistics routes.
- **Query Params:** `origin?`, `destination?`, `page?`, `limit?`
- **Response Data:** Array of route objects: `[{ id: string, origin: string, destination: string, duration: string, methods: string[], slug: string, startingPrice?: number }]`

### 1.4 GET `/routes/:slug`
Fetches detailed info for a single route.
- **Response Data:** Single route object (same shape as above).
- **Errors:** Returns `NOT_FOUND` if slug does not exist.

### 1.5 GET `/services`
Fetches a list of provided logistics services.
- **Response Data:** Array of service objects: `[{ id: string, title: string, description: string, slug: string, useCases: string[], process: string[] }]`

### 1.6 GET `/articles`
Fetches blog or news articles.
- **Query Params:** `page?`, `limit?`, `category?`
- **Response Data:** Array of article objects: `[{ id: string, title: string, excerpt: string, slug: string, category: string, publishedAt: string, author: string }]`

### 1.7 GET `/articles/:slug`
Fetches a single article's full content.
- **Response Data:** Single article object including full `content` field.

### 1.8 GET `/tracking/:code`
Fetches shipment tracking information by tracking code (resi).
- **Response Data:** `{ trackingCode: string, vehicle: string, service: string, origin: string, destination: string, status: string, events: [{ status: string, location: string, description: string, timestamp: string, isCurrent: boolean }] }`
- **Errors:** Returns `NOT_FOUND` if tracking code doesn't exist.

### 1.9 POST `/contact`
Handles generic contact form submissions.
- **Request Body:** `{ name: string, email: string, phone: string, subject: string, message: string }`
- **Response Data:** `{ id: string, receivedAt: string }`

## 2. Environment Variables
The frontend relies on the following environment variable to locate the API:
- `NEXT_PUBLIC_API_BASE_URL` (e.g. `https://api.kirimkendaraan.co.id/v1`)

## 3. Authentication Assumptions
- Currently, public endpoints (`GET` listings, `POST` leads/quotes/contact) do not require authentication tokens.
- Rate limiting should be applied on the backend (e.g. 5 requests per minute per IP for the `/quotes` endpoint) to prevent spam.

## 4. Frontend Integration Notes
- The frontend uses a centralized `apiClient` (`src/lib/api/client.ts`) that automatically appends headers and parses JSON.
- If the backend returns a `4xx` or `5xx` status code, the API client expects the JSON error structure defined above.
- Mock data adapters (`src/lib/api/mocks.ts`) are currently in place. Once endpoints are ready, the frontend can be switched to use the live URLs simply by updating the environment variable and ensuring `NEXT_PUBLIC_USE_MOCK_API=false`.
