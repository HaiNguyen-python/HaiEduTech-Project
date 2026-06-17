/**
 * @file cambridgeYleOfficialWordlist.ts
 * @description Official Cambridge wordlists used to validate and re-classify
 * every word that the app shows in the Cambridge YLE Vocabulary bank.
 *
 * Sources:
 *  - Cambridge Young Learners (Starters / Movers / Flyers) — handbook 2018 wordlist.
 *  - A2 Key (KET) for Schools — Cambridge vocabulary list 2020.
 *  - B1 Preliminary (PET) for Schools — Cambridge vocabulary list 2020.
 *
 * The "added" lists below are NEW vocabulary introduced at each level.
 * For checking we treat the lists as cumulative: a Movers candidate is
 * accepted if it appears in Starters or Movers, etc. The classifier always
 * assigns a word to its LOWEST (easiest) official level so a Movers card
 * for "apple" gets demoted back to Starters and never shows up as harder.
 *
 * Lists are intentionally inline so we never depend on a CDN. Words are
 * lowercase, single tokens (multi-word YLE entries like "ice cream" are
 * kept as-is with the space).
 */

const split = (s: string): string[] =>
  s.split(/\s+/).map(w => w.trim().toLowerCase()).filter(Boolean);

// ---------------------------------------------------------------------------
// STARTERS (Pre-A1)  — words a 6–8 year old beginner is expected to know.
// ---------------------------------------------------------------------------
const STARTERS_RAW = `
a alphabet an and apple are at baby ball balloon banana bag bath bathroom be
bed bedroom big bike bird birthday black blue board boat body book box boy
bread breakfast brother brown bus but by bye cake can car cat chair children
chocolate class classroom clock close colour come computer cook cousin cow
cracker crayon dad daddy dance day desk dining dining-room dinner do dog doll
don't door draw drink eat egg eight eighteen eleven english eraser eye family
fan father favourite feet fifteen find fine finger fish five floor flower fly
food foot football for four fourteen friend from fruit garden get girl give
go good goodbye grandfather grandma grandmother grandpa great green grey hair
hand happy hat have he head hello her here hi him his hippo home horse house
how I ice ice-cream in is it jacket jump kick kid kite know lemon like lion
listen long look love lunch make man mango me meet milk monkey morning mother
mouse mouth mr mrs mum mummy my name new nice night nine nineteen no nose not
now ok old on one open or orange our paint paper park pea pear pen pencil
phone photo pick picnic picture pineapple play please poster purple put queen
read red ride right robot room ruler run sand sausage say school see seven
seventeen she shoe shop short sing sister sit six sixteen sleep small smile
snake socks sofa son sorry spell sport stand star stop story strawberry sun
swim table tail talk tall ten tennis thank that the their then there these
they thirteen this those three throw to today tomato tree trousers truck
twelve twenty two under up wall walk water watermelon we what where which
white who whose window with woman would write yellow yes you young your zebra
zero zoo
`;

// ---------------------------------------------------------------------------
// MOVERS (A1) — additional vocabulary on top of Starters.
// ---------------------------------------------------------------------------
const MOVERS_RAW = `
about address adult afraid after afternoon again age all also always angry
animal answer any anyone anything armchair art ask aunt awake bad bag balcony
band bar baseball basketball bat bathroom beach beautiful because before
behind beside best better between bicycle bike biscuit blanket blue boat
body bookcase bored boring borrow bottle bottom bounce bowl brave breakfast
bring brother brush building bus busy butter button buy cafe call camera
camp candy cap card careful carrot carry cartoon cat catch cd centre cereal
chair change cheese chemist chess chicken child choose cinema circle city
clean clever climb cloud clown coat coconut coffee cold college colour
comic computer cook cooker cookie cool corner could country countryside
cousin cup cupboard curtain cute dance dangerous daughter day dentist desert
diamond dictionary different difficult dinner dirty dish do doctor downstairs
drawer dress driver drop duck dvd ear early easy elephant email empty enjoy
evening every everybody everyone everything exercise expensive face factory
fair fall famous fantastic farm farmer fast fat favourite feel field fifty
finish fire fireman first fishing flag flat floor flower football forest forty
fridge friend friendly frog front fun funny game garage gate get giraffe
glass glasses glove go goal goat gold goodbye grandparent grass great grocery
ground group hair half hall hamburger hand handbag hard hat helicopter help
hide high hill hobby hockey hold holiday home homework hop horse hospital hot
hotel hour hundred hungry hurry husband ice ill important inside internet
island jacket jam jeans job journey juice jungle keep kind king kitchen kitten
ladder lady lake lamp last late laugh lemonade lesson letter library lift
light like line lizard living loud machine magazine map market married match
maths mechanic medicine meet message metre middle milk million minute mirror
miss mobile moment money month moon mountain move much museum music musician
naughty necklace need neck news newspaper next nice noisy nothing number nurse
o'clock office often oil omelette only opposite outside oven over pancake panda
paint pair palace paper parent park parrot party pass past pasta pet phone
photo picnic picture piece pig pillow pilot pineapple pizza place plane plate
plant play player pocket poem police polite pool poor potato practise pretty
price prize problem programme project puppy puzzle quarter question quickly
quiet quite radio rain rainbow rainforest ready repeat restaurant rice river
road rock roller room round rugby runner sad salad sandwich say sausage scarf
science scissors seat second secretary send shall shark sheep shelf ship shirt
shop shopping shoulder shout show shower silver simple skate skirt sky sleep
slowly small snake snow snowman soap sock some someone something sometimes
song soon soup space speak spell sport sports stairs station stay stick still
storm strong student stupid suitcase summer sun sunglasses sunny supermarket
surprise sweater sweets swim swimsuit table tablet take taxi teacher team
telephone television tent term test text than that theatre then there think
thirsty thirty tiger tired toast toilet tomato tonight too top tortoise town
tractor train tree tricky try t-shirt turn ugly umbrella uncle understand
usually vegetable very video village violin visit volleyball wait wake walk
wall warm wash watch water way weather website weekend week well wet whale
wheel when where while whistle who why wife window wing winter without word
work world worry wrong year yesterday young
`;

