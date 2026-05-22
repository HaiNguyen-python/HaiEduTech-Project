-- Verify and correct lyrics for well-known classic songs.
-- Each lyrics JSONB is the canonical bilingual array [{original, translation}].

UPDATE public.language_songs SET lyrics = '[
  {"original":"Twinkle, twinkle, little star","translation":"Lấp lánh, lấp lánh, ngôi sao nhỏ"},
  {"original":"How I wonder what you are","translation":"Em tự hỏi bạn là gì"},
  {"original":"Up above the world so high","translation":"Trên cao vút bầu trời rộng lớn"},
  {"original":"Like a diamond in the sky","translation":"Như viên kim cương trên trời"},
  {"original":"Twinkle, twinkle, little star","translation":"Lấp lánh, lấp lánh, ngôi sao nhỏ"},
  {"original":"How I wonder what you are","translation":"Em tự hỏi bạn là gì"},
  {"original":"When the blazing sun is gone","translation":"Khi mặt trời rực rỡ đã tắt"},
  {"original":"When he nothing shines upon","translation":"Khi không còn gì được chiếu sáng"},
  {"original":"Then you show your little light","translation":"Khi đó em hé ánh sáng nhỏ"},
  {"original":"Twinkle, twinkle, all the night","translation":"Lấp lánh, lấp lánh suốt đêm"},
  {"original":"Twinkle, twinkle, little star","translation":"Lấp lánh, lấp lánh, ngôi sao nhỏ"},
  {"original":"How I wonder what you are","translation":"Em tự hỏi bạn là gì"}
]'::jsonb WHERE title = 'Twinkle Twinkle Little Star';

UPDATE public.language_songs SET lyrics = '[
  {"original":"Happy birthday to you","translation":"Chúc mừng sinh nhật bạn"},
  {"original":"Happy birthday to you","translation":"Chúc mừng sinh nhật bạn"},
  {"original":"Happy birthday dear friend","translation":"Chúc mừng sinh nhật người bạn thân yêu"},
  {"original":"Happy birthday to you","translation":"Chúc mừng sinh nhật bạn"},
  {"original":"From good friends and true","translation":"Từ những người bạn thật lòng"},
  {"original":"From old friends and new","translation":"Từ bạn cũ và bạn mới"},
  {"original":"May good luck go with you","translation":"Chúc bạn luôn gặp may mắn"},
  {"original":"And happiness too","translation":"Và cả niềm hạnh phúc"}
]'::jsonb WHERE title = 'Happy Birthday to You';

UPDATE public.language_songs SET lyrics = '[
  {"original":"You are my sunshine, my only sunshine","translation":"Em là ánh nắng của tôi, ánh nắng duy nhất"},
  {"original":"You make me happy when skies are grey","translation":"Em mang lại niềm vui những ngày trời xám"},
  {"original":"You''ll never know dear, how much I love you","translation":"Em sẽ không bao giờ biết tôi yêu em đến mức nào"},
  {"original":"Please don''t take my sunshine away","translation":"Xin đừng mang ánh nắng của tôi đi"},
  {"original":"The other night dear, as I lay sleeping","translation":"Đêm hôm trước, khi tôi đang ngủ"},
  {"original":"I dreamed I held you in my arms","translation":"Tôi mơ thấy ôm em trong vòng tay"},
  {"original":"When I awoke, dear, I was mistaken","translation":"Khi tỉnh dậy, tôi đã nhầm"},
  {"original":"So I hung my head and I cried","translation":"Tôi cúi đầu và bật khóc"}
]'::jsonb WHERE title = 'You Are My Sunshine';

