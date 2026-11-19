import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export default function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'KNA SYSTEMS ENGINEERS S.A.S.',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-slate-200 p-6 text-center ${className}`}
      >
        <ShieldCheck className="w-10 h-10 text-red-500 mb-3" aria-hidden="true" />
        <p className="text-sm font-semibold tracking-tight">{fallbackTitle}</p>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
