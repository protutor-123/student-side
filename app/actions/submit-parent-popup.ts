'use server';

export type ParentPopupActionState = {
  success: boolean;
  error?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^[+\d][\d\s-]{6,20}$/;

export async function submitParentPopup(
  prevState: ParentPopupActionState | null,
  formData: FormData
): Promise<ParentPopupActionState> {
  try {
    // 1. Honeypot check (field name: "company")
    const honeypot = formData.get('company');
    if (honeypot && typeof honeypot === 'string' && honeypot.trim().length > 0) {
      console.log('Honeypot field filled. Silently ignoring submission.');
      return { success: true };
    }

    // 2. Extract and trim fields
    const mobile = (formData.get('mobile') as string || '').trim();
    const email = (formData.get('email') as string || '').trim();
    const grade = (formData.get('grade') as string || '').trim();
    const curriculum = (formData.get('curriculum') as string || '').trim();

    // 3. Validation Rules
    if (!mobile) {
      return { success: false, error: 'Mobile number is required.' };
    }
    if (!MOBILE_REGEX.test(mobile)) {
      return { success: false, error: 'Please enter a valid mobile number (e.g. +91 98765 43210).' };
    }

    if (!email) {
      return { success: false, error: 'Email address is required.' };
    }
    if (!EMAIL_REGEX.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (!grade) {
      return { success: false, error: 'Grade is required.' };
    }

    if (!curriculum) {
      return { success: false, error: 'Curriculum is required.' };
    }

    // 4. Fetch the webhook URL (same sheet/webhook as the main form; routed by formType)
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
        formType: 'parent-popup',
        mobile,
        email,
        grade,
        curriculum,
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
    console.error('Error submitting parent popup lead:', error);
    return {
      success: false,
      error: 'Something went wrong while submitting your request. Please try again.',
    };
  }
}
