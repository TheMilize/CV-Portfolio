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
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "shch",
  ъ: '"', ы: "y", ь: "'", э: "e", ю: "yu", я: "ya",
  А: "A", Б: "B", В: "V", Г: "G", Д: "D", Е: "E", Ё: "Yo", Ж: "Zh", З: "Z",
  И: "I", Й: "Y", К: "K", Л: "L", М: "M", Н: "N", О: "O", П: "P", Р: "R",
  С: "S", Т: "T", У: "U", Ф: "F", Х: "Kh", Ц: "Ts", Ч: "Ch", Ш: "Sh", Щ: "Shch",
  Ъ: '"', Ы: "Y", Ь: "'", Э: "E", Ю: "Yu", Я: "Ya",
};

function transliterate(str: string): string {
  return str
    .split("")
    .map((ch) => (ch.charCodeAt(0) >= 0x0400 && ch.charCodeAt(0) <= 0x04ff ? CYRILLIC_TO_LATIN[ch] ?? ch : ch))
    .join("");
}

function transliterateResumeData<T>(data: T): T {
  if (typeof data === "string") return transliterate(data) as T;
  if (Array.isArray(data)) return data.map(transliterateResumeData) as T;
  if (data && typeof data === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(data)) out[k] = transliterateResumeData(v);
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
  frontend: ["Vue.js", "React", "TypeScript", "JavaScript", "HTML5", "CSS3", "SCSS"],
  backend: ["Node.js", "Express.js", "NestJS", "PostgreSQL", "MongoDB", "REST API", "GraphQL"],
  tools: ["Git", "Docker", "Webpack", "Vite", "ESLint", "Prettier", "Figma", "VS Code"],
};

const RESUME_EN: ResumeData = {
  name: "Vladlen Milize",
  email: "shemakin.vladlen@gmail.com",
  location: "Ekaterinburg, Russia",
  description:
    "Passionate full-stack developer with 1+ year of non-commercial experience (personal and freelance projects) creating modern web applications. I specialize in Vue.js, Node.js and TypeScript. I love learning new technologies and creating quality products.",
  experience: [
    {
      position: "Full-stack Developer",
      company: "Personal & Freelance Projects",
      period: "2023 - present",
      description: "Full-stack development of personal and freelance projects. Building modern web applications.",
      technologies: ["Vue.js", "Node.js", "TypeScript", "CSS3"],
    },
    {
      position: "Frontend Developer",
      company: "Personal & Freelance Projects",
      period: "2023 - present",
      description: "Frontend development for personal and freelance projects. Creating user interfaces and web applications.",
      technologies: ["Vue.js", "JavaScript", "CSS", "HTML"],
    },
  ],
  education: [
    { degree: "Computer Science and Computer Engineering", institution: "Ural State University of Economics", period: "2021 - 2025" },
    { degree: "English Gymnasium (School)", institution: "School", period: "2010 - 2021" },
    { degree: "Robotics and Engineering", institution: "Specialized Educational Institution", period: "2018 - 2020" },
    { degree: "Web Development Courses", institution: "Online Platforms (Udemy, YouTube)", period: "2022 - 2023" },
    { degree: "Documentation and Practice", institution: "Practice with books and articles", period: "2022 - present" },
  ],
  skills: SKILLS,
  projects: [
    {
      title: "3D Model Viewer",
      description: "Web app for viewing 3D models. Supports glTF/GLB, OBJ, PLY, drag-and-drop, camera controls, background toggle, screenshots.",
      technologies: ["Vue.js", "Three.js", "Vite", "Docker"],
    },
    {
      title: "Office Space",
      description: "Full-stack office management system with booking functionality, user management, and real-time updates. My most important project that became my diploma work.",
      technologies: ["Vue.js", "Node.js", "TypeScript", "PostgreSQL", "Socket.io", "JWT"],
    },
    {
      title: "E-commerce Platform",
      description: "Modern e-commerce platform with full shopping cart, payment and product management functionality.",
      technologies: ["Vue.js", "Node.js", "PostgreSQL", "Stripe API"],
    },
    {
      title: "Task Management App",
      description: "Task management application with drag-and-drop functionality and team collaboration.",
      technologies: ["React", "TypeScript", "MongoDB", "Socket.io"],
    },
  ],
};

