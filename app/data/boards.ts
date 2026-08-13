export type SubjectGroup = {
  label: string;
  items: string[];
};

export type Board = {
  id: string;
  name: string;
  groups: SubjectGroup[];
};

// Filler data — will be replaced/extended with the real board & subject list.
export const BOARDS: Board[] = [
  {
    id: 'ib',
    name: 'IB',
    groups: [
      { label: 'Programmes', items: ['PYP', 'MYP', 'DP'] },
      {
        label: 'DP Core Requirements',
        items: ['CAS Project', 'Extended Essay (EE)', 'Theory of Knowledge (TOK)'],
      },
      {
        label: 'Subjects',
        items: [
          'Maths',
          'Physics',
          'Chemistry',
          'Biology',
          'English',
          'Economics',
          'Business Studies',
          'Spanish',
          'French',
        ],
      },
    ],
  },
  {
    id: 'igcse',
    name: 'IGCSE',
    groups: [
      { label: 'Exam Boards', items: ['Cambridge', 'Edexcel', 'AQA'] },
      {
        label: 'Subjects',
        items: [
          'Maths',
          'Physics',
          'Chemistry',
          'Biology',
          'English',
          'Economics',
          'Business Studies',
          'Spanish',
          'French',
        ],
      },
    ],
  },
  {
    id: 'ap',
    name: 'AP',
    groups: [
      {
        label: 'Subjects',
        items: [
          'Maths',
          'Physics',
          'Chemistry',
          'Biology',
          'English',
          'Economics',
          'Business Studies',
          'Spanish',
          'French',
        ],
      },
    ],
  },
  {
    id: 'cbse',
    name: 'CBSE',
    groups: [
      {
        label: 'Grades 5–10',
        items: ['English', 'Maths', 'Science', 'EVS / Social Science', 'French'],
      },
      {
        label: 'Grades 11–12',
        items: [
          'English',
          'Maths',
          'Physics',
          'Biology',
          'Chemistry',
          'French',
          'Economics',
          'Business Studies',
          'Accountancy',
          'Computer Science',
        ],
      },
    ],
  },
  {
    id: 'icse',
    name: 'ICSE',
    groups: [
      {
        label: 'Grades 5–10 (ICSE)',
        items: [
          'English',
          'Maths',
          'Physics',
          'Chemistry',
          'Biology',
          'History & Civics',
          'Geography',
          'Computer Applications',
        ],
      },
      {
        label: 'Grades 11–12 (ISC)',
        items: [
          'English',
          'Maths',
          'Physics',
          'Chemistry',
          'Biology',
          'Economics',
          'Business Studies',
          'Accounts',
          'Computer Science',
        ],
      },
    ],
  },
  {
    id: 'vic',
    name: 'VIC',
    groups: [
      { label: 'Levels', items: ['Years 7–10', 'VCE Units 1–2', 'VCE Units 3–4'] },
      {
        label: 'Subjects',
        items: [
          'English',
          'General Maths',
          'Maths Methods',
          'Specialist Maths',
          'Physics',
          'Chemistry',
          'Biology',
          'Economics',
          'Business Studies',
          'Accounting',
        ],
      },
    ],
  },
  {
    id: 'isc',
    name: 'ISC',
    groups: [
      { label: 'Levels', items: ['Foundation', 'Advanced'] },
      {
        label: 'Subjects',
        items: [
          'English',
          'Maths',
          'Physics',
          'Chemistry',
          'Biology',
          'Economics',
          'Business Studies',
          'Accounting',
          'Computer Science',
        ],
      },
    ],
  },
];
