/**
 * @file ieltsParaphraseToolkit.ts
 * @description Per-topic collocations and structures (B2-C2) for upgrading the
 *   simple source sentence. Each item lists `cues`: plain words/phrases in the
 *   A2-B1 sentence it can replace. The toolkit ranks items by cue matches so the
 *   suggestions fit the sentence being paraphrased. No em-dashes.
 */
export type ToolKind = "collocation" | "structure";
export interface ToolItem {
  kind: ToolKind; en: string; vi: string; ex: string; level: "B2" | "C1" | "C2";
  match?: string; cues: string[];
}

type L = ToolItem["level"];
const c = (en: string, vi: string, ex: string, level: L, cues: string[]): ToolItem => ({ kind: "collocation", en, vi, ex, level, cues });
const s = (en: string, vi: string, ex: string, match: string, level: L, cues: string[]): ToolItem => ({ kind: "structure", en, vi, ex, level, match, cues });

export const PARA_TOOLKIT: Record<string, ToolItem[]> = {
  "1:trends": [
    c("rise dramatically", "tăng vọt (thay went up a lot/fast)", "House prices rose dramatically over the period.", "B2", ["went up a lot", "went up very fast", "went up fast", "up very fast", "a lot"]),
    c("decline steadily", "giảm đều đặn", "The number of farmers declined steadily each year.", "B2", ["became smaller", "went down slowly", "smaller every year", "down slowly"]),
    c("fall slightly", "giảm nhẹ", "Sales fell slightly in 2010.", "B2", ["went down a little", "down a little", "a little"]),
    c("plummet", "lao dốc, giảm mạnh", "Oil consumption plummeted after 2000.", "C1", ["dropped very much", "dropped", "went down"]),
    c("remain stable", "giữ ổn định", "The price remained stable for five years.", "B2", ["stayed the same", "same"]),
    c("reach a peak of", "đạt đỉnh", "The figure reached a peak in 2015.", "C1", ["highest point", "highest", "got to"]),
    c("double", "tăng gấp đôi", "Tourist numbers doubled within a decade.", "B2", ["doubled", "two times", "ten years"]),
    c("fluctuate considerably", "dao động mạnh", "Visitor numbers fluctuated considerably month by month.", "C1", ["up and down", "every month"]),
    c("rebound", "phục hồi, tăng trở lại", "Bike sales rebounded in 2020.", "C1", ["up again", "again"]),
    c("grow consistently", "tăng trưởng đều", "Internet use grew consistently year on year.", "B2", ["grew every year", "grew", "every year"]),
    s("There was a(n) + adj + rise/fall in + N", "Có một sự tăng/giảm ... về ... (danh từ hóa)", "There was a dramatic rise in the number of cars.", "there was a", "B2", ["went up", "went down", "number of", "grew"]),
    s("N + saw/witnessed + a + adj + noun", "Giai đoạn ... chứng kiến ...", "The period after 2012 witnessed a gradual decline in unemployment.", "witnessed", "C1", ["after", "in 20", "years"]),
    s("..., before + V-ing ...", "..., trước khi ... (nối hai xu hướng)", "The rate climbed rapidly before falling back.", "before", "C1", ["and then", "then", "start", "end"]),
    s("N + rose/fell + from X to Y", "... tăng/giảm từ X lên Y", "Rainfall rose from a low level at the start to a high point at the end.", "from", "B2", ["start", "end", "low", "high"]),
    s("..., reaching/hitting a peak of ...", "..., đạt đỉnh ... (mệnh đề V-ing)", "The figure rose steadily, reaching a peak in 2015.", "reaching", "C2", ["highest", "got to", "point"]),
    s("..., which represented a twofold increase", "..., tức là tăng gấp đôi (mệnh đề which)", "Tourist numbers reached 2 million, which represented a twofold increase.", "which represented", "C2", ["doubled", "two times"]),
  ],
  "1:comparisons": [
    c("considerably higher/more than", "cao/nhiều hơn đáng kể", "Men worked considerably longer hours than women.", "B2", ["more than", "more hours", "much"]),
    c("marginally more popular", "phổ biến hơn một chút", "Coffee was marginally more popular than tea.", "C1", ["a little more", "little more", "popular"]),
    c("twice as high as", "cao gấp đôi", "Bus use was twice as high as train use.", "B2", ["two times"]),
    c("three times as much as", "nhiều gấp ba", "Country X spent three times as much as Country Y.", "B2", ["three times"]),
    c("roughly identical", "gần như giống hệt", "France and Italy recorded roughly identical figures.", "C1", ["almost the same", "the same", "same"]),
    c("their male/female counterparts", "nhóm nam/nữ tương ứng", "Women outlived their male counterparts.", "C1", ["men", "women", "boys", "girls"]),
    c("considerably cheaper", "rẻ hơn đáng kể", "Rice was considerably cheaper than bread.", "B2", ["cheaper"]),
    c("receive more rainfall", "nhận nhiều lượng mưa hơn", "The north received more rainfall than the south.", "B2", ["rain"]),
    c("the older generation", "thế hệ lớn tuổi", "Young people used phones more than the older generation.", "C1", ["old people", "young people"]),
    s("..., whereas ...", "..., trong khi đó ...", "Japan recorded the highest figure, whereas India had the lowest.", "whereas", "B2", ["and", "highest", "lowest"]),
    s("N + exceeded/outnumbered + N", "... vượt / đông hơn ...", "Boys outnumbered girls in science subjects.", "outnumbered", "C1", ["fewer", "more people", "more than"]),
    s("N + was far higher than that of + N", "... cao hơn nhiều so với ... của ... (that of)", "The population of City A was far higher than that of City B.", "that of", "C2", ["had more", "people than", "city"]),
    s("N + was spent in equal measure by ...", "... chi ngang nhau (bị động)", "An identical amount was spent by both countries.", "identical", "C1", ["the same money", "same money", "both"]),
    s("In contrast to + N, ...", "Trái ngược với ..., ...", "In contrast to the first line, the second remained flat.", "in contrast", "C1", ["very different", "different", "two lines"]),
    s("A + was twice/three times as + adj + as + B", "A gấp đôi/ba ... B (so sánh bội số)", "Country X's spending was three times as large as Country Y's.", "times as", "B2", ["times more", "two times", "three times"]),
    s("Not only + did + S + V, but ...", "Không những ... mà còn ... (đảo ngữ)", "Not only did women live longer, but they also visited doctors more.", "not only", "C2", ["longer", "more than"]),
  ],
  "1:proportions": [
    c("account for", "chiếm (tỉ lệ)", "Transport accounted for ten percent of the budget.", "B2", ["percent", "part of money", "the part of", "went to"]),
    c("the lion's share", "phần lớn nhất", "Food took the lion's share of spending.", "C1", ["biggest part", "most of", "biggest"]),
    c("a negligible proportion", "một tỉ lệ không đáng kể", "Only a negligible proportion of people chose bikes.", "C1", ["only a few", "very few", "few"]),
    c("a modest share", "một phần nhỏ", "Health received a modest share of the money.", "B2", ["small part", "a small"]),
    c("roughly a quarter", "khoảng một phần tư", "Roughly a quarter of people lived alone.", "B2", ["quarter", "about"]),
    c("the vast majority", "đại đa số", "The vast majority of people relied on cars.", "B2", ["most people", "most of", "most"]),
    c("two thirds", "hai phần ba", "Two thirds of households owned a car.", "B2", ["two out of three"]),
    c("an equal proportion", "tỉ lệ ngang nhau", "Coal and gas made up an equal proportion.", "C1", ["same size", "the same"]),
    c("just under half", "chưa tới một nửa", "Just under half of the land was farmed.", "B2", ["less than half", "half"]),
    s("N + accounted for + % + of + N", "... chiếm ...% của ...", "Online shopping accounted for 20% of all sales.", "accounted for", "B2", ["percent", "part of", "share"]),
    s("N + made up + the largest proportion of + N", "... chiếm tỉ trọng lớn nhất", "Food made up the largest proportion of spending.", "made up", "B2", ["biggest part", "most of", "same size"]),
    s("The proportion of + N + rose/grew to ...", "Tỉ lệ ... tăng lên ...", "The proportion of elderly people grew considerably.", "the proportion of", "C1", ["part of old", "share of", "got bigger", "grew"]),
    s("N + was derived from + N", "... có nguồn gốc từ ... (bị động)", "Most of the energy was derived from coal.", "derived from", "C1", ["came from"]),
    s("A mere + % + of + N + V", "Chỉ vỏn vẹn ...% ...", "A mere 5% of workers were over 60.", "a mere", "C2", ["very few", "only a few", "few"]),
    s("..., with + N + V-ing ...", "..., trong đó ... (cấu trúc with)", "Most people drove, with only a few choosing bikes.", "with", "C2", ["only", "chose", "liked"]),
  ],
  "1:process": [
    c("harvest the beans", "thu hoạch hạt", "The beans are first harvested by hand.", "B2", ["pick"]),
    c("be packaged/packed into", "được đóng gói vào", "The product is then packaged into boxes.", "B2", ["put it in boxes", "boxes"]),
    c("be distributed to retailers", "được phân phối tới nhà bán lẻ", "Finally, the goods are distributed to retailers.", "C1", ["sell it in shops", "shops", "sell"]),
    c("be refrigerated", "được làm lạnh", "The milk is refrigerated prior to sale.", "C1", ["made cold", "cold"]),
    c("be shredded into fragments", "được cắt vụn thành mảnh", "The plastic is shredded into tiny fragments.", "C1", ["cut into", "small pieces", "pieces"]),
    c("a cyclical process", "quá trình tuần hoàn", "The water cycle is a continuous, cyclical process.", "C1", ["round and round", "again"]),
    c("be collected by", "được thu gom bởi", "Waste is collected by trucks.", "B2", ["taken away", "rubbish"]),
    c("evaporate", "bốc hơi", "Water evaporates into the atmosphere.", "B2", ["goes up into the sky", "sky"]),
    c("be inspected for defects", "được kiểm tra lỗi", "The cans are inspected for defects.", "C1", ["check", "problems"]),
    c("be transported to", "được vận chuyển tới", "The logs are transported to a factory.", "B2", ["take them to", "factory"]),
    c("be heated to a high temperature", "được nung tới nhiệt độ cao", "The mixture is heated to a high temperature.", "B2", ["heat", "hot"]),
    c("be thoroughly cleaned", "được làm sạch kỹ", "The bottles are thoroughly cleaned.", "B2", ["wash"]),
    c("be combined with", "được trộn/kết hợp với", "Sand is combined with water.", "B2", ["mix", "together"]),
    s("N + is/are + V3 (passive)", "Câu bị động (thay They + V)", "The beans are picked and then dried.", " are ", "B2", ["they", "they pick", "they wash", "they cut", "they check", "they heat", "they mix"]),
    s("Once/After + N + has been + V3, ...", "Sau khi ... đã được ..., ...", "Once the bottles have been washed, they are refilled.", "has been", "C1", ["after that", "then", "before"]),
    s("..., after which + clause", "..., sau đó ...", "The mixture is heated, after which it is left to cool.", "after which", "C1", ["after that", "then", "at the end"]),
    s("The process consists of + number + stages", "Quy trình gồm ... giai đoạn", "The process consists of six distinct stages.", "consists of", "B2", ["six steps", "steps", "there are"]),
    s("Prior to + V-ing/N, ...", "Trước khi ..., ...", "Prior to being sold, the milk is refrigerated.", "prior to", "C1", ["before"]),
    s("..., before being + V3", "..., trước khi được ... (V-ing bị động)", "The logs are cut before being transported to the factory.", "before being", "C2", ["and take them", "then", "before"]),
  ],
  "1:map": [
    c("be converted into", "được chuyển đổi thành", "The farmland was converted into a park.", "B2", ["became", "changed into", "was changed"]),
    c("be redeveloped as", "được tái phát triển thành", "The farm was redeveloped as a housing estate.", "C1", ["houses", "changed into"]),
    c("be expanded/extended", "được mở rộng", "The school was extended to the east.", "B2", ["got bigger", "bigger"]),
    c("be reduced in size", "bị thu hẹp", "The car park was reduced in size.", "B2", ["got smaller", "smaller"]),
    c("be cleared/felled", "bị chặt hạ (cây)", "The trees were felled to make way for houses.", "C1", ["cut down", "trees"]),
    c("be demolished", "bị phá bỏ", "The old bridge was demolished.", "B2", ["took away", "taken away"]),
    c("be constructed", "được xây dựng", "A new road was constructed alongside the river.", "B2", ["built", "they built"]),
    c("be adjacent to", "nằm sát cạnh", "The shop is adjacent to the school.", "C1", ["next to"]),
    c("undergo a dramatic transformation", "trải qua sự biến đổi lớn", "The town underwent a dramatic transformation.", "C1", ["very different", "much bigger", "different now"]),
    c("make way for", "nhường chỗ cho", "Trees were removed to make way for housing.", "C1", ["for houses"]),
    s("N + was replaced by + N", "... được thay thế bởi ...", "The farm was replaced by a residential area.", "replaced by", "B2", ["became", "changed into", "took away"]),
    s("N + saw the construction of + N", "... chứng kiến việc xây dựng ...", "The riverside saw the construction of a new road.", "construction of", "C1", ["they built", "built", "there is a"]),
    s("There + has been + a + adj + increase in + N", "Đã có sự gia tăng ... (danh từ hóa)", "There has been a notable increase in shops in the north.", "there has been", "C1", ["more shops", "there are more"]),
    s("N + was/were + V3 + to make way for + N", "... bị ... để nhường chỗ cho ...", "The trees were cut down to make way for houses.", "to make way", "C2", ["for houses", "cut down"]),
    s("Compared with/to + time, ...", "So với ..., ...", "Compared with the past, the town is now far larger.", "compared", "B2", ["now", "different now", "much bigger"]),
  ],
  "1:overview": [
    c("remain the most popular", "vẫn phổ biến nhất", "Cars remained the most popular mode throughout.", "B2", ["always the most", "most popular", "always"]),
    c("an upward trend", "xu hướng tăng", "All the figures showed an upward trend.", "B2", ["all the numbers went up", "went up", "all things"]),
    c("a downward trend", "xu hướng giảm", "Most categories followed a downward trend.", "B2", ["went down", "most things"]),
    c("fluctuate significantly", "biến động đáng kể", "The figures fluctuated significantly.", "C1", ["changed a lot", "a lot"]),
    c("remain relatively stable", "khá ổn định", "The figures remained relatively stable in recent years.", "B2", ["nothing changed", "few changes", "changed much"]),
    c("the most significant change", "thay đổi đáng kể nhất", "The most significant change occurred in Asia.", "C1", ["biggest change", "change was"]),
    c("leisure activities", "hoạt động giải trí", "People spent more on leisure activities.", "B2", ["fun"]),
    c("narrow considerably", "thu hẹp đáng kể", "The gap narrowed considerably.", "C1", ["gap got smaller", "smaller"]),
    c("the urbanisation trend", "xu hướng đô thị hóa", "The charts reveal an urbanisation trend.", "C1", ["moved to cities", "cities"]),
    s("Overall, it is evident that ...", "Nhìn chung, rõ ràng là ...", "Overall, it is evident that every figure increased.", "it is evident", "B2", ["overall", "in general", "easy to see"]),
    s("What stands out is ...", "Điều nổi bật là ...", "What stands out is the dominance of cars.", "what stands out", "C2", ["main thing", "biggest change", "most popular"]),
    s("With the exception of + N, ...", "Ngoại trừ ..., ...", "With the exception of one category, all figures fell.", "with the exception", "C1", ["but one", "most things"]),
    s("A + was consistently + adj-er + than B", "A luôn ... hơn B", "A was consistently larger than B.", "consistently", "B2", ["bigger than", "easy to see", "always"]),
    s("The charts illustrate/reveal + N", "Các biểu đồ minh họa ...", "The two charts reveal a shift from rural to urban living.", "illustrate", "B2", ["charts show", "show"]),
    s("Little change was recorded in + N", "Hầu như không có thay đổi ... (bị động)", "Little change was recorded over the final years.", "little change", "C1", ["nothing changed", "few changes"]),
  ],
  "2:education": [
    c("academic performance", "kết quả học tập", "Play-based learning can boost academic performance.", "B2", ["learn more", "learn"]),
    c("financial literacy", "hiểu biết về tài chính", "Schools should teach financial literacy.", "C1", ["about money", "money"]),
    c("overcrowded classrooms", "lớp học quá đông", "Overcrowded classrooms limit individual attention.", "B2", ["too many students", "classes"]),
    c("exam-related anxiety", "lo âu do thi cử", "Exam-related anxiety affects many students.", "C1", ["worried", "exams", "do not like exams"]),
    c("a heavy workload", "khối lượng bài vở nặng", "A heavy workload leaves little free time.", "B2", ["homework", "too much time"]),
    c("tuition fees", "học phí", "Rising tuition fees deter poorer students.", "B2", ["pay for university", "expensive", "cannot pay"]),
    c("prohibitively expensive", "đắt đến mức không thể chi trả", "University is prohibitively expensive for many.", "C1", ["too expensive", "expensive"]),
    c("single-sex schools", "trường đơn giới", "Some favour single-sex schools.", "C1", ["boys and girls", "study apart"]),
    c("digital literacy", "kỹ năng số", "Pupils need digital literacy.", "C1", ["computers"]),
    c("flexible and accessible", "linh hoạt và dễ tiếp cận", "Online courses are flexible and accessible.", "B2", ["easy", "online learning"]),
    c("play a pivotal role in", "đóng vai trò then chốt", "Teachers play a pivotal role in child development.", "C1", ["very important", "important"]),
    c("be adequately remunerated", "được trả lương xứng đáng", "Teachers should be adequately remunerated.", "C2", ["more money", "get more"]),
    c("a valuable asset", "một tài sản quý giá", "A second language is a valuable asset.", "B2", ["useful", "second language"]),
    s("It is widely argued that ...", "Nhiều người cho rằng ...", "It is widely argued that exams create stress.", "it is widely argued", "B2", ["some people think", "many", "think"]),
    s("Children + should be + taught + N", "Trẻ nên được dạy ... (bị động)", "Children should be taught how to manage money.", "should be taught", "B2", ["should learn", "learn about"]),
    s("Were + S + to V, ...", "Nếu ... (đảo ngữ loại 2)", "Were fees to fall, more students could attend.", "were", "C2", ["cannot pay", "expensive", "should get"]),
    s("N + is + so + adj + that ...", "... quá ... đến mức ...", "Homework is so time-consuming that pupils rarely rest.", "so", "B2", ["too much", "too many", "too expensive"]),
    s("..., which + V ... (non-defining clause)", "..., điều này ... (mệnh đề which)", "Exams are frequent, which leaves students anxious.", "which", "C1", ["because", "make students"]),
    s("The more + S + V, the more + S + V", "Càng ... càng ...", "The more children play, the more they learn.", "the more", "C1", ["learn more when", "when they play"]),
  ],
  "2:environment": [
    c("human activity", "hoạt động của con người", "Global warming is largely driven by human activity.", "B2", ["because of people", "people"]),
    c("global warming", "sự nóng lên toàn cầu", "Global warming is accelerating.", "B2", ["getting hotter", "hotter", "weather"]),
    c("rising global temperatures", "nhiệt độ toàn cầu tăng", "Rising global temperatures threaten crops.", "C1", ["getting hotter", "hotter"]),
    c("air pollution / degrade air quality", "ô nhiễm không khí / làm suy giảm chất lượng không khí", "Car exhaust severely degrades air quality.", "C1", ["air dirty", "dirty", "cars make"]),
    c("deforestation", "nạn phá rừng", "Deforestation destroys wildlife habitats.", "B2", ["cutting trees", "trees"]),
    c("face extinction", "đối mặt nguy cơ tuyệt chủng", "Many species face extinction.", "B2", ["dying out", "disappearing", "animals"]),
    c("endangered species", "loài có nguy cơ tuyệt chủng", "Endangered species need protection.", "B2", ["kinds of animals", "animals"]),
    c("public transport", "giao thông công cộng", "Commuters should switch to public transport.", "B2", ["bus", "buses"]),
    c("pose a serious threat to", "gây mối đe dọa nghiêm trọng tới", "Plastic bags pose a serious threat to marine life.", "C1", ["bad for the sea", "sea", "very bad"]),
    c("single-use plastics", "nhựa dùng một lần", "We should cut down on single-use plastics.", "B2", ["less plastic", "plastic bags", "plastic"]),
    c("food waste", "lãng phí thực phẩm", "Households generate huge amounts of food waste.", "B2", ["throw away", "food"]),
    c("environmentally beneficial", "có lợi cho môi trường", "Recycling is environmentally beneficial.", "C1", ["good for the earth", "recycling"]),
    c("take decisive action", "hành động quyết liệt", "Governments must take decisive action on pollution.", "C1", ["do more", "must", "stop pollution"]),
    c("developing nations", "các nước đang phát triển", "Wealthy nations should support developing nations.", "B2", ["poor countries", "rich countries"]),
    s("N + is largely attributable to + N", "... phần lớn là do ...", "Global warming is largely attributable to human activity.", "attributable to", "C1", ["because of", "because"]),
    s("Unless + clause, ...", "Trừ khi ..., ...", "Unless emissions are cut, temperatures will keep rising.", "unless", "B2", ["getting hotter", "must", "should"]),
    s("It is imperative that + S + V (bare)", "Điều cấp bách là ...", "It is imperative that governments curb pollution.", "it is imperative", "C1", ["must", "should", "governments"]),
    s("Rather than + V-ing, + S + should ...", "Thay vì ..., ... nên ...", "Rather than driving, commuters should take the bus.", "rather than", "B2", ["not drive", "not cars", "not"]),
    s("If current trends continue, ...", "Nếu xu hướng hiện tại tiếp diễn, ...", "If current trends continue, many species will vanish.", "if current trends", "B2", ["dying out", "disappearing", "getting"]),
    s("N + is being + V3 + at an alarming rate", "... đang bị ... với tốc độ đáng báo động (bị động tiếp diễn)", "Forests are being destroyed at an alarming rate.", "alarming rate", "C2", ["dying out", "disappearing", "cutting", "getting hotter"]),
    s("The more ..., the less ...", "Càng ... càng ít ...", "The more we recycle, the less waste we produce.", "the more", "C1", ["less", "recycling", "throw away"]),
  ],
  "2:technology": [
    c("excessive screen time", "thời gian dùng thiết bị quá mức", "Excessive screen time harms children's sleep.", "B2", ["too much", "all the time", "use computers"]),
    c("diagnose illnesses", "chẩn đoán bệnh", "AI helps doctors diagnose illnesses earlier.", "C1", ["find illness", "doctors"]),
    c("technologically challenged / struggle with technology", "gặp khó khăn với công nghệ", "Many elderly people struggle with technology.", "C1", ["find computers hard", "hard", "old people"]),
    c("convenient and time-saving", "tiện lợi và tiết kiệm thời gian", "Online shopping is convenient and time-saving.", "B2", ["easy", "online shopping"]),
    c("gain popularity", "ngày càng phổ biến", "E-commerce has gained popularity.", "B2", ["more popular", "popular"]),
    c("data privacy", "quyền riêng tư dữ liệu", "Data privacy is a growing concern.", "C1", ["personal information", "not safe", "safe online"]),
    c("face-to-face interaction", "giao tiếp trực tiếp", "Face-to-face interaction is declining.", "B2", ["face to face", "talk"]),
    c("smartphone addiction", "nghiện điện thoại", "Smartphone addiction is widespread.", "C1", ["phones all the time", "phones"]),
    c("stay connected", "giữ liên lạc", "Phones help people stay connected.", "B2", ["talk to each other", "help people talk"]),
    c("automation / job displacement", "tự động hóa / mất việc do máy thay", "Automation may lead to job displacement.", "C1", ["robots", "take many jobs", "jobs"]),
    c("mental well-being", "sức khỏe tinh thần", "Social media can damage young people's mental well-being.", "C1", ["sad", "young people"]),
    c("misinformation", "thông tin sai lệch", "The internet is full of misinformation.", "B2", ["wrong information", "information"]),
    c("enhance quality of life", "nâng cao chất lượng cuộc sống", "Technology has enhanced our quality of life.", "C1", ["makes life easier", "life easier", "easier"]),
    s("While it is true that ..., ...", "Mặc dù đúng là ..., ...", "While it is true that technology helps, it also isolates.", "while it is true", "B2", ["help", "easy", "easier"]),
    s("N + is likely to + V", "... có khả năng ...", "Automation is likely to replace many jobs.", "is likely to", "B2", ["will", "robots will"]),
    s("So + adj + is + N + that ...", "... đến mức ... (đảo ngữ)", "So widespread is phone use that people rarely talk face to face.", "so", "C2", ["all the time", "too much", "do not talk"]),
    s("N + has made it + adj + for sb + to V", "... đã khiến việc ... trở nên ...", "Technology has made it easier for people to communicate.", "has made it", "C1", ["makes life easier", "help people", "easy"]),
    s("There is growing concern that ...", "Ngày càng có lo ngại rằng ...", "There is growing concern that personal data is not secure.", "growing concern", "C1", ["not safe", "sad", "wrong information"]),
    s("Not only does + S + V, but ...", "Không những ... mà còn ...", "Not only do computers save time, but they also help doctors.", "not only", "C2", ["help", "find"]),
  ],
  "2:work": [
    c("value employee feedback", "coi trọng ý kiến nhân viên", "Managers should value employee feedback.", "C1", ["listen to workers", "bosses"]),
    c("secure employment", "tìm được việc làm ổn định", "Graduates struggle to secure employment.", "C1", ["find a job", "find jobs", "cannot find"]),
    c("graduate unemployment", "thất nghiệp sau tốt nghiệp", "Graduate unemployment is rising.", "C1", ["after university"]),
    c("work remotely", "làm việc từ xa", "Many employees now work remotely.", "B2", ["from home", "stay at home"]),
    c("equal pay", "trả lương bình đẳng", "Men and women deserve equal pay.", "B2", ["same pay", "the same pay"]),
    c("gender pay gap", "chênh lệch lương theo giới", "The gender pay gap must be closed.", "C1", ["men and women", "women should"]),
    c("job satisfaction", "sự hài lòng trong công việc", "Job satisfaction matters more than salary.", "B2", ["not the most important", "money is not"]),
    c("switch careers", "chuyển đổi nghề nghiệp", "Young people switch careers frequently.", "B2", ["change jobs"]),
    c("poorly paid", "lương thấp", "Some vital jobs are poorly paid.", "B2", ["pay too little", "too little"]),
    c("be self-employed", "tự làm chủ", "Some people prefer to be self-employed.", "B2", ["work for themselves", "themselves"]),
    c("excessive working hours", "giờ làm việc quá dài", "Excessive working hours damage health.", "B2", ["long hours", "too long", "working long"]),
    c("be detrimental to", "gây hại cho", "Overwork is detrimental to health.", "C1", ["bad for health", "bad for"]),
    s("It is essential that + S + V (bare)", "Điều cần thiết là ...", "It is essential that employers listen to staff.", "it is essential", "C1", ["should"]),
    s("Should + S + V, ...", "Nếu ... (đảo ngữ loại 1)", "Should employers offer flexibility, staff would stay longer.", "should", "C2", ["should get", "should listen"]),
    s("It is increasingly difficult for + N + to V", "Ngày càng khó để ... ", "It is increasingly difficult for graduates to find work.", "increasingly difficult", "C1", ["hard to find", "cannot find", "easily"]),
    s("There has been a shift towards + V-ing/N", "Đã có sự chuyển dịch sang ...", "There has been a shift towards remote working.", "shift towards", "C1", ["now", "work from home", "more often"]),
    s("N + is far from + the most + adj", "... hoàn toàn không phải ... nhất", "Salary is far from the most important factor.", "far from", "C2", ["not the most", "is not"]),
    s("N + can take a toll on + N", "... gây tổn hại cho ...", "Long hours can take a toll on employees' health.", "take a toll", "C1", ["bad for health", "bad for"]),
  ],
  "2:health": [
    c("be prohibitively expensive", "đắt đỏ quá mức", "Medical care is prohibitively expensive.", "C1", ["cost a lot", "doctors cost"]),
    c("processed/junk food", "thực phẩm chế biến sẵn", "Junk food is high in fat and sugar.", "B2", ["fast food"]),
    c("be detrimental to health", "có hại cho sức khỏe", "Fast food is detrimental to health.", "C1", ["bad for you", "bad"]),
    c("lead to obesity", "dẫn đến béo phì", "Fast food can lead to obesity.", "B2", ["fat", "makes people fat"]),
    c("obesity rates", "tỉ lệ béo phì", "Obesity rates have soared.", "B2", ["too fat", "many people are"]),
    c("additional funding", "nguồn kinh phí bổ sung", "Hospitals require additional funding.", "B2", ["need more money", "more money"]),
    c("elderly care", "chăm sóc người cao tuổi", "Elderly care needs investment.", "B2", ["old people", "more care"]),
    c("sleep deprivation", "thiếu ngủ", "Sleep deprivation harms concentration.", "C1", ["do not sleep", "sleep"]),
    c("regular physical activity", "hoạt động thể chất thường xuyên", "People should take regular physical activity.", "B2", ["exercise", "do more exercise"]),
    c("premature death", "tử vong sớm", "Smoking causes premature death.", "C1", ["kills", "smoking"]),
    c("be banned in public places", "bị cấm nơi công cộng", "Smoking should be banned in public places.", "B2", ["stopped in public", "public places"]),
    c("chronic stress", "căng thẳng kéo dài", "Chronic stress weakens the immune system.", "C1", ["stress", "worry and pressure", "pressure"]),
    c("impose a tax on", "áp thuế lên", "The state should impose a tax on sugary drinks.", "B2", ["cost more", "sugar drinks"]),
    c("promote healthy eating", "khuyến khích ăn uống lành mạnh", "Governments should promote healthy eating.", "B2", ["eat well", "tell people"]),
    s("N + is a leading cause of + N", "... là nguyên nhân hàng đầu của ...", "Smoking is a leading cause of premature death.", "leading cause", "C1", ["kills", "makes people", "makes"]),
    s("N + can give rise to + N", "... có thể dẫn đến ...", "Chronic stress can give rise to illness.", "give rise to", "C1", ["makes people ill", "make people sick", "makes"]),
    s("It would be advisable for + N + to V", "Sẽ là khôn ngoan nếu ...", "It would be advisable for governments to tax sugar.", "advisable", "C1", ["should"]),
    s("Were + N + to V, ...", "Nếu ... (đảo ngữ loại 2)", "Were sugary drinks to cost more, consumption would fall.", "were", "C2", ["cost more", "should"]),
    s("N + is + increasingly + adj", "... ngày càng ...", "Obesity is increasingly common.", "increasingly", "B2", ["now", "too fat"]),
    s("Not only does + N + V, but it also ...", "Không những ... mà còn ...", "Not only does fast food cause obesity, but it also raises heart risks.", "not only", "C2", ["bad", "fat"]),
  ],
  "2:society": [
    c("overcrowded / densely populated", "quá tải / đông dân", "Cities are becoming densely populated.", "B2", ["crowded"]),
    c("the nuclear family", "gia đình hạt nhân", "The nuclear family is shrinking.", "C1", ["families are smaller", "smaller"]),
    c("quality time", "thời gian chất lượng", "Families rarely spend quality time together.", "B2", ["spend much time", "time together"]),
    c("unaffordable housing", "nhà ở vượt khả năng chi trả", "Unaffordable housing pushes young people out.", "C1", ["too expensive", "houses"]),
    c("single-person households", "hộ gia đình một người", "Single-person households are rising.", "C1", ["living alone", "live alone", "alone"]),
    c("rural-to-urban migration", "di cư từ nông thôn ra thành thị", "Rural-to-urban migration is accelerating.", "C1", ["move to big cities", "big cities", "move"]),
    c("brain drain", "chảy máu chất xám", "Brain drain weakens poorer nations.", "C1", ["other countries"]),
    c("the elderly", "người cao tuổi", "The elderly increasingly live alone.", "B2", ["old people"]),
    c("traditional customs die out", "phong tục truyền thống mai một", "Many traditional customs are dying out.", "B2", ["traditions", "going away"]),
    c("a sense of community", "tinh thần cộng đồng", "A sense of community is declining.", "B2", ["neighbours", "community", "help others"]),
    c("the gap between rich and poor", "khoảng cách giàu nghèo", "The gap between rich and poor is widening.", "B2", ["rich and poor", "very different"]),
    c("income inequality", "bất bình đẳng thu nhập", "Income inequality fuels tension.", "C1", ["rich", "poor"]),
    c("erode local culture", "làm xói mòn văn hóa địa phương", "Mass tourism can erode local culture.", "C1", ["tourism", "changes local culture"]),
    s("There is a growing tendency for + N + to V", "Ngày càng có xu hướng ...", "There is a growing tendency for people to live alone.", "growing tendency", "C1", ["more common", "more now", "now", "move"]),
    s("N + is becoming + increasingly + adj", "... ngày càng ...", "Living alone is becoming increasingly common.", "increasingly", "B2", ["getting", "more common", "now"]),
    s("Compared with + past, ...", "So với trước đây, ...", "Compared with previous generations, families are smaller.", "compared with", "B2", ["than before", "before", "less"]),
    s("N + is a major contributor to + N", "... góp phần lớn vào ...", "Tourism is a major contributor to cultural change.", "contributor to", "C1", ["changes", "change"]),
    s("Little do + S + realise + that ...", "Ít ai nhận ra rằng ... (đảo ngữ)", "Little do people realise how isolated the elderly are.", "little do", "C2", ["alone", "less"]),
    s("It is incumbent upon + N + to V", "... có trách nhiệm phải ...", "It is incumbent upon citizens to support their community.", "incumbent", "C2", ["should help", "should"]),
  ],
  "2:crime": [
    c("CCTV surveillance", "giám sát bằng camera", "CCTV surveillance deters offenders.", "B2", ["cameras"]),
    c("a deterrent to crime", "biện pháp răn đe tội phạm", "Harsh sentences act as a deterrent to crime.", "C1", ["stop crime", "make people afraid", "afraid"]),
    c("cybercrime", "tội phạm mạng", "Cybercrime is on the rise.", "B2", ["crime on the internet", "internet"]),
    c("vocational training", "đào tạo nghề", "Inmates should receive vocational training.", "C1", ["learn a job"]),
    c("drug-related crime", "tội phạm liên quan đến ma túy", "Drug-related crime is widespread.", "C1", ["drugs"]),
    c("harsh sentences", "án phạt nặng", "Harsh sentences may not reduce crime.", "B2", ["hard punishments", "punishments"]),
    c("moral values", "giá trị đạo đức", "Parents should instil moral values.", "B2", ["right and wrong", "teach children"]),
    c("feel vulnerable", "cảm thấy dễ bị tổn thương", "Many residents feel vulnerable after dark.", "C1", ["unsafe", "at night"]),
    c("reoffend / recidivism", "tái phạm", "Many former prisoners reoffend.", "C1", ["crime again", "again"]),
    c("shoplifting", "trộm cắp ở cửa hàng", "Shoplifting is increasingly common.", "B2", ["stealing", "from shops"]),
    c("police presence", "sự hiện diện của cảnh sát", "A visible police presence reassures the public.", "B2", ["police", "on the streets"]),
    c("young offenders", "người phạm tội trẻ tuổi", "Young offenders need rehabilitation.", "B2", ["young criminals", "young people do crime"]),
    c("poverty is a root cause", "nghèo đói là nguyên nhân gốc rễ", "Poverty is a root cause of youth crime.", "C1", ["because they are poor", "poor"]),
    s("Rather than + V-ing, ...", "Thay vì ..., ...", "Rather than simply punishing offenders, prisons should rehabilitate them.", "rather than", "B2", ["should learn", "should not", "does not stop"]),
    s("N + is often driven by + N", "... thường bắt nguồn từ ...", "Youth crime is often driven by poverty.", "driven by", "C1", ["because", "cause"]),
    s("There is little evidence that ...", "Có rất ít bằng chứng rằng ...", "There is little evidence that prison prevents reoffending.", "little evidence", "C1", ["does not stop", "may make"]),
    s("Not until + clause + will/did + S + V", "Mãi đến khi ... mới ...", "Not until poverty is tackled will crime fall.", "not until", "C2", ["because", "stop"]),
    s("It has been suggested that ...", "Có ý kiến cho rằng ...", "It has been suggested that violent games encourage aggression.", "it has been suggested", "B2", ["may make", "should"]),
    s("N + is + on the rise", "... đang gia tăng", "Online fraud is on the rise.", "on the rise", "B2", ["growing", "common"]),
  ],
  "2:media": [
    c("advertising aimed at children", "quảng cáo nhắm vào trẻ em", "Advertising aimed at children should be banned.", "C1", ["ads for children", "children should be stopped"]),
    c("consumerism / impulse buying", "chủ nghĩa tiêu dùng / mua sắm bốc đồng", "Ads fuel impulse buying.", "C1", ["buy things", "do not need"]),
    c("excessive television viewing", "xem TV quá nhiều", "Excessive television viewing harms children.", "B2", ["too much tv", "watch"]),
    c("positive role models", "hình mẫu tích cực", "Celebrities can be positive role models.", "B2", ["role models", "famous people"]),
    c("raise cultural awareness", "nâng cao hiểu biết văn hóa", "Films can raise cultural awareness.", "C1", ["other cultures", "teach people"]),
    c("advertising revenue", "doanh thu quảng cáo", "Free news sites rely on advertising revenue.", "C1", ["make money", "ads to make"]),
    c("invade the privacy of", "xâm phạm đời tư", "Journalists should not invade celebrities' privacy.", "C1", ["follow famous", "journalists"]),
    c("negative news coverage", "đưa tin tiêu cực", "Negative news coverage dominates TV.", "C1", ["bad news"]),
    c("be easily influenced by", "dễ bị ảnh hưởng bởi", "Viewers are easily influenced by what they see.", "B2", ["believe what", "believe"]),
    c("print media", "báo in", "Print media is in decline.", "B2", ["newspapers"]),
    c("spread rapidly", "lan truyền nhanh chóng", "News spreads rapidly via social media.", "B2", ["spreads news fast", "fast"]),
    c("fake news / misinformation", "tin giả / thông tin sai lệch", "Fake news is rife online.", "B2", ["not true", "news on the internet"]),
    c("media censorship", "kiểm duyệt truyền thông", "Media censorship limits free speech.", "C1", ["control the media", "control"]),
    s("It could be argued that ...", "Có thể lập luận rằng ...", "It could be argued that ads exploit children.", "could be argued", "B2", ["should", "make people"]),
    s("N + should be + prohibited/banned", "... nên bị cấm (bị động)", "Advertising aimed at children should be prohibited.", "should be prohibited", "B2", ["should be stopped", "stopped"]),
    s("Such is + N + that ...", "... lớn đến mức ...", "Such is the influence of TV that viewers rarely question it.", "such is", "C2", ["believe", "too much", "hours"]),
    s("N + is + in decline", "... đang suy giảm", "Newspaper readership is in decline.", "in decline", "B2", ["fewer", "now"]),
    s("N + is heavily reliant on + N", "... phụ thuộc nhiều vào ...", "Free news websites are heavily reliant on advertising.", "reliant on", "C1", ["need ads", "need"]),
    s("N + encourage(s) + sb + to V", "... khuyến khích ai đó ...", "Ads encourage consumers to buy unnecessary goods.", "encourage", "B2", ["make people buy", "make"]),
  ],
};

