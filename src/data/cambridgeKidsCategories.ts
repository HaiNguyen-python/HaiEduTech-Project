/**
 * @file cambridgeKidsCategories.ts
 * @description Thematic categorisation for Cambridge YLE vocabulary.
 * Consolidated to ~13 broader groups so kids see fewer, larger chapters.
 */

export type KidsCategory =
  | "Animals"
  | "Food & Drink"
  | "Body, Health & Feelings"
  | "People & Jobs"
  | "Home & Clothes"
  | "School & Stationery"
  | "Nature & Weather"
  | "Places, Transport & Travel"
  | "Sports, Hobbies & Music"
  | "Technology"
  | "Time, Numbers, Colors & Shapes"
  | "Actions (Verbs)"
  | "Descriptions (Adjectives)"
  | "Concepts & Society"
  | "Business & Money"
  | "Other";

export const CATEGORY_META: Record<KidsCategory, { emoji: string; vi: string }> = {
  "Animals":                          { emoji: "🐾",  vi: "Động vật" },
  "Food & Drink":                     { emoji: "🍎",  vi: "Đồ ăn & Thức uống" },
  "Body, Health & Feelings":          { emoji: "💖",  vi: "Cơ thể, Sức khỏe & Cảm xúc" },
  "People & Jobs":                    { emoji: "👨‍👩‍👧", vi: "Con người & Nghề nghiệp" },
  "Home & Clothes":                   { emoji: "🏠",  vi: "Nhà cửa & Quần áo" },
  "School & Stationery":              { emoji: "🎒",  vi: "Trường học & Văn phòng phẩm" },
  "Nature & Weather":                 { emoji: "🌳",  vi: "Thiên nhiên & Thời tiết" },
  "Places, Transport & Travel":       { emoji: "🌍",  vi: "Địa điểm, Phương tiện & Du lịch" },
  "Sports, Hobbies & Music":          { emoji: "⚽",  vi: "Thể thao, Sở thích & Âm nhạc" },
  "Technology":                       { emoji: "📱",  vi: "Công nghệ" },
  "Time, Numbers, Colors & Shapes":   { emoji: "⏰",  vi: "Thời gian, Số đếm, Màu sắc & Hình dạng" },
  "Actions (Verbs)":                  { emoji: "🏃",  vi: "Hành động (Động từ)" },
  "Descriptions (Adjectives)":        { emoji: "🌈",  vi: "Mô tả (Tính từ)" },
  "Concepts & Society":               { emoji: "🧠",  vi: "Khái niệm & Xã hội" },
  "Business & Money":                 { emoji: "💰",  vi: "Kinh doanh & Tiền bạc" },
  "Other":                            { emoji: "✨",  vi: "Khác" },
};

const CATEGORY_MAP: Record<string, KidsCategory> = {};
const add = (cat: KidsCategory, words: string[]) => {
  for (const w of words) CATEGORY_MAP[w.toLowerCase()] = cat;
};

add("Animals", [
  "ant","bear","bee","bird","butterfly","camel","cat","chicken","cow","crocodile","dinosaur",
  "dog","dolphin","donkey","dragon","duck","eagle","elephant","fish","fly","fox","frog",
  "giraffe","goat","hen","horse","kangaroo","lion","lizard","monkey","mosquito","mouse","octopus",
  "owl","panda","parrot","penguin","pig","puppy","rabbit","rhinoceros","shark","sheep","snail",
  "snake","spider","squirrel","tiger","turtle","whale","wolf","zebra","creature","ghost","giant","unicorn",
  "ladybug","seagull","hedgehog","raccoon","dragonfly",
]);

add("Food & Drink", [
  "apple","banana","bread","butter","cake","candy","cheese","chocolate","coffee","cookie",
  "cucumber","drink","egg","food","fruit","grape","ice cream","jam","juice","lemon","mango",
  "meal","melon","milk","noodles","onion","orange","pasta","pear","pineapple","pizza","popcorn",
  "potato","rice","salad","salt","sandwich","sausage","soup","strawberry","sugar","sweet","tea",
  "tomato","vegetable","water","watermelon","yogurt","biscuit","breakfast","lunch","dinner","recipe","nutrition",
  "cherry","honey","jelly","cabbage","dough",
]);

