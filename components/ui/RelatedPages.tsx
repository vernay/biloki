import Link from 'next/link';

interface RelatedLink {
  href: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface RelatedPagesProps {
  title?: string;
  links: RelatedLink[];
  className?: string;
}

export default function RelatedPages({ 
  title = "Pages connexes", 
  links,
  className = ""
}: RelatedPagesProps) {
  if (!links || links.length === 0) return null;

  return (
    <section className={`bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-md ${className}`}>
      <div className="bg-[#04a4ff] text-white rounded-xl p-6 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          {title}
        </h2>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-[#04a4ff] hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              {link.icon ? (
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#e0f2fe] flex items-center justify-center text-[#04a4ff] group-hover:bg-[#04a4ff] group-hover:text-white transition-colors">
                  {link.icon}
                </div>
              ) : (
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#e0f2fe] flex items-center justify-center group-hover:bg-[#04a4ff] transition-colors">
                  <svg className="w-5 h-5 text-[#04a4ff] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-[#04a4ff] transition-colors mb-1">
                  {link.title}
                </h3>
                {link.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {link.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
