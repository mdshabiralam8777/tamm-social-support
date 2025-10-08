export type PersonalInfo = {
  name: string;
  nationalId: string;
  dob: string; // ISO date
  gender: "male" | "female" | "other";
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
};

export type FamilyFinancial = {
  maritalStatus: "single" | "married" | "divorced" | "widowed";
  dependents: number;
  employmentStatus: "employed" | "unemployed" | "student" | "retired";
  monthlyIncome: number;
  housingStatus: "rent" | "own" | "family" | "other";
};

export type SituationDescriptions = {
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
};

export type ApplicationData = {
  personal: PersonalInfo;
  family: FamilyFinancial;
  situation: SituationDescriptions;
};
