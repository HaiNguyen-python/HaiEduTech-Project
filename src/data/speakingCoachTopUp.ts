// Top-up pack: ensures every Speaking Coach theme has >= 10 sentences
// and assigns a CEFR level (A1/A2/B1) to every theme across all 4 languages.
// Applied at runtime in speakingCoachData.ts via mergeTopUps().
import type { SpeakingSentence } from "./speakingCoachData";

// ---- Level mapping for ALL theme IDs (English, Finnish, Vietnamese, Chinese) ----
export const themeLevels: Record<string, "A1" | "A2" | "B1"> = {
  // English
  "en-greetings": "A1", "en-daily": "A1", "en-family": "A1", "en-food": "A1",
  "en-housing": "A1", "en-shopping": "A1", "en-restaurant": "A1", "en-emergency": "A1",
  "en-travel": "A2", "en-work": "A2", "en-hobbies": "A2", "en-money": "A2",
  "en-emotions": "A2", "en-feelings": "A2", "en-sports": "A2", "en-movies": "A2",
  "en-shopping-services": "A2", "en-jobinterview": "B1", "en-news": "B1",
  "en-environment": "B1", "en-education": "B1", "en-tech": "B1", "en-technology": "B1",
  "en-health": "B1", "en-culture": "B1", "en-future": "B1", "en-academic": "B1",
  "en-social-digital": "B1",
  // Finnish (existing levels preserved when already set)
  "fi-greetings": "A1", "fi-greetings-v2": "A1", "fi-daily": "A1", "fi-family": "A1",
  "fi-family-v2": "A1", "fi-food": "A1", "fi-food-basic": "A1", "fi-numbers-time": "A1",
  "fi-weather": "A1", "fi-home": "A1", "fi-asuminen": "A1", "fi-shopping": "A1",
  "fi-shopping-ext": "A1", "fi-restaurant": "A1", "fi-apartment": "A2",
  "fi-body-health-basic": "A2", "fi-doctor": "A2", "fi-health": "A2", "fi-health2": "A2",
  "fi-emotions": "A2", "fi-feelings-ext": "A2", "fi-transport": "A2", "fi-travel-v2": "A2",
  "fi-money": "A2", "fi-services": "A2", "fi-shopping-adv": "A2", "fi-smalltalk": "A2",
  "fi-vapaa-aika": "A2", "fi-tyo": "A2", "fi-työ": "A2", "fi-work-v2": "A2",
  "fi-jobinterview": "B1", "fi-job-interview-adv": "B1", "fi-work-meeting": "B1",
  "fi-opiskelu": "B1", "fi-education": "B1", "fi-tech": "B1", "fi-tech-v2": "B1",
  "fi-culture": "B1", "fi-culture-v2": "B1", "fi-kulttuuri": "B1", "fi-news": "B1",
  "fi-news-society": "B1", "fi-opinion-debate": "B1", "fi-environment": "B1",
  "fi-luonto": "B1", "fi-future": "B1", "fi-health-adv": "B1", "fi-kela": "B1",
  // Vietnamese
  "vi-greetings": "A1", "vi-family": "A1", "vi-food": "A1", "vi-housing": "A1",
  "vi-shopping": "A1", "vi-restaurant": "A1", "vi-travel": "A2", "vi-work": "A2",
  "vi-money": "A2", "vi-emotions": "A2", "vi-feelings": "A2", "vi-nature": "A2",
  "vi-health": "B1", "vi-education": "B1", "vi-culture": "B1", "vi-tech": "B1",
  "vi-technology": "B1", "vi-environment": "B1", "vi-news": "B1", "vi-future": "B1",
  "vi-jobinterview": "B1",
  // Chinese
  "zh-greetings": "A1", "zh-daily": "A1", "zh-family": "A1", "zh-food": "A1",
  "zh-housing": "A1", "zh-shopping": "A1", "zh-restaurant": "A1", "zh-weather": "A1",
  "zh-travel": "A2", "zh-work": "A2", "zh-money": "A2", "zh-emotions": "A2",
  "zh-hobbies": "A2", "zh-leisure": "A2", "zh-health": "A2", "zh-jobinterview": "B1",
  "zh-news": "B1", "zh-environment": "B1", "zh-education": "B1", "zh-tech": "B1",
  "zh-technology": "B1", "zh-culture": "B1", "zh-future": "B1",
};

