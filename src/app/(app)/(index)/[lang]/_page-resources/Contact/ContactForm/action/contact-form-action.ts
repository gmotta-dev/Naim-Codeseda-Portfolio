"use server";

import { safeExecute } from "@/shared/types/safe-execute";
import { contactFormSchemaEn, TContactFormSchemaEn } from "../contact-form-schema";
import nodemailer from "nodemailer";
import ContactEmailTemplate from "./ContactEmailTemplate";

const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: process.env.GOOGLE_EMAIL_USER, pass: process.env.GOOGLE_EMAIL_PASS } });

export const contactFormAction = safeExecute({
  fn: async (unparsedBody: TContactFormSchemaEn) => {
    const body = contactFormSchemaEn.parse(unparsedBody);

    const { renderToString } = await import("react-dom/server");

    const supportTransporter = nodemailer.createTransport({ service: "gmail", auth: { user: process.env.SUPPORT_EMAIL_USER, pass: process.env.SUPPORT_EMAIL_PASS } });

    const html = renderToString(ContactEmailTemplate({ from: body.email, message: body.message, name: body.name }));

    const result = await transporter.sendMail({
      from: body.email,
      replyTo: body.email,
      to: process.env.GOOGLE_EMAIL_USER,
      subject: body.name + " - " + "Contact form submitted",
      html,
    });

    console.log("RESULT FROM VAROS MAIL", result);

    return { status: "success", data: null, client: { toast: { title: "Contact form submitted", description: "Thank you for your message", stylization: "success" } } };
  },
});
