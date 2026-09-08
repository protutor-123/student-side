// app/data/curriculum/cbse.ts
import type { CurriculumConfig } from './types';

const cbse: CurriculumConfig = {
  slug: 'cbse-tutoring-dubai',
  primaryKeyword: 'CBSE tutor UAE',

  hero: {
    badge: 'CBSE Curriculum',
    headline: 'Trusted CBSE Tutor UAE — Excel in Board Exams With 1-on-1 Expert Tutoring',
    subheadline: 'Specialist CBSE tutors for Classes 8–12 across Dubai, Abu Dhabi, Sharjah & all UAE emirates.',
    description:
      'proTutor360 provides CBSE students across the UAE with expert tutors who know the NCERT syllabus deeply and understand exactly how CBSE board exams are marked. Whether your child is in Class 8 building core concepts or in Class 12 preparing for the All India Board Exam, our specialist CBSE tutors create a personalised study plan that covers every chapter, every mark, and every potential exam question. Sessions are live, 1-on-1, and fully online — making it easy to access the best CBSE tutor UAE has available, whatever your location or school schedule. Start with a free consultation today.',
  },

  why: {
    heading: 'Why UAE CBSE Students Trust proTutor360',
    intro:
      'Thousands of Indian-curriculum students study across UAE schools each year. Succeeding in CBSE board exams from abroad requires tutors who bridge both the NCERT syllabus and the practical challenges of studying outside India.',
    points: [
      {
        title: 'Deep NCERT & CBSE Board Expertise',
        body: 'Our CBSE tutors are trained on the exact NCERT textbooks and CBSE sample papers for each class. They know which chapters carry the highest board exam weightage and how to prioritise study time in the final months before exams.',
      },
      {
        title: 'Class 8–12 Coverage Across PCM & PCB',
        body: 'We support all major CBSE streams — Science (PCM and PCB), Commerce, and Humanities — from foundational middle-school concepts through Class 12 board exam preparation. Students in competitive streams receive added focus on JEE and NEET-relevant topics.',
      },
      {
        title: 'UAE School Calendar Compatibility',
        body: 'Indian-curriculum schools in the UAE follow a schedule that differs from CBSE schools in India. Our tutors understand this and calibrate revision timelines and mock test schedules to align with your child\'s actual UAE school term.',
      },
      {
        title: 'Exam-Technique Coaching',
        body: 'CBSE board exams reward structured, step-by-step answers. Our tutors explicitly coach students in the presentation, answer format, and keyword usage that CBSE examiners mark positively — a skill that is rarely taught in school.',
      },
    ],
  },

  subjects: {
    heading: 'CBSE Subjects We Cover in the UAE',
    groups: [
      {
        label: 'Mathematics',
        items: ['Mathematics Class 8–10', 'Mathematics Class 11–12 (Standard & Basic)', 'Applied Mathematics Class 11–12'],
      },
      {
        label: 'Science (Classes 8–10)',
        items: ['Science (Physics, Chemistry & Biology combined)', 'NTSE & Olympiad Preparation'],
      },
      {
        label: 'Science Stream (Classes 11–12)',
        items: ['Physics', 'Chemistry', 'Biology (PCB)', 'Computer Science', 'Physical Education'],
      },
      {
        label: 'Commerce Stream (Classes 11–12)',
        items: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics (Commerce)'],
      },
      {
        label: 'Humanities & Languages',
        items: ['English Core', 'Hindi', 'History', 'Political Science', 'Sociology', 'Psychology'],
      },
    ],
  },

  faqs: [
    {
      question: 'Which CBSE classes do you tutor in the UAE?',
      answer:
        'proTutor360 tutors CBSE students from Class 8 through Class 12 across all UAE emirates including Dubai, Abu Dhabi, Sharjah, Ajman, Fujairah, Ras Al Khaimah, and Umm Al Quwain. We offer both subject-specific support and full-programme tutoring, adapting to each student\'s exact school and CBSE regional curriculum requirements.',
    },
    {
      question: 'Do you cover both PCM (Science) and Commerce streams?',
      answer:
        'Yes. Our tutors cover all three major CBSE streams for Classes 11 and 12: Science (both PCM and PCB combinations), Commerce, and Humanities. Within the Science stream, we also provide JEE-aligned problem-solving coaching for Physics, Chemistry, and Mathematics, and NEET-focused Biology support for students targeting medical college entry.',
    },
    {
      question: 'How do you align with UAE CBSE school schedules?',
      answer:
        'Indian-curriculum schools in the UAE typically follow a term structure and exam calendar that differs from CBSE schools in India. Our tutors are familiar with these differences and build revision and mock-exam schedules around your child\'s actual UAE school timetable — including the mid-term and annual exam periods typical of UAE CBSE schools.',
    },
    {
      question: 'Can proTutor360 help with CBSE board exam preparation?',
      answer:
        'Yes — CBSE board exam preparation is one of our specialisms. Our tutors work through the official CBSE sample papers and previous years\' question papers with students, teaching them to answer in the precise format that CBSE examiners reward. We also run timed mock tests and provide detailed mark-scheme feedback, so students are exam-ready well before the actual sitting.',
    },
    {
      question: 'Do you also prepare students for JEE and NEET alongside CBSE?',
      answer:
        'Yes. For students in the Science stream (PCM or PCB) who are targeting JEE or NEET, we offer integrated CBSE + entrance exam preparation. Our tutors cover CBSE board content first and then extend into JEE/NEET-specific problem types and difficulty levels. This ensures students perform strongly in both their board exams and competitive entrance assessments.',
    },
    {
      question: 'How many sessions per week does a CBSE Class 12 student need?',
      answer:
        'Most Class 12 CBSE students benefit from 3–5 sessions per week across their core subjects, increasing to daily sessions in the six to eight weeks before board exams. After the initial diagnostic, your tutor will recommend a schedule based on your child\'s specific subjects, current performance, and remaining time before exams.',
    },
  ],

  cta: {
    heading: 'Ready for Top Board Exam Scores? Book Your Free CBSE Consultation',
    subheading: 'Tell us your class, stream, and subjects — we will match you with the right CBSE tutor UAE within 24 hours.',
  },

  internalLinks: [
    { label: 'IB Tutoring Dubai', href: '/ib-tutoring-dubai' },
    { label: 'IGCSE Tutoring Dubai', href: '/igcse-tutoring-dubai' },
    { label: 'SAT & ACT Prep Dubai', href: '/sat-act-prep-dubai' },
  ],

  schema: {
    courseName: 'CBSE Tutoring in UAE',
    courseDescription:
      'Expert 1-on-1 CBSE tutoring across all UAE emirates. Specialist tutors covering Classes 8–12 across Science, Commerce, and Humanities streams with full board exam preparation.',
    educationalLevel: 'Secondary / Higher Secondary',
    priceRange: 'AED 180–380 per session',
  },
};

export default cbse;
