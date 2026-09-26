import jsPDF from "jspdf";
import { useMainStore } from "@/stores";

const FONT_PATH = "/fonts/Roboto-Regular.ttf";
let fontBase64Cache: string | null = null;

async function loadRobotoBase64(): Promise<string | null> {
  if (fontBase64Cache) return fontBase64Cache;
  try {
    const res = await fetch(FONT_PATH);
    if (!res.ok) return null;
    const blob = await res.blob();
    const base64 = await new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => {
        const dataUrl = r.result as string;
        resolve(dataUrl.split(",")[1] ?? "");
      };
      r.onerror = reject;
      r.readAsDataURL(blob);
    });
    if (base64) fontBase64Cache = base64;
    return base64 || null;
  } catch {
    return null;
  }
}

function addRobotoFont(doc: jsPDF, base64: string): void {
  doc.addFileToVFS("Roboto-Regular.ttf", base64);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.addFont("Roboto-Regular.ttf", "Roboto", "bold");
}

const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: '"',
  ы: "y",
  ь: "'",
  э: "e",
  ю: "yu",
  я: "ya",
  А: "A",
  Б: "B",
  В: "V",
  Г: "G",
  Д: "D",
  Е: "E",
  Ё: "Yo",
  Ж: "Zh",
  З: "Z",
  И: "I",
  Й: "Y",
  К: "K",
  Л: "L",
  М: "M",
  Н: "N",
  О: "O",
  П: "P",
  Р: "R",
  С: "S",
  Т: "T",
  У: "U",
  Ф: "F",
  Х: "Kh",
  Ц: "Ts",
  Ч: "Ch",
  Ш: "Sh",
  Щ: "Shch",
  Ъ: '"',
  Ы: "Y",
  Ь: "'",
  Э: "E",
  Ю: "Yu",
  Я: "Ya",
};

function transliterate(str: string): string {
  return str
    .split("")
    .map((ch) =>
      ch.charCodeAt(0) >= 0x0400 && ch.charCodeAt(0) <= 0x04ff
        ? (CYRILLIC_TO_LATIN[ch] ?? ch)
        : ch,
    )
    .join("");
}

function transliterateResumeData<T>(data: T): T {
  if (typeof data === "string") return transliterate(data) as T;
  if (Array.isArray(data)) return data.map(transliterateResumeData) as T;
  if (data && typeof data === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(data))
      out[k] = transliterateResumeData(v);
    return out as T;
  }
  return data;
}

interface ResumeData {
  name: string;
  email: string;
  location: string;
  description: string;
  experience: Array<{
    position: string;
    company: string;
    period: string;
    description: string;
    technologies: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    period: string;
  }>;
  skills: {
    frontend: string[];
    backend: string[];
    tools: string[];
  };
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
  }>;
}

const SKILLS: ResumeData["skills"] = {
  frontend: [
    "Vue.js",
    "React",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "SCSS",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "Telegram Bot API",
    "NestJS",
    "PostgreSQL",
    "MongoDB",
    "REST API",
    "GraphQL",
  ],
  tools: [
    "Git",
    "Docker",
    "Webpack",
    "Vite",
    "ESLint",
    "Prettier",
    "Figma",
    "VS Code",
  ],
};

const RESUME_EN: ResumeData = {
  name: "Vladlen Milize",
  email: "shemakin.vladlen@gmail.com",
  location: "Ekaterinburg, Russia",
  description:
    "I build web applications and Telegram bots with Vue.js, Node.js, and TypeScript, from the interface to backend logic. I focus on usability, performance, and code quality.",
  experience: [
    {
      position: "Full-stack Developer",
      company: "Personal & Freelance Projects",
      period: "2023 - present",
      description:
        "Full-stack development of personal and freelance projects. Building modern web applications and Telegram bots.",
      technologies: ["Vue.js", "Node.js", "TypeScript", "Telegram Bot API"],
    },
    {
      position: "Frontend Developer",
      company: "Personal & Freelance Projects",
      period: "2023 - present",
      description:
        "Frontend development for personal and freelance projects. Creating user interfaces and web applications.",
      technologies: ["Vue.js", "JavaScript", "CSS", "HTML"],
    },
  ],
  education: [
    {
      degree: "Corporate Information Systems",
      institution: "Master's degree | Ural State University of Economics",
      period: "2025 - 2028",
    },
    {
      degree: "Computer Science and Computer Engineering",
      institution: "Bachelor's degree | Ural State University of Economics",
      period: "2021 - 2025",
    },
    {
      degree: "English Gymnasium (School)",
      institution: "School",
      period: "2010 - 2021",
    },
    {
      degree: "Robotics and Engineering",
      institution: "Specialized Educational Institution",
      period: "2018 - 2020",
    },
  ],
  skills: SKILLS,
  projects: [
    {
      title: "3D Model Viewer",
      description:
        "Web app for viewing 3D models. Supports glTF/GLB, OBJ, PLY, drag-and-drop, camera controls, background toggle, screenshots.",
      technologies: ["Vue.js", "Three.js", "Vite", "Docker"],
    },
    {
      title: "Office Space",
      description:
        "Full-stack office management system with booking functionality, user management, and real-time updates. My most important project that became my diploma work.",
      technologies: [
        "Vue.js",
        "Node.js",
        "TypeScript",
        "PostgreSQL",
        "Socket.io",
        "JWT",
      ],
    },
    {
      title: "E-commerce Platform",
      description:
        "Modern e-commerce platform with full shopping cart, payment and product management functionality.",
      technologies: ["Vue.js", "Node.js", "PostgreSQL", "Stripe API"],
    },
    {
      title: "Task Management App",
      description:
        "Task management application with drag-and-drop functionality and team collaboration.",
      technologies: ["Vue.js", "TypeScript", "Firebase", "CSS3"],
    },
  ],
};