UPDATE public.language_songs SET lyrics = '[
  {"original":"If you''re happy and you know it, clap your hands","translation":"Nếu bạn vui và bạn biết điều đó, hãy vỗ tay"},
  {"original":"If you''re happy and you know it, clap your hands","translation":"Nếu bạn vui và bạn biết điều đó, hãy vỗ tay"},
  {"original":"If you''re happy and you know it, and you really want to show it","translation":"Nếu bạn vui và bạn muốn thể hiện ra"},
  {"original":"If you''re happy and you know it, clap your hands","translation":"Nếu bạn vui và bạn biết điều đó, hãy vỗ tay"},
  {"original":"If you''re happy and you know it, stomp your feet","translation":"Nếu bạn vui và bạn biết điều đó, hãy dậm chân"},
  {"original":"If you''re happy and you know it, shout ''hooray!''","translation":"Nếu bạn vui và bạn biết điều đó, hãy hô ''hoan hô!''"}
]'::jsonb WHERE title = 'If You''re Happy and You Know It';

UPDATE public.language_songs SET lyrics = '[
  {"original":"Mary had a little lamb","translation":"Mary có một chú cừu nhỏ"},
  {"original":"Little lamb, little lamb","translation":"Chú cừu nhỏ, chú cừu nhỏ"},
  {"original":"Mary had a little lamb","translation":"Mary có một chú cừu nhỏ"},
  {"original":"Its fleece was white as snow","translation":"Bộ lông trắng như tuyết"},
  {"original":"And everywhere that Mary went","translation":"Và bất cứ nơi nào Mary đến"},
  {"original":"The lamb was sure to go","translation":"Chú cừu cũng đi theo"}
]'::jsonb WHERE title = 'Mary Had a Little Lamb';

UPDATE public.language_songs SET lyrics = '[
  {"original":"Row, row, row your boat","translation":"Chèo, chèo, chèo thuyền nào"},
  {"original":"Gently down the stream","translation":"Nhẹ nhàng xuôi theo dòng nước"},
  {"original":"Merrily, merrily, merrily, merrily","translation":"Vui vẻ, vui vẻ, vui vẻ, vui vẻ"},
  {"original":"Life is but a dream","translation":"Cuộc đời chỉ là giấc mơ"},
  {"original":"Row, row, row your boat","translation":"Chèo, chèo, chèo thuyền nào"},
  {"original":"Gently to the shore","translation":"Nhẹ nhàng về bến"},
  {"original":"If you see a crocodile","translation":"Nếu bạn thấy một con cá sấu"},
  {"original":"Don''t forget to roar","translation":"Đừng quên hét lên"},
  {"original":"Row, row, row your boat","translation":"Chèo, chèo, chèo thuyền nào"},
  {"original":"Gently down the stream","translation":"Nhẹ nhàng xuôi theo dòng nước"},
  {"original":"If you see a polar bear","translation":"Nếu bạn thấy một con gấu Bắc Cực"},
  {"original":"Don''t forget to scream","translation":"Đừng quên hét lên"}
]'::jsonb WHERE title = 'Row Row Row Your Boat';

UPDATE public.language_songs SET lyrics = '[
  {"original":"The wheels on the bus go round and round","translation":"Bánh xe buýt quay tròn tròn"},
  {"original":"Round and round, round and round","translation":"Tròn tròn, tròn tròn"},
  {"original":"The wheels on the bus go round and round","translation":"Bánh xe buýt quay tròn tròn"},
  {"original":"All through the town","translation":"Khắp các nẻo đường trong thành phố"},
  {"original":"The wipers on the bus go swish, swish, swish","translation":"Cần gạt nước xe buýt kêu swish swish swish"},
  {"original":"The horn on the bus goes beep, beep, beep","translation":"Còi xe buýt kêu bíp bíp bíp"}
]'::jsonb WHERE title = 'The Wheels on the Bus';

