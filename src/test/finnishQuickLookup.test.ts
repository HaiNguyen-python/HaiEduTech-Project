import { describe, expect, it } from "vitest";
import { finnishQuickLookup } from "@/lib/finnishQuickLookup";
describe("Finnish instant dictionary", () => {
  it("returns existing common-word meanings immediately", () => {
    expect(finnishQuickLookup(" OLLA ")?.entry.meanings[0].definitions[0].definition).toBe("to be");
    expect(finnishQuickLookup("syödä")?.viTranslations["def-0-0"]).toBe("ăn");
  });
  it("leaves unknown and inflected words to the full dictionary", () => {
    expect(finnishQuickLookup("olen")).toBeNull();
    expect(finnishQuickLookup("not-a-finnish-word")).toBeNull();
  });
});
