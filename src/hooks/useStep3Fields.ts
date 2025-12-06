import { useTranslation } from "react-i18next";

export const useStep3Fields = () => {
  const { t } = useTranslation();

  const formFields = [
    {
      id: "financial",
      name: "situation.financialSituation",
      label: t("form.step3.financialSituation"),
      placeholder: t("form.step3.placeholders.financial"),
      seedText:
        "Describe current financial situation for a social support application. Keep it factual, respectful, and concise (120-160 words).",
      rows: 4,
    },
    {
      id: "employment",
      name: "situation.employmentCircumstances",
      label: t("form.step3.employmentCircumstances"),
      placeholder: t("form.step3.placeholders.employment"),
      seedText:
        "Describe employment circumstances (unemployed/looking/part-time/etc.), recent changes, and constraints in a respectful tone (80-140 words).",
      rows: 4,
    },
    {
      id: "reason",
      name: "situation.reasonForApplying",
      label: t("form.step3.reasonForApplying"),
      placeholder: t("form.step3.placeholders.reason"),
      seedText:
        "Explain the primary reason for applying for financial assistance, including responsibilities and intended use of funds (80-140 words).",
      rows: 4,
    },
    {
      id: "challenges",
      name: "situation.currentChallenges",
      label: t("form.step3.currentChallenges"),
      placeholder: t("form.step3.placeholders.challenges"),
      seedText:
        "Describe the main challenges you are currently facing that require support. Be specific but respectful (60-100 words).",
      rows: 3,
    },
    {
      id: "support",
      name: "situation.supportNeeded",
      label: t("form.step3.supportNeeded"),
      placeholder: t("form.step3.placeholders.support"),
      seedText:
        "Describe what type of support would help you most and how you plan to use it to improve your situation (60-100 words).",
      rows: 3,
    },
  ];

  return formFields;
};
