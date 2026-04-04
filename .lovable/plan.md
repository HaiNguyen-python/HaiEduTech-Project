

## Plan: Giảm tốc độ audio từ vựng tiếng Việt

Hiện tại `SmartVocabCard.tsx` đang dùng `rate: 0.55`. Giảm xuống **0.45** để phát âm chậm hơn, rõ ràng hơn.

### Thay đổi

| File | Thay đổi |
|------|----------|
| `src/components/SmartVocabCard.tsx` | `utterance.rate = 0.55` → `utterance.rate = 0.45` |

