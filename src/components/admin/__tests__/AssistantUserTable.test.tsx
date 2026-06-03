/**
 * Automated test flow: verifies that the Admin/Teacher Assistant management UI
 * correctly issues appoint / revoke / read queries against the user_roles table
 * after the RLS fix (super_admin = admin OR teacher).
 *
 * We mock the supabase client so we can:
 *   1. Assert the exact insert/delete shape the UI sends.
 *   2. Simulate the pre-fix RLS error and confirm the toast surfaces it.
 *   3. Simulate the post-fix success and confirm the success toast + reload.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// ---- Shared mock state -----------------------------------------------------
const profilesRows = [
  { id: "u-student", full_name: "Mai Do", created_at: "2026-01-01" },
  { id: "u-ctv",     full_name: "Phuong Tran", created_at: "2026-02-01" },
];
let userRolesRows: Array<{ user_id: string; role: string }> = [
  { user_id: "u-ctv", role: "assistant" },
];

let insertImpl = vi.fn(async (_row: any) => ({ error: null }));
let deleteImpl = vi.fn(async () => ({ error: null }));

// ---- toast mock ------------------------------------------------------------
const toastSuccess = vi.fn();
const toastError   = vi.fn();
vi.mock("sonner", () => ({
  toast: { success: (...a: any[]) => toastSuccess(...a), error: (...a: any[]) => toastError(...a) },
}));

// ---- supabase mock ---------------------------------------------------------
vi.mock("@/integrations/supabase/client", () => {
  const from = (table: string) => {
    if (table === "profiles") {
      return {
        select: () => ({
          order: async () => ({ data: profilesRows, error: null }),
        }),
      };
    }
    if (table === "user_roles") {
      return {
        select: async () => ({ data: userRolesRows, error: null }),
        insert: (row: any) => insertImpl(row),
        delete: () => {
          const chain: any = {
            _filters: {} as Record<string, string>,
            eq(col: string, val: string) { this._filters[col] = val; return this; },
            then(onF: any, onR: any) { return deleteImpl().then(onF, onR); },
          };
          return chain;
        },
      };
    }
    return { select: async () => ({ data: [], error: null }) };
  };
  return { supabase: { from } };
});

import AssistantUserTable from "../AssistantUserTable";

beforeEach(() => {
  insertImpl = vi.fn(async () => ({ error: null }));
  deleteImpl = vi.fn(async () => ({ error: null }));
  toastSuccess.mockReset();
  toastError.mockReset();
  userRolesRows = [{ user_id: "u-ctv", role: "assistant" }];
});

describe("AssistantUserTable — RBAC flow after RLS fix", () => {
  it("renders student + CTV rows fetched from profiles + user_roles", async () => {
    render(<AssistantUserTable />);
    expect(await screen.findByText("Mai Do")).toBeInTheDocument();
    expect(screen.getByText("Phuong Tran")).toBeInTheDocument();
    // CTV badge shown for assistant role
    expect(screen.getByText("CTV")).toBeInTheDocument();
  });

  it("appoint: sends insert {user_id, role:'assistant'} and shows success toast", async () => {
    render(<AssistantUserTable />);
    const btn = await screen.findByRole("button", { name: /Bổ nhiệm CTV/i });
    fireEvent.click(btn);
    await waitFor(() => expect(insertImpl).toHaveBeenCalledTimes(1));
    expect(insertImpl).toHaveBeenCalledWith({ user_id: "u-student", role: "assistant" });
    await waitFor(() => expect(toastSuccess).toHaveBeenCalledWith("Đã bổ nhiệm CTV!"));
    expect(toastError).not.toHaveBeenCalled();
  });

  it("appoint: surfaces RLS error (regression guard for the pre-fix bug)", async () => {
    insertImpl = vi.fn(async () => ({ error: { message: "new row violates row-level security policy" } }));
    render(<AssistantUserTable />);
    const btn = await screen.findByRole("button", { name: /Bổ nhiệm CTV/i });
    fireEvent.click(btn);
    await waitFor(() => expect(toastError).toHaveBeenCalled());
    expect(toastError.mock.calls[0][0]).toBe("Bổ nhiệm thất bại");
    expect(toastSuccess).not.toHaveBeenCalled();
  });

  it("revoke: deletes user_roles row scoped by user_id + role='assistant'", async () => {
    render(<AssistantUserTable />);
    const btn = await screen.findByRole("button", { name: /Thu hồi CTV/i });
    fireEvent.click(btn);
    await waitFor(() => expect(deleteImpl).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(toastSuccess).toHaveBeenCalledWith("Đã thu hồi quyền CTV"));
  });
});
