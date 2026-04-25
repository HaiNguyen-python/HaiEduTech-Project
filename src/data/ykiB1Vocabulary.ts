/**
 * @file ykiB1Vocabulary.ts
 * @description YKI B1 (Keskitaso) thematic vocabulary bank - 6 modules × ~25 words.
 *   Each entry is a B1-level Finnish word usable in YKI Reading/Writing/Speaking.
 * @author Teacher Hai (HaiEduTech)
 */

export interface B1VocabEntry {
  fi: string;
  partOfSpeech: "noun" | "verb" | "adjective" | "adverb" | "phrase";
  meaningEn: string;
  meaningVi: string;
  exampleFi: string;
  exampleEn: string;
  exampleVi: string;
}

export interface B1VocabModule {
  id: string;
  titleFi: string;
  titleEn: string;
  titleVi: string;
  emoji: string;
  description: string;
  descriptionVi: string;
  words: B1VocabEntry[];
}

/* ============================================================
 * 1. SOCIETY & NEWS - báo chí, xã hội
 * ============================================================ */
const society: B1VocabEntry[] = [
  { fi: "yhteiskunta", partOfSpeech: "noun", meaningEn: "society", meaningVi: "xã hội", exampleFi: "Suomalainen yhteiskunta arvostaa tasa-arvoa.", exampleEn: "Finnish society values equality.", exampleVi: "Xã hội Phần Lan coi trọng bình đẳng." },
  { fi: "kansalainen", partOfSpeech: "noun", meaningEn: "citizen", meaningVi: "công dân", exampleFi: "Jokaisen kansalaisen on äänestettävä.", exampleEn: "Every citizen should vote.", exampleVi: "Mỗi công dân nên đi bỏ phiếu." },
  { fi: "vaikuttaa", partOfSpeech: "verb", meaningEn: "to affect / to influence", meaningVi: "ảnh hưởng", exampleFi: "Sää vaikuttaa mielialaan.", exampleEn: "Weather affects mood.", exampleVi: "Thời tiết ảnh hưởng tâm trạng." },
  { fi: "päätös", partOfSpeech: "noun", meaningEn: "decision", meaningVi: "quyết định", exampleFi: "Hallitus teki tärkeän päätöksen.", exampleEn: "The government made an important decision.", exampleVi: "Chính phủ ra quyết định quan trọng." },
  { fi: "tiedotusväline", partOfSpeech: "noun", meaningEn: "media", meaningVi: "truyền thông", exampleFi: "Tiedotusvälineet kertovat uudesta laista.", exampleEn: "The media reports on the new law.", exampleVi: "Truyền thông đưa tin về luật mới." },
  { fi: "uutinen", partOfSpeech: "noun", meaningEn: "news item", meaningVi: "bản tin", exampleFi: "Luen uutiset joka aamu.", exampleEn: "I read the news every morning.", exampleVi: "Tôi đọc tin tức mỗi sáng." },
  { fi: "mielipide", partOfSpeech: "noun", meaningEn: "opinion", meaningVi: "ý kiến", exampleFi: "Hän ilmaisi mielipiteensä rohkeasti.", exampleEn: "She expressed her opinion bravely.", exampleVi: "Cô ấy bày tỏ ý kiến dũng cảm." },
  { fi: "väite", partOfSpeech: "noun", meaningEn: "claim / argument", meaningVi: "luận điểm", exampleFi: "Hänen väitteensä on kiinnostava.", exampleEn: "His claim is interesting.", exampleVi: "Luận điểm của anh ấy thú vị." },
  { fi: "ratkaisu", partOfSpeech: "noun", meaningEn: "solution", meaningVi: "giải pháp", exampleFi: "Etsimme ratkaisua ongelmaan.", exampleEn: "We are looking for a solution.", exampleVi: "Chúng tôi tìm giải pháp." },
  { fi: "vaatia", partOfSpeech: "verb", meaningEn: "to require / demand", meaningVi: "đòi hỏi", exampleFi: "Tämä työ vaatii kärsivällisyyttä.", exampleEn: "This job requires patience.", exampleVi: "Công việc này đòi hỏi kiên nhẫn." },
  { fi: "kannattaa", partOfSpeech: "verb", meaningEn: "to support / be worth", meaningVi: "ủng hộ / đáng", exampleFi: "Kannatan ilmaista koulutusta.", exampleEn: "I support free education.", exampleVi: "Tôi ủng hộ giáo dục miễn phí." },
  { fi: "vastustaa", partOfSpeech: "verb", meaningEn: "to oppose", meaningVi: "phản đối", exampleFi: "Monet vastustavat uutta lakia.", exampleEn: "Many oppose the new law.", exampleVi: "Nhiều người phản đối luật mới." },
  { fi: "puolustaa", partOfSpeech: "verb", meaningEn: "to defend", meaningVi: "bảo vệ", exampleFi: "Hän puolusti oikeuksiaan.", exampleEn: "She defended her rights.", exampleVi: "Cô ấy bảo vệ quyền của mình." },
  { fi: "tasa-arvo", partOfSpeech: "noun", meaningEn: "equality", meaningVi: "bình đẳng", exampleFi: "Sukupuolten tasa-arvo on tärkeä arvo.", exampleEn: "Gender equality is an important value.", exampleVi: "Bình đẳng giới là giá trị quan trọng." },
  { fi: "vapaus", partOfSpeech: "noun", meaningEn: "freedom", meaningVi: "tự do", exampleFi: "Sananvapaus on perusoikeus.", exampleEn: "Freedom of speech is a basic right.", exampleVi: "Tự do ngôn luận là quyền cơ bản." },
  { fi: "kulttuuri", partOfSpeech: "noun", meaningEn: "culture", meaningVi: "văn hóa", exampleFi: "Sauna kuuluu suomalaiseen kulttuuriin.", exampleEn: "Sauna belongs to Finnish culture.", exampleVi: "Sauna thuộc văn hóa Phần Lan." },
  { fi: "perinne", partOfSpeech: "noun", meaningEn: "tradition", meaningVi: "truyền thống", exampleFi: "Joulu on tärkeä perinne.", exampleEn: "Christmas is an important tradition.", exampleVi: "Giáng sinh là truyền thống quan trọng." },
  { fi: "muutos", partOfSpeech: "noun", meaningEn: "change", meaningVi: "sự thay đổi", exampleFi: "Yhteiskunta tarvitsee muutoksia.", exampleEn: "Society needs changes.", exampleVi: "Xã hội cần sự thay đổi." },
  { fi: "vähemmistö", partOfSpeech: "noun", meaningEn: "minority", meaningVi: "thiểu số", exampleFi: "Suomenruotsalaiset ovat vähemmistö.", exampleEn: "Finland-Swedes are a minority.", exampleVi: "Người Thụy Điển-Phần Lan là thiểu số." },
  { fi: "monikulttuurinen", partOfSpeech: "adjective", meaningEn: "multicultural", meaningVi: "đa văn hoá", exampleFi: "Helsinki on monikulttuurinen kaupunki.", exampleEn: "Helsinki is a multicultural city.", exampleVi: "Helsinki là thành phố đa văn hoá." },
  { fi: "verovaroin", partOfSpeech: "adverb", meaningEn: "with tax money", meaningVi: "bằng tiền thuế", exampleFi: "Koulut rahoitetaan verovaroin.", exampleEn: "Schools are funded with tax money.", exampleVi: "Trường học được tài trợ bằng tiền thuế." },
  { fi: "lainsäädäntö", partOfSpeech: "noun", meaningEn: "legislation", meaningVi: "lập pháp", exampleFi: "Suomen lainsäädäntö on tiukkaa.", exampleEn: "Finnish legislation is strict.", exampleVi: "Lập pháp Phần Lan rất nghiêm." },
  { fi: "väestö", partOfSpeech: "noun", meaningEn: "population", meaningVi: "dân số", exampleFi: "Suomen väestö ikääntyy.", exampleEn: "Finland's population is ageing.", exampleVi: "Dân số Phần Lan đang già hoá." },
  { fi: "ikääntyä", partOfSpeech: "verb", meaningEn: "to age / get older", meaningVi: "già đi", exampleFi: "Väestö ikääntyy nopeasti.", exampleEn: "The population is ageing fast.", exampleVi: "Dân số già đi nhanh chóng." },
  { fi: "huomattava", partOfSpeech: "adjective", meaningEn: "considerable / notable", meaningVi: "đáng kể", exampleFi: "Hintojen nousu on huomattava.", exampleEn: "The rise in prices is considerable.", exampleVi: "Giá tăng đáng kể." },
];

