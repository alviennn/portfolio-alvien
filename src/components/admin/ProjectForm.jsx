import { useState } from 'react';

const EMPTY_FORM = {
  title_en: '',
  title_id: '',
  category_en: '',
  category_id: '',
  role_en: '',
  role_id: '',
  description_en: '',
  description_id: '',
  techStack: '',
  coverImage: '',
  projectLink: '',
};

export default function ProjectForm({ initialData, onSubmit, onCancel, submitting }) {
  const [tab, setTab] = useState('en');
  const [form, setForm] = useState(() => {
    if (!initialData) return EMPTY_FORM;
    return {
      ...EMPTY_FORM,
      ...initialData,
      techStack: Array.isArray(initialData.techStack) ? initialData.techStack.join(', ') : initialData.techStack || '',
    };
  });
  const [warning, setWarning] = useState('');

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const missingEn = !form.title_en || !form.category_en || !form.role_en || !form.description_en;
    const missingId = !form.title_id || !form.category_id || !form.role_id || !form.description_id;

    if (missingEn || missingId) {
      setWarning(
        missingEn && missingId
          ? 'Konten Inggris dan Indonesia belum lengkap. Mohon lengkapi kedua bahasa.'
          : missingEn
          ? 'Konten Inggris belum lengkap.'
          : 'Konten Indonesia belum lengkap.'
      );
      return;
    }

    setWarning('');
    const payload = {
      ...form,
      techStack: form.techStack
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };
    onSubmit(payload);
  };

  const renderFields = (lang) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1.5">Title ({lang.toUpperCase()})</label>
        <input
          value={form[`title_${lang}`]}
          onChange={handleChange(`title_${lang}`)}
          className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-accent-green/40"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Category ({lang.toUpperCase()})</label>
        <input
          value={form[`category_${lang}`]}
          onChange={handleChange(`category_${lang}`)}
          className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-accent-green/40"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Role ({lang.toUpperCase()})</label>
        <input
          value={form[`role_${lang}`]}
          onChange={handleChange(`role_${lang}`)}
          className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-accent-green/40"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Description ({lang.toUpperCase()})</label>
        <textarea
          rows={4}
          value={form[`description_${lang}`]}
          onChange={handleChange(`description_${lang}`)}
          className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-accent-green/40"
        />
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Language tabs */}
      <div className="flex border-b border-light-border dark:border-dark-border">
        {['en', 'id'].map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setTab(lang)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors duration-200 ${
              tab === lang
                ? 'border-accent-green text-accent-green'
                : 'border-transparent text-light-muted dark:text-dark-muted'
            }`}
          >
            {lang === 'en' ? 'English Content' : 'Konten Indonesia'}
          </button>
        ))}
      </div>

      {tab === 'en' ? renderFields('en') : renderFields('id')}

      {/* Shared fields (not language-specific) */}
      <div className="pt-4 border-t border-light-border dark:border-dark-border space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Tech Stack (comma separated)</label>
          <input
            value={form.techStack}
            onChange={handleChange('techStack')}
            placeholder="React, Tailwind CSS, TypeScript"
            className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-accent-green/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Cover Image URL</label>
          <input
            value={form.coverImage}
            onChange={handleChange('coverImage')}
            placeholder="https://..."
            className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-accent-green/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Project Link</label>
          <input
            value={form.projectLink}
            onChange={handleChange('projectLink')}
            placeholder="https://..."
            className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-accent-green/40"
          />
        </div>
      </div>

      {warning && <p className="text-sm text-amber-500">{warning}</p>}

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="btn-secondary px-5 py-2.5 text-sm" disabled={submitting}>
          Batal
        </button>
        <button type="submit" className="btn-primary px-5 py-2.5 text-sm" disabled={submitting}>
          {submitting ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </form>
  );
}
