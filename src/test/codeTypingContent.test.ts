import { describe, expect, it } from "vitest";
import { allProgrammingModules } from "@/data/programmingLessonData";
import { TOPIC_SNIPPETS } from "@/data/programming/typingSnippetBank";
import { normalizeTypingNumbers } from "@/lib/codeTypingNumbers";

const vietnamese = /[ăâđêôơưĂÂĐÊÔƠƯáàảãạắằẳẵặấầẩẫậéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/;
const untranslated = /\b(?:so_canh|do_dai|diem|tuoi|tuoi_str|chieu_cao|hoc_gioi|study_gioi|danh_sach_vat_pham|vat_pham_moi|dien_tich_hcn|chieu_dai|chieu_rong|kiem_tra_chan_le|ngon_ngu|hoc_sinh|student_student|vi_tri|dien_tich_moi|du_doan|doanh_thu|ket_qua|result_qua|Tai nghe|Doanh thu)\b|\bten\s*(?:=|,|\})/;

describe("English-only Code Typing Race sources", () => {
  it("audits every lesson code and every topic fallback", () => {
    const sources = allProgrammingModules.flatMap(module => module.lessons.map(lesson => ({
      id: `${module.id}/${lesson.id}`, code: lesson.code,
    })));
    TOPIC_SNIPPETS.forEach((topic, index) => topic.snippets.forEach((code, snippet) => {
      sources.push({ id: `topic-${index}-${snippet}`, code });
    }));
    expect(sources.length).toBeGreaterThan(300);
    sources.forEach(({ id, code }) => {
      expect(code, id).not.toMatch(vietnamese);
      expect(code, id).not.toMatch(untranslated);
    });
  });
  it("keeps the revenue example consistent", () => {
    const lesson = allProgrammingModules.find(module => module.id === "prog-data-pipeline")?.lessons.find(item => item.id === "etl-1");
    expect(lesson).toBeDefined();
    const code = normalizeTypingNumbers(lesson?.code ?? "");
    expect(code).toContain('"Headphones"');
    expect(code).toContain('df["Revenue"] > 1000000000');
    expect(code).toContain('df.to_csv("results.csv", index=False)');
    expect(code).toContain("Saved file results.csv");
  });
});