/* ============================================================
 * 2. WORK & CAREER - công việc, sự nghiệp
 * ============================================================ */
const work: B1VocabEntry[] = [
  { fi: "ammatti", partOfSpeech: "noun", meaningEn: "profession", meaningVi: "nghề nghiệp", exampleFi: "Ammattini on opettaja.", exampleEn: "My profession is teacher.", exampleVi: "Nghề của tôi là giáo viên." },
  { fi: "työpaikka", partOfSpeech: "noun", meaningEn: "workplace / job", meaningVi: "nơi làm việc", exampleFi: "Etsin uutta työpaikkaa.", exampleEn: "I am looking for a new job.", exampleVi: "Tôi tìm việc mới." },
  { fi: "työnantaja", partOfSpeech: "noun", meaningEn: "employer", meaningVi: "nhà tuyển dụng", exampleFi: "Työnantajani on suuri yritys.", exampleEn: "My employer is a big company.", exampleVi: "Sếp tôi là công ty lớn." },
  { fi: "työntekijä", partOfSpeech: "noun", meaningEn: "employee", meaningVi: "nhân viên", exampleFi: "Yrityksessä on 200 työntekijää.", exampleEn: "The company has 200 employees.", exampleVi: "Công ty có 200 nhân viên." },
  { fi: "esimies", partOfSpeech: "noun", meaningEn: "supervisor / boss", meaningVi: "cấp trên", exampleFi: "Esimieheni on todella mukava.", exampleEn: "My boss is really nice.", exampleVi: "Sếp tôi rất dễ chịu." },
  { fi: "kollega", partOfSpeech: "noun", meaningEn: "colleague", meaningVi: "đồng nghiệp", exampleFi: "Pidän kollegoistani.", exampleEn: "I like my colleagues.", exampleVi: "Tôi quý đồng nghiệp." },
  { fi: "palkka", partOfSpeech: "noun", meaningEn: "salary", meaningVi: "lương", exampleFi: "Palkka maksetaan kuukausittain.", exampleEn: "The salary is paid monthly.", exampleVi: "Lương trả hàng tháng." },
  { fi: "työsopimus", partOfSpeech: "noun", meaningEn: "employment contract", meaningVi: "hợp đồng lao động", exampleFi: "Allekirjoitin työsopimuksen eilen.", exampleEn: "I signed the contract yesterday.", exampleVi: "Hôm qua tôi ký hợp đồng." },
  { fi: "haastattelu", partOfSpeech: "noun", meaningEn: "interview", meaningVi: "phỏng vấn", exampleFi: "Minulla on huomenna haastattelu.", exampleEn: "I have an interview tomorrow.", exampleVi: "Mai tôi có buổi phỏng vấn." },
  { fi: "ansioluettelo", partOfSpeech: "noun", meaningEn: "CV / resume", meaningVi: "sơ yếu lý lịch", exampleFi: "Lähetin ansioluettelon yritykselle.", exampleEn: "I sent the CV to the company.", exampleVi: "Tôi gửi CV cho công ty." },
  { fi: "kokemus", partOfSpeech: "noun", meaningEn: "experience", meaningVi: "kinh nghiệm", exampleFi: "Minulla on viiden vuoden kokemus.", exampleEn: "I have five years of experience.", exampleVi: "Tôi có 5 năm kinh nghiệm." },
  { fi: "taito", partOfSpeech: "noun", meaningEn: "skill", meaningVi: "kỹ năng", exampleFi: "Kielitaito on tärkeä taito.", exampleEn: "Language skill is important.", exampleVi: "Kỹ năng ngôn ngữ rất quan trọng." },
  { fi: "vastuu", partOfSpeech: "noun", meaningEn: "responsibility", meaningVi: "trách nhiệm", exampleFi: "Otan vastuun projektista.", exampleEn: "I take responsibility for the project.", exampleVi: "Tôi nhận trách nhiệm dự án." },
  { fi: "tehtävä", partOfSpeech: "noun", meaningEn: "task", meaningVi: "nhiệm vụ", exampleFi: "Ensimmäinen tehtäväni on raportti.", exampleEn: "My first task is the report.", exampleVi: "Nhiệm vụ đầu tiên là báo cáo." },
  { fi: "työaika", partOfSpeech: "noun", meaningEn: "working hours", meaningVi: "giờ làm việc", exampleFi: "Työaikani on klo 9–17.", exampleEn: "My working hours are 9–17.", exampleVi: "Giờ làm của tôi 9-17." },
  { fi: "loma", partOfSpeech: "noun", meaningEn: "vacation", meaningVi: "kỳ nghỉ", exampleFi: "Pidän loman heinäkuussa.", exampleEn: "I take vacation in July.", exampleVi: "Tôi nghỉ phép tháng 7." },
  { fi: "ylityö", partOfSpeech: "noun", meaningEn: "overtime", meaningVi: "tăng ca", exampleFi: "Tein ylitöitä koko viikon.", exampleEn: "I worked overtime all week.", exampleVi: "Tôi tăng ca cả tuần." },
  { fi: "irtisanoutua", partOfSpeech: "verb", meaningEn: "to resign", meaningVi: "xin nghỉ việc", exampleFi: "Hän irtisanoutui viime kuussa.", exampleEn: "He resigned last month.", exampleVi: "Anh ấy nghỉ tháng trước." },
  { fi: "rekrytoida", partOfSpeech: "verb", meaningEn: "to recruit", meaningVi: "tuyển dụng", exampleFi: "Yritys rekrytoi uusia työntekijöitä.", exampleEn: "The company is recruiting employees.", exampleVi: "Công ty tuyển nhân viên." },
  { fi: "edetä", partOfSpeech: "verb", meaningEn: "to advance / progress", meaningVi: "thăng tiến", exampleFi: "Haluan edetä urallani.", exampleEn: "I want to advance in my career.", exampleVi: "Tôi muốn thăng tiến." },
  { fi: "menestyä", partOfSpeech: "verb", meaningEn: "to succeed", meaningVi: "thành công", exampleFi: "Hän menestyy työssään.", exampleEn: "She succeeds in her job.", exampleVi: "Cô ấy thành công trong công việc." },
  { fi: "joustava", partOfSpeech: "adjective", meaningEn: "flexible", meaningVi: "linh hoạt", exampleFi: "Työaikani on joustava.", exampleEn: "My hours are flexible.", exampleVi: "Giờ làm linh hoạt." },
  { fi: "etätyö", partOfSpeech: "noun", meaningEn: "remote work", meaningVi: "làm từ xa", exampleFi: "Teen etätyötä kaksi päivää viikossa.", exampleEn: "I work remotely two days a week.", exampleVi: "Tôi làm từ xa 2 ngày/tuần." },
  { fi: "työtoveri", partOfSpeech: "noun", meaningEn: "co-worker", meaningVi: "đồng nghiệp", exampleFi: "Työtoverini auttoivat minua.", exampleEn: "My co-workers helped me.", exampleVi: "Đồng nghiệp giúp tôi." },
  { fi: "ammattitaito", partOfSpeech: "noun", meaningEn: "professional skill", meaningVi: "tay nghề", exampleFi: "Hänen ammattitaitonsa on huippua.", exampleEn: "Her professional skill is top-notch.", exampleVi: "Tay nghề của cô ấy đỉnh." },
];

