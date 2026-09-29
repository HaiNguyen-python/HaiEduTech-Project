// IELTS Writing typing bank: B2+ model sentences for Task 1 & Task 2.
// Tuple: [level, target structure (must appear in sentence), English sentence, Vietnamese meaning]
export type TypingLevel = "B2" | "C1" | "C2";
export interface TypingSentence {
  id: string;
  task: 1 | 2;
  category: string;
  level: TypingLevel;
  structure: string;
  text: string;
  vi: string;
}

type Row = [TypingLevel, string, string, string];

export const TYPING_CATEGORIES: Record<1 | 2, { key: string; en: string; vi: string }[]> = {
  1: [
    { key: "overview", en: "Overview", vi: "Tổng quan" },
    { key: "trends", en: "Trends", vi: "Xu hướng" },
    { key: "comparison", en: "Comparison", vi: "So sánh" },
    { key: "figures", en: "Figures & Proportions", vi: "Số liệu & tỉ lệ" },
    { key: "process", en: "Process", vi: "Quy trình" },
    { key: "map", en: "Map", vi: "Bản đồ" },
  ],
  2: [
    { key: "introduction", en: "Introduction", vi: "Mở bài" },
    { key: "thesis", en: "Thesis", vi: "Luận điểm chính" },
    { key: "argument", en: "Arguments", vi: "Lập luận" },
    { key: "concession", en: "Concession & Rebuttal", vi: "Nhượng bộ & phản biện" },
    { key: "example", en: "Examples", vi: "Ví dụ" },
    { key: "conclusion", en: "Conclusion", vi: "Kết bài" },
  ],
};

