import jsPDF from "jspdf";
import { useTranslations } from "@/locales";

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

export const generateResumePDF = (language: "en" | "ru" = "en") => {
  const { t } = useTranslations();

  // Актуальные данные с сайта
  const resumeData: ResumeData = {
    name: "Vladlen Milize",
    email: "shemakin.vladlen@gmail.com",
    location:
      language === "en" ? "Ekaterinburg, Russia" : "Ekaterinburg, Russia",
    description: t("about.description"),
    experience: [
      {
        position: t("about.practice.fullstackProjects"),
        company: t("about.practice.personalProjects"),
        period:
          language === "en"
            ? "2023 - present"
            : "2023 - po nastoyashchee vremya",
        description: t("about.practice.fullstackDescription"),
        technologies: ["Vue.js", "Node.js", "TypeScript", "CSS3"],
      },
      {
        position: t("about.practice.frontendProjects"),
        company: t("about.practice.personalProjects"),
        period:
          language === "en"
            ? "2023 - present"
            : "2023 - po nastoyashchee vremya",
        description: t("about.practice.frontendDescription"),
        technologies: ["Vue.js", "JavaScript", "CSS", "HTML"],
      },
    ],
    education: [
      {
        degree: t("about.education.university"),
        institution: t("about.education.universityName"),
        period: "2021 - 2025",
      },
      {
        degree: t("about.education.gymnasium"),
        institution: t("about.education.gymnasiumName"),
        period: "2010 - 2021",
      },
      {
        degree: t("about.education.robotics"),
        institution: t("about.education.roboticsName"),
        period: "2018 - 2020",
      },
      {
        degree: t("about.education.webDevelopment"),
        institution: t("about.education.online"),
        period: "2022 - 2023",
      },
      {
        degree: t("about.education.selfStudy"),
        institution: t("about.education.selfStudyName"),
        period:
          language === "en"
            ? "2022 - present"
            : "2022 - po nastoyashchee vremya",
      },
    ],
    skills: {
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
    },
    projects: [
      {
        title: "Office Space",
        description:
          language === "en"
            ? "Full-stack office management system with booking functionality, user management, and real-time updates. My most important project that became my diploma work."
            : "Full-stack система управления офисными помещениями с функциональностью бронирования, управления пользователями и обновлениями в реальном времени. Мой самый важный проект, который стал моей дипломной работой.",
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
          language === "en"
            ? "Modern e-commerce platform with full shopping cart, payment and product management functionality."
            : "Современная платформа электронной коммерции с полным функционалом корзины, оплаты и управления товарами.",
        technologies: ["Vue.js", "Node.js", "PostgreSQL", "Stripe API"],
      },
      {
        title: "Task Management App",
        description:
          language === "en"
            ? "Task management application with drag-and-drop functionality and team collaboration."
            : "Приложение для управления задачами с drag-and-drop функциональностью и командной работой.",
        technologies: ["React", "TypeScript", "MongoDB", "Socket.io"],
      },
    ],
  };

  const doc = new jsPDF();
  let yPosition = 20;

  // Настройки шрифтов
  const addText = (
    text: string,
    x: number,
    y: number,
    fontSize: number = 12,
    style: "normal" | "bold" = "normal",
  ) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", style);

    try {
      // Пытаемся добавить текст как есть
      doc.text(text, x, y);
    } catch (error) {
      // Мягкая очистка управляющих символов без no-control-regex
      let cleaned = "";
      for (let i = 0; i < text.length; i += 1) {
        const code = text.charCodeAt(i);
        // Оставляем таб (9), перевод строки (10) и возврат каретки (13)
        if (code < 32 && code !== 9 && code !== 10 && code !== 13) {
          cleaned += " ";
        } else {
          cleaned += text[i];
        }
      }

      let safeText = "";
      for (let i = 0; i < cleaned.length; i += 1) {
        const ch = cleaned[i];
        const code = ch.charCodeAt(0);
        if (code > 127) {
          if (code >= 0x0400 && code <= 0x04ff) {
            const cyrillicMap: { [key: string]: string } = {
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
            safeText += cyrillicMap[ch] || ch;
          } else {
            safeText += ch;
          }
        } else {
          safeText += ch;
        }
      }
      doc.text(safeText, x, y);
    }
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
  addText(resumeData.name, 20, yPosition, 24, "bold");
  yPosition += 10;
  addText(resumeData.email, 20, yPosition, 12);
  yPosition += 8;
  addText(resumeData.location, 20, yPosition, 12);
  yPosition += 15;

  // Описание
  const descriptionLines = doc.splitTextToSize(resumeData.description, 170);
  doc.text(descriptionLines, 20, yPosition);
  yPosition += descriptionLines.length * 6 + 10;

  // Проекты и практика
  yPosition = addSection(
    language === "en" ? "Projects & Practice" : "Проекты и практика",
    yPosition,
  );
  resumeData.experience.forEach((exp) => {
    addText(`${exp.position} - ${exp.company}`, 20, yPosition, 12, "bold");
    yPosition += 6;
    addText(exp.period, 20, yPosition, 10);
    yPosition += 6;
    const descLines = doc.splitTextToSize(exp.description, 170);
    doc.text(descLines, 20, yPosition);
    yPosition += descLines.length * 5 + 2;
    addText(
      `${language === "en" ? "Technologies" : "Технологии"}: ${exp.technologies.join(", ")}`,
      20,
      yPosition,
      10,
    );
    yPosition += 10;
  });

  // Образование
  yPosition = addSection(
    language === "en" ? "Education" : "Образование",
    yPosition,
  );
  resumeData.education.forEach((edu) => {
    addText(`${edu.degree} - ${edu.institution}`, 20, yPosition, 12, "bold");
    yPosition += 6;
    addText(edu.period, 20, yPosition, 10);
    yPosition += 10;
  });

  // Навыки
  yPosition = addSection(
    language === "en" ? "Technical Skills" : "Технические навыки",
    yPosition,
  );
  addText(
    `Frontend: ${resumeData.skills.frontend.join(", ")}`,
    20,
    yPosition,
    10,
  );
  yPosition += 8;
  addText(
    `Backend: ${resumeData.skills.backend.join(", ")}`,
    20,
    yPosition,
    10,
  );
  yPosition += 8;
  addText(
    `${language === "en" ? "Tools" : "Инструменты"}: ${resumeData.skills.tools.join(", ")}`,
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
  yPosition = addSection(
    language === "en" ? "Key Projects" : "Ключевые проекты",
    yPosition,
  );
  resumeData.projects.forEach((project) => {
    addText(project.title, 20, yPosition, 12, "bold");
    yPosition += 6;
    const projDescLines = doc.splitTextToSize(project.description, 170);
    doc.text(projDescLines, 20, yPosition);
    yPosition += projDescLines.length * 5 + 2;
    addText(
      `${language === "en" ? "Technologies" : "Технологии"}: ${project.technologies.join(", ")}`,
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