add("Body, Health & Feelings", [
  "arm","back","body","ear","eye","face","finger","foot","hair","hand","head","health",
  "heart","leg","lips","mouth","neck","nose","shoulder","skin","stomach","teeth","tooth","tongue",
  "toothbrush","medicine","hospital","fitness","exercise","ill","sick","hungry","thirsty","ankle",
  // feelings
  "afraid","amazing","angry","anxious","brave","calm","careful","cheerful","clever","confident",
  "creative","curious","embarrassed","energetic","excited","friendly","funny","generous","glad",
  "happy","helpful","honest","hopeful","jealous","joyful","kind","lazy","lonely","loyal","lucky",
  "nervous","patient","polite","positive","negative","proud","quiet","relaxed","sad","scared","serious",
  "shy","silly","smart","strong","surprised","sweet","tired","upset","worried","emotion","enthusiasm","attitude",
]);

add("People & Jobs", [
  "aunt","baby","boy","brother","child","children","cousin","dad","daddy","family","father",
  "friend","girl","grandfather","grandmother","grandpa","grandma","husband","man","mom","mother","mum",
  "nephew","niece","parent","people","person","sister","son","daughter","uncle","wife","woman",
  "neighbour","passenger","audience","volunteer","kid","colleague","ancestor",
  // jobs
  "actor","actress","architect","artist","astronaut","athlete","baker","chef","cleaner","cook",
  "dentist","designer","doctor","driver","engineer","farmer","fireman","firefighter","footballer",
  "guide","host","journalist","judge","lawyer","manager","mechanic","model","nurse","painter",
  "photographer","pilot","poet","police","postman","reporter","scientist","secretary","singer",
  "soldier","tailor","teacher","waiter","waitress","writer","chemist","clown",
]);

add("Home & Clothes", [
  "bath","bed","bedroom","bookcase","bowl","box","chair","clock","cup","cupboard","curtain",
  "desk","dish","door","fan","floor","fork","fridge","garden","glass","home","house","kitchen",
  "knife","lamp","mat","mirror","oven","picture","pillow","plate","pot","roof","room","sofa",
  "spoon","stairs","table","towel","tv","wall","window","ceiling","balcony","key","blanket","candle","napkin",
  "envelope","button","brush","bucket","apron","quilt","kettle","hammock",
  // clothes
  "boots","bracelet","cap","clothes","coat","dress","glasses","glove","handbag","hat","jacket",
  "jeans","necklace","pyjamas","ring","scarf","shirt","shoe","shoes","shorts","skirt","sock",
  "sunglasses","sweater","T-shirt","trousers","uniform","watch","ribbon","mitten","vest","feather",
]);

add("School & Stationery", [
  "answer","backpack","bag","book","class","classmate","classroom","crayon","draw","eraser","exam",
  "homework","lesson","library","math","notebook","page","paint","paper","pen","pencil","plus",
  "question","reading","ruler","school","story","student","study","test","write","puzzle","map",
]);

add("Nature & Weather", [
  "branch","cloud","cold","dark","desert","earth","field","fire","flower","forest","grass",
  "hill","ice","jungle","lake","leaf","light","moon","mountain","nature","ocean","plant",
  "pond","rain","river","rock","sand","sea","seashell","sky","snow","star","stone","storm",
  "stream","sun","sunny","sunshine","tree","valley","vapour","volcano","waterfall","weather",
  "wind","windy","winter","summer","spring","autumn","fog","glacier","habitat","planet","sandcastle",
  "seaside","equator","continent","blossom","breeze","cliff","meadow","nest","orchard","pebble",
  "dawn","dusk","flame","blizzard","canyon","whistle","magnet",
]);

