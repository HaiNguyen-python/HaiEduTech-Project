/**
 * @file finnishExampleOverrides.ts
 * @description Hand-written, 100% natural Finnish example sentences for the most
 *              frequent A1 words and for words whose inflection is irregular
 *              (so the automatic generator must not touch them).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface FinnishExampleOverride {
  fi: string;
  en: string;
}

export const FINNISH_EXAMPLE_OVERRIDES: Record<string, FinnishExampleOverride> = {
  // ---------------- Home & Housing ----------------
  koti: { fi: "Minun kotini on Helsingissä.", en: "My home is in Helsinki." },
  talo: { fi: "Asumme vanhassa puutalossa.", en: "We live in an old wooden house." },
  asunto: { fi: "Vuokrasin pienen asunnon keskustasta.", en: "I rented a small apartment downtown." },
  huone: { fi: "Asunnossa on kolme huonetta.", en: "The apartment has three rooms." },
  keittiö: { fi: "Syön aamupalaa keittiössä.", en: "I eat breakfast in the kitchen." },
  makuuhuone: { fi: "Nukun makuuhuoneessa hyvin.", en: "I sleep well in the bedroom." },
  olohuone: { fi: "Katsomme televisiota olohuoneessa.", en: "We watch television in the living room." },
  kylpyhuone: { fi: "Kylpyhuoneessa on suihku ja pyyhkeet.", en: "There is a shower and towels in the bathroom." },
  vessa: { fi: "Anteeksi, missä vessa on?", en: "Excuse me, where is the toilet?" },
  parveke: { fi: "Kesällä juon kahvia parvekkeella.", en: "In summer I drink coffee on the balcony." },
  piha: { fi: "Lapset pelaavat pihalla.", en: "The children are playing in the yard." },
  katto: { fi: "Talon katto on punainen.", en: "The roof of the house is red." },
  seinä: { fi: "Ripustin kuvan seinälle.", en: "I hung a picture on the wall." },
  lattia: { fi: "Lattia on juuri pesty.", en: "The floor has just been washed." },
  ovi: { fi: "Sulje ovi, ulkona on kylmä.", en: "Close the door, it is cold outside." },
  ikkuna: { fi: "Avaan ikkunan, koska täällä on kuuma.", en: "I am opening the window because it is hot here." },
  porras: { fi: "Nousen portaat kolmanteen kerrokseen.", en: "I walk up the stairs to the third floor." },
  hissi: { fi: "Hissi on rikki, joten kävelen.", en: "The elevator is broken, so I walk." },
  sänky: { fi: "Menen sänkyyn kello yksitoista.", en: "I go to bed at eleven o'clock." },
  pöytä: { fi: "Ruoka on jo pöydällä.", en: "The food is already on the table." },
  tuoli: { fi: "Istu tuolille, ole hyvä.", en: "Sit down on the chair, please." },
  sohva: { fi: "Sohva on pehmeä ja mukava.", en: "The sofa is soft and comfortable." },
  jääkaappi: { fi: "Maito on jääkaapissa.", en: "The milk is in the fridge." },
  sauna: { fi: "Menemme saunaan lauantai-iltana.", en: "We go to the sauna on Saturday evening." },

  // ---------------- Food & Drink ----------------
  ruoka: { fi: "Ruoka maistuu tänään erityisen hyvältä.", en: "The food tastes especially good today." },
  vesi: { fi: "Juon vettä joka aterialla.", en: "I drink water with every meal." },
  maito: { fi: "Ostin litran maitoa kaupasta.", en: "I bought a litre of milk at the shop." },
  kahvi: { fi: "Suomalaiset juovat paljon kahvia.", en: "Finns drink a lot of coffee." },
  tee: { fi: "Juon illalla mieluummin teetä kuin kahvia.", en: "In the evening I prefer tea to coffee." },
  leipä: { fi: "Syön aamiaisella leipää ja juustoa.", en: "For breakfast I eat bread and cheese." },
  ruisleipä: { fi: "Ruisleipä on tummaa ja terveellistä.", en: "Rye bread is dark and healthy." },
  juusto: { fi: "Tämä juusto on liian suolaista.", en: "This cheese is too salty." },
  liha: { fi: "En syö lihaa, olen kasvissyöjä.", en: "I do not eat meat, I am a vegetarian." },
  kala: { fi: "Isoäiti paistoi kalaa illalliseksi.", en: "Grandmother fried fish for dinner." },
  peruna: { fi: "Keitän perunoita kaksikymmentä minuuttia.", en: "I boil potatoes for twenty minutes." },
  omena: { fi: "Otan omenan mukaan kouluun.", en: "I take an apple with me to school." },
  marja: { fi: "Poimimme marjoja metsässä heinäkuussa.", en: "We pick berries in the forest in July." },
  mustikka: { fi: "Mustikat kasvavat suomalaisessa metsässä.", en: "Blueberries grow in the Finnish forest." },
  aamiainen: { fi: "Aamiainen alkaa kello seitsemän.", en: "Breakfast starts at seven o'clock." },
  lounas: { fi: "Syön lounasta työpaikan ravintolassa.", en: "I eat lunch at the workplace restaurant." },
  illallinen: { fi: "Illallinen on valmis puoli seitsemältä.", en: "Dinner is ready at half past six." },
  pasha: { fi: "Pasha on perinteinen pääsiäisherkku.", en: "Pasha is a traditional Easter treat." },

  // ---------------- Body & Health ----------------
  pää: { fi: "Minua särkee pää tänään.", en: "My head aches today." },
  käsi: { fi: "Pese kädet ennen ruokailua.", en: "Wash your hands before eating." },
  jalka: { fi: "Loukkasin jalkani jalkapallossa.", en: "I hurt my leg playing football." },
  silmä: { fi: "Hänellä on siniset silmät.", en: "She has blue eyes." },
  suu: { fi: "Avaa suu, sanoi hammaslääkäri.", en: "Open your mouth, said the dentist." },
  sydän: { fi: "Sydän lyö nopeasti juoksun jälkeen.", en: "The heart beats fast after running." },
  lääkäri: { fi: "Varasin ajan lääkärille maanantaiksi.", en: "I booked an appointment with the doctor for Monday." },
  sairaala: { fi: "Isoisä on sairaalassa viikon.", en: "Grandfather is in the hospital for a week." },
  terveys: { fi: "Uni ja liikunta ovat tärkeitä terveydelle.", en: "Sleep and exercise are important for health." },
  kipu: { fi: "Kipu meni ohi lääkkeen jälkeen.", en: "The pain went away after the medicine." },
  flunssa: { fi: "Minulla on flunssa, joten jään kotiin.", en: "I have a cold, so I am staying home." },

  // ---------------- Family & People ----------------
  perhe: { fi: "Perheeni asuu Tampereella.", en: "My family lives in Tampere." },
  äiti: { fi: "Äiti soittaa minulle joka sunnuntai.", en: "Mum calls me every Sunday." },
  isä: { fi: "Isä opetti minut hiihtämään.", en: "Dad taught me to ski." },
  lapsi: { fi: "Meillä on kaksi lasta.", en: "We have two children." },
  poika: { fi: "Poika aloittaa koulun elokuussa.", en: "The boy starts school in August." },
  tyttö: { fi: "Tyttö lukee kirjaa sohvalla.", en: "The girl is reading a book on the sofa." },
  ystävä: { fi: "Tapaan ystäväni kirjastossa.", en: "I am meeting my friend at the library." },
  naapuri: { fi: "Naapuri auttoi minua muutossa.", en: "The neighbour helped me with the move." },
  mies: { fi: "Mies odottaa bussia pysäkillä.", en: "The man is waiting for the bus at the stop." },
  nainen: { fi: "Nainen työskentelee sairaanhoitajana.", en: "The woman works as a nurse." },
  vauva: { fi: "Vauva nukkuu nyt rauhallisesti.", en: "The baby is sleeping peacefully now." },

  // ---------------- Time & Calendar ----------------
  aika: { fi: "Minulla ei ole aikaa tänään.", en: "I do not have time today." },
  päivä: { fi: "Tänään on kaunis päivä.", en: "Today is a beautiful day." },
  viikko: { fi: "Ensi viikolla alkaa suomen kurssi.", en: "The Finnish course starts next week." },
  kuukausi: { fi: "Maksan vuokran joka kuukausi.", en: "I pay the rent every month." },
  vuosi: { fi: "Olen asunut Suomessa kolme vuotta.", en: "I have lived in Finland for three years." },
  tunti: { fi: "Odotin junaa kaksi tuntia.", en: "I waited for the train for two hours." },
  minuutti: { fi: "Bussi lähtee viiden minuutin kuluttua.", en: "The bus leaves in five minutes." },
  aamu: { fi: "Aamulla juon kahvia ja luen uutiset.", en: "In the morning I drink coffee and read the news." },
  ilta: { fi: "Illalla kävelen koiran kanssa.", en: "In the evening I walk with the dog." },
  ({} as never) as unknown as string extends never ? never : never: undefined as never,
};
