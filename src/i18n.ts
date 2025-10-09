import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      // Common & Navigation
      brand: "TAMM Social Support",
      home: "Home",
      applyNow: "Apply for Support",
      next: "Next",
      back: "Back",
      submit: "Submit Application",
      open: "OPEN",
      processing: "Processing your request...",
      comingSoonSubMsg:
        "In the meantime, you can explore other services or apply for Social Support.",

      // Home Page
      mainBanner: "Abu Dhabi Government Services",
      homeHeader: "Apply for assistance with a simple, guided form.",
      servicesList: "List of Services",
      comingSoon: "Coming soon",
      comingSoonMsg:
        "This service is not available yet. We’re working hard to bring it online.",
      submissionPage: {
        title: "Request Submitted Successfully 🎉",
        body: "Your social support application has been submitted successfully.",
        ref: "Reference No:",
        save: "Please save this reference number for your records.",
        home: "Back to Home",
      },
      services: {
        socialSupport: {
          title: "Social Support",
          description:
            "Apply for financial assistance easily, quickly, and with smart help.",
        },
        agriculture: {
          title: "Agriculture & Livestock",
          description: "Farms, Livestock and Animals",
        },
        housing: {
          title: "Housing & Properties",
          description: "Houses, Lands and Real Estate",
        },
        identity: {
          title: "Identity & Citizenship",
          description: "Residency, Identity, Entry Permit, and Work",
        },
        police: {
          title: "Police Services",
          description:
            "Firearm Licencing and Penal and Correctional Institutions related services",
        },
        transport: {
          title: "Drive & Transport",
          description: "Vehicles, Traffic and Driving Services",
        },
        work: {
          title: "Work & Education",
          description: "Work, Education, and Training",
        },
        healthcare: {
          title: "Healthcare Services",
          description: "Health Insurance, Licensing, and Facilities",
        },
        culture: {
          title: "Culture & Leisure",
          description: "Tourism, Culture and Diversity",
        },
        deceased: {
          title: "Deceased & Inheritance",
          description: "Legislation and Inheritance-related Services",
        },
      },
      // Form Wizard
      steps: {
        personal: "Personal Information",
        family: "Family & Financial Info",
        situation: "Situation Descriptions",
      },

      // Form Fields & Labels
      form: {
        step1: {
          name: "Name",
          nationalId: "National ID",
          dob: "Date of Birth",
          gender: "Gender",
          address: "Address",
          city: "City",
          state: "State",
          country: "Country",
          phone: "Phone",
          email: "Email",
          genderOptions: {
            male: "Male",
            female: "Female",
            other: "Other",
          },
        },
        step2: {
          maritalStatus: "Marital Status",
          dependents: "Dependents",
          employmentStatus: "Employment Status",
          monthlyIncome: "Monthly Income",
          housingStatus: "Housing Status",
          maritalOptions: {
            single: "Single",
            married: "Married",
            divorced: "Divorced",
            widowed: "Widowed",
          },
          employmentOptions: {
            employed: "Employed",
            unemployed: "Unemployed",
            student: "Student",
            retired: "Retired",
          },
          housingOptions: {
            rent: "Rent",
            own: "Own",
            family: "Family",
            other: "Other",
          },
        },
        step3: {
          financialSituation: "Current Financial Situation",
          employmentCircumstances: "Employment Circumstances",
          reasonForApplying: "Reason for Applying",
          placeholders: {
            financial: "Describe your current financial situation...",
            employment: "Describe your employment situation...",
            reason: "Why are you applying for assistance?",
          },
        },
      },

      // Dialogs & Notifications
      helpMeWrite: "Help Me Write",
      accept: "Accept",
      edit: "Edit",
      discard: "Discard",
      close: "Close",
      draftSaved: "Draft saved",
      submitted: "Application submitted",
      submissionFailed: "Submission failed",
    },
  },
  ar: {
    translation: {
      // Common & Navigation
      brand: "تمّ للدعم الاجتماعي",
      home: "الصفحة الرئيسية",
      applyNow: "تقديم طلب دعم",
      next: "التالي",
      back: "السابق",
      submit: "إرسال الطلب",
      open: "مفتوحة",
      processing: "جاري معالجة طلبك...",
      comingSoonSubMsg:
        "في هذه الأثناء، يمكنك استكشاف خدمات أخرى أو التقدم بطلب للحصول على الدعم الاجتماعي.",

      // Home Page
      mainBanner: "خدمات حكومة أبوظبي",
      homeHeader: "قدم طلبًا للمساعدة عبر نموذج بسيط وموجه.",
      servicesList: "قائمة الخدمات",
      comingSoon: "قريبا",
      comingSoonMsg:
        "هذه الخدمة غير متوفرة بعد. نعمل بجد لإتاحتها عبر الإنترنت.",
      submissionPage: {
        title: "تم تقديم الطلب بنجاح 🎉",
        body: "تم تقديم طلب الدعم الاجتماعي الخاص بك بنجاح.",
        ref: "الرقم المرجعي:",
        save: "يرجى حفظ هذا الرقم المرجعي لسجلاتك.",
        home: "العودة إلى الصفحة الرئيسية",
      },

      services: {
        socialSupport: {
          title: "الدعم الاجتماعي",
          description:
            "قدم طلبًا للحصول على مساعدة مالية بسهولة وسرعة وبمساعدة ذكية.",
        },
        agriculture: {
          title: "الزراعة والثروة الحيوانية",
          description: "المزارع والمواشي والحيوانات",
        },
        housing: {
          title: "الإسكان والعقارات",
          description: "المنازل والأراضي والعقارات",
        },
        identity: {
          title: "الهوية والمواطنة",
          description: "الإقامة والهوية وتصريح الدخول والعمل",
        },
        police: {
          title: "خدمات الشرطة",
          description:
            "خدمات تراخيص الأسلحة النارية والمؤسسات العقابية والإصلاحية",
        },
        transport: {
          title: "القيادة والمواصلات",
          description: "خدمات المركبات والمرور والقيادة",
        },
        work: {
          title: "العمل والتعليم",
          description: "العمل والتعليم والتدريب",
        },
        healthcare: {
          title: "خدمات الرعاية الصحية",
          description: "التأمين الصحي والتراخيص والمرافق",
        },
        culture: {
          title: "الثقافة والترفيه",
          description: "السياحة والثقافة والتنوع",
        },
        deceased: {
          title: "المتوفى والميراث",
          description: "خدمات التشريعات والميراث",
        },
      },
      // Form Wizard
      steps: {
        personal: "المعلومات الشخصية",
        family: "الأسرة والوضع المالي",
        situation: "وصف الحالة",
      },

      // Form Fields & Labels
      form: {
        step1: {
          name: "الاسم",
          nationalId: "الرقم الوطني",
          dob: "تاريخ الميلاد",
          gender: "الجنس",
          address: "العنوان",
          city: "المدينة",
          state: "الإمارة",
          country: "الدولة",
          phone: "الهاتف",
          email: "البريد الإلكتروني",
          genderOptions: {
            male: "ذكر",
            female: "أنثى",
            other: "آخر",
          },
        },
        step2: {
          maritalStatus: "الحالة الاجتماعية",
          dependents: "عدد المعالين",
          employmentStatus: "الحالة الوظيفية",
          monthlyIncome: "الدخل الشهري",
          housingStatus: "حالة السكن",
          maritalOptions: {
            single: "أعزب/عزباء",
            married: "متزوج/متزوجة",
            divorced: "مطلق/مطلقة",
            widowed: "أرمل/أرملة",
          },
          employmentOptions: {
            employed: "موظف",
            unemployed: "عاطل عن العمل",
            student: "طالب",
            retired: "متقاعد",
          },
          housingOptions: {
            rent: "إيجار",
            own: "ملك",
            family: "مع العائلة",
            other: "آخر",
          },
        },
        step3: {
          financialSituation: "الوضع المالي الحالي",
          employmentCircumstances: "الظروف الوظيفية",
          reasonForApplying: "سبب تقديم الطلب",
          placeholders: {
            financial: "صف وضعك المالي الحالي...",
            employment: "صف وضعك الوظيفي...",
            reason: "لماذا تتقدم بطلب للحصول على المساعدة؟",
          },
        },
      },

      // Dialogs & Notifications
      helpMeWrite: "ساعدني في الكتابة",
      accept: "اعتماد",
      edit: "تعديل",
      discard: "تجاهل",
      close: "إغلاق",
      draftSaved: "تم حفظ المسودة",
      submitted: "تم إرسال الطلب",
      submissionFailed: "فشل الإرسال",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
