import { useState } from "react";
import type { FormEvent } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  message: "",
};

export default function AboutContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [error, setError] = useState<string>("");
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
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
    setSent(true);
    setForm(INITIAL_FORM);
  };

  return (
    <section className="mt-8 border-t border-white/10 pt-7">
      <div className="mb-4">
        <h2 className="text-[16px] font-medium text-white">Work With Me</h2>
        <p className="mt-2 text-[15px] text-white/74">
          Tell me what you are building and I will get back to you.
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
            className="h-11 rounded-xl border border-white/14 bg-white/[0.04] px-3 text-[15px] text-white outline-none transition-colors placeholder:text-white/34 focus:border-white/28"
          />
          <input
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder="Email"
            className="h-11 rounded-xl border border-white/14 bg-white/[0.04] px-3 text-[15px] text-white outline-none transition-colors placeholder:text-white/34 focus:border-white/28"
          />
        </div>

        <textarea
          value={form.message}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, message: event.target.value }))
          }
          placeholder="Message"
          rows={5}
          className="w-full resize-y rounded-xl border border-white/14 bg-white/[0.04] px-3 py-2.5 text-[15px] text-white outline-none transition-colors placeholder:text-white/34 focus:border-white/28"
        />

        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-red-300/90">{error}</p>
          <button
            type="submit"
            className="rounded-lg border border-brand-primary/45 bg-brand-primary/16 px-4 py-2 text-sm font-medium text-brand-secondary transition-colors hover:bg-brand-primary/24"
          >
            Send message
          </button>
        </div>

        {sent && (
          <p className="text-sm text-emerald-200/90">
            Message sent. I will get back to you soon.
          </p>
        )}
      </form>
    </section>
  );
}