// ---------------------------------------------------------------------------
// FLYERS (A2) — additional vocabulary on top of Movers.
// ---------------------------------------------------------------------------
const FLYERS_RAW = `
accident across actor actress actually adventure advice age air airport
alien alive allowed alone along ambulance among angry ankle another answer
ant anybody anywhere appear arm arrive art astronaut atlas autumn awake away
backache backpack badly bake bakery baker band bank bar barbecue bark
basement bath beach beard beat beautiful bedroom beef beetle belt bicycle
bin bird-watcher blanket bleed block blonde blow boil bone book boot born
boss bottom bowl branch brain bread break bridge brilliant broken brush
bubble bucket bug bunch burn business butterfly cafe cage calendar camel
campsite candle capital card cardboard career carpet cart castle ceiling
cellar century chain champion change channel chase chat cheap cheek
checkout chest chimney chips chopstick church circus clear clothes club
coach coast coin collect college comb comedy continent control conversation
cool cost cotton cough country court cousin crab crayon cross crossing
crowd cry cupboard customer cycle dad damage dark date dead death decide
deep delicious describe diary die different dinosaur dish dive dolphin
double drama dream dress drum dust duvet eagle earache earring earth east
easy economic edge electric elephant else end engine envelope eraser
excellent except exciting explain explore eyebrow fair fairy fall fancy
fantastic farm fashion father feather feed fence festival few field fight
finger finish fire firework fix flat flight flood flour football foreign
forest forget fork form fountain foxhole free fresh fridge front fruit
funny future garage gate gentle giant glove goal gold goldfish golf gorilla
group grow guess guide guitar gym hair-dryer hairbrush hall ham hammer
handle hang harbour hate heart heavy hedge helmet hero hide high hill hippo
hobby holiday home honey hood horrible host hot however human hunt husband
ill imagine important impossible information injection insect inside
internet introduce invent invitation invite island jeans joke journalist
journey judo juice jungle key keyboard kick kitten knee knife knock label
ladder ladybird lake language laptop laundry lawn leaf learn leather leave
left less letter level library life lift light lightning lion local lock
loose lose loudly luck lucky luggage magazine magic main map marathon
mark marker market matches medicine meeting member metal middle midnight
million mineral miss missing model monster moon mountain moustache museum
mushroom national naughty nest never new news next noise normal note
nothing noticeboard nowhere nurse o'clock ocean octopus office officer
olive omelette opposite orchestra ours outdoor outside owl page pain
painter painting pair palace panda paragraph park parrot pasta path patient
pattern pavement peace peanut peg pen-friend penguin people pepper period
person pet petrol photo physical pile pillow pineapple ping-pong pizza
planet plant plastic platform pleasant pleased pocket poem polar pollution
pond pond pop popular postcard poster pour powder power practise prefer
present price prize program project pull pumpkin push pyramid quiet quite
rabbit race racket radio rainforest react ready reception recipe record
recycle relax remember rest restaurant return ride river road robot rock
rocket roof rose round route rubber rugby rule sailing sailor sandcastle
sandy save scared scary scene science screen seaside second secret seem
sense set several shadow shape share sheet shelf shoulder shut sick side
silly silver since size skill skin sleep slide slow snail snowball soft
solar somewhere son sort sound space spaceship special speak special
spider spoon sport spot square stadium stamp star start station stay still
stomach storm story straight strawberry stream street strong style
subject submarine sugar sunset sweater swing tail tap taste teach team
teddy temperature theatre thief through thunder ticket tidy tie tin tired
tour tourist towel tower toy traffic trainer travel triangle tropical
trumpet tube tunnel turtle umbrella uniform universe unusual upstairs use
useful useless valley van vegetable vet view village visitor voice volcano
volunteer waiter waitress wallet washing wasp wave wear website weight
welcome well west whale whatever wheel whenever wherever whisper whistle
wide wife wild win wing winner wonderful wood wool worm worried wrap zoo
`;