const RESUME_RU: ResumeData = {
  name: "Владлен Милизе",
  email: "shemakin.vladlen@gmail.com",
  location: "Екатеринбург, Россия",
  description:
    "Увлеченный full-stack разработчик с 1+ годом некоммерческого опыта (личные и фриланс проекты) создания современных веб-приложений. Специализируюсь на Vue.js, Node.js и TypeScript. Люблю изучать новые технологии и создавать качественные продукты.",
  experience: [
    {
      position: "Full-stack разработчик",
      company: "Личные и фриланс проекты",
      period: "2023 - настоящее время",
      description: "Full-stack разработка личных и фриланс проектов. Создание современных веб-приложений.",
      technologies: ["Vue.js", "Node.js", "TypeScript", "CSS3"],
    },
    {
      position: "Frontend разработчик",
      company: "Личные и фриланс проекты",
      period: "2023 - настоящее время",
      description: "Frontend разработка личных и фриланс проектов. Создание пользовательских интерфейсов и веб-приложений.",
      technologies: ["Vue.js", "JavaScript", "CSS", "HTML"],
    },
  ],
  education: [
    { degree: "Информатика и вычислительная техника", institution: "Уральский государственный экономический университет", period: "2021 - 2025" },
    { degree: "Английская гимназия (Школа)", institution: "Школа", period: "2010 - 2021" },
    { degree: "Робототехника и инженерия", institution: "Специализированное учебное заведение", period: "2018 - 2020" },
    { degree: "Курсы по веб-разработке", institution: "Онлайн платформы (Udemy, YouTube)", period: "2022 - 2023" },
    { degree: "Самообучение и практика", institution: "Практика по книгам и статьям", period: "2022 - настоящее время" },
  ],
  skills: SKILLS,
  projects: [
    {
      title: "3D Model Viewer",
      description: "Веб-приложение для просмотра 3D-моделей. Поддержка glTF/GLB, OBJ, PLY, drag-and-drop, управление камерой, смена фона, скриншоты.",
      technologies: ["Vue.js", "Three.js", "Vite", "Docker"],
    },
    {
      title: "Office Space",
      description: "Full-stack система управления офисными помещениями с функциональностью бронирования, управления пользователями и обновлениями в реальном времени. Мой самый важный проект, который стал моей дипломной работой.",
      technologies: ["Vue.js", "Node.js", "TypeScript", "PostgreSQL", "Socket.io", "JWT"],
    },
    {
      title: "E-commerce Platform",
      description: "Современная платформа электронной коммерции с полным функционалом корзины, оплаты и управления товарами.",
      technologies: ["Vue.js", "Node.js", "PostgreSQL", "Stripe API"],
    },
    {
      title: "Task Management App",
      description: "Приложение для управления задачами с drag-and-drop функциональностью и командной работой.",
      technologies: ["React", "TypeScript", "MongoDB", "Socket.io"],
    },
  ],
};

