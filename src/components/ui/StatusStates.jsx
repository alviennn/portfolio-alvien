export function LoadingState({ message }) {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex items-center gap-3 text-light-muted dark:text-dark-muted text-sm">
        <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        {message}
      </div>
    </div>
  );
}

export function EmptyState({ message }) {
  return (
    <div className="flex items-center justify-center py-16 text-center">
      <p className="text-light-muted dark:text-dark-muted text-sm">{message}</p>
    </div>
  );
}

export function ErrorState({ message }) {
  return (
    <div className="flex items-center justify-center py-16 text-center">
      <p className="text-red-500 text-sm">{message}</p>
    </div>
  );
}