const T1: Record<string, Row[]> = {
  overview: [
    ["B2", "Overall, it is clear that", "Overall, it is clear that car ownership rose steadily in all three countries over the period shown.", "Nhìn chung, rõ ràng là số người sở hữu ô tô tăng đều ở cả ba quốc gia trong giai đoạn được thể hiện."],
    ["B2", "The most striking feature", "The most striking feature of the chart is the dramatic fall in coal consumption after 2005.", "Đặc điểm nổi bật nhất của biểu đồ là mức tiêu thụ than giảm mạnh sau năm 2005."],
    ["C1", "In general terms", "In general terms, urban residents spent considerably more on housing than their rural counterparts.", "Nói chung, cư dân thành thị chi tiêu cho nhà ở nhiều hơn đáng kể so với cư dân nông thôn."],
    ["B2", "It is noticeable that", "It is noticeable that online sales grew while in-store sales remained largely unchanged.", "Có thể nhận thấy rằng doanh số trực tuyến tăng trong khi doanh số tại cửa hàng gần như không đổi."],
    ["C1", "At first glance", "At first glance, it is evident that tourism was the dominant source of income for the island.", "Thoạt nhìn, rõ ràng du lịch là nguồn thu nhập chủ yếu của hòn đảo."],
    ["C1", "What stands out", "What stands out is that the gap between male and female graduates narrowed significantly.", "Điều nổi bật là khoảng cách giữa sinh viên nam và nữ tốt nghiệp đã thu hẹp đáng kể."],
    ["B2", "the process consists of", "Overall, the process consists of six distinct stages, beginning with harvesting and ending with packaging.", "Nhìn chung, quy trình gồm sáu giai đoạn riêng biệt, bắt đầu bằng thu hoạch và kết thúc bằng đóng gói."],
    ["C2", "underwent a radical transformation", "Overall, the town centre underwent a radical transformation, becoming far more pedestrian-friendly.", "Nhìn chung, trung tâm thị trấn đã trải qua một sự biến đổi triệt để, trở nên thân thiện hơn nhiều với người đi bộ."],
    ["C1", "with the exception of", "With the exception of Japan, every country recorded a rise in renewable energy use.", "Ngoại trừ Nhật Bản, mọi quốc gia đều ghi nhận sự gia tăng sử dụng năng lượng tái tạo."],
    ["C2", "a broadly similar pattern", "The two age groups followed a broadly similar pattern, although the younger group consistently spent more.", "Hai nhóm tuổi có xu hướng nhìn chung giống nhau, dù nhóm trẻ hơn luôn chi tiêu nhiều hơn."],
    ["B2", "by far the most popular", "Football was by far the most popular sport among teenagers throughout the decade.", "Bóng đá là môn thể thao phổ biến nhất, bỏ xa các môn khác, trong giới thanh thiếu niên suốt thập kỷ."],
    ["C1", "remained relatively stable", "While spending on food remained relatively stable, the proportion spent on leisure almost doubled.", "Trong khi chi tiêu cho thực phẩm tương đối ổn định, tỉ lệ chi cho giải trí gần như tăng gấp đôi."],
  ],
  trends: [
    ["B2", "rose steadily", "The number of international students rose steadily from 20,000 in 2000 to 45,000 in 2020.", "Số sinh viên quốc tế tăng đều từ 20.000 năm 2000 lên 45.000 năm 2020."],
    ["B2", "a sharp decline", "There was a sharp decline in newspaper sales between 2010 and 2015.", "Doanh số báo in giảm mạnh trong khoảng 2010 đến 2015."],
    ["C1", "peaked at", "Electricity demand peaked at 80 gigawatts in July before falling back in the autumn.", "Nhu cầu điện đạt đỉnh 80 gigawatt vào tháng Bảy trước khi giảm trở lại vào mùa thu."],
    ["C1", "levelled off", "After a period of rapid growth, the figure levelled off at around 60 per cent.", "Sau một giai đoạn tăng nhanh, con số chững lại ở khoảng 60 phần trăm."],
    ["B2", "fluctuated between", "The price of rice fluctuated between 300 and 450 dollars per tonne over the decade.", "Giá gạo dao động trong khoảng 300 đến 450 đô la mỗi tấn trong thập kỷ."],
    ["C1", "hit a low of", "Unemployment hit a low of 3 per cent in 2019, the lowest level in the period.", "Tỉ lệ thất nghiệp chạm mức thấp 3 phần trăm năm 2019, mức thấp nhất trong giai đoạn."],
    ["C2", "a meteoric rise", "Smartphone ownership experienced a meteoric rise, climbing from under 10 per cent to over 80 per cent.", "Tỉ lệ sở hữu điện thoại thông minh tăng vọt, từ dưới 10 phần trăm lên hơn 80 phần trăm."],
    ["B2", "a gradual increase", "A gradual increase in cycling was recorded throughout the first half of the period.", "Một sự gia tăng dần dần của việc đi xe đạp được ghi nhận suốt nửa đầu giai đoạn."],
    ["C1", "followed by", "Visitor numbers dipped slightly in 2008, followed by a strong recovery the next year.", "Lượng khách giảm nhẹ năm 2008, tiếp theo là sự phục hồi mạnh vào năm sau."],
    ["C2", "plummeted to", "Following the introduction of the new tax, cigarette consumption plummeted to just half its previous level.", "Sau khi áp dụng thuế mới, tiêu thụ thuốc lá giảm mạnh chỉ còn một nửa mức trước đó."],
    ["C1", "with a corresponding", "Car use fell by a quarter, with a corresponding rise in the use of public transport.", "Việc dùng ô tô giảm một phần tư, kèm theo sự gia tăng tương ứng của việc dùng giao thông công cộng."],
    ["B2", "reaching a peak of", "Sales grew each month, reaching a peak of 12,000 units in December.", "Doanh số tăng mỗi tháng, đạt đỉnh 12.000 sản phẩm vào tháng Mười Hai."],
  ],
  comparison: [
    ["B2", "twice as many", "Twice as many women as men enrolled in nursing courses in 2020.", "Số phụ nữ đăng ký khóa điều dưỡng năm 2020 gấp đôi nam giới."],
    ["B2", "whereas", "Germany relied heavily on coal, whereas France generated most of its power from nuclear energy.", "Đức phụ thuộc nhiều vào than, trong khi Pháp tạo phần lớn điện năng từ năng lượng hạt nhân."],
    ["C1", "considerably higher than", "The cost of living in London was considerably higher than that in Manchester.", "Chi phí sinh hoạt ở London cao hơn đáng kể so với ở Manchester."],
    ["C1", "in contrast to", "In contrast to the steady rise in exports, imports fell slightly over the same period.", "Trái ngược với việc xuất khẩu tăng đều, nhập khẩu giảm nhẹ trong cùng giai đoạn."],
    ["B2", "compared with", "Compared with 1990, the average household produced far less waste in 2020.", "So với năm 1990, hộ gia đình trung bình tạo ra ít rác hơn nhiều vào năm 2020."],
    ["C1", "three times as much", "Canada consumed three times as much water per person as Brazil.", "Canada tiêu thụ lượng nước trên đầu người gấp ba lần Brazil."],
    ["C2", "outstripped", "By 2015, spending on healthcare had outstripped spending on education for the first time.", "Đến năm 2015, chi tiêu y tế lần đầu vượt qua chi tiêu giáo dục."],
    ["B2", "the same as", "The proportion of teenagers using social media in 2020 was roughly the same as that of adults.", "Tỉ lệ thanh thiếu niên dùng mạng xã hội năm 2020 gần như bằng tỉ lệ người trưởng thành."],
    ["C1", "while", "Rural areas saw population decline, while cities expanded rapidly.", "Vùng nông thôn giảm dân số, trong khi các thành phố mở rộng nhanh chóng."],
    ["C2", "a mirror image of", "The trend for female employment was almost a mirror image of that for male employment.", "Xu hướng việc làm của nữ gần như là hình ảnh phản chiếu của xu hướng việc làm của nam."],
    ["C1", "marginally lower", "The figure for Spain was marginally lower, at 42 per cent.", "Con số của Tây Ban Nha thấp hơn một chút, ở mức 42 phần trăm."],
    ["B2", "the least popular", "Radio was the least popular source of news in every age group.", "Radio là nguồn tin tức ít phổ biến nhất ở mọi nhóm tuổi."],
  ],
  figures: [
    ["B2", "accounted for", "Transport accounted for almost a third of total carbon emissions in 2019.", "Giao thông chiếm gần một phần ba tổng lượng khí thải carbon năm 2019."],
    ["B2", "a figure of", "Spending on entertainment rose to a figure of 350 dollars per month.", "Chi tiêu cho giải trí tăng lên con số 350 đô la mỗi tháng."],
    ["C1", "the lion's share", "Residential users consumed the lion's share of the city's water supply.", "Người dùng dân cư tiêu thụ phần lớn nhất lượng nước cung cấp của thành phố."],
    ["C1", "just under half", "Just under half of all respondents said they exercised at least three times a week.", "Chưa đến một nửa số người trả lời nói họ tập thể dục ít nhất ba lần mỗi tuần."],
    ["B2", "the majority of", "The majority of graduates found employment within six months of finishing their degree.", "Phần lớn sinh viên tốt nghiệp tìm được việc trong vòng sáu tháng sau khi hoàn thành bằng."],
    ["C1", "a mere", "Wind power generated a mere 2 per cent of the country's electricity in 2000.", "Năng lượng gió chỉ tạo ra vỏn vẹn 2 phần trăm điện năng của quốc gia năm 2000."],
    ["C2", "constituting", "Imports from Asia rose to 40 billion dollars, constituting the single largest share of the total.", "Nhập khẩu từ châu Á tăng lên 40 tỉ đô la, chiếm tỉ phần lớn nhất trong tổng số."],
    ["B2", "a quarter of", "Roughly a quarter of household income was spent on rent.", "Khoảng một phần tư thu nhập hộ gia đình được chi cho tiền thuê nhà."],
    ["C1", "stood at", "In 2010, the literacy rate stood at 78 per cent, compared with 95 per cent a decade later.", "Năm 2010, tỉ lệ biết chữ ở mức 78 phần trăm, so với 95 phần trăm một thập kỷ sau."],
    ["C2", "a negligible proportion", "Nuclear energy made up a negligible proportion of the total until the late 1990s.", "Năng lượng hạt nhân chiếm một tỉ lệ không đáng kể cho đến cuối thập niên 1990."],
    ["C1", "made up", "Children under fifteen made up nearly 30 per cent of the population.", "Trẻ em dưới mười lăm tuổi chiếm gần 30 phần trăm dân số."],
    ["B2", "the remaining", "The remaining 12 per cent of the budget was allocated to research.", "12 phần trăm ngân sách còn lại được phân bổ cho nghiên cứu."],
  ],
  process: [
    ["B2", "is then", "The clay is then shaped into bricks and left to dry for 48 hours.", "Đất sét sau đó được tạo hình thành gạch và để khô trong 48 giờ."],
    ["B2", "In the first stage", "In the first stage, the raw materials are delivered to the factory by lorry.", "Ở giai đoạn đầu, nguyên liệu thô được chở đến nhà máy bằng xe tải."],
    ["C1", "Once", "Once the beans have been roasted, they are ground into a fine powder.", "Khi hạt đã được rang, chúng được xay thành bột mịn."],
    ["C1", "after which", "The glass is melted at a very high temperature, after which it is moulded into new bottles.", "Thủy tinh được nung chảy ở nhiệt độ rất cao, sau đó được đúc thành chai mới."],
    ["B2", "Following this", "Following this, the mixture is heated and stirred continuously.", "Sau bước này, hỗn hợp được đun nóng và khuấy liên tục."],
    ["C1", "is subsequently", "The water vapour is subsequently condensed into clouds as it rises.", "Hơi nước sau đó ngưng tụ thành mây khi bốc lên."],
    ["C2", "whereupon", "The fruit is sorted by size, whereupon the damaged pieces are discarded.", "Trái cây được phân loại theo kích cỡ, ngay sau đó những quả hỏng bị loại bỏ."],
    ["B2", "At the final stage", "At the final stage, the finished products are packaged and distributed to shops.", "Ở giai đoạn cuối, thành phẩm được đóng gói và phân phối đến cửa hàng."],
    ["C1", "before being", "The leaves are dried in the sun before being cut into small pieces.", "Lá được phơi nắng trước khi được cắt thành miếng nhỏ."],
    ["C2", "the cycle begins again", "The rainwater eventually returns to the sea, and the cycle begins again.", "Nước mưa cuối cùng trở về biển và chu trình bắt đầu lại."],
    ["C1", "is fed into", "The shredded paper is fed into a large tank containing water and chemicals.", "Giấy vụn được đưa vào một bể lớn chứa nước và hóa chất."],
    ["B2", "is known as", "This stage, which is known as fermentation, takes approximately two weeks.", "Giai đoạn này, được gọi là lên men, kéo dài khoảng hai tuần."],
  ],
  map: [
    ["B2", "was replaced by", "The old factory was replaced by a modern shopping centre.", "Nhà máy cũ đã được thay thế bằng một trung tâm mua sắm hiện đại."],
    ["B2", "was demolished", "The row of houses to the north of the river was demolished to make way for a car park.", "Dãy nhà phía bắc con sông bị phá bỏ để lấy chỗ làm bãi đỗ xe."],
    ["C1", "was converted into", "The former railway station was converted into a museum.", "Nhà ga cũ đã được chuyển đổi thành bảo tàng."],
    ["C1", "was extended", "The main road was extended eastwards to connect the village with the motorway.", "Con đường chính được kéo dài về phía đông để nối ngôi làng với đường cao tốc."],
    ["B2", "In the south-west corner", "In the south-west corner, a new playground was built next to the school.", "Ở góc tây nam, một sân chơi mới được xây cạnh trường học."],
    ["C1", "made way for", "The farmland made way for a large housing estate.", "Đất nông nghiệp nhường chỗ cho một khu nhà ở lớn."],
    ["C2", "was redeveloped", "The waterfront was redeveloped with restaurants, a marina and a pedestrian promenade.", "Khu bờ sông được tái phát triển với nhà hàng, bến du thuyền và lối đi bộ."],
    ["B2", "remained unchanged", "The church in the centre of the town remained unchanged throughout the period.", "Nhà thờ ở trung tâm thị trấn không thay đổi suốt giai đoạn."],
    ["C1", "was relocated", "The hospital was relocated to the outskirts to allow for further expansion.", "Bệnh viện được di dời ra ngoại ô để có thể mở rộng thêm."],
    ["C2", "significantly more developed", "By 2020, the area had become significantly more developed, with far fewer green spaces.", "Đến năm 2020, khu vực trở nên phát triển hơn đáng kể, với ít không gian xanh hơn nhiều."],
    ["C1", "adjacent to", "A new sports centre was constructed adjacent to the existing library.", "Một trung tâm thể thao mới được xây ngay cạnh thư viện hiện có."],
    ["B2", "was added", "A cycle lane was added along the length of the coastal road.", "Một làn xe đạp được thêm vào dọc theo con đường ven biển."],
  ],
};

