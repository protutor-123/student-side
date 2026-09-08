// app/data/curriculum/sat-act.ts
import type { CurriculumConfig } from './types';

const satAct: CurriculumConfig = {
  slug: 'sat-act-prep-dubai',
  primaryKeyword: 'SAT prep Dubai',

  hero: {
    badge: 'SAT & ACT Test Prep',
    headline: 'Expert SAT Prep Dubai — Score 1500+ With Personalised 1-on-1 Coaching',
    subheadline: 'Specialist SAT and ACT tutors helping Dubai students reach US university score targets.',
    description:
      'ProTutor360 offers expert SAT prep in Dubai and across the UAE, pairing students with specialist tutors who know the College Board exam structure, scoring algorithm, and proven high-score strategies. Whether your target is 1400 for a strong US university application or 1550+ for an Ivy-League reach school, our personalised 1-on-1 SAT coaching builds the skills and test-taking strategy to get you there. We also provide ACT preparation with equal depth. All sessions are live, online, and built around a diagnostic baseline score. Book a free consultation and start your journey to your target score today.',
  },

  why: {
    heading: 'Why ProTutor360 Delivers the Best SAT Prep in Dubai',
    intro:
      'High SAT scores are not about memorising facts — they are about mastering a specific test format, recognising question patterns, and managing 3 hours of sustained focus. Our tutors are built for exactly this.',
    points: [
      {
        title: 'Diagnostic-First Approach',
        body: 'Every student begins with a full-length, timed practice SAT under realistic conditions. The diagnostic reveals precise score gaps, question-type weaknesses, and pacing problems. Your entire tutoring plan is built from this data — not from a generic curriculum.',
      },
      {
        title: 'Digital SAT & ACT Specialists',
        body: 'The SAT moved to a digital adaptive format in 2024. Our tutors are fully trained on the digital SAT platform (Bluebook), adaptive module strategy, and the new question types introduced in the digital format. ACT coaching covers all four sections with full-length proctored practice tests.',
      },
      {
        title: 'Section-Specific Score Strategy',
        body: 'Students hitting a ceiling in one section — typically Math Module 2 or Reading & Writing — receive section-specific intensive coaching. We target the exact question categories costing the most points and teach the elimination and pattern-recognition skills that crack them.',
      },
      {
        title: 'University Application Score Planning',
        body: 'Our tutors understand the SAT score ranges at US, UK, and Canadian universities, including the specific superscore and test-optional policies most relevant to UAE applicants. We help students set realistic but ambitious score targets aligned with their university shortlist.',
      },
    ],
  },

  subjects: {
    heading: 'What Our SAT & ACT Prep Covers',
    groups: [
      {
        label: 'Digital SAT — Reading & Writing',
        items: ['Information & Ideas', 'Craft & Structure', 'Expression of Ideas', 'Standard English Conventions', 'Evidence-Based Questions'],
      },
      {
        label: 'Digital SAT — Math',
        items: ['Algebra', 'Advanced Math (Quadratics, Functions)', 'Problem-Solving & Data Analysis', 'Geometry & Trigonometry', 'Module 2 Hard Problem Strategy'],
      },
      {
        label: 'ACT',
        items: ['English', 'Mathematics', 'Reading', 'Science Reasoning', 'Writing (Optional Essay)'],
      },
      {
        label: 'Test Strategy & Skills',
        items: ['Time Management & Pacing', 'Process of Elimination', 'Error Pattern Analysis', 'Full-Length Mock Tests', 'Score Report Review'],
      },
    ],
  },

  faqs: [
    {
      question: 'What SAT score improvements do ProTutor360 students typically see?',
      answer:
        'Students who complete a structured 3-month prep programme with ProTutor360 typically improve by 100–200 points from their diagnostic baseline. Students starting in the 1100–1200 range and targeting 1400+ regularly achieve their goal with consistent effort across 12–16 sessions. For students already scoring 1350+ and targeting 1500+, the improvements are smaller in scale but high-value, as each point in the upper range is harder to earn.',
    },
    {
      question: 'Do you prepare students for the new digital SAT format?',
      answer:
        'Yes. All ProTutor360 SAT coaching is built around the digital SAT format (introduced globally in March 2024) delivered through College Board\'s Bluebook platform. Our tutors are trained on the adaptive module structure — where Module 2 difficulty is determined by performance in Module 1 — and teach specific strategies for students who want to unlock the harder Module 2 to access the highest-scoring questions.',
    },
    {
      question: 'Should my child take the SAT or the ACT?',
      answer:
        'Both tests are accepted equally by US universities, so the right choice depends on your child\'s strengths. Students who are stronger in linear, structured math tend to prefer the SAT. Students with stronger science reasoning and time management skills often perform better on the ACT. We offer free diagnostic mini-tests for both exams during the initial consultation, so you can make the decision based on data rather than guesswork.',
    },
    {
      question: 'How many sessions does it take to hit a target SAT score?',
      answer:
        'Most students reach their target score with 12–20 sessions, depending on the size of the score gap and how frequently they practice between sessions. A 100-point improvement typically requires 10–14 focused sessions plus consistent independent practice. A 200+ point improvement requires 18–24 sessions across 3–4 months. We provide a projected session plan after the initial diagnostic and adjust it as the student progresses.',
    },
    {
      question: 'Can you help with SAT prep alongside IGCSE or IB schoolwork?',
      answer:
        'Yes, and this is one of the most common scenarios for our Dubai students. Many Year 12 IB and IGCSE students in Dubai take the SAT to strengthen their US university application. Our tutors coordinate SAT prep schedules around school exam calendars, IA deadlines, and EE submission dates — ensuring SAT prep does not conflict with school performance.',
    },
    {
      question: 'Do you offer group SAT prep classes or only 1-on-1 tutoring?',
      answer:
        'We offer exclusively 1-on-1 SAT and ACT tutoring. This is a deliberate choice: the diagnostic-first, individualised approach we use cannot be replicated in a group class where every student starts from a different baseline and has different question-type weaknesses. Every session is built around the specific score gaps identified in that student\'s most recent practice test.',
    },
    {
      question: 'Do you offer SAT prep for students outside Dubai?',
      answer:
        'Yes. All sessions are delivered online via live video call, so students in Abu Dhabi, Sharjah, and across the UAE access the same tutors as Dubai students. We also serve students in Qatar, Kuwait, Bahrain, and Saudi Arabia who are applying to US universities and need SAT prep with tutors familiar with the international application cycle.',
    },
  ],

  cta: {
    heading: 'Ready to Hit Your Target SAT Score? Book Your Free Consultation',
    subheading: 'Tell us your current score and target — we will build a personalised SAT prep plan and match you with the right tutor within 24 hours.',
  },

  internalLinks: [
    { label: 'IB Tutoring Dubai', href: '/ib-tutoring-dubai' },
    { label: 'IGCSE Tutoring Dubai', href: '/igcse-tutoring-dubai' },
    { label: 'CBSE Tutoring UAE', href: '/cbse-tutoring-dubai' },
  ],

  schema: {
    courseName: 'SAT & ACT Test Preparation in Dubai',
    courseDescription:
      'Expert 1-on-1 SAT and ACT preparation in Dubai and across the UAE. Personalised coaching for the digital SAT and ACT with diagnostic-first planning and full-length practice tests.',
    educationalLevel: 'Upper Secondary / Pre-University',
    priceRange: 'AED 280–480 per session',
  },
};

export default satAct;
