/**
 * @file englishGrammarExpansion6.ts
 * @description Irregular Verbs module - 3 lessons (Top 25, Patterns/Families, Tricky Pairs).
 *   Contains full V1/V2/V3 tables with Vietnamese meaning + memory tricks, fill-in-blanks,
 *   sentence reordering, and MCQ quizzes for fun, memorable practice.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { LanguageModule } from "./types";

export const grammarExpansionModules6: LanguageModule[] = [
  {
    id: "grammar-irregular-verbs",
    title: "Động từ bất quy tắc",
    titleEn: "Irregular Verbs",
    icon: "🔁",
    color: "from-rose-500 to-orange-500",
    description: "Bảng động từ bất quy tắc + mẹo ghi nhớ theo nhóm và bài tập tương tác vui nhộn.",
    descriptionEn: "Full irregular verb tables grouped by patterns, with mnemonic tricks and fun interactive drills.",
    category: "grammar",
    language: "english",
    lessons: [
      // ───────────── LESSON 0 — MASTER REFERENCE TABLE ─────────────
      {
        id: "irregular-verbs-master-table",
        title: "📘 Bảng tổng hợp đầy đủ A→Z (kèm phiên âm IPA)",
        titleEn: "📘 Complete Master Table A→Z (with IPA pronunciation)",
        level: 1,
        difficulty: "beginner",
        theory: `## 📘 Bảng động từ bất quy tắc đầy đủ A→Z

> Hơn **200 động từ** thông dụng nhất, kèm **IPA** và **nghĩa tiếng Việt**. Bookmark trang này để tra cứu khi cần.

**V1** = nguyên mẫu · **V2** = quá khứ đơn · **V3** = quá khứ phân từ (dùng sau *have/be*) · **IPA** = phiên âm V2 / V3.

---

### 🅰️ A

| V1 | V2 | V3 | IPA (V2 / V3) | Nghĩa |
|---|---|---|---|---|
| **arise** | arose | arisen | /əˈroʊz/ — /əˈrɪzn/ | phát sinh, nảy sinh |
| **awake** | awoke | awoken | /əˈwoʊk/ — /əˈwoʊkən/ | thức dậy |

### 🅱️ B

| V1 | V2 | V3 | IPA (V2 / V3) | Nghĩa |
|---|---|---|---|---|
| **be** | was / were | been | /wʌz, wɜːr/ — /bɪn/ | thì, là, ở |
| **bear** | bore | borne / born | /bɔːr/ — /bɔːrn/ | mang, chịu đựng; sinh ra |
| **beat** | beat | beaten | /biːt/ — /ˈbiːtn/ | đánh, đập, thắng |
| **become** | became | become | /bɪˈkeɪm/ — /bɪˈkʌm/ | trở thành |
| **begin** | began | begun | /bɪˈɡæn/ — /bɪˈɡʌn/ | bắt đầu |
| **bend** | bent | bent | /bent/ — /bent/ | uốn cong |
| **bet** | bet | bet | /bet/ — /bet/ | cá cược |
| **bid** | bid | bid | /bɪd/ — /bɪd/ | trả giá, ra giá |
| **bind** | bound | bound | /baʊnd/ — /baʊnd/ | trói, buộc |
| **bite** | bit | bitten | /bɪt/ — /ˈbɪtn/ | cắn |
| **bleed** | bled | bled | /bled/ — /bled/ | chảy máu |
| **blow** | blew | blown | /bluː/ — /bloʊn/ | thổi |
| **break** | broke | broken | /broʊk/ — /ˈbroʊkən/ | làm vỡ |
| **breed** | bred | bred | /bred/ — /bred/ | nuôi, sinh sản |
| **bring** | brought | brought | /brɔːt/ — /brɔːt/ | mang đến |
| **broadcast** | broadcast | broadcast | /ˈbrɔːdkæst/ — /ˈbrɔːdkæst/ | phát sóng |
| **build** | built | built | /bɪlt/ — /bɪlt/ | xây dựng |
| **burn** | burnt / burned | burnt / burned | /bɜːrnt/ — /bɜːrnt/ | đốt, cháy |
| **burst** | burst | burst | /bɜːrst/ — /bɜːrst/ | nổ, vỡ tung |
| **buy** | bought | bought | /bɔːt/ — /bɔːt/ | mua |

### 🅲 C

| V1 | V2 | V3 | IPA (V2 / V3) | Nghĩa |
|---|---|---|---|---|
| **cast** | cast | cast | /kæst/ — /kæst/ | ném, đúc, chiếu (phim) |
| **catch** | caught | caught | /kɔːt/ — /kɔːt/ | bắt, chộp |
| **choose** | chose | chosen | /tʃoʊz/ — /ˈtʃoʊzən/ | chọn, lựa chọn |
| **cling** | clung | clung | /klʌŋ/ — /klʌŋ/ | bám chặt |
| **come** | came | come | /keɪm/ — /kʌm/ | đến |
| **cost** | cost | cost | /kɔːst/ — /kɔːst/ | có giá là |
| **creep** | crept | crept | /krept/ — /krept/ | bò, rón rén |
| **cut** | cut | cut | /kʌt/ — /kʌt/ | cắt |

### 🅳 D

| V1 | V2 | V3 | IPA (V2 / V3) | Nghĩa |
|---|---|---|---|---|
| **deal** | dealt | dealt | /delt/ — /delt/ | giao dịch, đối phó |
| **dig** | dug | dug | /dʌɡ/ — /dʌɡ/ | đào |
| **dive** | dived / dove | dived | /daɪvd, doʊv/ — /daɪvd/ | lặn, nhảy xuống |
| **do** | did | done | /dɪd/ — /dʌn/ | làm |
| **draw** | drew | drawn | /druː/ — /drɔːn/ | vẽ; kéo |
| **dream** | dreamt / dreamed | dreamt / dreamed | /dremt/ — /dremt/ | mơ |
| **drink** | drank | drunk | /dræŋk/ — /drʌŋk/ | uống |
| **drive** | drove | driven | /droʊv/ — /ˈdrɪvən/ | lái xe |

### 🅴 E

| V1 | V2 | V3 | IPA (V2 / V3) | Nghĩa |
|---|---|---|---|---|
| **eat** | ate | eaten | /eɪt/ — /ˈiːtn/ | ăn |

### 🅵 F

| V1 | V2 | V3 | IPA (V2 / V3) | Nghĩa |
|---|---|---|---|---|
| **fall** | fell | fallen | /fel/ — /ˈfɔːlən/ | ngã, rơi |
| **feed** | fed | fed | /fed/ — /fed/ | cho ăn |
| **feel** | felt | felt | /felt/ — /felt/ | cảm thấy |
| **fight** | fought | fought | /fɔːt/ — /fɔːt/ | đánh nhau |
| **find** | found | found | /faʊnd/ — /faʊnd/ | tìm thấy |
| **flee** | fled | fled | /fled/ — /fled/ | chạy trốn |
| **fly** | flew | flown | /fluː/ — /floʊn/ | bay |
| **forbid** | forbade | forbidden | /fərˈbæd/ — /fərˈbɪdn/ | cấm |
| **forecast** | forecast | forecast | /ˈfɔːrkæst/ — /ˈfɔːrkæst/ | dự báo |
| **foresee** | foresaw | foreseen | /fɔːrˈsɔː/ — /fɔːrˈsiːn/ | thấy trước |
| **forget** | forgot | forgotten | /fərˈɡɒt/ — /fərˈɡɒtn/ | quên |
| **forgive** | forgave | forgiven | /fərˈɡeɪv/ — /fərˈɡɪvn/ | tha thứ |
| **freeze** | froze | frozen | /froʊz/ — /ˈfroʊzən/ | đóng băng |

### 🅶 G

| V1 | V2 | V3 | IPA (V2 / V3) | Nghĩa |
|---|---|---|---|---|
| **get** | got | got / gotten | /ɡɒt/ — /ˈɡɒtn/ | nhận, lấy, trở nên |
| **give** | gave | given | /ɡeɪv/ — /ˈɡɪvn/ | đưa, cho |
| **go** | went | gone | /went/ — /ɡɔːn/ | đi |
| **grind** | ground | ground | /ɡraʊnd/ — /ɡraʊnd/ | nghiền, xay |
| **grow** | grew | grown | /ɡruː/ — /ɡroʊn/ | mọc, lớn lên, trồng |

### 🅷 H

| V1 | V2 | V3 | IPA (V2 / V3) | Nghĩa |
|---|---|---|---|---|
| **hang** | hung | hung | /hʌŋ/ — /hʌŋ/ | treo (vật) |
| **have** | had | had | /hæd/ — /hæd/ | có |
| **hear** | heard | heard | /hɜːrd/ — /hɜːrd/ | nghe |
| **hide** | hid | hidden | /hɪd/ — /ˈhɪdn/ | giấu |
| **hit** | hit | hit | /hɪt/ — /hɪt/ | đánh, va |
| **hold** | held | held | /held/ — /held/ | giữ, nắm |
| **hurt** | hurt | hurt | /hɜːrt/ — /hɜːrt/ | làm đau, đau |

### 🅸 I – K

| V1 | V2 | V3 | IPA (V2 / V3) | Nghĩa |
|---|---|---|---|---|
| **input** | input | input | /ˈɪnpʊt/ — /ˈɪnpʊt/ | nhập (dữ liệu) |
| **keep** | kept | kept | /kept/ — /kept/ | giữ |
| **kneel** | knelt | knelt | /nelt/ — /nelt/ | quỳ |
| **knit** | knit / knitted | knit / knitted | /nɪt/ — /nɪt/ | đan |
| **know** | knew | known | /njuː/ — /noʊn/ | biết |

### 🅻 L

| V1 | V2 | V3 | IPA (V2 / V3) | Nghĩa |
|---|---|---|---|---|
| **lay** | laid | laid | /leɪd/ — /leɪd/ | đặt nằm xuống (cần tân ngữ) |
| **lead** | led | led | /led/ — /led/ | dẫn đầu |
| **lean** | leant / leaned | leant / leaned | /lent/ — /lent/ | tựa, dựa |
| **leap** | leapt / leaped | leapt / leaped | /lept/ — /lept/ | nhảy vọt |
| **learn** | learnt / learned | learnt / learned | /lɜːrnt/ — /lɜːrnt/ | học |
| **leave** | left | left | /left/ — /left/ | rời đi, bỏ lại |
| **lend** | lent | lent | /lent/ — /lent/ | cho mượn |
| **let** | let | let | /let/ — /let/ | cho phép |
| **lie** | lay | lain | /leɪ/ — /leɪn/ | nằm (không tân ngữ) |
| **light** | lit / lighted | lit / lighted | /lɪt/ — /lɪt/ | thắp sáng |
| **lose** | lost | lost | /lɒst/ — /lɒst/ | mất, thua |

### 🅼 M

| V1 | V2 | V3 | IPA (V2 / V3) | Nghĩa |
|---|---|---|---|---|
| **make** | made | made | /meɪd/ — /meɪd/ | làm, chế tạo |
| **mean** | meant | meant | /ment/ — /ment/ | có nghĩa là |
| **meet** | met | met | /met/ — /met/ | gặp |
| **mistake** | mistook | mistaken | /mɪˈstʊk/ — /mɪˈsteɪkən/ | nhầm lẫn |
| **misunderstand** | misunderstood | misunderstood | /ˌmɪsʌndərˈstʊd/ — /ˌmɪsʌndərˈstʊd/ | hiểu lầm |
| **mow** | mowed | mown / mowed | /moʊd/ — /moʊn/ | cắt cỏ |

### 🅾️ O – P

| V1 | V2 | V3 | IPA (V2 / V3) | Nghĩa |
|---|---|---|---|---|
| **overcome** | overcame | overcome | /ˌoʊvərˈkeɪm/ — /ˌoʊvərˈkʌm/ | vượt qua |
| **oversee** | oversaw | overseen | /ˌoʊvərˈsɔː/ — /ˌoʊvərˈsiːn/ | giám sát |
| **overtake** | overtook | overtaken | /ˌoʊvərˈtʊk/ — /ˌoʊvərˈteɪkən/ | vượt qua, đuổi kịp |
| **pay** | paid | paid | /peɪd/ — /peɪd/ | trả tiền |
| **prove** | proved | proven / proved | /pruːvd/ — /ˈpruːvən/ | chứng minh |
| **put** | put | put | /pʊt/ — /pʊt/ | đặt |

### 🆀 Q – R

| V1 | V2 | V3 | IPA (V2 / V3) | Nghĩa |
|---|---|---|---|---|
| **quit** | quit | quit | /kwɪt/ — /kwɪt/ | bỏ, từ bỏ |
| **read** | read | read | /red/ — /red/ | đọc *(viết giống nhau, đọc khác)* |
| **rebuild** | rebuilt | rebuilt | /ˌriːˈbɪlt/ — /ˌriːˈbɪlt/ | xây lại |
| **redo** | redid | redone | /ˌriːˈdɪd/ — /ˌriːˈdʌn/ | làm lại |
| **rewrite** | rewrote | rewritten | /ˌriːˈroʊt/ — /ˌriːˈrɪtn/ | viết lại |
| **rid** | rid | rid | /rɪd/ — /rɪd/ | tống khứ |
| **ride** | rode | ridden | /roʊd/ — /ˈrɪdn/ | cưỡi, đi (xe đạp) |
| **ring** | rang | rung | /ræŋ/ — /rʌŋ/ | rung, gọi điện |
| **rise** | rose | risen | /roʊz/ — /ˈrɪzn/ | mọc, dâng lên (tự thân) |
| **run** | ran | run | /ræn/ — /rʌn/ | chạy |

### 🆂 S

| V1 | V2 | V3 | IPA (V2 / V3) | Nghĩa |
|---|---|---|---|---|
| **saw** | sawed | sawn / sawed | /sɔːd/ — /sɔːn/ | cưa |
| **say** | said | said | /sed/ — /sed/ | nói |
| **see** | saw | seen | /sɔː/ — /siːn/ | nhìn thấy |
| **seek** | sought | sought | /sɔːt/ — /sɔːt/ | tìm kiếm |
| **sell** | sold | sold | /soʊld/ — /soʊld/ | bán |
| **send** | sent | sent | /sent/ — /sent/ | gửi |
| **set** | set | set | /set/ — /set/ | đặt, sắp xếp |
| **sew** | sewed | sewn / sewed | /soʊd/ — /soʊn/ | may, khâu |
| **shake** | shook | shaken | /ʃʊk/ — /ˈʃeɪkən/ | lắc, rung |
| **shave** | shaved | shaved / shaven | /ʃeɪvd/ — /ˈʃeɪvən/ | cạo (râu) |
| **shed** | shed | shed | /ʃed/ — /ʃed/ | rụng, đổ (lệ) |
| **shine** | shone | shone | /ʃoʊn/ — /ʃoʊn/ | tỏa sáng |
| **shoot** | shot | shot | /ʃɒt/ — /ʃɒt/ | bắn |
| **show** | showed | shown / showed | /ʃoʊd/ — /ʃoʊn/ | cho xem |
| **shrink** | shrank | shrunk | /ʃræŋk/ — /ʃrʌŋk/ | co lại |
| **shut** | shut | shut | /ʃʌt/ — /ʃʌt/ | đóng |
| **sing** | sang | sung | /sæŋ/ — /sʌŋ/ | hát |
| **sink** | sank | sunk | /sæŋk/ — /sʌŋk/ | chìm |
| **sit** | sat | sat | /sæt/ — /sæt/ | ngồi |
| **sleep** | slept | slept | /slept/ — /slept/ | ngủ |
| **slide** | slid | slid | /slɪd/ — /slɪd/ | trượt |
| **smell** | smelt / smelled | smelt / smelled | /smelt/ — /smelt/ | ngửi, có mùi |
| **sow** | sowed | sown / sowed | /soʊd/ — /soʊn/ | gieo (hạt) |
| **speak** | spoke | spoken | /spoʊk/ — /ˈspoʊkən/ | nói (ngôn ngữ) |
| **speed** | sped / speeded | sped / speeded | /sped/ — /sped/ | tăng tốc, phóng nhanh |
| **spell** | spelt / spelled | spelt / spelled | /spelt/ — /spelt/ | đánh vần |
| **spend** | spent | spent | /spent/ — /spent/ | tiêu, dành (thời gian) |
| **spill** | spilt / spilled | spilt / spilled | /spɪlt/ — /spɪlt/ | làm đổ |
| **spin** | spun | spun | /spʌn/ — /spʌn/ | xoay, quay tròn |
| **spit** | spat | spat | /spæt/ — /spæt/ | nhổ (nước bọt) |
| **split** | split | split | /splɪt/ — /splɪt/ | chia, tách |
| **spoil** | spoilt / spoiled | spoilt / spoiled | /spɔɪlt/ — /spɔɪlt/ | làm hỏng, nuông chiều |
| **spread** | spread | spread | /spred/ — /spred/ | lan rộng, trải ra |
| **spring** | sprang | sprung | /spræŋ/ — /sprʌŋ/ | bật lên, nảy |
| **stand** | stood | stood | /stʊd/ — /stʊd/ | đứng |
| **steal** | stole | stolen | /stoʊl/ — /ˈstoʊlən/ | trộm cắp |
| **stick** | stuck | stuck | /stʌk/ — /stʌk/ | dính, gắn |
| **sting** | stung | stung | /stʌŋ/ — /stʌŋ/ | đốt, chích |
| **stink** | stank | stunk | /stæŋk/ — /stʌŋk/ | bốc mùi hôi |
| **strike** | struck | struck | /strʌk/ — /strʌk/ | đánh, đập |
| **strive** | strove | striven | /stroʊv/ — /ˈstrɪvən/ | nỗ lực |
| **swear** | swore | sworn | /swɔːr/ — /swɔːrn/ | thề, chửi thề |
| **sweep** | swept | swept | /swept/ — /swept/ | quét |
| **swell** | swelled | swollen / swelled | /sweld/ — /ˈswoʊlən/ | sưng lên |
| **swim** | swam | swum | /swæm/ — /swʌm/ | bơi |
| **swing** | swung | swung | /swʌŋ/ — /swʌŋ/ | đung đưa |

### 🆃 T

| V1 | V2 | V3 | IPA (V2 / V3) | Nghĩa |
|---|---|---|---|---|
| **take** | took | taken | /tʊk/ — /ˈteɪkən/ | lấy, dùng |
| **teach** | taught | taught | /tɔːt/ — /tɔːt/ | dạy |
| **tear** | tore | torn | /tɔːr/ — /tɔːrn/ | xé rách |
| **tell** | told | told | /toʊld/ — /toʊld/ | kể, bảo |
| **think** | thought | thought | /θɔːt/ — /θɔːt/ | nghĩ |
| **throw** | threw | thrown | /θruː/ — /θroʊn/ | ném |
| **thrust** | thrust | thrust | /θrʌst/ — /θrʌst/ | đẩy mạnh |
| **tread** | trod | trodden / trod | /trɒd/ — /ˈtrɒdn/ | giẫm lên |

### 🆄 U

| V1 | V2 | V3 | IPA (V2 / V3) | Nghĩa |
|---|---|---|---|---|
| **undergo** | underwent | undergone | /ˌʌndərˈwent/ — /ˌʌndərˈɡɒn/ | trải qua |
| **understand** | understood | understood | /ˌʌndərˈstʊd/ — /ˌʌndərˈstʊd/ | hiểu |
| **undertake** | undertook | undertaken | /ˌʌndərˈtʊk/ — /ˌʌndərˈteɪkən/ | đảm nhận |
| **upset** | upset | upset | /ʌpˈset/ — /ʌpˈset/ | làm buồn, lật đổ |

### 🆅 W

| V1 | V2 | V3 | IPA (V2 / V3) | Nghĩa |
|---|---|---|---|---|
| **wake** | woke | woken | /woʊk/ — /ˈwoʊkən/ | thức dậy |
| **wear** | wore | worn | /wɔːr/ — /wɔːrn/ | mặc, đội |
| **weave** | wove | woven | /woʊv/ — /ˈwoʊvən/ | dệt |
| **weep** | wept | wept | /wept/ — /wept/ | khóc |
| **wet** | wet / wetted | wet / wetted | /wet/ — /wet/ | làm ướt |
| **win** | won | won | /wʌn/ — /wʌn/ | thắng |
| **wind** | wound | wound | /waʊnd/ — /waʊnd/ | cuộn, quấn, lên dây |
| **withdraw** | withdrew | withdrawn | /wɪðˈdruː/ — /wɪðˈdrɔːn/ | rút lui, rút tiền |
| **withhold** | withheld | withheld | /wɪðˈheld/ — /wɪðˈheld/ | giữ lại, từ chối đưa |
| **withstand** | withstood | withstood | /wɪðˈstʊd/ — /wɪðˈstʊd/ | chịu đựng |
| **wring** | wrung | wrung | /rʌŋ/ — /rʌŋ/ | vắt (khô) |
| **write** | wrote | written | /roʊt/ — /ˈrɪtn/ | viết |

---

### 💡 6 mẹo "vàng" để ghi nhớ cả bảng

1. **Học theo nhóm vần** thay vì học rời rạc: *sing/swim/drink/ring* cùng nhóm *i → a → u*.
2. **Học theo cặp đối lập**: *buy/sell*, *give/take*, *lose/win*, *come/go*.
3. **Học theo chủ đề**: nhóm vận động (*run/swim/ride/drive*), nhóm cảm xúc (*feel/think/mean*), nhóm giao tiếp (*say/tell/speak/hear*).
4. **Đặt câu thật ngắn** với mỗi động từ — não nhớ ngữ cảnh tốt hơn nhớ danh sách.
5. **Đọc to phiên âm IPA** — phát âm đúng giúp não tự "khóa" V2/V3 lại.
6. **Học 10 từ / ngày** trong 20 ngày — đừng cố nhồi nhét 200 từ trong 1 ngày.

### ⚠️ 5 lỗi sai phổ biến cần tránh

- ❌ *I have went to school* → ✅ *I have **gone** to school* (sau **have**, dùng V3).
- ❌ *He **bringed** flowers* → ✅ *He **brought** flowers* (đừng thêm -ed cho động từ bất quy tắc).
- ❌ *She **layed** down* → ✅ *She **lay** down* (nằm = lie/lay/lain, không có tân ngữ).
- ❌ *They **readed** the book* → ✅ *They **read** /red/ the book* (V2 đọc khác V1).
- ❌ *I **hurted** my knee* → ✅ *I **hurt** my knee* (hurt – hurt – hurt, không đổi).`,
        theoryEn: `## 📘 Complete Irregular Verbs Master Table

> **How to use this table:** This is the **most complete reference** with **200+ common irregular verbs** in English, arranged **A → Z**, with **IPA pronunciation** (US/UK) and **Vietnamese meanings**. Bookmark this page for quick lookup!

**Column legend:**
- **V1** = Base form — use with *I/you/we/they* or after *to/do/does/did/will/can*…
- **V2** = Past simple — for completed past actions.
- **V3** = Past participle — used after *have/has/had* (Perfect) or *be* (Passive).
- **IPA** = Pronunciation of V2 / V3 (V1 is usually easy; V2/V3 trip students up).

Scroll the Vietnamese section above for the complete A→Z table — it shares the same V1/V2/V3/IPA columns.

### 💡 6 golden memory tips

1. **Learn by vowel pattern** instead of randomly: *sing/swim/drink/ring* are all *i → a → u*.
2. **Learn in opposing pairs**: *buy/sell*, *give/take*, *lose/win*, *come/go*.
3. **Group by theme**: motion (*run/swim/ride/drive*), feeling (*feel/think/mean*), communication (*say/tell/speak/hear*).
4. **Make a short sentence** for each verb — context locks memory better than lists.
5. **Read the IPA aloud** — correct pronunciation helps your brain anchor V2/V3.
6. **10 words / day** over 20 days beats cramming 200 in one night.

### ⚠️ Top 5 mistakes to avoid

- ❌ *I have went to school* → ✅ *I have **gone** to school* (after **have**, use V3).
- ❌ *He **bringed** flowers* → ✅ *He **brought** flowers*.
- ❌ *She **layed** down* → ✅ *She **lay** down* (intransitive *lie* = lie/lay/lain).
- ❌ *They **readed** the book* → ✅ *They **read** /red/ the book*.
- ❌ *I **hurted** my knee* → ✅ *I **hurt** my knee*.`,
        vocabulary: [
          { word: "irregular verb", meaning: "động từ bất quy tắc", example: "'Go' is an irregular verb: go – went – gone." },
          { word: "past participle", meaning: "quá khứ phân từ (V3)", example: "Use the past participle after 'have'." },
          { word: "base form", meaning: "nguyên mẫu (V1)", example: "The base form of 'went' is 'go'." }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền dạng V2 hoặc V3 đúng (tra bảng nếu cần)",
            instructionEn: "Fill in the correct V2 or V3 (consult the table if needed)",
            sentences: [
              { text: "She has ___ her keys again. (lose)", textEn: "She has ___ her keys again. (lose)", answer: "lost", hint: "lose → V3 (lose/lost/lost)" },
              { text: "The sun ___ at 6 a.m. yesterday. (rise)", textEn: "The sun ___ at 6 a.m. yesterday. (rise)", answer: "rose", hint: "rise → V2 (rise/rose/risen)" },
              { text: "I have ___ to him many times. (speak)", textEn: "I have ___ to him many times. (speak)", answer: "spoken", hint: "speak → V3" },
              { text: "He ___ his arm playing football. (break)", textEn: "He ___ his arm playing football. (break)", answer: "broke", hint: "break → V2" },
              { text: "They have ___ a new house. (build)", textEn: "They have ___ a new house. (build)", answer: "built", hint: "build → V3 (V2 = V3)" },
              { text: "She ___ the cup on the floor. (drop)*", textEn: "She ___ the cup on the floor.", answer: "dropped", hint: "drop is REGULAR — add -ed" }
            ]
          }
        ],
        quiz: [
          { question: "What is V3 of 'choose'?", options: ["choosed", "chose", "chosen", "choose"], answer: 2, explanation: "choose – chose – chosen. After 'have', use V3 = chosen." },
          { question: "Which row is CORRECT?", options: ["sing – sang – sang", "swim – swam – swum", "ring – rung – rang", "drink – drank – drank"], answer: 1, explanation: "swim – swam – swum follows the i→a→u family." },
          { question: "'I have ___ my homework.' Choose the correct V3 of 'do'.", options: ["did", "done", "doed", "doing"], answer: 1, explanation: "do – did – done. After 'have', use V3 = done." },
          { question: "Which verb does NOT change (V1 = V2 = V3)?", options: ["bring", "cost", "drive", "fly"], answer: 1, explanation: "cost – cost – cost. Other no-change verbs: cut, put, set, let, hit, hurt, shut, read (spelling)." },
          { question: "Complete: 'The thief ___ my wallet.' (steal)", options: ["stealed", "stole", "stolen", "steals"], answer: 1, explanation: "Past simple of 'steal' is 'stole' (steal/stole/stolen)." },
          { question: "Pick the WRONG sentence:", options: ["She has written a letter.", "He laid the book on the table.", "They have ate dinner.", "The window was broken."], answer: 2, explanation: "After 'have', use V3. 'Ate' is V2 — should be 'eaten': They have eaten dinner." }
        ]
      },

      // ───────────── LESSON 1 — TOP 30 ESSENTIAL ─────────────
      {
        id: "irregular-verbs-top-30",
        title: "Top 30 động từ bất quy tắc thông dụng nhất",
        titleEn: "Top 30 Most Common Irregular Verbs",
        level: 2,
        difficulty: "beginner",
        theory: `## Top 30 động từ bất quy tắc bạn PHẢI thuộc

Động từ bất quy tắc (irregular verbs) là những động từ mà dạng quá khứ (V2) và quá khứ phân từ (V3) **không thêm -ed** như thông thường. Đây là 30 động từ xuất hiện nhiều nhất trong tiếng Anh hằng ngày.

### 📋 Bảng động từ thiết yếu

| V1 (Nguyên mẫu) | V2 (Quá khứ) | V3 (P.P) | Nghĩa |
|---|---|---|---|
| **be** | was / were | been | thì, là, ở |
| **have** | had | had | có |
| **do** | did | done | làm |
| **say** | said | said | nói |
| **go** | went | gone | đi |
| **get** | got | got / gotten | nhận, lấy |
| **make** | made | made | làm, chế tạo |
| **know** | knew | known | biết |
| **think** | thought | thought | nghĩ |
| **take** | took | taken | lấy, dùng |
| **see** | saw | seen | nhìn thấy |
| **come** | came | come | đến |
| **want** | wanted | wanted | *(quy tắc — bẫy!)* |
| **give** | gave | given | đưa, cho |
| **find** | found | found | tìm thấy |
| **tell** | told | told | kể |
| **become** | became | become | trở thành |
| **leave** | left | left | rời đi |
| **feel** | felt | felt | cảm thấy |
| **bring** | brought | brought | mang đến |
| **begin** | began | begun | bắt đầu |
| **keep** | kept | kept | giữ |
| **hold** | held | held | giữ, nắm |
| **write** | wrote | written | viết |
| **stand** | stood | stood | đứng |
| **hear** | heard | heard | nghe |
| **let** | let | let | cho phép |
| **mean** | meant | meant | có nghĩa là |
| **set** | set | set | đặt, sắp xếp |
| **meet** | met | met | gặp |

### 🧠 Mẹo nhớ siêu nhanh

1. **Nhóm "không đổi"** (V1 = V2 = V3): *let – let – let*, *set – set – set*, *cut – cut – cut*, *put – put – put*, *cost – cost – cost*, *hurt – hurt – hurt*. Học một câu: *"Let me set my cut hand and put a band on it — it cost me, but it never hurt twice."*
2. **Nhóm "i → a → u"** (lên dốc): *begin – began – begun*, *sing – sang – sung*, *swim – swam – swum*, *drink – drank – drunk*, *ring – rang – rung*.
3. **Nhóm "kết thúc bằng -ought / -aught"**: *think – thought*, *bring – brought*, *buy – bought*, *catch – caught*, *teach – taught*. Nhớ câu: *"I thought I brought the cat I caught and taught."*
4. **V2 = V3** (đi đôi): *have – had – had*, *make – made – made*, *say – said – said*, *find – found – found*, *get – got – got*.

### ⚠️ Cảnh báo bẫy hay gặp
- **Đừng** thêm -ed vào động từ bất quy tắc: ❌ *goed*, *bringed*, *thinked* → ✅ *went, brought, thought*.
- **Have + V3** (Perfect): luôn dùng V3 (cột 3), không phải V2: ❌ *I have went* → ✅ *I have gone*.
- **was/were** dùng cho quá khứ của "be"; chia theo chủ ngữ: *I/he/she/it was — you/we/they were*.`,
        theoryEn: `## The Top 30 Irregular Verbs You MUST Know

Irregular verbs do **not** form their past (V2) and past participle (V3) by adding -ed. These 30 verbs appear most often in everyday English.

### 📋 Essential verb table

| V1 (base) | V2 (past) | V3 (P.P) | Meaning |
|---|---|---|---|
| **be** | was / were | been | to be |
| **have** | had | had | to have |
| **do** | did | done | to do |
| **say** | said | said | to say |
| **go** | went | gone | to go |
| **get** | got | got / gotten | to obtain |
| **make** | made | made | to make |
| **know** | knew | known | to know |
| **think** | thought | thought | to think |
| **take** | took | taken | to take |
| **see** | saw | seen | to see |
| **come** | came | come | to come |
| **give** | gave | given | to give |
| **find** | found | found | to find |
| **tell** | told | told | to tell |
| **become** | became | become | to become |
| **leave** | left | left | to leave |
| **feel** | felt | felt | to feel |
| **bring** | brought | brought | to bring |
| **begin** | began | begun | to begin |
| **keep** | kept | kept | to keep |
| **hold** | held | held | to hold |
| **write** | wrote | written | to write |
| **stand** | stood | stood | to stand |
| **hear** | heard | heard | to hear |
| **let** | let | let | to allow |
| **mean** | meant | meant | to mean |
| **set** | set | set | to set |
| **meet** | met | met | to meet |
| **read** | read /red/ | read /red/ | to read |

### 🧠 Quick memory tricks

1. **No-change group** (V1 = V2 = V3): *let, set, cut, put, cost, hurt*. Remember: *"Let me set my cut hand and put a band on it — it cost me but never hurt twice."*
2. **i → a → u climb**: *begin – began – begun*, *sing – sang – sung*, *swim – swam – swum*, *drink – drank – drunk*, *ring – rang – rung*.
3. **-ought / -aught family**: *think – thought*, *bring – brought*, *buy – bought*, *catch – caught*, *teach – taught*. Mnemonic: *"I thought I brought the cat I caught and taught."*
4. **V2 = V3 pair**: *have – had – had*, *make – made – made*, *say – said – said*, *find – found – found*.

### ⚠️ Common traps
- Never add -ed to irregular verbs: ❌ *goed, bringed, thinked* → ✅ *went, brought, thought*.
- **Have + V3** (perfect tenses) always uses V3, not V2: ❌ *I have went* → ✅ *I have gone*.
- **was/were** follow the subject: *I/he/she/it was — you/we/they were*.`,
        proTips: [
          "Học theo cụm 3 (V1-V2-V3) trong cùng một nhịp, đừng tách rời.",
          "Đọc to mỗi nhóm 5 lần mỗi sáng trong 7 ngày — bộ não sẽ ghi vào trí nhớ dài hạn.",
          "Khi viết, luôn tự hỏi: 'mình dùng V2 (Past Simple) hay V3 (Perfect/Passive)?'"
        ],
        proTipsEn: [
          "Memorize each verb as a 3-beat chunk (V1-V2-V3); never separate them.",
          "Read each group aloud 5 times every morning for a week — long-term memory locks in.",
          "When writing, always ask: 'Do I need V2 (Past Simple) or V3 (Perfect/Passive)?'"
        ],
        vocabulary: [
          { word: "go - went - gone", meaning: "đi", example: "She has gone to Hanoi twice this year.", partOfSpeech: "verb" },
          { word: "see - saw - seen", meaning: "nhìn thấy", example: "I have seen that movie before.", partOfSpeech: "verb" },
          { word: "eat - ate - eaten", meaning: "ăn", example: "He had already eaten when I arrived.", partOfSpeech: "verb" },
          { word: "write - wrote - written", meaning: "viết", example: "She has written three novels.", partOfSpeech: "verb" },
          { word: "take - took - taken", meaning: "lấy, dùng", example: "I took the bus and arrived late.", partOfSpeech: "verb" },
          { word: "think - thought - thought", meaning: "nghĩ", example: "I thought you were joking.", partOfSpeech: "verb" },
          { word: "bring - brought - brought", meaning: "mang đến", example: "He brought a cake to the party.", partOfSpeech: "verb" },
          { word: "begin - began - begun", meaning: "bắt đầu", example: "The class has just begun.", partOfSpeech: "verb" },
          { word: "drink - drank - drunk", meaning: "uống", example: "She has drunk too much coffee today.", partOfSpeech: "verb" },
          { word: "give - gave - given", meaning: "đưa, cho", example: "They have given us a second chance.", partOfSpeech: "verb" }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền dạng quá khứ (V2) đúng của động từ",
            instructionEn: "Fill in the correct past simple (V2) form",
            sentences: [
              { text: "Yesterday I ___ to the cinema with Mai. (go)", textEn: "Yesterday I ___ to the cinema with Mai. (go)", answer: "went", hint: "go → V2" },
              { text: "She ___ a beautiful song last night. (sing)", textEn: "She ___ a beautiful song last night. (sing)", answer: "sang", hint: "sing → V2 (i→a)" },
              { text: "We ___ pho for breakfast this morning. (eat)", textEn: "We ___ pho for breakfast this morning. (eat)", answer: "ate", hint: "eat → V2" },
              { text: "He ___ the letter very carefully. (write)", textEn: "He ___ the letter very carefully. (write)", answer: "wrote", hint: "write → V2" },
              { text: "They ___ me a small gift. (give)", textEn: "They ___ me a small gift. (give)", answer: "gave", hint: "give → V2" },
              { text: "I ___ the news on TV. (hear)", textEn: "I ___ the news on TV. (hear)", answer: "heard", hint: "hear → V2 = V3" }
            ]
          },
          {
            type: "fill-in-blank" as const,
            instruction: "Điền dạng quá khứ phân từ (V3) sau have/has/had",
            instructionEn: "Fill in the past participle (V3) after have/has/had",
            sentences: [
              { text: "She has ___ to Tokyo three times. (go)", textEn: "She has ___ to Tokyo three times. (go)", answer: "gone", hint: "go → V3" },
              { text: "I have never ___ such a tasty cake. (eat)", textEn: "I have never ___ such a tasty cake. (eat)", answer: "eaten", hint: "eat → V3" },
              { text: "They have ___ the report already. (write)", textEn: "They have ___ the report already. (write)", answer: "written", hint: "write → V3" },
              { text: "He has ___ the same book five times. (read)", textEn: "He has ___ the same book five times. (read)", answer: "read", hint: "read → V3 (spelling same)" },
              { text: "We had ___ many photos before sunset. (take)", textEn: "We had ___ many photos before sunset. (take)", answer: "taken", hint: "take → V3" }
            ]
          },
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp câu đúng",
            instructionEn: "Reorder the sentence correctly",
            items: [
              { scrambled: ["I", "have", "never", "seen", "such", "a", "beautiful", "sunrise"], correct: "I have never seen such a beautiful sunrise.", correctEn: "I have never seen such a beautiful sunrise." },
              { scrambled: ["She", "brought", "me", "a", "cup", "of", "tea"], correct: "She brought me a cup of tea.", correctEn: "She brought me a cup of tea." },
              { scrambled: ["They", "had", "left", "before", "we", "arrived"], correct: "They had left before we arrived.", correctEn: "They had left before we arrived." }
            ]
          }
        ],
        quiz: [
          { question: "Choose the correct past form: 'Yesterday she ___ to the market.'", options: ["goed", "gone", "went", "going"], answer: 2, explanation: "Past simple of 'go' is 'went'. 'Gone' is the past participle (V3)." },
          { question: "Complete: 'I have ___ that movie twice.'", options: ["saw", "seen", "see", "seeing"], answer: 1, explanation: "After 'have', use V3. The V3 of 'see' is 'seen'." },
          { question: "Which is the correct V1-V2-V3?", options: ["bring – bringed – bringed", "bring – brang – brung", "bring – brought – brought", "bring – brung – brought"], answer: 2, explanation: "'Bring' belongs to the -ought family: bring – brought – brought." },
          { question: "Pick the WRONG sentence:", options: ["She has gone home.", "He has went home.", "They have gone home.", "We have gone home."], answer: 1, explanation: "After 'has/have', we use V3 ('gone'), never V2 ('went')." },
          { question: "Complete: 'I ___ a strange noise last night.'", options: ["hear", "heard", "hearing", "hears"], answer: 1, explanation: "Past simple of 'hear' is 'heard' (V2 = V3)." },
          { question: "Which verb is in the 'i → a → u' family?", options: ["take – took – taken", "sing – sang – sung", "go – went – gone", "make – made – made"], answer: 1, explanation: "'sing – sang – sung' follows the i→a→u vowel pattern (also swim, drink, ring, begin)." },
          { question: "Complete: 'He ___ the door and walked in.'", options: ["opens", "opened", "open", "opening"], answer: 1, explanation: "'Open' is a REGULAR verb — past is 'opened' with -ed. Not every common verb is irregular!" }
        ]
      },

      // ───────────── LESSON 2 — PATTERNS & FAMILIES ─────────────
      {
        id: "irregular-verbs-patterns",
        title: "Nhóm pattern: học 50 động từ trong 1 giờ",
        titleEn: "Pattern Families: Learn 50 Verbs in 1 Hour",
        level: 3,
        difficulty: "intermediate",
        theory: `## Phân nhóm động từ bất quy tắc theo pattern

Thay vì học thuộc lòng từng cái, hãy phân loại chúng vào **6 nhóm pattern**. Bạn sẽ nhớ 50 động từ trong vòng 1 giờ.

### 🔵 Nhóm 1: Không đổi (V1 = V2 = V3)
Học như một câu thần chú: *"Cut, hit, put, set, let — cost, hurt, shut, bet, quit."*

| V1 | V2 | V3 | Nghĩa |
|---|---|---|---|
| cut | cut | cut | cắt |
| hit | hit | hit | đánh, đập |
| put | put | put | đặt |
| set | set | set | đặt, sắp |
| let | let | let | cho phép |
| cost | cost | cost | có giá |
| hurt | hurt | hurt | đau, làm đau |
| shut | shut | shut | đóng |
| bet | bet | bet | cá cược |
| quit | quit | quit | bỏ, từ chức |

### 🟢 Nhóm 2: V2 = V3 (kết thúc bằng -t hoặc -ght)

| V1 | V2 / V3 | Nghĩa |
|---|---|---|
| sleep | slept | ngủ |
| keep | kept | giữ |
| feel | felt | cảm thấy |
| leave | left | rời đi |
| meet | met | gặp |
| lose | lost | mất |
| sell | sold | bán |
| tell | told | kể |
| think | thought | nghĩ |
| bring | brought | mang |
| buy | bought | mua |
| catch | caught | bắt |
| teach | taught | dạy |
| fight | fought | chiến đấu |

### 🟡 Nhóm 3: i → a → u (cú "lên dốc" 3 nguyên âm)

| V1 | V2 | V3 |
|---|---|---|
| begin | began | begun |
| sing | sang | sung |
| ring | rang | rung |
| swim | swam | swum |
| drink | drank | drunk |
| sink | sank | sunk |
| spring | sprang | sprung |
| shrink | shrank | shrunk |

### 🟠 Nhóm 4: i → o → o (đổi sang "o" và giữ)

| V1 | V2 | V3 |
|---|---|---|
| win | won | won |
| dig | dug | dug |
| stick | stuck | stuck |
| sting | stung | stung |
| hang | hung | hung |
| swing | swung | swung |

### 🟣 Nhóm 5: -ow → -ew → -own (cú "thổi bay")

| V1 | V2 | V3 |
|---|---|---|
| know | knew | known |
| grow | grew | grown |
| throw | threw | thrown |
| blow | blew | blown |
| fly | flew | flown |
| draw | drew | drawn |
| show | showed | shown |

### 🔴 Nhóm 6: V3 = V1 + -n (chỉ V3 thêm -n)

| V1 | V2 | V3 |
|---|---|---|
| eat | ate | eaten |
| give | gave | given |
| take | took | taken |
| write | wrote | written |
| ride | rode | ridden |
| drive | drove | driven |
| rise | rose | risen |
| speak | spoke | spoken |
| break | broke | broken |
| steal | stole | stolen |

### 💡 Cách dùng bảng pattern hiệu quả
1. Chọn **1 nhóm/ngày** → đọc to 10 lần → tạo 3 câu của riêng bạn.
2. Sau 6 ngày, làm lại toàn bộ quiz mà không nhìn bảng.
3. Mỗi tuần ôn lại 1 nhóm "yếu" nhất của bạn.`,
        theoryEn: `## Grouping Irregular Verbs into Patterns

Don't memorize blindly — sort verbs into **6 pattern families** and you'll remember 50 in one hour.

### 🔵 Group 1: No Change (V1 = V2 = V3)
Mantra: *"Cut, hit, put, set, let — cost, hurt, shut, bet, quit."*

| V1 | V2 | V3 |
|---|---|---|
| cut | cut | cut |
| hit | hit | hit |
| put | put | put |
| set | set | set |
| let | let | let |
| cost | cost | cost |
| hurt | hurt | hurt |
| shut | shut | shut |
| bet | bet | bet |
| quit | quit | quit |

### 🟢 Group 2: V2 = V3 (ending in -t / -ght)

| V1 | V2 / V3 |
|---|---|
| sleep | slept |
| keep | kept |
| feel | felt |
| leave | left |
| meet | met |
| lose | lost |
| sell | sold |
| tell | told |
| think | thought |
| bring | brought |
| buy | bought |
| catch | caught |
| teach | taught |
| fight | fought |

### 🟡 Group 3: i → a → u (the "vowel staircase")

| V1 | V2 | V3 |
|---|---|---|
| begin | began | begun |
| sing | sang | sung |
| ring | rang | rung |
| swim | swam | swum |
| drink | drank | drunk |
| sink | sank | sunk |

### 🟠 Group 4: i → o → o ("locked in O")

| V1 | V2 | V3 |
|---|---|---|
| win | won | won |
| dig | dug | dug |
| stick | stuck | stuck |
| sting | stung | stung |
| hang | hung | hung |

### 🟣 Group 5: -ow → -ew → -own ("the wind family")

| V1 | V2 | V3 |
|---|---|---|
| know | knew | known |
| grow | grew | grown |
| throw | threw | thrown |
| blow | blew | blown |
| fly | flew | flown |
| draw | drew | drawn |

### 🔴 Group 6: V3 = V1 + -n

| V1 | V2 | V3 |
|---|---|---|
| eat | ate | eaten |
| give | gave | given |
| take | took | taken |
| write | wrote | written |
| ride | rode | ridden |
| drive | drove | driven |
| rise | rose | risen |
| speak | spoke | spoken |
| break | broke | broken |
| steal | stole | stolen |

### 💡 How to use these tables
1. Pick **one group per day** → read aloud 10 times → write 3 personal sentences.
2. After 6 days, retake the quiz without looking.
3. Each week, review your weakest group.`,
        proTips: [
          "Học theo nhóm pattern thay vì học bảng A-Z — não nhớ pattern dễ hơn nhớ rời rạc gấp 5 lần.",
          "Gắn mỗi nhóm với một hình ảnh: i→a→u là 'lên dốc', -ow→-ew→-own là 'gió thổi'.",
          "Khi gặp động từ mới, tự hỏi: 'nó giống nhóm nào?' — sẽ đoán đúng V2/V3 nhanh hơn."
        ],
        proTipsEn: [
          "Memorize by pattern, not alphabetical lists — pattern memory is 5× more durable.",
          "Anchor each group to an image: i→a→u is a staircase, -ow→-ew→-own is wind blowing.",
          "When you meet a new verb, ask: 'which family does it belong to?' to predict V2/V3."
        ],
        vocabulary: [
          { word: "shut - shut - shut", meaning: "đóng (không đổi)", example: "She shut the door quietly.", partOfSpeech: "verb" },
          { word: "lose - lost - lost", meaning: "mất", example: "I have lost my keys again.", partOfSpeech: "verb" },
          { word: "catch - caught - caught", meaning: "bắt được", example: "He caught the ball with one hand.", partOfSpeech: "verb" },
          { word: "swim - swam - swum", meaning: "bơi", example: "We have swum across this river before.", partOfSpeech: "verb" },
          { word: "win - won - won", meaning: "thắng", example: "Our team has won three matches in a row.", partOfSpeech: "verb" },
          { word: "throw - threw - thrown", meaning: "ném", example: "He has thrown the ball too far.", partOfSpeech: "verb" },
          { word: "break - broke - broken", meaning: "làm vỡ", example: "She has broken her phone again.", partOfSpeech: "verb" },
          { word: "speak - spoke - spoken", meaning: "nói", example: "He has spoken to the manager.", partOfSpeech: "verb" },
          { word: "ride - rode - ridden", meaning: "cưỡi, đạp", example: "I have never ridden a horse.", partOfSpeech: "verb" },
          { word: "fly - flew - flown", meaning: "bay", example: "She has flown to Paris twice.", partOfSpeech: "verb" }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền V2 hoặc V3 theo ngữ cảnh",
            instructionEn: "Fill V2 or V3 based on context",
            sentences: [
              { text: "Last week he ___ a new record. (break)", textEn: "Last week he ___ a new record. (break)", answer: "broke", hint: "Past simple → V2" },
              { text: "I have ___ Spanish for two years. (speak)", textEn: "I have ___ Spanish for two years. (speak)", answer: "spoken", hint: "Present perfect → V3" },
              { text: "She has just ___ her bike. (ride)", textEn: "She has just ___ her bike. (ride)", answer: "ridden", hint: "Present perfect → V3" },
              { text: "We ___ the prize last year. (win)", textEn: "We ___ the prize last year. (win)", answer: "won", hint: "i→o→o group" },
              { text: "The wind ___ the umbrella away. (blow)", textEn: "The wind ___ the umbrella away. (blow)", answer: "blew", hint: "blow → V2" },
              { text: "He has ___ to America five times. (fly)", textEn: "He has ___ to America five times. (fly)", answer: "flown", hint: "fly → V3" },
              { text: "I ___ the ball into the basket. (throw)", textEn: "I ___ the ball into the basket. (throw)", answer: "threw", hint: "Past simple" },
              { text: "She has ___ her wallet on the bus. (lose)", textEn: "She has ___ her wallet on the bus. (lose)", answer: "lost", hint: "V2 = V3" }
            ]
          },
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp câu đúng",
            instructionEn: "Reorder the sentence",
            items: [
              { scrambled: ["The", "thief", "had", "stolen", "the", "diamond"], correct: "The thief had stolen the diamond.", correctEn: "The thief had stolen the diamond." },
              { scrambled: ["We", "have", "never", "ridden", "a", "camel"], correct: "We have never ridden a camel.", correctEn: "We have never ridden a camel." },
              { scrambled: ["She", "swam", "across", "the", "lake", "yesterday"], correct: "She swam across the lake yesterday.", correctEn: "She swam across the lake yesterday." }
            ]
          }
        ],
        quiz: [
          { question: "Which verb belongs to the 'no change' family?", options: ["sing", "put", "drink", "break"], answer: 1, explanation: "'put' stays the same in all three forms: put – put – put." },
          { question: "Pick the correct sequence: 'drink – ___ – ___'", options: ["drinked – drinked", "drank – drunk", "drunk – drank", "drank – drank"], answer: 1, explanation: "drink – drank – drunk (i → a → u staircase)." },
          { question: "Complete: 'The artist has ___ a beautiful portrait.'", options: ["draw", "drew", "drawn", "drawed"], answer: 2, explanation: "After 'has', use V3. draw → drew → drawn." },
          { question: "Which V2 is correct? 'Yesterday I ___ my phone.'", options: ["losed", "lost", "loose", "losing"], answer: 1, explanation: "lose – lost – lost (V2 = V3, ends with -t)." },
          { question: "Pick the WRONG sentence:", options: ["She has flew to Paris.", "She has flown to Paris.", "She flew to Paris.", "She is flying to Paris."], answer: 0, explanation: "After 'has', use V3 ('flown'), not V2 ('flew')." },
          { question: "Which group does 'catch' belong to?", options: ["i → a → u", "No change", "-t / -ght (V2 = V3)", "-ow → -ew → -own"], answer: 2, explanation: "catch – caught – caught (V2 = V3, ends in -ght)." },
          { question: "Complete: 'The sun has ___ already.'", options: ["raise", "raised", "rose", "risen"], answer: 3, explanation: "rise – rose – risen. After 'has', V3 = risen." }
        ]
      },

      // ───────────── LESSON 3 — TRICKY PAIRS ─────────────
      {
        id: "irregular-verbs-tricky-pairs",
        title: "Bẫy động từ dễ nhầm: lie/lay, rise/raise, fall/fell",
        titleEn: "Tricky Pairs: lie/lay, rise/raise, fall/fell",
        level: 4,
        difficulty: "advanced",
        theory: `## Những cặp động từ bất quy tắc dễ nhầm nhất

Đây là phần khiến cả người bản xứ cũng sai. Sau bài này bạn sẽ tránh được 80% lỗi sai phổ biến nhất.

### ⚔️ Cặp 1: LIE vs LAY (cặp "tử thần")

| Động từ | V2 | V3 | Nghĩa | Có tân ngữ? |
|---|---|---|---|---|
| **lie** | lay | lain | nằm xuống (tự thân) | KHÔNG |
| **lay** | laid | laid | đặt cái gì đó xuống | CÓ |
| **lie** | lied | lied | nói dối *(quy tắc)* | (intransitive) |

**Mẹo phân biệt:** Nếu CÓ tân ngữ → dùng **lay/laid/laid**. Nếu KHÔNG có tân ngữ → dùng **lie/lay/lain**.

Ví dụ:
- *I **lie** on the bed every afternoon.* (tôi nằm — không tân ngữ)
- *Yesterday I **lay** on the bed.* (V2 của lie)
- *I have **lain** here for an hour.* (V3 của lie)
- *Please **lay** the baby on the bed.* (đặt em bé — có tân ngữ)
- *She **laid** the book on the table.* (V2 của lay)
- *He **lied** about his age.* (nói dối — luôn quy tắc)

### ⚔️ Cặp 2: RISE vs RAISE

| Động từ | V2 | V3 | Nghĩa | Có tân ngữ? |
|---|---|---|---|---|
| **rise** | rose | risen | tăng lên, đứng lên (tự thân) | KHÔNG |
| **raise** | raised | raised | nâng cái gì lên, nuôi dạy *(quy tắc)* | CÓ |

Ví dụ:
- *The sun **rises** in the east.* (tự nó mọc — không tân ngữ)
- *Prices have **risen** sharply.* (giá tăng)
- *Please **raise** your hand.* (giơ tay — có tân ngữ "hand")
- *They **raised** three children.* (nuôi dạy 3 con)

### ⚔️ Cặp 3: FALL vs FELL (vs FEEL)

| Động từ | V2 | V3 | Nghĩa |
|---|---|---|---|
| **fall** | fell | fallen | ngã, rơi |
| **fell** | felled | felled | chặt (cây) *(quy tắc)* |
| **feel** | felt | felt | cảm thấy |

⚠️ Đừng nhầm **fell** (V2 của *fall*) với **felt** (V2 của *feel*).

- *I **fell** off the bike.* (tôi ngã)
- *I **felt** sick yesterday.* (tôi cảm thấy ốm)

### ⚔️ Cặp 4: FIND vs FOUND (vs FOUND — thành lập)

| Động từ | V2 | V3 | Nghĩa |
|---|---|---|---|
| **find** | found | found | tìm thấy |
| **found** | founded | founded | thành lập *(quy tắc)* |

- *I **found** my keys.* (tìm thấy)
- *He **founded** the company in 2010.* (thành lập)

### ⚔️ Cặp 5: HANG (2 nghĩa, 2 cách chia)

| Nghĩa | V1 | V2 | V3 |
|---|---|---|---|
| treo (đồ vật) | hang | hung | hung |
| treo cổ (xử tử) | hang | hanged | hanged |

- *I **hung** the picture on the wall.* (treo)
- *The criminal was **hanged**.* (bị xử treo cổ)

### ⚔️ Cặp 6: WAKE / WAKEN / AWAKE / AWAKEN
Tất cả đều có nghĩa "thức dậy". Dùng phổ biến nhất:
- **wake (up) – woke – woken** *(thông dụng nhất, đời sống hằng ngày)*
- *I woke up at 6.* / *He has woken the baby.*

### 💡 Quy tắc vàng phân biệt
1. **Tự thân (intransitive)** → thường là bất quy tắc: *lie, rise, fall, sit*.
2. **Tác động lên vật khác (transitive)** → thường là quy tắc: *lay, raise, fell, seat*.
3. Nếu bí, hãy hỏi: *"Tôi đang LÀM cái gì đó hay tôi đang TRẠNG THÁI gì đó?"*`,
        theoryEn: `## The Trickiest Irregular Verb Pairs

This is where even native speakers slip. After this lesson you'll avoid 80% of common errors.

### ⚔️ Pair 1: LIE vs LAY (the killer)

| Verb | V2 | V3 | Meaning | Takes object? |
|---|---|---|---|---|
| **lie** | lay | lain | to recline | NO |
| **lay** | laid | laid | to place sth down | YES |
| **lie** | lied | lied | to tell a falsehood *(regular)* | (intransitive) |

**Decision rule:** If there's an OBJECT → use **lay/laid/laid**. If there's NO object → use **lie/lay/lain**.

- *I **lie** on the bed every afternoon.* (no object)
- *Yesterday I **lay** on the bed.* (V2 of lie)
- *I have **lain** here for an hour.* (V3 of lie)
- *Please **lay** the baby on the bed.* (object = "baby")
- *She **laid** the book on the table.* (V2 of lay)
- *He **lied** about his age.* (always regular)

### ⚔️ Pair 2: RISE vs RAISE

| Verb | V2 | V3 | Meaning | Takes object? |
|---|---|---|---|---|
| **rise** | rose | risen | to go up (by itself) | NO |
| **raise** | raised | raised | to lift sth up, to bring up children *(regular)* | YES |

- *The sun **rises** in the east.* (no object)
- *Prices have **risen** sharply.* 
- *Please **raise** your hand.* (object = "hand")
- *They **raised** three children.* 

### ⚔️ Pair 3: FALL vs FELL (vs FEEL)

| Verb | V2 | V3 | Meaning |
|---|---|---|---|
| **fall** | fell | fallen | to drop, to tip over |
| **fell** | felled | felled | to chop down (a tree) *(regular)* |
| **feel** | felt | felt | to sense / experience |

Don't confuse **fell** (V2 of *fall*) with **felt** (V2 of *feel*).

- *I **fell** off the bike.*
- *I **felt** sick yesterday.*

### ⚔️ Pair 4: FIND vs FOUND (vs FOUND — to establish)

| Verb | V2 | V3 | Meaning |
|---|---|---|---|
| **find** | found | found | to discover |
| **found** | founded | founded | to establish *(regular)* |

- *I **found** my keys.*
- *He **founded** the company in 2010.*

### ⚔️ Pair 5: HANG (two meanings, two patterns)

| Meaning | V1 | V2 | V3 |
|---|---|---|---|
| to suspend (objects) | hang | hung | hung |
| to execute by hanging | hang | hanged | hanged |

- *I **hung** the picture on the wall.*
- *The criminal was **hanged**.*

### 💡 Golden rule
1. **Intransitive verbs** (no object) tend to be irregular: *lie, rise, fall, sit*.
2. **Transitive verbs** (with object) tend to be regular: *lay, raise, fell, seat*.
3. When stuck, ask: *"Am I DOING something to an object, or just BEING in a state?"*`,
        proTips: [
          "Quy tắc vàng: có tân ngữ → dùng phiên bản 'transitive' (thường là quy tắc).",
          "Tự đặt 3 câu của riêng bạn cho mỗi cặp, đọc to mỗi tối trước khi ngủ.",
          "Khi viết tiếng Anh học thuật/IELTS, kiểm tra lại các cặp này — đây là lỗi mà giám khảo cực ghét."
        ],
        proTipsEn: [
          "Golden rule: if there's an object, choose the transitive (usually regular) twin.",
          "Write 3 personal sentences per pair and read them aloud nightly.",
          "Always proofread these pairs in IELTS/academic writing — examiners notice them immediately."
        ],
        vocabulary: [
          { word: "lie - lay - lain", meaning: "nằm xuống (tự thân)", example: "I lay on the sofa for an hour yesterday.", partOfSpeech: "intransitive verb" },
          { word: "lay - laid - laid", meaning: "đặt cái gì xuống", example: "She laid the book on the desk.", partOfSpeech: "transitive verb" },
          { word: "rise - rose - risen", meaning: "tăng, mọc, đứng lên", example: "The sun has already risen.", partOfSpeech: "intransitive verb" },
          { word: "raise - raised - raised", meaning: "nâng lên, nuôi dạy", example: "Please raise your hand to answer.", partOfSpeech: "transitive verb" },
          { word: "fall - fell - fallen", meaning: "ngã, rơi", example: "The leaves have fallen from the trees.", partOfSpeech: "verb" },
          { word: "feel - felt - felt", meaning: "cảm thấy", example: "I felt tired after the long flight.", partOfSpeech: "verb" },
          { word: "find - found - found", meaning: "tìm thấy", example: "Have you found your wallet yet?", partOfSpeech: "verb" },
          { word: "hang - hung - hung", meaning: "treo (đồ vật)", example: "She hung the painting above the sofa.", partOfSpeech: "verb" }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Chọn động từ đúng (lie/lay, rise/raise, fall/feel)",
            instructionEn: "Choose the correct verb form",
            sentences: [
              { text: "She ___ down on the bed and fell asleep. (lie, past)", textEn: "She ___ down on the bed and fell asleep. (lie, past)", answer: "lay", hint: "lie → lay (V2, no object)" },
              { text: "Please ___ the baby gently on the bed. (lay/lie)", textEn: "Please ___ the baby gently on the bed. (lay/lie)", answer: "lay", hint: "Has an object (baby) → lay" },
              { text: "The book has ___ on the floor for days. (lie, V3)", textEn: "The book has ___ on the floor for days. (lie, V3)", answer: "lain", hint: "lie → lain (V3, no object)" },
              { text: "Prices have ___ by 10% this year. (rise)", textEn: "Prices have ___ by 10% this year. (rise)", answer: "risen", hint: "no object → rise → risen" },
              { text: "The teacher asked us to ___ our hands. (rise/raise)", textEn: "The teacher asked us to ___ our hands. (rise/raise)", answer: "raise", hint: "object = hands → raise" },
              { text: "Yesterday I ___ off my bike. (fall)", textEn: "Yesterday I ___ off my bike. (fall)", answer: "fell", hint: "fall → fell (V2)" },
              { text: "I ___ very tired this morning. (feel)", textEn: "I ___ very tired this morning. (feel)", answer: "felt", hint: "feel → felt (V2)" },
              { text: "He ___ the picture on the wall yesterday. (hang, objects)", textEn: "He ___ the picture on the wall yesterday. (hang, objects)", answer: "hung", hint: "hang for objects → hung" }
            ]
          },
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp câu",
            instructionEn: "Reorder the sentences",
            items: [
              { scrambled: ["The", "sun", "has", "risen", "above", "the", "mountain"], correct: "The sun has risen above the mountain.", correctEn: "The sun has risen above the mountain." },
              { scrambled: ["She", "laid", "the", "baby", "in", "the", "cradle"], correct: "She laid the baby in the cradle.", correctEn: "She laid the baby in the cradle." },
              { scrambled: ["I", "have", "lain", "in", "bed", "all", "morning"], correct: "I have lain in bed all morning.", correctEn: "I have lain in bed all morning." }
            ]
          }
        ],
        quiz: [
          { question: "Yesterday I ___ on the sofa for two hours.", options: ["lay", "laid", "lied", "lain"], answer: 0, explanation: "lie (nằm) → lay (V2). No object, so use the 'lie' family." },
          { question: "She ___ the baby gently on the bed.", options: ["lay", "lied", "laid", "lain"], answer: 2, explanation: "There's an object (baby), so use 'lay → laid → laid'." },
          { question: "He ___ about his age in the interview.", options: ["lay", "laid", "lied", "lain"], answer: 2, explanation: "'lie' meaning 'to tell a falsehood' is REGULAR → lied." },
          { question: "Please ___ your hand if you know the answer.", options: ["rise", "raise", "risen", "rose"], answer: 1, explanation: "'raise' takes an object (hand); 'rise' does not." },
          { question: "The sun ___ at 6 a.m. yesterday.", options: ["raised", "rose", "risen", "raise"], answer: 1, explanation: "rise → rose (V2). The sun rises by itself — no object." },
          { question: "I ___ very confident before the test, but then I ___ off the chair from nerves!", options: ["felt / fell", "fell / felt", "felt / felt", "fell / fell"], answer: 0, explanation: "feel → felt (cảm thấy); fall → fell (ngã)." },
          { question: "The picture has ___ on the wall for ten years.", options: ["hanged", "hung", "hanged up", "hangs"], answer: 1, explanation: "For objects, use hang → hung → hung. 'Hanged' is only for execution." },
          { question: "Who ___ this company in 1998?", options: ["found", "founded", "find", "founds"], answer: 1, explanation: "'found' (to establish) is REGULAR → founded. Don't confuse with 'find → found'." }
        ]
      }
    ]
  }
];
