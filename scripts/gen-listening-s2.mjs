/**
 * Generates 17 new Section 2 listening sets (monologue, 10 MCQs each).
 * Item format: [question, transcript lead, correct answer, d1, d2, d3]
 * @copyright 2026 HaiEduTech
 */
import fs from "fs";
import { q, transcriptLiteral, fileHeader } from "./listening-gen-lib.mjs";

const topics = [
  {
    id: "monologue-campus-tour", title: "Welcome Tour of the University Campus",
    titleVi: "Tham quan giới thiệu khuôn viên trường",
    speaker: "Guide", who: "a student guide showing new students around campus",
    intro: "Hello everyone, and welcome to Eastfield University. My name is Ruth, and I'll be taking you round the main campus this morning.",
    outro: "That's everything from me - please stay together, and do ask questions as we walk.",
    items: [
      ["How long will the tour last?", "The whole tour lasts about", "ninety minutes", "forty minutes", "two hours", "three hours"],
      ["Where does the tour finish?", "We'll finish the tour at", "the students' union", "the sports hall", "the main gate", "the library"],
      ["What is the oldest building on campus?", "The oldest building on campus is", "the chapel", "the law faculty", "the old library", "the science block"],
      ["The library is open until:", "During term time the library stays open until", "midnight", "eight in the evening", "ten in the evening", "two in the morning"],
      ["Students borrow laptops from:", "You can borrow a laptop for the day from", "the help desk", "the porters' lodge", "the computer lab", "the students' union"],
      ["The cheapest place to eat is:", "The cheapest hot meal on campus is served in", "the union canteen", "the library café", "the sports bar", "the staff restaurant"],
      ["Bicycles must be left:", "Bicycles have to be left in", "the covered racks", "the car park", "the courtyard", "the sports field"],
      ["The health centre is next to:", "The health centre is directly next to", "the accommodation office", "the chapel", "the theatre", "the bus stop"],
      ["Free language classes are held on:", "The free language classes take place on", "Wednesday afternoons", "Monday mornings", "Friday evenings", "Saturday mornings"],
      ["To join a society, students should:", "If you want to join a society, the easiest way is to", "use the online portal", "phone the office", "visit the library", "email your tutor"],
    ],
  },
  {
    id: "monologue-recycling-centre", title: "Talk at the Council Recycling Centre",
    titleVi: "Giới thiệu trung tâm tái chế",
    speaker: "Supervisor", who: "a site supervisor briefing visitors at a recycling centre",
    intro: "Good afternoon, everybody. Thanks for coming along to the Brookdale Recycling Centre. I'm Ken, the site supervisor, and I'll explain how everything works before we walk round.",
    outro: "So that's the site in a nutshell. Please keep to the marked walkways during the visit.",
    items: [
      ["The centre opened in:", "The centre first opened in", "2014", "2004", "2018", "1998"],
      ["How much household waste is recycled here?", "We now recycle roughly", "sixty per cent", "thirty per cent", "eighty per cent", "forty-five per cent"],
      ["Garden waste should go in the:", "All garden waste goes into", "the brown bins", "the blue bins", "the black bags", "the green skip"],
      ["Which item cannot be accepted?", "The one thing we simply cannot accept is", "paint tins", "old furniture", "cardboard boxes", "glass bottles"],
      ["Electrical goods are checked for:", "Every electrical item is first checked for", "possible reuse", "metal content", "battery leaks", "water damage"],
      ["The busiest day of the week is:", "Our busiest day by far is", "Saturday", "Monday", "Wednesday", "Sunday"],
      ["Visitors under sixteen must:", "Anyone under sixteen must", "be accompanied by an adult", "wear a helmet", "stay in the car park", "book in advance"],
      ["The shop on site sells:", "The small shop on site sells", "repaired bicycles", "garden plants", "recycled paper", "compost bags"],
      ["Free compost is available in:", "We give away free compost every", "spring", "summer", "autumn", "winter"],
      ["School visits are booked through:", "Schools should book their visits through", "the education officer", "the main office", "the council website", "the site supervisor"],
    ],
  },
  {
    id: "monologue-theatre-backstage", title: "Backstage Tour of the City Theatre",
    titleVi: "Tham quan hậu trường nhà hát",
    speaker: "Tour leader", who: "a theatre staff member leading a backstage tour",
    intro: "Welcome to the Royal Crescent Theatre. I'm Dana, and today I'm taking you behind the scenes.",
    outro: "Right, let's begin at the stage door - and please switch your phones to silent.",
    items: [
      ["The theatre was originally built as:", "The building was originally built as", "a cinema", "a market hall", "a church", "a school"],
      ["How many seats does the main auditorium have?", "The main auditorium seats", "eight hundred", "five hundred", "twelve hundred", "two thousand"],
      ["The stage is unusual because it:", "What makes our stage unusual is that it can", "revolve", "be raised", "be flooded", "be extended outdoors"],
      ["Costumes are stored:", "All the costumes are stored", "in the basement", "in the attic", "off site", "backstage"],
      ["The lighting box is reached by:", "You reach the lighting box by", "a spiral staircase", "a lift", "a ladder", "a corridor"],
      ["Rehearsals normally take place in the:", "Most rehearsals happen in the", "studio space", "main auditorium", "foyer", "workshop"],
      ["The workshop mainly makes:", "The workshop mainly makes", "wooden scenery", "wigs", "posters", "furniture for sale"],
      ["Photography is allowed:", "Photography is allowed only", "in the foyer", "on the stage", "in the costume store", "nowhere in the building"],
      ["Volunteers usually help with:", "Most of our volunteers help with", "front of house", "lighting", "set building", "ticket sales online"],
      ["Tickets are cheapest on:", "Tickets are cheapest for the", "Tuesday previews", "Sunday matinees", "Friday nights", "opening performances"],
    ],
  },
  {
    id: "monologue-nature-reserve", title: "Introduction to a Wetland Nature Reserve",
    titleVi: "Giới thiệu khu bảo tồn đất ngập nước",
    speaker: "Warden", who: "a warden briefing visitors at a wetland reserve",
    intro: "Good morning, and welcome to Marshbank Wetland Reserve. I'm Ellie, one of the wardens here.",
    outro: "Enjoy your walk, and please remember to keep dogs on a lead at all times.",
    items: [
      ["The reserve covers an area of:", "The reserve covers around", "two hundred hectares", "fifty hectares", "eight hundred hectares", "twenty hectares"],
      ["The main habitat here is:", "The dominant habitat here is", "reed bed", "woodland", "grassland", "sand dune"],
      ["The most famous bird species is the:", "The species most visitors come to see is the", "bittern", "kingfisher", "osprey", "heron"],
      ["The best hide for beginners is:", "For a first visit I'd recommend", "the lakeside hide", "the tower hide", "the woodland hide", "the river hide"],
      ["The boardwalk was rebuilt using:", "The boardwalk was rebuilt using", "recycled plastic", "oak planks", "concrete slabs", "steel mesh"],
      ["Water levels are controlled by:", "Water levels are controlled by", "sluice gates", "pumps", "rainfall alone", "a dam"],
      ["Volunteers meet on:", "The volunteer work party meets every", "Thursday", "Monday", "Saturday", "Sunday"],
      ["The visitor centre café is closed on:", "The café is closed every", "Monday", "Tuesday", "Wednesday", "Friday"],
      ["Cycling is permitted only on the:", "Cycling is permitted only on the", "perimeter track", "boardwalk", "main path", "access road"],
      ["The pond-dipping activity costs:", "Pond dipping for families costs", "£3", "£5", "£8", "£10"],
    ],
  },
  {
    id: "monologue-bus-network", title: "Radio Announcement: Changes to the City Bus Network",
    titleVi: "Thông báo thay đổi mạng xe buýt thành phố",
    speaker: "Presenter", who: "a radio presenter explaining changes to a city bus network",
    intro: "And now our travel update. From next month there are some significant changes to the city bus network, so listen carefully if you use the buses.",
    outro: "Full details are on the transport authority website, and printed timetables are in all libraries.",
    items: [
      ["The changes begin on:", "The new timetable starts on", "1 September", "1 August", "15 September", "1 October"],
      ["Which route is being extended?", "The route being extended is", "route 12", "route 4", "route 27", "route 40"],
      ["The new route will serve the:", "The extension will finally serve the", "hospital", "airport", "stadium", "university"],
      ["Evening services will run every:", "In the evening buses will run every", "twenty minutes", "ten minutes", "half an hour", "hour"],
      ["The single fare will be:", "The flat single fare becomes", "£2", "£1.50", "£2.50", "£3"],
      ["Day tickets can now be bought:", "Day tickets can now be bought", "on the app", "only on board", "at the station", "from newsagents"],
      ["Which service is being withdrawn?", "Unfortunately the service being withdrawn is the", "late-night route 9", "early route 3", "Sunday route 15", "school route 21"],
      ["Bus lanes will operate:", "The bus lanes will now operate", "all day", "in the morning only", "at weekends only", "in the evening only"],
      ["Passengers with disabilities can arrange:", "Passengers with disabilities can arrange", "door-to-door transport", "free taxis", "priority seats", "personal assistants"],
      ["Complaints should be made:", "Complaints should be made", "online", "by phone", "by letter", "in person"],
    ],
  },
  {
    id: "monologue-new-library", title: "Opening Talk: The New Public Library Building",
    titleVi: "Giới thiệu toà thư viện công cộng mới",
    speaker: "Manager", who: "a library manager describing a new library building",
    intro: "Thank you all for coming to this preview of our new library building. I'm Ravi, the library manager.",
    outro: "We open to the public a week from Saturday, and entry will of course be free.",
    items: [
      ["The building has how many floors?", "The building has", "four floors", "two floors", "three floors", "six floors"],
      ["The children's area is on the:", "The children's area is on the", "ground floor", "first floor", "top floor", "lower ground floor"],
      ["The quiet study zone is on the:", "The quiet study zone is on the", "top floor", "ground floor", "second floor", "first floor"],
      ["The building is heated using:", "The building is heated using", "ground-source heat pumps", "gas boilers", "solar panels", "wood pellets"],
      ["What has doubled compared with the old library?", "Compared with the old building we have doubled the number of", "study desks", "books", "meeting rooms", "staff"],
      ["The recording studio can be used by:", "The small recording studio is free for", "members under 25", "all members", "local businesses", "school groups"],
      ["The local history collection has moved to:", "The local history collection has moved to", "the archive room", "the ground floor", "the university", "the town hall"],
      ["Library membership now allows borrowers to keep books for:", "Members can now keep books for", "four weeks", "two weeks", "three weeks", "six weeks"],
      ["The rooftop terrace will be used for:", "The rooftop terrace will be used for", "author events", "a café", "storage", "staff parking"],
      ["Volunteers are especially needed to help with:", "We especially need volunteers to help with", "digital skills sessions", "shelving", "gardening", "guided tours"],
    ],
  },
  {
    id: "monologue-safety-briefing", title: "Workplace Safety Briefing for New Staff",
    titleVi: "Buổi phổ biến an toàn cho nhân viên mới",
    speaker: "Officer", who: "a safety officer briefing new employees",
    intro: "Right, welcome to the team. Before you start on the floor, I need to run through our safety procedures. It only takes fifteen minutes and it matters.",
    outro: "Sign the attendance sheet on your way out, and collect your protective equipment from the store.",
    items: [
      ["The first thing to do in an emergency is:", "In any emergency the first thing you do is", "raise the alarm", "call your manager", "leave the building", "switch off machines"],
      ["The assembly point is:", "The assembly point is", "the staff car park", "the main entrance", "the loading bay", "the canteen"],
      ["Fire drills are held:", "We hold fire drills", "twice a year", "monthly", "once a year", "every three months"],
      ["Accidents must be reported within:", "All accidents must be reported within", "24 hours", "one week", "one hour", "three days"],
      ["First-aid kits are kept:", "First-aid kits are kept", "in every department", "at reception", "in the manager's office", "in the canteen"],
      ["Safety boots are required in the:", "Safety boots are compulsory in the", "warehouse", "office", "canteen", "car park"],
      ["Heavy items should be lifted using:", "Heavy items must be lifted using", "the trolley", "two people", "the forklift", "a back support"],
      ["Chemical spills should be reported to:", "Chemical spills must be reported to", "the shift supervisor", "the safety officer", "reception", "the cleaner"],
      ["Visitors must always:", "Visitors must always", "wear a badge", "be escorted", "sign a waiver", "stay in reception"],
      ["The safety notice board is updated:", "The safety notice board is updated every", "week", "day", "month", "term"],
    ],
  },
  {
    id: "monologue-hostel-rules", title: "Arrival Talk at a Youth Hostel",
    titleVi: "Hướng dẫn nhận phòng ở hostel",
    speaker: "Warden", who: "a hostel warden welcoming guests",
    intro: "Hi everyone, welcome to Lakeview Hostel. I'm Tom, and I just need to go through a few practical points with you.",
    outro: "That's it. Your keys are in the envelopes on the desk - enjoy your stay.",
    items: [
      ["Check-out time is:", "Check-out is at", "10 am", "11 am", "midday", "9 am"],
      ["Breakfast is served until:", "Breakfast is served until", "9.30", "8.30", "10.00", "11.00"],
      ["The kitchen closes at:", "The self-catering kitchen closes at", "10 pm", "9 pm", "11 pm", "midnight"],
      ["Bed linen is:", "Bed linen is", "included in the price", "hired separately", "not provided", "sold at reception"],
      ["Which area is not allowed for eating?", "Please don't eat in the", "dormitories", "garden", "lounge", "dining room"],
      ["Bikes can be stored in the:", "Bikes can be stored in the", "locked shed", "reception area", "cellar", "car park"],
      ["Laundry tokens cost:", "Laundry tokens cost", "£2", "£1", "£3", "£4"],
      ["The quiet period starts at:", "The quiet period starts at", "11 pm", "10 pm", "midnight", "9 pm"],
      ["Valuables should be left:", "Valuables should be left", "in the safe", "in your locker", "at reception", "in your room"],
      ["Guided walks leave from the:", "The guided walks leave from the", "front steps", "car park", "boathouse", "village square"],
    ],
  },
  {
    id: "map-botanical-garden", title: "Map Labelling: Botanical Garden Layout",
    titleVi: "Điền bản đồ: sơ đồ vườn thực vật",
    speaker: "Guide", who: "a guide describing the layout of a botanical garden",
    intro: "Welcome to Ferndale Botanical Garden. Let me describe the layout so you can find your way around easily.",
    outro: "Maps are also available at the entrance if you prefer paper.",
    items: [
      ["The entrance faces:", "The main entrance faces", "the car park", "the lake", "the glasshouse", "the woodland"],
      ["Immediately left of the entrance is the:", "Immediately to the left of the entrance is the", "ticket office", "café", "shop", "toilet block"],
      ["The glasshouse stands:", "The glasshouse stands", "at the top of the slope", "beside the lake", "next to the car park", "behind the café"],
      ["The rose garden is:", "The rose garden lies", "between the café and the lake", "behind the glasshouse", "beside the car park", "at the far north"],
      ["The children's play area is:", "The children's play area is", "next to the café", "by the lake", "in the woodland", "near the glasshouse"],
      ["The herb beds are found:", "The herb beds are found", "south of the glasshouse", "north of the lake", "beside the entrance", "in the orchard"],
      ["The lake has:", "The lake has", "a wooden bridge", "a fountain", "two islands", "a boathouse"],
      ["The tallest trees are in the:", "The tallest trees are in the", "arboretum", "orchard", "rose garden", "herb beds"],
      ["Wheelchair users should use the path:", "Wheelchair users should take the path", "along the lake", "up the slope", "through the woodland", "past the herb beds"],
      ["The exit is shared with the:", "The exit is shared with the", "shop", "café", "glasshouse", "play area"],
    ],
  },
  {
    id: "monologue-sports-centre-plan", title: "Guide to the New Sports Centre",
    titleVi: "Giới thiệu trung tâm thể thao mới",
    speaker: "Coordinator", who: "a centre coordinator explaining facilities",
    intro: "Hello and welcome to Westside Sports Centre. I'm Jade, the activities coordinator, and I'll take you through what's on offer.",
    outro: "Timetables are on the app, and the first class you try is always free.",
    items: [
      ["The swimming pool is:", "The main pool is", "25 metres long", "50 metres long", "20 metres long", "33 metres long"],
      ["The gym is located on the:", "The gym is on the", "first floor", "ground floor", "second floor", "lower level"],
      ["Which activity needs booking in advance?", "The only activity you must book in advance is", "badminton", "swimming", "the gym", "the sauna"],
      ["Family swimming sessions are on:", "Family swimming sessions run on", "Sunday mornings", "Saturday afternoons", "Friday evenings", "Wednesday mornings"],
      ["Lockers require:", "The lockers need", "a one-pound coin", "a token", "a card", "your own padlock"],
      ["Children's lessons start at age:", "Children's lessons start from the age of", "four", "three", "five", "seven"],
      ["The climbing wall is closed on:", "The climbing wall is closed on", "Tuesdays", "Mondays", "Thursdays", "Sundays"],
      ["Membership is cheapest for:", "The cheapest membership is for", "off-peak users", "students", "families", "over-sixties"],
      ["The café mainly sells:", "The café mainly sells", "light snacks", "hot meals", "sports drinks only", "cakes"],
      ["Free parking lasts for:", "Parking is free for", "two hours", "one hour", "three hours", "all day"],
    ],
  },
  {
    id: "monologue-traffic-report", title: "Local Radio: Weekend Roadworks Report",
    titleVi: "Bản tin giao thông cuối tuần",
    speaker: "Reporter", who: "a radio reporter describing weekend roadworks",
    intro: "It's twenty past eight, and here's your weekend travel report. There is quite a lot happening on the roads, so do plan ahead.",
    outro: "I'll have another update at nine, and there are live maps on our website.",
    items: [
      ["The main roadworks are on:", "The biggest closure is on", "the ring road", "the coast road", "the high street", "the motorway"],
      ["The work is expected to last:", "The work is expected to last", "three weekends", "one weekend", "a month", "two days"],
      ["Drivers are advised to use:", "Drivers are advised to use", "the eastern bypass", "the town centre", "the coast road", "the old bridge"],
      ["The bridge closure begins at:", "The bridge closes from", "8 pm on Friday", "6 am on Saturday", "midnight on Saturday", "noon on Friday"],
      ["Bus route changes affect:", "The changes affect bus route", "6", "16", "60", "26"],
      ["The car park being resurfaced is at:", "The car park being resurfaced is at", "the market square", "the station", "the hospital", "the leisure centre"],
      ["Cyclists should avoid:", "Cyclists should avoid", "the canal path", "the ring road", "the high street", "the park route"],
      ["The reason for the work is:", "The work is being done to", "replace water pipes", "widen the road", "resurface the tarmac", "install cables"],
      ["Delays are expected to be worst:", "Delays will be worst on", "Sunday afternoon", "Saturday morning", "Friday evening", "Monday morning"],
      ["Extra trains will run to:", "Extra trains will run to", "the stadium", "the airport", "the coast", "the city centre"],
    ],
  },
  {
    id: "monologue-wildlife-park", title: "Introduction to a Wildlife Park",
    titleVi: "Giới thiệu công viên động vật hoang dã",
    speaker: "Keeper", who: "a keeper welcoming visitors to a wildlife park",
    intro: "Good morning, and welcome to Hollow Oak Wildlife Park. My name is Sam, and I'm one of the keepers here.",
    outro: "Have a wonderful day, and please don't feed any of the animals.",
    items: [
      ["The park's main aim is:", "Our main aim these days is", "breeding rare species", "entertaining families", "training keepers", "selling plants"],
      ["The park is home to how many species?", "We now care for", "ninety species", "nineteen species", "nine species", "two hundred species"],
      ["The newest enclosure houses:", "Our newest enclosure houses", "red pandas", "lions", "penguins", "otters"],
      ["Feeding talks happen:", "Feeding talks happen", "every hour", "twice a day", "three times a day", "only at weekends"],
      ["Which animal was rescued from the pet trade?", "The animal rescued from the illegal pet trade is the", "parrot", "tortoise", "monkey", "snake"],
      ["The park train stops at:", "The park train stops at", "four points", "two points", "six points", "every enclosure"],
      ["Picnics are allowed:", "Picnics are allowed", "in the meadow", "anywhere", "only in the café", "by the lake"],
      ["Keeper experience days are for people aged:", "Keeper experience days are for anyone over", "sixteen", "twelve", "eighteen", "twenty-one"],
      ["Money from the shop supports:", "Profits from the shop support", "field conservation", "staff wages", "new buildings", "school visits"],
      ["The park closes today at:", "Today the park closes at", "5 pm", "4 pm", "6 pm", "7 pm"],
    ],
  },
  {
    id: "monologue-town-regeneration", title: "Public Meeting: Town Centre Regeneration",
    titleVi: "Họp dân: Cải tạo trung tâm thị trấn",
    speaker: "Planner", who: "a council planner presenting a regeneration project",
    intro: "Thank you for coming this evening. I'm Louise from the planning department, and I'm going to outline the regeneration plans for the town centre.",
    outro: "The consultation closes at the end of next month, and every comment will be published.",
    items: [
      ["The project will take:", "The whole project will take", "five years", "two years", "ten years", "eighteen months"],
      ["The main square will become:", "The main square will become", "a pedestrian area", "a car park", "a market hall", "a bus station"],
      ["The old mill will be converted into:", "The old mill will be converted into", "flats", "offices", "a museum", "a hotel"],
      ["Most of the funding comes from:", "Most of the funding comes from", "central government", "local taxes", "private investors", "a lottery grant"],
      ["The number of new homes planned is:", "The plan includes", "three hundred homes", "thirty homes", "a thousand homes", "sixty homes"],
      ["Residents were most concerned about:", "In the first survey residents were most concerned about", "parking", "noise", "traffic speed", "shop rents"],
      ["The new market will open on:", "The new market will trade on", "Thursdays and Saturdays", "every day", "Sundays only", "Mondays"],
      ["Trees will be planted along:", "New trees will be planted along", "the river walk", "the high street", "the ring road", "the station approach"],
      ["The cycle route will link the station with the:", "The new cycle route will link the station with the", "hospital", "college", "stadium", "industrial estate"],
      ["Comments can be submitted:", "Comments can be submitted", "on the website", "by phone", "at the library only", "in writing only"],
    ],
  },
  {
    id: "monologue-boat-trip", title: "Briefing Before a Coastal Boat Trip",
    titleVi: "Hướng dẫn trước chuyến đi thuyền",
    speaker: "Skipper", who: "a skipper briefing passengers before a boat trip",
    intro: "Morning everyone. I'm Callum, your skipper for today's trip along the coast. A few things before we cast off.",
    outro: "Right, life jackets on, and let's get going.",
    items: [
      ["The trip lasts:", "The trip lasts", "two hours", "one hour", "three hours", "half a day"],
      ["Life jackets must be worn by:", "Life jackets must be worn by", "everyone on board", "children only", "non-swimmers", "passengers on deck"],
      ["The first stop is at:", "Our first stop is at", "the seal colony", "the lighthouse", "the caves", "the island jetty"],
      ["Passengers are most likely to see:", "At this time of year you're most likely to see", "seals", "dolphins", "whales", "puffins"],
      ["Hot drinks are:", "Hot drinks are", "free on board", "sold on board", "not available", "served at the end"],
      ["If the sea is rough the boat will:", "If it gets rough we'll", "shorten the route", "return immediately", "stay in the bay", "cancel the trip"],
      ["Cameras should be:", "Cameras should be", "kept on a strap", "left in the cabin", "put in a bag", "used only when moored"],
      ["The lighthouse was built in:", "The lighthouse was built in", "1867", "1786", "1967", "1901"],
      ["Passengers should board:", "Please board", "from the rear steps", "from the front", "from the pontoon", "from the beach"],
      ["Photos of the trip can be bought:", "Photos of the trip can be bought", "at the kiosk", "online", "on board", "at the café"],
    ],
  },
  {
    id: "monologue-science-fair", title: "Announcements at a School Science Fair",
    titleVi: "Thông báo tại hội chợ khoa học",
    speaker: "Organiser", who: "an organiser giving announcements at a science fair",
    intro: "Good morning, everyone, and welcome to the regional school science fair. I'm Priya, the event organiser, and here are a few announcements.",
    outro: "Enjoy the day, and remember the prize ceremony is at half past three.",
    items: [
      ["The fair has how many exhibits?", "There are", "sixty exhibits", "sixteen exhibits", "a hundred exhibits", "six exhibits"],
      ["Judging begins at:", "Judging begins at", "eleven o'clock", "ten o'clock", "midday", "one o'clock"],
      ["The main hall contains projects on:", "The main hall contains projects on", "energy", "biology", "space", "robotics"],
      ["The robotics demonstration is in the:", "The robotics demonstration is in the", "gymnasium", "main hall", "library", "science block"],
      ["Judges will pay most attention to:", "Judges will pay most attention to", "the method", "the display", "the presentation", "the results"],
      ["Lunch is provided for:", "Lunch is provided for", "exhibitors only", "everyone", "teachers", "judges"],
      ["Students should stay by their exhibit until:", "Students must stay by their exhibit until", "two o'clock", "one o'clock", "three o'clock", "the end"],
      ["The prize for the winning team is:", "The winning team receives", "a laboratory visit", "a cash prize", "a trophy", "new equipment"],
      ["Parents can vote for:", "Parents can vote for", "the audience favourite", "the best poster", "the best speaker", "the youngest entrant"],
      ["Lost property is kept at the:", "Lost property is kept at the", "welcome desk", "school office", "gymnasium", "car park"],
    ],
  },
  {
    id: "monologue-staff-orientation", title: "Orientation for Seasonal Museum Staff",
    titleVi: "Định hướng cho nhân viên bảo tàng theo mùa",
    speaker: "Supervisor", who: "a supervisor orienting new seasonal museum staff",
    intro: "Welcome to the museum team. You're all with us for the summer season, so let me explain how the work is organised.",
    outro: "Your rotas are in your welcome packs, and my office is next to the staff room if you need me.",
    items: [
      ["Shifts normally last:", "A normal shift lasts", "six hours", "four hours", "eight hours", "nine hours"],
      ["Staff should arrive:", "Please arrive", "fifteen minutes early", "five minutes early", "half an hour early", "on the hour"],
      ["Uniforms are:", "Uniforms are", "provided free", "hired", "bought by staff", "optional"],
      ["Breaks are taken:", "Breaks are taken", "in the staff room", "in the café", "outside", "at the desk"],
      ["The most common visitor question is about:", "The question you'll hear most often is about", "the toilets", "ticket prices", "the shop", "parking"],
      ["Gallery staff must never:", "Gallery staff must never", "touch the exhibits", "sit down", "talk to visitors", "carry bags"],
      ["Groups of children must be supervised by:", "Groups of children must be supervised by", "their teachers", "gallery staff", "volunteers", "a guide"],
      ["Training on the till takes place:", "Till training takes place", "on your second day", "this afternoon", "next week", "online"],
      ["Staff can visit other museums:", "Staff can visit other museums in the region", "free of charge", "at half price", "once a month", "with a booking"],
      ["Problems with visitors should be reported to:", "Any problem with a visitor should be reported to", "the duty manager", "security", "the supervisor", "reception"],
    ],
  },
  {
    id: "monologue-arts-festival", title: "Guide to the Summer Arts Festival Programme",
    titleVi: "Giới thiệu chương trình lễ hội nghệ thuật",
    speaker: "Director", who: "a festival director outlining a programme",
    intro: "Hello, and thank you for joining this preview of the Summer Arts Festival. I'm Nina, the festival director.",
    outro: "Programmes are free at all the venues, and the box office opens on Monday.",
    items: [
      ["The festival runs for:", "The festival runs for", "ten days", "a week", "a fortnight", "three days"],
      ["The opening event will be:", "The opening event is", "an outdoor concert", "a film screening", "a street parade", "a lecture"],
      ["Most events take place in the:", "Most events take place in the", "old market building", "town hall", "park", "theatre"],
      ["Tickets for under-eighteens are:", "Tickets for under-eighteens are", "half price", "free", "full price", "sold on the day"],
      ["The photography exhibition focuses on:", "This year's photography exhibition focuses on", "local industry", "wildlife", "portraits", "architecture"],
      ["Workshops must be booked because:", "You must book workshops because", "places are limited", "they are popular", "materials are ordered", "rooms are small"],
      ["The festival's new venue is a former:", "Our new venue is a former", "railway shed", "cinema", "chapel", "school"],
      ["Street performances happen:", "Street performances happen", "each afternoon", "every morning", "at weekends", "in the evenings"],
      ["The festival is funded mainly by:", "The festival is funded mainly by", "local businesses", "the council", "ticket sales", "a national grant"],
      ["Volunteers receive:", "Volunteers receive", "free festival passes", "travel expenses", "a small payment", "a T-shirt"],
    ],
  },
];