// ---------------------------------------------------------------------------
// KET (A2 Key) — additional vocabulary beyond Flyers (concept-level core).
// ---------------------------------------------------------------------------
const KET_RAW = `
abroad accept account accommodation actively activity advert advertise
advertisement afford afterwards against agree agreement ahead air-conditioning
album allow alphabet alphabetical already although altogether amazed amazing
ambition amount ancient announce anorak answer anybody anything apartment
apologise apologize appear appearance application apply appointment area
arrange arrival arrive article artist asleep assistant attractive audience
author available average awful baker bakery bank banker basket bath
battery battle beach beard beat beauty become believe belong below bicycle
biology block bone bookshelf bookshop booking border bother bottom bowling
brain branch brave break bridge briefcase brilliant broken brother-in-law
budget bunch burger burn bury button cabbage cabinet cafeteria calculator
campaign campsite candle canoeing capital carpet cartoon castle casual cause
cd-player ceiling celebration cellar central centre century certain certainly
chain championship championship change channel chapter character charge
charity charming chase chat checkout chemistry cheque childhood choice
chopstick chore church circle clean cleaner clear clearly climate club
coach coast coffee collar collect collection college comedy comfortable
comment communicate community competition complain complete completely
concentrate concert confident confused congratulations connect consider
contain contents continue control conversation cooker copy correct correctly
cost cottage cough course courteous cover crash crazy create credit crew
crisp cross crowd crowded cruise cup curtain customer cut cycle daily
damage damp danger daughter dead deaf decision delay delicious deliver
delivery describe description detail dictionary difference different
difficulty digital direct direction director dirt dirty disagree disappear
disappointed disco discount discover discuss discussion display distance
divide divorced documentary downstairs dozen dream dress drum dry
duvet earn earring earth east eastern economics economy education effect
electrical electronic else email emergency employee employer empty energy
engineer enormous enough entertainment entrance entry environment equipment
escalator essay event ever exactly exam excellent except excited exciting
exit expect experience experiment expert explain explore extra extremely
factory fail failure fair fall famous fancy fantastic far fare farmer
fashion fashionable fast fault favour fear fee feeling feet female festival
few field final finally fire firework fishing fit fitness fix flag flat
flavour flight flood floor flu fluently fold folder follow football for
foreign foreigner forever forget form formal fortunately forward fresh
friendly friendship frighten frightened frozen full furniture future gallery
garage garlic generally gentle gentleman get gift glove godmother good-looking
government grandchild grandson grateful greet groceries ground group grow
guess guide guidebook guitar habit hair-dryer haircut hairdresser hairstyle
half hall hand handbag handsome happen happiness hard hate headache headlight
healthy heart heating heavy hero hide hill hire historic hobby honey honour
horrible host hot hotel hour huge human hungry hurry husband ice icon
identify ill illness imagine impossible improve include income incredibly
indoor industry information injure inside instead instructor instrument
intelligent interest interested interesting interior international internet
interview into introduce invent invention invitation invite invoice involve
island italian item itself jacket jam jeans jet jewellery job join joke
journalist journey jug juice junior just keep kettle key kilogram kilometre
kind king kitchen kitten knee knife knock knot ladder lake land language
laptop large later laundry leader leaf lean learn leather leave left
lesson level library lid lie life lift light line link lion list listener
litre live lobster local locker lock long-distance look loose lorry lose
lost loud loudly love lovely lucky luggage lunchtime madam magazine
mail main maintain major majority make manage manager manner march mark
marker market marriage match material mathematics meal meaning meanwhile
measure mechanic medal medicine meeting member memory mention menu mess
message metal middle midnight mile million mind mine minute miss mistake
mix mobile model modern moment monkey monthly mood moon motor motorbike
motorcycle motorway mountain mouse moustache movement movie museum
mushroom musical musician nail name narrow nationality natural nature
navy nearby nearly necessary neck necklace need negative neighbour
neighbourhood neither nephew nervous nest network never news newspaper
nice niece nightclub nobody noise noisy noodle normal normally north north
note nothing notice noticeboard novel nowadays nowhere number numerous
nurse object obvious occasion ocean offer office officer often oil
o'clock olive omelette online opening operation opinion opportunity
opposite option orange orchestra order ordinary organize original other
otherwise outside oven over own owner package packet pain painter painting
pair palace pancake paper park parking park-keeper part particular partner
party passenger passport past pasta path patient pattern pavement pay
peace peaceful peach peanut pear pen-friend pencil-case penguin pepper
performance perhaps period permission permit person personal personality
phone photograph photographer phrase pianist piano picnic piece pigeon
pillow pilot pineapple pizza plain plane plant plastic platform play
player playground pleased pleasure plenty plug pocket poem poet poetry
point poisonous polar police polite politely pollute pollution pop
popular population port portrait possibility possible possibly post
postcard postcode postman pot potato pottery pound pour powder power
practical practise pram prefer prepare present president press pretty
prevent price prince princess print printer private prize probably
problem produce product production professional professor profile programme
project promise pronounce proper properly proud prove provide public
publish pull pumpkin pupil purpose purse push put puzzle quality quantity
quarter quickly quiet quietly quite quiz race racing racket rail railway
rainbow rainforest raise rather react reach read reader ready real
realise really reason receipt receive recent recently reception receptionist
recipe recognise record recording recycle recycling refrigerator region
register regular regularly relative relax relaxed relaxing remain remember
remind remove rent repair repeat reply report request research reserve
reservation resort responsibility responsible rest restaurant result
return reveal review rhythm rice rich ride right ring rise risk river
road robot rock role roller-skate roof room rose round route row royal
rugby ruler rule rush sad safe safety sail sailing sailor salad salary
sale salt same sand sandwich satellite satisfied save savings say scared
scarf scenery school science scissors score screen sea search season
seaside seat secondary secret secretary section see seem self self-confident
sell semi-final send senior sense sentence separate series serious seriously
serve service set settle several shake shall shame shampoo shape share
sharp shave sheet shelf shine shiny ship shoe shop shopping shore short
shorts shoulder show shower shut shy side sight sign silent silver similar
since sincere sincerely sing singer single sink site situation size skill
skin skirt sky sleep sleeping-bag slim slow slowly small smell smile
smoke smooth snack snake snow snowboard snowboarding so soap social
society sock soft software solar solid someone something sometimes
somewhere son soon sore sort sound soup south souvenir space spaceship
spare special specially spell spend spice spicy spinach sport spot
spread spring square stadium staff stage stair stamp stand star start
stationery stay steak steal step stick still stomach stomach-ache stop
storm story straight strange stranger strawberry stream street stress
strict strong student studio study style subject subway success
successful successfully suddenly sugar suit suitable suitcase summer
sun sunbathe sunglasses sunny sunset suntan supermarket supper support
sure surf surface surfing surname surprise surprised surprising survey
sweat sweatshirt sweet swimming swing switch table tablet take tale
talent talented tall tap target taste taxi teacher team teapot teenager
telephone telescope television tell temperature temperature temple tend
tennis tent term terrible test text textbook than thank theatre theirs
themselves then there thick thief thin thing think thirsty though thought
through throw thunder ticket tidy tie tight till time timetable tiny tip
tired title together toilet tomato tomorrow tonight too tool tooth
toothache toothbrush toothpaste top topic total totally touch tour
tourism tourist towards towel tower town toy track tradition traditional
traffic train trainer translate translation travel traveller treat tree
trip trolley tropical trouble trousers true truth try t-shirt tube tuna
tunnel turn tv twenty twin type typical tyre ugly umbrella uncle
underground understand uniform unique united unit university unknown
unless unlikely unpopular until unusual upset upstairs use useful useless
usual usually valley valuable value vegetable vehicle very vet video
view village violin visit visitor vocabulary voice volleyball volunteer
wait waiter wake walk wall wallet warm warn waste watch water
wave way weather website wedding week weekend weekly weigh weight welcome
well west western whatever wheel whenever wherever whether while whisper
whole why wide wife wild win wind window wing winner winter wise wish
within without wonder wonderful wood wooden wool word work worker world
worried worry would wrap write writer writing wrong yard year yet
yoghurt yourself youth zebra zone zoo
`;

