import { notFound } from "next/navigation";

/** Any unknown path under a language shows the localised not-found page. */
export default function CatchAll() {
  notFound();
}
