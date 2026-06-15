/**
 * @file ykiB1VocabularyExpansion4.ts
 * @description B1 vocabulary expansion #4 - environment, media, work life, daily Finnish habits.
 *              ~80 entries across 4 modules to enrich the YKI B1 Dashboard.
 * @author Teacher Hai (HaiEduTech)
 */

import type { B1VocabEntry, B1VocabModule } from "./ykiB1Vocabulary";

const environment: B1VocabEntry[] = [
  { fi: "ympäristö", partOfSpeech: "noun", meaningEn: "environment", meaningVi: "môi trường", exampleFi: "Ympäristön suojelu on tärkeää.", exampleEn: "Protecting the environment is important.", exampleVi: "Bảo vệ môi trường rất quan trọng." },
  { fi: "ilmastonmuutos", partOfSpeech: "noun", meaningEn: "climate change", meaningVi: "biến đổi khí hậu", exampleFi: "Ilmastonmuutos vaikuttaa kaikkiin.", exampleEn: "Climate change affects everyone.", exampleVi: "Biến đổi khí hậu ảnh hưởng đến tất cả." },
  { fi: "kierrättää", partOfSpeech: "verb", meaningEn: "to recycle", meaningVi: "tái chế", exampleFi: "Kierrätän pullot ja paperin.", exampleEn: "I recycle bottles and paper.", exampleVi: "Tôi tái chế chai và giấy." },
  { fi: "saastua", partOfSpeech: "verb", meaningEn: "to become polluted", meaningVi: "bị ô nhiễm", exampleFi: "Joet saastuvat tehtaiden takia.", exampleEn: "Rivers get polluted because of factories.", exampleVi: "Sông bị ô nhiễm do nhà máy." },
  { fi: "energia", partOfSpeech: "noun", meaningEn: "energy", meaningVi: "năng lượng", exampleFi: "Suomi käyttää paljon uusiutuvaa energiaa.", exampleEn: "Finland uses lots of renewable energy.", exampleVi: "Phần Lan dùng nhiều năng lượng tái tạo." },
  { fi: "metsä", partOfSpeech: "noun", meaningEn: "forest", meaningVi: "rừng", exampleFi: "Suomen metsät ovat maailmankuuluja.", exampleEn: "Finnish forests are world-famous.", exampleVi: "Rừng Phần Lan nổi tiếng thế giới." },
  { fi: "luonnonsuojelu", partOfSpeech: "noun", meaningEn: "nature conservation", meaningVi: "bảo tồn thiên nhiên", exampleFi: "Luonnonsuojelu on osa suomalaista kulttuuria.", exampleEn: "Conservation is part of Finnish culture.", exampleVi: "Bảo tồn thiên nhiên là một phần văn hoá Phần Lan." },
  { fi: "jäte", partOfSpeech: "noun", meaningEn: "waste / trash", meaningVi: "rác", exampleFi: "Lajittele jätteet oikein.", exampleEn: "Sort waste correctly.", exampleVi: "Phân loại rác đúng cách." },
  { fi: "puhdas", partOfSpeech: "adjective", meaningEn: "clean", meaningVi: "sạch", exampleFi: "Suomen ilma on hyvin puhdas.", exampleEn: "Finland's air is very clean.", exampleVi: "Không khí Phần Lan rất sạch." },
  { fi: "kestävä", partOfSpeech: "adjective", meaningEn: "sustainable", meaningVi: "bền vững", exampleFi: "Tarvitsemme kestäviä ratkaisuja.", exampleEn: "We need sustainable solutions.", exampleVi: "Chúng ta cần giải pháp bền vững." },
  { fi: "päästö", partOfSpeech: "noun", meaningEn: "emission", meaningVi: "phát thải", exampleFi: "Liikenteen päästöt ovat suuret.", exampleEn: "Traffic emissions are high.", exampleVi: "Lượng khí thải giao thông rất cao." },
  { fi: "tulva", partOfSpeech: "noun", meaningEn: "flood", meaningVi: "lũ lụt", exampleFi: "Keväällä voi tulla tulvia.", exampleEn: "Floods may occur in spring.", exampleVi: "Lũ có thể xảy ra vào mùa xuân." },
];