/* ============================================================
 * 3. ENVIRONMENT & SUSTAINABILITY - môi trường, bền vững
 * ============================================================ */
const environment: B1VocabEntry[] = [
  { fi: "ympäristö", partOfSpeech: "noun", meaningEn: "environment", meaningVi: "môi trường", exampleFi: "Meidän pitää suojella ympäristöä.", exampleEn: "We must protect the environment.", exampleVi: "Chúng ta phải bảo vệ môi trường." },
  { fi: "ilmastonmuutos", partOfSpeech: "noun", meaningEn: "climate change", meaningVi: "biến đổi khí hậu", exampleFi: "Ilmastonmuutos on vakava ongelma.", exampleEn: "Climate change is a serious problem.", exampleVi: "Biến đổi khí hậu nghiêm trọng." },
  { fi: "luonto", partOfSpeech: "noun", meaningEn: "nature", meaningVi: "thiên nhiên", exampleFi: "Suomen luonto on kaunis.", exampleEn: "Finnish nature is beautiful.", exampleVi: "Thiên nhiên Phần Lan đẹp." },
  { fi: "metsä", partOfSpeech: "noun", meaningEn: "forest", meaningVi: "rừng", exampleFi: "Käymme metsässä joka viikonloppu.", exampleEn: "We go to the forest every weekend.", exampleVi: "Cuối tuần đi rừng." },
  { fi: "saaste", partOfSpeech: "noun", meaningEn: "pollution", meaningVi: "ô nhiễm", exampleFi: "Suurkaupungeissa on paljon saastetta.", exampleEn: "Big cities have a lot of pollution.", exampleVi: "Thành phố lớn ô nhiễm." },
  { fi: "kierrättää", partOfSpeech: "verb", meaningEn: "to recycle", meaningVi: "tái chế", exampleFi: "Kierrätän muovin ja paperin.", exampleEn: "I recycle plastic and paper.", exampleVi: "Tôi tái chế nhựa và giấy." },
  { fi: "kierrätys", partOfSpeech: "noun", meaningEn: "recycling", meaningVi: "tái chế", exampleFi: "Kierrätys on jokaisen vastuu.", exampleEn: "Recycling is everyone's responsibility.", exampleVi: "Tái chế là trách nhiệm của mỗi người." },
  { fi: "jäte", partOfSpeech: "noun", meaningEn: "waste", meaningVi: "rác", exampleFi: "Lajittele jätteet oikein.", exampleEn: "Sort waste correctly.", exampleVi: "Phân loại rác đúng cách." },
  { fi: "muovi", partOfSpeech: "noun", meaningEn: "plastic", meaningVi: "nhựa", exampleFi: "Muovipussit ovat ympäristölle haitallisia.", exampleEn: "Plastic bags harm the environment.", exampleVi: "Túi nhựa hại môi trường." },
  { fi: "energia", partOfSpeech: "noun", meaningEn: "energy", meaningVi: "năng lượng", exampleFi: "Säästän energiaa kotona.", exampleEn: "I save energy at home.", exampleVi: "Tôi tiết kiệm năng lượng." },
  { fi: "uusiutuva", partOfSpeech: "adjective", meaningEn: "renewable", meaningVi: "tái tạo", exampleFi: "Tuulivoima on uusiutuvaa energiaa.", exampleEn: "Wind power is renewable energy.", exampleVi: "Điện gió là năng lượng tái tạo." },
  { fi: "kestävä", partOfSpeech: "adjective", meaningEn: "sustainable", meaningVi: "bền vững", exampleFi: "Kestävä kehitys on tärkeää.", exampleEn: "Sustainable development is important.", exampleVi: "Phát triển bền vững quan trọng." },
  { fi: "suojella", partOfSpeech: "verb", meaningEn: "to protect", meaningVi: "bảo vệ", exampleFi: "Suojelemme uhanalaisia eläimiä.", exampleEn: "We protect endangered animals.", exampleVi: "Bảo vệ động vật quý hiếm." },
  { fi: "uhka", partOfSpeech: "noun", meaningEn: "threat", meaningVi: "mối đe dọa", exampleFi: "Saaste on uhka terveydelle.", exampleEn: "Pollution is a threat to health.", exampleVi: "Ô nhiễm đe dọa sức khoẻ." },
  { fi: "vähentää", partOfSpeech: "verb", meaningEn: "to reduce", meaningVi: "giảm", exampleFi: "Pitää vähentää lihan kulutusta.", exampleEn: "We need to reduce meat consumption.", exampleVi: "Cần giảm tiêu thụ thịt." },
  { fi: "lisätä", partOfSpeech: "verb", meaningEn: "to increase", meaningVi: "tăng", exampleFi: "Pitää lisätä polkupyöräilyä.", exampleEn: "We need to increase cycling.", exampleVi: "Cần tăng đi xe đạp." },
  { fi: "ilmasto", partOfSpeech: "noun", meaningEn: "climate", meaningVi: "khí hậu", exampleFi: "Suomen ilmasto on kylmä.", exampleEn: "Finland's climate is cold.", exampleVi: "Khí hậu Phần Lan lạnh." },
  { fi: "lämpötila", partOfSpeech: "noun", meaningEn: "temperature", meaningVi: "nhiệt độ", exampleFi: "Lämpötila on -20 astetta.", exampleEn: "The temperature is -20 degrees.", exampleVi: "Nhiệt độ -20 độ." },
  { fi: "puhdas", partOfSpeech: "adjective", meaningEn: "clean", meaningVi: "sạch", exampleFi: "Suomen vesi on puhdasta.", exampleEn: "Finland's water is clean.", exampleVi: "Nước Phần Lan rất sạch." },
  { fi: "luomuruoka", partOfSpeech: "noun", meaningEn: "organic food", meaningVi: "thực phẩm hữu cơ", exampleFi: "Ostan luomuruokaa kaupasta.", exampleEn: "I buy organic food from the store.", exampleVi: "Tôi mua thực phẩm hữu cơ." },
  { fi: "luonnonvarat", partOfSpeech: "noun", meaningEn: "natural resources", meaningVi: "tài nguyên thiên nhiên", exampleFi: "Luonnonvaroja pitää käyttää säästäen.", exampleEn: "Natural resources must be used sparingly.", exampleVi: "Phải dùng tài nguyên tiết kiệm." },
  { fi: "tulva", partOfSpeech: "noun", meaningEn: "flood", meaningVi: "lũ lụt", exampleFi: "Tulva tuhosi monta taloa.", exampleEn: "The flood destroyed many houses.", exampleVi: "Lũ phá nhiều nhà." },
  { fi: "kuivuus", partOfSpeech: "noun", meaningEn: "drought", meaningVi: "hạn hán", exampleFi: "Kuivuus haittaa maataloutta.", exampleEn: "Drought harms agriculture.", exampleVi: "Hạn hán hại nông nghiệp." },
  { fi: "tehokas", partOfSpeech: "adjective", meaningEn: "efficient", meaningVi: "hiệu quả", exampleFi: "Tämä uuni on tehokas.", exampleEn: "This oven is efficient.", exampleVi: "Lò này tiết kiệm điện." },
  { fi: "haitallinen", partOfSpeech: "adjective", meaningEn: "harmful", meaningVi: "có hại", exampleFi: "Tupakointi on haitallista terveydelle.", exampleEn: "Smoking is harmful to health.", exampleVi: "Hút thuốc hại sức khoẻ." },
];

