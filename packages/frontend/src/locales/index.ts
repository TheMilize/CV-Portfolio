import { useMainStore } from "@/stores";

export interface Translations {
  nav: {
    home: string;
    about: string;
    projects: string;
    contact: string;
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
      viewProjects: string;
      contactMe: string;
    };
    skills: {
      title: string;
      frontend: string;
      backend: string;
      tools: string;
    };
    featuredProjects: {
      title: string;
      viewAll: string;
    };
  };
  about: {
    title: string;
    profile: string;
    downloadResume: string;
    name: string;
    description: string;
    experience: {
      title: string;
      juniorFullstack: string;
      juniorFrontend: string;
      freelance: string;
      webStudio: string;
      webDevDescription: string;
      uiDescription: string;
    };
    education: {
      title: string;
      university: string;
      universityName: string;
      gymnasium: string;
      gymnasiumName: string;
      robotics: string;
      roboticsName: string;
      webDevelopment: string;
      online: string;
      selfStudy: string;
      selfStudyName: string;
      present: string;
    };
    interests: {
      title: string;
      ai: string;
      webDev: string;
      mobileDev: string;
      openSource: string;
      newTech: string;
      travel: string;
      photography: string;
      openSourceDesc: string;
      newTechDesc: string;
      travelDesc: string;
      photographyDesc: string;
    };
  };
  projects: {
    title: string;
    subtitle: string;
    all: string;
    frontend: string;
    backend: string;
    fullstack: string;
    mobile: string;
    previous: string;
    next: string;
    descriptions: {
      ecommerce: string;
      taskManagement: string;
      restApi: string;
      weatherDashboard: string;
      mobileApp: string;
      portfolio: string;
      dnd: string;
      memory: string;
      effectiveFrontend: string;
      effectiveBackend: string;
      officeSpaceFrontend: string;
      officeSpaceBackend: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      send: string;
      sending: string;
      success: string;
      error: string;
    };
    info: {
      title: string;
      email: string;
      location: string;
      social: string;
    };
  };
  common: {
    demo: string;
    github: string;
    commercial: string;
    personal: string;
    portfolio: string;
    location: string;
    socialMedia: string;
    writeEmail: string;
    downloadResume: string;
    navigation: string;
    contactInfo: string;
    copyright: string;
    privacyPolicy: string;
    termsOfService: string;
    demoNotAvailable: string;
    githubNotAvailable: string;
    temporarilyUnavailable: string;
  };
  stats: {
    projects: string;
    experience: string;
    clients: string;
    satisfaction: string;
  };
}

