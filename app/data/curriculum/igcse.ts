// app/data/curriculum/igcse.ts
import type { CurriculumConfig } from './types';

const igcse: CurriculumConfig = {
  slug: 'igcse-tutoring-dubai',
  primaryKeyword: 'IGCSE tutor Dubai',

  hero: {
    badge: 'Cambridge IGCSE',
    headline: 'Top-Rated IGCSE Tutor Dubai — A* Results With Expert 1-on-1 Tutoring',
    subheadline: 'Specialist Cambridge IGCSE tutors for all core and extended subjects across Dubai, Abu Dhabi & Sharjah.',
    description:
      'ProTutor360 provides Cambridge IGCSE students in Dubai, Abu Dhabi, and Sharjah with specialist tutors who know the Cambridge syllabus in precise detail. From IGCSE Mathematics and Sciences to English and Humanities, our expert tutors build a customised learning plan around your child\'s current grade, target, and exam sitting. Every session is live, 1-on-1, and delivered online — making it easy to access the best IGCSE tutor Dubai has available, regardless of your location or school schedule. Begin with a free diagnostic to identify gaps and set a clear pathway to A* performance.',
  },

  why: {
    heading: 'Why ProTutor360 Is Dubai\'s Choice for IGCSE Tutoring',
    intro:
      'Cambridge IGCSE assessments are rigorous and syllabus-specific. Students who struggle often do so not for lack of intelligence but because generic tutoring ignores the precise mark-scheme language Cambridge examiners reward.',
    points: [
      {
        title: 'Cambridge Syllabus Specialists',
        body: 'Our IGCSE tutors are trained on the exact Cambridge syllabus documents for each subject, including the latest specification updates. They teach students to answer in the precise language that earns marks — not just to understand the concept.',
      },
      {
        title: 'Extended & Core Tier Expertise',
        body: 'Whether your child is on the Core or Extended tier, our tutors calibrate their sessions to the right grade boundaries and question styles. Students switching tiers mid-course receive targeted bridging support.',
      },
      {
        title: 'Past Paper & Mark Scheme Coaching',
        body: 'A* students know how to work through past papers strategically and decode mark schemes. Our tutors build this exam technique systematically, starting at least three months before the exam sitting.',
      },
      {
        title: 'Structured Progress Updates',
        body: 'Every session is followed by a brief report covering what was covered, where the student lost marks in practice, and what to focus on before the next session — keeping parents informed without the guesswork.',
      },
    ],
  },

  subjects: {
    heading: 'IGCSE Subjects We Cover in Dubai',
    groups: [
      {
        label: 'Mathematics',
        items: ['IGCSE Mathematics (0580)', 'IGCSE Additional Mathematics (0606)', 'IGCSE International Mathematics (0607)'],
      },
      {
        label: 'Sciences',
        items: ['IGCSE Biology (0610)', 'IGCSE Chemistry (0620)', 'IGCSE Physics (0625)', 'IGCSE Combined Science (0653)'],
      },
      {
        label: 'English',
        items: ['IGCSE English Language (0500)', 'IGCSE English Literature (0475)', 'IGCSE English as a Second Language (0510)'],
      },
      {
        label: 'Humanities & Social Sciences',
        items: ['IGCSE History (0470)', 'IGCSE Geography (0460)', 'IGCSE Economics (0455)', 'IGCSE Business Studies (0450)'],
      },
      {
        label: 'Computing & Other',
        items: ['IGCSE Computer Science (0478)', 'IGCSE Accounting (0452)', 'IGCSE Arabic (0508)', 'IGCSE French (0520)'],
      },
    ],
  },

  faqs: [
    {
      question: 'What IGCSE grades do ProTutor360 students typically achieve?',
      answer:
        'The majority of our IGCSE students in Dubai move at least two grade bands from their initial diagnostic level. Students starting at a C typically reach an A within two to three terms of structured tutoring. Students who begin at B and target A* frequently achieve this with four to six months of focused past-paper coaching. Individual results depend on starting point, frequency of sessions, and student effort.',
    },
    {
      question: 'Do you cover both Core and Extended tier IGCSE?',
      answer:
        'Yes. We tutor students on both the Core and Extended tier across all Cambridge IGCSE subjects. For students uncertain about which tier is right for them, our diagnostic assessment helps identify the grade trajectory on both tiers. Students switching from Core to Extended tier mid-course receive targeted bridging sessions to close the gap quickly.',
    },
    {
      question: 'How early should my child start IGCSE tutoring?',
      answer:
        'Ideally at the start of Year 10 when the IGCSE programme begins. Starting early allows tutors to build strong conceptual foundations before the exam pressure mounts in Year 11. However, students who join in Year 11 — including those preparing for May/June or October/November sittings — also see strong results with intensive exam-focused sessions. There is no wrong time to start.',
    },
    {
      question: 'Do you offer IGCSE tutoring for all Cambridge syllabuses?',
      answer:
        'Yes. ProTutor360 tutors are matched to students based on the exact Cambridge IGCSE syllabus code they are studying. We cover the main Cambridge IGCSE and Cambridge O Level syllabuses across all five subject groups. If you are unsure which syllabus your child follows, share your school\'s subject code and we will match the right specialist.',
    },
    {
      question: 'Can you help with IGCSE coursework and controlled assessments?',
      answer:
        'Yes. Many IGCSE subjects include a coursework or controlled assessment component — most notably Sciences (practical skills), English (spoken language), and Business Studies (project work). Our tutors provide structured support for these components, helping students understand the assessment criteria and produce work that scores at the top of the mark band.',
    },
    {
      question: 'Do you offer IGCSE tutoring outside Dubai?',
      answer:
        'All ProTutor360 sessions are delivered online via live video call, so students across Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, and the wider UAE can access our IGCSE tutors. We also serve international students in Kuwait, Qatar, Bahrain, and Oman who follow the Cambridge IGCSE curriculum.',
    },
  ],

  cta: {
    heading: 'Aiming for A*? Book Your Free IGCSE Consultation Today',
    subheading: 'Tell us your subject, current grade, and exam sitting — we will match you with the right IGCSE tutor Dubai within 24 hours.',
  },

  internalLinks: [
    { label: 'IB Tutoring Dubai', href: '/ib-tutoring-dubai' },
    { label: 'CBSE Tutoring UAE', href: '/cbse-tutoring-dubai' },
    { label: 'SAT & ACT Prep Dubai', href: '/sat-act-prep-dubai' },
  ],

  schema: {
    courseName: 'Cambridge IGCSE Tutoring in Dubai',
    courseDescription:
      'Expert 1-on-1 Cambridge IGCSE tutoring in Dubai for all subjects and tiers. Specialist tutors covering Mathematics, Sciences, English, Humanities, and Computing.',
    educationalLevel: 'Lower Secondary / GCSE',
    priceRange: 'AED 200–400 per session',
  },
};

export default igcse;
