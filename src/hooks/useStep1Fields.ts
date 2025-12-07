import { useTranslation } from "react-i18next";

export const useStep1Fields = () => {
  const { t } = useTranslation();

  const formFields = [
    {
      name: "personal.name",
      label: t("form.step1.name"),
      type: "text",
      formatHint: t("formHints.name"),
    },
    {
      name: "personal.nationalId",
      label: t("form.step1.nationalId"),
      type: "text",
      formatHint: t("formHints.emiratesId"),
    },
    {
      name: "personal.dob",
      label: t("form.step1.dob"),
      type: "date",
      formatHint: t("formHints.dob"),
    },
    {
      name: "personal.gender",
      label: t("form.step1.gender"),
      type: "select",
      options: [
        { value: "male", label: t("form.step1.genderOptions.male") },
        { value: "female", label: t("form.step1.genderOptions.female") },
        { value: "other", label: t("form.step1.genderOptions.other") },
      ],
    },
    {
      name: "personal.address",
      label: t("form.step1.address"),
      type: "text",
      formatHint: t("formHints.address"),
    },
    { name: "personal.city", label: t("form.step1.city"), type: "text" },
    { name: "personal.state", label: t("form.step1.state"), type: "text" },
    { name: "personal.country", label: t("form.step1.country"), type: "text" },
    {
      name: "personal.phone",
      label: t("form.step1.phone"),
      type: "tel",
      formatHint: t("formHints.phone"),
    },
    {
      name: "personal.email",
      label: t("form.step1.email"),
      type: "email",
      // formatHint: t("formHints.email"),
    },
  ];

  return formFields;
};
