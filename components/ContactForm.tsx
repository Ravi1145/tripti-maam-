"use client";
import { useState } from "react";
import { useLocale, useT } from "./I18nProvider";

const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";
type State = "idle" | "sending" | "ok" | "err" | "noendpoint";

/** Shared form for the school enquiry and the Anubhuti sign-up. */
export default function ContactForm({ variant = "enquiry" }: { variant?: "enquiry" | "subscribe" }) {
  const t = useT();
  const locale = useLocale();
  const [state, setState] = useState<State>("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!endpoint) { setState("noendpoint"); return; }
    setState("sending");
    try {
      const r = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(e.currentTarget) });
      setState(r.ok ? "ok" : "err");
    } catch (err) { setState("err"); }
  }
  const field = "w-full min-h-[52px] rounded-2xl border border-line bg-white px-4 text-base outline-none transition focus:border-violet focus:ring-2 focus:ring-violet/30";
  const label = "block text-sm font-bold";
  return (
    <form onSubmit={submit} className="space-y-5">
      <input type="hidden" name="form" value={variant} />
      <input type="hidden" name="language" value={locale} />
      {variant === "enquiry" ? (
        <>
          <div className="grid gap-5 md:grid-cols-2">
            <label className={label}><span className="mb-1.5 block">{t("Your name")}</span><input required name="name" autoComplete="name" className={field} /></label>
            <label className={label}><span className="mb-1.5 block">{t("Work email")}</span><input required type="email" name="email" autoComplete="email" className={field} /></label>
            <label className={label}><span className="mb-1.5 block">{t("School or organisation")}</span><input name="school" className={field} /></label>
            <label className={label}><span className="mb-1.5 block">{t("City")}</span><input name="city" autoComplete="address-level2" className={field} /></label>
          </div>
          <label className={label}><span className="mb-1.5 block">{t("What would you like to work on?")}</span><textarea required name="message" rows={5} className={`${field} py-3`} /></label>
        </>
      ) : (
        <label className={label}><span className="mb-1.5 block">{t("Email address")}</span><input required type="email" name="email" autoComplete="email" className={field} /></label>
      )}
      <button disabled={state === "sending"} className="btn btn-primary disabled:opacity-60">{state === "sending" ? t("Sending...") : variant === "enquiry" ? t("Send my enquiry") : t("Join Anubhuti")}</button>
      <p role="status" aria-live="polite" className="text-sm font-bold">
        {state === "ok" && <span className="text-mint-deep">{t("Thank you. Your message has been sent.")}</span>}
        {state === "err" && <span className="text-coral-deep">{t("Something went wrong. Please try again.")}</span>}
        {state === "noendpoint" && <span className="text-saffron-deep">{t("This form isn't connected yet. Set NEXT_PUBLIC_FORM_ENDPOINT to turn it on.")}</span>}
      </p>
    </form>
  );
}