// ---------------------------------------------------------------------------
// PET (B1 Preliminary) — additional vocabulary beyond KET (representative).
// ---------------------------------------------------------------------------
const PET_RAW = `
ability abroad absolute absolutely academic accent accept access accident
accidentally accommodation accompany according account accurate achieve
achievement acid acquaintance acrobat action active actively activity
actor actress actual actually adapt add addition additional administration
admire admit adopt advance advanced advantage adventure advert advertise
advertisement advertising advise affect afford afraid afterwards against
agent aim alarm alive allow alone alphabetical alter alternative although
altogether amaze amazing ambition ambitious amount amused amusing analyse
ancient angle annoy annoyed annoying announce annual another anti- anxious
anybody anyhow anyone anything anyway anywhere apart apartment apologize
appear appearance application apply appointment approach appropriate
approve approximate area argue argument arrange arrangement arrest arrival
arrive arrow article artificial artist asleep aspect assist assistance
assistant association assume assure athlete athletics atmosphere attach
attached attack attempt attend attention attic attitude attract attractive
audience author authority automatic available average avoid award aware
background bag baggage balance bald ban band bandage barbecue bare bargain
basis battery battle bay beach bean bear beard beat beautiful become bee
beef behave behaviour belief believe belong below belt bench beneath benefit
bend beside best-seller bet better between beyond bill billion bin biology
birth birthday bit blame blank blanket blind block blood blow board boil
bone book bored boring borrow bother bottle bottom bowl boyfriend brain
branch brand brand-new brave bravely break breakdown breakfast breath
breathe brick bridge briefcase brightness brilliant bring broad broadcast
brochure broken brush bucket budget bug build building bulb bunch burglar
burgle burglary burn bury bush business businesswoman busy butcher button
cabin cable cafeteria calculate calculator calf call calm camp campaign
candidate candle candy capable capital captain capture career careful
careless cargo carpenter carriage carry case cash cassette casual cathedral
cause caution cave celebration ceremony certain certainly chain chair
challenge champion championship chance chapter character characteristic
charge charity charming chase cheat check cheek cheer cheerful chemical
chemist chest chew chief childhood chimney chip choice choose chopstick
circumstance citizen civilization claim clap clarify class classic classical
classroom clay clear cleaner clearly clever climate climb clinic close
closely cloth clothing clue club clue coast coat code coffee coin collar
colleague collect collection college collide collision colourful column
combination combine come comedy comfortable comma command comment commercial
commit committee common communicate communication community company compare
comparison compete competition competitor complain complaint complete
completely complex complicated component compose composer composition
computer concentrate concentration concern concerned concerning concert
conclude conclusion concrete condition conduct conductor confidence
confident confidential confirm conflict confused confusing congratulate
congratulation connect connection conscience consequence consider
considerable consideration consist constant construct construction consult
contain container content contest context continent continual continue
continuous contract contrary contrast contribute contribution control
convenience convenient conversation cook cooker cool cooperate cope
copy correct correctly correspond costume cottage cotton cough council
counter country countryside couple courage course court cousin cover
coverage cow coward cowardly crack craft crash crazy create creation
creative creature credit crew crime criminal crisp critical criticism
criticize crop cross crowd crowded crucial cruel cruise crush cry
cultural culture cure curiosity curious currency current curtain custom
customer cut cycle damage damp dance danger dangerous dare daring dark
darken date daughter daydream deaf deal dear death debt decade decent
decide decision declare decrease deep degree delay delicate delicious
deliver delivery demand depart department departure depend dependant
depending deposit depressed depressing depth derive describe description
desert deserve design designer desire desktop despite destination destroy
destruction detail detect detective determine determined develop
development device devote diagram dial dialogue diary die diet differ
difference different differently difficult difficulty digital direct
direction director directly dirt dirty disabled disadvantage disagree
disagreement disappear disappointed disappointing disaster discipline
discount discover discovery discuss discussion disease disgust disgusted
dish dishonest dishwasher disk display distance distant distinguish
distribute district disturb dive divide division divorce divorced
document documentary domestic dominate donate door double doubt download
downstairs downwards dozen draft drag dragon drama dramatic draw drawback
drawer drawing dream dress dressing-gown drink drip drive driver
drop drown drug drum dry duck due dull dump during dust duty dvd
eager earache earn earring earth east easy eat economic economical
economy edge editor education effect effective effectively efficient
effort egg either elderly elect election electric electrical electricity
electronic element elevator else elsewhere email embarrass embarrassing
emergency emotion emotional employ employee employer employment empty
enclose encourage end ending enemy energetic energy engaged engagement
engine engineer enjoy enjoyable enormous enough enquire enquiry enter
enterprise entertain entertaining entertainment enthusiasm enthusiastic
entire entirely entrance entry envelope environment environmental
equal equally equip equipment equivalent error escape especially essay
essential establish estate estimate even evening event eventually ever
every everybody everyday everyone everything everywhere evidence evidently
exact exactly examination examine example excellent except exception
exchange excite excited excitement exciting exclude excursion excuse
executive exercise exhausted exhibit exhibition exist existence exit
expand expect expedition expense expensive experience experienced
experiment expert explain explanation explode explore explorer explosion
export expose express expression extend extension extent extra extraordinary
extreme extremely eyebrow eyelash fabric fabulous face factor factory
fail failure faint fair fairly faith faithfully fall false familiar
family famous fan fancy fantastic fare farm farmer farming fascinated
fascinating fashion fashionable fasten fault favour favourable favourite
fear feature fed feed feeling fellow female fence festival fetch fever
fiction field fierce fight figure file fill film final finally financial
finger finish fire fireplace firm first firstly fit fix flag flame flash
flashy flat flexible flight float flood floor flour flow flower flu
fluent fluently fly fog foggy fold folder follow following food fool
foolish foot football for force forecast foreign foreigner forest forever
forget forgive form formal format former fortunate fortunately fortune
forward found foundation fountain frame free freedom freelance freeze
freezer frequent frequently fresh fridge friendly friendship frighten
frightened frightening frog from front frozen fruit fry fuel fulfil
full fully fun function fund funeral funny furniture further furthermore
future gain gallery game gang gap garage garbage garden gardener gas
gate gather gathering general generally generation generous gentle
gentleman gently genuine geography get gift girlfriend give glance glass
global glow glue goal god godfather godmother gold golden good goodbye
goodnight goods gossip govern government governor grab graduate gram
grammar grandchild granddaughter grandmother grandparent grandson grant
graph graphic grass grateful gravity great greatly greedy green greet
greeting grin grocery ground group grow growth guarantee guard guess
guest guidance guide guidebook guilty guitar guitarist gun gym gymnastics
habit hair hairdresser hairstyle half hall hammer hand handbag handle
handsome hang happen happily happiness happy harbour hard hardly harm
harmful harmless harvest hat hate hatred have head headache headline
headquarters health healthy hear hearing heart heart-attack heat heating
heaven heavily heavy hedge height help helpful hen hero heroine herself
hesitate hide high highlight highly highway hill himself hire historic
historical history hit hobby hockey hold hole holiday hollow holy home
homeless homework honest honestly honesty honey honour hook hooray hope
hopeful hopefully horizon horoscope horrible horror horse hospital
host hostel hot hotel hour house housework however hug huge human humour
humorous hunger hungry hunt hunter hurricane hurry hurt husband hut ice
ice-cream idea ideal identical identification identify identity ignore
ill illegal illness illustrate illustration image imaginary imagination
imagine immediate immediately impatient implication imply import importance
important impossible impress impressed impression impressive improve
improvement include including income increase incredible incredibly
indeed independent indication indicate individual indoors industrial
industry inexpensive infect infection inflate influence inform informal
information ingredient inhabit initially injection injure injured injury
ink innocent inquire inquiry insect inside inspect inspection inspire
install instance instant instead institute instruct instruction instructor
instrument insult insurance intelligence intelligent intend intention
intentional interest interested interesting interior international
interpret interpreter interrupt interruption interval interview interviewer
into introduce introduction invade invasion invent invention investigation
investment invisible invitation invite involve involvement iron irritate
issue item itself jacket jam jealous jewellery job join joint joke
journalism journalist journey joy judge judgement juice jump junction
jungle junior jury just justice keep kettle key keyboard kick kid kill
killer kilogram kilometre kind kindly king kitchen knee kneel knife
knock knot know knowledge laboratory lack ladder lady lake lamb lamp
land landscape language large last late later latest laugh laughter
launch laundry lawyer layer lazy lead leader leadership leaf league
lean leap learn least leather leave lecture left leg legal leisure
lemonade length less lesson let letter level library licence licensed
lie life lifestyle lift light lightning likely likewise limb limit
line link lip liquid list listen literature litre live lively living
load loaf local locally locate located location lock log logical lonely
long-term look loose lord lose loss lost lots loud loudly lounge love
lovely low loyal luck luckily lucky luggage lunch luxury machine
machinery magazine magic main mainly maintain major majority make male
mall mammal manage management manager manner manner manufacture many
map march marine mark market marker marriage married marry mass massive
match material mathematics matter mature maximum mayor meal mean meaning
meanwhile measure measurement meat mechanic medal media medical medicine
medium meet meeting melt member membership memory mend mental mention
menu mess message metal method might mild mile military million mind
mine miner mineral minimum minister minor minority minute mirror miss
missing mission mistake mix mixed mixture mobile model modern modify
moment money monitor monkey monthly mood moon mop moral more moreover
morning mosquito most mostly mother motion motivate motor motorbike
motorcycle motorist motto mountain move movement movie mud muddy mug
multiply mum murder murderer muscle music musical musician must mystery
myself name narrow national nationality native natural naturally nature
naval near nearby nearly necessarily necessary necessity neck need
needle negative neighbour neighbourhood neither nephew nervous nest
network never new newly news newspaper next nice niece night nobody
noise noisy none nonetheless nonsense normal normally north nose note
nothing notice noticeable noticeably notion novel now nowadays nowhere
nuclear number numerous nurse nursery nut obey object observation
observe obtain obvious obviously occasion occasionally occupation
occupy occur ocean offer office officer official often oil okay old
once one only onto open opening openly operate operation opinion opportunity
opposite optimistic option oral orange order ordinary organization
organize organized origin original originally otherwise ought out
outdoor outdoors outer outside oven over overall overcome overcrowded
overhear overlook overnight overseas overtake overtime owe own owner
ownership oxygen pack package packed packet pad page pain painful
paint painter painting pair palace pale pan panel panic paper paperwork
parade parcel pardon parent park parking parliament part participate
particular particularly partly partner part-time party pass passage
passenger passion past pasta paste path patience patient pattern pause
pavement pay payment peace peaceful peaceful peak peanut peculiar pedal
pedestrian peel pen-friend penalty pencil people pepper per perform
performance perfume perhaps period permanent permission permit person
personal personality persuade pet petal petrol pharmacy phase phone
photo photograph photographer phrase physical physically pianist piano
pick picnic picture piece pile pill pillow pilot pin pinch pine pink
pioneer pip pipe pity place plain plane planet plant plastic plate
platform play player playground pleasant please pleased pleasure plenty
plot plough plug plum plumber plus pocket poem poet poetry point
pointless poison poisonous polar pole police policy polish polite
politely politeness political politician politics poll pollute pollution
pool poor pop popular population port portable portrait position
positive possess possession possibility possibly post poster postpone
pot potato pottery pound pour poverty powder power powerful practical
practice practise praise prayer prediction prefer preference preparation
prepare presence present preservation preserve president press pressure
pretend pretty prevent previous previously price priceless pride priest
primary prime print printer prior priority prison prisoner private
privately prize probably problem procedure proceed process processing
produce producer product production profession professional professor
profit program programme progress prohibit project promise promote
promotion prompt pronounce pronunciation proof proper properly property
proposal propose protect protection protein protest proud proudly
prove provide provided provider psychological psychology pub public
publication publicity publicly publish publisher pudding pull pump
punch punctual punctually punctuation puncture punish punishment pupil
purchase pure purple purpose purse push put puzzle puzzled qualification
qualified qualify quality quantity quarrel quarter queen question
questionnaire queue quick quickly quiet quietly quite quiz quote race
racing racket radar radio rage railway rain rainbow rainforest raise
rang range rapid rapidly rare rarely rate rather raw reach react
reaction read reader reading ready real reality realize really rear
reason reasonable reasonably receive recent recently reception
receptionist recipe recognize recognition recommend recommendation
record recorder recover recovery recycle recycling reduce reduction
refer reference reflect reflection refresh refreshing refrigerator
refusal refuse regard regarding region regional register registration
regret regular regularly regulation rehearsal reject rejection relation
relationship relative relatively relax relaxation relaxed relaxing
release relevant reliable relief religion religious rely remain remark
remarkable remember remind remote remove rent repair repeat replace
reply report reporter represent representation representative reproduce
reputation request require requirement rescue research researcher
resemble reservation reserve resident resign resist resort resource
respect respond response responsibility responsible rest restaurant
restore result retire retired retirement return reveal review revise
revolution reward rhythm ribbon rice rich rid ride right ring rise
risk river road rob robber robbery rock rocket role roll roller romance
roof room root rope rose rotten rough roughly round routine row royal
rub rubber rubbish rude rug rugby ruin rule rumour run runner running
rural rush sack sad sadly safe safely safety sail sailor salary sale
salt salty same sample sand sandwich satisfaction satisfied save
savings say scale scan scare scared scary scene scenery schedule scheme
scholarship school science scientific scientist scissors scold score
scratch scream screen sea search season seat second secondary secret
secretary section sector secure security see seed seek seem self-confidence
self-confident sell semi-final senate send senior sense sensible
sensitive sentence separate separately series serious seriously serve
service session set settle settlement several severe sew shade shadow
shake shall shame shape share sharp sharply she shed sheep sheet shelf
shell shelter shift shine ship shirt shock shocked shocking shoe shoot
shop shopping shore short shortly shot shoulder shout show shower shut
shy sick side sight sign signal signature significance significant
significantly silence silent silently silk silly silver similar similarly
simple simply since sincere sincerely sing singer single sink sit
site situation size skate skating ski skiing skilful skill skilled
skin skip skirt sky sleep sleepy slice slide slight slightly slim
slip slipper slope slow slowly slowly small smart smell smile smoke
smooth smoothly snack snake sneeze snore snow snowboarding so soap
social society sock sofa soft soldier solid solution solve some
somebody somehow someone something sometime sometimes somewhat somewhere
son song soon sore sort sound soup source south space speak speaker
special specialist speciality specially species specific specifically
spectacular speech speed spell spelling spend spice spicy spider spill
spin spirit spite split spoil spoon sport sporting spot spread spring
square stable stack stadium staff stage stain stair stall stamp stand
standard star stare start state statement station statistical statistics
statue status stay steady steal steam steel steep steer stem step
stick still stir stock stomach stone stop store storey storm story
straight strange stranger strap strategy stream street strength strengthen
stress stretch strict strictly strike string strip stripe stripy
strong strongly structure struggle student studio study stuff style
subject submit substance substantial subtitle suburb succeed success
successful successfully such suck sudden suddenly suffer sufficient
sugar suggest suggestion suit suitable suitcase sum summary summer
sun sunbathe sunny supermarket support supporter suppose supposed
sure surely surf surface surgeon surgery surname surprise surprised
surprising surround surrounding survey survival survive suspect suspicious
swallow swap swear sweat sweater sweep sweet swim swimming swimsuit
swing switch symbol sympathy symptom system table tablet tail tailor
take tale talent talented talk tall tap tape target task taste tasty
taxi tea teach teacher teaching team tear technical technician technique
technology teen teenage teenager telephone telescope television tell
temper temperature temple temporary tend tendency tennis tense tension
tent term terrible terribly terrific terrified territory test text
than thank thanks that the theatre theft their theirs them then theory
therapy there therefore these they thick thief thin thing think third
thirsty though thought thread threat threaten through throughout throw
thunder thus ticket tidy tie tight tightly till time timetable tiny
tip tired tiring title to today together toilet tomato tomorrow tone
tonight too tool tooth top topic torch torn total totally touch
tough tour tourism tourist tournament towards towel tower town toy
trace track trade tradition traditional traffic train trainee trainer
training transfer transform translate translation translator transport
trap travel traveller treasure treat treatment tree trend trial
triangle trick trip triumph trolley trouble troublesome trousers truck
true truly trust truth try tube tuna tunnel turn turning tv twin
twist type typical typically typing tyre ugly ultimately umbrella
unable unaccompanied unattractive unbelievable uncertain uncle uncomfortable
unconscious under undergo underground underline underneath understand
understanding underwater underwear undertake undo unemployed unemployment
unexpected unexpectedly unfair unfortunate unfortunately unfriendly
unhappy unhealthy uniform unique unit unite united universal universe
university unkind unknown unless unlike unlikely unload unlucky unnatural
unnecessary unoccupied unpack unpleasant unpopular unsafe unsuccessful
unsuitable unsure untidy until unusual unwanted unwell up update upload
upper upset upside-down upstairs upwards urban urgent urgently use
used useful useless user usual usually vacation vague valley valuable
value van variety various vary vase vegetable vegetarian vehicle very
vessel via victim victory video view village violence violent violet
violin visa visible vision visit visitor vital vocabulary voice volume
volunteer vote voucher voyage wait waiter waiting-room wake walk wall
wallet wander want war wardrobe warm warmth warn warning wash washing
washing-machine waste watch water wave way weak weakness wealth wealthy
weapon wear weather web web-site website wedding week weekday weekend
weekly weigh weight weird welcome welfare well-known west western wet
whale what whatever wheel when whenever where whereas wherever whether
which while whip whisper whistle white who whoever whole whom whose
why wide widely wife wild wildlife will willing willingness win wind
window wine wing winner winter wire wise wish with within without
witness woman wonder wonderful wood wool word work worker workforce
workplace workshop world worried worry worth would wound wrap wrist
write writer writing wrong yard yawn year yearly yell yellow yes
yesterday yet you young your yours yourself youth youthful zone zoo
`;

