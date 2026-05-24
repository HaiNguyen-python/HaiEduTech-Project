/**
 * @file cambridgeKidsCategories.ts
 * @description Thematic categorisation for Cambridge YLE vocabulary so the
 * UI can group words into bite-sized collapsible chapters per level.
 * Uses an explicit word→category map with sensible fallback "Khác / Other".
 */

export type KidsCategory =
  | "Animals"
  | "Food & Drink"
  | "Body & Health"
  | "Family & People"
  | "Home & Furniture"
  | "School & Stationery"
  | "Clothes"
  | "Colors & Shapes"
  | "Nature & Weather"
  | "Places"
  | "Transport"
  | "Sports & Hobbies"
  | "Jobs"
  | "Technology"
  | "Travel & Holidays"
  | "Time & Numbers"
  | "Actions (Verbs)"
  | "Feelings & Personality"
  | "Descriptions (Adjectives)"
  | "Other";

export const CATEGORY_META: Record<KidsCategory, { emoji: string; vi: string }> = {
  "Animals":                  { emoji: "🐾",  vi: "Động vật" },
  "Food & Drink":             { emoji: "🍎",  vi: "Đồ ăn & Thức uống" },
  "Body & Health":            { emoji: "🧍",  vi: "Cơ thể & Sức khỏe" },
  "Family & People":          { emoji: "👨‍👩‍👧", vi: "Gia đình & Con người" },
  "Home & Furniture":         { emoji: "🏠",  vi: "Nhà cửa & Đồ nội thất" },
  "School & Stationery":      { emoji: "🎒",  vi: "Trường học & Văn phòng phẩm" },
  "Clothes":                  { emoji: "👕",  vi: "Quần áo" },
  "Colors & Shapes":          { emoji: "🎨",  vi: "Màu sắc & Hình dạng" },
  "Nature & Weather":         { emoji: "🌳",  vi: "Thiên nhiên & Thời tiết" },
  "Places":                   { emoji: "📍",  vi: "Địa điểm" },
  "Transport":                { emoji: "🚗",  vi: "Phương tiện" },
  "Sports & Hobbies":         { emoji: "⚽",  vi: "Thể thao & Sở thích" },
  "Jobs":                     { emoji: "💼",  vi: "Nghề nghiệp" },
  "Technology":               { emoji: "📱",  vi: "Công nghệ" },
  "Travel & Holidays":        { emoji: "🧳",  vi: "Du lịch & Kỳ nghỉ" },
  "Time & Numbers":           { emoji: "⏰",  vi: "Thời gian & Số đếm" },
  "Actions (Verbs)":          { emoji: "🏃",  vi: "Hành động (Động từ)" },
  "Feelings & Personality":   { emoji: "😊",  vi: "Cảm xúc & Tính cách" },
  "Descriptions (Adjectives)":{ emoji: "🌈",  vi: "Mô tả (Tính từ)" },
  "Other":                    { emoji: "✨",  vi: "Khác" },
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
]);

add("Food & Drink", [
  "apple","banana","bread","butter","cake","candy","cheese","chicken","chocolate","coffee","cookie",
  "cucumber","drink","egg","food","fruit","grape","ice cream","jam","juice","lemon","mango",
  "meal","melon","milk","noodles","onion","orange","pasta","pear","pineapple","pizza","popcorn",
  "potato","rice","salad","salt","sandwich","sausage","soup","strawberry","sugar","sweet","tea",
  "tomato","vegetable","water","watermelon","yogurt","biscuit","breakfast","lunch","dinner","recipe","nutrition",
]);

add("Body & Health", [
  "arm","back","body","ear","eye","face","finger","foot","hair","hand","head","health",
  "heart","leg","lips","mouth","neck","nose","shoulder","skin","stomach","teeth","tooth","tongue",
  "toothbrush","medicine","hospital","doctor","dentist","fitness","exercise","ill","sick","hungry","thirsty",
]);

add("Family & People", [
  "aunt","baby","boy","brother","child","children","cousin","dad","daddy","family","father",
  "friend","girl","grandfather","grandmother","grandpa","grandma","husband","man","mom","mother","mum",
  "nephew","niece","parent","people","person","sister","son","daughter","uncle","wife","woman","teacher",
  "neighbour","passenger","audience","volunteer",
]);

