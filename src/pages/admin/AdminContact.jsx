import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { contactService } from "../../services/firestoreService";

const initialForm = {
  email: "alvien.rnp@gmail.com",
  linkedin: "https://www.linkedin.com/in/alvienrnp/",
  github: "https://github.com/alviennn",
  cvLink: "/cv-alvien-ridho.pdf",
};

export default function AdminContact() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await contactService.get();

        if (data) {
          setForm({
            email: data.email || "",
            linkedin: data.linkedin || "",
            github: data.github || "",
            cvLink: data.cvLink || "",
          });
        }
      } catch (error) {
        console.error("Failed to load contact:", error);
        setStatus("Failed to load contact data.");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setStatus("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.email.trim()) {
      setStatus("Email is required.");
      return;
    }

    setSaving(true);
    setStatus("");

    try {
      await contactService.update({
        email: form.email.trim(),
        linkedin: form.linkedin.trim(),
        github: form.github.trim(),
        cvLink: form.cvLink.trim(),
      });

      setStatus("Contact updated successfully.");
    } catch (error) {
      console.error("Failed to update contact:", error);
      setStatus("Failed to update contact.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Contact">
      <div className="max-w-3xl">
        <div className="rounded-2xl border border-light-border bg-light-bg p-6 dark:border-dark-border dark:bg-dark-bg">
          <div className="border-b border-light-border pb-5 dark:border-dark-border">
            <h2 className="font-display text-2xl font-semibold">
              Edit Contact
            </h2>
            <p className="mt-2 text-sm text-light-muted dark:text-dark-muted">
              Update public contact links used in the portfolio contact section.
            </p>
          </div>

          {loading ? (
            <p className="mt-6 text-sm text-light-muted dark:text-dark-muted">
              Loading contact data...
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="alvien.rnp@gmail.com"
                  className="mt-2 w-full rounded-xl border border-light-border bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-accent-green dark:border-dark-border"
                />
              </div>

              <div>
                <label className="text-sm font-medium">LinkedIn URL</label>
                <input
                  type="url"
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  placeholder="https://www.linkedin.com/in/alvienrnp/"
                  className="mt-2 w-full rounded-xl border border-light-border bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-accent-green dark:border-dark-border"
                />
              </div>

              <div>
                <label className="text-sm font-medium">GitHub URL</label>
                <input
                  type="url"
                  name="github"
                  value={form.github}
                  onChange={handleChange}
                  placeholder="https://github.com/alviennn"
                  className="mt-2 w-full rounded-xl border border-light-border bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-accent-green dark:border-dark-border"
                />
              </div>

              <div>
                <label className="text-sm font-medium">CV Link</label>
                <input
                  type="text"
                  name="cvLink"
                  value={form.cvLink}
                  onChange={handleChange}
                  placeholder="/cv-alvien-ridho.pdf"
                  className="mt-2 w-full rounded-xl border border-light-border bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-accent-green dark:border-dark-border"
                />
                <p className="mt-2 text-xs text-light-muted dark:text-dark-muted">
                  Use /cv-alvien-ridho.pdf if the CV file is stored in the public folder.
                </p>
              </div>

              {status && (
                <p className="text-sm text-light-muted dark:text-dark-muted">
                  {status}
                </p>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-light-text px-5 py-2.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-dark-text dark:text-black"
                >
                  {saving ? "Saving..." : "Save Contact"}
                </button>

                <button
                  type="button"
                  onClick={() => setForm(initialForm)}
                  disabled={saving}
                  className="rounded-full border border-light-border px-5 py-2.5 text-sm font-medium transition-colors duration-200 hover:border-accent-green hover:text-accent-green disabled:cursor-not-allowed disabled:opacity-60 dark:border-dark-border"
                >
                  Reset Default
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}