import { useEffect, useRef, useState } from 'react';

export function SkillBar({
  label,
  value,
  color = 'brand',
  delay = 0,
}: {
  label: string;
  value: number;
  color?: 'brand' | 'cyan' | 'success';
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setWidth(value), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, delay]);

  const colorMap = {
    brand: 'from-brand-500 to-brand-600',
    cyan: 'from-cyan-400 to-cyan-500',
    success: 'from-success-400 to-success-500',
  };

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-body">{label}</span>
        <span className="text-sm font-semibold text-muted tabular-nums">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
        <div
          className={`skill-bar-fill h-full rounded-full bg-gradient-to-r ${colorMap[color]}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