function buildSet(t, ti) {
  const lines = [`${t.speaker}: ${t.intro}`];
  const questions = [];
  t.items.forEach((it, i) => {
    const [prompt, lead, correct, d1, d2, d3] = it;
    lines.push(`${lead} ${correct}.`);
    // Deterministic but balanced key position.
    const pos = (i * 3 + ti) % 4;
    const distractors = [d1, d2, d3];
    const options = [];
    let di = 0;
    for (let k = 0; k < 4; k++) options.push(k === pos ? correct : distractors[di++]);
    questions.push({ prompt, options, answer: pos });
  });
  lines.push(`${t.speaker}: ${t.outro}`);

  return `  {
    id: ${q(t.id)},
    section: 2,
    questionType: ${q(t.id.startsWith("map-") ? "Map / Plan Labelling" : "Multiple Choice")},
    questionTypeVi: ${q(t.id.startsWith("map-") ? "Điền bản đồ / sơ đồ" : "Chọn đáp án đúng")},
    title: ${q(t.title)},
    titleVi: ${q(t.titleVi)},
    context: ${q(`You will hear ${t.who}. Choose the correct answer for each question.`)},
    contextVi: ${q(`Bạn sẽ nghe ${t.titleVi.toLowerCase()}. Chọn đáp án đúng cho mỗi câu hỏi.`)},
    transcript:
${transcriptLiteral(lines)},
    rate: 0.9,
    questions: [
${questions.map(qq => `      { type: "mcq", prompt: ${q(qq.prompt)}, options: [${qq.options.map(q).join(", ")}], answer: ${qq.answer} },`).join("\n")}
    ],
  },`;
}

const body = topics.map(buildSet).join("\n\n");
const out = `${fileHeader(
  "ieltsListeningPracticeExpansion9.ts",
  "Wave 9 - 17 new Section 2 sets (monologues, 10 multiple-choice questions each) so IELTS Listening reaches 30 unique Section 2 recordings."
)}
export const ieltsListeningPracticeSetsExpansion9: ListeningPracticeSet[] = [
${body}
];
`;
fs.writeFileSync("src/data/ieltsListeningPracticeExpansion9.ts", out);
console.log("wrote src/data/ieltsListeningPracticeExpansion9.ts", topics.length, "sets");
