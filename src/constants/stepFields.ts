// src/constants/stepFields.ts

export const STEP_FIELDS = [
  // Step 1: personal
  [
    "personal.name",
    "personal.nationalId",
    "personal.dob",
    "personal.gender",
    "personal.address",
    "personal.city",
    "personal.state",
    "personal.country",
    "personal.phone",
    "personal.email",
  ],
  // Step 2: family
  [
    "family.maritalStatus",
    "family.dependents",
    "family.employmentStatus",
    "family.monthlyIncome",
    "family.housingStatus",
  ],
  // Step 3: situation
  [
    "situation.financialSituation",
    "situation.employmentCircumstances",
    "situation.reasonForApplying",
  ],
  // Step 4: documents
  [
    "documents.nationalId",
    "documents.proofOfAddress",
    "documents.incomeProof",
    "documents.additionalDocuments",
  ],
] as const;
