import z from "zod";

export const BrowserEngineSchema = z.enum(["chromium", "webkit", "firefox"]);
export type BrowserEngine = z.infer<typeof BrowserEngineSchema>;
