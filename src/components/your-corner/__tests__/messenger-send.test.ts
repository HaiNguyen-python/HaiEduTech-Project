import { describe, it, expect, vi } from "vitest";

/**
 * Logic test for the Messenger send pipeline.
 * We don't render the full component (auth + realtime); instead we exercise the
 * exact insert call against a mocked Supabase client to verify:
 *  1. Happy path returns inserted row
 *  2. RLS-blocked path (code 42501) is detected so the UI can show a clear error
 */
function makeMockSupabase(behavior: "ok" | "rls" | "generic") {
  const inserted = {
    id: "msg-1",
    sender_id: "u1",
    recipient_id: "u2",
    content: "hello",
    read_at: null,
    created_at: new Date().toISOString(),
  };
  return {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(async () => {
            if (behavior === "ok") return { data: inserted, error: null };
            if (behavior === "rls")
              return {
                data: null,
                error: { code: "42501", message: "new row violates row-level security policy" },
              };
            return { data: null, error: { code: "23505", message: "duplicate key" } };
          }),
        })),
      })),
    })),
  } as any;
}

async function sendMessage(client: any, payload: { sender_id: string; recipient_id: string; content: string }) {
  const { data, error } = await client.from("your_corner_messages").insert(payload).select().single();
  if (error) {
    const code = error.code;
    const isRls = code === "42501" || /row-level security|permission denied/i.test(error.message);
    return { ok: false, isRls, code, message: error.message };
  }
  return { ok: true, message: data };
}

describe("Messenger send pipeline", () => {
  const payload = { sender_id: "u1", recipient_id: "u2", content: "hello" };

  it("inserts a message on the happy path", async () => {
    const sb = makeMockSupabase("ok");
    const res = await sendMessage(sb, payload);
    expect(res.ok).toBe(true);
    expect(sb.from).toHaveBeenCalledWith("your_corner_messages");
  });

  it("flags RLS / permission denied errors clearly", async () => {
    const sb = makeMockSupabase("rls");
    const res = await sendMessage(sb, payload);
    expect(res.ok).toBe(false);
    expect(res.isRls).toBe(true);
    expect(res.code).toBe("42501");
  });

  it("returns generic error info for other failures", async () => {
    const sb = makeMockSupabase("generic");
    const res = await sendMessage(sb, payload);
    expect(res.ok).toBe(false);
    expect(res.isRls).toBe(false);
    expect(res.code).toBe("23505");
  });
});
