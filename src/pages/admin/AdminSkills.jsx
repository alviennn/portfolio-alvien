import { useState } from "react";
import AdminLayout from "./AdminLayout";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { skillsService } from "../../services/firestoreService";
import { getTechLogo } from "../../utils/techlogo";

const initialForm = {
  name: "",
  category_en: "",
  category_id: "",
  level: "",
  order: "",
};

function TechLogoPreview({ name }) {
  const logo = getTechLogo(name);

  return (
    <div className="mt-3 flex items-center gap-3 rounded-xl border border-light-border bg-light-bgSecondary p-3 dark:border-dark-border dark:bg-dark-bgSecondary">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-light-bg dark:bg-dark-bg">
        {logo ? (
          <img
            src={logo}
            alt={name}
            className="h-7 w-7 object-contain"
            loading="lazy"
          />
        ) : (
          <span className="text-[10px] font-medium text-light-muted dark:text-dark-muted">
            Logo
          </span>
        )}
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-medium">
          {name || "Tech stack name"}
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-light-muted dark:text-dark-muted">
          Logo otomatis muncul jika nama cocok dengan file di folder techlogo.
        </p>
      </div>
    </div>
  );
}

export default function AdminSkills() {
  const { data: skills, loading, error } = useFirestoreCollection(skillsService);

  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.category_en || !form.category_id) {
      alert("Name, Category EN, and Category ID are required.");
      return;
    }

    setSaving(true);

    const payload = {
      name: form.name.trim(),
      category_en: form.category_en.trim(),
      category_id: form.category_id.trim(),
      level: form.level.trim(),
      order: Number(form.order) || 0,
    };

    try {
      if (editingId) {
        await skillsService.update(editingId, payload);
      } else {
        await skillsService.create(payload);
      }

      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to save tech stack.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);

    setForm({
      name: skill.name || "",
      category_en: skill.category_en || "",
      category_id: skill.category_id || "",
      level: skill.level || "",
      order: skill.order || "",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this tech stack?");
    if (!confirmed) return;

    try {
      await skillsService.remove(id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete tech stack.");
    }
  };

  const sortedSkills = [...skills].sort((a, b) => {
    return (a.order || 0) - (b.order || 0);
  });

  return (
    <AdminLayout title="Tech Stack">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-light-border bg-light-bg p-6 dark:border-dark-border dark:bg-dark-bg"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-green">
              Tech Stack
            </p>

            <h2 className="mt-2 font-display text-xl font-semibold">
              {editingId ? "Edit Tech Stack" : "Add Tech Stack"}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-light-muted dark:text-dark-muted">
              Tambahkan nama teknologi. Logo akan muncul otomatis jika nama
              sesuai dengan file icon di folder techlogo.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Tech Stack Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="React"
                className="mt-2 w-full rounded-xl border border-light-border bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-accent-green dark:border-dark-border"
              />

              <TechLogoPreview name={form.name} />
            </div>

            <div>
              <label className="text-sm font-medium">Category EN</label>
              <input
                type="text"
                name="category_en"
                value={form.category_en}
                onChange={handleChange}
                placeholder="Frontend"
                className="mt-2 w-full rounded-xl border border-light-border bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-accent-green dark:border-dark-border"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Category ID</label>
              <input
                type="text"
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                placeholder="Frontend"
                className="mt-2 w-full rounded-xl border border-light-border bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-accent-green dark:border-dark-border"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Level</label>
              <input
                type="text"
                name="level"
                value={form.level}
                onChange={handleChange}
                placeholder="Intermediate"
                className="mt-2 w-full rounded-xl border border-light-border bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-accent-green dark:border-dark-border"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Order</label>
              <input
                type="number"
                name="order"
                value={form.order}
                onChange={handleChange}
                placeholder="1"
                className="mt-2 w-full rounded-xl border border-light-border bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-accent-green dark:border-dark-border"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-light-text px-5 py-2.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-dark-text dark:text-black"
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Tech Stack"
                  : "Add Tech Stack"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                className="rounded-full border border-light-border px-5 py-2.5 text-sm font-medium transition-colors duration-200 hover:border-accent-green hover:text-accent-green disabled:cursor-not-allowed disabled:opacity-60 dark:border-dark-border"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="rounded-2xl border border-light-border bg-light-bg p-6 dark:border-dark-border dark:bg-dark-bg">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-green">
              List
            </p>

            <h2 className="mt-2 font-display text-xl font-semibold">
              Tech Stack List
            </h2>
          </div>

          <div className="mt-6 space-y-3">
            {loading && (
              <p className="text-sm text-light-muted dark:text-dark-muted">
                Loading tech stack...
              </p>
            )}

            {error && (
              <p className="text-sm text-red-500">
                Failed to load tech stack.
              </p>
            )}

            {!loading && !error && sortedSkills.length === 0 && (
              <p className="text-sm text-light-muted dark:text-dark-muted">
                No tech stack added yet.
              </p>
            )}

            {!loading &&
              !error &&
              sortedSkills.map((skill) => {
                const logo = getTechLogo(skill.name);

                return (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-light-border p-4 transition-colors duration-200 hover:border-accent-green/50 dark:border-dark-border"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-light-bgSecondary dark:bg-dark-bgSecondary">
                        {logo ? (
                          <img
                            src={logo}
                            alt={skill.name}
                            className="h-7 w-7 object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-xs font-semibold text-accent-green">
                            {skill.name?.charAt(0)}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-medium">{skill.name}</h3>

                        <p className="mt-1 truncate text-sm text-light-muted dark:text-dark-muted">
                          {skill.category_en} / {skill.category_id}
                          {skill.level ? ` • ${skill.level}` : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(skill)}
                        className="text-sm font-medium transition-colors duration-200 hover:text-accent-green"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(skill.id)}
                        className="text-sm font-medium text-red-500 transition-opacity duration-200 hover:opacity-75"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}