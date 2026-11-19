import type { ReactNode } from "react";

/** Page entrance: a CSS fade, so content is never hidden waiting for JavaScript. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-in">{children}</div>;
}