/* ============================================================
 * 4. TECHNOLOGY & DIGITAL LIFE - công nghệ, số hoá
 * ============================================================ */
const technology: B1VocabEntry[] = [
  { fi: "tekniikka", partOfSpeech: "noun", meaningEn: "technology", meaningVi: "công nghệ", exampleFi: "Tekniikka kehittyy nopeasti.", exampleEn: "Technology develops fast.", exampleVi: "Công nghệ phát triển nhanh." },
  { fi: "laite", partOfSpeech: "noun", meaningEn: "device", meaningVi: "thiết bị", exampleFi: "Tämä laite on uusi.", exampleEn: "This device is new.", exampleVi: "Thiết bị này mới." },
  { fi: "tietokone", partOfSpeech: "noun", meaningEn: "computer", meaningVi: "máy tính", exampleFi: "Käytän tietokonetta töissä.", exampleEn: "I use a computer at work.", exampleVi: "Tôi dùng máy tính làm việc." },
  { fi: "kännykkä", partOfSpeech: "noun", meaningEn: "mobile phone (colloq.)", meaningVi: "điện thoại di động", exampleFi: "Kännykkäni on rikki.", exampleEn: "My phone is broken.", exampleVi: "Điện thoại tôi hỏng." },
  { fi: "sovellus", partOfSpeech: "noun", meaningEn: "app / application", meaningVi: "ứng dụng", exampleFi: "Latasin uuden sovelluksen.", exampleEn: "I downloaded a new app.", exampleVi: "Tôi tải app mới." },
  { fi: "sähköposti", partOfSpeech: "noun", meaningEn: "email", meaningVi: "email", exampleFi: "Lähetin sähköpostin pomolle.", exampleEn: "I sent an email to the boss.", exampleVi: "Tôi gửi email cho sếp." },
  { fi: "internet / netti", partOfSpeech: "noun", meaningEn: "internet", meaningVi: "internet", exampleFi: "Etsin tietoa netistä.", exampleEn: "I search for information online.", exampleVi: "Tôi tìm tin trên mạng." },
  { fi: "verkkosivu", partOfSpeech: "noun", meaningEn: "website", meaningVi: "trang web", exampleFi: "Tarkista verkkosivu lisätiedoista.", exampleEn: "Check the website for more info.", exampleVi: "Xem website để biết thêm." },
  { fi: "sosiaalinen media", partOfSpeech: "phrase", meaningEn: "social media", meaningVi: "mạng xã hội", exampleFi: "Käytän sosiaalista mediaa päivittäin.", exampleEn: "I use social media daily.", exampleVi: "Tôi dùng mạng xã hội hàng ngày." },
  { fi: "ladata", partOfSpeech: "verb", meaningEn: "to download / charge", meaningVi: "tải về / sạc", exampleFi: "Lataan akkua yöllä.", exampleEn: "I charge the battery at night.", exampleVi: "Tôi sạc pin buổi tối." },
  { fi: "asentaa", partOfSpeech: "verb", meaningEn: "to install", meaningVi: "cài đặt", exampleFi: "Asensin uuden ohjelman.", exampleEn: "I installed a new program.", exampleVi: "Tôi cài chương trình mới." },
  { fi: "käyttäjä", partOfSpeech: "noun", meaningEn: "user", meaningVi: "người dùng", exampleFi: "Sovelluksella on miljoona käyttäjää.", exampleEn: "The app has a million users.", exampleVi: "App có triệu người dùng." },
  { fi: "salasana", partOfSpeech: "noun", meaningEn: "password", meaningVi: "mật khẩu", exampleFi: "Unohdin salasanani.", exampleEn: "I forgot my password.", exampleVi: "Tôi quên mật khẩu." },
  { fi: "tietoturva", partOfSpeech: "noun", meaningEn: "cybersecurity", meaningVi: "an ninh mạng", exampleFi: "Tietoturva on nykyään tärkeä.", exampleEn: "Cybersecurity is important today.", exampleVi: "An ninh mạng quan trọng." },
  { fi: "tekoäly", partOfSpeech: "noun", meaningEn: "artificial intelligence", meaningVi: "trí tuệ nhân tạo", exampleFi: "Tekoäly auttaa työssä.", exampleEn: "AI helps at work.", exampleVi: "AI hỗ trợ công việc." },
  { fi: "digitalisaatio", partOfSpeech: "noun", meaningEn: "digitalization", meaningVi: "số hoá", exampleFi: "Digitalisaatio muuttaa palvelut.", exampleEn: "Digitalization changes services.", exampleVi: "Số hoá thay đổi dịch vụ." },
  { fi: "verkkopankki", partOfSpeech: "noun", meaningEn: "online banking", meaningVi: "ngân hàng trực tuyến", exampleFi: "Maksan laskut verkkopankissa.", exampleEn: "I pay bills via online banking.", exampleVi: "Tôi trả hoá đơn qua ngân hàng online." },
  { fi: "etäkokous", partOfSpeech: "noun", meaningEn: "remote meeting", meaningVi: "họp trực tuyến", exampleFi: "Meillä on etäkokous huomenna.", exampleEn: "We have a remote meeting tomorrow.", exampleVi: "Mai họp online." },
  { fi: "video", partOfSpeech: "noun", meaningEn: "video", meaningVi: "video", exampleFi: "Katson opetusvideoita YouTubesta.", exampleEn: "I watch tutorials on YouTube.", exampleVi: "Xem video hướng dẫn trên YouTube." },
  { fi: "tilata", partOfSpeech: "verb", meaningEn: "to subscribe / order", meaningVi: "đặt / đăng ký", exampleFi: "Tilasin lehden vuodeksi.", exampleEn: "I subscribed to the magazine for a year.", exampleVi: "Tôi đặt báo cả năm." },
  { fi: "yhteys", partOfSpeech: "noun", meaningEn: "connection", meaningVi: "kết nối", exampleFi: "Internet-yhteys ei toimi.", exampleEn: "The internet connection isn't working.", exampleVi: "Mạng không hoạt động." },
  { fi: "päivittää", partOfSpeech: "verb", meaningEn: "to update", meaningVi: "cập nhật", exampleFi: "Päivitin puhelimen tänään.", exampleEn: "I updated the phone today.", exampleVi: "Hôm nay tôi cập nhật điện thoại." },
  { fi: "tunnistautua", partOfSpeech: "verb", meaningEn: "to identify oneself", meaningVi: "xác thực", exampleFi: "Tunnistaudu pankkitunnuksilla.", exampleEn: "Identify yourself with bank credentials.", exampleVi: "Xác thực bằng tài khoản ngân hàng." },
  { fi: "viihde", partOfSpeech: "noun", meaningEn: "entertainment", meaningVi: "giải trí", exampleFi: "Suoratoistopalvelut tarjoavat viihdettä.", exampleEn: "Streaming services offer entertainment.", exampleVi: "Dịch vụ stream cung cấp giải trí." },
  { fi: "datayhteys", partOfSpeech: "noun", meaningEn: "data connection", meaningVi: "kết nối dữ liệu", exampleFi: "Datayhteyteni on hidas.", exampleEn: "My data connection is slow.", exampleVi: "Mạng dữ liệu chậm." },
];

