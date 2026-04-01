

# Plan: Complete Vocab Images + Light Theme + Remove "Việt Nam" Label

## Changes (single file: `src/pages/YkiDashboard.tsx`)

### 1. Expand VOCAB_IMAGES to cover all remaining words

Add ~200+ new entries to the `VOCAB_IMAGES` mapping to cover words from `vocabularyExpansion.ts` and `vocabularyExpansion2.ts` that are currently missing. Words like: `päätös`, `hakemus`, `etuus`, `sairauspäiväraha`, `posti`, `kirje`, `postimaksu`, `postilaatikko`, `hätänumero`, `ambulanssi`, `palokunta`, etc.

Each word gets a curated Unsplash photo ID URL matching its meaning. Any remaining unmapped words still fall back to `CATEGORY_IMAGES` (which covers all categories).

### 2. Switch VocabCard to bright/light theme

**Current**: Dark slate background (`bg-slate-900`, `text-white`, `text-slate-300/400`, `border-slate-700`)

**New**: Bright white background with clean shadows:
- Card: `bg-white border-gray-200 shadow-sm hover:shadow-lg`
- Word: `text-gray-900` (deep charcoal)
- English meaning: `text-blue-700` (vibrant royal blue)
- Vietnamese meaning: `text-gray-700`
- Example text: `text-gray-800`
- Example translation: `text-gray-500`
- IPA: `text-gray-500`
- Badges: keep colorful but remove dark-mode variants
- Audio/Star buttons: `bg-gray-100 hover:bg-gray-200`, icons `text-gray-600`
- Inner shadow overlay: adjust to white-based gradient
- Conjugation popover: `bg-white border-gray-200`

### 3. Remove "Việt nam:" label

**Current** (line ~504-506):
```
<p className="text-[17px] font-bold text-blue-400 mb-1">{vocab.meaningEn}</p>
<p className="text-[15px] text-slate-300 mb-3">
  <span className="text-slate-500 text-[13px]">Việt nam:</span> {vocab.meaningVi}
</p>
```

**New**: Just show the Vietnamese meaning directly without any prefix label:
```
<p className="text-[17px] font-bold text-blue-700 mb-1">{vocab.meaningEn}</p>
<p className="text-[15px] text-gray-600 mb-3">{vocab.meaningVi}</p>
```

### Files Modified

| File | Change |
|------|--------|
| `src/pages/YkiDashboard.tsx` | Add ~200 VOCAB_IMAGES entries; switch card to white/bright theme; remove "Việt nam:" label |

