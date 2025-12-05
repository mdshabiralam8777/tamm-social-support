import type { ApplicationFormType } from "../schema/applicationSchema";

export const DEFAULT_VALUES: ApplicationFormType = {
  personal: {
    name: "",
    nationalId: "",
    dob: "",
    gender: "male",
    address: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
  },
  family: {
    maritalStatus: "single",
    dependents: 0,
    employmentStatus: "unemployed",
    monthlyIncome: 0,
    housingStatus: "rent",
  },
  situation: {
    financialSituation: "",
    employmentCircumstances: "",
    reasonForApplying: "",
  },
  documents: {
    nationalId: [],
    proofOfAddress: [],
    incomeProof: [],
    additionalDocuments: [],
  },
};