/* ============================================================
 * 5. EDUCATION & PERSONAL DEVELOPMENT
 * ============================================================ */
const education: B1VocabEntry[] = [
  { fi: "koulutus", partOfSpeech: "noun", meaningEn: "education", meaningVi: "giáo dục", exampleFi: "Suomen koulutus on ilmainen.", exampleEn: "Finnish education is free.", exampleVi: "Giáo dục Phần Lan miễn phí." },
  { fi: "opiskelu", partOfSpeech: "noun", meaningEn: "studying", meaningVi: "việc học", exampleFi: "Opiskelu vaatii aikaa.", exampleEn: "Studying requires time.", exampleVi: "Học đòi hỏi thời gian." },
  { fi: "tutkinto", partOfSpeech: "noun", meaningEn: "degree", meaningVi: "bằng cấp", exampleFi: "Suoritin maisterin tutkinnon.", exampleEn: "I completed a master's degree.", exampleVi: "Tôi tốt nghiệp thạc sĩ." },
  { fi: "korkeakoulu", partOfSpeech: "noun", meaningEn: "higher education institution", meaningVi: "cao đẳng/đại học", exampleFi: "Hain korkeakouluun keväällä.", exampleEn: "I applied to higher education in spring.", exampleVi: "Mùa xuân tôi đăng ký đại học." },
  { fi: "yliopisto", partOfSpeech: "noun", meaningEn: "university", meaningVi: "đại học", exampleFi: "Hän opiskelee yliopistossa.", exampleEn: "He studies at university.", exampleVi: "Anh ấy học đại học." },
  { fi: "luento", partOfSpeech: "noun", meaningEn: "lecture", meaningVi: "bài giảng", exampleFi: "Menen luennolle kello kymmeneltä.", exampleEn: "I go to a lecture at ten.", exampleVi: "10 giờ tôi đi nghe giảng." },
  { fi: "kurssi", partOfSpeech: "noun", meaningEn: "course", meaningVi: "khoá học", exampleFi: "Aloitan uuden kurssin.", exampleEn: "I start a new course.", exampleVi: "Tôi bắt đầu khoá mới." },
  { fi: "tentti", partOfSpeech: "noun", meaningEn: "exam", meaningVi: "kỳ thi", exampleFi: "Tentti on ensi viikolla.", exampleEn: "The exam is next week.", exampleVi: "Tuần sau thi." },
  { fi: "tutkielma", partOfSpeech: "noun", meaningEn: "thesis", meaningVi: "luận văn", exampleFi: "Kirjoitin tutkielmaa puoli vuotta.", exampleEn: "I wrote the thesis for six months.", exampleVi: "Tôi viết luận 6 tháng." },
  { fi: "oppimateriaali", partOfSpeech: "noun", meaningEn: "study material", meaningVi: "tài liệu học", exampleFi: "Oppimateriaali on netissä.", exampleEn: "Study materials are online.", exampleVi: "Tài liệu trên mạng." },
  { fi: "oppia", partOfSpeech: "verb", meaningEn: "to learn", meaningVi: "học", exampleFi: "Opin uutta joka päivä.", exampleEn: "I learn something new every day.", exampleVi: "Mỗi ngày học điều mới." },
  { fi: "opettaa", partOfSpeech: "verb", meaningEn: "to teach", meaningVi: "dạy", exampleFi: "Opetan suomea ulkomaalaisille.", exampleEn: "I teach Finnish to foreigners.", exampleVi: "Tôi dạy tiếng Phần Lan." },
  { fi: "arvosana", partOfSpeech: "noun", meaningEn: "grade", meaningVi: "điểm số", exampleFi: "Sain hyvän arvosanan.", exampleEn: "I got a good grade.", exampleVi: "Tôi được điểm cao." },
  { fi: "valmistua", partOfSpeech: "verb", meaningEn: "to graduate", meaningVi: "tốt nghiệp", exampleFi: "Valmistun ensi kesänä.", exampleEn: "I graduate next summer.", exampleVi: "Hè sau tôi tốt nghiệp." },
  { fi: "stipendi", partOfSpeech: "noun", meaningEn: "scholarship", meaningVi: "học bổng", exampleFi: "Sain stipendin Suomeen.", exampleEn: "I got a scholarship to Finland.", exampleVi: "Tôi được học bổng Phần Lan." },
  { fi: "harjoittelu", partOfSpeech: "noun", meaningEn: "internship / practice", meaningVi: "thực tập", exampleFi: "Harjoittelu kestää kolme kuukautta.", exampleEn: "The internship lasts three months.", exampleVi: "Thực tập 3 tháng." },
  { fi: "kehittyä", partOfSpeech: "verb", meaningEn: "to develop", meaningVi: "phát triển", exampleFi: "Kielitaitoni kehittyy nopeasti.", exampleEn: "My language skills develop fast.", exampleVi: "Tiếng của tôi tiến nhanh." },
  { fi: "tavoite", partOfSpeech: "noun", meaningEn: "goal", meaningVi: "mục tiêu", exampleFi: "Tavoitteeni on läpäistä YKI.", exampleEn: "My goal is to pass YKI.", exampleVi: "Mục tiêu là đậu YKI." },
  { fi: "motivaatio", partOfSpeech: "noun", meaningEn: "motivation", meaningVi: "động lực", exampleFi: "Tarvitsen lisää motivaatiota.", exampleEn: "I need more motivation.", exampleVi: "Tôi cần thêm động lực." },
  { fi: "kärsivällisyys", partOfSpeech: "noun", meaningEn: "patience", meaningVi: "kiên nhẫn", exampleFi: "Oppiminen vaatii kärsivällisyyttä.", exampleEn: "Learning requires patience.", exampleVi: "Học cần kiên nhẫn." },
  { fi: "uteliaisuus", partOfSpeech: "noun", meaningEn: "curiosity", meaningVi: "tò mò", exampleFi: "Uteliaisuus on hyvä asia.", exampleEn: "Curiosity is a good thing.", exampleVi: "Tò mò là điều tốt." },
  { fi: "luokka", partOfSpeech: "noun", meaningEn: "classroom / class", meaningVi: "lớp học", exampleFi: "Luokassa on 20 oppilasta.", exampleEn: "There are 20 students in the class.", exampleVi: "Lớp có 20 học sinh." },
  { fi: "kotitehtävä", partOfSpeech: "noun", meaningEn: "homework", meaningVi: "bài tập về nhà", exampleFi: "Tein kotitehtäväni eilen illalla.", exampleEn: "I did my homework last night.", exampleVi: "Tối qua tôi làm bài tập." },
  { fi: "esitys", partOfSpeech: "noun", meaningEn: "presentation", meaningVi: "thuyết trình", exampleFi: "Pidän esityksen huomenna.", exampleEn: "I give a presentation tomorrow.", exampleVi: "Mai tôi thuyết trình." },
  { fi: "palaute", partOfSpeech: "noun", meaningEn: "feedback", meaningVi: "phản hồi", exampleFi: "Sain hyvää palautetta opettajalta.", exampleEn: "I got good feedback from the teacher.", exampleVi: "Tôi nhận phản hồi tốt." },
];

