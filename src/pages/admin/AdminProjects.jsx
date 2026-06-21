import { useState } from 'react';
import AdminLayout from './AdminLayout';
import ProjectForm from '../../components/admin/ProjectForm';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection';
import { projectsService } from '../../services/firestoreService';
import { useToast } from '../../context/ToastContext';

export default function AdminProjects() {
  const { data, loading, error, refetch } = useFirestoreCollection(projectsService);
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
        await projectsService.update(editingItem.id, payload);
        showToast('Project berhasil diperbarui.');
      } else {
        await projectsService.create(payload);
        showToast('Project berhasil ditambahkan.');
      }
      setFormOpen(false);
      refetch();
    } catch (err) {
      showToast('Gagal menyimpan project. Coba lagi.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await projectsService.remove(deleteTarget.id);
      showToast('Project berhasil dihapus.');
      setDeleteTarget(null);
      refetch();
    } catch (err) {
      showToast('Gagal menghapus project.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout title="Projects">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-light-muted dark:text-dark-muted">
          Kelola proyek yang ditampilkan di halaman publik.
        </p>
        <button onClick={openCreate} className="btn-primary px-5 py-2.5 text-sm">
          + Tambah Project
        </button>
      </div>

      <div className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-2xl overflow-hidden">
        {loading && <p className="p-6 text-sm text-light-muted dark:text-dark-muted">Memuat data...</p>}
        {error && <p className="p-6 text-sm text-red-500">Gagal memuat data.</p>}
        {!loading && !error && data.length === 0 && (
          <p className="p-6 text-sm text-light-muted dark:text-dark-muted">Belum ada project. Tambahkan project pertama Anda.</p>
        )}

        {!loading && !error && data.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-light-border dark:border-dark-border text-left text-light-muted dark:text-dark-muted">
                <th className="px-6 py-3 font-medium">Title (EN)</th>
                <th className="px-6 py-3 font-medium">Category (EN)</th>
                <th className="px-6 py-3 font-medium">Tech Stack</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b border-light-border dark:border-dark-border last:border-0">
                  <td className="px-6 py-4 font-medium">{item.title_en}</td>
                  <td className="px-6 py-4 text-light-muted dark:text-dark-muted">{item.category_en}</td>
                  <td className="px-6 py-4 text-light-muted dark:text-dark-muted">
                    {Array.isArray(item.techStack) ? item.techStack.join(', ') : item.techStack}
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
              {editingItem ? 'Edit Project' : 'Tambah Project'}
            </h2>
            <ProjectForm
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
        title="Hapus Project"
        message={`Apakah Anda yakin ingin menghapus "${deleteTarget?.title_en}"? Tindakan ini tidak dapat dibatalkan.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </AdminLayout>
  );
}