add("Home & Furniture", [
  "bath","bed","bedroom","bookcase","bowl","box","chair","clock","cup","cupboard","curtain",
  "desk","dish","door","fan","floor","fork","fridge","garden","glass","home","house","kitchen",
  "knife","lamp","mat","mirror","oven","picture","pillow","plate","pot","roof","room","sofa",
  "spoon","stairs","table","towel","tv","wall","window","ceiling","balcony","key",
]);

add("School & Stationery", [
  "answer","backpack","bag","book","class","classmate","classroom","crayon","draw","eraser","exam",
  "homework","lesson","library","math","notebook","page","paint","paper","pen","pencil","plus",
  "question","reading","ruler","school","story","student","study","test","write","brush","puzzle",
]);

add("Clothes", [
  "boots","bracelet","cap","clothes","coat","dress","glasses","glove","handbag","hat","jacket",
  "jeans","necklace","pyjamas","ring","scarf","shirt","shoe","shoes","shorts","skirt","sock",
  "sunglasses","sweater","T-shirt","trousers","uniform","watch",
]);

add("Colors & Shapes", [
  "black","blue","brown","circle","color","colour","gold","green","grey","orange","pink",
  "purple","rainbow","red","silver","square","triangle","white","yellow",
]);

add("Nature & Weather", [
  "branch","cloud","cold","dark","desert","earth","field","fire","flower","forest","grass",
  "hill","ice","jungle","lake","leaf","light","moon","mountain","nature","ocean","plant",
  "pond","rain","river","rock","sand","sea","seashell","sky","snow","star","stone","storm",
  "stream","sun","sunny","sunshine","tree","valley","vapour","volcano","water","waterfall","weather",
  "wind","windy","winter","summer","spring","autumn","fog","glacier","habitat","planet","sandcastle",
  "seaside","equator","continent",
]);

add("Places", [
  "airport","bakery","beach","bridge","building","campsite","castle","cave","cinema","city",
  "country","factory","farm","gallery","harbour","hospital","hotel","island","lighthouse","market",
  "museum","office","palace","park","police station","post office","restaurant","shop","stadium",
  "station","street","supermarket","swimming pool","temple","theatre","tower","town","village","workshop","zoo",
]);

add("Transport", [
  "airline","airplane","bicycle","bike","boat","bus","car","helicopter","motorbike","plane",
  "rocket","ship","spaceship","submarine","subway","taxi","train","tram","truck","van","vehicle",
  "wheel","ticket","luggage",
]);

add("Sports & Hobbies", [
  "ball","baseball","basketball","camping","cards","chess","climb","cycling","dance","drawing",
  "fishing","football","game","golf","gym","hiking","hobby","jogging","jump","kite","music",
  "painting","play","racing","reading","running","ski","skiing","soccer","sport","swim","swimming",
  "team","tennis","trophy","volleyball","walking","yoga","drum","guitar","piano","violin","song","singing","orchestra","pottery",
]);

add("Jobs", [
  "actor","actress","architect","artist","astronaut","athlete","baker","chef","cleaner","cook",
  "dentist","designer","doctor","driver","engineer","farmer","fireman","firefighter","footballer",
  "guide","host","journalist","judge","lawyer","manager","mechanic","model","nurse","painter",
  "photographer","pilot","poet","police","postman","reporter","scientist","secretary","singer",
  "soldier","student","tailor","teacher","waiter","waitress","writer","chemist",
]);

add("Technology", [
  "battery","button","camera","computer","email","headphones","internet","keyboard","laptop",
  "machine","message","microphone","mouse","phone","program","robot","satellite","screen","software",
  "speaker","tablet","technology","telephone","television","video","website","application","microscope",
  "telescope","magnetic","invention",
]);

add("Travel & Holidays", [
  "adventure","camera","departure","destination","discount","explore","festival","flight","holiday",
  "hotel","journey","map","parade","passport","postcard","safari","sightseeing","souvenir","suitcase",
  "swimming","ticket","tourist","trip","vacation","visit","brochure","guidebook","reservation",
]);

