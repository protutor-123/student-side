// app/data/curriculum/types.ts

export type CurriculumConfig = {
  slug: string;
  primaryKeyword: string;
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    description: string;
  };
  why: {
    heading: string;
    intro: string;
    points: { title: string; body: string }[];
  };
  subjects: {
    heading: string;
    groups: { label: string; items: string[] }[];
  };
  faqs: { question: string; answer: string }[];
  cta: {
    heading: string;
    subheading: string;
  };
  internalLinks: { label: string; href: string }[];
  schema: {
    courseName: string;
    courseDescription: string;
    educationalLevel: string;
    priceRange: string;
  };
};
