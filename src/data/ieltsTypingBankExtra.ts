// Extra B2/C1/C2 model sentences appended to each category of the IELTS typing bank.
// Tuple: [level, target structure (must appear in sentence), English sentence, Vietnamese meaning]
type Row = ["B2" | "C1" | "C2", string, string, string];

export const T1_EXTRA: Record<string, Row[]> = {
  overview: [
    ["B2", "It can be seen that", "It can be seen that the elderly population increased in every region over the forty-year period.", "Có thể thấy rằng dân số người cao tuổi tăng ở mọi khu vực trong giai đoạn bốn mươi năm."],
    ["B2", "the least popular", "Overall, bus travel was the least popular option, while private cars dominated throughout.", "Nhìn chung, đi xe buýt là lựa chọn ít phổ biến nhất, trong khi ô tô cá nhân chiếm ưu thế suốt giai đoạn."],
    ["C1", "a clear upward trend", "Overall, there was a clear upward trend in household recycling, particularly after 2010.", "Nhìn chung, có một xu hướng tăng rõ rệt trong việc tái chế hộ gia đình, đặc biệt sau năm 2010."],
    ["C1", "diverged considerably", "Although the two cities started at similar levels, their population figures diverged considerably after 1990.", "Dù hai thành phố xuất phát ở mức tương đương, số dân của chúng chênh lệch đáng kể sau năm 1990."],
    ["C2", "a marked shift away from", "The data reveal a marked shift away from fossil fuels towards wind and solar power.", "Số liệu cho thấy sự dịch chuyển rõ rệt khỏi nhiên liệu hóa thạch sang năng lượng gió và mặt trời."],
    ["C2", "consistently outperformed", "Throughout the period, private schools consistently outperformed state schools, albeit by a narrowing margin.", "Suốt giai đoạn, trường tư luôn vượt trội trường công, dù khoảng cách ngày càng thu hẹp."],
  ],
  trends: [
    ["B2", "increased dramatically", "The number of electric vehicles sold increased dramatically between 2018 and 2023.", "Số xe điện bán ra tăng mạnh mẽ trong khoảng 2018 đến 2023."],
    ["B2", "remained unchanged", "The price of public transport remained unchanged for five years before rising in 2015.", "Giá vé giao thông công cộng không đổi trong năm năm trước khi tăng vào năm 2015."],
    ["C1", "a slight dip", "Apart from a slight dip in 2009, exports grew consistently throughout the decade.", "Ngoài sự sụt giảm nhẹ năm 2009, xuất khẩu tăng đều suốt thập kỷ."],
    ["C1", "recovered to", "Having fallen to 40 per cent in 2012, the figure recovered to 55 per cent by 2016.", "Sau khi giảm xuống 40 phần trăm năm 2012, con số phục hồi lên 55 phần trăm vào năm 2016."],
    ["C2", "an exponential surge", "Internet usage in rural areas saw an exponential surge once affordable mobile data became available.", "Việc sử dụng internet ở nông thôn tăng vọt theo cấp số nhân khi dữ liệu di động giá rẻ xuất hiện."],
    ["C2", "reversing the earlier trend", "Birth rates began to climb again after 2015, reversing the earlier trend of steady decline.", "Tỉ lệ sinh bắt đầu tăng trở lại sau 2015, đảo ngược xu hướng giảm đều trước đó."],
  ],
  comparison: [
    ["B2", "three times as much", "Japan spent three times as much on research as Brazil in 2020.", "Năm 2020, Nhật Bản chi cho nghiên cứu gấp ba lần Brazil."],
    ["B2", "In contrast", "In contrast, spending on entertainment in Germany was relatively low.", "Ngược lại, chi tiêu cho giải trí ở Đức tương đối thấp."],
    ["C1", "whereas", "Young adults preferred streaming services, whereas older viewers still relied on television.", "Người trẻ ưa chuộng dịch vụ phát trực tuyến, trong khi khán giả lớn tuổi vẫn dựa vào truyền hình."],
    ["C1", "significantly higher than", "The proportion of graduates in Canada was significantly higher than that in Mexico.", "Tỉ lệ người tốt nghiệp đại học ở Canada cao hơn đáng kể so với ở Mexico."],
    ["C2", "dwarfed", "China's steel output dwarfed that of all other countries combined by the end of the period.", "Sản lượng thép của Trung Quốc lấn át tổng sản lượng của tất cả các nước khác vào cuối giai đoạn."],
    ["C2", "roughly on a par with", "By 2020, female participation in the workforce was roughly on a par with that of men.", "Đến năm 2020, tỉ lệ phụ nữ tham gia lực lượng lao động gần ngang bằng với nam giới."],
  ],
  figures: [
    ["B2", "accounted for", "Transport accounted for 30 per cent of total carbon emissions in 2019.", "Giao thông chiếm 30 phần trăm tổng lượng khí thải carbon năm 2019."],
    ["B2", "just over a quarter", "Just over a quarter of respondents said they exercised every day.", "Hơn một phần tư người được hỏi nói họ tập thể dục mỗi ngày."],
    ["C1", "the vast majority", "The vast majority of households, around 85 per cent, owned at least one computer.", "Phần lớn các hộ gia đình, khoảng 85 phần trăm, sở hữu ít nhất một máy tính."],
    ["C1", "a negligible proportion", "Nuclear power made up a negligible proportion of the energy mix, at less than 2 per cent.", "Năng lượng hạt nhân chiếm tỉ lệ không đáng kể trong cơ cấu năng lượng, dưới 2 phần trăm."],
    ["C2", "a mere", "Rail freight represented a mere 5 per cent of goods transported, compared with 70 per cent by road.", "Vận tải hàng hóa bằng đường sắt chỉ chiếm vỏn vẹn 5 phần trăm, so với 70 phần trăm bằng đường bộ."],
    ["C2", "the lion's share", "Housing took the lion's share of monthly expenditure, absorbing almost half of household income.", "Nhà ở chiếm phần lớn nhất trong chi tiêu hàng tháng, gần một nửa thu nhập hộ gia đình."],
  ],
  process: [
    ["B2", "In the first stage", "In the first stage, raw materials are collected and transported to the factory.", "Ở giai đoạn đầu, nguyên liệu thô được thu gom và vận chuyển đến nhà máy."],
    ["B2", "is then heated", "The mixture is then heated to 200 degrees until it becomes a thick liquid.", "Hỗn hợp sau đó được nung nóng đến 200 độ cho đến khi thành chất lỏng đặc."],
    ["C1", "Once this has been completed", "Once this has been completed, the bottles are sorted by colour and crushed into small pieces.", "Khi bước này hoàn tất, các chai được phân loại theo màu và nghiền thành mảnh nhỏ."],
    ["C1", "is subsequently", "The filtered water is subsequently stored in large tanks before distribution.", "Nước đã lọc sau đó được chứa trong các bể lớn trước khi phân phối."],
    ["C2", "culminating in", "The cycle involves several chemical reactions, culminating in the production of usable fertiliser.", "Chu trình gồm nhiều phản ứng hóa học, kết thúc bằng việc tạo ra phân bón có thể sử dụng."],
    ["C2", "Having been", "Having been dried and graded, the tea leaves are packed and dispatched to retailers.", "Sau khi được sấy khô và phân loại, lá trà được đóng gói và gửi đến các nhà bán lẻ."],
  ],
  map: [
    ["B2", "was demolished", "The old fish market was demolished to create space for a riverside park.", "Chợ cá cũ bị phá bỏ để lấy chỗ cho một công viên ven sông."],
    ["B2", "to the north of", "A new car park was built to the north of the railway station.", "Một bãi đỗ xe mới được xây ở phía bắc nhà ga."],
    ["C1", "was converted into", "The former army barracks was converted into a university campus.", "Doanh trại quân đội cũ đã được chuyển đổi thành khuôn viên đại học."],
    ["C1", "was extended", "The main road was extended eastwards to connect the village with the motorway.", "Con đường chính được kéo dài về phía đông để nối ngôi làng với đường cao tốc."],
    ["C2", "was relocated to", "The bus terminal was relocated to the outskirts, freeing the centre for a pedestrian square.", "Bến xe buýt được dời ra ngoại ô, giải phóng trung tâm cho một quảng trường đi bộ."],
    ["C2", "largely unrecognisable", "By 2020, the seafront had become largely unrecognisable, with hotels lining the entire coast.", "Đến năm 2020, khu bờ biển gần như không thể nhận ra, với khách sạn trải dọc toàn bộ bờ."],
  ],
};