add("Time & Numbers", [
  "afternoon","anniversary","day","evening","everyday","first","hour","midnight","minute","month",
  "morning","night","noon","number","o'clock","second","seven","second","summer","sunset","sunrise",
  "third","time","today","tomorrow","tonight","weekend","year","yesterday","decade","schedule","calendar",
  "appointment","deadline",
]);

add("Actions (Verbs)", [
  "accept","achieve","add","adapt","adjust","admire","agree","analyse","answer","apologize",
  "appear","appreciate","approach","approve","argue","arrange","arrive","ask","assist","assume",
  "attempt","believe","borrow","break","bring","build","buy","call","carry","catch","change",
  "check","choose","clean","climb","close","come","compare","complain","complete","construct","contain",
  "contribute","convince","cook","copy","cry","cut","dance","decide","describe","design","develop",
  "discover","discuss","do","draw","dream","drink","drive","drop","eat","encourage","enjoy","estimate",
  "explain","explore","fall","feel","find","finish","fix","fly","follow","forget","get","give",
  "go","grow","guess","guarantee","happen","have","hear","help","hold","identify","ignore","imagine",
  "imitate","improve","include","inspire","introduce","invent","invite","involve","join","jump",
  "keep","kick","kill","know","laugh","learn","leave","let","like","listen","live","look","lose",
  "love","make","manage","mean","meet","memorize","motivate","move","need","notice","open","organize",
  "paint","pay","persuade","pick","plan","play","practise","predict","prefer","prepare","produce",
  "promise","protect","pull","push","put","read","receive","recommend","recycle","reduce","relax",
  "rely","remember","reply","reserve","rest","return","ride","run","save","say","scream","see",
  "sell","send","share","shop","show","sing","sit","sleep","smile","speak","spend","stand","stay",
  "stop","study","succeed","suggest","support","survive","swim","take","talk","teach","tell","think",
  "throw","translate","travel","try","turn","understand","use","visit","wait","walk","want","wash",
  "watch","wear","whisper","win","wish","work","write","compete",
]);

add("Feelings & Personality", [
  "afraid","amazing","angry","anxious","attractive","brave","brilliant","busy","calm","careful",
  "cheerful","clever","confident","considerate","creative","curious","desperate","determined","embarrassed",
  "energetic","excited","fantastic","fascinating","friendly","fortunate","funny","generous","glad",
  "happy","helpful","honest","hopeful","intelligent","jealous","joyful","kind","lazy","lonely","loyal",
  "lucky","memorable","nervous","patient","polite","positive","negative","powerful","professional","proud",
  "quiet","relaxed","responsible","sad","scared","serious","shy","silly","smart","strong","successful",
  "surprised","sweet","talented","tired","upset","worried",
]);

add("Descriptions (Adjectives)", [
  "above","absolute","adequate","ancient","appropriate","available","average","beautiful","big","broken",
  "cheap","clean","clear","cold","comfortable","commercial","complicated","convenient","dangerous","dark",
  "deep","delicious","different","difficult","dirty","dry","early","easy","efficient","elderly","empty",
  "enormous","essential","exciting","expensive","famous","far","fast","favourite","few","fine","flat",
  "frequent","full","global","good","great","hard","heavy","high","huge","important","incredible",
  "interesting","large","late","light","little","long","loud","low","modern","narrow","national","natural",
  "near","new","nice","obvious","old","ordinary","permanent","poor","popular","practical","pretty","private",
  "rich","right","round","sharp","short","slow","small","soft","special","specific","strange","sure",
  "tall","temporary","terrible","thick","thin","tiny","traditional","unique","useful","valuable","warm",
  "weak","wet","wide","wonderful","young","alternative","attractive","minimum",
]);

export const getCategory = (word: string): KidsCategory => {
  const c = CATEGORY_MAP[word.toLowerCase().trim()];
  return c ?? "Other";
};

// Display order for groups
export const CATEGORY_ORDER: KidsCategory[] = [
  "Animals","Food & Drink","Body & Health","Family & People","Home & Furniture",
  "School & Stationery","Clothes","Colors & Shapes","Nature & Weather","Places",
  "Transport","Sports & Hobbies","Jobs","Technology","Travel & Holidays",
  "Time & Numbers","Actions (Verbs)","Feelings & Personality","Descriptions (Adjectives)",
  "Other",
];
