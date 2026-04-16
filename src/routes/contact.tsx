import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { submitContact } from "@/server/contact";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Us — AgroSmart" },
      { name: "description", content: "Get in touch with the AgroSmart team." },
    ],
  }),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    try {
      await submitContact({ data: form });
      setSubmitted(true);
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center animate-fade-in">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold">Message Sent!</h1>
        <p className="mt-2 text-muted-foreground">Thanks for reaching out — we'll get back to you soon.</p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
          className="mt-6 px-6 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">📬 Talk to Us</h1>
        <p className="mt-2 text-muted-foreground">Got a question, idea, or just want to say hi? We're all ears.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-5">
        {errors.form && <p className="text-sm text-destructive text-center">{errors.form}</p>}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@email.com"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="What's on your mind?"
            rows={5}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {sending ? "Sending..." : "Send Message"}
        </button>
      </form>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-sm">
        <div className="p-4 bg-muted rounded-xl">
          <div className="text-2xl mb-2">📧</div>
          <p className="font-medium">Email</p>
          <p className="text-muted-foreground">info@agrosmart.in</p>
        </div>
        <div className="p-4 bg-muted rounded-xl">
          <div className="text-2xl mb-2">📞</div>
          <p className="font-medium">Phone</p>
          <p className="text-muted-foreground">+91 98765 43210</p>
        </div>
        <div className="p-4 bg-muted rounded-xl">
          <div className="text-2xl mb-2">📍</div>
          <p className="font-medium">Location</p>
          <p className="text-muted-foreground">Ahmedabad, Gujarat</p>
        </div>
      </div>
    </div>
  );
}
