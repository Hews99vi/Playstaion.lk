# WhatsApp Configuration for Repair Bookings

## Setup Instructions

To receive repair bookings via WhatsApp, you need to update the owner's WhatsApp number in the repair booking page.

### Location
File: `pages/RepairBooking.tsx`

### How to Update

1. Open `pages/RepairBooking.tsx`
2. Find the `handleSubmit` function (around line 70)
3. Look for this line:
   ```typescript
   const whatsappNumber = '94777123456'; // Replace with actual owner's WhatsApp number
   ```
4. Replace `'94777123456'` with your actual WhatsApp number

### WhatsApp Number Format

**Important:** Use international format without the `+` sign or spaces:
- ✅ Correct: `'94777123456'` (Sri Lankan number)
- ✅ Correct: `'14155551234'` (US number)
- ❌ Wrong: `'+94 77 712 3456'`
- ❌ Wrong: `'0777123456'`

### Example
```typescript
// For Sri Lankan number: +94 77 712 3456
const whatsappNumber = '94777123456';

// For US number: +1 415 555 1234
const whatsappNumber = '14155551234';

// For UK number: +44 20 1234 5678
const whatsappNumber = '442012345678';
```

## How It Works

When a customer submits a repair booking:

1. **Form is validated** - All required fields are checked
2. **WhatsApp message is created** - Contains:
   - Device type
   - Issue description
   - Customer name, email, phone
   - Delivery method (drop-off or courier)
   - AI diagnosis (if available)
   - Unique booking ID
3. **WhatsApp opens automatically** - Message is pre-filled
4. **Owner sends the message** - By clicking send in WhatsApp
5. **Confirmation shown** - Customer sees success message

## Message Format

The WhatsApp message will look like this:

```
🔧 NEW REPAIR BOOKING

📱 Device: PlayStation
⚠️ Issue: PS5 won't turn on, no lights or sounds

👤 Customer: John Doe
📧 Email: john@example.com
📞 Phone: +94 77 712 3456
🚚 Logistics: Laboratory Drop-off

🤖 AI Diagnosis: Likely power supply failure...

Booking ID: #PS-12345
```

## Testing

To test the WhatsApp integration:

1. Fill out the repair booking form completely
2. Click "BOOK REPAIR"
3. WhatsApp Web or App should open with the pre-filled message
4. Verify the message contains all the booking details
5. Send the message to yourself first to test

## Troubleshooting

**WhatsApp doesn't open:**
- Make sure WhatsApp is installed on your device
- Check that the phone number format is correct (no + or spaces)
- Try opening WhatsApp manually first

**Message is empty:**
- Check browser console for errors
- Ensure all form fields were filled correctly

**Want to change message format:**
- Edit the `message` variable in the `handleSubmit` function
- Use `\n` for line breaks
- Use emojis to make it more visual

## Privacy & Data

- No data is stored in a database
- All booking details are sent via WhatsApp only
- Customers receive confirmation on screen
- Owner receives booking via WhatsApp message

## Optional Enhancements

You can extend this system by:
- Adding email notifications (using a backend service)
- Integrating with a booking management system
- Storing bookings in a database
- Adding SMS notifications
- Creating a dashboard to track bookings
