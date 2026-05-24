## Thay đổi trên `src/components/sat/SatLandingExtras.tsx`

### 1. Xoá 2 phần
- **Trust Stats** (Section 1, lines ~104-117): khối 4 ô "47+ / +280 / 18 / 120h".
- **Testimonials** (Section 5, lines ~220-257): khối "SAT students who landed top schools" với 3 card Minh Anh / Đức Anh / Phương Linh.
- Xoá luôn các mảng dữ liệu không còn dùng: `stats`, `testimonials`, và các icon import không còn dùng (`Trophy`, `Clock`, `Star` nếu không nơi nào khác dùng — sẽ kiểm tra; `Trophy` vẫn còn dùng trong `bandTiers` nên giữ).

### 2. Tinh chỉnh FAQ cho mềm và đẹp hơn
- Header "Câu hỏi thường gặp về SAT": giảm size + nhẹ hơn → `text-lg md:text-xl font-display font-semibold tracking-tight`, icon box nhỏ lại `w-9 h-9`.
- `AccordionTrigger`: từ `font-semibold text-foreground` → `text-[15px] font-medium text-foreground/90 tracking-tight py-3.5`, thêm `gap-3` để mũi tên cách đều.
- `AccordionContent`: giữ `text-sm` nhưng `text-muted-foreground/90 leading-7` cho thoáng.
- `AccordionItem`: bo mềm hơn `rounded-2xl`, viền nhạt `border-border/60`, nền `bg-background/40`, thêm `data-[state=open]:bg-background/70 data-[state=open]:border-border transition-colors`.
- Khoảng cách giữa các item: `space-y-2.5`.

Không đụng tới các phần khác (Digital SAT format, Band roadmap, Pain points) và không đụng `EnglishCourse.tsx`.