// ---- Extra sentences appended to themes that have < 10 sentences ----
// Each sentence has the same shape as SpeakingSentence; IDs prefixed with "tu-".
export const themeTopUps: Record<string, SpeakingSentence[]> = {
  // ====== ENGLISH ======
  "en-emergency": [
    { id: "tu-en-em1", text: "Please call an ambulance right now.", translation: "Làm ơn gọi xe cứu thương ngay.", ipa: "/pliz kɔl ən æmbjələns ɹaɪt naʊ/", difficulty: "easy", theme: "emergency" },
    { id: "tu-en-em2", text: "I think I need to go to the hospital.", translation: "Tôi nghĩ tôi cần đến bệnh viện.", ipa: "/aɪ θɪŋk aɪ nid tə goʊ tə ðə hɑspɪtəl/", difficulty: "easy", theme: "emergency" },
    { id: "tu-en-em3", text: "There has been a small accident on the corner.", translation: "Vừa có một tai nạn nhỏ ở góc đường.", ipa: "/ðɛər hæz bɪn ə smɔl æksədənt ɑːn ðə kɔɹnər/", difficulty: "medium", theme: "emergency" },
    { id: "tu-en-em4", text: "Could you tell me where the nearest pharmacy is?", translation: "Bạn cho tôi biết hiệu thuốc gần nhất ở đâu được không?", ipa: "/kʊd juː tɛl mi wɛər ðə nɪɹəst fɑɹməsi ɪz/", difficulty: "medium", theme: "emergency" },
    { id: "tu-en-em5", text: "Stay calm and follow the safety instructions carefully.", translation: "Hãy bình tĩnh và làm theo hướng dẫn an toàn cẩn thận.", ipa: "/steɪ kɑm ənd fɑloʊ ðə seɪfti ɪnstɹəkʃənz kɛɹfəli/", difficulty: "hard", theme: "emergency" },
  ],
  "en-emotions": [
    { id: "tu-en-emo1", text: "I feel really happy when I spend time with my family.", translation: "Tôi cảm thấy rất hạnh phúc khi dành thời gian cho gia đình.", ipa: "/aɪ fil ɹɪli hæpi wɛn aɪ spɛnd taɪm wɪð maɪ fæməli/", difficulty: "easy", theme: "emotions" },
    { id: "tu-en-emo2", text: "Sometimes I get nervous before an important meeting.", translation: "Đôi khi tôi hồi hộp trước một cuộc họp quan trọng.", ipa: "/səmtaɪmz aɪ gɛt ˈnɜːrvəs bɪfɔɹ ən ɪmpɔɹtənt mitɪŋ/", difficulty: "medium", theme: "emotions" },
    { id: "tu-en-emo3", text: "Talking to a close friend always cheers me up.", translation: "Trò chuyện với một người bạn thân luôn khiến tôi vui hơn.", ipa: "/tɔkɪŋ tə ə kloʊs fɹɛnd ɔlweɪz ʧɪɹz mi əp/", difficulty: "hard", theme: "emotions" },
  ],
  "en-family": [
    { id: "tu-en-fam1", text: "My parents live in a small town near the coast.", translation: "Bố mẹ tôi sống ở một thị trấn nhỏ gần biển.", ipa: "/maɪ pɛɹənts laɪv ɪn ə smɔl taʊn nɪɹ ðə koʊst/", difficulty: "medium", theme: "family" },
    { id: "tu-en-fam2", text: "We usually have dinner together every Sunday.", translation: "Chúng tôi thường ăn tối cùng nhau vào mỗi Chủ nhật.", ipa: "/wi juʒəwəli hæv dɪnər təgɛðər ɛvəri səndeɪ/", difficulty: "medium", theme: "family" },
  ],
  "en-feelings": [
    { id: "tu-en-fe1", text: "I felt a bit tired after work today.", translation: "Hôm nay tôi cảm thấy hơi mệt sau giờ làm.", ipa: "/aɪ fɛlt ə bɪt taɪərd æftər wərˈk tədeɪ/", difficulty: "easy", theme: "feelings" },
    { id: "tu-en-fe2", text: "She looked surprised when she heard the news.", translation: "Cô ấy có vẻ ngạc nhiên khi nghe tin.", ipa: "/ʃi lʊkt sərpɹaɪzd wɛn ʃi hərˈd ðə nuz/", difficulty: "medium", theme: "feelings" },
    { id: "tu-en-fe3", text: "I was deeply moved by his honest speech.", translation: "Tôi xúc động sâu sắc trước bài phát biểu chân thành của anh ấy.", ipa: "/aɪ wəz dipli muvd baɪ hɪz ɑnəst spiʧ/", difficulty: "hard", theme: "feelings" },
    { id: "tu-en-fe4", text: "Honestly, I'm feeling a little overwhelmed lately.", translation: "Thật lòng mà nói, dạo này tôi cảm thấy hơi quá tải.", ipa: "/ɑnəstli aɪm filɪŋ ə ˈlɪtəl ˌoʊvərˈwɛlmd leɪtli/", difficulty: "hard", theme: "feelings" },
  ],
  "en-future": [
    { id: "tu-en-fu1", text: "In five years, I hope to work abroad.", translation: "Trong năm năm tới, tôi hy vọng được làm việc ở nước ngoài.", ipa: "/ɪn faɪv jɪɹz aɪ hoʊp tə wərˈk əbɹɔd/", difficulty: "medium", theme: "future" },
    { id: "tu-en-fu2", text: "Technology will probably change our daily routines completely.", translation: "Công nghệ có lẽ sẽ thay đổi hoàn toàn thói quen hàng ngày của chúng ta.", ipa: "/tɛknɑləʤi wɪl pɹɑbəbli ʧeɪnʤ ˈaʊər deɪli ɹutinz kəmplitli/", difficulty: "hard", theme: "future" },
  ],
  "en-hobbies": [
    { id: "tu-en-ho1", text: "I love taking photos of nature on the weekend.", translation: "Tôi thích chụp ảnh thiên nhiên vào cuối tuần.", ipa: "/aɪ ləv teɪkɪŋ foʊtoʊz əv neɪʧər ɑːn ðə wikɛnd/", difficulty: "easy", theme: "hobbies" },
    { id: "tu-en-ho2", text: "Playing the guitar helps me relax after a long day.", translation: "Chơi guitar giúp tôi thư giãn sau một ngày dài.", ipa: "/pleɪˈɪŋ ðə gɪtɑɹ hɛlps mi ɹɪlæks æftər ə lɔŋ deɪ/", difficulty: "medium", theme: "hobbies" },
    { id: "tu-en-ho3", text: "Lately I've been getting into pottery and ceramics.", translation: "Gần đây tôi đang dần thích nghệ thuật gốm sứ.", ipa: "/leɪtli aɪv bɪn gɛtɪŋ ɪntu pɑtəri ənd səræmɪks/", difficulty: "hard", theme: "hobbies" },
  ],
  "en-jobinterview": [
    { id: "tu-en-ji1", text: "I believe my background fits this role very well.", translation: "Tôi tin rằng kinh nghiệm của mình rất phù hợp với vị trí này.", ipa: "/aɪ bɪliv maɪ bækgɹaʊnd fɪts ðɪs ɹoʊl vɛɹi wɛl/", difficulty: "medium", theme: "jobinterview" },
    { id: "tu-en-ji2", text: "One of my strengths is solving problems under pressure.", translation: "Một trong những điểm mạnh của tôi là giải quyết vấn đề dưới áp lực.", ipa: "/wən əv maɪ stɹɛŋkθs ɪz sɑlvɪŋ pɹɑbləmz əndər pɹɛʃər/", difficulty: "hard", theme: "jobinterview" },
  ],
  "en-money": [
    { id: "tu-en-mo1", text: "I try to save a small amount every month.", translation: "Tôi cố gắng tiết kiệm một khoản nhỏ mỗi tháng.", ipa: "/aɪ tɹaɪ tə seɪv ə smɔl əmaʊnt ɛvəri mənθ/", difficulty: "medium", theme: "money" },
    { id: "tu-en-mo2", text: "Investing wisely can really change your financial future.", translation: "Đầu tư khôn ngoan thực sự có thể thay đổi tương lai tài chính của bạn.", ipa: "/ɪnvɛstɪŋ waɪzli kæn ɹɪli ʧeɪnʤ jɔːr fɪˈnænʃəl ˈfjuːtʃər/", difficulty: "hard", theme: "money" },
  ],
  "en-movies": [
    { id: "tu-en-mv1", text: "My favorite genre is science fiction.", translation: "Thể loại yêu thích của tôi là khoa học viễn tưởng.", ipa: "/maɪ feɪvərɪt ʒɑnɹə ɪz saɪˈʌns fɪkʃən/", difficulty: "easy", theme: "movies" },
    { id: "tu-en-mv2", text: "The cinematography in that film was absolutely stunning.", translation: "Quay phim trong bộ phim đó thực sự tuyệt đẹp.", ipa: "/ðə sɪnɪmətɑgɹəfi ɪn ðæt fɪlm wəz æbsəlutli stənɪŋ/", difficulty: "hard", theme: "movies" },
  ],
  "en-restaurant": [
    { id: "tu-en-re1", text: "Could we have the menu, please?", translation: "Cho chúng tôi xin thực đơn được không?", ipa: "/kʊd wi hæv ðə mɛnju pliz/", difficulty: "easy", theme: "restaurant" },
    { id: "tu-en-re2", text: "I'd like the chef's recommendation for today.", translation: "Tôi muốn món được đầu bếp gợi ý hôm nay.", ipa: "/aɪd laɪk ðə ʃɛfs ɹɛkəməndeɪʃən fɔːr tədeɪ/", difficulty: "medium", theme: "restaurant" },
  ],
  "en-shopping": [
    { id: "tu-en-sh1", text: "Do you have this in a smaller size?", translation: "Cái này có cỡ nhỏ hơn không?", ipa: "/duː juː hæv ðɪs ɪn ə smɔlər saɪz/", difficulty: "easy", theme: "shopping" },
    { id: "tu-en-sh2", text: "Is there a discount if I pay in cash?", translation: "Trả tiền mặt có được giảm giá không?", ipa: "/ɪz ðɛər ə dɪskaʊnt ɪf aɪ peɪ ɪn kæʃ/", difficulty: "medium", theme: "shopping" },
    { id: "tu-en-sh3", text: "I'm just browsing for now, thanks.", translation: "Tôi chỉ đang xem qua thôi, cảm ơn.", ipa: "/aɪm ʤəst bɹaʊzɪŋ fɔːr naʊ θæŋks/", difficulty: "easy", theme: "shopping" },
  ],
  "en-sports": [
    { id: "tu-en-sp1", text: "I usually go jogging three times a week.", translation: "Tôi thường đi chạy bộ ba lần một tuần.", ipa: "/aɪ juʒəwəli goʊ ʤɑgɪŋ θɹi taɪmz ə wik/", difficulty: "easy", theme: "sports" },
    { id: "tu-en-sp2", text: "Team sports teach you discipline and cooperation.", translation: "Thể thao đồng đội dạy bạn tính kỷ luật và sự hợp tác.", ipa: "/tim spɔɹts tiʧ juː dɪsəplən ənd koʊɑpəreɪʃən/", difficulty: "hard", theme: "sports" },
  ],

  // ====== FINNISH ======
  "fi-culture": [
    { id: "tu-fi-cu1", text: "Suomalaiset rakastavat saunaa ja luontoa.", translation: "Người Phần Lan yêu sauna và thiên nhiên.", difficulty: "medium", theme: "culture" },
    { id: "tu-fi-cu2", text: "Itsenäisyyspäivää vietetään kuudentena joulukuuta.", translation: "Ngày Quốc khánh được tổ chức vào ngày 6 tháng 12.", difficulty: "hard", theme: "culture" },
  ],
  "fi-culture-v2": [
    { id: "tu-fi-cu21", text: "Pidän suomalaisesta musiikista paljon.", translation: "Tôi rất thích nhạc Phần Lan.", difficulty: "medium", theme: "culture" },
    { id: "tu-fi-cu22", text: "Vappu on iloinen kevätjuhla Suomessa.", translation: "Vappu là lễ hội mùa xuân vui vẻ ở Phần Lan.", difficulty: "medium", theme: "culture" },
    { id: "tu-fi-cu23", text: "Kalevala on Suomen kansalliseepos.", translation: "Kalevala là sử thi quốc gia của Phần Lan.", difficulty: "hard", theme: "culture" },
    { id: "tu-fi-cu24", text: "Saunominen on tärkeä osa suomalaista elämäntapaa.", translation: "Đi sauna là phần quan trọng trong lối sống của người Phần Lan.", difficulty: "hard", theme: "culture" },
    { id: "tu-fi-cu25", text: "Joulupukin kotikaupunki on Rovaniemi.", translation: "Quê hương của ông già Noel là Rovaniemi.", difficulty: "medium", theme: "culture" },
    { id: "tu-fi-cu26", text: "Suomalaiset arvostavat hiljaisuutta ja rauhaa.", translation: "Người Phần Lan quý trọng sự yên tĩnh và bình yên.", difficulty: "hard", theme: "culture" },
    { id: "tu-fi-cu27", text: "Sisu tarkoittaa sinnikkyyttä ja rohkeutta.", translation: "Sisu nghĩa là sự kiên trì và can đảm.", difficulty: "hard", theme: "culture" },
  ],
  "fi-education": [
    { id: "tu-fi-ed1", text: "Opiskelen suomea joka päivä.", translation: "Tôi học tiếng Phần Lan mỗi ngày.", difficulty: "easy", theme: "education" },
    { id: "tu-fi-ed2", text: "Suomen koulutusjärjestelmä on maailmankuulu.", translation: "Hệ thống giáo dục Phần Lan nổi tiếng thế giới.", difficulty: "hard", theme: "education" },
  ],
  "fi-emotions": [
    { id: "tu-fi-em1", text: "Olen tänään hyvällä tuulella.", translation: "Hôm nay tôi đang vui.", difficulty: "easy", theme: "emotions" },
    { id: "tu-fi-em2", text: "Joskus tunnen itseni hieman yksinäiseksi.", translation: "Đôi khi tôi cảm thấy hơi cô đơn.", difficulty: "medium", theme: "emotions" },
    { id: "tu-fi-em3", text: "Ystävien kanssa puhuminen auttaa minua rentoutumaan.", translation: "Trò chuyện với bạn bè giúp tôi thư giãn.", difficulty: "hard", theme: "emotions" },
    { id: "tu-fi-em4", text: "Olen kiitollinen perheestäni ja terveydestäni.", translation: "Tôi biết ơn vì gia đình và sức khỏe của mình.", difficulty: "hard", theme: "emotions" },
  ],
  "fi-environment": [
    { id: "tu-fi-en1", text: "Kierrätän paperia, lasia ja muovia kotona.", translation: "Tôi tái chế giấy, thủy tinh và nhựa ở nhà.", difficulty: "medium", theme: "environment" },
    { id: "tu-fi-en2", text: "Ilmastonmuutos on vakava ongelma koko maailmalle.", translation: "Biến đổi khí hậu là vấn đề nghiêm trọng đối với cả thế giới.", difficulty: "hard", theme: "environment" },
  ],
  "fi-family": [
    { id: "tu-fi-fa1", text: "Minulla on kaksi sisarusta.", translation: "Tôi có hai anh chị em.", difficulty: "easy", theme: "family" },
    { id: "tu-fi-fa2", text: "Vietämme paljon aikaa yhdessä viikonloppuisin.", translation: "Chúng tôi dành nhiều thời gian bên nhau vào cuối tuần.", difficulty: "medium", theme: "family" },
  ],
  "fi-family-v2": [
    { id: "tu-fi-fa21", text: "Vanhempani asuvat Helsingissä.", translation: "Bố mẹ tôi sống ở Helsinki.", difficulty: "easy", theme: "family" },
    { id: "tu-fi-fa22", text: "Isovanhempani ovat jo eläkkeellä.", translation: "Ông bà tôi đã nghỉ hưu rồi.", difficulty: "medium", theme: "family" },
    { id: "tu-fi-fa23", text: "Pikkuveljeni opiskelee yliopistossa.", translation: "Em trai tôi đang học đại học.", difficulty: "medium", theme: "family" },
    { id: "tu-fi-fa24", text: "Käymme usein kylässä sukulaisten luona.", translation: "Chúng tôi thường đi thăm họ hàng.", difficulty: "hard", theme: "family" },
    { id: "tu-fi-fa25", text: "Perhe on minulle kaikkein tärkein.", translation: "Gia đình là điều quan trọng nhất với tôi.", difficulty: "medium", theme: "family" },
    { id: "tu-fi-fa26", text: "Vietämme joulun aina yhdessä.", translation: "Chúng tôi luôn đón Giáng sinh cùng nhau.", difficulty: "medium", theme: "family" },
  ],
  "fi-feelings-ext": [
    { id: "tu-fi-fee1", text: "Olen iloinen tästä uutisesta.", translation: "Tôi vui vì tin này.", difficulty: "easy", theme: "feelings" },
    { id: "tu-fi-fee2", text: "Tunnen olevani hieman väsynyt.", translation: "Tôi cảm thấy hơi mệt.", difficulty: "medium", theme: "feelings" },
    { id: "tu-fi-fee3", text: "Olen ylpeä saavutuksistani.", translation: "Tôi tự hào về thành tựu của mình.", difficulty: "medium", theme: "feelings" },
    { id: "tu-fi-fee4", text: "Joskus on vaikea ilmaista tunteita sanoin.", translation: "Đôi khi rất khó diễn tả cảm xúc bằng lời.", difficulty: "hard", theme: "feelings" },
    { id: "tu-fi-fee5", text: "Musiikki vaikuttaa vahvasti tunteisiini.", translation: "Âm nhạc ảnh hưởng mạnh đến cảm xúc của tôi.", difficulty: "hard", theme: "feelings" },
  ],
  "fi-future": [
    { id: "tu-fi-fu1", text: "Haluan oppia suomea sujuvasti.", translation: "Tôi muốn học tiếng Phần Lan thật trôi chảy.", difficulty: "medium", theme: "future" },
    { id: "tu-fi-fu2", text: "Tulevaisuudessa toivon työskenteleväni Suomessa.", translation: "Trong tương lai tôi hy vọng được làm việc ở Phần Lan.", difficulty: "hard", theme: "future" },
  ],
  "fi-greetings-v2": [
    { id: "tu-fi-gr21", text: "Hauska tutustua sinuun.", translation: "Rất vui được làm quen với bạn.", difficulty: "easy", theme: "greetings" },
    { id: "tu-fi-gr22", text: "Mukava nähdä sinua taas.", translation: "Rất vui được gặp lại bạn.", difficulty: "easy", theme: "greetings" },
    { id: "tu-fi-gr23", text: "Mistä päin sinä olet kotoisin?", translation: "Bạn đến từ vùng nào?", difficulty: "medium", theme: "greetings" },
    { id: "tu-fi-gr24", text: "Pitkästä aikaa! Mitä kuuluu?", translation: "Lâu quá rồi! Bạn dạo này thế nào?", difficulty: "medium", theme: "greetings" },
    { id: "tu-fi-gr25", text: "Toivottavasti tapaamme pian uudestaan.", translation: "Hy vọng chúng ta sớm gặp lại.", difficulty: "hard", theme: "greetings" },
  ],
  "fi-health-adv": [
    { id: "tu-fi-ha1", text: "Käyn säännöllisesti lääkärin tarkastuksessa.", translation: "Tôi đi khám bác sĩ định kỳ.", difficulty: "medium", theme: "health" },
    { id: "tu-fi-ha2", text: "Stressi vaikuttaa pitkällä aikavälillä terveyteen.", translation: "Stress ảnh hưởng đến sức khỏe về lâu dài.", difficulty: "hard", theme: "health" },
    { id: "tu-fi-ha3", text: "Yritän nukkua vähintään seitsemän tuntia yössä.", translation: "Tôi cố gắng ngủ ít nhất bảy tiếng mỗi đêm.", difficulty: "medium", theme: "health" },
    { id: "tu-fi-ha4", text: "Tasapainoinen ruokavalio on tärkeä jaksamiselle.", translation: "Chế độ ăn cân bằng rất quan trọng cho thể lực.", difficulty: "hard", theme: "health" },
    { id: "tu-fi-ha5", text: "Meditaatio auttaa minua rauhoittamaan mieltä.", translation: "Thiền giúp tôi làm dịu tâm trí.", difficulty: "hard", theme: "health" },
  ],
  "fi-health2": [
    { id: "tu-fi-h21", text: "Minulla on pieni päänsärky.", translation: "Tôi bị đau đầu nhẹ.", difficulty: "easy", theme: "health" },
    { id: "tu-fi-h22", text: "Tarvitsen reseptin apteekkiin.", translation: "Tôi cần đơn thuốc cho hiệu thuốc.", difficulty: "medium", theme: "health" },
  ],
  "fi-jobinterview": [
    { id: "tu-fi-ji1", text: "Olen motivoitunut oppimaan uutta.", translation: "Tôi có động lực học hỏi cái mới.", difficulty: "medium", theme: "jobinterview" },
    { id: "tu-fi-ji2", text: "Pidän tiimityöskentelystä ja yhteistyöstä.", translation: "Tôi thích làm việc nhóm và hợp tác.", difficulty: "medium", theme: "jobinterview" },
    { id: "tu-fi-ji3", text: "Vahvuutenani on ongelmanratkaisukyky paineen alla.", translation: "Điểm mạnh của tôi là khả năng giải quyết vấn đề dưới áp lực.", difficulty: "hard", theme: "jobinterview" },
    { id: "tu-fi-ji4", text: "Voisitteko kertoa lisää työtehtävistä?", translation: "Bạn có thể nói thêm về công việc không?", difficulty: "hard", theme: "jobinterview" },
  ],
  "fi-money": [
    { id: "tu-fi-mo1", text: "Säästän pienen summan joka kuukausi.", translation: "Tôi tiết kiệm một khoản nhỏ mỗi tháng.", difficulty: "medium", theme: "money" },
    { id: "tu-fi-mo2", text: "Maksan yleensä kortilla.", translation: "Tôi thường thanh toán bằng thẻ.", difficulty: "easy", theme: "money" },
    { id: "tu-fi-mo3", text: "Asuminen Suomessa on melko kallista.", translation: "Sống ở Phần Lan khá đắt đỏ.", difficulty: "hard", theme: "money" },
    { id: "tu-fi-mo4", text: "Sijoittaminen vaatii kärsivällisyyttä.", translation: "Đầu tư đòi hỏi sự kiên nhẫn.", difficulty: "hard", theme: "money" },
  ],
  "fi-news": [
    { id: "tu-fi-ne1", text: "Luen uutisia joka aamu.", translation: "Tôi đọc tin tức mỗi sáng.", difficulty: "easy", theme: "news" },
    { id: "tu-fi-ne2", text: "Tämä uutinen yllätti minut täysin.", translation: "Tin này khiến tôi hoàn toàn ngạc nhiên.", difficulty: "medium", theme: "news" },
    { id: "tu-fi-ne3", text: "Nykyään valeuutiset ovat iso ongelma.", translation: "Ngày nay tin giả là một vấn đề lớn.", difficulty: "hard", theme: "news" },
    { id: "tu-fi-ne4", text: "Mielestäni median tulee olla puolueeton.", translation: "Theo tôi, truyền thông phải khách quan.", difficulty: "hard", theme: "news" },
    { id: "tu-fi-ne5", text: "Talousuutiset kiinnostavat minua eniten.", translation: "Tôi quan tâm nhất đến tin kinh tế.", difficulty: "hard", theme: "news" },
    { id: "tu-fi-ne6", text: "Kuuntelen radiouutisia matkalla töihin.", translation: "Tôi nghe tin tức trên đài khi đi làm.", difficulty: "medium", theme: "news" },
  ],
  "fi-restaurant": [
    { id: "tu-fi-re1", text: "Voisinko saada ruokalistan?", translation: "Cho tôi xin thực đơn được không?", difficulty: "easy", theme: "restaurant" },
    { id: "tu-fi-re2", text: "Mitä suosittelisitte tänään?", translation: "Hôm nay bạn gợi ý món gì?", difficulty: "medium", theme: "restaurant" },
    { id: "tu-fi-re3", text: "Ruoka oli erittäin maukasta, kiitos.", translation: "Đồ ăn rất ngon, cảm ơn.", difficulty: "medium", theme: "restaurant" },
    { id: "tu-fi-re4", text: "Saisinko laskun, kiitos.", translation: "Cho tôi hóa đơn nhé.", difficulty: "easy", theme: "restaurant" },
  ],
  "fi-shopping-adv": [
    { id: "tu-fi-sa1", text: "Onko tämä saatavilla pienemmässä koossa?", translation: "Cái này có cỡ nhỏ hơn không?", difficulty: "medium", theme: "shopping" },
    { id: "tu-fi-sa2", text: "Saanko maksaa kortilla?", translation: "Tôi trả bằng thẻ được không?", difficulty: "easy", theme: "shopping" },
    { id: "tu-fi-sa3", text: "Onko tällä alennusta tällä viikolla?", translation: "Tuần này có giảm giá không?", difficulty: "medium", theme: "shopping" },
    { id: "tu-fi-sa4", text: "Voinko palauttaa tämän, jos se ei sovi?", translation: "Tôi có thể trả lại nếu không vừa không?", difficulty: "hard", theme: "shopping" },
    { id: "tu-fi-sa5", text: "Mikä on takuun pituus tälle tuotteelle?", translation: "Thời gian bảo hành sản phẩm này là bao lâu?", difficulty: "hard", theme: "shopping" },
  ],
  "fi-shopping-ext": [
    { id: "tu-fi-se1", text: "Etsin lahjaa ystävälleni.", translation: "Tôi đang tìm quà cho bạn.", difficulty: "medium", theme: "shopping" },
    { id: "tu-fi-se2", text: "Paljonko tämä maksaa?", translation: "Cái này giá bao nhiêu?", difficulty: "easy", theme: "shopping" },
    { id: "tu-fi-se3", text: "Käteisellä vai kortilla?", translation: "Tiền mặt hay thẻ?", difficulty: "easy", theme: "shopping" },
    { id: "tu-fi-se4", text: "Voisiko tästä saada kuitin sähköpostiin?", translation: "Có thể gửi hóa đơn qua email được không?", difficulty: "hard", theme: "shopping" },
    { id: "tu-fi-se5", text: "Onko teillä tätä mallia toisessa värissä?", translation: "Bạn có mẫu này màu khác không?", difficulty: "hard", theme: "shopping" },
  ],
  "fi-tech": [
    { id: "tu-fi-te1", text: "Käytän puhelinta moneen asiaan päivittäin.", translation: "Tôi dùng điện thoại cho nhiều việc mỗi ngày.", difficulty: "medium", theme: "tech" },
    { id: "tu-fi-te2", text: "Tekoäly muuttaa työelämää nopeasti.", translation: "Trí tuệ nhân tạo đang thay đổi đời sống công việc nhanh chóng.", difficulty: "hard", theme: "tech" },
  ],
  "fi-tech-v2": [
    { id: "tu-fi-te21", text: "Lataan akun joka ilta.", translation: "Tôi sạc pin mỗi tối.", difficulty: "easy", theme: "tech" },
    { id: "tu-fi-te22", text: "Sovellus ei toimi kunnolla.", translation: "Ứng dụng không chạy đúng.", difficulty: "medium", theme: "tech" },
    { id: "tu-fi-te23", text: "Wifi-yhteys on hidas tänään.", translation: "Hôm nay kết nối Wifi chậm.", difficulty: "medium", theme: "tech" },
    { id: "tu-fi-te24", text: "Tarvitsen apua tietokoneen kanssa.", translation: "Tôi cần giúp đỡ với máy tính.", difficulty: "medium", theme: "tech" },
    { id: "tu-fi-te25", text: "Pilvipalvelut helpottavat työntekoa.", translation: "Dịch vụ đám mây giúp làm việc dễ hơn.", difficulty: "hard", theme: "tech" },
    { id: "tu-fi-te26", text: "Mielestäni yksityisyyden suoja on tärkeää.", translation: "Theo tôi, bảo mật quyền riêng tư là quan trọng.", difficulty: "hard", theme: "tech" },
    { id: "tu-fi-te27", text: "Nuoret oppivat tekniikkaa todella nopeasti.", translation: "Người trẻ học công nghệ rất nhanh.", difficulty: "hard", theme: "tech" },
  ],
  "fi-travel-v2": [
    { id: "tu-fi-tr1", text: "Matkustan junalla mielelläni.", translation: "Tôi thích đi tàu hỏa.", difficulty: "easy", theme: "travel" },
    { id: "tu-fi-tr2", text: "Suunnittelen lomamatkaa Lappiin.", translation: "Tôi đang lên kế hoạch đi nghỉ ở Lapland.", difficulty: "medium", theme: "travel" },
    { id: "tu-fi-tr3", text: "Hotelli oli aivan keskustassa.", translation: "Khách sạn nằm ngay trung tâm.", difficulty: "medium", theme: "travel" },
    { id: "tu-fi-tr4", text: "Lento myöhästyi sään takia.", translation: "Chuyến bay trễ vì thời tiết.", difficulty: "medium", theme: "travel" },
    { id: "tu-fi-tr5", text: "Matkailu avartaa ihmistä uskomattomalla tavalla.", translation: "Du lịch mở mang tầm nhìn con người một cách đáng kinh ngạc.", difficulty: "hard", theme: "travel" },
  ],
  "fi-weather": [
    { id: "tu-fi-we1", text: "Tänään on todella kylmä päivä.", translation: "Hôm nay là một ngày rất lạnh.", difficulty: "easy", theme: "weather" },
    { id: "tu-fi-we2", text: "Talvella sataa paljon lunta.", translation: "Mùa đông tuyết rơi rất nhiều.", difficulty: "easy", theme: "weather" },
    { id: "tu-fi-we3", text: "Kesäisin aurinko ei laske öisin Lapissa.", translation: "Mùa hè ở Lapland mặt trời không lặn vào ban đêm.", difficulty: "hard", theme: "weather" },
    { id: "tu-fi-we4", text: "Sääennuste lupaa sadetta huomiseksi.", translation: "Dự báo nói mai sẽ có mưa.", difficulty: "medium", theme: "weather" },
    { id: "tu-fi-we5", text: "Pukeudun lämpimästi, kun on pakkasta.", translation: "Tôi mặc ấm khi trời lạnh giá.", difficulty: "hard", theme: "weather" },
  ],
  "fi-work-v2": [
    { id: "tu-fi-wo1", text: "Aloitan työpäiväni kahdeksalta.", translation: "Tôi bắt đầu ngày làm việc lúc tám giờ.", difficulty: "easy", theme: "work" },
    { id: "tu-fi-wo2", text: "Työkaverit ovat mukavia.", translation: "Đồng nghiệp rất dễ chịu.", difficulty: "easy", theme: "work" },
    { id: "tu-fi-wo3", text: "Etätyö sopii minulle todella hyvin.", translation: "Làm việc từ xa rất hợp với tôi.", difficulty: "medium", theme: "work" },
    { id: "tu-fi-wo4", text: "Yritämme saada projektin valmiiksi ajoissa.", translation: "Chúng tôi cố gắng hoàn thành dự án đúng hạn.", difficulty: "hard", theme: "work" },
    { id: "tu-fi-wo5", text: "Tiimityö on avain menestykseen.", translation: "Làm việc nhóm là chìa khóa thành công.", difficulty: "hard", theme: "work" },
    { id: "tu-fi-wo6", text: "Palaveri alkaa kymmenen minuutin päästä.", translation: "Cuộc họp bắt đầu sau mười phút nữa.", difficulty: "medium", theme: "work" },
  ],

  // ====== VIETNAMESE ======
  "vi-emotions": [
    { id: "tu-vi-em1", text: "Tôi cảm thấy rất biết ơn vì có gia đình.", translation: "I feel grateful for having my family.", difficulty: "medium", theme: "emotions" },
    { id: "tu-vi-em2", text: "Đôi khi tôi cảm thấy hơi căng thẳng vì công việc.", translation: "Sometimes I feel a bit stressed because of work.", difficulty: "medium", theme: "emotions" },
    { id: "tu-vi-em3", text: "Khi nghe nhạc, tôi thấy lòng mình bình yên hơn.", translation: "When I listen to music, my heart feels calmer.", difficulty: "hard", theme: "emotions" },
    { id: "tu-vi-em4", text: "Trò chuyện với bạn thân luôn khiến tôi vui hơn.", translation: "Talking to a close friend always cheers me up.", difficulty: "hard", theme: "emotions" },
  ],
  "vi-environment": [
    { id: "tu-vi-en1", text: "Chúng ta nên trồng nhiều cây xanh hơn.", translation: "We should plant more trees.", difficulty: "easy", theme: "environment" },
    { id: "tu-vi-en2", text: "Tôi luôn mang theo chai nước dùng lại được.", translation: "I always carry a reusable bottle.", difficulty: "medium", theme: "environment" },
  ],
  "vi-feelings": [
    { id: "tu-vi-fe1", text: "Hôm nay tôi cảm thấy rất vui.", translation: "Today I feel very happy.", difficulty: "easy", theme: "feelings" },
    { id: "tu-vi-fe2", text: "Tôi hơi mệt sau một ngày dài.", translation: "I'm a bit tired after a long day.", difficulty: "easy", theme: "feelings" },
    { id: "tu-vi-fe3", text: "Tôi cảm động trước sự tử tế của mọi người.", translation: "I was moved by everyone's kindness.", difficulty: "hard", theme: "feelings" },
    { id: "tu-vi-fe4", text: "Đôi khi khó diễn tả cảm xúc bằng lời.", translation: "Sometimes it's hard to express feelings in words.", difficulty: "hard", theme: "feelings" },
    { id: "tu-vi-fe5", text: "Tôi tự hào về những gì mình đã đạt được.", translation: "I'm proud of what I've achieved.", difficulty: "medium", theme: "feelings" },
  ],
  "vi-future": [
    { id: "tu-vi-fu1", text: "Trong tương lai, tôi muốn mở một quán cà phê nhỏ.", translation: "In the future, I want to open a small café.", difficulty: "medium", theme: "future" },
    { id: "tu-vi-fu2", text: "Tôi tin rằng công nghệ sẽ thay đổi mọi ngành nghề.", translation: "I believe technology will change every industry.", difficulty: "hard", theme: "future" },
  ],
  "vi-jobinterview": [
    { id: "tu-vi-ji1", text: "Tôi rất hứng thú với vị trí này.", translation: "I'm very interested in this position.", difficulty: "medium", theme: "jobinterview" },
    { id: "tu-vi-ji2", text: "Điểm mạnh của tôi là khả năng làm việc nhóm.", translation: "My strength is teamwork.", difficulty: "medium", theme: "jobinterview" },
    { id: "tu-vi-ji3", text: "Tôi luôn sẵn sàng học hỏi điều mới.", translation: "I'm always ready to learn new things.", difficulty: "medium", theme: "jobinterview" },
    { id: "tu-vi-ji4", text: "Tôi mong có cơ hội đóng góp cho công ty.", translation: "I hope to have the chance to contribute to the company.", difficulty: "hard", theme: "jobinterview" },
  ],
  "vi-money": [
    { id: "tu-vi-mo1", text: "Tôi cố gắng tiết kiệm mỗi tháng một ít.", translation: "I try to save a little every month.", difficulty: "medium", theme: "money" },
    { id: "tu-vi-mo2", text: "Tôi thường thanh toán bằng chuyển khoản.", translation: "I usually pay by bank transfer.", difficulty: "medium", theme: "money" },
    { id: "tu-vi-mo3", text: "Đầu tư cần kiên nhẫn và hiểu biết.", translation: "Investing requires patience and knowledge.", difficulty: "hard", theme: "money" },
    { id: "tu-vi-mo4", text: "Quản lý chi tiêu hợp lý rất quan trọng.", translation: "Managing spending properly is very important.", difficulty: "hard", theme: "money" },
  ],
  "vi-news": [
    { id: "tu-vi-ne1", text: "Tôi đọc tin tức mỗi sáng trước khi đi làm.", translation: "I read the news every morning before work.", difficulty: "medium", theme: "news" },
    { id: "tu-vi-ne2", text: "Tin giả lan truyền rất nhanh trên mạng xã hội.", translation: "Fake news spreads very fast on social media.", difficulty: "hard", theme: "news" },
    { id: "tu-vi-ne3", text: "Báo chí có vai trò quan trọng trong xã hội.", translation: "The press plays an important role in society.", difficulty: "hard", theme: "news" },
    { id: "tu-vi-ne4", text: "Tôi thích xem bản tin kinh tế hàng ngày.", translation: "I like watching the economic news daily.", difficulty: "medium", theme: "news" },
    { id: "tu-vi-ne5", text: "Cần kiểm tra nguồn tin trước khi chia sẻ.", translation: "We should check sources before sharing news.", difficulty: "hard", theme: "news" },
    { id: "tu-vi-ne6", text: "Nhiều người hiện nay đọc tin qua điện thoại.", translation: "Many people now read news on their phones.", difficulty: "medium", theme: "news" },
  ],
  "vi-restaurant": [
    { id: "tu-vi-re1", text: "Cho tôi xin thực đơn được không?", translation: "Could I have the menu, please?", difficulty: "easy", theme: "restaurant" },
    { id: "tu-vi-re2", text: "Món này có cay không ạ?", translation: "Is this dish spicy?", difficulty: "easy", theme: "restaurant" },
    { id: "tu-vi-re3", text: "Tôi muốn gọi món đặc trưng của nhà hàng.", translation: "I'd like the restaurant's signature dish.", difficulty: "hard", theme: "restaurant" },
    { id: "tu-vi-re4", text: "Cho tôi xin hóa đơn, cảm ơn.", translation: "Bring me the bill, please.", difficulty: "easy", theme: "restaurant" },
  ],

  // ====== CHINESE ======
  "zh-emotions": [
    { id: "tu-zh-em1", text: "我今天心情很好。", translation: "Hôm nay tâm trạng tôi rất tốt.", ipa: "wǒ jīn tiān xīn qíng hěn hǎo", difficulty: "easy", theme: "emotions" },
    { id: "tu-zh-em2", text: "有时候我会感到紧张。", translation: "Đôi khi tôi cảm thấy hồi hộp.", ipa: "yǒu shí hòu wǒ huì gǎn dào jǐn zhāng", difficulty: "medium", theme: "emotions" },
    { id: "tu-zh-em3", text: "和朋友聊天让我放松。", translation: "Trò chuyện với bạn bè giúp tôi thư giãn.", ipa: "hé péng yǒu liáo tiān ràng wǒ fàng sōng", difficulty: "medium", theme: "emotions" },
    { id: "tu-zh-em4", text: "音乐能让我心情平静下来。", translation: "Âm nhạc khiến tôi bình tĩnh hơn.", ipa: "yīn yuè néng ràng wǒ xīn qíng píng jìng xià lái", difficulty: "hard", theme: "emotions" },
  ],
  "zh-future": [
    { id: "tu-zh-fu1", text: "我希望以后能在国外工作。", translation: "Tôi hy vọng sau này có thể làm việc ở nước ngoài.", ipa: "wǒ xī wàng yǐ hòu néng zài guó wài gōng zuò", difficulty: "medium", theme: "future" },
    { id: "tu-zh-fu2", text: "未来科技会改变我们的生活方式。", translation: "Tương lai công nghệ sẽ thay đổi cách sống của chúng ta.", ipa: "wèi lái kē jì huì gǎi biàn wǒ men de shēng huó fāng shì", difficulty: "hard", theme: "future" },
  ],
  "zh-hobbies": [
    { id: "tu-zh-ho1", text: "我喜欢周末爬山。", translation: "Tôi thích leo núi vào cuối tuần.", ipa: "wǒ xǐ huān zhōu mò pá shān", difficulty: "easy", theme: "hobbies" },
    { id: "tu-zh-ho2", text: "弹钢琴是我最喜欢的爱好。", translation: "Chơi piano là sở thích yêu thích nhất của tôi.", ipa: "tán gāng qín shì wǒ zuì xǐ huān de ài hào", difficulty: "medium", theme: "hobbies" },
    { id: "tu-zh-ho3", text: "我最近开始学摄影。", translation: "Gần đây tôi bắt đầu học chụp ảnh.", ipa: "wǒ zuì jìn kāi shǐ xué shè yǐng", difficulty: "medium", theme: "hobbies" },
    { id: "tu-zh-ho4", text: "看书让我感到非常放松。", translation: "Đọc sách khiến tôi cảm thấy rất thư giãn.", ipa: "kàn shū ràng wǒ gǎn dào fēi cháng fàng sōng", difficulty: "medium", theme: "hobbies" },
    { id: "tu-zh-ho5", text: "团队运动可以培养合作精神。", translation: "Thể thao đồng đội rèn luyện tinh thần hợp tác.", ipa: "tuán duì yùn dòng kě yǐ péi yǎng hé zuò jīng shén", difficulty: "hard", theme: "hobbies" },
  ],
  "zh-jobinterview": [
    { id: "tu-zh-ji1", text: "我对这个职位很感兴趣。", translation: "Tôi rất quan tâm đến vị trí này.", ipa: "wǒ duì zhè ge zhí wèi hěn gǎn xìng qù", difficulty: "medium", theme: "jobinterview" },
    { id: "tu-zh-ji2", text: "我的优点是认真负责。", translation: "Ưu điểm của tôi là nghiêm túc và có trách nhiệm.", ipa: "wǒ de yōu diǎn shì rèn zhēn fù zé", difficulty: "medium", theme: "jobinterview" },
    { id: "tu-zh-ji3", text: "我善于团队合作。", translation: "Tôi giỏi làm việc nhóm.", ipa: "wǒ shàn yú tuán duì hé zuò", difficulty: "medium", theme: "jobinterview" },
    { id: "tu-zh-ji4", text: "希望能为公司做出贡献。", translation: "Tôi hy vọng có thể đóng góp cho công ty.", ipa: "xī wàng néng wèi gōng sī zuò chū gòng xiàn", difficulty: "hard", theme: "jobinterview" },
  ],
  "zh-money": [
    { id: "tu-zh-mo1", text: "我每个月都会存一点钱。", translation: "Mỗi tháng tôi đều tiết kiệm một ít tiền.", ipa: "wǒ měi gè yuè dōu huì cún yī diǎn qián", difficulty: "medium", theme: "money" },
    { id: "tu-zh-mo2", text: "我通常用手机支付。", translation: "Tôi thường thanh toán bằng điện thoại.", ipa: "wǒ tōng cháng yòng shǒu jī zhī fù", difficulty: "medium", theme: "money" },
    { id: "tu-zh-mo3", text: "投资需要耐心和知识。", translation: "Đầu tư cần kiên nhẫn và kiến thức.", ipa: "tóu zī xū yào nài xīn hé zhī shi", difficulty: "hard", theme: "money" },
  ],
  "zh-news": [
    { id: "tu-zh-ne1", text: "我每天早上看新闻。", translation: "Mỗi sáng tôi đều đọc tin tức.", ipa: "wǒ měi tiān zǎo shàng kàn xīn wén", difficulty: "easy", theme: "news" },
    { id: "tu-zh-ne2", text: "假新闻在网上传播得很快。", translation: "Tin giả lan truyền rất nhanh trên mạng.", ipa: "jiǎ xīn wén zài wǎng shàng chuán bō de hěn kuài", difficulty: "hard", theme: "news" },
    { id: "tu-zh-ne3", text: "媒体应该客观报道。", translation: "Truyền thông nên đưa tin khách quan.", ipa: "méi tǐ yīng gāi kè guān bào dào", difficulty: "hard", theme: "news" },
    { id: "tu-zh-ne4", text: "经济新闻让我学到很多。", translation: "Tin kinh tế giúp tôi học hỏi rất nhiều.", ipa: "jīng jì xīn wén ràng wǒ xué dào hěn duō", difficulty: "hard", theme: "news" },
    { id: "tu-zh-ne5", text: "我喜欢通过手机看新闻。", translation: "Tôi thích đọc tin qua điện thoại.", ipa: "wǒ xǐ huān tōng guò shǒu jī kàn xīn wén", difficulty: "medium", theme: "news" },
  ],
  "zh-restaurant": [
    { id: "tu-zh-re1", text: "请给我菜单。", translation: "Cho tôi thực đơn nhé.", ipa: "qǐng gěi wǒ cài dān", difficulty: "easy", theme: "restaurant" },
    { id: "tu-zh-re2", text: "这个菜辣不辣?", translation: "Món này có cay không?", ipa: "zhè ge cài là bù là", difficulty: "easy", theme: "restaurant" },
    { id: "tu-zh-re3", text: "请推荐你们的招牌菜。", translation: "Hãy giới thiệu món đặc trưng của nhà hàng.", ipa: "qǐng tuī jiàn nǐ men de zhāo pái cài", difficulty: "medium", theme: "restaurant" },
    { id: "tu-zh-re4", text: "买单,谢谢。", translation: "Tính tiền, cảm ơn.", ipa: "mǎi dān, xiè xie", difficulty: "easy", theme: "restaurant" },
  ],
};

/**
 * Merge top-up sentences and CEFR levels into a theme list.
 * - Appends extra sentences to themes whose id appears in themeTopUps.
 * - Assigns `level` from themeLevels when the theme has none.
 */
export function applyTopUps<T extends { id: string; sentences: any[]; level?: "A1" | "A2" | "B1" | "B2" | "C1" }>(themes: T[]): T[] {
  return themes.map((th) => {
    const extra = themeTopUps[th.id];
    const lvl = th.level ?? themeLevels[th.id];
    if (!extra && !lvl) return th;
    return {
      ...th,
      level: lvl ?? th.level,
      sentences: extra ? [...th.sentences, ...extra] : th.sentences,
    } as T;
  });
}