const RESUME_RU: ResumeData = {
  name: "Владлен Милизе",
  email: "shemakin.vladlen@gmail.com",
  location: "Екатеринбург, Россия",
  description:
    "Разрабатываю веб-приложения и Telegram-ботов на Vue.js, Node.js и TypeScript: от интерфейса до серверной логики. Уделяю внимание удобству, производительности и качеству кода.",
  experience: [
    {
      position: "Full-stack разработчик",
      company: "Личные и фриланс проекты",
      period: "2023 - настоящее время",
      description:
        "Full-stack разработка личных и фриланс проектов. Создание современных веб-приложений и Telegram-ботов.",
      technologies: ["Vue.js", "Node.js", "TypeScript", "Telegram Bot API"],
    },
    {
      position: "Frontend разработчик",
      company: "Личные и фриланс проекты",
      period: "2023 - настоящее время",
      description:
        "Frontend разработка личных и фриланс проектов. Создание пользовательских интерфейсов и веб-приложений.",
      technologies: ["Vue.js", "JavaScript", "CSS", "HTML"],
    },
  ],
  education: [
    {
      degree: "Корпоративные информационные системы",
      institution:
        "Магистратура | Уральский государственный экономический университет",
      period: "2025 - 2028",
    },
    {
      degree: "Информатика и вычислительная техника",
      institution:
        "Бакалавриат | Уральский государственный экономический университет",
      period: "2021 - 2025",
    },
    {
      degree: "Английская гимназия (Школа)",
      institution: "Школа",
      period: "2010 - 2021",
    },
    {
      degree: "Робототехника и инженерия",
      institution: "Специализированное учебное заведение",
      period: "2018 - 2020",
    },
  ],
  skills: SKILLS,
  projects: [
    {
      title: "3D Model Viewer",
      description:
        "Веб-приложение для просмотра 3D-моделей. Поддержка glTF/GLB, OBJ, PLY, drag-and-drop, управление камерой, смена фона, скриншоты.",
      technologies: ["Vue.js", "Three.js", "Vite", "Docker"],
    },
    {
      title: "Office Space",
      description:
        "Full-stack система управления офисными помещениями с функциональностью бронирования, управления пользователями и обновлениями в реальном времени. Мой самый важный проект, который стал моей дипломной работой.",
      technologies: [
        "Vue.js",
        "Node.js",
        "TypeScript",
        "PostgreSQL",
        "Socket.io",
        "JWT",
      ],
    },
    {
      title: "E-commerce Platform",
      description:
        "Современная платформа электронной коммерции с полным функционалом корзины, оплаты и управления товарами.",
      technologies: ["Vue.js", "Node.js", "PostgreSQL", "Stripe API"],
    },
    {
      title: "Task Management App",
      description:
        "Приложение для управления задачами с drag-and-drop функциональностью и командной работой.",
      technologies: ["Vue.js", "TypeScript", "Firebase", "CSS3"],
    },
  ],
};

