import { useTranslation } from "react-i18next";

export const useStep2Fields = () => {
  const { t } = useTranslation();

  const formFields = [
    {
      name: "family.maritalStatus",
      label: t("form.step2.maritalStatus"),
      type: "select",
      options: [
        { value: "single", label: t("form.step2.maritalOptions.single") },
        { value: "married", label: t("form.step2.maritalOptions.married") },
        { value: "divorced", label: t("form.step2.maritalOptions.divorced") },
        { value: "widowed", label: t("form.step2.maritalOptions.widowed") },
      ],
    },
    {
      name: "family.dependents",
      label: t("form.step2.dependents"),
      type: "number",
      inputProps: { min: 0 },
    },
    {
      name: "family.employmentStatus",
      label: t("form.step2.employmentStatus"),
      type: "select",
      options: [
        {
          value: "employed",
          label: t("form.step2.employmentOptions.employed"),
        },
        {
          value: "unemployed",
          label: t("form.step2.employmentOptions.unemployed"),
        },
        { value: "student", label: t("form.step2.employmentOptions.student") },
        { value: "retired", label: t("form.step2.employmentOptions.retired") },
      ],
    },
    {
      name: "family.monthlyIncome",
      label: t("form.step2.monthlyIncome"),
      type: "number",
      inputProps: { min: 0, step: 100 },
    },
    {
      name: "family.housingStatus",
      label: t("form.step2.housingStatus"),
      type: "select",
      options: [
        { value: "rent", label: t("form.step2.housingOptions.rent") },
        { value: "own", label: t("form.step2.housingOptions.own") },
        { value: "family", label: t("form.step2.housingOptions.family") },
        { value: "other", label: t("form.step2.housingOptions.other") },
      ],
    },
  ];

  return formFields;
};
