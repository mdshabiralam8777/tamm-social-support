import { useTranslation } from "react-i18next";
import { useWatch } from "react-hook-form";

export const useStep2Fields = () => {
  const { t } = useTranslation();

  // Watch marital status and housing status to conditionally show fields
  const maritalStatus = useWatch({ name: "family.maritalStatus" });
  const housingStatus = useWatch({ name: "family.housingStatus" });

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
    // Show spouse name only if married
    ...(maritalStatus === "married"
      ? [
          {
            name: "family.spouseName",
            label: t("form.step2.spouseName"),
            type: "text",
          },
        ]
      : []),
    {
      name: "family.dependents",
      label: t("form.step2.dependents"),
      type: "number",
      inputProps: { min: 0, max: 20 },
    },
    {
      name: "family.householdMembers",
      label: t("form.step2.householdMembers"),
      type: "number",
      inputProps: { min: 1, max: 50 },
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
      name: "family.otherIncome",
      label: t("form.step2.otherIncome"),
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
    // Show monthly housing cost if renting or owning
    ...(housingStatus === "rent" || housingStatus === "own"
      ? [
          {
            name: "family.monthlyHousingCost",
            label:
              housingStatus === "rent"
                ? t("form.step2.monthlyRent")
                : t("form.step2.monthlyMortgage"),
            type: "number",
            inputProps: { min: 0, step: 100 },
          },
        ]
      : []),
    {
      name: "family.monthlyExpenses",
      label: t("form.step2.monthlyExpenses"),
      type: "number",
      inputProps: { min: 0, step: 100 },
    },
    {
      name: "family.emergencyContactName",
      label: t("form.step2.emergencyContactName"),
      type: "text",
    },
    {
      name: "family.emergencyContactPhone",
      label: t("form.step2.emergencyContactPhone"),
      type: "tel",
    },
  ];

  return formFields;
};
