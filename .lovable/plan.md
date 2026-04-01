

# Plan: Fix Mismatched Vocabulary Images

## Problem
Many words share the same generic image instead of showing word-specific illustrations. From the screenshot and code analysis:

- **Home category**: `lattia` (floor), `seinä` (wall), `lamppu` (lamp), `ovi` (door), `ikkuna` (window), `avain` (key), `parveke` (balcony), `sähkö` (electricity) — ALL show the same red house photo (`photo-1518780664697`)
- **Body parts**: `pää` (head), `silmä` (eye), `korva` (ear), `nenä` (nose), `suu` (mouth) — ALL show same doctor photo (`photo-1612349317150`)
- **Emotions**: `surullinen`, `väsynyt`, `vihainen`, `huolestunut`, `pelokas`, `ujo`, `laiska`, `stressaantunut` — ALL same sad photo (`photo-1541199249251`)
- **Happy emotions**: `iloinen`, `innostunut`, `tyytyväinen`, `yllättynyt`, `jännittävä`, `ylpeä`, `kiitollinen` — ALL same happy photo (`photo-1492681290082`)
- **Walking/Direction**: `mennä`, `kävellä`, `lähteä`, `palata`, `suoraan`, `vasemmalle`, `oikealle` — ALL same road photo
- **Celebrations**: `juhla`, `syntymäpäivä`, `onnitella`, `kutsua`, `pääsiäinen`, `vappu` — ALL same party photo
- **Several more duplicates** across emergency, services, food categories

## Solution
Replace ~80 duplicated/generic Unsplash photo IDs with **word-specific** images. Each word gets a unique, semantically accurate photo.

### Key Replacements

| Word | Meaning | Current Issue | New Image |
|------|---------|--------------|-----------|
| `lattia` | floor | red house | wooden floor close-up |
| `seinä` | wall | red house | brick/painted wall |
| `lamppu` | lamp | red house | table lamp |
| `ovi` | door | red house | wooden door |
| `ikkuna` | window | red house | window with light |
| `avain` | key | red house | metal keys |
| `parveke` | balcony | red house | balcony view |
| `sähkö` | electricity | red house | power lines/outlet |
| `pää` | head | doctor | person's head portrait |
| `silmä` | eye | doctor | close-up eye |
| `korva` | ear | doctor | ear close-up |
| `nenä` | nose | doctor | nose close-up |
| `suu` | mouth | doctor | smile/mouth |
| `surullinen` | sad | generic | sad person |
| `väsynyt` | tired | generic | tired person |
| `vihainen` | angry | generic | angry expression |
| `huolestunut` | worried | generic | worried person |
| `iloinen` | happy | generic | joyful person |
| `innostunut` | excited | generic | excited person |
| `mennä`/`kävellä` | go/walk | same road | walking person |
| `lähteä`/`palata` | leave/return | same road | travel scenes |
| + ~50 more fixes | | | |

### File Modified

| File | Change |
|------|--------|
| `src/pages/YkiDashboard.tsx` | Replace ~80 duplicated Unsplash photo IDs in `VOCAB_IMAGES` with unique, word-accurate images |

