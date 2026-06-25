import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../context/AuthContext";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import {
  projectsService,
  certificationsService,
  experiencesService,
  skillsService,
} from "../../services/firestoreService";

function StatCard({ label, value, loading }) {
  return (
    <div className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-2xl p-6">
      <p className="text-sm text-light-muted dark:text-dark-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold">
        {loading ? "—" : value}
      </p>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { data: projects, loading: loadingProjects } =
    useFirestoreCollection(projectsService);
  const { data: certifications, loading: loadingCerts } =
    useFirestoreCollection(certificationsService);
  const { data: experiences, loading: loadingExp } =
    useFirestoreCollection(experiencesService);
  const { data: skills, loading: loadingSkills } = 
  useFirestoreCollection(skillsService);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AdminLayout title="Dashboard">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold">
            Admin Dashboard
          </h2>
          <p className="mt-1 text-sm text-light-muted dark:text-dark-muted">
            Manage portfolio content from one place.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex w-fit items-center justify-center rounded-full bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-85"
        >
          Logout
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <StatCard
          label="Total Projects"
          value={projects.length}
          loading={loadingProjects}
        />
        <StatCard
          label="Total Certifications"
          value={certifications.length}
          loading={loadingCerts}
        />
        <StatCard
          label="Total Experiences"
          value={experiences.length}
          loading={loadingExp}
        />
        <StatCard
          label="Total Skills"
          value={skills.length}
          loading={loadingSkills}
        />
      </div>

      <div className="mt-10 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-2xl p-6">
        <h2 className="font-display font-semibold">Selamat datang, Alvien</h2>
        <p className="mt-2 text-sm text-light-muted dark:text-dark-muted max-w-prose">
          Gunakan menu di sidebar untuk mengelola konten Projects,
          Certifications, dan Experience. Setiap konten wajib diisi dalam dua
          bahasa, yaitu Inggris dan Indonesia, agar tampil dengan benar di
          halaman publik.
        </p>
      </div>
    </AdminLayout>
  );
}