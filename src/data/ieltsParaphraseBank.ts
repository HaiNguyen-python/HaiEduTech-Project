/**
 * @file ieltsParaphraseBank.ts
 * @description Low-level (A2-B1) sentences with B2/C1/C2 model paraphrases for IELTS Writing.
 */
import { RAW_EXTRA } from "./ieltsParaphraseBankExtra";
export type ParaLevel = "B2" | "C1" | "C2";
export interface ParaphraseItem {
  id: string;
  task: 1 | 2;
  topic: string;
  source: string;
  vi: string;
  techniques: string[];
  models: Record<ParaLevel, string>;
}

export const PARA_TOPICS: Record<1 | 2, { key: string; en: string; vi: string }[]> = {
  1: [
    { key: "trends", en: "Trends", vi: "Xu hướng" },
    { key: "comparisons", en: "Comparisons", vi: "So sánh" },
    { key: "proportions", en: "Proportions", vi: "Tỉ lệ" },
    { key: "process", en: "Process", vi: "Quy trình" },
    { key: "map", en: "Map", vi: "Bản đồ" },
    { key: "overview", en: "Overview", vi: "Tổng quan" },
  ],
  2: [
    { key: "education", en: "Education", vi: "Giáo dục" },
    { key: "environment", en: "Environment", vi: "Môi trường" },
    { key: "technology", en: "Technology", vi: "Công nghệ" },
    { key: "work", en: "Work", vi: "Công việc" },
    { key: "health", en: "Health", vi: "Sức khỏe" },
    { key: "society", en: "Society", vi: "Xã hội" },
    { key: "crime", en: "Crime", vi: "Tội phạm" },
    { key: "media", en: "Media", vi: "Truyền thông" },
  ],
};

