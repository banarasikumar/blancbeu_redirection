# WhatsApp Login Webhook Documentation

This document describes the expected WhatsApp message formats and the required HTTP POST request format for the Blancbeu bot (e.g., Make automation) to successfully authenticate Regular Users, Staff, and Admin users.

## 1. The WhatsApp Message Body
This is the exact text the SvelteKit frontend generates for the user to send. Notice that the `App:` line is missing for regular users.

### For Regular Users
```text
*Hi BlancBeu, please help me log in.*

Token: [TIMESTAMP]-[SHORT_TOKEN]

_Send this message without editing_
```

### For Staff
```text
*Hi BlancBeu, please help me log in.*

App: Staff
Token: [TIMESTAMP]-[SHORT_TOKEN]

_Send this message without editing_
```

### For Admin
```text
*Hi BlancBeu, please help me log in.*

App: Admin
Token: [TIMESTAMP]-[SHORT_TOKEN]

_Send this message without editing_
```

## 2. The HTTP POST Request Body (to `/api/verify`)
When your bot receives the above message, it needs to extract the phone number and the app type (if present) and send an HTTP POST request to your `/api/verify` endpoint. 

### POST Request for Regular Users
For regular users, the code defaults to `"user"` if `app_type` is not uniquely specified. You have three valid ways to send the request for a regular user:

**Option A (Recommended: Omit the field entirely):**
```json
{
  "whatsapp_number": "+919876543210"
}
```

**Option B (Explicitly send "user"):**
```json
{
  "whatsapp_number": "+919876543210",
  "app_type": "user" 
}
```

**Option C (Send an empty string):**
```json
{
  "whatsapp_number": "+919876543210",
  "app_type": "" 
}
```
*(The backend handles all three options and will safely default to `"user"`).*

### POST Request for Staff / Admin
```json
{
  "whatsapp_number": "+919876543210",
  "app_type": "staff" 
}
```
*(Replace `"staff"` with `"admin"` for admin logins).*

**Important Notes:**
- The `whatsapp_number` should ideally include the country code.
