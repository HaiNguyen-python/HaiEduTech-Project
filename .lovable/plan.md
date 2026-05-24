## Mục tiêu (Bước A)

Giảm First Paint của preview từ ~7.5s xuống ước tính 4–5s bằng cách:
1. Lazy-hoá các trang đang import trực tiếp trong `src/App.tsx` (`Index`, `Welcome`, `NotFound`).
2. Lazy + **defer mount** 7 widget toàn cục hiện đang chạy ngay khi app khởi động: `ChatBot`, `FloatingNotebook`, `LastSessionRecap`, `GlobalSuperDictionary`, `SessionTracker`, `PageViewTracker`, `LessonFeedback`.

Các widget này có tổng cỡ ~80KB+ source (riêng `FloatingNotebook.tsx` 27KB, `LessonFeedback.tsx` 17KB) và đều xuất hiện trong top "slowest resources" của lần đo trước.

## Thay đổi trong `src/App.tsx`

### 1) Đổi import tĩnh → `lazy()`

```tsx
const Index = lazy(() => import("./pages/Index.tsx"));
const Welcome = lazy(() => import("./pages/Welcome.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const ChatBot = lazy(() => import("./components/ChatBot.tsx"));
const FloatingNotebook = lazy(() => import("./components/FloatingNotebook.tsx"));
const LastSessionRecap = lazy(() => import("./components/LastSessionRecap.tsx"));
const GlobalSuperDictionary = lazy(() => import("./components/GlobalSuperDictionary.tsx"));
const SessionTracker = lazy(() => import("./components/SessionTracker.tsx"));
const PageViewTracker = lazy(() => import("./components/PageViewTracker.tsx"));
const LessonFeedback = lazy(() => import("./components/LessonFeedback.tsx"));
```

### 2) Thêm helper `DeferredMount`

Mount con sau khi browser idle (`requestIdleCallback`, fallback `setTimeout 1200ms`) để không cản trở first paint:

```tsx
const DeferredMount = ({ children, delay = 1200 }) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const trigger = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(trigger, { timeout: delay + 1500 });
      return () => (window as any).cancelIdleCallback?.(id);
    }
    const t = setTimeout(trigger, delay);
    return () => clearTimeout(t);
  }, [delay]);
  return ready ? <Suspense fallback={null}>{children}</Suspense> : null;
};
```

### 3) Bọc các widget toàn cục

```tsx
<DeferredMount>
  <ChatBot />
  <FloatingNotebook />
  <LastSessionRecap />
  <GlobalSuperDictionary />
  <SessionTracker />
  <PageViewTracker />
  <LessonFeedback />
</DeferredMount>
```

### 4) Bảo đảm `<Suspense>` đã bao bọc `<Routes>`

Vì `Index`/`Welcome`/`NotFound` giờ là lazy, kiểm tra `Routes` đang nằm trong `<Suspense fallback={...}>` (hiện đã có `LazyRoute` cho các route khác — sẽ kiểm tra và bổ sung nếu thiếu ở route gốc `/`, `/home`, `/welcome`, `*`).

## Hiệu quả dự kiến

- Loại bỏ ~7 file component khỏi đường tải ban đầu → bớt 7 request và ~80KB JS parse khỏi giai đoạn FCP.
- `Index.tsx` (home page) sẽ chia thành chunk riêng, được tải song song nhưng không khoá khung app.
- Tracking widgets (`SessionTracker`, `PageViewTracker`) vẫn chạy sau khi idle nên không mất dữ liệu — chỉ trì hoãn ~1.2s.

## Không thay đổi

- Hành vi UI/UX của các widget.
- Cấu trúc routing và các `lazy()` đã có sẵn.
- File ngoài `src/App.tsx`.

## Kiểm tra sau khi triển khai

1. Mở preview → quan sát FCP mới qua performance profile.
2. Reload `/`, `/programming/ai-academy`, `/dashboard` — chắc chắn ChatBot, Notebook, SuperDictionary vẫn hiện sau 1–2s.
3. Kiểm tra Network để xác nhận các file widget chỉ tải sau khi app idle.
