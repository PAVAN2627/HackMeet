export function Avatar({
  initials,
  gradient,
  size = 'md',
  ring = true,
}: {
  initials: string;
  gradient: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  ring?: boolean;
}) {
  const sizes = {
    xs: 'w-6 h-6 text-[8px]',
    sm: 'w-8 h-8 text-[10px]',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };
  return (
    <div
      className={`${sizes[size]} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold ${
        ring ? 'ring-2 ring-white dark:ring-ink-900' : ''
      } flex-shrink-0`}
    >
      {initials}
    </div>
  );
}

export function SkillChip({
  label,
  color = 'neutral',
  size = 'md',
}: {
  label: string;
  color?: 'brand' | 'cyan' | 'success' | 'warning' | 'neutral';
  size?: 'sm' | 'md';
}) {
  const map = {
    brand: 'bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300',
    cyan: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300',
    success: 'bg-success-50 text-success-700 dark:bg-success-950/50 dark:text-success-300',
    warning: 'bg-warning-50 text-warning-700 dark:bg-warning-950/50 dark:text-warning-300',
    neutral: 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300',
  };
  const sz = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5';
  return (
    <span className={`${sz} font-medium rounded-md ${map[color]} transition-transform hover:scale-105 cursor-default`}>
      {label}
    </span>
  );
}

export function MatchRow({
  label,
  value,
  maxBarWidth = 120,
}: {
  label: string;
  value: number;
  maxBarWidth?: number;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-muted">{label}</span>
      <div className="flex items-center gap-2 flex-1 max-w-[140px]">
        <div className="h-1.5 flex-1 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400"
            style={{ width: `${value}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-body tabular-nums w-8 text-right">{value}%</span>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-body">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-ink-50 dark:bg-ink-800/50 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-ink-400 dark:text-ink-500" />
      </div>
      <h3 className="text-base font-semibold text-body mb-1">{title}</h3>
      <p className="text-sm text-muted max-w-sm">{description}</p>
    </div>
  );
}
