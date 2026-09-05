/**
 * @file BusinessEnglish.tsx
 * @description Business English track: 6 topics, 24 bilingual lessons for workplace English.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import SEO from "@/components/SEO";
import PurposeEnglishHub from "@/components/PurposeEnglishHub";
import { businessTopicsPart1 } from "@/data/businessEnglishLessons";
import { businessTopicsPart2 } from "@/data/businessEnglishLessons2";

const topics = [...businessTopicsPart1, ...businessTopicsPart2];

const BusinessEnglish = () => (
  <>
    <SEO
      title="Business English - Email, họp, thuyết trình | HaiEduTech"
      description="24 bài Business English song ngữ: email công việc, họp, thuyết trình số liệu, đàm phán, CV và phỏng vấn, kèm audio và bài tập tương tác."
      path="/english/business"
      type="course"
    />
    <PurposeEnglishHub
      storageKey="haiedu-business-english-v1"
      activityType="business_english_lesson"
      emoji="💼"
      title="Business English"
      titleVi="Tiếng Anh Thương mại"
      tagline="Practical English for emails, meetings, presentations, negotiation and job interviews."
      taglineVi="Tiếng Anh thực dụng cho email, họp, thuyết trình, đàm phán và phỏng vấn xin việc."
      topics={topics}
    />
  </>
);

export default BusinessEnglish;