type Row = [string, string, string, string, string, string];
// [source, vi, B2, C1, C2, techniques comma list]
const RAW: Record<string, Row[]> = {
  "1:trends": [
    ["The number of cars went up a lot.", "Số lượng ô tô tăng nhiều.", "The number of cars increased significantly.", "There was a significant increase in the number of cars.", "Car ownership witnessed a dramatic surge over the period.", "synonym,nominalisation"],
    ["Sales went down a little in 2010.", "Doanh số giảm nhẹ năm 2010.", "Sales decreased slightly in 2010.", "A slight decline in sales was recorded in 2010.", "Sales dipped marginally in 2010.", "synonym,passive"],
    ["The price stayed the same for five years.", "Giá giữ nguyên trong năm năm.", "The price remained stable for five years.", "The price remained unchanged over a five-year span.", "Prices plateaued for half a decade.", "synonym"],
    ["Visitors went up and down every month.", "Lượng khách lên xuống mỗi tháng.", "The number of visitors fluctuated every month.", "Visitor numbers fluctuated considerably from month to month.", "Visitor figures were highly volatile on a monthly basis.", "synonym,word form"],
    ["The rate went up fast and then went down.", "Tỉ lệ tăng nhanh rồi giảm.", "The rate rose quickly and then fell.", "The rate rose sharply before falling back.", "After a steep climb, the rate subsequently receded.", "synonym,clause"],
    ["Use of the internet grew every year.", "Việc dùng internet tăng mỗi năm.", "Internet use grew steadily every year.", "Internet usage grew steadily year on year.", "Internet usage expanded relentlessly year on year.", "synonym,collocation"],
    ["The number got to its highest point in 2015.", "Con số đạt đỉnh năm 2015.", "The number reached its highest point in 2015.", "The figure peaked in 2015.", "The figure reached a pinnacle in 2015, before tapering off.", "synonym"],
    ["Oil use dropped very much after 2000.", "Lượng dầu dùng giảm mạnh sau 2000.", "Oil consumption dropped sharply after 2000.", "Oil consumption plummeted after 2000.", "The post-2000 period saw oil consumption plummet.", "synonym,nominalisation"],
  ],
  "1:comparisons": [
    ["Men worked more hours than women.", "Đàn ông làm nhiều giờ hơn phụ nữ.", "Men worked longer hours than women did.", "Men worked considerably longer hours than their female counterparts.", "Men's working hours far exceeded those of women.", "comparative,synonym"],
    ["City A had more people than City B.", "Thành phố A đông dân hơn B.", "City A had a larger population than City B.", "City A was more populous than City B.", "City A's population dwarfed that of City B.", "word form,synonym"],
    ["Both countries spent the same money.", "Cả hai nước chi số tiền như nhau.", "Both countries spent the same amount of money.", "Both countries spent an identical amount.", "Expenditure in the two nations was virtually identical.", "nominalisation"],
    ["Japan was the highest and India was the lowest.", "Nhật cao nhất, Ấn Độ thấp nhất.", "Japan had the highest figure, while India had the lowest.", "Japan recorded the highest figure, whereas India recorded the lowest.", "Japan topped the table, with India at the opposite end of the spectrum.", "contrast linker,collocation"],
    ["Bus use was two times more than train use.", "Xe buýt dùng gấp đôi tàu.", "Bus use was twice as high as train use.", "Buses were used twice as often as trains.", "Bus ridership was double that of rail.", "comparative"],
    ["Young people used phones more than old people.", "Người trẻ dùng điện thoại nhiều hơn người già.", "Young people used phones more frequently than older people.", "Phone usage was markedly higher among younger people than among the elderly.", "Younger users were considerably more reliant on phones than the elderly.", "nominalisation,collocation"],
    ["Coffee was a little more popular than tea.", "Cà phê phổ biến hơn trà một chút.", "Coffee was slightly more popular than tea.", "Coffee was marginally more popular than tea.", "Coffee narrowly outstripped tea in popularity.", "synonym"],
    ["The two lines were very different.", "Hai đường rất khác nhau.", "The two lines showed very different patterns.", "The two lines followed markedly different trajectories.", "The two lines diverged sharply in their trajectories.", "collocation"],
  ],
  "1:proportions": [
    ["Half of the students liked sport.", "Một nửa học sinh thích thể thao.", "Fifty percent of the students liked sport.", "Half of the students expressed a preference for sport.", "Sport appealed to precisely half of the student body.", "nominalisation"],
    ["Most people used cars.", "Hầu hết mọi người dùng ô tô.", "The majority of people used cars.", "The vast majority of people relied on cars.", "Cars were the overwhelming choice of transport.", "synonym,collocation"],
    ["A small part of the money went to health.", "Phần nhỏ tiền dành cho y tế.", "A small proportion of the money was spent on health.", "Only a fraction of the budget was allocated to health.", "Health received a mere fraction of the budget.", "passive,synonym"],
    ["About a quarter of people lived alone.", "Khoảng một phần tư sống một mình.", "Roughly 25% of people lived alone.", "Approximately a quarter of the population lived alone.", "Single-person households accounted for roughly a quarter of the total.", "nominalisation"],
    ["Food was the biggest part of spending.", "Thực phẩm là phần chi lớn nhất.", "Food made up the largest part of spending.", "Food accounted for the largest share of expenditure.", "Food constituted the lion's share of expenditure.", "collocation"],
    ["Only a few people chose bikes.", "Chỉ vài người chọn xe đạp.", "Only a small number of people chose bicycles.", "Cycling was chosen by only a small minority.", "Cycling attracted a negligible minority.", "passive,synonym"],
    ["Coal and gas were the same size.", "Than và khí bằng nhau.", "Coal and gas had equal shares.", "Coal and gas represented equal proportions.", "Coal and gas were evenly matched in share.", "collocation"],
    ["The part of old people got bigger.", "Tỉ lệ người già lớn hơn.", "The proportion of elderly people increased.", "The share of older people rose noticeably.", "The elderly came to constitute an ever larger share.", "synonym,nominalisation"],
  ],
  "1:process": [
    ["First they pick the beans.", "Đầu tiên họ hái hạt.", "First, the beans are picked.", "The process begins with the beans being harvested.", "The process commences with the harvesting of the beans.", "passive,nominalisation"],
    ["Then they wash the bottles.", "Sau đó họ rửa chai.", "Then the bottles are washed.", "The bottles are subsequently washed.", "The bottles subsequently undergo thorough washing.", "passive,linker"],
    ["They heat the mix to make it hot.", "Họ đun nóng hỗn hợp.", "The mixture is heated.", "The mixture is heated to a high temperature.", "The mixture is subjected to intense heat.", "passive,collocation"],
    ["After that they put it in boxes.", "Sau đó họ cho vào hộp.", "After that, it is packed into boxes.", "Once cooled, the product is packaged into boxes.", "Having cooled, the product is packaged for distribution.", "participle clause,passive"],
    ["The water goes up into the sky.", "Nước bốc lên trời.", "The water rises into the atmosphere.", "Water evaporates and rises into the atmosphere.", "Water evaporates, ascending into the atmosphere.", "synonym,participle clause"],
    ["They cut the trees and take them to the factory.", "Họ chặt cây và chở tới nhà máy.", "The trees are cut down and taken to the factory.", "Trees are felled and transported to the mill.", "Once felled, the timber is transported to the mill.", "passive,synonym"],
    ["There are six steps in the process.", "Quy trình có sáu bước.", "The process has six stages.", "The process comprises six distinct stages.", "The process consists of six discrete stages.", "synonym"],
    ["At the end they sell it in shops.", "Cuối cùng họ bán ở cửa hàng.", "Finally, it is sold in shops.", "The final stage involves the product being sold in shops.", "The process culminates in the product being retailed.", "passive,nominalisation"],
  ],
  "1:map": [
    ["They built a new road.", "Họ xây đường mới.", "A new road was built.", "A new road was constructed.", "A new road was laid through the area.", "passive,synonym"],
    ["The trees were cut down for houses.", "Cây bị chặt để làm nhà.", "The trees were removed to make space for houses.", "The woodland was cleared to make way for housing.", "The woodland gave way to a residential area.", "collocation"],
    ["The town got much bigger.", "Thị trấn lớn hơn nhiều.", "The town expanded considerably.", "The town underwent considerable expansion.", "The town experienced extensive urban sprawl.", "synonym,nominalisation"],
    ["The farm became a park.", "Nông trại thành công viên.", "The farm was turned into a park.", "The farmland was converted into a park.", "The farmland was transformed into recreational parkland.", "passive,synonym"],
    ["The shop is next to the school.", "Cửa hàng cạnh trường.", "The shop is located next to the school.", "The shop is situated adjacent to the school.", "The shop lies adjacent to the school.", "synonym"],
    ["They took away the old bridge.", "Họ dỡ cầu cũ.", "The old bridge was removed.", "The old bridge was demolished.", "The old bridge was demolished and replaced.", "passive,synonym"],
    ["The car park got smaller.", "Bãi đỗ xe nhỏ lại.", "The car park was reduced in size.", "The car park was scaled down.", "The car park was significantly downsized.", "passive,synonym"],
    ["There are more shops now in the north.", "Phía bắc nay nhiều cửa hàng hơn.", "More shops have been built in the north.", "The north has seen a proliferation of shops.", "The northern sector has become heavily commercialised.", "nominalisation,word form"],
  ],
  "1:overview": [
    ["Overall, all things went up.", "Nhìn chung mọi thứ đều tăng.", "Overall, all the figures increased.", "Overall, every category saw an upward trend.", "Overall, an upward trajectory is evident across all categories.", "collocation"],
    ["The main thing is that cars were most popular.", "Điểm chính là ô tô phổ biến nhất.", "Overall, cars were the most popular choice.", "It is clear that cars were by far the most popular option.", "What stands out is the dominance of the car.", "cleft,nominalisation"],
    ["In general, the numbers changed a lot.", "Nhìn chung con số thay đổi nhiều.", "In general, the numbers changed significantly.", "In general, the figures underwent considerable change.", "Broadly speaking, the figures were subject to marked change.", "collocation"],
    ["It is easy to see that A was bigger than B.", "Dễ thấy A lớn hơn B.", "It is clear that A was larger than B.", "It is evident that A consistently exceeded B.", "A consistently outstripped B throughout the period.", "synonym"],
    ["Most things went down but one went up.", "Hầu hết giảm nhưng một cái tăng.", "Most figures fell, but one rose.", "While most figures declined, one category bucked the trend.", "With the notable exception of one category, the figures declined.", "contrast linker,idiom"],
    ["The two charts show that people moved to cities.", "Hai biểu đồ cho thấy người dân chuyển lên thành phố.", "The charts show that people moved to cities.", "The charts illustrate a clear shift towards urban living.", "The charts reveal a pronounced migration towards urban centres.", "nominalisation,synonym"],
    ["Overall, there were few changes.", "Nhìn chung ít thay đổi.", "Overall, there was little change.", "Overall, the figures remained relatively stable.", "Overall, the picture remained largely static.", "synonym"],
    ["Overall, the gap got smaller.", "Nhìn chung khoảng cách nhỏ lại.", "Overall, the gap became smaller.", "Overall, the gap narrowed over the period.", "Overall, the disparity narrowed considerably.", "synonym"],
  ],
  "2:education": [
    ["Students should learn computers at school.", "Học sinh nên học máy tính ở trường.", "Students should be taught computer skills at school.", "Schools should equip students with digital skills.", "It is imperative that schools equip learners with digital literacy.", "passive,synonym"],
    ["University is too expensive for many people.", "Đại học quá đắt với nhiều người.", "University education is unaffordable for many people.", "Tertiary education remains financially out of reach for many.", "For many, the cost of tertiary education is prohibitive.", "synonym,word form"],
    ["Teachers are very important for children.", "Giáo viên rất quan trọng với trẻ.", "Teachers play an important role in children's development.", "Teachers play a pivotal role in shaping children's development.", "Few factors shape a child's development as profoundly as teachers do.", "collocation,inversion"],
    ["Online learning is good because it is easy.", "Học online tốt vì tiện.", "Online learning is beneficial because it is convenient.", "Online learning is advantageous owing to its convenience.", "The appeal of online learning lies chiefly in its convenience.", "nominalisation,synonym"],
    ["Many students do not like exams.", "Nhiều học sinh không thích thi.", "Many students dislike examinations.", "Examinations are a source of anxiety for many students.", "For many learners, examinations are a considerable source of anxiety.", "nominalisation"],
    ["Children learn more when they play.", "Trẻ học nhiều hơn khi chơi.", "Children learn more effectively through play.", "Play-based learning tends to be more effective for children.", "Children arguably learn most effectively through play.", "word form,hedging"],
    ["Some people think boys and girls should study apart.", "Một số người nghĩ nam nữ nên học riêng.", "Some people believe that boys and girls should be educated separately.", "It is sometimes argued that single-sex education is preferable.", "Proponents of single-sex schooling contend that it benefits both genders.", "passive,nominalisation"],
    ["Homework takes too much time.", "Bài tập về nhà tốn quá nhiều thời gian.", "Homework is too time-consuming.", "Excessive homework consumes a disproportionate amount of time.", "Excessive homework encroaches upon children's leisure time.", "word form,collocation"],
  ],
  "2:environment": [
    ["Cars make the air dirty.", "Ô tô làm ô nhiễm không khí.", "Cars cause air pollution.", "Vehicle emissions are a major cause of air pollution.", "Vehicle emissions are a principal contributor to deteriorating air quality.", "nominalisation,synonym"],
    ["We should use less plastic.", "Ta nên dùng ít nhựa hơn.", "People should reduce their use of plastic.", "Plastic consumption should be curbed.", "There is a pressing need to curb plastic consumption.", "passive,collocation"],
    ["The weather is getting hotter because of people.", "Thời tiết nóng lên do con người.", "Global temperatures are rising because of human activity.", "Human activity is largely responsible for rising global temperatures.", "Rising global temperatures are attributable largely to human activity.", "word form,collocation"],
    ["Governments must do more to stop pollution.", "Chính phủ phải làm nhiều hơn để ngăn ô nhiễm.", "Governments must take more action to reduce pollution.", "Governments must take decisive action to tackle pollution.", "Only through decisive government action can pollution be tackled.", "collocation,inversion"],
    ["Many animals are dying out.", "Nhiều loài đang tuyệt chủng.", "Many species are becoming extinct.", "Numerous species face the threat of extinction.", "Countless species are on the brink of extinction.", "synonym,idiom"],
    ["Recycling is good for the earth.", "Tái chế tốt cho trái đất.", "Recycling benefits the environment.", "Recycling is highly beneficial for the environment.", "Recycling yields substantial environmental benefits.", "word form,collocation"],
    ["Cutting trees is very bad.", "Chặt cây rất tệ.", "Cutting down forests is very harmful.", "Deforestation has devastating consequences.", "Deforestation inflicts irreparable damage on ecosystems.", "nominalisation,collocation"],
    ["People should use buses, not cars.", "Nên đi xe buýt thay ô tô.", "People should use public transport instead of cars.", "Commuters should be encouraged to switch to public transport.", "Encouraging a modal shift towards public transport is essential.", "passive,nominalisation"],
  ],
  "2:technology": [
    ["Phones help people talk to each other.", "Điện thoại giúp mọi người liên lạc.", "Mobile phones help people communicate.", "Mobile phones facilitate communication.", "Mobile phones have revolutionised the way people communicate.", "synonym,nominalisation"],
    ["Children use computers too much.", "Trẻ em dùng máy tính quá nhiều.", "Children spend too much time on computers.", "Children spend an excessive amount of time in front of screens.", "Excessive screen time has become endemic among children.", "collocation"],
    ["Robots will take people's jobs.", "Robot sẽ lấy việc của con người.", "Robots will replace many workers.", "Automation is likely to displace many workers.", "Automation threatens to render many jobs obsolete.", "synonym,hedging"],
    ["The internet has a lot of wrong information.", "Internet có nhiều thông tin sai.", "The internet contains a great deal of false information.", "Misinformation is widespread online.", "The internet is rife with misinformation.", "nominalisation,idiom"],
    ["Technology makes life easier.", "Công nghệ làm cuộc sống dễ hơn.", "Technology makes everyday life more convenient.", "Technology has greatly simplified everyday life.", "Technological advances have streamlined almost every aspect of daily life.", "synonym"],
    ["People do not talk face to face much now.", "Giờ người ta ít nói chuyện trực tiếp.", "People communicate face to face less often now.", "Face-to-face interaction has declined considerably.", "Face-to-face interaction has been eroded by digital communication.", "nominalisation,passive"],
    ["Social media can make young people sad.", "Mạng xã hội có thể khiến người trẻ buồn.", "Social media can make young people unhappy.", "Social media can have a detrimental effect on young people's wellbeing.", "Social media may take a heavy toll on young people's mental health.", "collocation,hedging"],
    ["Online shopping is more popular than before.", "Mua sắm online phổ biến hơn trước.", "Online shopping has become more popular.", "Online shopping has gained considerable popularity.", "E-commerce has enjoyed meteoric growth in recent years.", "collocation,synonym"],
  ],
  "2:work": [
    ["Many people work from home now.", "Nhiều người giờ làm ở nhà.", "Many people now work remotely.", "Remote working has become increasingly common.", "Remote working has become the norm rather than the exception.", "synonym,idiom"],
    ["Money is not the most important thing in a job.", "Tiền không phải điều quan trọng nhất trong công việc.", "Salary is not the most important aspect of a job.", "Salary is by no means the sole determinant of job satisfaction.", "Far from being paramount, salary is only one facet of job satisfaction.", "collocation,fronting"],
    ["Young people change jobs a lot.", "Người trẻ đổi việc nhiều.", "Young people change jobs frequently.", "Young people tend to switch jobs frequently.", "Frequent job-hopping is characteristic of younger workers.", "hedging,nominalisation"],
    ["Working long hours is bad for health.", "Làm việc nhiều giờ có hại sức khỏe.", "Working long hours is harmful to health.", "Long working hours can be detrimental to health.", "Prolonged working hours take a toll on physical and mental health.", "synonym,collocation"],
    ["Women should get the same pay as men.", "Phụ nữ nên được trả lương như nam.", "Women should be paid the same as men.", "Women should receive equal pay for equal work.", "Pay parity between genders should be non-negotiable.", "passive,collocation"],
    ["It is hard to find a job after university.", "Khó tìm việc sau đại học.", "Finding a job after university is difficult.", "Graduates often struggle to secure employment.", "Securing employment has become a formidable challenge for graduates.", "nominalisation,collocation"],
    ["Some people like to work for themselves.", "Một số người thích tự làm chủ.", "Some people prefer to be self-employed.", "Some individuals opt for self-employment.", "A growing number of people are drawn to self-employment.", "word form,synonym"],
    ["Bosses should listen to workers more.", "Sếp nên lắng nghe nhân viên nhiều hơn.", "Managers should listen to employees more.", "Managers should pay closer attention to employee feedback.", "Managers would do well to heed employee feedback.", "collocation,idiom"],
  ],
  "2:health": [
    ["Fast food is bad for you.", "Đồ ăn nhanh có hại.", "Fast food is unhealthy.", "Fast food has a negative impact on health.", "Regular consumption of fast food poses serious health risks.", "nominalisation,collocation"],
    ["People should do more exercise.", "Mọi người nên tập thể dục nhiều hơn.", "People should exercise more regularly.", "Regular physical activity should be encouraged.", "Promoting regular physical activity is vital for public health.", "passive,nominalisation"],
    ["Many people are too fat now.", "Nhiều người giờ quá béo.", "Obesity has become a common problem.", "Obesity rates have risen sharply.", "Obesity has reached epidemic proportions.", "nominalisation,idiom"],
    ["Hospitals need more money.", "Bệnh viện cần nhiều tiền hơn.", "Hospitals need more funding.", "Hospitals require greater financial investment.", "Hospitals are in urgent need of additional funding.", "synonym,collocation"],
    ["Smoking kills a lot of people.", "Hút thuốc giết nhiều người.", "Smoking causes many deaths.", "Smoking is responsible for a large number of deaths.", "Smoking remains a leading cause of preventable death.", "nominalisation,collocation"],
    ["Stress makes people ill.", "Căng thẳng làm người ta ốm.", "Stress can cause illness.", "Chronic stress can lead to serious illness.", "Chronic stress can precipitate a range of illnesses.", "synonym,hedging"],
    ["The government should make sugar drinks cost more.", "Chính phủ nên làm đồ uống có đường đắt hơn.", "The government should tax sugary drinks.", "Imposing a tax on sugary drinks could reduce consumption.", "A levy on sugary beverages could curb consumption.", "nominalisation,hedging"],
    ["Old people need more care.", "Người già cần chăm sóc nhiều hơn.", "Elderly people require more care.", "The elderly require more extensive care.", "An ageing population places mounting demands on care services.", "synonym,nominalisation"],
  ],
  "2:society": [
    ["Many young people move to big cities.", "Nhiều người trẻ chuyển lên thành phố lớn.", "Many young people migrate to large cities.", "Young people are increasingly migrating to urban areas.", "There has been a mass exodus of young people to urban centres.", "synonym,nominalisation"],
    ["Families do not spend much time together.", "Gia đình ít dành thời gian cho nhau.", "Families spend less time together.", "Family members spend increasingly little time together.", "Quality family time has become a rarity.", "collocation"],
    ["Rich people and poor people are very different.", "Người giàu và người nghèo rất khác nhau.", "There is a big gap between rich and poor people.", "The gap between the rich and the poor is widening.", "Income inequality has reached alarming levels.", "nominalisation,collocation"],
    ["Old traditions are going away.", "Truyền thống cũ đang mất dần.", "Traditional customs are disappearing.", "Many traditional customs are dying out.", "Traditional customs are gradually being eroded.", "synonym,passive"],
    ["Houses in cities are too expensive.", "Nhà ở thành phố quá đắt.", "Housing in cities is unaffordable.", "Urban housing has become prohibitively expensive.", "Soaring property prices have priced many out of urban housing.", "collocation"],
    ["People should help others in their community.", "Mọi người nên giúp đỡ cộng đồng.", "People should support others in their local community.", "Individuals should contribute to their local community.", "Civic engagement should be actively fostered.", "nominalisation,synonym"],
    ["Living alone is more common now.", "Sống một mình giờ phổ biến hơn.", "Living alone has become more common.", "Single-person households are increasingly prevalent.", "The prevalence of solo living has risen markedly.", "nominalisation,synonym"],
    ["Tourism changes local culture.", "Du lịch thay đổi văn hóa địa phương.", "Tourism has an effect on local culture.", "Tourism can have a profound impact on local culture.", "Mass tourism risks diluting local cultural identity.", "collocation,hedging"],
  ],
  "2:crime": [
    ["Prison does not stop people doing crime.", "Nhà tù không ngăn được tội phạm.", "Prison does not prevent people from committing crimes.", "Imprisonment is not always an effective deterrent.", "Imprisonment has proven to be a largely ineffective deterrent.", "nominalisation,collocation"],
    ["Young people do crime because they are poor.", "Người trẻ phạm tội vì nghèo.", "Some young people commit crimes because of poverty.", "Poverty is a major factor behind youth crime.", "Youth crime is often rooted in poverty.", "nominalisation,collocation"],
    ["The police should be on the streets more.", "Cảnh sát nên tuần tra nhiều hơn.", "There should be more police on the streets.", "A greater police presence on the streets could deter crime.", "Heightened police visibility could serve as a deterrent.", "nominalisation,hedging"],
    ["Criminals should learn a job in prison.", "Tù nhân nên học nghề trong tù.", "Prisoners should receive job training.", "Vocational training should be offered to inmates.", "Equipping inmates with vocational skills facilitates rehabilitation.", "passive,nominalisation"],
    ["Crime on the internet is growing.", "Tội phạm mạng đang tăng.", "Online crime is increasing.", "Cybercrime is on the rise.", "Cybercrime has escalated at an alarming rate.", "synonym,idiom"],
    ["Hard punishments make people afraid.", "Hình phạt nặng khiến người ta sợ.", "Harsh punishments discourage crime.", "Severe penalties may act as a deterrent.", "Stiffer sentences are often claimed to deter would-be offenders.", "synonym,passive"],
    ["Parents should teach children right and wrong.", "Cha mẹ nên dạy con đúng sai.", "Parents should teach children moral values.", "Parents bear responsibility for instilling moral values.", "It falls to parents to instil a sound moral compass.", "collocation,cleft"],
    ["Violent games may make children violent.", "Game bạo lực có thể khiến trẻ hung hăng.", "Violent video games may encourage aggressive behaviour.", "Exposure to violent games may foster aggression in children.", "Prolonged exposure to violent games may desensitise children to aggression.", "nominalisation,hedging"],
  ],
  "2:media": [
    ["Ads make people buy things they do not need.", "Quảng cáo khiến người ta mua thứ không cần.", "Advertising persuades people to buy unnecessary products.", "Advertising encourages consumers to purchase non-essential goods.", "Advertising fuels the consumption of goods consumers scarcely need.", "synonym,collocation"],
    ["News on TV is often bad news.", "Tin trên TV thường là tin xấu.", "Television news often focuses on negative events.", "News coverage tends to be dominated by negative stories.", "Negative stories disproportionately dominate news coverage.", "passive,hedging"],
    ["People read fewer newspapers now.", "Giờ người ta đọc ít báo hơn.", "Fewer people read newspapers nowadays.", "Newspaper readership has declined considerably.", "Print journalism has suffered a steep decline in readership.", "nominalisation"],
    ["Famous people are role models for children.", "Người nổi tiếng là hình mẫu cho trẻ.", "Celebrities act as role models for children.", "Celebrities exert considerable influence on young people.", "Celebrities wield considerable influence over impressionable youngsters.", "collocation,synonym"],
    ["The government should control the media.", "Chính phủ nên kiểm soát truyền thông.", "The government should regulate the media.", "Some argue that the media should be subject to state regulation.", "Calls for tighter state regulation of the media are growing.", "passive,nominalisation"],
    ["Children watch too much TV.", "Trẻ xem TV quá nhiều.", "Children spend too much time watching television.", "Children are exposed to an excessive amount of television.", "Excessive television viewing has become commonplace among children.", "passive,nominalisation"],
    ["Social media spreads news fast.", "Mạng xã hội lan truyền tin nhanh.", "Social media spreads news quickly.", "News spreads rapidly via social media.", "Social media enables news to be disseminated almost instantaneously.", "synonym,passive"],
    ["Ads for children should be stopped.", "Quảng cáo cho trẻ nên bị cấm.", "Advertising aimed at children should be banned.", "Advertising targeting children ought to be prohibited.", "A ban on child-directed advertising is long overdue.", "synonym,nominalisation"],
  ],
};

for (const [k, rows] of Object.entries(RAW_EXTRA)) RAW[k] = [...(RAW[k] ?? []), ...rows];

export const PARAPHRASE_BANK: ParaphraseItem[] = Object.entries(RAW).flatMap(([k, rows]) => {
  const [task, topic] = k.split(":");
  return rows.map((r, i) => ({
    id: `para-t${task}-${topic}-${i + 1}`,
    task: Number(task) as 1 | 2,
    topic,
    source: r[0],
    vi: r[1],
    models: { B2: r[2], C1: r[3], C2: r[4] },
    techniques: r[5].split(","),
  }));
});
