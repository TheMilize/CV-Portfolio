import { useMainStore } from "@/stores";

export interface Translations {
  design: Record<string, string>;
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
    practice: {
      title: string;
      intro: string;
      fullstackProjects: string;
      frontendProjects: string;
      botsTitle: string;
      botsDescription: string;
      fullstackDescription: string;
      frontendDescription: string;
    };
    education: {
      title: string;
      university: string;
      universityName: string;
      gymnasium: string;
      gymnasiumName: string;
      robotics: string;
      roboticsName: string;
      corporateInformationSystems: string;
      mastersDegree: string;
      bachelorsDegree: string;
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
      vue3dModelViewer: string;
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
    design: {
      skip: "Skip to content",
      letsTalk: "Let’s talk",
      menu: "Navigation menu",
      theme: "Color theme",
      light: "Light",
      dark: "Dark",
      system: "System",
      language: "Language",
      footerNote: "Thoughtful interfaces. Reliable code. Always curious.",
      builtWith: "Built with",
      madeWithCare: "Made with care",
      backTop: "Back to top",
      eyebrow: "FULL-STACK DEVELOPER",
      heroFirst: "Ideas into",
      heroSecond: "interfaces.",
      heroThird: "Details into",
      heroFourth: "experiences.",
      intro:
        "I’m Vladlen, a full-stack developer. I build thoughtful web applications and Telegram bots.",
      hello: "Hi, I’m Vladlen",
      based: "Based in Ekaterinburg, Russia",
      explore: "Explore my work",
      aboutLink: "A little about me",
      scroll: "SCROLL TO EXPLORE",
      featuredLabel: "01 / SELECTED WORK",
      featuredTitle: "Built with purpose.",
      featuredText: "A few projects where curiosity meets code.",
      allWork: "All projects",
      skillsLabel: "02 / MY TOOLKIT",
      skillsTitle: "The right tools.\nThe whole picture.",
      skillsIntro:
        "From the first interaction to the last API call — I enjoy connecting every part of the experience.",
      frontendDesc:
        "Responsive interfaces with attention to every interaction.",
      backendDesc:
        "Server-side logic, APIs, and Telegram bots with Node.js and TypeScript.",
      toolsDesc: "A thoughtful workflow, from development to deployment.",
      ctaLabel: "HAVE SOMETHING IN MIND?",
      ctaTitle: "Let’s build something\ngreat together.",
      ctaText: "A project, an idea, or just a hello. My inbox is open.",
      projectsLabel: "THE PROJECT ARCHIVE",
      projectsHeading: "Ideas. Built",
      search: "Search projects or technologies",
      results: "Results",
      noResults: "No projects found.",
      noResultsText: "Try a different keyword or category.",
      clear: "Reset filters",
      source: "View code",
      private: "Source unavailable",
      illustration: "Concept illustration",
      page: "Page",
      aboutLabel: "THE PERSON BEHIND THE CODE",
      aboutHeading: "Curious by nature.\nDeveloper by choice.",
      aboutIntro: "I care about how things work — and how they feel.",
      practiceLabel: "01 / DEVELOPMENT",
      educationLabel: "02 / LEARNING",
      interestsLabel: "03 / BEYOND THE EDITOR",
      resumeLoading: "Preparing PDF…",
      resumeError: "Could not create the PDF. Please try again.",
      contactLabel: "LET’S CONNECT",
      contactHeading: "Good things start\nwith a conversation.",
      contactIntro:
        "Have a project in mind or a question? Tell me a little about it.",
      contactNote: "Prefer a direct message?",
      formTitle: "Tell me about your idea",
      namePlaceholder: "What should I call you?",
      emailPlaceholder: "you@example.com",
      subjectPlaceholder: "A project, an opportunity, a hello…",
      messagePlaceholder: "What would you like to build?",
      formNote: "Your details are only used to reply to your message.",
      health: "Service status",
      healthIntro: "Current API connectivity and email delivery configuration.",
      loading: "Checking connection…",
      status: "Status",
      environment: "Environment",
      emailConfigured: "Email configured",
      yes: "Yes",
      no: "No",
      healthError: "The API is currently unavailable.",
      retry: "Try again",
      notFound: "This page took a different path.",
      notFoundText:
        "The page you are looking for doesn’t exist. Let’s get you back to the work.",
      home: "Back to home",
      ai: "AI & home lab",
      available: "LET’S CREATE SOMETHING",
      projectCount: "Projects in the collection",
      stack: "Core technologies",
      focus: "Frontend ↔ Backend",
      focusLabel: "A full-stack perspective",
    },
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
        "I build web applications and Telegram bots with Vue.js, Node.js, and TypeScript, from the interface to backend logic. I focus on usability, performance, and code quality.",
      practice: {
        title: "What I can build for you",
        intro:
          "From a standalone interface to an application with its own backend. Here are the areas I work in.",
        fullstackProjects: "Web applications",
        frontendProjects: "Web interfaces",
        botsTitle: "Telegram bots",
        botsDescription:
          "Bots with the commands and conversation flows your project needs. I build their server-side logic with Node.js and TypeScript.",
        fullstackDescription:
          "Applications with a connected interface, API, and database. I handle both the frontend and backend so they work together.",
        frontendDescription:
          "Responsive websites and application interfaces. I focus on clear navigation, useful interactions, and layouts that work on phones and desktops.",
      },
      education: {
        title: "Education",
        university: "Computer Science and Computer Engineering",
        universityName: "Ural State University of Economics",
        gymnasium: "English Gymnasium",
        gymnasiumName: "General secondary education",
        robotics: "Robotics and Engineering",
        roboticsName: "Supplementary technical education",
        corporateInformationSystems: "Corporate Information Systems",
        mastersDegree: "Master’s degree",
        bachelorsDegree: "Bachelor’s degree",
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
        "Web applications, interfaces, and backend systems I’ve worked on.",
      all: "All",
      frontend: "Frontend",
      backend: "Backend",
      fullstack: "Full-stack",
      mobile: "Mobile Apps",
      previous: "Previous",
      next: "Next",
      descriptions: {
        vue3dModelViewer:
          "Web app for viewing 3D models. Supports glTF/GLB, OBJ, PLY, drag-and-drop, camera controls, background toggle, screenshots.",
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
      copyright: "© 2025 Portfolio. All rights reserved.",
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
    design: {
      skip: "Перейти к содержимому",
      letsTalk: "Обсудим идею",
      menu: "Меню навигации",
      theme: "Цветовая тема",
      light: "Светлая",
      dark: "Тёмная",
      system: "Системная",
      language: "Язык",
      footerNote: "Продуманные интерфейсы. Надёжный код. Интерес к новому.",
      builtWith: "Создано на",
      madeWithCare: "С вниманием к деталям",
      backTop: "Наверх",
      eyebrow: "FULL-STACK РАЗРАБОТЧИК",
      heroFirst: "Из идей —",
      heroSecond: "интерфейсы.",
      heroThird: "Из деталей —",
      heroFourth: "впечатления.",
      intro:
        "Я Владлен, full-stack разработчик. Создаю продуманные веб-приложения и Telegram-ботов.",
      hello: "Привет, я Владлен",
      based: "Екатеринбург, Россия",
      explore: "Смотреть проекты",
      aboutLink: "Немного обо мне",
      scroll: "ЛИСТАЙТЕ ДАЛЬШЕ",
      featuredLabel: "01 / ИЗБРАННЫЕ РАБОТЫ",
      featuredTitle: "Идеи, которые работают.",
      featuredText: "Проекты, в которых любопытство встречается с кодом.",
      allWork: "Все проекты",
      skillsLabel: "02 / МОЙ ИНСТРУМЕНТАРИЙ",
      skillsTitle: "От первой идеи\nдо последней детали.",
      skillsIntro:
        "От взаимодействия с интерфейсом до ответа сервера — мне нравится связывать всё в единый опыт.",
      frontendDesc:
        "Адаптивные интерфейсы с вниманием к каждому взаимодействию.",
      backendDesc:
        "Серверная логика, API и Telegram-боты на Node.js и TypeScript.",
      toolsDesc: "Продуманный процесс — от разработки до развёртывания.",
      ctaLabel: "ЕСТЬ ИДЕЯ?",
      ctaTitle: "Давайте создадим\nчто-нибудь классное.",
      ctaText: "Проект, предложение или просто привет — пишите.",
      projectsLabel: "КОЛЛЕКЦИЯ ПРОЕКТОВ",
      projectsHeading: "Идеи. В деле",
      search: "Поиск по проектам и технологиям",
      results: "Найдено",
      noResults: "Проекты не найдены.",
      noResultsText: "Попробуйте другое слово или категорию.",
      clear: "Сбросить фильтры",
      source: "Смотреть код",
      private: "Код недоступен",
      illustration: "Концептуальная иллюстрация",
      page: "Страница",
      aboutLabel: "ЧЕЛОВЕК ЗА КОДОМ",
      aboutHeading: "Любопытство — характер.\nРазработка — призвание.",
      aboutIntro: "Мне важно, как всё работает. И какие ощущения оставляет.",
      practiceLabel: "01 / РАЗРАБОТКА",
      educationLabel: "02 / ОБУЧЕНИЕ",
      interestsLabel: "03 / ЗА ПРЕДЕЛАМИ КОДА",
      resumeLoading: "Подготовка PDF…",
      resumeError: "Не удалось создать PDF. Попробуйте ещё раз.",
      contactLabel: "БУДЕМ НА СВЯЗИ",
      contactHeading: "Всё хорошее\nначинается с разговора.",
      contactIntro: "Есть идея проекта или вопрос? Расскажите немного о нём.",
      contactNote: "Удобнее написать напрямую?",
      formTitle: "Расскажите о своей идее",
      namePlaceholder: "Как к вам обращаться?",
      emailPlaceholder: "you@example.com",
      subjectPlaceholder: "Проект, предложение, знакомство…",
      messagePlaceholder: "Что вы хотели бы создать?",
      formNote: "Ваши данные используются только для ответа на сообщение.",
      health: "Состояние сервиса",
      healthIntro: "Подключение к API и настройка отправки сообщений.",
      loading: "Проверяю подключение…",
      status: "Статус",
      environment: "Окружение",
      emailConfigured: "Почта настроена",
      yes: "Да",
      no: "Нет",
      healthError: "Сейчас API недоступен.",
      retry: "Повторить",
      notFound: "Эта страница выбрала другой путь.",
      notFoundText: "Такой страницы нет. Давайте вернёмся к проектам.",
      home: "На главную",
      ai: "ИИ и домашняя лаборатория",
      available: "СОЗДАДИМ ЧТО-НИБУДЬ ВМЕСТЕ",
      projectCount: "Проектов в коллекции",
      stack: "Основные технологии",
      focus: "Frontend ↔ Backend",
      focusLabel: "Взгляд на весь продукт",
    },
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
        "Разрабатываю веб-приложения и Telegram-ботов на Vue.js, Node.js и TypeScript: от интерфейса до серверной логики. Уделяю внимание удобству, производительности и качеству кода.",
      practice: {
        title: "Чем могу помочь",
        intro:
          "От отдельного интерфейса до приложения с собственной серверной частью. Вот основные направления моей работы.",
        fullstackProjects: "Веб-приложения",
        frontendProjects: "Интерфейсы сайтов",
        botsTitle: "Telegram-боты",
        botsDescription:
          "Боты с командами и сценариями общения под задачи вашего проекта. Разрабатываю серверную логику на Node.js и TypeScript.",
        fullstackDescription:
          "Приложения, в которых интерфейс, API и база данных работают вместе. Беру на себя клиентскую и серверную части проекта.",
        frontendDescription:
          "Адаптивные сайты и интерфейсы приложений. Продумываю навигацию, взаимодействие с элементами и отображение на телефонах и компьютерах.",
      },
      education: {
        title: "Образование",
        university: "Информатика и вычислительная техника",
        universityName: "Уральский государственный экономический университет",
        gymnasium: "Английская гимназия",
        gymnasiumName: "Среднее общее образование",
        robotics: "Робототехника и инженерия",
        roboticsName: "Дополнительное техническое образование",
        corporateInformationSystems: "Корпоративные информационные системы",
        mastersDegree: "Магистратура",
        bachelorsDegree: "Бакалавриат",
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
        "Веб-приложения, интерфейсы и серверные решения, над которыми я работал.",
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
        vue3dModelViewer:
          "Веб-приложение для просмотра 3D-моделей. Поддержка glTF/GLB, OBJ, PLY, drag-and-drop, управление камерой, смена фона, скриншоты.",
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
      copyright: "© 2025 Портфолио. Все права защищены.",
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

import { computed } from "vue";

export const useTranslations = () => {
  const store = useMainStore();

  const currentLanguage = computed(() => store.currentLanguage);

  const t = computed(() => (key: string): string => {
    const keys = key.split(".");
    let value: unknown = translations[store.currentLanguage];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  });

  // Обёртка, чтобы шаблон всегда получал перевод для текущего языка (реактивность)
  const translate = (key: string): string => t.value(key);

  return { t: translate, currentLanguage };
};
