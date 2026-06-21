import { useState } from 'react';

const EMPTY_FORM = {
  title_en: '',
  title_id: '',
  issuer: '',
  description_en: '',
  description_id: '',
  issueDate: '',
  credentialLink: '',
  certificateImage: '',
};

export default function CertificationForm({ initialData, onSubmit, onCancel, submitting }) {
  const [tab, setTab] = useState('en');
  const [form, setForm] = useState(() => ({ ...EMPTY_FORM, ...(initialData || {}) }));
  const [warning, setWarning] = useState('');

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const missingEn = !form.title_en || !form.description_en;
    const missingId = !form.title_id || !form.description_id;

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
    onSubmit(form);
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
      <div className="flex border-b border-light-border dark:border-dark-border">
        {['en', 'id'].map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setTab(lang)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors duration-200 ${
              tab === lang ? 'border-accent-green text-accent-green' : 'border-transparent text-light-muted dark:text-dark-muted'
            }`}
          >
            {lang === 'en' ? 'English Content' : 'Konten Indonesia'}
          </button>
        ))}
      </div>

      {tab === 'en' ? renderFields('en') : renderFields('id')}

      <div className="pt-4 border-t border-light-border dark:border-dark-border space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Issuer</label>
          <input
            value={form.issuer}
            onChange={handleChange('issuer')}
            className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-accent-green/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Issue Date</label>
          <input
            type="month"
            value={form.issueDate}
            onChange={handleChange('issueDate')}
            className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-accent-green/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Credential Link</label>
          <input
            value={form.credentialLink}
            onChange={handleChange('credentialLink')}
            placeholder="https://..."
            className="w-full px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-accent-green/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Certificate Image URL</label>
          <input
            value={form.certificateImage}
            onChange={handleChange('certificateImage')}
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