const media: B1VocabEntry[] = [
  { fi: "uutiset", partOfSpeech: "noun (pl.)", meaningEn: "news", meaningVi: "tin tức", exampleFi: "Katson uutiset joka ilta.", exampleEn: "I watch the news every evening.", exampleVi: "Tôi xem tin tức mỗi tối." },
  { fi: "lehti", partOfSpeech: "noun", meaningEn: "newspaper / magazine", meaningVi: "báo / tạp chí", exampleFi: "Helsingin Sanomat on suuri lehti.", exampleEn: "Helsingin Sanomat is a major paper.", exampleVi: "Helsingin Sanomat là tờ báo lớn." },
  { fi: "toimittaja", partOfSpeech: "noun", meaningEn: "journalist", meaningVi: "nhà báo", exampleFi: "Toimittaja haastatteli ministeriä.", exampleEn: "The journalist interviewed the minister.", exampleVi: "Nhà báo phỏng vấn bộ trưởng." },
  { fi: "artikkeli", partOfSpeech: "noun", meaningEn: "article", meaningVi: "bài báo", exampleFi: "Luin mielenkiintoisen artikkelin.", exampleEn: "I read an interesting article.", exampleVi: "Tôi đọc một bài báo thú vị." },
  { fi: "mielipide", partOfSpeech: "noun", meaningEn: "opinion", meaningVi: "ý kiến", exampleFi: "Mikä on sinun mielipiteesi?", exampleEn: "What is your opinion?", exampleVi: "Ý kiến của bạn là gì?" },
  { fi: "väittää", partOfSpeech: "verb", meaningEn: "to claim", meaningVi: "khẳng định", exampleFi: "Tutkija väittää, että tulokset ovat luotettavia.", exampleEn: "The researcher claims that the results are reliable.", exampleVi: "Nhà nghiên cứu khẳng định kết quả đáng tin cậy." },
  { fi: "todistaa", partOfSpeech: "verb", meaningEn: "to prove", meaningVi: "chứng minh", exampleFi: "Vaikea todistaa, mutta uskottava.", exampleEn: "Hard to prove, but believable.", exampleVi: "Khó chứng minh nhưng đáng tin." },
  { fi: "puolueeton", partOfSpeech: "adjective", meaningEn: "neutral / impartial", meaningVi: "trung lập", exampleFi: "Yleisradio pyrkii olemaan puolueeton.", exampleEn: "Yle aims to be impartial.", exampleVi: "Yle hướng tới sự trung lập." },
  { fi: "valeuutinen", partOfSpeech: "noun", meaningEn: "fake news", meaningVi: "tin giả", exampleFi: "Tarkista lähteet ennen kuin jaat valeuutista.", exampleEn: "Check sources before sharing fake news.", exampleVi: "Kiểm tra nguồn trước khi chia sẻ tin giả." },
  { fi: "sosiaalinen media", partOfSpeech: "phrase", meaningEn: "social media", meaningVi: "mạng xã hội", exampleFi: "Vietän liikaa aikaa sosiaalisessa mediassa.", exampleEn: "I spend too much time on social media.", exampleVi: "Tôi dùng mạng xã hội quá nhiều." },
];

const workLife: B1VocabEntry[] = [
  { fi: "työehtosopimus", partOfSpeech: "noun", meaningEn: "collective agreement", meaningVi: "thoả ước lao động", exampleFi: "Työehtosopimus määrittää vähimmäispalkan.", exampleEn: "The collective agreement sets the minimum wage.", exampleVi: "Thoả ước quy định lương tối thiểu." },
  { fi: "ammattiliitto", partOfSpeech: "noun", meaningEn: "trade union", meaningVi: "công đoàn", exampleFi: "Liityin ammattiliittoon heti.", exampleEn: "I joined the trade union immediately.", exampleVi: "Tôi gia nhập công đoàn ngay." },
  { fi: "irtisanominen", partOfSpeech: "noun", meaningEn: "dismissal / lay-off", meaningVi: "sa thải", exampleFi: "Irtisanominen oli yllätys.", exampleEn: "The dismissal was a surprise.", exampleVi: "Việc sa thải là bất ngờ." },
  { fi: "työttömyyskorvaus", partOfSpeech: "noun", meaningEn: "unemployment benefit", meaningVi: "trợ cấp thất nghiệp", exampleFi: "Hain työttömyyskorvausta.", exampleEn: "I applied for unemployment benefit.", exampleVi: "Tôi xin trợ cấp thất nghiệp." },
  { fi: "etätyö", partOfSpeech: "noun", meaningEn: "remote work", meaningVi: "làm việc từ xa", exampleFi: "Etätyö on yleistynyt.", exampleEn: "Remote work has become common.", exampleVi: "Làm việc từ xa đã trở nên phổ biến." },
  { fi: "ylityö", partOfSpeech: "noun", meaningEn: "overtime", meaningVi: "tăng ca", exampleFi: "Teen joskus ylitöitä.", exampleEn: "I sometimes work overtime.", exampleVi: "Đôi khi tôi tăng ca." },
  { fi: "verkkokurssi", partOfSpeech: "noun", meaningEn: "online course", meaningVi: "khoá học trực tuyến", exampleFi: "Suoritan suomen verkkokurssia.", exampleEn: "I'm taking an online Finnish course.", exampleVi: "Tôi học khoá tiếng Phần online." },
  { fi: "vapaaehtoinen", partOfSpeech: "adjective / noun", meaningEn: "voluntary / volunteer", meaningVi: "tình nguyện", exampleFi: "Toimin vapaaehtoisena urheiluseurassa.", exampleEn: "I volunteer at a sports club.", exampleVi: "Tôi tình nguyện ở câu lạc bộ thể thao." },
  { fi: "haaste", partOfSpeech: "noun", meaningEn: "challenge", meaningVi: "thử thách", exampleFi: "Uusi työ on iso haaste.", exampleEn: "The new job is a big challenge.", exampleVi: "Công việc mới là thử thách lớn." },
  { fi: "tavoite", partOfSpeech: "noun", meaningEn: "goal", meaningVi: "mục tiêu", exampleFi: "Mikä on tämän vuoden tavoitteesi?", exampleEn: "What's your goal for this year?", exampleVi: "Mục tiêu năm nay của bạn là gì?" },
];

