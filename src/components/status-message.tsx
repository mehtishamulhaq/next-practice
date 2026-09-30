import Link from 'next/link';

type StatusMessageProps = {
  title: string;
  description?: string;
  variant?: 'error' | 'info';
  action?: { label: string; href: string };
};

const VARIANT_STYLES = {
  error: {
    icon: '!',
    iconClass: 'bg-red-100 text-red-600',
    titleClass: 'text-red-600',
  },
  info: {
    icon: 'i',
    iconClass: 'bg-teal-100 text-teal-600',
    titleClass: 'text-teal-600',
  },
};

const StatusMessage = ({
  title,
  description,
  variant = 'error',
  action,
}: StatusMessageProps) => {
  const styles = VARIANT_STYLES[variant];

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className="flex justify-center items-center px-4 py-16"
    >
      <div className="flex flex-col items-center gap-4 max-w-md text-center">
        <span
          className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold ${styles.iconClass}`}
        >
          {styles.icon}
        </span>
        <h1 className={`text-2xl font-semibold ${styles.titleClass}`}>
          {title}
        </h1>
        {description && <p className="text-gray-600">{description}</p>}
        {action && (
          <Link
            className="px-4 py-2 bg-teal-500 text-white rounded-xl text-center text-lg font-semibold"
            href={action.href}
          >
            {action.label}
          </Link>
        )}
      </div>
    </div>
  );
};

export default StatusMessage;
