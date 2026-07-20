'use server';

export type ActionState = {
  success: boolean;
  error?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP_REGEX = /^[+\d][\d\s-]{6,20}$/;

export async function submitLead(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  try {
    // 1. Honeypot check (field name: "company")
    const honeypot = formData.get('company');
    if (honeypot && typeof honeypot === 'string' && honeypot.trim().length > 0) {
      console.log('Honeypot field filled. Silently ignoring submission.');
      return { success: true };
    }

    // 2. Extract and trim fields
    const role = (formData.get('role') as string || '').trim().toLowerCase();
    const fullName = (formData.get('fullName') as string || '').trim();
    const email = (formData.get('email') as string || '').trim();
    const whatsapp = (formData.get('whatsapp') as string || '').trim();

    // 3. Validation Rules
    if (role !== 'student' && role !== 'parent') {
      return { success: false, error: 'Please select a valid role (Student or Parent).' };
    }

    if (!fullName) {
      return { success: false, error: 'Full Name is required.' };
    }
    if (fullName.length > 100) {
      return { success: false, error: 'Full Name must be under 100 characters.' };
    }

    if (!email) {
      return { success: false, error: 'Email address is required.' };
    }
    if (!EMAIL_REGEX.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (!whatsapp) {
      return { success: false, error: 'WhatsApp Number is required.' };
    }
    if (!WHATSAPP_REGEX.test(whatsapp)) {
      return { success: false, error: 'Please enter a valid WhatsApp Number (e.g. +91 98765 43210).' };
    }

    // 4. Fetch the webhook URL
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('Missing GOOGLE_SHEETS_WEBHOOK_URL environment variable.');
      return {
        success: false,
        error: 'System configuration error. Please try again later or contact us directly.',
      };
    }

    // 5. Send data to Google Sheets Apps Script Web App
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        role,
        fullName,
        email,
        whatsapp,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script responded with status: ${response.status}`);
    }

    const responseData = await response.json().catch(() => ({}));
    if (responseData.status !== 'ok') {
      throw new Error('Google Apps Script response status was not ok.');
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting lead:', error);
    return {
      success: false,
      error: 'Something went wrong while submitting your request. Please try again.',
    };
  }
}
