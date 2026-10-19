import type { Metadata } from 'next';
import LegalPage, { LEGAL_EMAIL, LegalSection } from '../components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How ProTutor360 collects, uses and protects personal information from students, parents and visitors.',
  alternates: { canonical: 'https://www.ProTutor360.com/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="ProTutor360 provides online tutoring to students in the UAE. This policy explains what personal information we collect, why, and the choices you have."
    >
      <LegalSection title="Who we are">
        <p>
          ProTutor360 Education Inc. (&ldquo;ProTutor360&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates this website
          and the tutoring services and online class dashboard offered through it. Our office is at VUNE2821, Compass
          building - Al Hulaila, Al Hulaila Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates. Contact us at{' '}
          <a className="text-accent-blue underline" href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
        </p>
      </LegalSection>

      <LegalSection title="Information we collect">
        <ul>
          <li><strong>Enquiry forms:</strong> your role (student or parent), full name, email address, WhatsApp or mobile number, and, where requested, the student&rsquo;s grade and curriculum.</li>
          <li><strong>Messages:</strong> anything you send us on WhatsApp, email or through a form.</li>
          <li><strong>Class dashboard (enrolled students, parents and teachers):</strong> name, email, phone number, grade or subjects, class schedules and attendance, availability, lesson credits, and messages exchanged with our admin team.</li>
          <li><strong>Google account sign-in:</strong> when you sign in with Google we receive your name and email address to match you to the account we created for you. We do not read your Gmail, Drive or contacts.</li>
          <li><strong>Technical data:</strong> basic request data such as IP address and browser type, processed by our hosting providers to deliver and secure the site. A small browser-storage flag remembers if you dismissed our enquiry pop-up.</li>
        </ul>
        <p>We do not knowingly collect information directly from children under 13 without a parent or guardian&rsquo;s involvement. Parents may enquire and manage enrolment on behalf of their child.</p>
      </LegalSection>

      <LegalSection title="How we use it">
        <ul>
          <li>To respond to enquiries and arrange trial sessions and consultations.</li>
          <li>To schedule and deliver classes, including creating Google Calendar events and Google Meet links and emailing invitations.</li>
          <li>To track attendance and lesson credits, handle queries and improve our tutoring.</li>
          <li>To keep our services secure, prevent misuse and meet legal obligations.</li>
        </ul>
        <p>We do not sell personal information and we do not use it for third-party advertising.</p>
      </LegalSection>

      <LegalSection title="Google user data">
        <p>
          Our class scheduling uses the Google Calendar API through a single ProTutor360-managed Google account to create,
          update and cancel class events and Meet links, with students and teachers added as attendees. We access only the
          calendar of that account and only the data needed to schedule classes. Use of information received from Google
          APIs adheres to the Google API Services User Data Policy, including its Limited Use requirements.
        </p>
      </LegalSection>

      <LegalSection title="Who we share it with">
        <p>We share information only with service providers that help us operate, under appropriate safeguards:</p>
        <ul>
          <li>Google (Sheets for enquiry records, Calendar and Meet for classes, and sign-in).</li>
          <li>Supabase (database and authentication hosting for the class dashboard).</li>
          <li>Our website hosting and messaging providers (for example WhatsApp).</li>
          <li>The assigned teacher sees the details needed to teach a class, such as student name and schedule. Students do not see other students in a class.</li>
        </ul>
        <p>We may also disclose information if required by law or to protect rights and safety.</p>
      </LegalSection>

      <LegalSection title="International processing and retention">
        <p>Our providers may process data outside the UAE. We keep personal information only as long as needed for the purposes above, for example while a student is enrolled and for a reasonable period afterwards for records, then delete or anonymise it. Enquiry records that do not lead to enrolment are deleted within a reasonable time.</p>
      </LegalSection>

      <LegalSection title="Security">
        <p>We use access controls, role-based permissions and encrypted connections. No online service is completely secure, so we cannot guarantee absolute security.</p>
      </LegalSection>

      <LegalSection title="Your choices and rights">
        <p>
          You can ask to access, correct, export or delete your personal information, or object to how we use it, by
          emailing <a className="text-accent-blue underline" href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>. We will
          respond within a reasonable time and in line with applicable UAE data protection law. You can revoke
          ProTutor360&rsquo;s access to your Google account at any time in your Google Account security settings.
        </p>
      </LegalSection>

      <LegalSection title="Changes and contact">
        <p>We may update this policy and will change the date above when we do. Questions: <a className="text-accent-blue underline" href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.</p>
      </LegalSection>
    </LegalPage>
  );
}