const dailyHabits: B1VocabEntry[] = [
  { fi: "tapa", partOfSpeech: "noun", meaningEn: "habit / custom", meaningVi: "thói quen", exampleFi: "Sauna on suomalainen tapa.", exampleEn: "Sauna is a Finnish custom.", exampleVi: "Sauna là tập tục Phần Lan." },
  { fi: "rutiini", partOfSpeech: "noun", meaningEn: "routine", meaningVi: "thói quen hàng ngày", exampleFi: "Aamurutiini auttaa minua jaksamaan.", exampleEn: "My morning routine keeps me going.", exampleVi: "Thói quen sáng giúp tôi có sức." },
  { fi: "tottua", partOfSpeech: "verb", meaningEn: "to get used to", meaningVi: "quen với", exampleFi: "Olen jo tottunut Suomen talveen.", exampleEn: "I've already gotten used to Finnish winter.", exampleVi: "Tôi đã quen mùa đông Phần Lan." },
  { fi: "siisteys", partOfSpeech: "noun", meaningEn: "cleanliness", meaningVi: "sạch sẽ", exampleFi: "Siisteys on Suomessa tärkeää.", exampleEn: "Cleanliness is important in Finland.", exampleVi: "Sự sạch sẽ rất quan trọng ở Phần Lan." },
  { fi: "täsmällisyys", partOfSpeech: "noun", meaningEn: "punctuality", meaningVi: "đúng giờ", exampleFi: "Suomalaiset arvostavat täsmällisyyttä.", exampleEn: "Finns value punctuality.", exampleVi: "Người Phần Lan coi trọng việc đúng giờ." },
  { fi: "hiljaisuus", partOfSpeech: "noun", meaningEn: "silence", meaningVi: "sự im lặng", exampleFi: "Hiljaisuus ei ole kiusallista Suomessa.", exampleEn: "Silence isn't awkward in Finland.", exampleVi: "Sự im lặng không khó xử ở Phần Lan." },
  { fi: "perhekeskeinen", partOfSpeech: "adjective", meaningEn: "family-oriented", meaningVi: "coi trọng gia đình", exampleFi: "Suomi on perhekeskeinen maa.", exampleEn: "Finland is family-oriented.", exampleVi: "Phần Lan coi trọng gia đình." },
  { fi: "yksityisyys", partOfSpeech: "noun", meaningEn: "privacy", meaningVi: "sự riêng tư", exampleFi: "Yksityisyys on kunnioitettavaa.", exampleEn: "Privacy is respected.", exampleVi: "Sự riêng tư được tôn trọng." },
  { fi: "rauhallinen", partOfSpeech: "adjective", meaningEn: "calm / peaceful", meaningVi: "yên tĩnh", exampleFi: "Naapurustomme on hyvin rauhallinen.", exampleEn: "Our neighbourhood is very peaceful.", exampleVi: "Khu phố rất yên tĩnh." },
  { fi: "luotettava", partOfSpeech: "adjective", meaningEn: "reliable", meaningVi: "đáng tin cậy", exampleFi: "Hän on aina luotettava kollega.", exampleEn: "He is always a reliable colleague.", exampleVi: "Anh ấy luôn là đồng nghiệp đáng tin." },
];

export const B1_VOCAB_EXPANSION_MODULES_4: B1VocabModule[] = [
  { id: "vocab4-environment", titleFi: "Ympäristö & ilmasto", titleEn: "Environment & climate", titleVi: "Môi trường & khí hậu", emoji: "🌍", description: "Climate, nature and sustainability.", descriptionVi: "Khí hậu, thiên nhiên, phát triển bền vững.", words: environment },
  { id: "vocab4-media", titleFi: "Media & uutiset", titleEn: "Media & news", titleVi: "Truyền thông & tin tức", emoji: "📰", description: "News, journalism, opinions and social media.", descriptionVi: "Tin tức, báo chí, ý kiến và mạng xã hội.", words: media },
  { id: "vocab4-worklife", titleFi: "Työelämä", titleEn: "Working life", titleVi: "Đời sống công việc", emoji: "🏢", description: "Unions, remote work, careers.", descriptionVi: "Công đoàn, làm việc từ xa, sự nghiệp.", words: workLife },
  { id: "vocab4-habits", titleFi: "Suomalainen elämäntapa", titleEn: "Finnish way of life", titleVi: "Lối sống Phần Lan", emoji: "🌲", description: "Habits, values and everyday culture.", descriptionVi: "Thói quen, giá trị, văn hoá hàng ngày.", words: dailyHabits },
];
