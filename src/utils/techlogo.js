const techLogos = import.meta.glob("../assets/techlogo/*.{svg,png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/\+/g, "plus")
    .replace(/#/g, "sharp")
    .replace(/\./g, "")
    .replace(/\s+/g, "-")
    .replace(/_/g, "-");
}

const logoMap = Object.entries(techLogos).reduce((acc, [path, src]) => {
  const fileName = path.split("/").pop() || "";
  const nameWithoutExtension = fileName.replace(/\.(svg|png|jpg|jpeg|webp)$/i, "");

  acc[normalize(nameWithoutExtension)] = src;

  return acc;
}, {});

const aliases = {
  // AWS
  aws: "aws",

  // CSS
  css: "css",
  css3: "css",

  dart: "dart",

  // Django
  django: "django",

  // Docker
  docker: "docker",
  dockerengine: "docker",

  // Express
  express: "express",
  expressjs: "express",
  "express-js": "express",

  // FastAPI
  fastapi: "fastapi",
  "fast-api": "fastapi",

  // Firebase
  firebase: "firebase",

  figma: "figma",

  // Flask
  flask: "flask",

  // Flutter
  flutter: "flutter",

  // Git
  git: "git",

  // GitHub
  github: "github",
  "git-hub": "github",

  // HTML
  html: "html",
  html5: "html",

  // JavaScript
  javascript: "javascript",
  js: "javascript",
  ecmascript: "javascript",

  // Kotlin
  kotlin: "kotlin",

  // Laravel
  laravel: "laravel",

  // MongoDB
  mongodb: "mongodb",
  mongo: "mongodb",

  // MySQL
  mysql: "mysql",

  // Next.js
  next: "nextjs",
  nextjs: "nextjs",
  "next-js": "nextjs",
  "next.js": "nextjs",

  // Node.js
  node: "nodejs",
  nodejs: "nodejs",
  "node-js": "nodejs",
  "node.js": "nodejs",

  opencv: "opencv",

  // PHP
  php: "php",

  // PostgreSQL
  postgres: "postgresql",
  postgresql: "postgresql",
  postgresdb: "postgresql",

  // Prisma
  prisma: "prisma",

  // Python
  python: "python",
  py: "python",

  // PyTorch
  pytorch: "pytorch",
  torch: "pytorch",

  // React
  react: "react",
  reactjs: "react",
  "react-js": "react",

  // React Native
  reactnative: "reactnative",
  "react-native": "reactnative",

  // Redis
  redis: "redis",

  // Scikit Learn
  scikitlearn: "scikitlearn",
  "scikit-learn": "scikitlearn",
  sklearn: "scikitlearn",

  // Spring Boot
  springboot: "springboot",
  spring: "springboot",
  "spring-boot": "springboot",

  // SQLite
  sqlite: "sqlite",
  sqlite3: "sqlite",

  // Supabase
  supabase: "supabase",

  // Swift
  swift: "swift",

  // Tailwind
  tailwind: "tailwind",
  tailwindcss: "tailwind",
  "tailwind-css": "tailwind",

  // TensorFlow
  tensorflow: "tensorflow",
  tf: "tensorflow",

  // TypeScript
  typescript: "typescript",
  ts: "typescript",

  // Vite
  vite: "vite",
  vitejs: "vite",

  // Vue
  vue: "vuejs",
  vuejs: "vuejs",
  "vue-js": "vuejs",
};

export function getTechLogo(name) {
  if (!name) return null;

  const normalized = normalize(name);

  const key = aliases[normalized] || normalized;

  return logoMap[key] || null;
}

export function getAvailableTechLogos() {
  return Object.keys(logoMap);
}

console.log("==== TECH LOGOS ====");
console.log(techLogos);

console.log("==== LOGO MAP ====");
console.log(logoMap);