

# Pending Tasks for Deploy-Ready Web App

After reviewing the entire codebase, here are the remaining items grouped by priority:

---

## Critical (Must Fix Before Deploy)

### 1. Contact Form Backend
The contact form in `Contact.tsx` has no `onSubmit` handler -- clicking "Send Message" does nothing. Need to either:
- Create a `contact_messages` table and store submissions, OR
- Send contact form data via the existing `send-email` edge function

### 2. Newsletter Subscription
The subscribe button in `News.tsx` is non-functional. Need to:
- Create a `newsletter_subscribers` table
- Wire up the email input and subscribe button

### 3. Auto-Generate Member IDs
The `memberships` table requires a `member_id` (NOT NULL), but there's no auto-generation logic. When an admin approves an application, a member ID like `CIPM-ABJ-0001` should be generated automatically.

---

## High Priority

### 4. Admin Settings Page Not Functional
`SettingsPage.tsx` is entirely static UI -- none of the "Save" buttons do anything. Options:
- Create a `settings` table to persist branch info, fees, notification preferences
- Wire up all save buttons

### 5. Gallery Admin Upload
The public gallery page uses hardcoded static images. Need to:
- Create a `gallery_images` table
- Add upload functionality in admin dashboard
- Make the public gallery page fetch from the database

### 6. Email System (RESEND_API_KEY)
The `send-email` edge function gracefully skips when `RESEND_API_KEY` is not configured, but no actual emails are being sent. You need to configure a Resend API key to enable payment confirmations, application notifications, and event registration emails.

---

## Medium Priority

### 7. Password Reset Flow
`ForgotPasswordPage.tsx` exists but should be verified end-to-end to ensure the reset email is sent and the callback URL works correctly.

### 8. Application Review Workflow
When an admin approves an application, the system should automatically:
- Create a membership record with auto-generated member ID
- Send an approval email to the applicant

### 9. Error Handling & Loading States
Several pages may lack proper error boundaries or loading fallbacks for edge cases (empty states, network failures).

### 10. Mobile Responsiveness Audit
Verify all pages (especially admin dashboard, forum post detail, event payment) render well on mobile viewports.

---

## Summary Count

| Priority | Count |
|----------|-------|
| Critical | 3 |
| High | 3 |
| Medium | 4 |
| **Total** | **10** |

The top 3 items (contact form, newsletter, member ID generation) are the most impactful for a production-ready launch. Would you like me to implement any or all of these?