const T2: Record<string, Row[]> = {
  introduction: [
    ["B2", "It is often argued that", "It is often argued that governments should invest more in public transport than in new roads.", "Người ta thường cho rằng chính phủ nên đầu tư vào giao thông công cộng nhiều hơn là đường mới."],
    ["B2", "In recent years", "In recent years, the number of people working from home has increased dramatically.", "Trong những năm gần đây, số người làm việc tại nhà đã tăng mạnh."],
    ["C1", "has sparked considerable debate", "The rise of artificial intelligence has sparked considerable debate about the future of work.", "Sự trỗi dậy của trí tuệ nhân tạo đã gây ra tranh luận đáng kể về tương lai của việc làm."],
    ["C1", "There is a widespread belief that", "There is a widespread belief that university education should be free for all.", "Có một niềm tin phổ biến rằng giáo dục đại học nên miễn phí cho tất cả."],
    ["C2", "a contentious issue", "Whether wealthy nations should accept more refugees remains a contentious issue.", "Việc các quốc gia giàu có nên tiếp nhận thêm người tị nạn hay không vẫn là một vấn đề gây tranh cãi."],
    ["B2", "Some people believe that", "Some people believe that children should start school at the age of four.", "Một số người tin rằng trẻ em nên bắt đầu đi học từ bốn tuổi."],
    ["C1", "is a matter of growing concern", "The decline of local languages is a matter of growing concern in many countries.", "Sự suy giảm các ngôn ngữ địa phương là mối lo ngại ngày càng tăng ở nhiều quốc gia."],
    ["C2", "Opinions are divided as to whether", "Opinions are divided as to whether social media does more harm than good.", "Các ý kiến chia rẽ về việc mạng xã hội gây hại nhiều hơn lợi hay không."],
    ["C1", "This essay will argue that", "This essay will argue that the benefits of tourism outweigh its drawbacks.", "Bài luận này sẽ lập luận rằng lợi ích của du lịch lớn hơn những bất lợi."],
    ["B2", "has become increasingly common", "Buying goods online has become increasingly common among people of all ages.", "Mua hàng trực tuyến ngày càng phổ biến ở mọi lứa tuổi."],
    ["C2", "In an era of", "In an era of rapid globalisation, the preservation of cultural identity has become a pressing challenge.", "Trong kỷ nguyên toàn cầu hóa nhanh chóng, việc bảo tồn bản sắc văn hóa trở thành một thách thức cấp bách."],
    ["C1", "a double-edged sword", "Many regard modern technology as a double-edged sword for young people.", "Nhiều người coi công nghệ hiện đại là con dao hai lưỡi đối với giới trẻ."],
  ],
  thesis: [
    ["B2", "I firmly believe that", "I firmly believe that learning a foreign language should be compulsory in primary schools.", "Tôi tin chắc rằng học ngoại ngữ nên là bắt buộc ở trường tiểu học."],
    ["B2", "I completely agree", "I completely agree that stricter laws are needed to protect endangered species.", "Tôi hoàn toàn đồng ý rằng cần có luật nghiêm hơn để bảo vệ các loài có nguy cơ tuyệt chủng."],
    ["C1", "I would contend that", "I would contend that individuals, rather than governments, bear the main responsibility for their health.", "Tôi cho rằng chính cá nhân, chứ không phải chính phủ, chịu trách nhiệm chính cho sức khỏe của mình."],
    ["C1", "to a large extent", "I agree to a large extent that advertising encourages unnecessary consumption.", "Tôi đồng ý ở mức độ lớn rằng quảng cáo khuyến khích tiêu dùng không cần thiết."],
    ["C2", "the drawbacks far outweigh", "In my view, the drawbacks far outweigh the benefits of allowing children to own smartphones.", "Theo tôi, những bất lợi vượt xa lợi ích của việc cho trẻ em sở hữu điện thoại thông minh."],
    ["B2", "In my opinion", "In my opinion, both approaches have merit, but prevention is more effective than punishment.", "Theo tôi, cả hai cách đều có giá trị, nhưng phòng ngừa hiệu quả hơn trừng phạt."],
    ["C1", "a balanced approach", "I believe a balanced approach combining regulation and education would be most effective.", "Tôi tin rằng một cách tiếp cận cân bằng kết hợp quy định và giáo dục sẽ hiệu quả nhất."],
    ["C2", "it would be naive to assume", "It would be naive to assume that technology alone can solve the problem of climate change.", "Sẽ là ngây thơ nếu cho rằng chỉ công nghệ có thể giải quyết vấn đề biến đổi khí hậu."],
    ["C1", "I partly agree", "I partly agree with this view, although I think its impact is often exaggerated.", "Tôi đồng ý một phần với quan điểm này, dù tôi nghĩ tác động của nó thường bị phóng đại."],
    ["B2", "This essay will discuss", "This essay will discuss both views before explaining why I support the second one.", "Bài luận này sẽ thảo luận cả hai quan điểm trước khi giải thích vì sao tôi ủng hộ quan điểm thứ hai."],
    ["C2", "is fundamentally misguided", "The notion that success depends solely on talent is fundamentally misguided.", "Quan niệm rằng thành công chỉ phụ thuộc vào tài năng về cơ bản là sai lầm."],
    ["C1", "the advantages outweigh", "I am convinced that the advantages outweigh the disadvantages in this case.", "Tôi tin chắc rằng trong trường hợp này lợi ích lớn hơn bất lợi."],
  ],
  argument: [
    ["B2", "The main reason is that", "The main reason is that public transport reduces both traffic congestion and air pollution.", "Lý do chính là giao thông công cộng giảm cả ùn tắc giao thông lẫn ô nhiễm không khí."],
    ["B2", "As a result", "Many young people cannot afford housing in cities. As a result, they delay starting a family.", "Nhiều người trẻ không đủ tiền mua nhà ở thành phố. Kết quả là họ trì hoãn việc lập gia đình."],
    ["C1", "This is largely because", "This is largely because employers value practical experience more than academic qualifications.", "Điều này phần lớn là vì nhà tuyển dụng coi trọng kinh nghiệm thực tế hơn bằng cấp học thuật."],
    ["C1", "leading to", "Excessive screen time can disrupt sleep patterns, leading to poor concentration at school.", "Dùng màn hình quá nhiều có thể làm rối loạn giấc ngủ, dẫn đến kém tập trung ở trường."],
    ["C1", "Not only", "Not only does exercise improve physical health, but it also reduces stress.", "Tập thể dục không chỉ cải thiện sức khỏe thể chất mà còn giảm căng thẳng."],
    ["C2", "It is precisely because", "It is precisely because resources are limited that governments must set clear priorities.", "Chính vì nguồn lực có hạn mà chính phủ phải đặt ra ưu tiên rõ ràng."],
    ["B2", "Another advantage is that", "Another advantage is that online courses allow learners to study at their own pace.", "Một lợi ích khác là các khóa học trực tuyến cho phép người học học theo tốc độ riêng."],
    ["C1", "a knock-on effect", "Higher fuel prices would have a knock-on effect on the cost of food and other goods.", "Giá nhiên liệu cao hơn sẽ gây hiệu ứng dây chuyền lên chi phí thực phẩm và hàng hóa khác."],
    ["C2", "Were governments to", "Were governments to tax sugary drinks, consumption would almost certainly decline.", "Nếu chính phủ đánh thuế đồ uống có đường, mức tiêu thụ gần như chắc chắn sẽ giảm."],
    ["B2", "Furthermore", "Furthermore, working from home saves employees both time and money on commuting.", "Hơn nữa, làm việc tại nhà giúp nhân viên tiết kiệm cả thời gian lẫn tiền đi lại."],
    ["C1", "plays a pivotal role in", "Education plays a pivotal role in reducing inequality between social groups.", "Giáo dục đóng vai trò then chốt trong việc giảm bất bình đẳng giữa các nhóm xã hội."],
    ["C2", "is inextricably linked to", "Economic growth is inextricably linked to investment in infrastructure and skills.", "Tăng trưởng kinh tế gắn bó chặt chẽ với đầu tư vào cơ sở hạ tầng và kỹ năng."],
  ],
  concession: [
    ["B2", "Although", "Although some people prefer living in the countryside, cities offer far better job opportunities.", "Mặc dù một số người thích sống ở nông thôn, thành phố mang lại cơ hội việc làm tốt hơn nhiều."],
    ["B2", "On the other hand", "On the other hand, private schools may widen the gap between rich and poor families.", "Mặt khác, trường tư có thể làm rộng khoảng cách giữa gia đình giàu và nghèo."],
    ["C1", "Admittedly", "Admittedly, nuclear power is expensive, but it produces almost no carbon emissions.", "Phải thừa nhận rằng điện hạt nhân đắt đỏ, nhưng nó gần như không thải carbon."],
    ["C1", "While it is true that", "While it is true that zoos protect some species, many animals suffer in captivity.", "Dù đúng là vườn thú bảo vệ một số loài, nhiều động vật chịu khổ khi bị nuôi nhốt."],
    ["C1", "Nevertheless", "Nevertheless, this argument overlooks the long-term costs of such a policy.", "Tuy nhiên, lập luận này bỏ qua chi phí dài hạn của chính sách như vậy."],
    ["C2", "Critics may argue that", "Critics may argue that such measures restrict personal freedom, yet the public benefits are undeniable.", "Những người phản đối có thể cho rằng biện pháp này hạn chế tự do cá nhân, nhưng lợi ích cộng đồng là không thể phủ nhận."],
    ["B2", "However", "However, this view ignores the fact that many jobs cannot be done remotely.", "Tuy nhiên, quan điểm này bỏ qua thực tế là nhiều công việc không thể làm từ xa."],
    ["C1", "Despite", "Despite the high initial cost, solar panels save households money over time.", "Mặc dù chi phí ban đầu cao, tấm pin mặt trời giúp các hộ gia đình tiết kiệm tiền theo thời gian."],
    ["C2", "This line of reasoning", "This line of reasoning, however, fails to account for cultural differences.", "Tuy nhiên, lối lập luận này không tính đến sự khác biệt văn hóa."],
    ["C1", "Even though", "Even though exams cause stress, they remain a fair way to measure achievement.", "Dù các kỳ thi gây căng thẳng, chúng vẫn là cách công bằng để đánh giá thành tích."],
    ["C2", "Granted", "Granted, some celebrities set a poor example, but many use their influence for good causes.", "Công nhận là một số người nổi tiếng làm gương xấu, nhưng nhiều người dùng ảnh hưởng cho mục đích tốt."],
    ["B2", "In spite of", "In spite of these concerns, most experts support the introduction of the scheme.", "Bất chấp những lo ngại này, hầu hết chuyên gia ủng hộ việc triển khai chương trình."],
  ],
  example: [
    ["B2", "For example", "For example, Finland has achieved excellent results with shorter school days.", "Ví dụ, Phần Lan đã đạt kết quả xuất sắc với ngày học ngắn hơn."],
    ["B2", "such as", "Renewable sources such as wind and solar power are becoming cheaper every year.", "Các nguồn tái tạo như năng lượng gió và mặt trời ngày càng rẻ hơn mỗi năm."],
    ["C1", "A case in point is", "A case in point is Singapore, where strict laws have kept the streets remarkably clean.", "Một ví dụ điển hình là Singapore, nơi luật nghiêm đã giữ đường phố sạch sẽ đáng kể."],
    ["C1", "This is exemplified by", "This is exemplified by the success of bicycle-sharing schemes in Copenhagen.", "Điều này được minh họa bằng thành công của các chương trình xe đạp chia sẻ ở Copenhagen."],
    ["B2", "For instance", "For instance, many companies now allow staff to work flexible hours.", "Chẳng hạn, nhiều công ty hiện cho phép nhân viên làm việc giờ linh hoạt."],
    ["C2", "A telling illustration of this", "A telling illustration of this is the rapid spread of misinformation during elections.", "Một minh chứng rõ ràng cho điều này là sự lan truyền nhanh chóng của thông tin sai lệch trong bầu cử."],
    ["C1", "To illustrate", "To illustrate, a single flight from London to New York produces around one tonne of carbon dioxide.", "Để minh họa, một chuyến bay từ London đến New York thải ra khoảng một tấn khí CO2."],
    ["B2", "This can be seen in", "This can be seen in the growing popularity of vegetarian restaurants.", "Điều này có thể thấy qua sự phổ biến ngày càng tăng của các nhà hàng chay."],
    ["C1", "Research suggests that", "Research suggests that children who read regularly develop a wider vocabulary.", "Nghiên cứu cho thấy trẻ em đọc sách thường xuyên phát triển vốn từ rộng hơn."],
    ["C2", "is a prime example of", "South Korea is a prime example of how investment in education can transform an economy.", "Hàn Quốc là ví dụ tiêu biểu cho việc đầu tư vào giáo dục có thể biến đổi một nền kinh tế."],
    ["C1", "namely", "Two factors, namely cost and convenience, explain the popularity of fast food.", "Hai yếu tố, cụ thể là chi phí và sự tiện lợi, giải thích sự phổ biến của đồ ăn nhanh."],
    ["B2", "In many countries", "In many countries, plastic bags are no longer given away free in supermarkets.", "Ở nhiều quốc gia, túi nhựa không còn được phát miễn phí ở siêu thị."],
  ],
  conclusion: [
    ["B2", "In conclusion", "In conclusion, I believe that the government should do more to support small businesses.", "Tóm lại, tôi tin rằng chính phủ nên làm nhiều hơn để hỗ trợ doanh nghiệp nhỏ."],
    ["B2", "To sum up", "To sum up, both sides have valid points, but education remains the key to solving this problem.", "Tóm lại, cả hai bên đều có lý, nhưng giáo dục vẫn là chìa khóa giải quyết vấn đề này."],
    ["C1", "All things considered", "All things considered, the benefits of international tourism clearly outweigh its costs.", "Xét mọi mặt, lợi ích của du lịch quốc tế rõ ràng lớn hơn chi phí của nó."],
    ["C1", "On balance", "On balance, I would argue that stricter regulation of social media is necessary.", "Cân nhắc mọi mặt, tôi cho rằng cần quản lý mạng xã hội chặt chẽ hơn."],
    ["C2", "it is imperative that", "Ultimately, it is imperative that individuals and governments act together to protect the environment.", "Cuối cùng, điều bắt buộc là cá nhân và chính phủ cùng hành động để bảo vệ môi trường."],
    ["B2", "For these reasons", "For these reasons, I strongly support the idea of a four-day working week.", "Vì những lý do này, tôi ủng hộ mạnh mẽ ý tưởng tuần làm việc bốn ngày."],
    ["C1", "In light of the above", "In light of the above, schools should place greater emphasis on practical life skills.", "Từ những điều trên, trường học nên chú trọng hơn vào kỹ năng sống thực tế."],
    ["C2", "should be regarded not as", "Technology should be regarded not as a threat but as a tool for improving education.", "Công nghệ nên được coi không phải là mối đe dọa mà là công cụ cải thiện giáo dục."],
    ["C1", "Taking everything into account", "Taking everything into account, I remain convinced that public health must come first.", "Xem xét mọi thứ, tôi vẫn tin chắc rằng sức khỏe cộng đồng phải được đặt lên hàng đầu."],
    ["B2", "I would recommend that", "I would recommend that parents limit the time their children spend online.", "Tôi khuyến nghị cha mẹ hạn chế thời gian con cái dành cho mạng."],
    ["C2", "It remains to be seen whether", "It remains to be seen whether these measures will be enough to reverse the trend.", "Vẫn còn phải xem liệu các biện pháp này có đủ để đảo ngược xu hướng hay không."],
    ["C1", "the most effective solution", "In short, the most effective solution is a combination of higher taxes and better public transport.", "Tóm lại, giải pháp hiệu quả nhất là kết hợp thuế cao hơn và giao thông công cộng tốt hơn."],
  ],
};

const build = (task: 1 | 2, src: Record<string, Row[]>): TypingSentence[] =>
  Object.entries(src).flatMap(([category, rows]) =>
    rows.map(([level, structure, text, vi], i) => ({
      id: `t${task}-${category}-${String(i + 1).padStart(2, "0")}`,
      task, category, level, structure, text, vi,
    })),
  );

export const typingSentences: TypingSentence[] = [...build(1, T1), ...build(2, T2)];
