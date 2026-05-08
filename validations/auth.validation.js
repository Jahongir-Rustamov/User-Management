// auth.validation.js
import { z } from "zod";

export const signUpSchema = z.object({
    fullName: z
        .string({ required_error: "Full name is required" })
        .min(3, "Full name must be at least 3 characters")
        .max(100, "Full name must not exceed 100 characters")
        .trim(),

    birthDate: z
        .string({ required_error: "Birth date is required" })
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format. Use YYYY-MM-DD",
        })
        .refine((val) => new Date(val) < new Date(), {
            message: "Birth date cannot be in the future",
        }),

    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email format")
        .toLowerCase()
        .trim(),

    password: z
        .string({ required_error: "Password is required" })
        .min(8, "Password must be at least 8 characters")
        .max(64, "Password must not exceed 64 characters")
        .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
        .regex(/[0-9]/, "Password must contain at least 1 number")
        .regex(/[^a-zA-Z0-9]/, "Password must contain at least 1 special character"),

    role: z.enum(["admin", "user"], {
        errorMap: () => ({ message: "Role must be either admin or user" }),
    }),
});

export const signUpSchemaType = signUpSchema;