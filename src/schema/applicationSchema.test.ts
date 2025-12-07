import { applicationSchema } from "./applicationSchema";

describe("applicationSchema", () => {
  describe("personal section", () => {
    const validPersonal = {
      name: "John Doe",
      nationalId: "784-1234-1234567-1",
      dob: "1990-01-15",
      gender: "male" as const,
      address: "123 Main Street, Apt 4B",
      city: "Dubai",
      state: "Dubai",
      country: "UAE",
      phone: "+971501234567",
      email: "john.doe@example.com",
    };

    const validFamily = {
      maritalStatus: "single" as const,
      dependents: 0,
      householdMembers: 1,
      employmentStatus: "employed" as const,
      monthlyIncome: 5000,
      housingStatus: "rent" as const,
      monthlyExpenses: 3000,
      emergencyContactName: "Jane Doe",
      emergencyContactPhone: "+971509876543",
    };

    const validSituation = {
      financialSituation:
        "I am currently facing financial difficulties due to job loss.",
      employmentCircumstances:
        "I was laid off from my previous job three months ago.",
      reasonForApplying:
        "I need assistance to support my family during this difficult time.",
      currentChallenges: "Unable to pay rent and basic living expenses.",
      supportNeeded:
        "Financial assistance for rent and utilities for the next 3 months.",
    };

    const validDocuments = {
      nationalId: [],
      proofOfAddress: [],
      incomeProof: [],
      additionalDocuments: [],
    };

    it("should validate a complete valid application", () => {
      const result = applicationSchema.safeParse({
        personal: validPersonal,
        family: validFamily,
        situation: validSituation,
        documents: validDocuments,
      });
      expect(result.success).toBe(true);
    });

    it("should reject name that is too short", () => {
      const result = applicationSchema.safeParse({
        personal: { ...validPersonal, name: "A" },
        family: validFamily,
        situation: validSituation,
        documents: validDocuments,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain(
          "at least 2 characters"
        );
      }
    });

    it("should reject invalid Emirates ID format", () => {
      const result = applicationSchema.safeParse({
        personal: { ...validPersonal, nationalId: "123456789" },
        family: validFamily,
        situation: validSituation,
        documents: validDocuments,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("15 digits");
      }
    });

    it("should reject invalid email format", () => {
      const result = applicationSchema.safeParse({
        personal: { ...validPersonal, email: "not-an-email" },
        family: validFamily,
        situation: validSituation,
        documents: validDocuments,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("valid email");
      }
    });

    it("should reject invalid UAE phone number", () => {
      const result = applicationSchema.safeParse({
        personal: { ...validPersonal, phone: "123" },
        family: validFamily,
        situation: validSituation,
        documents: validDocuments,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("valid UAE phone");
      }
    });
  });

  describe("family section", () => {
    it("should reject negative dependents", () => {
      const result = applicationSchema.shape.family.safeParse({
        maritalStatus: "single",
        dependents: -1,
        householdMembers: 1,
        employmentStatus: "employed",
        monthlyIncome: 5000,
        housingStatus: "rent",
        monthlyExpenses: 3000,
        emergencyContactName: "Jane Doe",
        emergencyContactPhone: "+971509876543",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("cannot be negative");
      }
    });

    it("should require at least 1 household member", () => {
      const result = applicationSchema.shape.family.safeParse({
        maritalStatus: "single",
        dependents: 0,
        householdMembers: 0,
        employmentStatus: "employed",
        monthlyIncome: 5000,
        housingStatus: "rent",
        monthlyExpenses: 3000,
        emergencyContactName: "Jane Doe",
        emergencyContactPhone: "+971509876543",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("At least 1");
      }
    });
  });

  describe("situation section", () => {
    it("should reject text that is too short", () => {
      const result = applicationSchema.shape.situation.safeParse({
        financialSituation: "Short",
        employmentCircumstances: "I was laid off from my previous job.",
        reasonForApplying: "I need assistance to support my family.",
        currentChallenges: "Unable to pay rent and basic living expenses.",
        supportNeeded: "Financial assistance for rent and utilities.",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain(
          "at least 10 characters"
        );
      }
    });
  });
});
