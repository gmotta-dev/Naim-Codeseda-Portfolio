import { TLanguage } from "@/shared/types/tlang";
import { z } from "zod";

// Create a more comprehensive error message object
const errorMessages = {
  "en-US": {
    required: "This field is required",
    min: "This field must be at least {min} characters",
    max: "This field must be less than {max} characters",
    email: "Invalid email address",
    invalid: "Invalid value",
  },
  "es-ES": {
    required: "Este campo es requerido",
    min: "Este campo debe tener al menos {min} caracteres",
    max: "Este campo debe tener menos de {max} caracteres",
    email: "Dirección de correo electrónico inválida",
    invalid: "Valor inválido",
  },
} as const;

// Helper function to get error messages for a specific language
const getErrorMessages = (lang: TLanguage) => {
  const messages = errorMessages[lang];
  if (!messages) {
    throw new Error(`Unsupported language: ${lang}`);
  }
  return messages;
};

// Enhanced schema with better type safety and error handling
export const contactFormSchema = (lang: TLanguage) => {
  const messages = getErrorMessages(lang);

  return z.object({
    name: z
      .string({ message: messages.required })
      .min(3, { message: messages.min.replace("{min}", "3") })
      .max(255, { message: messages.max.replace("{max}", "255") }),

    email: z.email({ message: messages.email }),

    message: z
      .string({ message: messages.required })
      .min(3, { message: messages.min.replace("{min}", "3") })
      .max(1000, { message: messages.max.replace("{max}", "1000") }),
  });
};

// Alternative approach: Create separate schemas for each language
export const contactFormSchemaEn = contactFormSchema("en-US");
export const contactFormSchemaEs = contactFormSchema("es-ES");

// Type inference
export type TContactFormSchema = z.infer<ReturnType<typeof contactFormSchema>>;
export type TContactFormSchemaEn = z.infer<typeof contactFormSchemaEn>;
export type TContactFormSchemaEs = z.infer<typeof contactFormSchemaEs>;