add("Places, Transport & Travel", [
  // places
  "airport","bakery","beach","bridge","building","campsite","castle","cave","cinema","city",
  "country","factory","farm","gallery","harbour","harbor","hotel","island","lighthouse","market",
  "museum","office","palace","park","police station","post office","restaurant","shop","stadium",
  "station","street","supermarket","swimming pool","temple","theatre","tower","town","village","workshop","zoo",
  "monument","avenue","kingdom",
  // transport
  "airline","airplane","bicycle","bike","boat","bus","car","helicopter","motorbike","plane",
  "rocket","ship","spaceship","submarine","subway","taxi","train","tram","truck","van","vehicle",
  "wheel","ticket","luggage","engine","compass",
  // travel
  "adventure","departure","destination","explore","festival","flight","holiday",
  "journey","parade","passport","postcard","safari","sightseeing","souvenir","suitcase",
  "tourist","trip","vacation","visit","brochure","guidebook","reservation","barrel","voyage","ceremony",
]);

add("Sports, Hobbies & Music", [
  "ball","baseball","basketball","camping","cards","chess","cycling","dance","drawing",
  "fishing","football","game","golf","gym","hiking","hobby","jogging","kite","music",
  "painting","racing","running","ski","skiing","soccer","sport","swim","swimming",
  "team","tennis","trophy","volleyball","walking","yoga","drum","guitar","piano","violin","song","singing","orchestra","pottery",
  "flute","telescope","balloon","doll","teddy",
]);

add("Technology", [
  "battery","camera","computer","email","headphones","internet","keyboard","laptop",
  "machine","message","microphone","phone","program","robot","satellite","screen","software",
  "speaker","tablet","technology","telephone","television","video","website","application","microscope",
  "magnetic","invention","device","appliance","equipment",
]);

add("Time, Numbers, Colors & Shapes", [
  "afternoon","anniversary","day","evening","everyday","first","hour","midnight","minute","month",
  "morning","night","noon","number","o'clock","second","seven","summer","sunset","sunrise",
  "third","time","today","tomorrow","tonight","weekend","year","yesterday","decade","schedule","calendar",
  "appointment","deadline",
  // colors & shapes
  "black","blue","brown","circle","color","colour","gold","green","grey","pink",
  "purple","rainbow","red","silver","square","triangle","white","yellow","currency","budget","category",
]);

add("Actions (Verbs)", [
  "accept","achieve","add","adapt","adjust","admire","agree","analyse","analyze","apologize",
  "appear","appreciate","approach","approve","argue","arrange","arrive","ask","assist","assume",
  "attempt","believe","borrow","break","bring","build","buy","call","carry","catch","change",
  "check","choose","clean","climb","close","come","compare","complain","complete","construct","contain",
  "contribute","convince","cook","copy","cry","cut","decide","describe","design","develop",
  "discover","discuss","drink","drive","drop","eat","encourage","enjoy","estimate",
  "explain","fall","feel","find","finish","fix","follow","forget","get","give",
  "go","grow","guess","guarantee","happen","have","hear","help","hold","identify","ignore","imagine",
  "imitate","improve","include","inspire","introduce","invent","invite","involve","join","jump",
  "keep","kick","kill","know","laugh","learn","leave","let","like","listen","live","look","lose",
  "love","make","manage","mean","meet","memorize","motivate","move","need","notice","open","organize",
  "pay","persuade","pick","plan","play","practise","predict","prefer","prepare","produce",
  "promise","protect","pull","push","put","read","receive","recommend","recycle","reduce","relax",
  "rely","remember","reply","reserve","rest","return","ride","run","save","say","scream","see",
  "sell","send","share","shop","show","sing","sit","sleep","smile","speak","spend","stand","stay",
  "stop","succeed","suggest","support","survive","take","talk","teach","tell","think",
  "throw","translate","travel","try","turn","understand","use","wait","walk","want","wash",
  "watch","wear","whisper","win","wish","work","accomplish","collaborate","compromise","conclude",
  "dedicate","emphasize","enhance","evaluate","hesitate","compete","debate",
]);