/* ============================================================
 * 6. HEALTH & WELLBEING - sức khoẻ
 * ============================================================ */
const health: B1VocabEntry[] = [
  { fi: "terveys", partOfSpeech: "noun", meaningEn: "health", meaningVi: "sức khoẻ", exampleFi: "Terveys on tärkein asia.", exampleEn: "Health is the most important thing.", exampleVi: "Sức khoẻ là quan trọng nhất." },
  { fi: "hyvinvointi", partOfSpeech: "noun", meaningEn: "wellbeing", meaningVi: "an sinh", exampleFi: "Hyvinvointi vaikuttaa työhön.", exampleEn: "Wellbeing affects work.", exampleVi: "An sinh ảnh hưởng công việc." },
  { fi: "sairaus", partOfSpeech: "noun", meaningEn: "illness", meaningVi: "bệnh", exampleFi: "Hänellä on vakava sairaus.", exampleEn: "He has a serious illness.", exampleVi: "Anh ấy bệnh nặng." },
  { fi: "oire", partOfSpeech: "noun", meaningEn: "symptom", meaningVi: "triệu chứng", exampleFi: "Päänsärky on yleinen oire.", exampleEn: "Headache is a common symptom.", exampleVi: "Đau đầu là triệu chứng phổ biến." },
  { fi: "lääkäri", partOfSpeech: "noun", meaningEn: "doctor", meaningVi: "bác sĩ", exampleFi: "Varasin ajan lääkärille.", exampleEn: "I booked an appointment with a doctor.", exampleVi: "Tôi đặt lịch khám." },
  { fi: "sairaala", partOfSpeech: "noun", meaningEn: "hospital", meaningVi: "bệnh viện", exampleFi: "Hänet vietiin sairaalaan.", exampleEn: "He was taken to hospital.", exampleVi: "Anh ấy được đưa đi viện." },
  { fi: "lääke", partOfSpeech: "noun", meaningEn: "medicine", meaningVi: "thuốc", exampleFi: "Otan lääkettä päivittäin.", exampleEn: "I take medicine daily.", exampleVi: "Tôi uống thuốc hàng ngày." },
  { fi: "resepti", partOfSpeech: "noun", meaningEn: "prescription", meaningVi: "đơn thuốc", exampleFi: "Tarvitsen reseptin.", exampleEn: "I need a prescription.", exampleVi: "Tôi cần đơn thuốc." },
  { fi: "vakuutus", partOfSpeech: "noun", meaningEn: "insurance", meaningVi: "bảo hiểm", exampleFi: "Minulla on terveysvakuutus.", exampleEn: "I have health insurance.", exampleVi: "Tôi có bảo hiểm y tế." },
  { fi: "liikunta", partOfSpeech: "noun", meaningEn: "exercise", meaningVi: "vận động", exampleFi: "Liikunta on tärkeää.", exampleEn: "Exercise is important.", exampleVi: "Vận động quan trọng." },
  { fi: "harrastus", partOfSpeech: "noun", meaningEn: "hobby", meaningVi: "sở thích", exampleFi: "Suosikkiharrastukseni on uinti.", exampleEn: "My favorite hobby is swimming.", exampleVi: "Sở thích của tôi là bơi." },
  { fi: "uni", partOfSpeech: "noun", meaningEn: "sleep", meaningVi: "giấc ngủ", exampleFi: "Tarvitsen kahdeksan tuntia unta.", exampleEn: "I need eight hours of sleep.", exampleVi: "Tôi cần ngủ 8 tiếng." },
  { fi: "ravinto", partOfSpeech: "noun", meaningEn: "nutrition", meaningVi: "dinh dưỡng", exampleFi: "Hyvä ravinto pitää terveenä.", exampleEn: "Good nutrition keeps you healthy.", exampleVi: "Dinh dưỡng tốt giữ sức khoẻ." },
  { fi: "stressi", partOfSpeech: "noun", meaningEn: "stress", meaningVi: "căng thẳng", exampleFi: "Yritän vähentää stressiä.", exampleEn: "I try to reduce stress.", exampleVi: "Tôi cố giảm stress." },
  { fi: "rentoutua", partOfSpeech: "verb", meaningEn: "to relax", meaningVi: "thư giãn", exampleFi: "Rentoudun saunassa.", exampleEn: "I relax in the sauna.", exampleVi: "Tôi thư giãn trong sauna." },
  { fi: "parantua", partOfSpeech: "verb", meaningEn: "to recover", meaningVi: "hồi phục", exampleFi: "Hän parantui nopeasti.", exampleEn: "He recovered quickly.", exampleVi: "Anh ấy hồi phục nhanh." },
  { fi: "rokote", partOfSpeech: "noun", meaningEn: "vaccine", meaningVi: "vắc-xin", exampleFi: "Sain rokotteen viime viikolla.", exampleEn: "I got the vaccine last week.", exampleVi: "Tuần trước tôi tiêm vắc-xin." },
  { fi: "allerginen", partOfSpeech: "adjective", meaningEn: "allergic", meaningVi: "dị ứng", exampleFi: "Olen allerginen pähkinöille.", exampleEn: "I am allergic to nuts.", exampleVi: "Tôi dị ứng đậu." },
  { fi: "väsymys", partOfSpeech: "noun", meaningEn: "fatigue", meaningVi: "mệt mỏi", exampleFi: "Kärsin väsymyksestä.", exampleEn: "I suffer from fatigue.", exampleVi: "Tôi bị mệt mỏi." },
  { fi: "mielenterveys", partOfSpeech: "noun", meaningEn: "mental health", meaningVi: "sức khoẻ tâm thần", exampleFi: "Mielenterveys on yhtä tärkeää kuin fyysinen terveys.", exampleEn: "Mental health is as important as physical health.", exampleVi: "Sức khoẻ tinh thần quan trọng như thể chất." },
  { fi: "ravintola-annos", partOfSpeech: "noun", meaningEn: "restaurant portion", meaningVi: "phần ăn nhà hàng", exampleFi: "Annos oli liian iso.", exampleEn: "The portion was too big.", exampleVi: "Phần ăn quá to." },
  { fi: "kasvisruoka", partOfSpeech: "noun", meaningEn: "vegetarian food", meaningVi: "đồ chay", exampleFi: "Syön mielelläni kasvisruokaa.", exampleEn: "I gladly eat vegetarian food.", exampleVi: "Tôi thích ăn chay." },
  { fi: "tupakoida", partOfSpeech: "verb", meaningEn: "to smoke", meaningVi: "hút thuốc", exampleFi: "En tupakoi koskaan.", exampleEn: "I never smoke.", exampleVi: "Tôi không hút thuốc." },
  { fi: "alkoholi", partOfSpeech: "noun", meaningEn: "alcohol", meaningVi: "rượu", exampleFi: "Alkoholi on haitallista.", exampleEn: "Alcohol is harmful.", exampleVi: "Rượu có hại." },
  { fi: "lepo", partOfSpeech: "noun", meaningEn: "rest", meaningVi: "nghỉ ngơi", exampleFi: "Tarvitsen lepoa työn jälkeen.", exampleEn: "I need rest after work.", exampleVi: "Sau làm việc cần nghỉ ngơi." },
];