UPDATE public.language_songs SET lyrics = '[
  {"original":"Tuiki, tuiki tähtönen","translation":"Lấp lánh, lấp lánh ngôi sao nhỏ"},
  {"original":"Iltaisin sua katselen","translation":"Mỗi tối em ngắm nhìn bạn"},
  {"original":"Korkealla loistat vain","translation":"Bạn chỉ tỏa sáng trên cao"},
  {"original":"Katsot alas maailmaan","translation":"Bạn nhìn xuống thế giới này"},
  {"original":"Tuiki, tuiki tähtönen","translation":"Lấp lánh, lấp lánh ngôi sao nhỏ"},
  {"original":"Iltaisin sua katselen","translation":"Mỗi tối em ngắm nhìn bạn"},
  {"original":"Kun on aurinko jo poissa","translation":"Khi mặt trời đã đi xa"},
  {"original":"Säteet kun ei loista, loista","translation":"Khi tia nắng không còn chiếu"},
  {"original":"Pieni valos näyttäydyt","translation":"Ánh sáng nhỏ của bạn xuất hiện"},
  {"original":"Tuiki, tuiki tähtönen","translation":"Lấp lánh, lấp lánh ngôi sao nhỏ"}
]'::jsonb WHERE title = 'Tuiki tuiki tähtönen';

UPDATE public.language_songs SET lyrics = '[
  {"original":"Hämä-hämähäkki kiipes langalle","translation":"Chú nhện Hämä bò lên sợi dây"},
  {"original":"Tuli sade rankka, hämähäkin vei","translation":"Cơn mưa rào đổ xuống cuốn chú nhện đi"},
  {"original":"Aurinko armas kuivasi satehen","translation":"Mặt trời thân yêu hong khô cơn mưa"},
  {"original":"Hämä-hämähäkki kiipes uudelleen","translation":"Chú nhện Hämä lại bò lên lần nữa"},
  {"original":"Hämä-hämähäkki kiipeää, kiipeää","translation":"Chú nhện Hämä cứ leo, cứ leo"},
  {"original":"Yhä korkeammalle","translation":"Càng lúc càng cao hơn"},
  {"original":"Kunnes lankaa ei enää löydy","translation":"Cho đến khi không còn sợi dây nào"},
  {"original":"Ja hän laskeutuu maahan","translation":"Và chú lại xuống đất"}
]'::jsonb WHERE title = 'Hämä-Hämähäkki';

UPDATE public.language_songs SET lyrics = '[
  {"original":"Jaakko kulta, Jaakko kulta","translation":"Jaakko thân yêu, Jaakko thân yêu"},
  {"original":"Herää jo, herää jo","translation":"Hãy thức dậy, hãy thức dậy"},
  {"original":"Kellojasi soita, kellojasi soita","translation":"Hãy rung chuông của em, hãy rung chuông của em"},
  {"original":"Piu pau pou, piu pau pou","translation":"Đinh đoong đoong, đinh đoong đoong"},
  {"original":"Jaakko kulta, Jaakko kulta","translation":"Jaakko thân yêu, Jaakko thân yêu"},
  {"original":"Herää jo, herää jo","translation":"Hãy thức dậy, hãy thức dậy"},
  {"original":"Kuuletko jo kellot, kuuletko jo kellot","translation":"Em có nghe chuông không, em có nghe chuông không"},
  {"original":"Piu pau pou, piu pau pou","translation":"Đinh đoong đoong, đinh đoong đoong"}
]'::jsonb WHERE title LIKE 'Jaakko Kulta%';

UPDATE public.language_songs SET lyrics = '[
  {"original":"一闪一闪亮晶晶 (Yī shǎn yī shǎn liàng jīngjīng)","translation":"Lấp lánh, lấp lánh sáng long lanh"},
  {"original":"满天都是小星星 (Mǎn tiān dōu shì xiǎo xīngxīng)","translation":"Khắp bầu trời đều là những ngôi sao nhỏ"},
  {"original":"挂在天上放光明 (Guà zài tiān shàng fàng guāngmíng)","translation":"Treo trên bầu trời tỏa ánh sáng"},
  {"original":"好像许多小眼睛 (Hǎoxiàng xǔduō xiǎo yǎnjīng)","translation":"Như rất nhiều đôi mắt nhỏ"},
  {"original":"一闪一闪亮晶晶 (Yī shǎn yī shǎn liàng jīngjīng)","translation":"Lấp lánh, lấp lánh sáng long lanh"},
  {"original":"满天都是小星星 (Mǎn tiān dōu shì xiǎo xīngxīng)","translation":"Khắp bầu trời đều là những ngôi sao nhỏ"}
]'::jsonb WHERE title LIKE '小星星%';

