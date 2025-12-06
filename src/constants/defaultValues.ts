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
    maritalStatus: undefined as any, // Let user select
    spouseName: "",
    dependents: undefined as any,
    householdMembers: undefined as any,
    employmentStatus: undefined as any, // Let user select
    monthlyIncome: undefined as any,
    otherIncome: undefined as any,
    housingStatus: undefined as any, // Let user select
    monthlyHousingCost: undefined as any,
    monthlyExpenses: undefined as any,
    emergencyContactName: "",
    emergencyContactPhone: "",
  },
  situation: {
    financialSituation: "",
    employmentCircumstances: "",
    reasonForApplying: "",
    currentChallenges: "",
    supportNeeded: "",
  },
  documents: {
    nationalId: [],
    proofOfAddress: [],
    incomeProof: [],
    additionalDocuments: [],
  },
};
