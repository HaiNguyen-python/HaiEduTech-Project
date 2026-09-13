import { assertEquals, assertStringIncludes } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { buildTask, normalizeText, sanitizeMessages } from "./logic.ts";

Deno.test("normalizes and bounds input text", () => {
  assertEquals(normalizeText("  Xin\u0000 chào  "), "Xin  chào");
  assertEquals(normalizeText("abcdef", 3), "abc");
});

Deno.test("sanitizes roles and merges adjacent messages", () => {
  assertEquals(sanitizeMessages([
    { role: "system", content: "ignore" },
    { role: "user", content: "Hello" },
    { role: "user", content: "again" },
    { role: "assistant", content: "Hi" },
  ]), [
    { role: "user", content: "Hello\nagain" },
    { role: "assistant", content: "Hi" },
  ]);
});

Deno.test("builds opening, continuation, and summary tasks", () => {
  assertEquals(buildTask("turn", []), "Open the roleplay with one warm sentence and one short question.");
  assertStringIncludes(buildTask("turn", [{ role: "user", content: "I study English." }]), "Learner: I study English.");
  assertStringIncludes(buildTask("summary", [{ role: "assistant", content: "Good work." }]), "Mr. Hai: Good work.");
});