UPDATE public.language_songs SET lyrics = '[
  {"original":"祝你生日快乐 (Zhù nǐ shēngrì kuàilè)","translation":"Chúc bạn sinh nhật vui vẻ"},
  {"original":"祝你生日快乐 (Zhù nǐ shēngrì kuàilè)","translation":"Chúc bạn sinh nhật vui vẻ"},
  {"original":"祝你生日快乐 (Zhù nǐ shēngrì kuàilè)","translation":"Chúc bạn sinh nhật vui vẻ"},
  {"original":"祝你生日快乐 (Zhù nǐ shēngrì kuàilè)","translation":"Chúc bạn sinh nhật vui vẻ"}
]'::jsonb WHERE title LIKE '生日快乐%';

UPDATE public.language_songs SET lyrics = '[
  {"original":"Một con vịt xòe ra hai cái cánh","translation":"One duck spreads out its two wings"},
  {"original":"Nó kêu rằng quác quác quác, quạc quạc quạc","translation":"It quacks quack quack quack, quack quack quack"},
  {"original":"Gặp hồ nước nó bì bà bì bõm","translation":"Meeting a pond, it splashes splish splash"},
  {"original":"Lúc lên bờ vẫy cái cánh cho khô","translation":"Climbing ashore, it flaps its wings to dry"},
  {"original":"Một con vịt xòe ra hai cái cánh","translation":"One duck spreads out its two wings"},
  {"original":"Nó kêu rằng quác quác quác, quạc quạc quạc","translation":"It quacks quack quack quack, quack quack quack"},
  {"original":"Gặp hồ nước nó bì bà bì bõm","translation":"Meeting a pond, it splashes splish splash"},
  {"original":"Lúc lên bờ vẫy cái cánh cho khô","translation":"Climbing ashore, it flaps its wings to dry"}
]'::jsonb WHERE title = 'Một Con Vịt';

UPDATE public.language_songs SET lyrics = '[
  {"original":"Kìa con bướm vàng, kìa con bướm vàng","translation":"Look, the yellow butterfly, look, the yellow butterfly"},
  {"original":"Xòe đôi cánh, xòe đôi cánh","translation":"Spreading its wings, spreading its wings"},
  {"original":"Bướm bướm bay lên trời","translation":"Butterfly, butterfly flies into the sky"},
  {"original":"Bướm bướm bay lên trời","translation":"Butterfly, butterfly flies into the sky"},
  {"original":"Em ngồi xem, em ngồi xem","translation":"I sit and watch, I sit and watch"},
  {"original":"Kìa con bướm vàng, kìa con bướm vàng","translation":"Look, the yellow butterfly, look, the yellow butterfly"},
  {"original":"Xòe đôi cánh, xòe đôi cánh","translation":"Spreading its wings, spreading its wings"},
  {"original":"Bướm bướm bay theo gió","translation":"Butterfly flies with the wind"}
]'::jsonb WHERE title = 'Kìa con bướm vàng';

UPDATE public.language_songs SET lyrics = '[
  {"original":"Cả nhà thương nhau","translation":"The whole family loves one another"},
  {"original":"Ba thương con vì con giống mẹ","translation":"Dad loves the child for resembling mom"},
  {"original":"Mẹ thương con vì con giống ba","translation":"Mom loves the child for resembling dad"},
  {"original":"Cả nhà ta cùng thương yêu nhau","translation":"Our whole family loves one another"},
  {"original":"Xa là nhớ, gần nhau là cười","translation":"Apart we miss, together we smile"}
]'::jsonb WHERE title = 'Cả nhà thương nhau';