export const generateResumePDF = async () => {
  const store = useMainStore();
  const language: "en" | "ru" = store.currentLanguage;

  const doc = new jsPDF();
  let yPosition = 20;

  let data: ResumeData;
  let useCyrillic = false;
  if (language === "ru") {
    const fontBase64 = await loadRobotoBase64();
    if (fontBase64) {
      addRobotoFont(doc, fontBase64);
      data = RESUME_RU;
      useCyrillic = true;
    } else {
      // console.warn("[PDF] font missing, using transliteration fallback");
      data = transliterateResumeData(RESUME_RU) as ResumeData;
    }
  } else {
    data = RESUME_EN;
  }

  const fontFamily = useCyrillic ? "Roboto" : "helvetica";
  const addText = (
    text: string,
    x: number,
    y: number,
    fontSize: number = 12,
    style: "normal" | "bold" = "normal",
  ) => {
    doc.setFontSize(fontSize);
    doc.setFont(fontFamily, style);
    doc.text(text, x, y);
  };

  const setBodyFont = () => {
    doc.setFont(fontFamily, "normal");
    doc.setFontSize(12);
  };

  const addSection = (title: string, y: number) => {
    doc.setFillColor(59, 130, 246); // blue-500
    doc.rect(20, y - 5, 170, 8, "F");
    doc.setTextColor(255, 255, 255);
    addText(title, 22, y, 14, "bold");
    doc.setTextColor(0, 0, 0);
    return y + 15;
  };

  // Заголовок
  addText(data.name, 20, yPosition, 24, "bold");
  yPosition += 10;
  addText(data.email, 20, yPosition, 12);
  yPosition += 8;
  addText(data.location, 20, yPosition, 12);
  yPosition += 15;

  // Описание
  setBodyFont();
  const descriptionLines = doc.splitTextToSize(data.description, 170);
  doc.text(descriptionLines, 20, yPosition);
  yPosition += descriptionLines.length * 6 + 10;

  // Проекты и практика
  const sectionProjects = useCyrillic ? "Проекты и практика" : language === "en" ? "Projects & Practice" : "Proyekty i praktika";
  yPosition = addSection(sectionProjects, yPosition);
  data.experience.forEach((exp) => {
    addText(`${exp.position} - ${exp.company}`, 20, yPosition, 12, "bold");
    yPosition += 6;
    addText(exp.period, 20, yPosition, 10);
    yPosition += 6;
    setBodyFont();
    const descLines = doc.splitTextToSize(exp.description, 170);
    doc.text(descLines, 20, yPosition);
    yPosition += descLines.length * 5 + 2;
    const labelTech = useCyrillic ? "Технологии" : language === "en" ? "Technologies" : "Tekhnologii";
    addText(
      `${labelTech}: ${exp.technologies.join(", ")}`,
      20,
      yPosition,
      10,
    );
    yPosition += 10;
  });

  // Образование
  const sectionEducation = useCyrillic ? "Образование" : language === "en" ? "Education" : "Obrazovaniye";
  yPosition = addSection(sectionEducation, yPosition);
  data.education.forEach((edu) => {
    addText(`${edu.degree} - ${edu.institution}`, 20, yPosition, 12, "bold");
    yPosition += 6;
    addText(edu.period, 20, yPosition, 10);
    yPosition += 10;
  });

  // Навыки
  const sectionSkills = useCyrillic ? "Технические навыки" : language === "en" ? "Technical Skills" : "Tekhnicheskiye navyki";
  yPosition = addSection(sectionSkills, yPosition);
  addText(
    `Frontend: ${data.skills.frontend.join(", ")}`,
    20,
    yPosition,
    10,
  );
  yPosition += 8;
  addText(
    `Backend: ${data.skills.backend.join(", ")}`,
    20,
    yPosition,
    10,
  );
  yPosition += 8;
  const labelTools = useCyrillic ? "Инструменты" : language === "en" ? "Tools" : "Instrumenty";
  addText(
    `${labelTools}: ${data.skills.tools.join(", ")}`,
    20,
    yPosition,
    10,
  );
  yPosition += 15;

  // Проекты
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }
  const sectionKeyProjects = useCyrillic ? "Ключевые проекты" : language === "en" ? "Key Projects" : "Klyuchevyye proyekty";
  yPosition = addSection(sectionKeyProjects, yPosition);
  data.projects.forEach((project) => {
    addText(project.title, 20, yPosition, 12, "bold");
    yPosition += 6;
    setBodyFont();
    const projDescLines = doc.splitTextToSize(project.description, 170);
    doc.text(projDescLines, 20, yPosition);
    yPosition += projDescLines.length * 5 + 2;
    const labelTechProj = useCyrillic ? "Технологии" : language === "en" ? "Technologies" : "Tekhnologii";
    addText(
      `${labelTechProj}: ${project.technologies.join(", ")}`,
      20,
      yPosition,
      10,
    );
    yPosition += 10;
  });

  // Скачивание файла
  const fileName = `Vladlen_Milize_Resume_${language.toUpperCase()}_${new Date().getFullYear()}.pdf`;
  doc.save(fileName);
};