/* ============================================================
 * EXPORT - 6 modules · ~150 words
 * ============================================================ */
export const B1_VOCAB_MODULES: B1VocabModule[] = [
  {
    id: "b1-vocab-society",
    titleFi: "Yhteiskunta ja media",
    titleEn: "Society & Media",
    titleVi: "Xã hội & Truyền thông",
    emoji: "🏛️",
    description: "Vocabulary for news, opinion writing, and civic life.",
    descriptionVi: "Từ vựng cho tin tức, viết bài quan điểm và đời sống công dân.",
    words: society,
  },
  {
    id: "b1-vocab-work",
    titleFi: "Työ ja ura",
    titleEn: "Work & Career",
    titleVi: "Công việc & Sự nghiệp",
    emoji: "💼",
    description: "Job applications, interviews, contracts, workplace relations.",
    descriptionVi: "Xin việc, phỏng vấn, hợp đồng, quan hệ nơi làm việc.",
    words: work,
  },
  {
    id: "b1-vocab-environment",
    titleFi: "Ympäristö ja ilmasto",
    titleEn: "Environment & Climate",
    titleVi: "Môi trường & Khí hậu",
    emoji: "🌿",
    description: "Climate change, recycling, sustainability - frequent YKI Reading topics.",
    descriptionVi: "Biến đổi khí hậu, tái chế, bền vững - chủ đề thường gặp.",
    words: environment,
  },
  {
    id: "b1-vocab-technology",
    titleFi: "Teknologia ja digi",
    titleEn: "Technology & Digital Life",
    titleVi: "Công nghệ & Số hoá",
    emoji: "💻",
    description: "Apps, online services, digital identity in Finland.",
    descriptionVi: "Ứng dụng, dịch vụ online, định danh số tại Phần Lan.",
    words: technology,
  },
  {
    id: "b1-vocab-education",
    titleFi: "Koulutus ja kehitys",
    titleEn: "Education & Self-development",
    titleVi: "Giáo dục & Phát triển bản thân",
    emoji: "🎓",
    description: "Studying, university, goals, motivation.",
    descriptionVi: "Học tập, đại học, mục tiêu, động lực.",
    words: education,
  },
  {
    id: "b1-vocab-health",
    titleFi: "Terveys ja hyvinvointi",
    titleEn: "Health & Wellbeing",
    titleVi: "Sức khoẻ & An sinh",
    emoji: "❤️",
    description: "Doctor visits, medication, healthy habits, mental health.",
    descriptionVi: "Khám bác sĩ, thuốc, lối sống lành mạnh, sức khoẻ tinh thần.",
    words: health,
  },
];

/** Flat list of all B1 vocab words (for global search / counters). */
export const B1_VOCAB_ALL: B1VocabEntry[] = B1_VOCAB_MODULES.flatMap(m => m.words);
