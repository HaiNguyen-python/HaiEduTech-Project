/**
 * @file AcademicEnglish.tsx
 * @description Academic English track: 6 topics, 24 bilingual lessons for study and research.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import SEO from "@/components/SEO";
import PurposeEnglishCourse from "@/components/PurposeEnglishCourse";
import { academicTopicsPart1 } from "@/data/academicEnglishLessons";
import { academicTopicsPart2 } from "@/data/academicEnglishLessons2";
import { academicCommunicationLessons } from "@/data/conversationalCurriculum";

const topics = [...academicTopicsPart1, ...academicTopicsPart2];

const AcademicEnglish = () => (
  <>
    <SEO
      title="Academic English - Viết, đọc, nghe học thuật | HaiEduTech"
      description="24 bài Academic English song ngữ: từ vựng học thuật, văn phong, viết đoạn, đọc nghiên cứu, ghi chú bài giảng, trích dẫn và thuyết trình seminar."
      path="/english/academic"
      type="course"
    />
    <PurposeEnglishCourse
      track="academic"
      storageKey="haiedu-academic-english-v1"
      activityType="academic_english_lesson"
      emoji="🎓"
      title="Academic English"
      titleVi="Tiếng Anh Học thuật"
      tagline="Vocabulary, style, writing, reading and lecture skills for university and IELTS-level study."
      taglineVi="Từ vựng, văn phong, viết, đọc và nghe giảng cho bậc đại học và trình độ IELTS."
      coreTopics={topics}
      communicationLessons={academicCommunicationLessons}
    />
  </>
);

export default AcademicEnglish;
