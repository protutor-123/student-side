'use client';

import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Curriculum', href: '#boards' },
    { label: 'Results', href: '#results' },
    { label: 'How We Work', href: '#how-we-work' },
    { label: 'About', href: '#about' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Logo / Wordmark */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold tracking-tight text-navy">
              pro<span className="text-accent-blue font-extrabold">Tutor360</span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-accent-blue"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href="#get-started"
              className="inline-flex items-center justify-center rounded-lg bg-accent-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-blue-hover hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started
            </a>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                // Close Icon
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Menu Icon
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg" id="mobile-menu">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-accent-blue transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 pb-2 border-t border-zinc-100 mt-2">
            <a
              href="#get-started"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center rounded-lg bg-accent-blue py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-blue-hover"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
