import React from "react";

const BrandLogo: React.FC<{ size?: number }>
 = ({ size = 56 }) => {
  const s = size;
  return (
    <div className="mx-auto mb-4 flex items-center justify-center" aria-label="Logo VNU Advisor">
      <svg width={s} height={s} viewBox="0 0 64 64" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={`hsl(var(--brand))`} />
            <stop offset="100%" stopColor={`hsl(var(--edu-yellow))`} />
          </linearGradient>
        </defs>
        <path d="M32 8L6 20l26 12 26-12-26-12Z" fill="url(#capGrad)" opacity="0.9" />
        <path d="M32 44L12 34v8c0 6 9 10 20 10s20-4 20-10v-8L32 44Z" fill="url(#capGrad)" opacity="0.5" />
        <circle cx="54" cy="22" r="3" fill={`hsl(var(--edu-yellow))`} />
      </svg>
    </div>
  );
};

export default BrandLogo;