export const translations: Record<string, Translations> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    home: {
      hero: {
        title: "Hello, I'm a Developer",
        subtitle:
          "I create modern web applications using Vue.js, Node.js and other modern technologies. I specialize in developing user interfaces and server-side applications.",
        viewProjects: "View Projects",
        contactMe: "Contact Me",
      },
      skills: {
        title: "My Skills",
        frontend: "Frontend",
        backend: "Backend",
        tools: "Tools",
      },
      featuredProjects: {
        title: "Featured Projects",
        viewAll: "View All Projects",
      },
    },
    about: {
      title: "About Me",
      profile: "Profile Photo",
      downloadResume: "Download Resume",
      name: "Vladlen Milize",
      description:
        "Passionate full-stack developer with 1+ year of experience creating modern web applications. I specialize in Vue.js, Node.js and TypeScript. I love learning new technologies and creating quality products.",
      experience: {
        title: "Work Experience",
        juniorFullstack: "Junior Full-stack Developer",
        juniorFrontend: "Junior Frontend Developer",
        freelance: "Freelance",
        webStudio: "Web Studio",
        webDevDescription:
          "Development of web applications and landing pages for clients. Studying modern technologies.",
        uiDescription:
          "Creating user interfaces and studying modern frameworks.",
      },
      education: {
        title: "Education",
        university: "Computer Science and Computer Engineering",
        universityName: "Ural State University of Economics",
        gymnasium: "English Gymnasium (School)",
        gymnasiumName: "School",
        robotics: "Robotics and Engineering",
        roboticsName: "Specialized Educational Institution",
        webDevelopment: "Web Development Courses",
        online: "Online Platforms (Udemy, YouTube)",
        selfStudy: "Documentation and Practice",
        selfStudyName: "Practice with books and articles",
        present: "present",
      },
      interests: {
        title: "Interests",
        ai: "Training lightweight neural network models on a self-assembled server",
        webDev:
          "Creating modern web applications with cutting-edge technologies.",
        mobileDev: "Building cross-platform mobile applications.",
        openSource: "Open Source",
        newTech: "New Technologies",
        travel: "Travel",
        photography: "Photography",
        openSourceDesc:
          "Actively participating in open-source projects and creating own libraries.",
        newTechDesc:
          "Constantly studying new frameworks and development tools.",
        travelDesc: "Love traveling and getting to know new cultures.",
        photographyDesc:
          "Passionate about photography, especially architectural and landscape.",
      },
    },
    projects: {
      title: "My Projects",
      subtitle:
        "A collection of my best work demonstrating skills and experience in development",
      all: "All",
      frontend: "Frontend",
      backend: "Backend",
      fullstack: "Full-stack",
      mobile: "Mobile Apps",
      previous: "Previous",
      next: "Next",
      descriptions: {
        ecommerce:
          "Modern e-commerce platform with full shopping cart, payment and product management functionality.",
        taskManagement:
          "Task management application with drag-and-drop functionality and team collaboration.",
        restApi:
          "Scalable REST API for data processing with authentication and authorization.",
        weatherDashboard:
          "Interactive dashboard for displaying weather data with beautiful animations.",
        mobileApp: "Cross-platform mobile fitness app with progress tracking.",
        portfolio: "Personal portfolio with modern design and animations.",
        dnd: "DnD character generator with bilingual support and beautiful character cards.",
        memory:
          "Memory game with multiple difficulty levels and audio effects.",
        effectiveFrontend:
          "Frontend solution for technical task from Effective Mobile company.",
        effectiveBackend:
          "Backend solution for technical task from Effective Mobile company.",
        officeSpaceFrontend:
          "Frontend of my most important project, which became my diploma work.",
        officeSpaceBackend:
          "Backend of my most important project, which became my diploma work.",
      },
    },
    contact: {
      title: "Contact Me",
      subtitle: "Get in touch with me for collaboration or just to say hello",
      form: {
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        send: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully!",
        error: "Failed to send message. Please try again.",
      },
      info: {
        title: "Contact Information",
        email: "Email",
        location: "Location",
        social: "Social Media",
      },
    },
    common: {
      demo: "Demo",
      github: "GitHub",
      commercial: "Commercial",
      personal: "Personal",
      portfolio: "Portfolio",
      location: "Ekaterinburg, Russia",
      socialMedia: "Social Media",
      writeEmail: "Write Email",
      downloadResume: "Download Resume",
      navigation: "Navigation",
      contactInfo: "Contact Information",
      copyright: "© 2024 Portfolio. All rights reserved.",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      demoNotAvailable:
        "Demo not available due to confidentiality restrictions.",
      githubNotAvailable:
        "Repository not available in public access due to confidentiality restrictions.",
      temporarilyUnavailable: "Temporarily unavailable.",
    },
    stats: {
      projects: "Projects Created",
      experience: "Year Experience",
      clients: "Projects Delivered",
      satisfaction: "% Code Quality",
    },
  },
  ru: {
    nav: {
      home: "Главная",
      about: "Обо мне",
      projects: "Проекты",
      contact: "Контакты",
    },
    home: {
      hero: {
        title: "Привет, я Разработчик",
        subtitle:
          "Создаю современные веб-приложения с использованием Vue.js, Node.js и других современных технологий. Специализируюсь на разработке пользовательских интерфейсов и серверной части.",
        viewProjects: "Посмотреть проекты",
        contactMe: "Связаться со мной",
      },
      skills: {
        title: "Мои навыки",
        frontend: "Frontend",
        backend: "Backend",
        tools: "Инструменты",
      },
      featuredProjects: {
        title: "Избранные проекты",
        viewAll: "Посмотреть все проекты",
      },
    },
    about: {
      title: "Обо мне",
      profile: "Фото профиля",
      downloadResume: "Скачать резюме",
      name: "Владлен Милизе",
      description:
        "Увлеченный full-stack разработчик с 1+ годом опыта создания современных веб-приложений. Специализируюсь на Vue.js, Node.js и TypeScript. Люблю изучать новые технологии и создавать качественные продукты.",
      experience: {
        title: "Опыт работы",
        juniorFullstack: "Junior Full-stack Developer",
        juniorFrontend: "Junior Frontend Developer",
        freelance: "Freelance",
        webStudio: "Web Studio",
        webDevDescription:
          "Разработка веб-приложений и лендингов для клиентов. Изучение современных технологий.",
        uiDescription:
          "Создание пользовательских интерфейсов и изучение современных фреймворков.",
      },
      education: {
        title: "Образование",
        university: "Информатика и вычислительная техника",
        universityName: "Уральский государственный экономический университет",
        gymnasium: "Английская гимназия (Школа)",
        gymnasiumName: "Школа",
        robotics: "Робототехника и инженерия",
        roboticsName: "Специализированное учебное заведение",
        webDevelopment: "Курсы по веб-разработке",
        online: "Онлайн платформы (Udemy, YouTube)",
        selfStudy: "Самообучение и практика",
        selfStudyName: "Практика по книгам и статьям",
        present: "настоящее время",
      },
      interests: {
        title: "Интересы",
        ai: "Обучаю легкие модели нейросетей на собранном своими руками сервере",
        webDev:
          "Создание современных веб-приложений с передовыми технологиями.",
        mobileDev: "Разработка кроссплатформенных мобильных приложений.",
        openSource: "Открытый исходный код",
        newTech: "Новые технологии",
        travel: "Путешествия",
        photography: "Фотография",
        openSourceDesc:
          "Активно участвую в open-source проектах и создаю собственные библиотеки.",
        newTechDesc:
          "Постоянно изучаю новые фреймворки и инструменты разработки.",
        travelDesc: "Люблю путешествовать и знакомиться с новыми культурами.",
        photographyDesc:
          "Увлекаюсь фотографией, особенно архитектурной и пейзажной.",
      },
    },
    projects: {
      title: "Мои проекты",
      subtitle:
        "Коллекция моих лучших работ, демонстрирующих навыки и опыт в разработке",
      all: "Все",
      frontend: "Frontend",
      backend: "Backend",
      fullstack: "Full-stack",
      mobile: "Мобильные приложения",
      previous: "Предыдущая",
      next: "Следующая",
      descriptions: {
        ecommerce:
          "Современная платформа электронной коммерции с полным функционалом корзины, оплаты и управления товарами.",
        taskManagement:
          "Приложение для управления задачами с drag-and-drop функциональностью и командной работой.",
        restApi:
          "Масштабируемый REST API для обработки данных с аутентификацией и авторизацией.",
        weatherDashboard:
          "Интерактивная панель для отображения погодных данных с красивыми анимациями.",
        mobileApp:
          "Кроссплатформенное мобильное приложение для фитнеса с отслеживанием прогресса.",
        portfolio:
          "Персональное портфолио с современным дизайном и анимациями.",
        dnd: "Генератор персонажей DnD с поддержкой двух языков и красивыми карточками персонажей.",
        memory:
          "Игра памяти с несколькими уровнями сложности и аудио эффектами.",
        effectiveFrontend:
          "Фронтенд решение технического задания от компании Effective Mobile.",
        effectiveBackend:
          "Бэкенд решение технического задания от компании Effective Mobile.",
        officeSpaceFrontend:
          "Фронтенд моего самого важного проекта, который стал моей дипломной работой.",
        officeSpaceBackend:
          "Бэкенд моего самого важного проекта, который стал моей дипломной работой.",
      },
    },
    contact: {
      title: "Связаться со мной",
      subtitle:
        "Свяжитесь со мной для сотрудничества или просто поздоровайтесь",
      form: {
        name: "Имя",
        email: "Email",
        subject: "Тема",
        message: "Сообщение",
        send: "Отправить сообщение",
        sending: "Отправка...",
        success: "Сообщение отправлено успешно!",
        error: "Не удалось отправить сообщение. Попробуйте еще раз.",
      },
      info: {
        title: "Контактная информация",
        email: "Email",
        location: "Местоположение",
        social: "Социальные сети",
      },
    },
    common: {
      demo: "Демо",
      github: "GitHub",
      commercial: "Коммерческий",
      personal: "Персональный",
      portfolio: "Портфолио",
      location: "Екатеринбург, Россия",
      socialMedia: "Социальные сети",
      writeEmail: "Написать письмо",
      downloadResume: "Скачать резюме",
      navigation: "Навигация",
      contactInfo: "Контактная информация",
      copyright: "© 2024 Портфолио. Все права защищены.",
      privacyPolicy: "Политика конфиденциальности",
      termsOfService: "Условия использования",
      demoNotAvailable:
        "Демо не предоставляется в открытый доступ в связи с ограничениями конфиденциальности.",
      githubNotAvailable:
        "Репозиторий не предоставляется в открытый доступ в связи с ограничениями конфиденциальности.",
      temporarilyUnavailable: "Временно отсутствует.",
    },
    stats: {
      projects: "Созданных проектов",
      experience: "Год опыта",
      clients: "Реализованных проектов",
      satisfaction: "% Качества кода",
    },
  },
};

import { computed, watch } from "vue";

export const useTranslations = () => {
  const store = useMainStore();

  const currentLanguage = computed(() => store.currentLanguage);

  const t = computed(() => (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[currentLanguage.value];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  });

  return { t: t.value, currentLanguage };
};
