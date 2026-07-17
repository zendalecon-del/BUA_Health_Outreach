import { z } from "zod";

const yesNo = z.enum(["Yes", "No"]);
export const registrationSchema = z.object({
  submissionId: z.string().uuid(),
  fullName: z.string().trim().min(3).max(120),
  gender: z.enum(["Male", "Female", "Prefer not to say"]),
  age: z.coerce.number().int().min(16).max(100),
  phone: z.string().trim().min(10).max(24),
  email: z.string().trim().email(),
  department: z.enum(["Administration", "Finance", "Human Resources", "Procurement", "ICT", "Operations", "Others"]),
  otherDepartment: z.string().trim().max(100).optional().default(""),
  conditions: z.array(z.string().max(80)).max(12).default([]),
  otherCondition: z.string().trim().max(300).optional().default(""),
  medication: yesNo,
  medicationDetails: z.string().trim().max(1000).optional().default(""),
  smoking: z.enum(["Yes", "No", "Former smoker"]),
  alcohol: z.enum(["Yes", "Occasionally", "No"]),
  healthConcern: z.string().trim().max(1200).optional().default(""),
  requestedService: z.enum(["Free Wellness Screening", "Standard Package", "Comprehensive Package", "Doctor Consultation Only"]),
  medicalContact: yesNo,
  wellnessInfo: yesNo,
  consent: z.literal(true),
}).superRefine((value, ctx) => {
  if (value.department === "Others" && value.otherDepartment.length < 2) ctx.addIssue({ code: "custom", path: ["otherDepartment"], message: "Please specify the department." });
  if (value.conditions.includes("Others") && value.otherCondition.length < 2) ctx.addIssue({ code: "custom", path: ["otherCondition"], message: "Please specify the condition." });
  if (value.medication === "Yes" && value.medicationDetails.length < 2) ctx.addIssue({ code: "custom", path: ["medicationDetails"], message: "Please add medication details." });
  if (value.conditions.includes("None") && value.conditions.length > 1) ctx.addIssue({ code: "custom", path: ["conditions"], message: "None cannot be selected with another condition." });
});

export const lookupSchema = z.object({
  registrationNumber: z.string().trim().transform((v) => v.toUpperCase().replace(/\s/g, "")),
  lookupCode: z.string().trim().min(8).max(16),
});

export const loginSchema = z.object({
  staffId: z.string().trim().toUpperCase().min(6).max(30),
  password: z.string().min(8).max(128),
  mode: z.enum(["staff", "admin"]),
});

export const screeningSchema = z.object({
  participantId: z.string().uuid(),
  screeningPackage: z.string().min(2).max(100),
  systolic: z.coerce.number().int().min(50).max(300),
  diastolic: z.coerce.number().int().min(30).max(200),
  randomBloodSugar: z.coerce.number().min(1).max(50),
  screeningDate: z.string().date(),
  doctorSeen: z.boolean(),
  clinicalNote: z.string().max(4000).optional().default(""),
  referralRequired: z.boolean(),
  followUpRequired: z.boolean(),
  referralHospitalId: z.string().uuid().nullable().optional(),
  referralReason: z.string().max(2000).optional().default(""),
  referralInstruction: z.string().max(2000).optional().default(""),
  urgency: z.enum(["Routine", "Within 7 days", "Urgent"]).nullable().optional(),
  participantInformed: z.boolean().nullable().optional(),
  followUpReason: z.string().max(2000).optional().default(""),
  followUpDate: z.string().date().nullable().optional(),
  followUpInstruction: z.string().max(2000).optional().default(""),
  action: z.enum(["save", "complete", "update"]),
});