export const T2_EXTRA: Record<string, Row[]> = {
  introduction: [
    ["B2", "It is often argued that", "It is often argued that university education should be free for all students.", "Người ta thường cho rằng giáo dục đại học nên miễn phí cho mọi sinh viên."],
    ["B2", "In recent years", "In recent years, more and more people have chosen to work from home.", "Những năm gần đây, ngày càng nhiều người chọn làm việc tại nhà."],
    ["C1", "has sparked considerable debate", "The rapid spread of artificial intelligence has sparked considerable debate about the future of work.", "Sự lan rộng nhanh chóng của trí tuệ nhân tạo đã gây ra tranh luận đáng kể về tương lai việc làm."],
    ["C1", "a growing number of", "A growing number of governments are considering banning single-use plastics altogether.", "Ngày càng nhiều chính phủ cân nhắc cấm hoàn toàn nhựa dùng một lần."],
    ["C2", "a contentious issue", "Whether wealthy nations should accept more refugees remains a contentious issue in public discourse.", "Việc các quốc gia giàu có nên tiếp nhận thêm người tị nạn vẫn là vấn đề gây tranh cãi trong dư luận."],
    ["C2", "It is hardly surprising that", "It is hardly surprising that urban congestion has become a priority for policymakers worldwide.", "Không có gì ngạc nhiên khi ùn tắc đô thị trở thành ưu tiên của các nhà hoạch định chính sách toàn cầu."],
  ],
  thesis: [
    ["B2", "I would contend that", "I would contend that learning a second language should begin in primary school.", "Tôi cho rằng việc học ngoại ngữ thứ hai nên bắt đầu từ bậc tiểu học."],
    ["B2", "This essay will argue that", "This essay will argue that the benefits of tourism outweigh its drawbacks.", "Bài luận này sẽ lập luận rằng lợi ích của du lịch lớn hơn tác hại."],
    ["C1", "I am inclined to agree", "While both views have merit, I am inclined to agree that schools should teach financial skills.", "Dù cả hai quan điểm đều có lý, tôi nghiêng về đồng ý rằng trường học nên dạy kỹ năng tài chính."],
    ["C1", "a balanced approach", "In my view, a balanced approach combining regulation and education is most likely to succeed.", "Theo tôi, một cách tiếp cận cân bằng kết hợp quy định và giáo dục có khả năng thành công cao nhất."],
    ["C2", "far from convinced", "I remain far from convinced that banning cars from city centres would solve the problem.", "Tôi vẫn còn rất hoài nghi rằng cấm ô tô khỏi trung tâm thành phố sẽ giải quyết được vấn đề."],
    ["C2", "rests on a false premise", "The idea that wealth guarantees happiness rests on a false premise.", "Ý tưởng rằng giàu có đảm bảo hạnh phúc dựa trên một tiền đề sai."],
  ],
  argument: [
    ["B2", "The main reason is that", "The main reason is that young people learn new technology much faster than adults.", "Lý do chính là người trẻ học công nghệ mới nhanh hơn nhiều so với người lớn."],
    ["B2", "As a result", "As a result, many families can no longer afford to live in city centres.", "Kết quả là nhiều gia đình không còn đủ khả năng sống ở trung tâm thành phố."],
    ["C1", "This is largely because", "This is largely because remote work removes the need for long and stressful commutes.", "Điều này chủ yếu là vì làm việc từ xa loại bỏ nhu cầu di chuyển dài và căng thẳng."],
    ["C1", "Not only", "Not only does regular exercise improve physical health, but it also reduces anxiety.", "Tập thể dục đều đặn không chỉ cải thiện sức khỏe thể chất mà còn giảm lo âu."],
    ["C2", "It follows that", "It follows that any attempt to reduce crime must address its underlying economic causes.", "Từ đó suy ra rằng mọi nỗ lực giảm tội phạm phải giải quyết nguyên nhân kinh tế sâu xa."],
    ["C2", "is inextricably linked to", "Academic achievement is inextricably linked to the quality of early childhood education.", "Thành tích học tập gắn liền không thể tách rời với chất lượng giáo dục mầm non."],
  ],
  concession: [
    ["B2", "Although it is true that", "Although it is true that online learning is flexible, it can make students feel isolated.", "Mặc dù đúng là học trực tuyến linh hoạt, nó có thể khiến học sinh cảm thấy cô lập."],
    ["B2", "On the other hand", "On the other hand, some people argue that zoos help protect endangered species.", "Mặt khác, một số người cho rằng sở thú giúp bảo vệ các loài có nguy cơ tuyệt chủng."],
    ["C1", "Admittedly", "Admittedly, higher fuel taxes may hurt low-income drivers in the short term.", "Phải thừa nhận rằng thuế nhiên liệu cao hơn có thể gây thiệt cho người lái xe thu nhập thấp trước mắt."],
    ["C1", "this argument overlooks", "However, this argument overlooks the long-term environmental cost of cheap flights.", "Tuy nhiên, lập luận này bỏ qua cái giá môi trường lâu dài của các chuyến bay giá rẻ."],
    ["C2", "Granted", "Granted, standardised tests offer a convenient measure, yet they rarely capture creativity.", "Cứ cho là bài thi chuẩn hóa là thước đo tiện lợi, nhưng chúng hiếm khi phản ánh được sự sáng tạo."],
    ["C2", "does not withstand scrutiny", "The claim that technology isolates people does not withstand scrutiny when online communities are considered.", "Tuyên bố rằng công nghệ cô lập con người không đứng vững khi xem xét các cộng đồng trực tuyến."],
  ],
  example: [
    ["B2", "For example", "For example, many European cities have introduced free bicycle schemes.", "Ví dụ, nhiều thành phố châu Âu đã triển khai chương trình xe đạp miễn phí."],
    ["B2", "such as", "Countries such as Finland provide free school meals to all children.", "Các quốc gia như Phần Lan cung cấp bữa ăn miễn phí ở trường cho mọi trẻ em."],
    ["C1", "A prime example is", "A prime example is Copenhagen, where cycling lanes have cut traffic congestion dramatically.", "Một ví dụ tiêu biểu là Copenhagen, nơi làn xe đạp đã giảm ùn tắc giao thông đáng kể."],
    ["C1", "This is clearly illustrated by", "This is clearly illustrated by the success of recycling programmes in South Korea.", "Điều này được minh họa rõ qua thành công của các chương trình tái chế ở Hàn Quốc."],
    ["C2", "A telling example", "A telling example is the collapse of local shops following the arrival of large supermarkets.", "Một ví dụ đầy sức thuyết phục là sự sụp đổ của các cửa hàng địa phương khi siêu thị lớn xuất hiện."],
    ["C2", "Research conducted by", "Research conducted by Harvard University suggests that bilingual children develop stronger problem-solving skills.", "Nghiên cứu do Đại học Harvard thực hiện cho thấy trẻ song ngữ phát triển kỹ năng giải quyết vấn đề tốt hơn."],
  ],
  conclusion: [
    ["B2", "In conclusion", "In conclusion, both individuals and governments must take action to protect the environment.", "Tóm lại, cả cá nhân và chính phủ đều phải hành động để bảo vệ môi trường."],
    ["B2", "To sum up", "To sum up, the advantages of studying abroad clearly outweigh the disadvantages.", "Tóm lại, lợi ích của du học rõ ràng lớn hơn bất lợi."],
    ["C1", "All things considered", "All things considered, I firmly believe that community service should be encouraged in schools.", "Xét mọi mặt, tôi tin chắc rằng hoạt động phục vụ cộng đồng nên được khuyến khích trong trường học."],
    ["C1", "it is essential that", "Ultimately, it is essential that technology is used to support, rather than replace, teachers.", "Cuối cùng, điều cốt yếu là công nghệ được dùng để hỗ trợ chứ không thay thế giáo viên."],
    ["C2", "On balance", "On balance, the case for stricter regulation of social media is compelling.", "Cân nhắc tổng thể, lập luận ủng hộ quản lý chặt chẽ hơn mạng xã hội là rất thuyết phục."],
    ["C2", "Only by", "Only by addressing inequality at its roots can societies hope to achieve lasting stability.", "Chỉ bằng cách giải quyết bất bình đẳng từ gốc rễ, xã hội mới có thể hy vọng đạt được sự ổn định lâu dài."],
  ],
};
