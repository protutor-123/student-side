import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = 'https://protutor360.com';
const SITE_TITLE = 'proTutor360 | Online Tutoring in UAE for IB, IGCSE, CBSE & More';
const SITE_DESCRIPTION =
  "Personalized 1-on-1 online tutoring for students in the UAE across IB, IGCSE, CBSE, ICSE and more. Expert mentors, custom learning pathways, and proven results.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    'online tutoring UAE',
    'IB tutors Dubai',
    'IGCSE tutoring Abu Dhabi',
    'CBSE tutors UAE',
    'ICSE online tuition',
    'home tutors Dubai',
    'online tuition Sharjah',
    'test prep UAE',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: '/',
    siteName: 'proTutor360',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/hero-illustration.jpg',
        alt: 'proTutor360 online tutoring',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/hero-illustration.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'proTutor360',
              url: SITE_URL,
              description: SITE_DESCRIPTION,
              areaServed: {
                '@type': 'Country',
                name: 'United Arab Emirates',
              },
            }),
          }}
        />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
