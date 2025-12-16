import { z } from "zod";
import { calculateAge } from "../utils/inputUtils";

// Name regex: allows letters (Latin and Arabic), spaces, hyphens, apostrophes
const NAME_REGEX = /^[\p{L}\s'-]+$/u;

export const applicationSchema = z.object({
  personal: z.object({
    name: z
      .string({ required_error: "Please enter your full name" })
      .trim()
      .min(2, "Your name must be at least 2 characters")
      .max(100, "Name is too long (maximum 100 characters)")
      .regex(
        NAME_REGEX,
        "Name can only contain letters, spaces, hyphens, and apostrophes"
      ),
    nationalId: z
      .string({ required_error: "Please enter your Emirates ID" })
      .trim()
      .min(15, "Emirates ID must be 15 digits")
      .regex(
        /^784-?\d{4}-?\d{7}-?\d$/,
        "Please enter a valid Emirates ID (Format: 784-XXXX-XXXXXXX-X)"
      ),
    dob: z
      .string({ required_error: "Please select your date of birth." })
      .trim()
      .refine(
        (v) => !Number.isNaN(Date.parse(v)),
        "Enter a valid date of birth."
      )
      .refine((v) => {
        const age = calculateAge(v);
        return age >= 18;
      }, "You must be at least 18 years old to apply."),
    gender: z.enum(["male", "female", "other"], {
      required_error: "Please select your gender.",
      invalid_type_error: "Please select a valid gender option.",
    }),
    address: z
      .string({ required_error: "Please enter your address." })
      .trim()
      .min(5, "Address must be at least 5 characters."),
    city: z
      .string({ required_error: "Please enter your city." })
      .trim()
      .min(2, "City must be at least 2 characters.")
      .regex(NAME_REGEX, "City can only contain letters and spaces"),
    state: z
      .string({ required_error: "Please enter your state." })
      .trim()
      .min(2, "State must be at least 2 characters.")
      .regex(NAME_REGEX, "State can only contain letters and spaces"),
    country: z
      .string({ required_error: "Please enter your country." })
      .trim()
      .min(2, "Country must be at least 2 characters.")
      .regex(NAME_REGEX, "Country can only contain letters and spaces"),
    phone: z
      .string({ required_error: "Please enter your phone number" })
      .trim()
      .regex(
        /^(\+971|00971|0)?[0-9]{9}$/,
        "Please enter a valid UAE phone number (e.g., +971-XX-XXX-XXXX or 05XXXXXXXX)"
      ),
    email: z
      .string({ required_error: "Please enter your email address" })
      .trim()
      .email("Please enter a valid email address")
      .toLowerCase(),
  }),

  family: z.object({
    maritalStatus: z.enum(["single", "married", "divorced", "widowed"], {
      required_error: "Please select your marital status",
      invalid_type_error: "Please select a valid marital status",
    }),
    spouseName: z
      .string()
      .trim()
      .min(2, "Spouse name must be at least 2 characters")
      .max(100, "Name is too long")
      .regex(
        NAME_REGEX,
        "Name can only contain letters, spaces, hyphens, and apostrophes"
      )
      .optional()
      .or(z.literal("")),
    dependents: z.coerce
      .number({
        invalid_type_error: "Dependents must be a number",
      })
      .int("Dependents must be a whole number")
      .min(0, "Dependents cannot be negative")
      .max(20, "Please enter a realistic number of dependents (0–20)"),
    householdMembers: z.coerce
      .number({
        invalid_type_error: "Household members must be a number",
      })
      .int("Household members must be a whole number")
      .min(1, "At least 1 household member (yourself)")
      .max(50, "Please enter a realistic number"),
    employmentStatus: z.enum(["employed", "unemployed", "student", "retired"], {
      required_error: "Please select your employment status",
      invalid_type_error: "Please select a valid employment status",
    }),
    monthlyIncome: z.coerce
      .number({
        invalid_type_error: "Monthly income must be a number",
      })
      .min(0, "Monthly income cannot be negative")
      .max(1_000_000, "Please enter a realistic monthly income"),
    otherIncome: z.coerce
      .number({
        invalid_type_error: "Other income must be a number",
      })
      .min(0, "Other income cannot be negative")
      .max(1_000_000, "Please enter a realistic amount")
      .optional()
      .or(z.literal(0)),
    housingStatus: z.enum(["rent", "own", "family", "other"], {
      required_error: "Please select your housing status",
      invalid_type_error: "Please select a valid housing status",
    }),
    monthlyHousingCost: z.coerce
      .number({
        invalid_type_error: "Housing cost must be a number",
      })
      .min(0, "Housing cost cannot be negative")
      .max(1_000_000, "Please enter a realistic amount")
      .optional()
      .or(z.literal(0)),
    monthlyExpenses: z.coerce
      .number({
        invalid_type_error: "Monthly expenses must be a number",
      })
      .min(0, "Monthly expenses cannot be negative")
      .max(1_000_000, "Please enter a realistic amount"),
    emergencyContactName: z
      .string({ required_error: "Please enter an emergency contact name" })
      .trim()
      .min(2, "Contact name must be at least 2 characters")
      .max(100, "Name is too long")
      .regex(
        NAME_REGEX,
        "Name can only contain letters, spaces, hyphens, and apostrophes"
      ),
    emergencyContactPhone: z
      .string({ required_error: "Please enter an emergency contact phone" })
      .trim()
      .regex(
        /^(\+971|00971|0)?[0-9]{9}$/,
        "Please enter a valid UAE phone number"
      ),
  }),

  situation: z.object({
    financialSituation: z
      .string({
        required_error: "Please describe your current financial situation",
      })
      .trim()
      .min(10, "Please provide at least 10 characters")
      .max(2000, "Please keep it under 2000 characters"),
    employmentCircumstances: z
      .string({
        required_error: "Please describe your employment circumstances",
      })
      .trim()
      .min(10, "Please provide at least 10 characters")
      .max(2000, "Please keep it under 2000 characters"),
    reasonForApplying: z
      .string({ required_error: "Please explain your reason for applying" })
      .trim()
      .min(10, "Please provide at least 10 characters")
      .max(2000, "Please keep it under 2000 characters"),
    currentChallenges: z
      .string({ required_error: "Please describe your current challenges" })
      .trim()
      .min(10, "Please provide at least 10 characters")
      .max(1500, "Please keep it under 1500 characters"),
    supportNeeded: z
      .string({ required_error: "Please describe the support you need" })
      .trim()
      .min(10, "Please provide at least 10 characters")
      .max(1500, "Please keep it under 1500 characters"),
  }),

  documents: z.object({
    nationalId: z.array(z.any()).optional(),
    proofOfAddress: z.array(z.any()).optional(),
    incomeProof: z.array(z.any()).optional(),
    additionalDocuments: z.array(z.any()).optional(),
  }),
});

export type ApplicationFormType = z.infer<typeof applicationSchema>;
