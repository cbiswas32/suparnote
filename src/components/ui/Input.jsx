import clsx from 'clsx';

export function Input({ label, error, className, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}
      <input
        className={clsx(
          'w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all',
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900'
            : 'border-slate-200 dark:border-slate-700 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, className, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}
      <textarea
        className={clsx(
          'w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none transition-all resize-none',
          error
            ? 'border-red-400 focus:border-red-500'
            : 'border-slate-200 dark:border-slate-700 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
