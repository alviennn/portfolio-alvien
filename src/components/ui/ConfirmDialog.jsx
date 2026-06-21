export default function ConfirmDialog({ open, title, message, onConfirm, onCancel, loading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div className="w-full max-w-sm bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-2xl p-6">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-light-muted dark:text-dark-muted">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="btn-secondary px-5 py-2 text-sm" disabled={loading}>
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2 rounded-full text-sm font-medium bg-red-500 text-white hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? 'Menghapus...' : 'Hapus'}
          </button>
        </div>
      </div>
    </div>
  );
}
