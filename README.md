# HaiEduTech

THE ULTIMATE PROMPT FOR LOVABLE (FULL VERSION)

Role: Expert Full-stack Developer, Data Engineer & UI/UX Designer. Project: Build a High-Tech Educational Platform for a multi-disciplinary tutor (English, Chinese, and Programming).

1. Design Concept & Branding:

Aesthetic: Modern, Minimalist, High-Tech (Cyber-professional). Use a clean color palette (Deep Blue, Slate, and Emerald Accent).

Core Value: "Data-Driven Education & AI-Powered Learning."

Navigation: Home, About (The Engineer-Tutor), English (IELTS/Cambridge), Chinese (HSK), Programming (K-12/Data), AI Grading Tool, Student Dashboard.

2. Specialized Course Sections:

English Hub: Professional landing pages for Starters–PET, IELTS, TOEIC, and National High School Exam.

Chinese Corner: Modules for Elementary, HSK, and Conversational Chinese.

Programming Lab: Dedicated section for K-12 students. Highlight "Data Engineering & AI Foundations" for young learners. Include a "Career Path Roadmap" interactive UI to guide students from Grade 1 to Career.

3. Advanced AI Grading System (Integration Logic):

Feature: Integrated IELTS Speaking & Writing Grader.

Technical Implementation: Build a frontend interface that connects to an LLM (GPT-4o) via a mock API handler.

Speaking: Audio recorder with visual waveforms + 4-criteria feedback.

Writing: Rich text editor + Real-time word count + AI Feedback Panel showing:

Detailed Score Breakdown (Band 1.0 - 9.0).

Error Highlighting (Grammar/Vocab/Cohesion).

"The Upgrade Engine": A feature that transforms the student's current essay into a Band 8.0+ version using their original arguments.

4. The "Data Engineer" Student Dashboard (Advanced Analytics):

Concept: Use my Data Engineering background to provide students with professional-grade analytics.

Visuals: Use Recharts or Lucide-react to build:

Skill Radar Chart: Showing balance between Listening, Reading, Writing, Speaking, or Coding skills.

Learning Velocity Line Chart: Tracking score improvement over time.

Consistency Heatmap: (Similar to GitHub Contributions) showing daily study habits.

Personalization: A "Progress-at-a-glance" card showing their current level vs. their target goal.

5. Technical Requirements & Architecture:

Clean Code: Modular React components with Tailwind CSS.

Documentation: All code comments must be in English.

Interactive Elements: Use Framer Motion for smooth transitions between course modules.

Placeholders: Create sophisticated sections for personal photos and "Professional Certification Gallery."

PHẦN THÊM: SYSTEM PROMPT DÀNH RIÊNG CHO AI GRADING (Dán vào Logic chấm điểm)

Khi bạn cấu hình phần Backend cho công cụ chấm IELTS, hãy dùng đoạn này để AI trả về dữ liệu chuẩn cho Dashboard:

Role: Senior IELTS Examiner & Linguistic Data Analyst. Task: Analyze [Writing/Speaking] input. Data Output Structure (JSON):

Overall: Number (e.g., 6.5)

Breakdown: { Task_Achievement: x, Coherence: x, Lexical: x, Grammar: x }

Data_Points: Array of objects { error: string, correction: string, category: "Grammar" | "Vocab" }

Comparison: String (Band 8.0+ reconstructed version).

Advice: String (Actionable steps to reach the next 0.5 band).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://haiedutech.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/69bf04b5-2aaf-44a8-ab3b-d9285d8ce64b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
