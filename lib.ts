import profile from "@/data/profile.json";
export const P = profile;
export const isTodo = (s?: string) => !!s && s.startsWith("TODO");

export const SERVICE_ICONS = ["book", "users", "search", "compass", "eye", "chart", "hands", "map"];
export const PILLAR_ICONS: Record<string, string> = { Relationships: "heart", Play: "blocks", Language: "chat", Thinking: "bulb" };
