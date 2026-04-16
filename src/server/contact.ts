import { createServerFn } from "@tanstack/react-start";

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: { name: string; email: string; message: string }) => {
    // basic validation on server side too
    if (!input.name?.trim()) throw new Error("Name is required");
    if (!input.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email))
      throw new Error("Valid email is required");
    if (!input.message?.trim()) throw new Error("Message is required");
    return input;
  })
  .handler(async ({ data }) => {
    // in production: send email, store in db, etc.
    console.log("[Contact Form]", data.name, data.email, data.message.slice(0, 100));
    return { success: true, message: "Thanks for reaching out! We'll get back to you soon." };
  });
