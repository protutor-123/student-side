import type { Metadata } from 'next';
import LegalPage, { LEGAL_EMAIL, LegalSection } from '../components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms that apply when you use the ProTutor360 website, tutoring services and class dashboard.',
  alternates: { canonical: 'https://www.ProTutor360.com/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These terms apply to the ProTutor360 website, our tutoring services and our class dashboard. By using them you agree to these terms."
    >
      <LegalSection title="1. Our services">
        <p>ProTutor360 Education Inc. (&ldquo;ProTutor360&rdquo;) provides online one-to-one and small-group tutoring, test preparation and related consultations. Classes are delivered online, usually through Google Meet. Descriptions on the website are general; the specifics of your programme are agreed with our team.</p>
      </LegalSection>

      <LegalSection title="2. Accounts">
        <p>Dashboard accounts are created by ProTutor360 for registered students and teachers and are accessed by signing in with the Google account we registered. You are responsible for activity on your account, must keep access to it secure, and must tell us promptly about unauthorised use. Parents or guardians are responsible for accounts of students under 18.</p>
      </LegalSection>

      <LegalSection title="3. Scheduling, attendance and lesson credits">
        <ul>
          <li>Classes are scheduled by ProTutor360 in Dubai time (GST, UTC+4) based on availability shared by students and teachers.</li>
          <li>Lessons are paid for with credits. A credit is deducted when a class is confirmed as attended, according to the cost set for that class.</li>
          <li>If a student is absent or cancels late, the credit may still be charged. If a teacher cannot attend or we cancel, the credit is not charged or is refunded.</li>
          <li>Credits and fees are agreed with ProTutor360 before enrolment. Unless required by law or agreed in writing, credits are non-transferable and refunds are at our discretion.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Acceptable use">
        <ul>
          <li>Be respectful in classes and messages. Harassment, abuse or inappropriate content is not allowed.</li>
          <li>Do not record, share or redistribute class sessions, materials or Meet links without permission.</li>
          <li>Do not attempt to access other users&rsquo; data, disrupt the service, or use it for unlawful purposes.</li>
          <li>Do not submit another person&rsquo;s details without their consent.</li>
        </ul>
        <p>We may suspend or end access if these rules are broken.</p>
      </LegalSection>

      <LegalSection title="5. Results and content">
        <p>We work hard to support every student, but academic outcomes depend on many factors and we do not guarantee particular grades, scores or admissions. Teaching materials and the website content belong to ProTutor360 or its licensors and are provided for the student&rsquo;s personal educational use.</p>
      </LegalSection>

      <LegalSection title="6. Privacy">
        <p>How we handle personal information is described in our <a className="text-accent-blue underline" href="/privacy">Privacy Policy</a>.</p>
      </LegalSection>

      <LegalSection title="7. Availability and liability">
        <p>The service is provided &ldquo;as is&rdquo;. We may change, pause or discontinue features, and online services can be interrupted. To the extent permitted by law, ProTutor360 is not liable for indirect or consequential losses, and our total liability for any claim is limited to the fees you paid for the affected services. Nothing here limits liability that cannot be limited by law.</p>
      </LegalSection>

      <LegalSection title="8. Governing law and changes">
        <p>These terms are governed by the laws of the United Arab Emirates as applied in the Emirate of Ras Al Khaimah, and the courts there have jurisdiction. We may update these terms and will change the date above; continued use after an update means you accept it.</p>
      </LegalSection>

      <LegalSection title="9. Contact">
        <p>Questions about these terms: <a className="text-accent-blue underline" href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.</p>
      </LegalSection>
    </LegalPage>
  );
}