// ---------------------------------------------------------------------------
// Build sets. Each set is CUMULATIVE — easier-level words are included.
// ---------------------------------------------------------------------------
const startersSet = new Set(split(STARTERS_RAW));
const moversSet = new Set([...split(STARTERS_RAW), ...split(MOVERS_RAW)]);
const flyersSet = new Set([...moversSet, ...split(FLYERS_RAW)]);
const ketSet = new Set([...flyersSet, ...split(KET_RAW)]);
const petSet = new Set([...ketSet, ...split(PET_RAW)]);

// Allow multi-token YLE entries ("ice cream") — but the inline lists hyphenate
// them ("ice-cream"). To match free-form data, we normalize both ways.
const normalize = (w: string) =>
  w.toLowerCase().trim().replace(/\s+/g, " ").replace(/-/g, " ");

const re = (set: Set<string>) => {
  const out = new Set<string>();
  for (const w of set) {
    out.add(normalize(w));
    out.add(w.toLowerCase().trim());
  }
  return out;
};

export const STARTERS_SET = re(startersSet);
export const MOVERS_SET = re(moversSet);
export const FLYERS_SET = re(flyersSet);
export const KET_SET = re(ketSet);
export const PET_SET = re(petSet);

/**
 * Given any word, return the LOWEST official Cambridge level it belongs to,
 * or `null` if the word is not on any official YLE/KET/PET list and should be
 * dropped from the bank entirely.
 */
export function classifyCambridgeLevel(
  word: string,
): "Starters" | "Movers" | "Flyers" | "KET" | "PET" | null {
  const w = normalize(word);
  if (STARTERS_SET.has(w)) return "Starters";
  if (MOVERS_SET.has(w)) return "Movers";
  if (FLYERS_SET.has(w)) return "Flyers";
  if (KET_SET.has(w)) return "KET";
  if (PET_SET.has(w)) return "PET";
  return null;
}
