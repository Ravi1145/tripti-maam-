import HomeClient from "@/components/HomeClient";
import { getPosts } from "@/lib/content";

export default function Home() {
  const latest = getPosts().slice(0, 3).map(({ slug, title, excerpt, date, cover }) => ({ slug, title, excerpt, date, cover }));
  return <HomeClient latest={latest} />;
}
