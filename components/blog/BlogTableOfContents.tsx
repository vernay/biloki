'use client';

import { useEffect, useState, useRef } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface BlogTableOfContentsProps {
  content: string;
  locale?: string;
  variant?: 'mobile' | 'desktop' | 'both';
}

export default function BlogTableOfContents({ 
  content, 
  locale = 'fr',
  variant = 'both' 
}: BlogTableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const activeItemRef = useRef<HTMLButtonElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [fixedPos, setFixedPos] = useState<{ top: number; right: number; width: number } | null>(null);
  const placeholderNaturalTop = useRef<number>(0);

  const title = {
    fr: 'Sommaire',
    en: 'Table of contents',
    es: 'Índice',
    pt: 'Índice'
  }[locale] || 'Sommaire';

  useEffect(() => {
    // Parse HTML content to extract headings
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3');
    
    const parsedHeadings: Heading[] = Array.from(headingElements).map((heading, index) => {
      const id = `heading-${index}`;
      const text = heading.textContent || '';
      const level = parseInt(heading.tagName.substring(1));
      
      return { id, text, level };
    });

    setHeadings(parsedHeadings);

    // Add IDs to actual DOM headings for scrolling
    const actualHeadings = document.querySelectorAll('article h2, article h3');
    actualHeadings.forEach((heading, index) => {
      heading.id = `heading-${index}`;
    });
  }, [content]);

  useEffect(() => {
    // IntersectionObserver to track which heading is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
      }
    );

    const headingElements = document.querySelectorAll('article h2, article h3');
    headingElements.forEach((element) => observer.observe(element));

    return () => {
      headingElements.forEach((element) => observer.unobserve(element));
    };
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'auto' }); // Défilement instantané
      setIsOpen(false); // Fermer l'accordion sur mobile après le clic
    }
  };

  useEffect(() => {
    if (variant !== 'desktop' && variant !== 'both') return;

    const compute = () => {
      if (!placeholderRef.current) return;
      const rect = placeholderRef.current.getBoundingClientRect();
      const naturalTop = rect.top + window.scrollY;
      placeholderNaturalTop.current = naturalTop;

      setFixedPos({
        top: Math.max(80, naturalTop - window.scrollY),
        right: window.innerWidth - rect.right,
        width: rect.width,
      });
    };

    const onScroll = () => {
      if (!placeholderRef.current) return;
      const rect = placeholderRef.current.getBoundingClientRect();
      setFixedPos(prev => prev ? {
        ...prev,
        top: Math.max(80, placeholderNaturalTop.current - window.scrollY),
      } : null);
    };

    const timer = setTimeout(compute, 150);
    window.addEventListener('resize', compute);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', compute);
      window.removeEventListener('scroll', onScroll);
    };
  }, [variant]);

  if (headings.length === 0) {
    return null;
  }

  // Version Desktop - Fixed au viewport
  const DesktopTOC = () => (
    <>
      {/* Placeholder pour maintenir l'espace dans le layout */}
      <div ref={placeholderRef} style={{ visibility: 'hidden', width: '100%' }} aria-hidden="true">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 pl-3">{title}</h2>
          <div className="pl-3 pr-2">
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <div className={`text-sm py-1.5 px-2 ${heading.level === 3 ? 'pl-5' : ''}`}>
                    {heading.text}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* TOC réel en fixed */}
      {fixedPos && (
        <div
          style={{
            position: 'fixed',
            top: `${fixedPos.top}px`,
            right: `${fixedPos.right}px`,
            width: `${fixedPos.width}px`,
            zIndex: 30,
          }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col relative"
        >
          {/* Progress bar */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gray-100 rounded-l-xl">
            <div 
              className="w-full bg-gradient-to-b from-primary to-blue-600 transition-all duration-300 rounded-l-xl"
              style={{ 
                height: headings.length > 0 
                  ? `${((headings.findIndex(h => h.id === activeId) + 1) / headings.length) * 100}%` 
                  : '0%' 
              }}
            />
          </div>
          
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 flex-shrink-0 pl-3">
            {title}
          </h2>
          <div className="pl-3 pr-2">
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <button
                    ref={activeId === heading.id ? activeItemRef : null}
                    onClick={() => handleClick(heading.id)}
                    className={`
                      block w-full text-left text-sm transition-all duration-200 leading-snug py-1.5 px-2 -ml-2 rounded-md
                      ${heading.level === 3 ? 'pl-5' : ''}
                      ${
                        activeId === heading.id
                          ? 'text-primary font-semibold bg-blue-50'
                          : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                      }
                    `}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );

  // Version Mobile - Accordion
  const MobileTOC = () => (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-blue-600 rounded-full" />
          <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            {title}
          </span>
          {activeId && (
            <span className="text-xs text-gray-500">
              ({headings.findIndex(h => h.id === activeId) + 1}/{headings.length})
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-primary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="mt-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4 max-h-96 overflow-y-auto">
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  onClick={() => handleClick(heading.id)}
                  className={`
                    block w-full text-left text-sm transition-all duration-200 leading-snug py-2 px-3 rounded-md
                    ${heading.level === 3 ? 'pl-6' : ''}
                    ${
                      activeId === heading.id
                        ? 'text-primary font-semibold bg-blue-50 border-l-2 border-primary'
                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                    }
                  `}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <>
      {(variant === 'mobile' || variant === 'both') && <MobileTOC />}
      {(variant === 'desktop' || variant === 'both') && <DesktopTOC />}
    </>
  );
}