add("Descriptions (Adjectives)", [
  "above","absolute","adequate","ancient","appropriate","available","average","beautiful","big","broken",
  "cheap","clean","clear","comfortable","commercial","complicated","convenient","dangerous",
  "deep","delicious","different","difficult","dirty","dry","early","easy","efficient","elderly","empty",
  "enormous","essential","exciting","expensive","famous","far","fast","favourite","few","fine","flat",
  "frequent","full","global","good","great","hard","heavy","high","huge","important","incredible",
  "interesting","large","late","little","long","loud","low","modern","narrow","national","natural",
  "near","new","nice","obvious","old","ordinary","permanent","poor","popular","practical","pretty","private",
  "rich","right","round","sharp","short","slow","small","soft","special","specific","strange","sure",
  "tall","temporary","terrible","thick","thin","tiny","traditional","unique","useful","valuable","warm",
  "weak","wet","wide","wonderful","young","alternative","attractive","minimum","ambitious","genuine",
  "reluctant","vibrant","fantastic","fascinating","brilliant","memorable","successful","talented","fortunate","powerful","professional","responsible",
  "wealth","priority","feature","habit","invitation","opportunity","benefit","comment","complaint","conclusion",
  "achievement","argument","circumstance","consequence","evidence","influence","perspective","authority","variety","universe","volunteer",
]);

// ===== Expansion 16 additions =====
add("Technology", [
  "desktop","charger","headset","usb","app","remote","selfie","podcast",
  "download","upload","screenshot","wifi","bluetooth",
]);
add("Time, Numbers, Colors & Shapes", [
  "week","weekday","rectangle","oval","dozen","hexagon","pentagon","twilight",
  "crimson","turquoise","magenta","era","eternity","duration","interval",
  "fortnight","decimal","fraction","quarter","milestone","sequence",
  "chronological","epoch","span","simultaneous","periodic",
]);
add("Actions (Verbs)", ["throw"]);
add("Home & Clothes", [
  "hoodie","slipper","raincoat","drawer","lampshade","bookshelf","helmet","beanie",
  "attic","hallway","fireplace","sleeve","gown","tuxedo","doormat",
]);
add("School & Stationery", [
  "marker","folder","textbook","locker","stapler","highlighter",
  "semester","syllabus","faculty","scholarship","tuition","lecture",
]);
add("Animals", [
  "hippopotamus","platypus","peacock","antelope","otter","walrus","raven","pelican","sloth",
]);
add("Food & Drink", [
  "croissant","syrup","smoothie","brownie","donut","cupcake","oatmeal","marshmallow",
  "appetizer","beverage","seasoning","cuisine","vegetarian","organic","leftovers","takeaway",
]);
add("Sports, Hobbies & Music", [
  "drums","trumpet","surfing","photography","knitting","karate","judo","badminton","rugby",
  "championship","opponent","marathon","tactic","victory","rivalry","spectator",
]);
add("Nature & Weather", [
  "humidity","hailstorm","dew","mist","drizzle",
]);
add("Places, Transport & Travel", [
  "terminal","runway","lodge","expedition","itinerary","embassy","plaza",
]);
add("Body, Health & Feelings", [
  "depression","wellbeing","resilience","fatigue","posture","immunity","recovery",
  "empathy","gratitude","optimism","pessimism","mindfulness","compassion",
]);

export const getCategory = (word: string): KidsCategory => {
  const c = CATEGORY_MAP[word.toLowerCase().trim()];
  return c ?? "Other";
};

export const CATEGORY_ORDER: KidsCategory[] = [
  "Animals","Food & Drink","Body, Health & Feelings","People & Jobs","Home & Clothes",
  "School & Stationery","Nature & Weather","Places, Transport & Travel","Sports, Hobbies & Music",
  "Technology","Time, Numbers, Colors & Shapes","Actions (Verbs)","Descriptions (Adjectives)",
  "Concepts & Society","Business & Money","Other",
];

// ===== Comprehensive recategorization of remaining "Other" words =====
// Import & merge from extension file for readability.
import { KIDS_CATEGORY_EXTENSIONS } from "./cambridgeKidsCategoryExtensions";
for (const [cat, words] of KIDS_CATEGORY_EXTENSIONS) add(cat, words);
