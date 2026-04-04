/**
 * @file mockExamExpansion.ts
 * @description Expanded mock exam content — additional reading, listening, writing, speaking sets.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 * @license Private / Proprietary - No unauthorized copying or distribution.
 */
import type { FinnishModule } from "./types";

export const finnishMockExamExpansionModules: FinnishModule[] = [
  // ===== ADDITIONAL READING (5 new sets) =====
  {
    id: "yki-mock-reading-extra",
    title: "Lisää lukutehtäviä",
    titleEn: "More Reading Tasks",
    icon: "📖",
    color: "from-teal-500 to-cyan-600",
    description: "Lisää YKI-tyyppisiä tekstejä: ilmoituksia, mainoksia, ohjeita ja uutisia.",
    descriptionEn: "More YKI-style texts: notices, ads, instructions and news.",
    pillar: "mock-exams",
    lessons: [
      {
        id: "yki-mock-reading-6",
        title: "Terveyskeskuksen ilmoitus",
        titleEn: "Health Center Notice",
        icon: "🏥",
        level: "A2",
        theory: `### Lue ilmoitus ja vastaa kysymyksiin.

**Espoon terveyskeskus — Rokotustiedote**

Hyvät asiakkaat!

Influenssarokotukset alkavat maanantaina 15.10. Rokotus on ilmainen yli 65-vuotiaille, raskaana oleville ja riskiryhmiin kuuluville.

Rokotusajat: ma–pe klo 8–16, ei ajanvarausta.

Huom! Rokotusta ei anneta, jos sinulla on kuumetta tai akuutti infektio. Ota mukaan Kela-kortti.

Lisätietoja: puh. 09-1234567 tai espoo.fi/rokotukset`,
        theoryEn: `### Read the health center notice about flu vaccinations and answer the questions.`,
        quiz: [
          { question: "Milloin rokotukset alkavat?", options: ["1.10.", "15.10.", "1.11.", "15.11."], answer: 1, explanation: "'Rokotukset alkavat maanantaina 15.10.'" },
          { question: "Kenelle rokotus on ilmainen?", options: ["Kaikille", "Yli 65-vuotiaille ja riskiryhmille", "Vain lapsille", "Opiskelijoille"], answer: 1, explanation: "'Ilmainen yli 65-vuotiaille, raskaana oleville ja riskiryhmiin kuuluville.'" },
          { question: "Tarvitaanko ajanvarausta?", options: ["Kyllä", "Ei"], answer: 1, explanation: "'Ei ajanvarausta.'" },
          { question: "Milloin rokotusta ei anneta?", options: ["Jos on väsynyt", "Jos on kuumetta", "Jos on kiire", "Jos ei ole Kela-korttia"], answer: 1, explanation: "'Rokotusta ei anneta, jos sinulla on kuumetta.'" },
          { question: "Mitä pitää ottaa mukaan?", options: ["Passi", "Kela-kortti", "Ajokortti", "Pankkikortti"], answer: 1, explanation: "'Ota mukaan Kela-kortti.'" },
        ],
      },
      {
        id: "yki-mock-reading-7",
        title: "Vuokra-asuntoilmoitus",
        titleEn: "Rental Ad",
        icon: "🏠",
        level: "A2",
        theory: `### Lue vuokra-asuntoilmoitus ja vastaa kysymyksiin.

**VUOKRATAAN: 2H+K, Tampere Hervanta**

Siisti ja valoisa kaksio Hervannan keskustassa. 52 m², 4. kerros, hissi.

- Keittiössä liesi, jääkaappi ja astianpesukone
- Parveke etelään
- Oma sauna
- Autopaikka erikseen 30 €/kk

Vuokra: 750 €/kk + sähkö (n. 40 €/kk)
Takuuvuokra: 1 kk vuokra
Vapautuu: 1.4.2025

Yhteydenotot: vuokra@asunnot.fi tai puh. 040-1234567`,
        theoryEn: `### Read the rental apartment ad and answer the questions.`,
        quiz: [
          { question: "Kuinka suuri asunto on?", options: ["32 m²", "42 m²", "52 m²", "62 m²"], answer: 2, explanation: "'52 m²'" },
          { question: "Missä kerroksessa asunto on?", options: ["2. kerroksessa", "3. kerroksessa", "4. kerroksessa", "5. kerroksessa"], answer: 2, explanation: "'4. kerros'" },
          { question: "Paljonko vuokra on kuukaudessa?", options: ["650 €", "700 €", "750 €", "800 €"], answer: 2, explanation: "'Vuokra: 750 €/kk'" },
          { question: "Kuuluuko sähkö vuokraan?", options: ["Kyllä", "Ei, se on erikseen"], answer: 1, explanation: "'750 €/kk + sähkö (n. 40 €/kk)'" },
          { question: "Milloin asunto vapautuu?", options: ["1.1.2025", "1.3.2025", "1.4.2025", "1.5.2025"], answer: 2, explanation: "'Vapautuu: 1.4.2025'" },
        ],
      },
      {
        id: "yki-mock-reading-8",
        title: "Kelan esite",
        titleEn: "Kela Brochure",
        icon: "📄",
        level: "A2",
        theory: `### Lue Kelan esite ja vastaa kysymyksiin.

**Opintotuki — tietoa opiskelijoille**

Opintotuki on Kelan maksama tuki opiskelijoille. Se koostuu:
1. **Opintorahasta** (max 268,23 €/kk)
2. **Asumislisästä** (max 210 €/kk ulkomailla opiskeleville)
3. **Opintolainan valtiontakauksesta** (max 650 €/kk)

**Ehdot:**
- Päätoiminen opiskelija
- Opintojen edistyttävä riittävästi (20 op/lukuvuosi)
- Vuositulot eivät saa ylittää tulorajaa

**Hae:** Asiointipalvelussa kela.fi tai lomakkeella OT 1.
**Huom:** Opintotukea ei makseta kesällä, ellei opiskele kesäopintoja.`,
        theoryEn: `### Read the Kela brochure about student financial aid and answer the questions.`,
        quiz: [
          { question: "Kuinka paljon opintoraha on enintään?", options: ["168,23 €", "218,23 €", "268,23 €", "368,23 €"], answer: 2, explanation: "'max 268,23 €/kk'" },
          { question: "Kuinka monta opintopistettä pitää suorittaa vuodessa?", options: ["10 op", "15 op", "20 op", "30 op"], answer: 2, explanation: "'20 op/lukuvuosi'" },
          { question: "Maksetaanko opintotukea kesällä?", options: ["Kyllä aina", "Ei, paitsi jos opiskelee kesällä", "Vain heinäkuussa", "Kyllä puolet"], answer: 1, explanation: "'Ei makseta kesällä, ellei opiskele kesäopintoja.'" },
          { question: "Mistä opintotukea haetaan?", options: ["Pankilta", "Kelasta", "Yliopistolta", "TE-toimistosta"], answer: 1, explanation: "'Hae: kela.fi'" },
        ],
      },
      {
        id: "yki-mock-reading-9",
        title: "Bussilipun ohjeet",
        titleEn: "Bus Ticket Instructions",
        icon: "🚌",
        level: "A2",
        theory: `### Lue ohjeet ja vastaa kysymyksiin.

**HSL — Matkakortin käyttöohjeet**

1. Lataa kortti automaatilla, R-kioskilla tai HSL-sovelluksella
2. Näytä kortti lukijalle noustessasi bussiin
3. Kuulet piippauksen = matka rekisteröity
4. Kertavyöhykelippu (AB): 2,80 € (sovelluksella 2,20 €)
5. 30 päivän kausilippu (AB): 62,70 €

**Huom:**
- Alle 7-vuotiaat matkustavat ilmaiseksi aikuisen kanssa
- Opiskelija-alennus vaatii opiskelijakortin
- Lipun voi ostaa myös kuljettajalta (käteisellä ei voi maksaa)

Asiakaspalvelu: 09-4766 4000 | hsl.fi`,
        theoryEn: `### Read the HSL travel card instructions and answer the questions.`,
        quiz: [
          { question: "Paljonko kertalippu maksaa sovelluksella?", options: ["1,80 €", "2,20 €", "2,80 €", "3,20 €"], answer: 1, explanation: "'sovelluksella 2,20 €'" },
          { question: "Paljonko 30 päivän kausilippu maksaa?", options: ["52,70 €", "62,70 €", "72,70 €", "82,70 €"], answer: 1, explanation: "'62,70 €'" },
          { question: "Kuka matkustaa ilmaiseksi?", options: ["Opiskelijat", "Eläkeläiset", "Alle 7-vuotiaat", "Kaikki"], answer: 2, explanation: "'Alle 7-vuotiaat matkustavat ilmaiseksi aikuisen kanssa.'" },
          { question: "Voiko kuljettajalta ostaa käteisellä?", options: ["Kyllä", "Ei"], answer: 1, explanation: "'Käteisellä ei voi maksaa.'" },
        ],
      },
      {
        id: "yki-mock-reading-10",
        title: "Harrastusryhmän mainos",
        titleEn: "Hobby Group Advertisement",
        icon: "🎨",
        level: "A2",
        theory: `### Lue mainos ja vastaa kysymyksiin.

**TULE MUKAAN! Espoon kansalaisopiston kurssit keväällä 2025**

🎨 **Akvarellimaalaus** (aloittelijoille)
- Ti klo 18–20, 10 kertaa, 85 €
- Opettaja: Minna Salonen

🧘 **Jooga ja mindfulness**
- To klo 17–18:30, 12 kertaa, 70 €
- Huom: Ota oma matto mukaan!

🍳 **Suomalainen ruokakulttuuri — kokkikurssi**
- La klo 10–14, 5 kertaa, 120 € (sisältää raaka-aineet)

**Ilmoittautuminen:** espoo.fi/kansalaisopisto tai puh. 09-8765 4321
**Ilmoittautuminen alkaa 15.1. klo 9:00**`,
        theoryEn: `### Read the advertisement for hobby courses and answer the questions.`,
        quiz: [
          { question: "Paljonko akvarellimaalaus maksaa?", options: ["70 €", "85 €", "100 €", "120 €"], answer: 1, explanation: "'85 €'" },
          { question: "Milloin joogakurssi on?", options: ["Tiistaisin", "Keskiviikkoisin", "Torstaisin", "Lauantaisin"], answer: 2, explanation: "'To klo 17–18:30'" },
          { question: "Mitä pitää ottaa mukaan joogaan?", options: ["Kirja", "Oma matto", "Vaihtovaatteet", "Vesipullo"], answer: 1, explanation: "'Ota oma matto mukaan!'" },
          { question: "Sisältääkö kokkikurssin hinta raaka-aineet?", options: ["Kyllä", "Ei"], answer: 0, explanation: "'120 € (sisältää raaka-aineet)'" },
          { question: "Milloin ilmoittautuminen alkaa?", options: ["1.1.", "10.1.", "15.1.", "20.1."], answer: 2, explanation: "'Ilmoittautuminen alkaa 15.1. klo 9:00'" },
        ],
      },
    ],
  },

  // ===== ADDITIONAL LISTENING (5 new sets) =====
  {
    id: "yki-mock-listening-extra",
    title: "Lisää kuuntelutehtäviä",
    titleEn: "More Listening Tasks",
    icon: "🎧",
    color: "from-violet-500 to-purple-600",
    description: "Lisää arkipäivän keskusteluja ja kuulutuksia — puhelin, kauppa, virasto.",
    descriptionEn: "More everyday conversations and announcements — phone, shop, office.",
    pillar: "mock-exams",
    lessons: [
      {
        id: "yki-mock-listening-6",
        title: "Kelassa asioiminen",
        titleEn: "At Kela Office",
        icon: "🏛️",
        level: "A2",
        theory: `### Kuuntele keskustelu ja vastaa kysymyksiin.

**Transkriptio:**

> **Virkailija:** Hyvää päivää. Miten voin auttaa?
>
> **Asiakas:** Hei. Haluaisin hakea asumistukea. Muutin juuri uuteen asuntoon.
>
> **Virkailija:** Selvä. Onko sinulla mukana vuokrasopimus?
>
> **Asiakas:** Kyllä, tässä on se. Vuokra on 650 euroa kuukaudessa.
>
> **Virkailija:** Entä tulotietosi? Oletko töissä vai opiskelija?
>
> **Asiakas:** Olen opiskelija. Saan opintotukea.
>
> **Virkailija:** Hyvä. Täytä tämä lomake ja lähetä se liitteineen. Päätös tulee noin 4 viikon kuluessa.`,
        theoryEn: `### Listen to the conversation at Kela about applying for housing allowance.`,
        quiz: [
          { question: "Mitä asiakas haluaa hakea?", options: ["Opintotukea", "Asumistukea", "Työttömyystukea", "Sairauspäivärahaa"], answer: 1, explanation: "'Haluaisin hakea asumistukea.'" },
          { question: "Paljonko vuokra on?", options: ["550 €", "600 €", "650 €", "700 €"], answer: 2, explanation: "'Vuokra on 650 euroa kuukaudessa.'" },
          { question: "Onko asiakas töissä?", options: ["Kyllä", "Ei, hän on opiskelija"], answer: 1, explanation: "'Olen opiskelija.'" },
          { question: "Kuinka nopeasti päätös tulee?", options: ["1 viikossa", "2 viikossa", "4 viikossa", "2 kuukaudessa"], answer: 2, explanation: "'Päätös tulee noin 4 viikon kuluessa.'" },
        ],
      },
      {
        id: "yki-mock-listening-7",
        title: "Hätäpuhelu",
        titleEn: "Emergency Call",
        icon: "🚨",
        level: "A2",
        theory: `### Kuuntele hätäpuhelu ja vastaa kysymyksiin.

**Transkriptio:**

> **Päivystäjä:** Hätäkeskus, mikä hätänä?
>
> **Soittaja:** Naapurin asunnosta tulee savua! Luulen, että siellä on tulipalo!
>
> **Päivystäjä:** Mikä on osoite?
>
> **Soittaja:** Mannerheimintie 45 B, kolmas kerros.
>
> **Päivystäjä:** Onko talossa ihmisiä?
>
> **Soittaja:** En tiedä. Naapuri on ehkä töissä.
>
> **Päivystäjä:** Palokunta on matkalla. Menkää ulos ja odottakaa turvallisessa paikassa. Älkää käyttäkö hissiä.`,
        theoryEn: `### Listen to the emergency call about smoke/fire in a neighbor's apartment.`,
        quiz: [
          { question: "Mikä hätä on?", options: ["Varkaus", "Sairauskohtaus", "Tulipalo", "Liikenneonnettomuus"], answer: 2, explanation: "'Naapurin asunnosta tulee savua! Tulipalo!'" },
          { question: "Mikä on osoite?", options: ["Mannerheimintie 35 A", "Mannerheimintie 45 B", "Aleksanterinkatu 45", "Hämeentie 45 C"], answer: 1, explanation: "'Mannerheimintie 45 B'" },
          { question: "Mitä ei saa käyttää?", options: ["Portaita", "Puhelinta", "Hissiä", "Vesijohtoa"], answer: 2, explanation: "'Älkää käyttäkö hissiä.'" },
        ],
      },
      {
        id: "yki-mock-listening-8",
        title: "Puhelintilaus ravintolaan",
        titleEn: "Phone Order at Restaurant",
        icon: "🍕",
        level: "A2",
        theory: `### Kuuntele puhelinkeskustelu ja vastaa kysymyksiin.

**Transkriptio:**

> **Työntekijä:** Pizza Roma, hyvää iltaa!
>
> **Asiakas:** Iltaa! Haluaisin tilata kotiinkuljetuksella.
>
> **Työntekijä:** Tietenkin! Mitä saisi olla?
>
> **Asiakas:** Yksi Margherita ja yksi Pepperoni, molemmat isoja. Ja Cola 1,5 litraa.
>
> **Työntekijä:** Selvä. Margherita 12 euroa, Pepperoni 14 euroa ja Cola 3 euroa. Yhteensä 29 euroa. Toimitusaika on noin 40 minuuttia.
>
> **Asiakas:** Hyvä. Osoite on Kalevankatu 8 A 15.
>
> **Työntekijä:** Kiitos tilauksesta!`,
        theoryEn: `### Listen to the phone order for pizza delivery.`,
        quiz: [
          { question: "Mitä asiakas tilaa?", options: ["Kaksi Margheritaa", "Margheritan ja Pepperonin", "Kaksi Pepperonia", "Salaatin ja pizzan"], answer: 1, explanation: "'Yksi Margherita ja yksi Pepperoni'" },
          { question: "Paljonko tilaus maksaa yhteensä?", options: ["26 €", "27 €", "29 €", "32 €"], answer: 2, explanation: "'Yhteensä 29 euroa.'" },
          { question: "Kuinka kauan toimitus kestää?", options: ["20 min", "30 min", "40 min", "60 min"], answer: 2, explanation: "'Toimitusaika on noin 40 minuuttia.'" },
        ],
      },
      {
        id: "yki-mock-listening-9",
        title: "Kuulutus kauppakeskuksessa",
        titleEn: "Shopping Center Announcement",
        icon: "🏬",
        level: "A2",
        theory: `### Kuuntele kuulutus ja vastaa kysymyksiin.

**Transkriptio:**

> "Hyvät asiakkaat! Kauppakeskus Itis sulkeutuu tänään kello 21. Viimeiset ostokset voi tehdä kello 20:45 mennessä.
>
> Muistuttamme: tällä viikolla on syysale! Vaateliikkeissä jopa -50% alennus. Tarjoukset ovat voimassa sunnuntaihin 15.10. asti.
>
> Kadonneen tavaran ilmoitukset voi tehdä infopisteessä, 1. kerros. Kiitos käynnistänne ja tervetuloa uudelleen!"`,
        theoryEn: `### Listen to the shopping center announcement.`,
        quiz: [
          { question: "Mihin aikaan kauppakeskus sulkeutuu?", options: ["Klo 20", "Klo 20:45", "Klo 21", "Klo 22"], answer: 2, explanation: "'Sulkeutuu tänään kello 21.'" },
          { question: "Kuinka suuri alennus on enintään?", options: ["-20%", "-30%", "-40%", "-50%"], answer: 3, explanation: "'Jopa -50% alennus.'" },
          { question: "Mihin asti tarjoukset ovat voimassa?", options: ["10.10.", "12.10.", "15.10.", "20.10."], answer: 2, explanation: "'Sunnuntaihin 15.10. asti.'" },
          { question: "Missä on infopiste?", options: ["2. kerroksessa", "1. kerroksessa", "Kellarissa", "Ulkona"], answer: 1, explanation: "'Infopisteessä, 1. kerros.'" },
        ],
      },
      {
        id: "yki-mock-listening-10",
        title: "Vuokranantajan viesti",
        titleEn: "Landlord's Message",
        icon: "🏢",
        level: "A2",
        theory: `### Kuuntele puhelinviesti ja vastaa kysymyksiin.

**Transkriptio:**

> "Hei, tässä on Markku Virtanen, taloyhtiön isännöitsijä. Soitan taloyhtiön remonttiasioista.
>
> Ensi viikolla maanantaista keskiviikkoon tehdään putkistoremonttia. Vesi on poikki kello 8–16. Käyttäkää lähistön julkisia wc-tiloja tai varakaa vettä etukäteen.
>
> Lisäksi piha-alueen parkkipaikka on suljettu torstaina lumenaurausta varten. Siirtäkää autonne kadun varteen.
>
> Jos on kysyttävää, soittakaa numeroon 050-9876543. Kiitos!"`,
        theoryEn: `### Listen to the landlord's voicemail about building maintenance.`,
        quiz: [
          { question: "Kuka soittaa?", options: ["Naapuri", "Isännöitsijä", "Vuokralainen", "Putkimies"], answer: 1, explanation: "'Markku Virtanen, taloyhtiön isännöitsijä.'" },
          { question: "Milloin vesi on poikki?", options: ["Ma-ke klo 8-16", "Ma-pe klo 8-16", "Ti-to klo 9-15", "Ma klo 8-12"], answer: 0, explanation: "'Maanantaista keskiviikkoon, kello 8–16.'" },
          { question: "Miksi parkkipaikka on suljettu torstaina?", options: ["Remontti", "Lumenaurausta varten", "Juhla", "Maalaus"], answer: 1, explanation: "'Lumenaurausta varten.'" },
          { question: "Mihin autot pitää siirtää?", options: ["Toiseen parkkipaikkaan", "Kadun varteen", "Naapurin pihaan", "Autokatokseen"], answer: 1, explanation: "'Siirtäkää autonne kadun varteen.'" },
        ],
      },
    ],
  },

  // ===== ADDITIONAL WRITING (5 new sets) =====
  {
    id: "yki-mock-writing-extra",
    title: "Lisää kirjoitustehtäviä",
    titleEn: "More Writing Tasks",
    icon: "✍️",
    color: "from-green-500 to-emerald-600",
    description: "Lisää kirjoitustehtäviä: muuttovahvistus, lääkärille viesti, palautteen anto.",
    descriptionEn: "More writing tasks: move confirmation, message to doctor, giving feedback.",
    pillar: "mock-exams",
    lessons: [
      {
        id: "yki-mock-writing-6",
        title: "Muuttoilmoitus",
        titleEn: "Change of Address Notice",
        icon: "📦",
        level: "A2",
        theory: `### Kirjoitustehtävä 6

**Tehtävä:** Kirjoita viesti isännöitsijälle. Kerro:
- Muutat pois asunnosta 1.6.
- Pyydä vuokratakuun palautusta
- Kerro milloin avaimet voi palauttaa
- Kysy loppusiivouksen ohjeista

**Hyödyllisiä ilmaisuja:**
- Hyvä isännöitsijä
- Ilmoitan, että muutan pois asunnosta...
- Pyydän vuokratakuun palautusta tilille...
- Milloin voin palauttaa avaimet?
- Onko loppusiivoukselle erityisiä ohjeita?

**Aika:** 20 minuuttia | **Sanamäärä:** 60–90 sanaa`,
        theoryEn: `### Writing Task 6: Moving out notice to the property manager. Time: 20 min | 60-90 words`,
        quiz: [
          { question: "Miten aloitat viestin isännöitsijälle?", options: ["Hei!", "Hyvä isännöitsijä", "Moro!", "Kuule"], answer: 1, explanation: "'Hyvä isännöitsijä' is the correct semi-formal opening." },
        ],
      },
      {
        id: "yki-mock-writing-7",
        title: "Viesti lääkärille",
        titleEn: "Message to Doctor",
        icon: "🏥",
        level: "A2",
        theory: `### Kirjoitustehtävä 7

**Tehtävä:** Kirjoita viesti terveysasemalle. Kerro:
- Tarvitset reseptin uusimista
- Kerro mikä lääke ja annos
- Kysy voiko reseptin saada sähköisesti
- Kerro yhteystietosi

**Hyödyllisiä ilmaisuja:**
- Tarvitsen reseptin uusimista lääkkeelle...
- Annos on [X mg], [N kertaa] päivässä
- Onko mahdollista saada e-resepti?
- Puhelinnumeroni on...

**Aika:** 15 minuuttia | **Sanamäärä:** 40–60 sanaa`,
        theoryEn: `### Writing Task 7: Message to a health center about renewing a prescription. Time: 15 min | 40-60 words`,
        quiz: [
          { question: "Mitä 'e-resepti' tarkoittaa?", options: ["Paperinen resepti", "Sähköinen resepti", "Lääkelista", "Lääkärintodistus"], answer: 1, explanation: "'E-resepti' = electronic prescription." },
        ],
      },
      {
        id: "yki-mock-writing-8",
        title: "Palaute kurssista",
        titleEn: "Course Feedback",
        icon: "📝",
        level: "A2",
        theory: `### Kirjoitustehtävä 8

**Tehtävä:** Kirjoita palautetta suomen kielen kurssista. Kerro:
- Mitä pidit kurssista (positiiviset asiat)
- Mikä oli vaikeaa
- Mitä voisi parantaa
- Suositteletko kurssia muille

**Hyödyllisiä ilmaisuja:**
- Kurssi oli mielestäni [hyvä/hyödyllinen/mielenkiintoinen]
- Pidin erityisesti [puhe- / kuunteluharjoituksista]
- Vaikeinta oli [kielioppi / kirjoittaminen]
- Ehdottaisin, että [enemmän keskusteluharjoituksia]
- Suosittelen kurssia kaikille!

**Aika:** 20 minuuttia | **Sanamäärä:** 60–90 sanaa`,
        theoryEn: `### Writing Task 8: Write feedback about a Finnish language course. Time: 20 min | 60-90 words`,
        quiz: [
          { question: "'Ehdottaisin' tarkoittaa...", options: ["I suggest", "I demand", "I refuse", "I accept"], answer: 0, explanation: "'Ehdottaisin' = I would suggest." },
        ],
      },
      {
        id: "yki-mock-writing-9",
        title: "Sähköposti vuokranantajalle",
        titleEn: "Email to Landlord",
        icon: "📧",
        level: "A2",
        theory: `### Kirjoitustehtävä 9

**Tehtävä:** Naapuri pitää kovaa meteliä iltaisin. Kirjoita viesti vuokranantajalle:
- Kerro ongelmasta (melu myöhään illalla)
- Kuinka kauan tilanne on jatkunut
- Olet yrittänyt puhua naapurille
- Pyydä vuokranantajaa puuttumaan asiaan

**Hyödyllisiä ilmaisuja:**
- Haluan ilmoittaa meluongelmasta
- Naapurin [musiikki/melu] häiritsee [iltaisin/öisin]
- Tilanne on jatkunut jo [kaksi kuukautta]
- Olen yrittänyt puhua naapurille, mutta tilanne ei ole parantunut
- Pyydän teitä puuttumaan asiaan

**Aika:** 20 minuuttia | **Sanamäärä:** 60–90 sanaa`,
        theoryEn: `### Writing Task 9: Email to landlord about a noise complaint. Time: 20 min | 60-90 words`,
        quiz: [
          { question: "'Puuttua asiaan' tarkoittaa...", options: ["Ignore the issue", "Intervene", "Move out", "Call police"], answer: 1, explanation: "'Puuttua asiaan' = to intervene / address the issue." },
        ],
      },
      {
        id: "yki-mock-writing-10",
        title: "Kiitosviesti opettajalle",
        titleEn: "Thank You Message to Teacher",
        icon: "💌",
        level: "A2",
        theory: `### Kirjoitustehtävä 10

**Tehtävä:** Kurssi loppuu. Kirjoita kiitosviesti opettajallesi:
- Kiitä hyvästä opetuksesta
- Kerro mitä opit kurssilla
- Kerro tulevaisuuden suunnitelmistasi
- Toivota opettajalle hyvää jatkoa

**Hyödyllisiä ilmaisuja:**
- Kiitos paljon hyvästä opetuksesta!
- Opin paljon [kielioppia / sanastoa / puhumaan rohkeammin]
- Jatkan suomen kielen opiskelua [ylemmällä kurssilla / itse]
- Toivotan teille kaikkea hyvää!
- Terveisin / Lämpimin terveisin

**Aika:** 15 minuuttia | **Sanamäärä:** 50–70 sanaa`,
        theoryEn: `### Writing Task 10: Thank you note to your teacher at the end of a course. Time: 15 min | 50-70 words`,
        quiz: [
          { question: "'Lämpimin terveisin' tarkoittaa...", options: ["Best regards", "Warmest regards", "See you", "Yours truly"], answer: 1, explanation: "'Lämpimin terveisin' = Warmest regards." },
        ],
      },
    ],
  },

  // ===== ADDITIONAL SPEAKING (5 new sets) =====
  {
    id: "yki-mock-speaking-extra",
    title: "Lisää puhumistehtäviä",
    titleEn: "More Speaking Tasks",
    icon: "🎤",
    color: "from-orange-500 to-red-600",
    description: "Lisää puhetilanteita: lääkärissä, kaupassa, virasto, naapurin apu, matkailu.",
    descriptionEn: "More speaking scenarios: at the doctor, shopping, office, helping neighbor, travel.",
    pillar: "mock-exams",
    lessons: [
      {
        id: "yki-mock-speaking-6",
        title: "Lääkärissä",
        titleEn: "At the Doctor",
        icon: "🩺",
        level: "A2",
        theory: `### Puhumistehtävä 6: Reagoi tilanteeseen — Lääkärissä

**Ohje:** Olet lääkärin vastaanotolla. **30 sekuntia** per kohta.

**Kohta A:** Lääkäri kysyy: "Mikä vaiva sinulla on?"
- Kerro oireistasi (esim. kuume, yskä, päänsärky)
- Kerro kuinka kauan oireet ovat kestäneet

**Kohta B:** Lääkäri kysyy: "Käytätkö mitään lääkkeitä?"
- Vastaa ja kysy mitä lääkettä hän suosittelee

**Kohta C:** Lääkäri sanoo: "Kirjoitan reseptin. Lepää muutama päivä."
- Kiitä ja kysy saatko sairauslomatodistuksen`,
        theoryEn: `### Speaking Task 6: At the doctor's office — describe symptoms and ask about treatment (30s per part)`,
        sampleAnswer: "Minulla on kuumetta ja kovaa yskää. Oireet ovat kestäneet kolme päivää. En käytä mitään lääkkeitä. Mitä lääkettä suosittelette? Kiitos paljon, saanko sairauslomatodistuksen?",
        quiz: [
          { question: "'Sairauslomatodistus' tarkoittaa...", options: ["Prescription", "Sick leave certificate", "Health insurance card", "Medical report"], answer: 1, explanation: "'Sairauslomatodistus' = sick leave certificate." },
        ],
      },
      {
        id: "yki-mock-speaking-7",
        title: "Kaupassa reklamaatio",
        titleEn: "Store Complaint",
        icon: "🛍️",
        level: "A2",
        theory: `### Puhumistehtävä 7: Reagoi tilanteeseen — Kaupassa

**Ohje:** Ostit kengät viikko sitten, mutta ne ovat rikki. Menet takaisin kauppaan. **30 sekuntia** per kohta.

**Kohta A:** Kerro myyjälle:
- Ostit kengät viime viikolla
- Ne menivät rikki kahdessa päivässä
- Haluat vaihtaa tai saada rahat takaisin

**Kohta B:** Myyjä sanoo: "Valitettavasti emme voi palauttaa rahaa ilman kuittia."
- Näytä kuitti ja pyydä vaihtoa

**Kohta C:** Myyjä tarjoaa vaihdon.
- Kiitä ja kysy takuusta`,
        theoryEn: `### Speaking Task 7: Making a complaint at a store about broken shoes (30s per part)`,
        sampleAnswer: "Hei, ostin nämä kengät viime viikolla, mutta ne menivät rikki kahdessa päivässä. Haluaisin vaihtaa ne tai saada rahat takaisin. Tässä on kuitti. Kiitos! Kuinka pitkä takuu on?",
        quiz: [
          { question: "'Haluan vaihtaa' tarkoittaa...", options: ["I want to buy", "I want to exchange", "I want to return", "I want to sell"], answer: 1, explanation: "'Haluan vaihtaa' = I want to exchange." },
        ],
      },
      {
        id: "yki-mock-speaking-8",
        title: "Kelassa asioiminen",
        titleEn: "Visiting Kela Office",
        icon: "🏛️",
        level: "A2",
        theory: `### Puhumistehtävä 8: Reagoi tilanteeseen — Kelassa

**Ohje:** Olet Kelassa hakemassa asumistukea. **30 sekuntia** per kohta.

**Kohta A:** Virkailija kysyy: "Miten voin auttaa?"
- Kerro mitä tukea haluat hakea
- Kerro vuokra ja osoite

**Kohta B:** Virkailija kysyy: "Oletko työssä vai opiskelija?"
- Vastaa ja kerro tulosi

**Kohta C:** Virkailija sanoo: "Täytä lomake ja tuo tulotodistus."
- Kysy mistä saat tulotodistuksen ja milloin päätös tulee`,
        theoryEn: `### Speaking Task 8: Applying for housing benefit at Kela (30s per part)`,
        sampleAnswer: "Päivää! Haluaisin hakea asumistukea. Asun Helsingissä, osoitteessa Mannerheimintie 5. Vuokra on 650 euroa kuukaudessa. Olen opiskelija. Mistä saan tulotodistuksen ja milloin päätös tulee?",
        quiz: [
          { question: "'Tulotodistus' tarkoittaa...", options: ["Tax return", "Income certificate", "Bank statement", "Employment contract"], answer: 1, explanation: "'Tulotodistus' = income certificate." },
        ],
      },
      {
        id: "yki-mock-speaking-9",
        title: "Naapurin auttaminen",
        titleEn: "Helping a Neighbor",
        icon: "🏘️",
        level: "A2",
        theory: `### Puhumistehtävä 9: Reagoi tilanteeseen — Naapurin auttaminen

**Ohje:** Naapurisi pyytää apua. **40 sekuntia.**

**Tilanne:** Naapuri koputtaa ovellesi ja sanoo:
"Anteeksi häiriö! Jääkaappini meni rikki ja kaikki ruoka lämpenee. Voisinko säilyttää osan teillä yön yli? Uusi jääkaappi tulee huomenna."

**Vastaa:**
- Suostu auttamaan
- Kerro missä hänen ruokansa voi olla
- Kysy tarvitseeko hän muuta apua
- Ehdota muutakin apua (esim. lainata työkaluja)`,
        theoryEn: `### Speaking Task 9: Help your neighbor who has a broken fridge (40 seconds)`,
        quiz: [
          { question: "'Jääkaappi meni rikki' tarkoittaa...", options: ["The fridge is new", "The fridge broke down", "The fridge is empty", "The fridge is full"], answer: 1, explanation: "'Meni rikki' = broke down." },
        ],
      },
      {
        id: "yki-mock-speaking-10",
        title: "Matkasuunnitelma",
        titleEn: "Travel Plans",
        icon: "✈️",
        level: "A2",
        theory: `### Puhumistehtävä 10: Kerro matkasuunnitelmastasi

**Ohje:** Sinulla on **40 sekuntia** aikaa kertoa.

**Kerro:**
- Minne haluat matkustaa Suomessa
- Milloin ja kenen kanssa
- Mitä haluat tehdä siellä
- Miten matkustat (juna, bussi, auto, lentokone)
- Mitä haluat nähdä tai kokea

**Hyödyllisiä ilmaisuja:**
- Haluaisin matkustaa [Lappiin / Turkuun / saaristoon]
- Matkustan [junalla / autolla / lentokoneella]
- Siellä haluan [hiihtää / nähdä revontulia / käydä saunassa]
- Matkustan [ystävän / perheen] kanssa
- Olen kuullut, että siellä on [kaunista / mielenkiintoista]`,
        theoryEn: `### Speaking Task 10: Talk about your travel plans in Finland (40 seconds)`,
        quiz: [
          { question: "'Haluaisin matkustaa Lappiin' tarkoittaa...", options: ["I traveled to Lapland", "I would like to travel to Lapland", "I must travel to Lapland", "I don't want to travel"], answer: 1, explanation: "'Haluaisin' = I would like to." },
        ],
      },
    ],
  },
];
