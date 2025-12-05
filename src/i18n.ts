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
        documents: "Document Upload",
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
          spouseName: "Spouse Name",
          dependents: "Number of Dependents",
          householdMembers: "Total Household Members",
          employmentStatus: "Employment Status",
          monthlyIncome: "Monthly Income (AED)",
          otherIncome: "Other Income (AED)",
          housingStatus: "Housing Status",
          monthlyRent: "Monthly Rent (AED)",
          monthlyMortgage: "Monthly Mortgage (AED)",
          monthlyExpenses: "Total Monthly Expenses (AED)",
          emergencyContactName: "Emergency Contact Name",
          emergencyContactPhone: "Emergency Contact Phone",
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
          currentChallenges: "Current Challenges",
          supportNeeded: "Support Needed",
          placeholders: {
            financial: "Describe your current financial situation...",
            employment: "Describe your employment situation...",
            reason: "Why are you applying for assistance?",
            challenges:
              "Describe the main challenges you are currently facing...",
            support: "What type of support would help you most?",
          },
        },
        step4: {
          title: "Document Upload",
          description:
            "Please upload the required documents to support your application. All documents must be clear and readable.",
          fileRequirements:
            "Accepted formats: PDF, JPG, PNG. Maximum file size: 5MB per file.",
          nationalId: "National ID / Emirates ID",
          nationalIdDesc:
            "Copy of your Emirates ID (front and back) or passport for residents",
          proofOfAddress: "Proof of Address",
          proofOfAddressDesc:
            "Recent utility bill, rental agreement, or official document showing your current address",
          incomeProof: "Income Proof (Optional)",
          incomeProofDesc:
            "Salary certificate, bank statements, or other proof of income",
          additionalDocuments: "Additional Documents",
          additionalDocumentsDesc:
            "Any other supporting documents relevant to your application",
          required: "Required",
          clickToUpload: "Click to upload or drag and drop",
          fileTooLarge: "File size exceeds 5MB limit",
          invalidFileType:
            "Invalid file type. Please upload PDF, JPG, or PNG files",
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

      // Chatbot
      chatbot: {
        title: "AI Chat Assistant",
        placeholder: "Type a message...",
        typing: "Typing",
        clearChat: "Clear Chat",
        welcome: {
          default: "Hello! How can I help you with TAMM services today?",
          home: "Welcome to TAMM! How can I assist you with our services?",
          apply:
            "I'm here to help with your application. What questions do you have?",
          submitted:
            "Congratulations on submitting! I can help answer questions about your application.",
        },
        error:
          "I'm sorry, something went wrong. Please try again later or contact support.",
        quickReplies: {
          howToApply: "How do I apply for financial assistance?",
          documents: "What documents do I need?",
          processTime: "How long does the process take?",
          checkStatus: "Can I check my application status?",
          eligibility: "What are the eligibility requirements?",
          contactSupport: "How do I contact support?",
        },
      },

      // Footer
      footer: {
        description:
          "Your gateway to Abu Dhabi government services. Access all essential services in one unified portal.",
        servicesTitle: "Services",
        quickLinksTitle: "Quick Links",
        legalTitle: "Legal",
        services: {
          agriculture: "Agriculture & Livestock",
          housing: "Housing & Properties",
          identity: "Identity & Citizenship",
          police: "Police Services",
          transport: "Drive & Transport",
          work: "Work & Education",
        },
        quickLinks: {
          about: "About TAMM",
          contactUs: "Contact Us",
          faq: "FAQs",
          feedback: "Feedback",
          sitemap: "Sitemap",
        },
        legal: {
          terms: "Terms & Conditions",
          privacy: "Privacy Policy",
          accessibility: "Accessibility",
          disclaimer: "Disclaimer",
        },
        copyright: "© {{year}} TAMM. All rights reserved.",
        abuDhabiGov: "Abu Dhabi Government",
        uaeGov: "UAE Government",
      },

      // Dashboard
      dashboard: {
        title: "My Applications",
        noApplications: "No applications yet",
        noApplicationsMessage:
          "You haven't submitted any applications. Start by applying for social support.",
        trackMessage:
          "Track the status of your applications below. You'll receive updates as your application progresses.",
        status: {
          submitted: "Submitted",
          in_review: "In Review",
          pending_documents: "Pending Documents",
          approved: "Approved",
          rejected: "Rejected",
        },
        referenceNumber: "Reference Number",
        submittedOn: "Submitted On",
        lastUpdate: "Last Update",
        estimatedCompletion: "Estimated Completion",
        progress: "Progress",
        viewDetails: "View Details",
        applyNow: "Apply Now",
        submitAnother: "Submit Another Application",
        justNow: "Just now",
        hoursAgo: "{{count}} hour ago",
        hoursAgo_other: "{{count}} hours ago",
        daysAgo: "{{count}} day ago",
        daysAgo_other: "{{count}} days ago",
        weeksAgo: "{{count}} week ago",
        weeksAgo_other: "{{count}} weeks ago",
      },

      // Form Validation Hints
      formHints: {
        emiratesId: "Format: 784-XXXX-XXXXXXX-X (15 digits)",
        phone: "UAE number: +971-XX-XXX-XXXX or 05XXXXXXXX",
        // email: "Use your official email address",
        dob: "Must be 18 years or older",
        name: "Enter your full name as it appears on official documents",
        address: "Enter your complete residential address",
        spouseName: "Enter spouse's full legal name",
        dependents: "Number of children or adults you support",
        householdMembers: "Total people living in your household",
        monthlyIncome: "Your monthly salary or income in AED",
        otherIncome:
          "Pension, benefits, or other income sources (leave 0 if none)",
        monthlyHousingCost: "Your monthly rent or mortgage payment",
        monthlyExpenses: "Total monthly bills, food, transport, etc.",
        emergencyContact: "Full name of emergency contact person",
      },
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
        documents: "تحميل المستندات",
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
          currentChallenges: "التحديات الحالية",
          supportNeeded: "الدعم المطلوب",
          placeholders: {
            financial: "صف وضعك المالي الحالي...",
            employment: "صف وضعك الوظيفي...",
            reason: "لماذا تتقدم بطلب للحصول على المساعدة؟",
            challenges: "صف التحديات الرئيسية التي تواجهها حالياً...",
            support: "ما نوع الدعم الذي سيساعدك أكثر؟",
          },
        },
        step4: {
          title: "تحميل المستندات",
          description:
            "يرجى تحميل المستندات المطلوبة لدعم طلبك. يجب أن تكون جميع المستندات واضحة وقابلة للقراءة.",
          fileRequirements:
            "الصيغ المقبولة: PDF، JPG، PNG. الحد الأقصى لحجم الملف: 5 ميجابايت لكل ملف.",
          nationalId: "الهوية الوطنية / الهوية الإماراتية",
          nationalIdDesc:
            "نسخة من الهوية الإماراتية (الأمامية والخلفية) أو جواز السفر للمقيمين",
          proofOfAddress: "إثبات العنوان",
          proofOfAddressDesc:
            "فاتورة خدمات حديثة أو عقد إيجار أو مستند رسمي يوضح عنوانك الحالي",
          incomeProof: "إثبات الدخل (اختياري)",
          incomeProofDesc:
            "شهادة راتب أو كشوف حسابات بنكية أو أي إثبات آخر للدخل",
          additionalDocuments: "مستندات إضافية",
          additionalDocumentsDesc: "أي مستندات داعمة أخرى ذات صلة بطلبك",
          required: "مطلوب",
          clickToUpload: "انقر للتحميل أو اسحب وأفلت",
          fileTooLarge: "حجم الملف يتجاوز حد 5 ميجابايت",
          invalidFileType:
            "نوع ملف غير صالح. يرجى تحميل ملفات PDF أو JPG أو PNG",
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

      // Chatbot
      chatbot: {
        title: "مساعد الدردشة الذكي",
        placeholder: "اكتب رسالة...",
        typing: "يكتب",
        clearChat: "مسح المحادثة",
        welcome: {
          default: "مرحباً! كيف يمكنني مساعدتك في خدمات تمّ اليوم؟",
          home: "أهلاً بك في تمّ! كيف يمكنني مساعدتك في خدماتنا؟",
          apply: "أنا هنا لمساعدتك في طلبك. ما هي أسئلتك؟",
          submitted: "تهانينا على التقديم! يمكنني الإجابة على أسئلتك حول طلبك.",
        },
        error:
          "نأسف، حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقاً أو الاتصال بالدعم.",
        quickReplies: {
          howToApply: "كيف أتقدم بطلب للحصول على مساعدة مالية؟",
          documents: "ما هي المستندات التي أحتاجها؟",
          processTime: "كم من الوقت تستغرق العملية؟",
          checkStatus: "هل يمكنني التحقق من حالة طلبي؟",
          eligibility: "ما هي شروط الأهلية؟",
          contactSupport: "كيف أتواصل مع الدعم؟",
        },
      },

      // Footer
      footer: {
        description:
          "بوابتك إلى خدمات حكومة أبوظبي. الوصول إلى جميع الخدمات الأساسية في بوابة موحدة.",
        servicesTitle: "الخدمات",
        quickLinksTitle: "روابط سريعة",
        legalTitle: "قانوني",
        services: {
          agriculture: "الزراعة والثروة الحيوانية",
          housing: "الإسكان والعقارات",
          identity: "الهوية والمواطنة",
          police: "خدمات الشرطة",
          transport: "القيادة والمواصلات",
          work: "العمل والتعليم",
        },
        quickLinks: {
          about: "حول تمّ",
          contactUs: "اتصل بنا",
          faq: "الأسئلة الشائعة",
          feedback: "التعليقات",
          sitemap: "خريطة الموقع",
        },
        legal: {
          terms: "الشروط والأحكام",
          privacy: "سياسة الخصوصية",
          accessibility: "إمكانية الوصول",
          disclaimer: "إخلاء المسؤولية",
        },
        copyright: "© {{year}} تمّ. جميع الحقوق محفوظة",
        abuDhabiGov: "حكومة أبوظبي",
        uaeGov: "حكومة دولة الإمارات",
      },

      // Dashboard
      dashboard: {
        title: "طلباتي",
        noApplications: "لا توجد طلبات بعد",
        noApplicationsMessage:
          "لم تقم بتقديم أي طلبات. ابدأ بالتقديم للحصول على الدعم الاجتماعي.",
        trackMessage: "تتبع حالة طلباتك أدناه. ستتلقى تحديثات أثناء تقدم طلبك.",
        status: {
          submitted: "تم التقديم",
          in_review: "قيد المراجعة",
          pending_documents: "في انتظار المستندات",
          approved: "تمت الموافقة",
          rejected: "مرفوض",
        },
        referenceNumber: "الرقم المرجعي",
        submittedOn: "تم التقديم في",
        lastUpdate: "آخر تحديث",
        estimatedCompletion: "الإنجاز المتوقع",
        progress: "التقدم",
        viewDetails: "عرض التفاصيل",
        applyNow: "تقديم طلب",
        submitAnother: "تقديم طلب آخر",
        justNow: "الآن",
        hoursAgo: "منذ {{count}} ساعة",
        hoursAgo_other: "منذ {{count}} ساعات",
        daysAgo: "منذ {{count}} يوم",
        daysAgo_other: "منذ {{count}} أيام",
        weeksAgo: "منذ {{count}} أسبوع",
        weeksAgo_other: "منذ {{count}} أسابيع",
      },

      // Form Validation Hints
      formHints: {
        emiratesId: "التنسيق: 784-XXXX-XXXXXXX-X (15 رقماً)",
        phone: "رقم الإمارات: +971-XX-XXX-XXXX أو 05XXXXXXXX",
        email: "استخدم بريدك الإلكتروني الرسمي",
        dob: "يجب أن يكون عمرك 18 عاماً أو أكثر",
        name: "أدخل اسمك الكامل كما يظهر في المستندات الرسمية",
        address: "أدخل عنوانك السكني الكامل",
      },
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
