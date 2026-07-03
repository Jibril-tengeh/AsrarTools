import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      "Welcome": "Bienvenue sur AsrarTools",
      "WelcomeMessage": "L'application a été initialisée avec succès.",
      "InstructionMessage": "Veuillez taper 'USER' ou 'ADMIN' dans la boîte de dialogue pour générer la partie correspondante de l'application.",
      "Profile": "Profil",
      "DarkMode": "Mode Sombre",
      "Language": "Langue",
      "Tools": "Outils",
      "Settings": "Paramètres",
      "UserDashboardTitle": "Tableau de bord Utilisateur",
      "SearchTools": "Rechercher un outil...",
      "StatusActive": "Actif",
      "StatusMaintenance": "En maintenance",
      "StatusDisabled": "Désactivé",
      "AccessTool": "Accéder",
      "KhatimGenName": "Générateur de Khatim",
      "KhatimGenDesc": "Générer des carrés magiques (Khatim) pour vos besoins spirituels.",
      "ZikrCounterName": "Compteur de Zikr",
      "ZikrCounterDesc": "Un outil numérique pour compter vos récitations de Zikr.",
      "AbjadCalcName": "Calculatrice Abjad",
      "AbjadCalcDesc": "Calculez la valeur numérique des mots et des phrases selon l'alphabet Abjad.",
      "TalsamBuilderName": "Créateur de Talsam",
      "TalsamBuilderDesc": "Outil avancé pour concevoir et structurer des Talsams."
    }
  },
  en: {
    translation: {
      "Welcome": "Welcome to AsrarTools",
      "WelcomeMessage": "The application has been successfully initialized.",
      "InstructionMessage": "Please type 'USER' or 'ADMIN' in the chat to generate the corresponding part of the application.",
      "Profile": "Profile",
      "DarkMode": "Dark Mode",
      "Language": "Language",
      "Tools": "Tools",
      "Settings": "Settings",
      "UserDashboardTitle": "User Dashboard",
      "SearchTools": "Search for a tool...",
      "StatusActive": "Active",
      "StatusMaintenance": "Maintenance",
      "StatusDisabled": "Disabled",
      "AccessTool": "Access",
      "KhatimGenName": "Khatim Generator",
      "KhatimGenDesc": "Generate magic squares (Khatim) for your spiritual needs.",
      "ZikrCounterName": "Zikr Counter",
      "ZikrCounterDesc": "A digital tool to count your Zikr recitations.",
      "AbjadCalcName": "Abjad Calculator",
      "AbjadCalcDesc": "Calculate the numerical value of words and phrases according to the Abjad alphabet.",
      "TalsamBuilderName": "Talsam Builder",
      "TalsamBuilderDesc": "Advanced tool for designing and structuring Talsams."
    }
  },
  ha: {
    translation: {
      "Welcome": "Barka da zuwa AsrarTools",
      "WelcomeMessage": "An fara gudanar da aikace-aikacen cikin nasara.",
      "InstructionMessage": "Da fatan za a rubuta 'USER' ko 'ADMIN' a cikin tattaunawar don samar da sashin aikace-aikacen da ya dace.",
      "Profile": "Bayani",
      "DarkMode": "Yanayin Duhu",
      "Language": "Harshe",
      "Tools": "Kayan aiki",
      "Settings": "Saituna",
      "UserDashboardTitle": "Allon Mai Amfani",
      "SearchTools": "Nemi kayan aiki...",
      "StatusActive": "Yana Aiki",
      "StatusMaintenance": "Gyara",
      "StatusDisabled": "An Kashe",
      "AccessTool": "Shiga",
      "KhatimGenName": "Mai Kirkirar Khatim",
      "KhatimGenDesc": "Kirkirar haruffan lissafi (Khatim) don bukatun ku na ruhaniya.",
      "ZikrCounterName": "Injin Zikiri",
      "ZikrCounterDesc": "Injin lissafin Zikiri na zamani.",
      "AbjadCalcName": "Lissafin Abjad",
      "AbjadCalcDesc": "Lissafin kimar lambobi na kalmomi da jimloli bisa ga haruffan Abjad.",
      "TalsamBuilderName": "Mai Kirkirar Talsam",
      "TalsamBuilderDesc": "Babban kayan aiki don tsara da kuma gina Talsam."
    }
  },
  ar: {
    translation: {
      "Welcome": "مرحباً بك في AsrarTools",
      "WelcomeMessage": "تمت تهيئة التطبيق بنجاح.",
      "InstructionMessage": "يرجى كتابة 'USER' أو 'ADMIN' في الدردشة لإنشاء الجزء المقابل من التطبيق.",
      "Profile": "الملف الشخصي",
      "DarkMode": "الوضع الداكن",
      "Language": "اللغة",
      "Tools": "الأدوات",
      "Settings": "الإعدادات",
      "UserDashboardTitle": "لوحة تحكم المستخدم",
      "SearchTools": "ابحث عن أداة...",
      "StatusActive": "نشط",
      "StatusMaintenance": "صيانة",
      "StatusDisabled": "معطل",
      "AccessTool": "دخول",
      "KhatimGenName": "مولد الخاتم",
      "KhatimGenDesc": "توليد المربعات السحرية (خاتم) لاحتياجاتك الروحية.",
      "ZikrCounterName": "عداد الذكر",
      "ZikrCounterDesc": "أداة رقمية لحساب تلاوات الذكر الخاصة بك.",
      "AbjadCalcName": "حاسبة أبجد",
      "AbjadCalcDesc": "احسب القيمة العددية للكلمات والعبارات وفقًا للأبجدية الأبجدية.",
      "TalsamBuilderName": "منشئ الطلسم",
      "TalsamBuilderDesc": "أداة متقدمة لتصميم وهيكلة الطلاسم."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr", // Default language is French
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
