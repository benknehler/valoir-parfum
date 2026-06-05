export function AdminButton({
  children,
  variant = 'primary',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' }) {
  const classes = {
    primary: 'border-slate-950 bg-slate-950 text-white hover:bg-slate-800',
    secondary: 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
    danger: 'border-red-600 bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      {...props}
      className={`inline-flex min-h-10 items-center justify-center rounded-xl border px-4 text-sm font-semibold transition-colors disabled:opacity-50 ${classes[variant]} ${props.className || ''}`}
    >
      {children}
    </button>
  );
}
