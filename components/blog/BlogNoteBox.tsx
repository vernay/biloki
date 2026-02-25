export type NoteType = 'info' | 'tip' | 'warning' | 'success';

interface BlogNoteBoxProps {
  type?: NoteType;
  title?: string;
  children: React.ReactNode;
}

export default function BlogNoteBox({ 
  type = 'info', 
  title,
  children 
}: BlogNoteBoxProps) {
  const configs = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-primary',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconColor: 'text-primary',
      titleColor: 'text-primary'
    },
    tip: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      iconColor: 'text-green-600',
      titleColor: 'text-green-700'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      iconColor: 'text-yellow-600',
      titleColor: 'text-yellow-700'
    },
    success: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconColor: 'text-emerald-600',
      titleColor: 'text-emerald-700'
    }
  };

  const config = configs[type];

  return (
    <div className={`${config.bg} ${config.border} border-l-4 rounded-r-lg p-4 my-6`}>
      <div className="flex gap-3">
        <div className={`flex-shrink-0 ${config.iconColor}`}>
          {config.icon}
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={`font-bold ${config.titleColor} mb-2`}>
              {title}
            </h4>
          )}
          <div className="text-gray-700 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
