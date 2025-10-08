import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      brand: "TAMM Social Support",
      home: "Home",
      applyNow: "Apply for Support",
      steps: {
        personal: "Personal Information",
        family: "Family & Financial Info",
        situation: "Situation Descriptions",
      },
      next: "Next",
      back: "Back",
      submit: "Submit Application",
      helpMeWrite: "Help Me Write",
      accept: "Accept",
      edit: "Edit",
      discard: "Discard",
      draftSaved: "Draft saved",
      submitted: "Application submitted",
      open: "OPEN | مفتوحة",
    },
  },
  ar: {
    translation: {
      brand: "تمّ للدعم الاجتماعي",
      home: "الصفحة الرئيسية",
      applyNow: "تقديم طلب دعم",
      steps: {
        personal: "المعلومات الشخصية",
        family: "الأسرة والمال",
        situation: "وصف الحالة",
      },
      next: "التالي",
      back: "السابق",
      submit: "إرسال الطلب",
      helpMeWrite: "ساعدني في الكتابة",
      accept: "اعتماد",
      edit: "تعديل",
      discard: "تجاهل",
      draftSaved: "تم حفظ المسودة",
      submitted: "تم إرسال الطلب",
      open: "مفتوحة | OPEN",
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
  });

export default i18n;
