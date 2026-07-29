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
      { label: 'Programmes', items: ['PYP (Gr 5–8)', 'MYP', 'DP'] },
      {
        label: 'DP Core Requirements',
        items: ['CAS Project', 'Extended Essay (EE)', 'Theory of Knowledge (TOK)'],
      },
      {
        label: 'Subjects',
        items: ['Maths', 'Physics', 'Chemistry', 'Biology', 'English', 'Spanish', 'French'],
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
        items: ['Maths', 'Physics', 'Chemistry', 'Biology', 'English', 'Spanish', 'French'],
      },
    ],
  },
  {
    id: 'ap',
    name: 'AP',
    groups: [
      {
        label: 'Subjects',
        items: ['Maths', 'Physics', 'Chemistry', 'Biology', 'English', 'Spanish', 'French'],
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
];
