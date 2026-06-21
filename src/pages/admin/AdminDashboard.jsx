import AdminLayout from './AdminLayout';
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection';
import { projectsService, certificationsService, experiencesService } from '../../services/firestoreService';

function StatCard({ label, value, loading }) {
  return (
    <div className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-2xl p-6">
      <p className="text-sm text-light-muted dark:text-dark-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold">
        {loading ? '—' : value}
      </p>
    </div>
  );
}

export default function AdminDashboard() {
  const { data: projects, loading: loadingProjects } = useFirestoreCollection(projectsService);
  const { data: certifications, loading: loadingCerts } = useFirestoreCollection(certificationsService);
  const { data: experiences, loading: loadingExp } = useFirestoreCollection(experiencesService);

  return (
    <AdminLayout title="Dashboard">
      <div className="grid sm:grid-cols-3 gap-6">
        <StatCard label="Total Projects" value={projects.length} loading={loadingProjects} />
        <StatCard label="Total Certifications" value={certifications.length} loading={loadingCerts} />
        <StatCard label="Total Experiences" value={experiences.length} loading={loadingExp} />
      </div>

      <div className="mt-10 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-2xl p-6">
        <h2 className="font-display font-semibold">Selamat datang, Admin 👋</h2>
        <p className="mt-2 text-sm text-light-muted dark:text-dark-muted max-w-prose">
          Gunakan menu di sidebar untuk mengelola konten Projects, Certifications, dan Experience.
          Setiap konten wajib diisi dalam dua bahasa (Inggris dan Indonesia) agar tampil dengan benar
          di halaman publik.
        </p>
      </div>
    </AdminLayout>
  );
}
