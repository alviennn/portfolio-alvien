// Initial content from the brief. Used as a fallback when Firestore collections
// are still empty, so the public site never looks broken on first deploy.
// Admin can later add/edit real entries via the dashboard, which will take priority.

export const seedProjects = [
  {
    id: 'seed-1',
    title_en: 'Trans Kudamas 88',
    title_id: 'Trans Kudamas 88',
    category_en: 'Website Development',
    category_id: 'Pengembangan Website',
    role_en: 'UI/UX Designer & Frontend Developer',
    role_id: 'UI/UX Designer & Frontend Developer',
    description_en:
      'A rental car website designed to present services, vehicle information, operational areas, and booking flow in a more structured and professional way.',
    description_id:
      'Website rental mobil yang dirancang untuk menampilkan layanan, informasi kendaraan, area operasional, dan alur pemesanan secara lebih terstruktur dan profesional.',
    techStack: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    coverImage: '',
    projectLink: '',
  },
  {
    id: 'seed-2',
    title_en: 'Dhruva Tech',
    title_id: 'Dhruva Tech',
    category_en: 'Company Profile Website',
    category_id: 'Website Company Profile',
    role_en: 'UI/UX Designer & Frontend Developer',
    role_id: 'UI/UX Designer & Frontend Developer',
    description_en:
      'A software house website designed to introduce digital services, strengthen business credibility, and present portfolio information through a clean and modern interface.',
    description_id:
      'Website software house yang dirancang untuk memperkenalkan layanan digital, memperkuat kredibilitas bisnis, dan menampilkan informasi portofolio melalui antarmuka yang bersih dan modern.',
    techStack: ['React', 'Tailwind CSS', 'TypeScript'],
    coverImage: '',
    projectLink: '',
  },
  {
    id: 'seed-3',
    title_en: 'Palm Oil Maturity Detection',
    title_id: 'Deteksi Kematangan Kelapa Sawit',
    category_en: 'Computer Vision Research',
    category_id: 'Riset Computer Vision',
    role_en: 'Researcher / Developer',
    role_id: 'Peneliti / Developer',
    description_en:
      'A computer vision research project focused on detecting palm oil fresh fruit bunch maturity using object detection models and web-based inference.',
    description_id:
      'Proyek riset computer vision yang berfokus pada deteksi kematangan tandan buah segar kelapa sawit menggunakan model object detection dan inferensi berbasis web.',
    techStack: ['Python', 'YOLO', 'Computer Vision'],
    coverImage: '',
    projectLink: '',
  },
];

export const seedExperiences = [
  {
    id: 'seed-1',
    title_en: 'UI/UX Designer Intern',
    title_id: 'UI/UX Designer Intern',
    company: 'Badan Pemeriksa Keuangan Republik Indonesia',
    description_en:
      'Contributed to the design of a landing page interface to support clearer, more intuitive, and user-friendly information delivery. Collaborated with developers and stakeholders to ensure the design aligned with system requirements and user needs.',
    description_id:
      'Berkontribusi dalam merancang antarmuka landing page untuk mendukung penyampaian informasi yang lebih jelas, intuitif, dan mudah digunakan. Berkolaborasi dengan developer dan stakeholder untuk memastikan desain sesuai dengan kebutuhan sistem dan pengguna.',
    startDate: '2024-01',
    endDate: '2024-06',
  },
  {
    id: 'seed-2',
    title_en: 'UI Designer',
    title_id: 'UI Designer',
    company: 'PKM Project — Universitas Muhammadiyah Yogyakarta',
    description_en:
      'Supported the interface design process for a funded PKM project by creating visual layouts, improving user flow, and structuring information to make the digital solution easier to understand and use.',
    description_id:
      'Mendukung proses desain antarmuka untuk proyek PKM yang didanai dengan membuat tampilan visual, meningkatkan alur pengguna, dan menyusun informasi agar solusi digital lebih mudah dipahami dan digunakan.',
    startDate: '2023-06',
    endDate: '2023-12',
  },
  {
    id: 'seed-3',
    title_en: 'UI/UX & Frontend Developer',
    title_id: 'UI/UX & Frontend Developer',
    company: 'Trans Kudamas 88',
    description_en:
      'Designed and developed a rental car website to present services, vehicle information, operational coverage, and booking flow in a more professional and structured way.',
    description_id:
      'Merancang dan mengembangkan website rental mobil untuk menampilkan layanan, informasi kendaraan, cakupan operasional, dan alur pemesanan secara lebih profesional dan terstruktur.',
    startDate: '2023-01',
    endDate: '2023-06',
  },
  {
    id: 'seed-4',
    title_en: 'UI/UX & Frontend Developer',
    title_id: 'UI/UX & Frontend Developer',
    company: 'Dhruva Tech',
    description_en:
      'Designed and developed a software house website to present brand identity, services, portfolio, and business information in a structured and professional way.',
    description_id:
      'Merancang dan mengembangkan website software house untuk menampilkan identitas brand, layanan, portofolio, dan informasi bisnis secara terstruktur dan profesional.',
    startDate: '2022-06',
    endDate: '2022-12',
  },
];

export const seedCertifications = [
  {
    id: 'seed-1',
    title_en: 'BNSP Certified System Analyst',
    title_id: 'BNSP Certified System Analyst',
    issuer: 'Badan Nasional Sertifikasi Profesi',
    description_en:
      'A competency certification that supports my understanding of system requirements, solution analysis, system documentation, and structured system design processes.',
    description_id:
      'Sertifikasi kompetensi yang mendukung pemahaman saya terhadap kebutuhan sistem, analisis solusi, dokumentasi sistem, dan proses desain sistem yang terstruktur.',
    issueDate: '2024-03',
    credentialLink: '',
    certificateImage: '',
  },
  {
    id: 'seed-2',
    title_en: 'Certiport Certified Software Development',
    title_id: 'Certiport Certified Software Development',
    issuer: 'Certiport',
    description_en:
      'A certification that validates my understanding of software development fundamentals, programming logic, application structure, and basic software development practices.',
    description_id:
      'Sertifikasi yang memvalidasi pemahaman saya terhadap dasar-dasar pengembangan perangkat lunak, logika pemrograman, struktur aplikasi, dan praktik dasar pengembangan software.',
    issueDate: '2023-09',
    credentialLink: '',
    certificateImage: '',
  },
];