/** Build independently from downloading so pagination can be verified in both languages. */
export const createResumePDF = async (language: "en" | "ru") => {
  const doc = new jsPDF();
  const fontBase64 = await loadRobotoBase64();
  if (fontBase64) addRobotoFont(doc, fontBase64);
  const font = fontBase64 ? "Roboto" : "helvetica";
  const rawData = language === "ru" ? RESUME_RU : RESUME_EN;
  const data =
    language === "ru" && !fontBase64
      ? transliterateResumeData(rawData)
      : rawData;
  const label = (en: string, ru: string) =>
    language === "en" ? en : fontBase64 ? ru : transliterate(ru);
  const margin = 20;
  const width = doc.internal.pageSize.getWidth() - margin * 2;
  const bottom = doc.internal.pageSize.getHeight() - 23;
  let y = 24;
  const ink: [number, number, number] = [39, 43, 40];
  const muted: [number, number, number] = [97, 106, 97];
  const accent: [number, number, number] = [167, 63, 42];

  function ensureSpace(height: number) {
    if (y + height > bottom) {
      doc.addPage();
      y = 24;
    }
  }
  function lines(text: string, size: number) {
    doc.setFont(font, "normal");
    doc.setFontSize(size);
    return doc.splitTextToSize(text, width) as string[];
  }
  function paragraph(text: string, size = 10, color = ink, gap = 3) {
    const wrapped = lines(text, size);
    const lineHeight = size * 0.47;
    doc.setTextColor(...color);
    for (const line of wrapped) {
      ensureSpace(lineHeight);
      doc.text(line, margin, y);
      y += lineHeight;
    }
    y += gap;
  }
  function section(title: string) {
    ensureSpace(38);
    y += 4;
    doc.setDrawColor(222, 223, 215);
    doc.line(margin, y, margin + width, y);
    y += 10;
    paragraph(title, 12, accent, 6);
  }
  function blockHeight(parts: Array<[string, number]>) {
    return parts.reduce(
      (height, [text, size]) =>
        height + lines(text, size).length * size * 0.47 + 3,
      5,
    );
  }

  doc.setProperties({
    title: `${data.name} - ${label("Resume", "Резюме")}`,
    author: data.name,
    subject: "Full-stack developer",
  });
  paragraph(data.name, 27, ink, 1);
  paragraph("FULL-STACK DEVELOPER", 10, accent, 4);
  paragraph(`${data.email}  |  ${data.location}`, 9, muted, 5);
  paragraph(data.description, 10, muted, 2);

  section(label("Projects & Practice", "Проекты и практика"));
  for (const exp of data.experience) {
    const tech = `${label("Technologies", "Технологии")}: ${exp.technologies.join(", ")}`;
    ensureSpace(
      blockHeight([
        [exp.position, 12],
        [`${exp.company} | ${exp.period}`, 9],
        [exp.description, 10],
        [tech, 9],
      ]),
    );
    paragraph(exp.position, 12, ink, 1);
    paragraph(`${exp.company} | ${exp.period}`, 9, muted, 2);
    paragraph(exp.description, 10, muted, 1);
    paragraph(tech, 9, muted, 6);
  }

  section(label("Education", "Образование"));
  for (const edu of data.education) {
    const detail = `${edu.institution} | ${edu.period}`;
    ensureSpace(
      blockHeight([
        [edu.degree, 11],
        [detail, 9],
      ]),
    );
    paragraph(edu.degree, 11, ink, 1);
    paragraph(detail, 9, muted, 5);
  }

  doc.addPage();
  y = 24;
  paragraph(data.name, 13, muted, 3);
  section(label("Technical Skills", "Технические навыки"));
  paragraph(`Frontend: ${data.skills.frontend.join(", ")}`, 10);
  paragraph(`Backend: ${data.skills.backend.join(", ")}`, 10);
  paragraph(
    label(
      "Telegram bots: development with Node.js, TypeScript, and Telegram Bot API.",
      "Telegram-боты: разработка на Node.js и TypeScript с использованием Telegram Bot API.",
    ),
    10,
  );
  paragraph(
    `${label("Tools", "Инструменты")}: ${data.skills.tools.join(", ")}`,
    10,
  );
  section(label("Selected Projects", "Избранные проекты"));
  for (const project of data.projects) {
    const tech = project.technologies.join(" / ");
    ensureSpace(
      blockHeight([
        [project.title, 12],
        [project.description, 10],
        [tech, 9],
      ]),
    );
    paragraph(project.title, 12, ink, 2);
    paragraph(project.description, 10, muted, 2);
    paragraph(tech, 9, accent, 7);
  }
  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page++) {
    doc.setPage(page);
    doc.setDrawColor(222, 223, 215);
    doc.line(margin, 281, margin + width, 281);
    doc.setFont(font, "normal");
    doc.setFontSize(8);
    doc.setTextColor(...muted);
    doc.text("github.com/TheMilize", margin, 287);
    doc.text(`${page} / ${pageCount}`, margin + width, 287, { align: "right" });
  }
  return doc;
};

export const generateResumePDF = async () => {
  const language = useMainStore().currentLanguage;
  const doc = await createResumePDF(language);
  doc.save(
    `Vladlen_Milize_Resume_${language.toUpperCase()}_${new Date().getFullYear()}.pdf`,
  );
};
