import { useState } from "react";
import type { FormEvent } from "react";
import { submitContactForm } from "../../api/contact";
import { ApiError } from "../../api/client";
import type { ContactFormValues } from "../../types/contact";

const INITIAL_FORM: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

export default function AboutContactForm() {
  const [form, setForm] = useState<ContactFormValues>(INITIAL_FORM);
  const [error, setError] = useState<string>("");
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSent(false);
    setIsSubmitting(true);

    try {
      await submitContactForm({ name, email, message });
      setSent(true);
      setForm(INITIAL_FORM);
    } catch (submitError) {
      if (submitError instanceof ApiError) {
        setError(submitError.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-8 border-t border-white/10 pt-7">
      <div className="mb-4">
        <h2 className="text-[16px] font-medium text-brand-primary">
          Get In Touch
        </h2>
        <p className="mt-2 text-[15px] text-brand-muted">
          If you are recruiting for a developer role, feel free to reach out. I am happy to talk about opportunities, projects, and how I work.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid gap-3 md:grid-cols-2">
          <input
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            placeholder="Name"
            className="h-11 rounded-xl border border-white/16 bg-[#0f1622]/80 px-3 text-[15px] text-brand-secondary outline-none transition-colors placeholder:text-brand-muted/55 focus:border-brand-muted/45"
          />
          <input
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder="Email"
            className="h-11 rounded-xl border border-white/16 bg-[#0f1622]/80 px-3 text-[15px] text-brand-secondary outline-none transition-colors placeholder:text-brand-muted/55 focus:border-brand-muted/45"
          />
        </div>

        <textarea
          value={form.message}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, message: event.target.value }))
          }
          placeholder="Message"
          rows={5}
          className="w-full resize-y rounded-xl border border-white/16 bg-[#0f1622]/80 px-3 py-2.5 text-[15px] text-brand-secondary outline-none transition-colors placeholder:text-brand-muted/55 focus:border-brand-muted/45"
        />

        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-red-300/90">{error}</p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg border border-brand-primary/45 bg-brand-primary/16 px-4 py-2 text-sm font-medium text-brand-secondary transition-colors hover:bg-brand-primary/24 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send message"}
          </button>
        </div>

        {sent && (
          <p className="text-sm text-emerald-200/90">
            Message sent successfully.
          </p>
        )}
      </form>
    </section>
  );
}
