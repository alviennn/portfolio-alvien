import { useState } from 'react';
import AdminLayout from './AdminLayout';
import ExperienceForm from '../../components/admin/ExperienceForm';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection';
import { experiencesService } from '../../services/firestoreService';
import { useToast } from '../../context/ToastContext';

export default function AdminExperience() {
  const { data, loading, error, refetch } = useFirestoreCollection(experiencesService);
  const { showToast } = useToast();

  const [isFormOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const openCreate = () => {
    setEditingItem(null);
    setFormOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setFormOpen(true);
  };

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (editingItem) {
        await experiencesService.update(editingItem.id, payload);
        showToast('Pengalaman berhasil diperbarui.');
      } else {
        await experiencesService.create(payload);
        showToast('Pengalaman berhasil ditambahkan.');
      }
      setFormOpen(false);
      refetch();
    } catch (err) {
      showToast('Gagal menyimpan pengalaman.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await experiencesService.remove(deleteTarget.id);
      showToast('Pengalaman berhasil dihapus.');
      setDeleteTarget(null);
      refetch();
    } catch (err) {
      showToast('Gagal menghapus pengalaman.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout title="Experience">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-light-muted dark:text-dark-muted">
          Kelola riwayat pengalaman yang ditampilkan di halaman publik.
        </p>
        <button onClick={openCreate} className="btn-primary px-5 py-2.5 text-sm">
          + Tambah Pengalaman
        </button>
      </div>

      <div className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-2xl overflow-hidden">
        {loading && <p className="p-6 text-sm text-light-muted dark:text-dark-muted">Memuat data...</p>}
        {error && <p className="p-6 text-sm text-red-500">Gagal memuat data.</p>}
        {!loading && !error && data.length === 0 && (
          <p className="p-6 text-sm text-light-muted dark:text-dark-muted">Belum ada data pengalaman.</p>
        )}

        {!loading && !error && data.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-light-border dark:border-dark-border text-left text-light-muted dark:text-dark-muted">
                <th className="px-6 py-3 font-medium">Title (EN)</th>
                <th className="px-6 py-3 font-medium">Company</th>
                <th className="px-6 py-3 font-medium">Period</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b border-light-border dark:border-dark-border last:border-0">
                  <td className="px-6 py-4 font-medium">{item.title_en}</td>
                  <td className="px-6 py-4 text-light-muted dark:text-dark-muted">{item.company}</td>
                  <td className="px-6 py-4 text-light-muted dark:text-dark-muted">
                    {item.startDate} — {item.endDate || 'Present'}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button onClick={() => openEdit(item)} className="font-medium hover:text-accent-green">
                      Edit
                    </button>
                    <button onClick={() => setDeleteTarget(item)} className="font-medium text-red-500 hover:opacity-80">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8 overflow-y-auto">
          <div className="w-full max-w-2xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-2xl p-6 md:p-8 my-auto">
            <h2 className="font-display text-lg font-semibold mb-6">
              {editingItem ? 'Edit Pengalaman' : 'Tambah Pengalaman'}
            </h2>
            <ExperienceForm
              initialData={editingItem}
              onSubmit={handleSubmit}
              onCancel={() => setFormOpen(false)}
              submitting={submitting}
            />
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus Pengalaman"
        message={`Apakah Anda yakin ingin menghapus "${deleteTarget?.title_en}"? Tindakan ini tidak dapat dibatalkan.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </AdminLayout>
  );
}