const norm = (x: string) => ` ${x.toLowerCase().replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim()} `;

/** Return the cue the item matches in the source sentence (longest first), or null. */
export function matchedCue(item: ToolItem, source: string): string | null {
  const src = norm(source);
  const hits = item.cues.filter((cue) => src.includes(norm(cue))).sort((a, b) => b.length - a.length);
  return hits[0] ?? null;
}

/** Pick the most relevant items for this sentence: up to `perKind` per column, ranked by cue match. */
export function pickToolkit(toolKey: string, source: string, perKind = 2): ToolItem[] {
  const pool = PARA_TOOLKIT[toolKey] ?? [];
  const score = (i: ToolItem) => {
    const src = norm(source);
    return i.cues.reduce((n, cue) => (src.includes(norm(cue)) ? n + 1 + cue.split(" ").length : n), 0);
  };
  const out: ToolItem[] = [];
  for (const kind of ["collocation", "structure"] as ToolKind[]) {
    const ranked = pool.filter((i) => i.kind === kind).map((i, idx) => ({ i, idx, sc: score(i) }))
      .sort((a, b) => b.sc - a.sc || a.idx - b.idx);
    out.push(...ranked.slice(0, perKind).map((r) => r.i));
  }
  return out;
}

/** Case-insensitive check whether the attempt uses the item (structure uses `match`). */
export function toolUsed(item: ToolItem, attempt: string): boolean {
  const a = attempt.toLowerCase();
  if (!a.trim()) return false;
  const key = (item.match ?? item.en.split("/")[0]).toLowerCase().replace(/\s+/g, " ").trim();
  if (item.kind === "structure") return new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(a);
  const words = key.replace(/\(.*?\)/g, "").split(" ").filter((w) => w.length > 2 && !["the", "and", "for", "sb"].includes(w));
  return words.every((w) => a.includes(w.slice(0, Math.max(4, w.length - 2))));
}
