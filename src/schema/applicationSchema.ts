import { z } from "zod";

export const applicationSchema = z.object({
  personal: z.object({
    name: z
      .string({ required_error: "Please enter your full name." })
      .trim()
      .min(2, "Name must be at least 2 characters."),
    nationalId: z
      .string({ required_error: "Please enter your National ID." })
      .trim()
      .min(6, "National ID must be at least 6 characters.")
      .regex(
        /^[A-Za-z0-9-]+$/,
        "National ID can include letters, numbers, and dashes only."
      ),
    dob: z
      .string({ required_error: "Please select your date of birth." })
      .trim()
      .refine(
        (v) => !Number.isNaN(Date.parse(v)),
        "Enter a valid date of birth."
      ),
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
      .min(2, "City must be at least 2 characters."),
    state: z
      .string({ required_error: "Please enter your state." })
      .trim()
      .min(2, "State must be at least 2 characters."),
    country: z
      .string({ required_error: "Please enter your country." })
      .trim()
      .min(2, "Country must be at least 2 characters."),
    phone: z
      .string({ required_error: "Please enter your phone number." })
      .trim()
      .min(5, "Phone number is too short.")
      .regex(
        /^[0-9+\-\s()]{5,}$/,
        "Enter a valid phone number (digits, spaces, +, - allowed)."
      ),
    email: z
      .string({ required_error: "Please enter your email address." })
      .trim()
      .email("Enter a valid email address."),
  }),

  family: z.object({
    maritalStatus: z.enum(["single", "married", "divorced", "widowed"], {
      required_error: "Please select your marital status.",
      invalid_type_error: "Please select a valid marital status.",
    }),
    dependents: z.coerce
      .number({
        invalid_type_error: "Dependents must be a number.",
      })
      .int("Dependents must be a whole number.")
      .min(0, "Dependents cannot be negative.")
      .max(20, "Please enter a realistic number of dependents (0–20)."),
    employmentStatus: z.enum(["employed", "unemployed", "student", "retired"], {
      required_error: "Please select your employment status.",
      invalid_type_error: "Please select a valid employment status.",
    }),
    monthlyIncome: z.coerce
      .number({
        invalid_type_error: "Monthly income must be a number.",
      })
      .min(0, "Monthly income cannot be negative.")
      .max(1_000_000, "Please enter a realistic monthly income."),
    housingStatus: z.enum(["rent", "own", "family", "other"], {
      required_error: "Please select your housing status.",
      invalid_type_error: "Please select a valid housing status.",
    }),
  }),

  situation: z.object({
    financialSituation: z
      .string({
        required_error: "Please describe your current financial situation.",
      })
      .trim()
      .min(10, "Please provide at least 10 characters.")
      .max(2000, "Please keep it under 2000 characters."),
    employmentCircumstances: z
      .string({
        required_error: "Please describe your employment circumstances.",
      })
      .trim()
      .min(10, "Please provide at least 10 characters.")
      .max(2000, "Please keep it under 2000 characters."),
    reasonForApplying: z
      .string({ required_error: "Please explain your reason for applying." })
      .trim()
      .min(10, "Please provide at least 10 characters.")
      .max(2000, "Please keep it under 2000 characters."),
  }),

  documents: z.object({
    nationalId: z.array(z.any()).optional(),
    proofOfAddress: z.array(z.any()).optional(),
    incomeProof: z.array(z.any()).optional(),
    additionalDocuments: z.array(z.any()).optional(),
  }),
});

export type ApplicationFormType = z.infer<typeof applicationSchema>;
