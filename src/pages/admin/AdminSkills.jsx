import { useState } from "react";
import AdminLayout from "./AdminLayout";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { skillsService } from "../../services/firestoreService";

const initialForm = {
  name: "",
  category_en: "",
  category_id: "",
  level: "",
  order: "",
};

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
      alert("Failed to save skill.");
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
    const confirmed = window.confirm("Delete this skill?");
    if (!confirmed) return;

    try {
      await skillsService.remove(id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete skill.");
    }
  };

  const sortedSkills = [...skills].sort((a, b) => {
    return (a.order || 0) - (b.order || 0);
  });

  return (
    <AdminLayout title="Skills">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-light-border bg-light-bg p-6 dark:border-dark-border dark:bg-dark-bg"
        >
          <h2 className="font-display text-xl font-semibold">
            {editingId ? "Edit Skill" : "Add Skill"}
          </h2>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Skill Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="React"
                className="mt-2 w-full rounded-xl border border-light-border bg-transparent px-4 py-3 text-sm outline-none dark:border-dark-border"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Category EN</label>
              <input
                type="text"
                name="category_en"
                value={form.category_en}
                onChange={handleChange}
                placeholder="Frontend"
                className="mt-2 w-full rounded-xl border border-light-border bg-transparent px-4 py-3 text-sm outline-none dark:border-dark-border"
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
                className="mt-2 w-full rounded-xl border border-light-border bg-transparent px-4 py-3 text-sm outline-none dark:border-dark-border"
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
                className="mt-2 w-full rounded-xl border border-light-border bg-transparent px-4 py-3 text-sm outline-none dark:border-dark-border"
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
                className="mt-2 w-full rounded-xl border border-light-border bg-transparent px-4 py-3 text-sm outline-none dark:border-dark-border"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-light-text px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60 dark:bg-dark-text dark:text-black"
            >
              {saving ? "Saving..." : editingId ? "Update Skill" : "Add Skill"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-light-border px-5 py-2.5 text-sm font-medium dark:border-dark-border"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="rounded-2xl border border-light-border bg-light-bg p-6 dark:border-dark-border dark:bg-dark-bg">
          <h2 className="font-display text-xl font-semibold">Skill List</h2>

          <div className="mt-6 space-y-3">
            {loading && (
              <p className="text-sm text-light-muted dark:text-dark-muted">
                Loading skills...
              </p>
            )}

            {error && (
              <p className="text-sm text-red-500">
                Failed to load skills.
              </p>
            )}

            {!loading && !error && sortedSkills.length === 0 && (
              <p className="text-sm text-light-muted dark:text-dark-muted">
                No skills added yet.
              </p>
            )}

            {!loading &&
              !error &&
              sortedSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-light-border p-4 dark:border-dark-border"
                >
                  <div>
                    <h3 className="font-medium">{skill.name}</h3>
                    <p className="mt-1 text-sm text-light-muted dark:text-dark-muted">
                      {skill.category_en} / {skill.category_id}
                      {skill.level ? ` • ${skill.level}` : ""}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(skill)}
                      className="text-sm font-medium hover:text-accent-green"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(skill.id)}
                      className="text-sm font-medium text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}