// app/data/curriculum/ib.ts
import type { CurriculumConfig } from './types';

const ib: CurriculumConfig = {
  slug: 'ib-tutoring-dubai',
  primaryKeyword: 'IB tutor Dubai',

  hero: {
    badge: 'IB Diploma Programme',
    headline: 'Expert IB Tutor Dubai — Achieve 40+ With Personalised 1-on-1 Support',
    subheadline: 'Specialist IB tutors for all DP subjects across Dubai, Abu Dhabi & Sharjah.',
    description:
      'proTutor360 connects IB Diploma Programme students in Dubai, Abu Dhabi, and Sharjah with verified IB tutors who have first-hand teaching and examining experience. Whether you are aiming for a 7 in HL Mathematics, struggling with Theory of Knowledge, or pushing your Extended Essay to the highest mark band, our specialist IB tutors build a personalised study plan around your exact subjects and exam calendar. Every session is live, 1-on-1, and delivered online so your IB tutor Dubai can meet you wherever you are. Start with a free diagnostic consultation and take the first step toward 40 points and beyond.',
  },

  why: {
    heading: 'Why Dubai IB Students Choose proTutor360',
    intro:
      'The IB Diploma Programme demands more than subject knowledge — it rewards students who can think critically, manage internal assessments, and perform under exam pressure. Our tutors are built for exactly that.',
    points: [
      {
        title: 'Former IB Examiners & Teachers',
        body: 'Our IB tutors include former examiners, curriculum coordinators, and long-serving DP teachers who know every mark-band descriptor inside out. They teach the skills examiners actually reward, not just content.',
      },
      {
        title: 'Internal Assessment & Extended Essay Mentoring',
        body: 'IA moderation and EE supervision are where IB students most need expert guidance yet receive the least. proTutor360 tutors provide structured, subject-specific support for every stage of both assignments.',
      },
      {
        title: 'Full-Score Strategy for Theory of Knowledge',
        body: 'TOK trips up high-achieving students who underestimate it. Our TOK specialists coach students through exhibition planning, essay construction, and the conceptual thinking that earns top scores.',
      },
      {
        title: 'Session-by-Session Progress Reports',
        body: 'After every session parents and students receive a structured report mapping work covered to IB assessment objectives — so you always know exactly where your child stands.',
      },
    ],
  },

  subjects: {
    heading: 'IB Subjects We Cover in Dubai',
    groups: [
      {
        label: 'Group 1 — Studies in Language & Literature',
        items: ['English A: Language & Literature', 'English A: Literature', 'Arabic A: Language & Literature'],
      },
      {
        label: 'Group 2 — Language Acquisition',
        items: ['French B', 'Spanish B', 'Arabic B', 'Mandarin B'],
      },
      {
        label: 'Group 3 — Individuals & Societies',
        items: ['Economics', 'History', 'Psychology', 'Business Management', 'Global Politics', 'Geography'],
      },
      {
        label: 'Group 4 — Sciences',
        items: ['Biology', 'Chemistry', 'Physics', 'Computer Science', 'Environmental Systems & Societies'],
      },
      {
        label: 'Group 5 — Mathematics',
        items: ['Mathematics: Analysis & Approaches (AA) SL/HL', 'Mathematics: Applications & Interpretation (AI) SL/HL'],
      },
      {
        label: 'Core Components',
        items: ['Theory of Knowledge (TOK)', 'Extended Essay (EE)', 'Visual Arts', 'Music'],
      },
    ],
  },

  faqs: [
    {
      question: 'What IB scores do your tutors help students achieve?',
      answer:
        'Our IB students in Dubai and across the UAE regularly move from predicted scores in the 28–34 range to final scores of 38–42. Students targeting elite universities in the UK and US have achieved 44 and above with structured support from our IB tutors. Results depend on starting point, effort, and time invested, but our subject-specialist approach consistently produces measurable grade improvements.',
    },
    {
      question: 'Do you support IB Internal Assessments (IAs)?',
      answer:
        'Yes — Internal Assessment support is one of the areas where proTutor360 adds the most value. Our tutors guide students through topic selection, research design, data analysis, and the specific formatting requirements for each subject\'s IA. Because our tutors include former IB examiners, they know precisely what moderators look for and how to maximise marks in each mark band.',
    },
    {
      question: 'Can you help with the Extended Essay?',
      answer:
        'Absolutely. The Extended Essay is a 4,000-word independent research project worth up to 3 bonus points toward the diploma. Our EE mentors help students choose a focused research question, structure their argument, meet EE assessment criteria, and prepare for the mandatory Researcher\'s Reflection Space (RRS) process. Support is available across all six IB subject groups.',
    },
    {
      question: 'How many sessions per week does an IB student need?',
      answer:
        'Most IB students in Dubai benefit from 2–4 sessions per week across their Higher Level subjects, with additional sessions during the internal assessment and exam revision periods. After the initial diagnostic assessment, your tutor will recommend a session cadence tailored to your child\'s subjects, current grade, and target. There is no minimum commitment — families scale up or down as needed.',
    },
    {
      question: 'When should a student start IB tutoring?',
      answer:
        'Ideally at the start of Year 12, before gaps compound. However, we work successfully with students who join in Year 13 ahead of mocks and final exams. Students struggling with specific units benefit from targeted tutoring at any point during the programme. If your child is still in Year 10 or 11 (MYP), early support builds the academic habits that make the DP transition far smoother.',
    },
    {
      question: 'Do you offer IB tutoring online for students outside Dubai?',
      answer:
        'Yes. All proTutor360 sessions are delivered online via live video call with an interactive whiteboard, so students in Abu Dhabi, Sharjah, Ajman, and across the UAE — and internationally — can access the same IB tutors as students in Dubai. Online delivery also makes it easier to match students with the most qualified specialist for their specific subject, regardless of geography.',
    },
    {
      question: 'How do I verify my child\'s IB tutor is qualified?',
      answer:
        'Every tutor in the proTutor360 network is vetted through credential verification, a subject-knowledge assessment, and a structured interview. For IB, we specifically confirm prior IBDP teaching or examining experience and subject-specific DP training. You can request a tutor bio and qualification summary before your first session — transparency is a core part of how we operate.',
    },
  ],

  cta: {
    heading: 'Ready to Target 40+ Points? Book Your Free IB Consultation',
    subheading: 'Tell us your subjects and current predicted grade — we will match you with the right IB tutor Dubai within 24 hours.',
  },

  internalLinks: [
    { label: 'IGCSE Tutoring Dubai', href: '/igcse-tutoring-dubai' },
    { label: 'CBSE Tutoring UAE', href: '/cbse-tutoring-dubai' },
    { label: 'SAT & ACT Prep Dubai', href: '/sat-act-prep-dubai' },
  ],

  schema: {
    courseName: 'IB Diploma Programme Tutoring in Dubai',
    courseDescription:
      'Expert 1-on-1 IB tutoring for all Diploma Programme subjects in Dubai. Specialist IB tutors covering Groups 1–6 plus TOK, EE, and IA support.',
    educationalLevel: 'Upper Secondary',
    priceRange: 'AED 250–450 per session',
  },
};

export default ib;
