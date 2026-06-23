// Utilities for ConversationalLessonView: protagonist names per lesson
// and thematic photo banners per situation (real-people photographs).

import imgAirport from "@/assets/conversational/airport.jpg";
import imgRestaurant from "@/assets/conversational/restaurant.jpg";
import imgComplaint from "@/assets/conversational/complaint.jpg";
import imgInterview from "@/assets/conversational/interview.jpg";
import imgNegotiation from "@/assets/conversational/negotiation.jpg";
import imgMeeting from "@/assets/conversational/meeting.jpg";
import imgPresentation from "@/assets/conversational/presentation.jpg";
import imgEmail from "@/assets/conversational/email.jpg";
import imgConflict from "@/assets/conversational/conflict.jpg";
import imgDoctor from "@/assets/conversational/doctor.jpg";
import imgShopping from "@/assets/conversational/shopping.jpg";
import imgDirections from "@/assets/conversational/directions.jpg";
import imgDating from "@/assets/conversational/dating.jpg";
import imgBanking from "@/assets/conversational/banking.jpg";
import imgWeather from "@/assets/conversational/weather.jpg";
import imgCelebration from "@/assets/conversational/celebration.jpg";
import imgPets from "@/assets/conversational/pets.jpg";
import imgHousing from "@/assets/conversational/housing.jpg";
import imgEntertainment from "@/assets/conversational/entertainment.jpg";
import imgDigital from "@/assets/conversational/digital.jpg";
import imgTravel from "@/assets/conversational/travel.jpg";
import imgEmergency from "@/assets/conversational/emergency.jpg";
import imgNetworking from "@/assets/conversational/networking.jpg";
import imgRemote from "@/assets/conversational/remote.jpg";
import imgCustomerService from "@/assets/conversational/customer-service.jpg";
import imgLeadership from "@/assets/conversational/leadership.jpg";
import imgOnboarding from "@/assets/conversational/onboarding.jpg";
import imgFreelance from "@/assets/conversational/freelance.jpg";
import imgWorkplaceCulture from "@/assets/conversational/workplace-culture.jpg";
import imgDebate from "@/assets/conversational/debate.jpg";
import imgStudyAbroad from "@/assets/conversational/study-abroad.jpg";
import imgEssay from "@/assets/conversational/essay.jpg";
import imgInternship from "@/assets/conversational/internship.jpg";
import imgGroupProject from "@/assets/conversational/group-project.jpg";
import imgQuitting from "@/assets/conversational/quitting.jpg";
import imgSocializing from "@/assets/conversational/socializing.jpg";
import imgCooking from "@/assets/conversational/cooking.jpg";
import imgDefault from "@/assets/conversational/default.jpg";

const NAME_POOL = [
  "Peter", "Mary", "John", "Emma", "Liam", "Sophia", "Noah", "Olivia",
  "Ethan", "Ava", "Lucas", "Chloe", "Daniel", "Mia", "Alex", "Grace",
  "Henry", "Lily", "Oscar", "Zoe",
];

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** Returns a consistent protagonist name for a given lesson id. */
export function protagonistFor(lessonId: string): string {
  return NAME_POOL[hash(lessonId) % NAME_POOL.length];
}

// Keyword -> image mapping. Order matters: most specific first.
const IMAGE_MAP: { keywords: RegExp; src: string }[] = [
  { keywords: /airport|flight|baggage|boarding|customs|check[- ]?in/i, src: imgAirport },
  { keywords: /complaint|refund|return|wrong order|defect/i, src: imgComplaint },
  { keywords: /restaurant|dining|menu|order food|waiter|meal|chef/i, src: imgRestaurant },
  { keywords: /cooking|recipe|kitchen/i, src: imgCooking },
  { keywords: /interview|hiring|job offer|applicant/i, src: imgInterview },
  { keywords: /salary|negotia|contract|deal|pricing|terms/i, src: imgNegotiation },
  { keywords: /presentation|pitch|product demo|launch/i, src: imgPresentation },
  { keywords: /meeting|agenda|brainstorm|standup|board/i, src: imgMeeting },
  { keywords: /email|message|chat|memo/i, src: imgEmail },
  { keywords: /conflict|difficult|disagree|argument|tension/i, src: imgConflict },
  { keywords: /doctor|health|hospital|pharmacy|medicine|symptom|clinic|sick/i, src: imgDoctor },
  { keywords: /shopping|store|clothes|sweater|jacket|boutique|buy/i, src: imgShopping },
  { keywords: /direction|map|address|lost|street|navigat/i, src: imgDirections },
  { keywords: /dating|romance|first date|coffee date/i, src: imgDating },
  { keywords: /bank|loan|saving|invest|budget|atm|teller/i, src: imgBanking },
  { keywords: /weather|season|rain|snow|sun|forecast/i, src: imgWeather },
  { keywords: /celebrat|festival|party|holiday|birthday|wedding/i, src: imgCelebration },
  { keywords: /pet|dog|cat|vet|animal/i, src: imgPets },
  { keywords: /housing|apartment|rent|lease|landlord|home repair/i, src: imgHousing },
  { keywords: /entertainment|movie|cinema|music|concert|game night/i, src: imgEntertainment },
  { keywords: /digital|online|social media|app|smartphone|internet/i, src: imgDigital },
  { keywords: /travel|trip|vacation|tour|hotel|booking/i, src: imgTravel },
  { keywords: /emergency|police|fire|accident|urgent/i, src: imgEmergency },
  { keywords: /network|conference|introduc|business card|mixer/i, src: imgNetworking },
  { keywords: /remote|work from home|video call|zoom|hybrid/i, src: imgRemote },
  { keywords: /customer|service|support|help desk|complain to staff/i, src: imgCustomerService },
  { keywords: /leadership|manage team|delegate|coach/i, src: imgLeadership },
  { keywords: /mentor|training session/i, src: imgLeadership },
  { keywords: /onboard|new employee|first day|orientation/i, src: imgOnboarding },
  { keywords: /freelance|client work|invoice|gig|consult/i, src: imgFreelance },
  { keywords: /culture|workplace|diversity|inclusion/i, src: imgWorkplaceCulture },
  { keywords: /debate|opinion|argue|discuss issue|seminar/i, src: imgDebate },
  { keywords: /study abroad|exchange|international student/i, src: imgStudyAbroad },
  { keywords: /essay|writing assignment|research|thesis|paper/i, src: imgEssay },
  { keywords: /internship|career fair|graduation|first job/i, src: imgInternship },
  { keywords: /group project|team work|collaborat|study group/i, src: imgGroupProject },
  { keywords: /quitting|resign|leave the company|notice/i, src: imgQuitting },
  { keywords: /socializ|friend|hobby|small talk|gathering/i, src: imgSocializing },
];

export function bannerImageFor(title: string, descriptionVi?: string, description?: string): string {
  const text = `${title} ${descriptionVi ?? ""} ${description ?? ""}`;
  for (const { keywords, src } of IMAGE_MAP) {
    if (keywords.test(text)) return src;
  }
  return imgDefault;
}
