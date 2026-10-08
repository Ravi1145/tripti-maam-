"use client";
import { useState } from "react";

const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err" | "noendpoint">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!endpoint) { setState("noendpoint"); return; }
    setState("sending");
    try {
      const r = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(e.currentTarget) });
      setState(r.ok ? "ok" : "err");
    } catch (err) { setState("err"); }
  }
  const field = "w-full rounded-sm border border-gold/30 bg-white/80 px-5 py-4 text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40";
  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm"><span className="mb-2 block text-teal-900">Name</span><input required name="name" className={field} autoComplete="name" /></label>
        <label className="block text-sm"><span className="mb-2 block text-teal-900">Email</span><input required type="email" name="email" className={field} autoComplete="email" /></label>
        <label className="block text-sm"><span className="mb-2 block text-teal-900">School / Organisation</span><input name="school" className={field} /></label>
        <label className="block text-sm"><span className="mb-2 block text-teal-900">Your role</span><input name="role" className={field} /></label>
      </div>
      <label className="block text-sm"><span className="mb-2 block text-teal-900">Message</span><textarea required name="message" rows={6} className={field} /></label>
      <button disabled={state === "sending"} className="btn-gold disabled:opacity-60">{state === "sending" ? "Sending..." : "Send message"}</button>
      <p role="status" aria-live="polite" className="text-sm">
        {state === "ok" && <span className="text-teal-700">Thank you. Your message has been sent.</span>}
        {state === "err" && <span className="text-red-700">Something went wrong. Please try again.</span>}
        {state === "noendpoint" && <span className="text-gold-dark">Form endpoint not connected yet (TODO: confirm with Tripta - set NEXT_PUBLIC_FORM_ENDPOINT).</span>}
      </p>
    </form>
  );
}
