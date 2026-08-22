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

const SITE_URL = 'https://www.protutor360.com';
const SITE_TITLE = 'proTutor360 | Online Tutoring in UAE for IB, IGCSE, CBSE & More';
const SITE_DESCRIPTION =
  "Personalized 1-on-1 online tutoring for students in the UAE across IB, IGCSE, CBSE, ICSE and more. Expert mentors, custom learning pathways, and proven results.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | proTutor360',
  },
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
    'private tutor UAE',
    'online tutor Dubai',
    'IB Math tutor',
    'IGCSE Science tutor',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: 'proTutor360',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/hero-illustration.jpg`,
        width: 1200,
        height: 630,
        alt: 'proTutor360 – Online Tutoring in UAE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/hero-illustration.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
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
              '@type': ['EducationalOrganization', 'LocalBusiness'],
              name: 'proTutor360',
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              description: SITE_DESCRIPTION,
              telephone: '+971552043002',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Executive Tower, Business Bay',
                addressLocality: 'Dubai',
                addressRegion: 'Dubai',
                addressCountry: 'AE',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 25.1872,
                longitude: 55.2652,
              },
              areaServed: [
                { '@type': 'City', name: 'Dubai' },
                { '@type': 'City', name: 'Abu Dhabi' },
                { '@type': 'City', name: 'Sharjah' },
                { '@type': 'Country', name: 'United Arab Emirates' },
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Online Tutoring Services',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IB Tutoring' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IGCSE Tutoring' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CBSE Tutoring' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ICSE Tutoring' } },
                ],
              },
              sameAs: [
                'https://www.facebook.com/share/18APFT2B9b/',
                'https://www.instagram.com/protutorthreesixtydegree',
              ],
            }),
          }}
        />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
