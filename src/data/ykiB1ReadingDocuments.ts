// Uploaded YKI B1 reading practice; answer guidance is prepared from the passages,
// not an official answer key. Historical dates and amounts belong to the source texts.
export type YkiReadingQuestion =
  | { kind: "choice"; q: string; options: string[]; answer: number; evidenceFi: string }
  | { kind: "short"; q: string; modelFi: string; modelEn: string; evidenceFi: string };
export interface YkiReadingDocumentPassage {
  id: string; task: number; title: string; textFi: string; questions: YkiReadingQuestion[];
}
export interface YkiReadingDocumentSet {
  id: string; number: number; source: string; passages: YkiReadingDocumentPassage[];
}
export const YKI_B1_READING_DOCUMENT_SETS: YkiReadingDocumentSet[] = [
  {
    "id": "yki-reading-doc-1",
    "number": 1,
    "source": "1.Tekstin_Ymmärtämisen_Harjoitus.pdf",
    "passages": [
      {
        "id": "yki-reading-doc-1-1",
        "task": 1,
        "title": "Määräaikaistarkastus",
        "textFi": "HYMYSUU\nHammaslääkärikeskus\n\nElla Tuominen\nKirkkokatu 12 A 4\n06300 HAMINA\n\nMÄÄRÄAIKAISTARKASTUS\nSopimuksemme mukaisesti olen varannut sinulle ajan määräaikaistarkastukseen.\n07.08.2008 klo 12:00\n\nOlethan ystävällinen ja vahvistat, sopiiko aika sinulle. Odotan vastaustasi 3.7.2008 mennessä. Puhelin (03) 122 344.\nKun tulet tarkastukseen, muistathan ilmoittaa, jos sinulla on muutoksia:\n- terveydentilassa\n- lääkkeiden käytössä\n\nTerveisin\nAri Mäkinen\nHammaslääkäri",
        "questions": [
          {
            "kind": "short",
            "q": "Kenelle tämä ilmoitus tulee postissa?",
            "modelFi": "Ella Tuomiselle.",
            "modelEn": "To Ella Tuominen.",
            "evidenceFi": "Ella Tuomiselle."
          },
          {
            "kind": "short",
            "q": "Miksi hän saa ilmoituksen? Mikä on ilmoituksen aihe?",
            "modelFi": "Hänelle on varattu aika hammaslääkärin määräaikaistarkastukseen.",
            "modelEn": "An appointment has been booked for a routine dental check-up.",
            "evidenceFi": "Hänelle on varattu aika hammaslääkärin määräaikaistarkastukseen."
          },
          {
            "kind": "short",
            "q": "Mitä täytyy tehdä 3.7.2008 mennessä?",
            "modelFi": "Hänen täytyy vahvistaa, sopiiko varattu aika hänelle.",
            "modelEn": "She must confirm whether the appointment time suits her.",
            "evidenceFi": "Hänen täytyy vahvistaa, sopiiko varattu aika hänelle."
          },
          {
            "kind": "short",
            "q": "Mistä täytyy ilmoittaa, kun menee tarkastukseen? Kirjoita 2 asiaa.",
            "modelFi": "Muutoksista terveydentilassa ja lääkkeiden käytössä.",
            "modelEn": "Changes in health and in medication use.",
            "evidenceFi": "Muutoksista terveydentilassa ja lääkkeiden käytössä."
          }
        ]
      },
      {
        "id": "yki-reading-doc-1-2",
        "task": 2,
        "title": "Kaijan uusi työpaikka",
        "textFi": "Hei Anja,\n\nSinusta ei ole kuulunut mitään pitkään aikaan. Siitä on varmasti jo monta viikkoa, kun on\n\n viimeksi nähty ja juteltu. Mitä sinne kuuluu?\n\n Minulla on hyviä uutisia! Löysin viimeinkin työpaikan! Mahtavaa!\n\n Kyllästyinkin jo kotona oloon, kun olin niin pitkään työttömänä.\n\n Sain puolen vuoden määräaikaisen työpaikan isosta huonekaluliikkeestä, sihteerinä. Homma on\n\n sijaisuus, mutta täytyy toivoa, että työ jatkuu pitkään. Täällä on niin paljon väkeä töissä, että\n\n jotakin saattaa ilmaantua….\n\n Teen vähän kaikenlaista, eniten kuitenkin paperihommia, palkanmaksua ja laskutusta. Vastailen\n\n myös aika paljon puhelimeen ja joudun puhumaan tosi usein englantia. Jännitin sitä aluksi\n\n hirveästi, mutta nyt se sujuu jo ihan hyvin. Soittele, niin vaihdetaan kuulumisia tarkemmin. Olis\n\n kiva nähdäkin joku ilta! Voitais mennä vaikka ulos syömään tai jotain….\n\n Kaija",
        "questions": [
          {
            "kind": "choice",
            "q": "Kaija ja Anja tapasivat viime viikolla.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 1,
            "evidenceFi": "Viimeisestä tapaamisesta on jo monta viikkoa."
          },
          {
            "kind": "choice",
            "q": "Kaijalla on uusi työpaikka.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 0,
            "evidenceFi": "Löysin viimeinkin työpaikan!"
          },
          {
            "kind": "choice",
            "q": "Kaija oli kauan työttömänä.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 0,
            "evidenceFi": "Olin niin pitkään työttömänä."
          },
          {
            "kind": "choice",
            "q": "Kaijalla on vakituinen työsuhde.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 1,
            "evidenceFi": "Sain puolen vuoden määräaikaisen työpaikan."
          },
          {
            "kind": "choice",
            "q": "Kaijan työpaikalla on vähän työntekijöitä.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 1,
            "evidenceFi": "Täällä on niin paljon väkeä töissä."
          },
          {
            "kind": "choice",
            "q": "Kaija tarvitsee englannin kieltä työssään.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 0,
            "evidenceFi": "Joudun puhumaan tosi usein englantia."
          },
          {
            "kind": "choice",
            "q": "Tietokoneen käyttö jännitti ensin Kaijaa.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 1,
            "evidenceFi": "Englannin puhuminen jännitti häntä aluksi; tietokonetta ei mainita."
          }
        ]
      },
      {
        "id": "yki-reading-doc-1-3",
        "task": 3,
        "title": "Tupakoinnin lopettamisesta rahapalkkio Skotlannissa",
        "textFi": "Skotlantilaisia aletaan kannustaa tupakoinnin lopettamiseen rahapalkkioiden avulla.\nTerveysviranomaiset ja paikallishallinto lupaavat maksaa Dundeen kaupungin köyhien alueiden asukkaille viikoittain 12,5 puntaa (vajaat 16 euroa), jos he lakkaavat sauhuttelemasta. Kaupan päälle lopettajat saavat ilmaiset nikotiinilaastarit tai -purukumit.\n\nPalkkion saamisen ehtona ovat viikoittaiset testit, joilla varmistetaan lopettajien pysyneen irti tupakasta.\nRahaa voi saada 12 viikon ajan. Se ladataan sirukortille, jolla voi ostaa elintarvikkeita. Alkoholia tai tupakkaa kortilla ei saa.\nJos kokeilu onnistuu, rahapalkkioita saatetaan alkaa tarjota kaikkialla Skotlannissa.\n\nSTT 23.6.2008",
        "questions": [
          {
            "kind": "choice",
            "q": "Rahapalkkio maksetaan kaikille, jotka eivät polta.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 1,
            "evidenceFi": "Palkkio koskee Dundeen köyhien alueiden asukkaita, jotka lopettavat tupakoinnin."
          },
          {
            "kind": "choice",
            "q": "Sauhuttelu tarkoittaa samaa kuin tupakointi.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 0,
            "evidenceFi": "Tekstissä sauhuttelu tarkoittaa tupakointia."
          },
          {
            "kind": "choice",
            "q": "Nikotiinilaastarit ja -purukumit täytyy ostaa itse.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 1,
            "evidenceFi": "Lopettajat saavat ilmaiset nikotiinilaastarit tai -purukumit."
          },
          {
            "kind": "choice",
            "q": "Kokeilu tapahtuu ensin vain yhdessä kaupungissa.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 0,
            "evidenceFi": "Kokeilu alkaa Dundeen kaupungissa."
          },
          {
            "kind": "choice",
            "q": "Jos haluaa palkkion, täytyy käydä testissä kerran viikossa.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 0,
            "evidenceFi": "Palkkion saamisen ehtona ovat viikoittaiset testit."
          },
          {
            "kind": "choice",
            "q": "Palkkiota maksetaan niin kauan kuin ihminen on polttamatta.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 1,
            "evidenceFi": "Rahaa voi saada 12 viikon ajan."
          },
          {
            "kind": "choice",
            "q": "Jokainen lopettaja saa ostaa rahalla, mitä itse haluaa.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 1,
            "evidenceFi": "Kortilla voi ostaa elintarvikkeita, mutta ei alkoholia tai tupakkaa."
          }
        ]
      },
      {
        "id": "yki-reading-doc-1-4",
        "task": 4,
        "title": "Parhaat kesämuistot syntyvät olemisesta",
        "textFi": "Olisiko hyvä kyseenalaistaa kesänviettotapojasi? Itseäni pysäytti muinoin erään ystävän tokaisu: kuka on sanonut, että Suomen huvipuistot on lasten kanssa pakko kahlata läpi? Joku toinen aikuinen puhui kerran ”perinteisestä kesäkierroksesta”. Mentävä on, jaksoi tai ei.\n\nAjaudumme huvipuistorumbaan ajattelematta, onko se tarpeellista saati välttämätöntä.\nLapsi, jota on kierrätetty hoidossa, puistossa, jumpassa, uimassa, luistelemassa sekä muissa riennoissa koko talven, voisi tarvita lomaa kaikesta hössötyksestä. Ihan vain kotona olemista.\n\nLapsi ei itse ymmärrä levon tarvetta, kuten emme aina me aikuisetkaan. On helpompi jatkaa oravanpyörässä kuin hypätä siitä pois. Mitä jos loman kohdalla uskaltaisimme pompata kyydistä perinteisiltä syöksyradoilta, ja menisimmekin ongelle? Tai keksisimme jotain muuta yhtä epämuodikasta.\n\nKun vauhti pysähtyy, siitä seuraa tylsyys ja marina - niin lapsilla kuin aikuisillakin. Sen jälkeen voi tulla uutta iloa ja hauskuutta, kun entiset väsymykset on ruikutettu pois. Itsensä voi tuntea onnistuneemmaksi, jos vikinöitä ei kuulu. Kuitenkin tylsyyden kohtaaminen on osa elämää, ja sitä paitsi välttämätöntä luovuuden kannalta.\n\nTyötoveri kertoi lapsen hauskimman kesämuiston. Lapsen mieleen oli jäänyt parhaana muistona se, kun hän oli ongella, ja kissa tuli kylkeen kiehnäämään. Se oli tuntunut mukavalta. Tällaiset elämykset ovat suurta rikkautta. Olisi siunattu asia, jos moni lapsi voisi syksyllä kertoa vastaavaa.\n\nSurullisempia ja yleisempiä ovat ne tarinat, jolloin on kierretty paikasta toiseen. Aikuisten tehokkuusajattelu on siirtynyt lapseenkin.\nMitkä ovat meidän aikuisten huvipuistot? Mitä jää talveksi käteen parhaana muistona? Nyt viimeistään on aika pysähtyä hetkeksi miettimään sitä.\n\nHelsingin Sanomat 6.7.2008",
        "questions": [
          {
            "kind": "choice",
            "q": "Ihmisten pitäisi kirjoittajan mielestä",
            "options": [
              "käydä lasten kanssa enemmän huvipuistoissa",
              "matkustaa mahdollisimman paljon lomalla",
              "ajatella ja muuttaa omia tapojaan viettää loma."
            ],
            "answer": 2,
            "evidenceFi": "Kirjoittaja kehottaa kyseenalaistamaan kesänviettotavat."
          },
          {
            "kind": "choice",
            "q": "Lapset tarvitsevat kirjoittajan mukaan kesällä",
            "options": [
              "lomaa ja kotona oloa",
              "enemmän liikuntaa",
              "paljon erilaisia harrastuksia"
            ],
            "answer": 0,
            "evidenceFi": "Lapsi voisi tarvita lomaa kaikesta hössötyksestä. Ihan vain kotona olemista."
          },
          {
            "kind": "choice",
            "q": "Hössötys tarkoittaa samaa kuin",
            "options": [
              "tehokkuus",
              "liian monen asian tekeminen",
              "kotona oleminen"
            ],
            "answer": 1,
            "evidenceFi": "Hössötys viittaa jatkuvaan kiireeseen ja moniin menoihin."
          },
          {
            "kind": "choice",
            "q": "Aikuiset eivät osaa kirjoittajan mielestä",
            "options": [
              "pitää hauskaa",
              "olla tehokkaita ja nopeita",
              "rauhoittua ja unohtaa kiirettä."
            ],
            "answer": 2,
            "evidenceFi": "Aikuisetkaan eivät aina ymmärrä levon tarvetta."
          },
          {
            "kind": "choice",
            "q": "Hauskimmat kesämuistot syntyvät",
            "options": [
              "aurinkoisesta säästä",
              "erilaisista tapahtumista ja matkoista",
              "pienistä ja yksinkertaisista asioista."
            ],
            "answer": 2,
            "evidenceFi": "Lapsen paras muisto oli onkiminen ja vierelle tullut kissa."
          }
        ]
      },
      {
        "id": "yki-reading-doc-1-5",
        "task": 5,
        "title": "Melulta et pääse mihinkään karkuun",
        "textFi": "Ympäristön äänillä on väliä, tietää melusta väitöskirjan tehnyt Outi Ampuja.\n\n- Näyttää vähän siltä, että on paljon ihmisiä, jotka eivät edes ajattele melua, sanoo tutkija Outi Ampuja Helsingin yliopistosta. Ihmiset ovat tavallaan alistuneet melun edessä.\n- Yksi keskeisimpiä johtopäätöksiä tutkimuksessani oli, että melusta valittamista ei ole koettu kulttuurisesti sallittavaksi. Yhteiskunnassamme on selkeitä paineita hyväksyä se osaksi kaupunkiympäristöä. Kuitenkin Suomen väestöstä noin 40 prosenttia on meluherkkiä. Se on paljon.\n\nLiikennemelu ärsyttävintä\nAmpujan väitöskirja luotaa melua historiallisesti 1950-luvulta nykypäivään. Hän on tutkinut muun muassa Helsingin Sanomien yleisönosastokirjoituksia. Sieltä nousee esille yksi hyvin ajankohtainen, joulun alla korostuva melunlähde: kauppojen taustamusiikki. - Siitä on valitettu kirjoituksissa jo 1960-luvulla.\nYlivoimaisesti eniten ihmisiä on kautta aikain häirinnyt kuitenkin liikennemelu. Yksi uusimmista metelinlähteistä on lehtipuhallin.\n- Se ärsyttää paljolti siksi, että ihmiset hakeutuvat puistoihin nimenomaan hakemaan rauhaa.\n\nMeteli aiheuttaa fyysisiä oireita\nMelu ei ole pelkästään tunnetasolla haittaava tekijä, vaan se aiheuttaa selkeitä fyysisiä oireita ja sairauksia. Unen laatu kärsii, tulee stressiä ja mielenterveydellisiä ongelmia.\n- Keskittymisvaikeudet lisääntyvät, sydänkohtausten vaara nousee ja jopa lasten lukemaan oppiminen voi häiriintyä.\nMitä yksittäinen kansalainen sitten voi tehdä? Ampujan mukaan ei paljonkaan muuta kuin valita asuinpaikan. Lentokoneiden lentoreitteihin ja tielinjauksiin ei voi juurikaan vaikuttaa.\nVarallisuudella on siis merkitystä: usein rauhalliset asuinpaikat merkitsevät kalliimpia asuntoja. Maassamme miljoona ihmistä asuu melualueella, jossa ylittyy lain määrittelemä 55 desibelin taso.\n\nKaupunkilehti Vartti 9.12.2007",
        "questions": [
          {
            "kind": "short",
            "q": "Miksi ihmiset eivät Ampujan mukaan valita melusta?",
            "modelFi": "Melusta valittamista ei pidetä kulttuurisesti sallittavana, ja ihmisillä on paineita hyväksyä melu osaksi kaupunkiympäristöä.",
            "modelEn": "Complaining about noise is not considered culturally acceptable, and people feel pressure to accept it as part of city life.",
            "evidenceFi": "Melusta valittamista ei pidetä kulttuurisesti sallittavana, ja ihmisillä on paineita hyväksyä melu osaksi kaupunkiympäristöä."
          },
          {
            "kind": "short",
            "q": "Mitä melun lähteitä tekstissä mainitaan? Kirjoita 3 asiaa.",
            "modelFi": "Liikennemelu, kauppojen taustamusiikki ja lehtipuhaltimet.",
            "modelEn": "Traffic, background music in shops and leaf blowers.",
            "evidenceFi": "Liikennemelu, kauppojen taustamusiikki ja lehtipuhaltimet."
          },
          {
            "kind": "short",
            "q": "Millaisia oireita melu voi aiheuttaa aikuisille? Kirjoita 4 asiaa.",
            "modelFi": "Esimerkiksi univaikeuksia, stressiä, mielenterveydellisiä ongelmia ja keskittymisvaikeuksia. Myös sydänkohtauksen vaara voi kasvaa.",
            "modelEn": "For example, poor sleep, stress, mental health problems and difficulty concentrating. The risk of heart attack can also increase.",
            "evidenceFi": "Esimerkiksi univaikeuksia, stressiä, mielenterveydellisiä ongelmia ja keskittymisvaikeuksia. Myös sydänkohtauksen vaara voi kasvaa."
          },
          {
            "kind": "short",
            "q": "Mitä jokainen voi Ampujan mukaan tehdä itse, ettei tarvitsisi kärsiä melusta?",
            "modelFi": "Valita rauhallisemman asuinpaikan.",
            "modelEn": "Choose a quieter place to live.",
            "evidenceFi": "Valita rauhallisemman asuinpaikan."
          }
        ]
      }
    ]
  },
  {
    "id": "yki-reading-doc-2",
    "number": 2,
    "source": "2.Tekstin_Ymmärtämisen_Harjoitus.pdf",
    "passages": [
      {
        "id": "yki-reading-doc-2-1",
        "task": 1,
        "title": "Nappaa kesäkuva ja voita lahjakortti!",
        "textFi": "Suomen Lehtiyhtymän lehdet järjestävät ”Nappaa kesäkuva” -kilpailun. Siihen voit osallistua digikameralla tai kännykällä otetulla kesäisellä valokuvalla 31.7.2008 mennessä. Raati valitsee parhaat kuvat elokuun aikana ja voittaja palkitaan 300 euron arvoisella lahjakortilla.\n\nJokaiseen kuvaan tulee liittää mukaan kuvan tarina, kuvaajan nimi ja kotipaikkakunta. Kaikki julkaisukelpoiset kuvat tarinoineen julkaistaan nettiosoitteessa www.keskiuusimaa.fi/lomakuva.\nKilpailukuvat tulee lähettää sähköpostiosoitteeseen kuvat@lehtiyhtyma.fi. Kun lähetät sähköpostilla ja haluat osallistua useammalla kuin yhdellä kuvalla, lähetä vain yksi kuva kerrallaan. Kännykällä otetun kuvan voi lähettää myös suoraan multimediaviestinä numeroon 173521. Viestin alkuun hakusanaksi sana LOMA.",
        "questions": [
          {
            "kind": "choice",
            "q": "Valokuva täytyy ottaa kesällä.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 0,
            "evidenceFi": "Kilpailuun osallistutaan kesäisellä valokuvalla."
          },
          {
            "kind": "choice",
            "q": "Kuvan voi ottaa vain digikameralla.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 1,
            "evidenceFi": "Kuvan voi ottaa digikameralla tai kännykällä."
          },
          {
            "kind": "choice",
            "q": "Kilpailun tulokset tulevat elokuussa.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 0,
            "evidenceFi": "Raati valitsee parhaat kuvat elokuun aikana."
          },
          {
            "kind": "choice",
            "q": "Kilpailusta voi voittaa kameran.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 1,
            "evidenceFi": "Palkinto on 300 euron lahjakortti."
          },
          {
            "kind": "choice",
            "q": "Kuvat tulevat esille Internet-sivuille.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 0,
            "evidenceFi": "Julkaisukelpoiset kuvat julkaistaan nettiosoitteessa."
          },
          {
            "kind": "choice",
            "q": "Yhdessä sähköpostiviestissä saa lähettää kaksi kuvaa.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 1,
            "evidenceFi": "Lähetä vain yksi kuva kerrallaan."
          }
        ]
      },
      {
        "id": "yki-reading-doc-2-2",
        "task": 2,
        "title": "Keijon uusi asunto",
        "textFi": "Terve Risto,\n\nOlisi ollut mukava nähdä pitkästä aikaa viime viikon saunaillassa. Harmi ettet päässyt tulemaan,  kun melkein koko vanha työporukka oli koolla. Ajattelin kirjoitella kuulumisia, kun nyt on  viimeinkin asiat nytkähtäneet eteenpäin asuntoasiassa.  Me löydettiin vihdoin uusi, tilavampi asunto täältä Riihimäeltä, melko läheltä nykyistä ja kohta  entistä kotia. Asunnossa on nyt tilaa riittävästi meille (3 h + k) ja erityisen hyvät varastotilat  kaikille vuosien varrella kertyneille tavaroille. Uskomattoman paljon sitä tulee säilytettyä kaikkea  turhaa tavaraa!  Uusi kotimme on rivitalossa, rauhallisella alueella. Ala-aste ja muutkin tarvittavat palvelut ovat  lähellä, mikä on hieno juttu. Tyttäremme kun menee jo ekaluokalle ensi syksynä. Asunnossa on  myös mahtava piha, hyvin hoidettu ja yllättävän iso rivitalopihaksi. Mukava päästä tekemään  pieniä puutarhahommia, kun tähän asti meillä on ollut vaan parveke kolmannessa kerroksessa.  Me päästään muuttamaan kahden viikon päästä, kunhan saan tehtyä pienen remontin. Maalaan  eteisen seinät ja vaihdan tapetit olohuoneeseen. Lattioille ei onneksi tarvitse tehdä mitään.  Edelliset asukkaat olivat uusineet ne viime vuonna.  Me pidetään varmaankin tupaantuliaiset heinäkuun viimeisenä viikonloppuna. Pistän vielä kutsun  erikseen, mutta merkatkaahan jo aika kalenteriin.  Hyvää kesän jatkoa ja nähdään….  Keijo",
        "questions": [
          {
            "kind": "choice",
            "q": "Keijo ja Risto",
            "options": [
              "tapasivat viime viikolla saunaillassa",
              "olivat ennen samassa työpaikassa",
              "tekevät yhdessä remonttia."
            ],
            "answer": 1,
            "evidenceFi": "Vanha työporukka oli koolla, mutta Risto ei päässyt tulemaan."
          },
          {
            "kind": "choice",
            "q": "Uusi asunto on",
            "options": [
              "paremmassa kunnossa kuin entinen asunto",
              "kaukana entisestä asunnosta",
              "isompi kuin entinen asunto."
            ],
            "answer": 2,
            "evidenceFi": "Uusi asunto on tilavampi ja lähellä nykyistä kotia."
          },
          {
            "kind": "choice",
            "q": "Keijo ihmettelee",
            "options": [
              "tavaran määrää",
              "asunnon kokoa",
              "rivitalon rauhallisuutta."
            ],
            "answer": 0,
            "evidenceFi": "Uskomattoman paljon sitä tulee säilytettyä kaikkea turhaa tavaraa!"
          },
          {
            "kind": "choice",
            "q": "Ensi syksynä Keijon tytär",
            "options": [
              "lähettää kutsun tupaantuliaisiin",
              "muuttaa pois kotoa",
              "aloittaa koulun."
            ],
            "answer": 2,
            "evidenceFi": "Tyttäremme menee ekaluokalle ensi syksynä."
          },
          {
            "kind": "choice",
            "q": "Keijon entinen asunto oli",
            "options": [
              "rivitalossa",
              "kerrostalossa",
              "omakotitalo."
            ],
            "answer": 1,
            "evidenceFi": "Entisessä kodissa oli parveke kolmannessa kerroksessa."
          },
          {
            "kind": "choice",
            "q": "Ennen muuttoa Keijo korjaa asunnossa",
            "options": [
              "seiniä",
              "lattiat",
              "kylpyhuoneen."
            ],
            "answer": 0,
            "evidenceFi": "Hän maalaa eteisen seinät ja vaihtaa olohuoneen tapetit."
          }
        ]
      },
      {
        "id": "yki-reading-doc-2-3",
        "task": 3,
        "title": "Vastaanottoaika Kuuselan sairaalaan",
        "textFi": "Anna Toivonen\nKuusitie 12 B 68\n00200 Helsinki\n\nTeille on varattu vastaanottoaika Kuuselan sairaalaan\nLääkärin vastaanotto, Sisätautien poliklinikka\ntorstai 3.9.2008 11:00\n\nIlmoittautuminen\nPyydämme Teitä ilmoittautumaan 15 minuuttia ennen vastaanottoa sairaalan potilastoimistossa, joka sijaitsee toisessa kerroksessa.\nOttakaa mukaanne sairausvakuutuskortti, lääkereseptit sekä itsellänne olevat laboratoriokokeiden tulokset.\nJos varattu aika ei sovi Teille, pyydämme ilmoittamaan siitä välittömästi puhelimitse ma - to klo 8.00 - 9.00 puhelinnumeroon (09) 471 70200.\n\nMaksut\nPoliklinikkakäynnin hinta on 22 €. Käyttämättä ja peruuttamatta jääneestä ajasta sairaala perii 27 € maksun.\n\nTerveisin\nSISÄTAUTIEN POLIKLINIKKA, Kuuselan sairaala",
        "questions": [
          {
            "kind": "short",
            "q": "Miksi Anna Toivonen saa kirjeen?",
            "modelFi": "Hänelle on varattu lääkärin vastaanottoaika Kuuselan sairaalan sisätautien poliklinikalle.",
            "modelEn": "She has a medical appointment at the internal medicine outpatient clinic at Kuusela Hospital.",
            "evidenceFi": "Hänelle on varattu lääkärin vastaanottoaika Kuuselan sairaalan sisätautien poliklinikalle."
          },
          {
            "kind": "short",
            "q": "Missä ja milloin Annan täytyy ilmoittautua?",
            "modelFi": "Sairaalan potilastoimistossa toisessa kerroksessa 15 minuuttia ennen vastaanottoa, eli klo 10.45.",
            "modelEn": "At the patient office on the second floor, 15 minutes before the appointment, at 10:45.",
            "evidenceFi": "Sairaalan potilastoimistossa toisessa kerroksessa 15 minuuttia ennen vastaanottoa, eli klo 10.45."
          },
          {
            "kind": "short",
            "q": "Mitä Annalla täytyy olla mukana? Mainitse 3 asiaa.",
            "modelFi": "Sairausvakuutuskortti, lääkereseptit ja itsellä olevat laboratoriokokeiden tulokset.",
            "modelEn": "Her health insurance card, prescriptions and any laboratory test results she has.",
            "evidenceFi": "Sairausvakuutuskortti, lääkereseptit ja itsellä olevat laboratoriokokeiden tulokset."
          },
          {
            "kind": "short",
            "q": "Miten ja milloin Anna voi peruuttaa ajan?",
            "modelFi": "Välittömästi puhelimitse numeroon (09) 471 70200 maanantaista torstaihin klo 8.00–9.00.",
            "modelEn": "Immediately by phone on (09) 471 70200, Monday to Thursday between 8 and 9 a.m.",
            "evidenceFi": "Välittömästi puhelimitse numeroon (09) 471 70200 maanantaista torstaihin klo 8.00–9.00."
          },
          {
            "kind": "short",
            "q": "Mikä on hinta, jos Anna ei peru aikaa ja jos hän ei mene paikalle?",
            "modelFi": "27 euroa.",
            "modelEn": "27 euros.",
            "evidenceFi": "27 euroa."
          }
        ]
      },
      {
        "id": "yki-reading-doc-2-4",
        "task": 4,
        "title": "Kuka vei isoäidin polkupyörän?",
        "textFi": "Maanantaina 16.4. koin erittäin ikävän yllätyksen tullessani Helsingistä junalla. Keravan aseman pyörätelineessä lähellä pankkiautomaattia ollut polkupyöräni oli varastettu.\n\nPyörällä oli tunnearvoa, olin perinyt sen 1970-luvulla isoäidiltäni. Pyörä on reilu 40 vuotta vanha ja sillä on ajettu erittäin vähän.\nJos varastit rakkaan pyöräni, niin soitahan tai pane kaverisi soittamaan, mistä pyörän voi hakea. Jos joku näkee punavalkoisen, hyväkuntoisen, ruosteettoman naisten Crescent-polkupyörän hyljättynä jossain esim. ojassa, niin otattehan myös yhteyttä. Pyörässä on ketjusuojus, jossa lukee myös Crescent. Soittokello on, ei vaihteita. Löytäjälle palkkio. P. 040-888 9088.\n\nÄlkää missään tapauksessa edes lukittuna viekö tämmöisiä aarteita edes keskellä päivää yleisille paikoille.\n”Jos nyt onni olisi puolellamme”\nKeski-Uusimaa 29.4.2007",
        "questions": [
          {
            "kind": "choice",
            "q": "Joku on rikkonut kirjoittajan polkupyörän.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 1,
            "evidenceFi": "Polkupyörä oli varastettu, ei rikottu."
          },
          {
            "kind": "choice",
            "q": "Polkupyörä oli rautatieasemalla.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 0,
            "evidenceFi": "Se oli Keravan aseman pyörätelineessä."
          },
          {
            "kind": "choice",
            "q": "Pyörä oli melkein uusi.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 1,
            "evidenceFi": "Pyörä on reilu 40 vuotta vanha."
          },
          {
            "kind": "choice",
            "q": "Kirjoittaja maksaa, jos joku löytää pyörän.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 0,
            "evidenceFi": "Löytäjälle palkkio."
          },
          {
            "kind": "short",
            "q": "Millainen polkupyörä on? Kirjoita vähintään 4 asiaa.",
            "modelFi": "Esimerkiksi punavalkoinen, hyväkuntoinen, ruosteeton naisten Crescent-pyörä. Siinä on ketjusuojus ja soittokello, mutta ei vaihteita.",
            "modelEn": "For example, red and white, in good condition, rust-free, a women’s Crescent bicycle. It has a chain guard and a bell but no gears.",
            "evidenceFi": "Esimerkiksi punavalkoinen, hyväkuntoinen, ruosteeton naisten Crescent-pyörä. Siinä on ketjusuojus ja soittokello, mutta ei vaihteita."
          },
          {
            "kind": "short",
            "q": "Miksi pyörä on kirjoittajalle tärkeä?",
            "modelFi": "Sillä on tunnearvoa, koska kirjoittaja peri sen isoäidiltään.",
            "modelEn": "It has sentimental value because the writer inherited it from their grandmother.",
            "evidenceFi": "Sillä on tunnearvoa, koska kirjoittaja peri sen isoäidiltään."
          }
        ]
      },
      {
        "id": "yki-reading-doc-2-5",
        "task": 5,
        "title": "Toiset autoilijat ja sää pelottavat liikenteessä",
        "textFi": "Suomalaiset pelkäävät liikenteessä eniten kaahaajia, jonka lisäksi huolta aiheuttaa erityisesti  teiden liukkaus talvisin. Ruotsalaiset sen sijaan pelkäävät eniten riskejä ottavia ohittajia.  Norjalaisia huolettaa muita enemmän uhkarohkeat moottoripyöräilijät ja edellä kulkevan  ajoneuvon kuorman purkautuminen tielle. Tiedot selviävät Ifin teettämästä tutkimuksesta, jossa  selvitettiin 1500 henkilön pelkoja liikenteessä.\n\n\n Suomessa pelätään liikenteessä eniten muita tiellä liikkujia. Selvä enemmistö suomalaisista  vastaajista (71 %) myöntää pelkäävänsä uhkarohkeita ohittajia, kun taas aggressiivisia kuljettajia  pelkää noin kaksi kolmesta vastaajasta (62%). Pohjoismaisessa ilmastossa kun ollaan,  kammoksuvat suomalaiset jonkin verran myös talvisen sään tuomia riskejä. Jäätä ja lunta kertoo  pelkäävänsä 61 prosenttia vastaajista.\n\n\n Suomalaiset erottautuvat kyselyssä muista maista pelkäämällä naapureitaan enemmän  parkkihalleja, joita naapurit eivät juuri myönnä pelkäävänsä. Toisaalta suomalaiset pelkäävät  vähemmän sitä, että poliisi pysäyttää heidät liikenteessä.\n\n\n Aja hyvin 1/2008",
        "questions": [
          {
            "kind": "short",
            "q": "Mitä norjalaiset pelkäävät liikenteessä enemmän kuin muut? Kirjoita 2 asiaa.",
            "modelFi": "Uhkarohkeita moottoripyöräilijöitä ja edellä kulkevan ajoneuvon kuorman purkautumista tielle.",
            "modelEn": "Reckless motorcyclists and cargo falling onto the road from the vehicle ahead.",
            "evidenceFi": "Uhkarohkeita moottoripyöräilijöitä ja edellä kulkevan ajoneuvon kuorman purkautumista tielle."
          },
          {
            "kind": "short",
            "q": "Millaiset kuljettajat aiheuttavat pelkoa muissa ihmisissä? Mainitse 3 asiaa.",
            "modelFi": "Kaahaajat, uhkarohkeat ohittajat ja aggressiiviset kuljettajat.",
            "modelEn": "Speeding drivers, reckless overtakers and aggressive drivers.",
            "evidenceFi": "Kaahaajat, uhkarohkeat ohittajat ja aggressiiviset kuljettajat."
          },
          {
            "kind": "short",
            "q": "Miten suomalaisten pelot eroavat muista pohjoismaalaisista? Mainitse 2 asiaa.",
            "modelFi": "Suomalaiset pelkäävät enemmän parkkihalleja mutta vähemmän poliisin pysäyttämistä.",
            "modelEn": "Finns are more afraid of parking garages but less afraid of being stopped by the police.",
            "evidenceFi": "Suomalaiset pelkäävät enemmän parkkihalleja mutta vähemmän poliisin pysäyttämistä."
          }
        ]
      }
    ]
  },
  {
    "id": "yki-reading-doc-3",
    "number": 3,
    "source": "3.Tekstin_Ymmärtämisen_Harjoitus.pdf",
    "passages": [
      {
        "id": "yki-reading-doc-3-1",
        "task": 1,
        "title": "Voita pääsyliput Puistoblues-konserttiin",
        "textFi": "Puistoblues-konserttiin 28.6.2008\nMissä Puistoblues-konsertti on?\nA) Järvenpäässä\nB) Oulussa\nC) Jyväskylässä\n\nLähetä vastauksesi tekstiviestillä numeroon 17181. Kirjoita viestin alkuun BLUES (välilyönti) A, B tai C. Viestin hinta on 0,50 €.\nVastanneiden kesken arvotaan kahden hengen lippupaketti Puistoblues-konserttiin. Voittajille ilmoitetaan puhelimitse numeroon, josta viesti on lähetetty. Kilpailu on voimassa seuraavan viikon tiistaihin saakka. Viestin on oltava perillä viimeistään kello 19.00, jotta se osallistuu kilpailuun.",
        "questions": [
          {
            "kind": "short",
            "q": "Mitä voit voittaa?",
            "modelFi": "Kahden hengen lippupaketin Puistoblues-konserttiin.",
            "modelEn": "A package of concert tickets for two people.",
            "evidenceFi": "Kahden hengen lippupaketin Puistoblues-konserttiin."
          },
          {
            "kind": "short",
            "q": "Mitä kirjoitat tekstiviestiin, kun oikea vastaus on A?",
            "modelFi": "BLUES A",
            "modelEn": "BLUES A, with a space between BLUES and A.",
            "evidenceFi": "BLUES A"
          },
          {
            "kind": "short",
            "q": "Paljonko viesti maksaa?",
            "modelFi": "0,50 euroa.",
            "modelEn": "0.50 euros.",
            "evidenceFi": "0,50 euroa."
          },
          {
            "kind": "short",
            "q": "Mistä tiedät, jos voitat?",
            "modelFi": "Voittajalle ilmoitetaan puhelimitse numeroon, josta viesti lähetettiin.",
            "modelEn": "The winner receives a phone call to the number used to send the message.",
            "evidenceFi": "Voittajalle ilmoitetaan puhelimitse numeroon, josta viesti lähetettiin."
          },
          {
            "kind": "short",
            "q": "Milloin viimeistään sinun täytyy lähettää viesti, jos haluat osallistua?",
            "modelFi": "Viestin täytyy olla perillä seuraavan viikon tiistaina viimeistään klo 19.00.",
            "modelEn": "The message must arrive by 7 p.m. on Tuesday of the following week.",
            "evidenceFi": "Viestin täytyy olla perillä seuraavan viikon tiistaina viimeistään klo 19.00."
          }
        ]
      },
      {
        "id": "yki-reading-doc-3-2",
        "task": 2,
        "title": "Pysäköikäämme autot vieretysten",
        "textFi": "Meitä päivittäin junalla töihin kulkevia ja auton aseman parkkiin jättäviä on paljon. Nyt\n\n kun lumi peittää maalatut parkkiruudut, autoja pysäköidään selvästi suurpiirteisemmin ja\n\n hölmömmin kuin ruutujen näkyessä.\n\n Parkkipaikoilla on lukuisia yli puolen auton levyisiä turhia välejä, ja moni joutuu tuskailemaan,\n\n mihin autonsa jättäisi. Olisipa tosi hienoa, jos me autoilijat osaisimme ottaa toisetkin huomioon ja\n\n pysäköisimme autot vieriviereen. Ei liene mahdotonta? Mehän osaamme jo sen taidon, kun\n\n olemme kortin saaneet. Vai mitä?\n\n\n\n ”Yksi autoileva vaan Mäntsälästä”",
        "questions": [
          {
            "kind": "choice",
            "q": "Kirjoittaja menee töihin autolla.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 1,
            "evidenceFi": "Kirjoittaja jättää auton aseman parkkiin ja kulkee töihin junalla."
          },
          {
            "kind": "choice",
            "q": "Teksti on kirjoitettu talvella.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 0,
            "evidenceFi": "Lumi peittää maalatut parkkiruudut."
          },
          {
            "kind": "choice",
            "q": "Ihmiset pysäköivät autonsa huonosti kirjoittajan mielestä.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 0,
            "evidenceFi": "Autojen välissä on tarpeettoman suuria välejä."
          },
          {
            "kind": "choice",
            "q": "Kirjoittaja haluaisi, että autot pysäköidään kauemmas toisistaan.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 1,
            "evidenceFi": "Hän toivoo autojen pysäköimistä vieriviereen."
          }
        ]
      },
      {
        "id": "yki-reading-doc-3-3",
        "task": 3,
        "title": "Omaishoitajat tarvitsevat enemmän tukea",
        "textFi": "Maassamme on noin 300 000 omaishoitajaa. Useimmat heistä työskentelevät ilman minkäänlaista\n\n apua yhteiskunnalta. Vain 26 000 omaishoitajaa saa pienen korvauksen työstään. Tulevaisuudessa\n\n omaishoitajien tarve kuitenkin kasvaa entisestään. Omaishoitajien liitto onkin yrittänyt saada\n\n päättäjät tajuamaan, kuinka tärkeää työtä omaishoito on. Todellisuudessa omaishoitajat säästävät\n\n työllään yhteiskunnan rahoja. Jos omaishoitajia ei olisi, paljon suurempi joukko ihmisiä tarvitsisi\n\n sairaalahoitoa tai jonkin hoitolaitoksen palveluja.\n\n Suomen hallitus suhtautuu omaishoitajiin myönteisesti, mutta silti mitään varsinaisia päätöksiä\n\n ei ole tehty. Omaishoitajien liitto vaatii, että korvauksia hoitotyöstä korotetaan ja että korvaus\n\n määritellään samaksi kaikissa kunnissa. Nykyisin korvauksen määrä vaihtelee kunnittain.\n\n Ongelmana on liiton mukaan myös se, että omaishoitajat ovat usein itse melko huonokuntoisia.\n\n Koska hoitaminen on rankkaa puuhaa, saattaa hoitaja itsekin väsyä ja sairastua siinä samalla.\n\n Apua ongelmaan etsitään tilapäishoidosta.\n\n (Selkouutiset)",
        "questions": [
          {
            "kind": "choice",
            "q": "Kaikki omaishoitajat saavat työstään palkkaa.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 1,
            "evidenceFi": "Vain 26 000 noin 300 000 omaishoitajasta saa pienen korvauksen."
          },
          {
            "kind": "choice",
            "q": "Omaishoitajia tarvitaan enemmän tulevaisuudessa.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 0,
            "evidenceFi": "Tulevaisuudessa omaishoitajien tarve kasvaa entisestään."
          },
          {
            "kind": "choice",
            "q": "Omaishoito lisää hoitolaitosten asiakasmäärää.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 1,
            "evidenceFi": "Ilman omaishoitajia suurempi joukko tarvitsisi hoitolaitosten palveluja."
          },
          {
            "kind": "choice",
            "q": "Hallitus on päättänyt korottaa omaishoitajien palkkaa.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 1,
            "evidenceFi": "Mitään varsinaisia päätöksiä ei ole tehty."
          },
          {
            "kind": "choice",
            "q": "Kaikki kunnat maksavat samanlaista korvausta.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 1,
            "evidenceFi": "Korvauksen määrä vaihtelee kunnittain."
          },
          {
            "kind": "choice",
            "q": "Monen omaishoitajan kunto on liian huono.",
            "options": [
              "Oikein",
              "Väärin"
            ],
            "answer": 0,
            "evidenceFi": "Omaishoitajat ovat usein itse melko huonokuntoisia ja voivat väsyä tai sairastua."
          }
        ]
      },
      {
        "id": "yki-reading-doc-3-4",
        "task": 4,
        "title": "Uudet kierrätyspullot tulevat ensi viikolla kauppaan",
        "textFi": "Pehmeä ja kevyt kertakäyttömuovipullo muuttuu pantilliseksi kierrätyspulloksi vuodenvaihteessa.  Kierrätysmuovipulloja ei käytetä uudelleen sellaisenaan, vaan niistä otetaan talteen muovi  uusiokäyttöä varten.  Suomen Palautuspakkaus on varautunut siihen, että kaupoissa on ensi viikolla jonkin verran  hämminkiä, kun kuluttajat totuttautuvat uusiin muovipulloihin.  Uudistuksen tarkoitus on helpottaa kierrätystä. Kaikki neljä pantillista juomapakkausta, lasipullo,  uudelleen täytettävä muovipullo, tölkki ja uusi kierrätysmuovipullo, voidaan vastedes entistä  useammin palauttaa samaan automaattiin.  Oluen juojat voivat ensi viikosta lähtien hörppiä juomansa lasipullon lisäksi myös kierrätettävästä  muovipullosta. Olut säilyy juomavalmistajien mukaan molemmissa pulloissa puoli vuotta.  29.12.2007 Keski-Uusimaa",
        "questions": [
          {
            "kind": "short",
            "q": "Millainen uusi kierrätyspullo on? Mainitse 3 asiaa.",
            "modelFi": "Se on pehmeä, kevyt ja pantillinen muovipullo.",
            "modelEn": "It is a soft, lightweight plastic bottle with a deposit.",
            "evidenceFi": "Se on pehmeä, kevyt ja pantillinen muovipullo."
          },
          {
            "kind": "short",
            "q": "Miten uusia kierrätysmuovipulloja käytetään?",
            "modelFi": "Niitä ei käytetä uudelleen sellaisenaan, vaan muovi otetaan talteen uusiokäyttöä varten.",
            "modelEn": "The bottles are not reused as they are; their plastic is recovered for recycling.",
            "evidenceFi": "Niitä ei käytetä uudelleen sellaisenaan, vaan muovi otetaan talteen uusiokäyttöä varten."
          },
          {
            "kind": "short",
            "q": "Millaisia juomapakkauksia on käytössä? Mainitse 4 asiaa.",
            "modelFi": "Lasipullo, uudelleen täytettävä muovipullo, tölkki ja uusi kierrätysmuovipullo.",
            "modelEn": "Glass bottles, refillable plastic bottles, cans and the new recyclable plastic bottles.",
            "evidenceFi": "Lasipullo, uudelleen täytettävä muovipullo, tölkki ja uusi kierrätysmuovipullo."
          },
          {
            "kind": "short",
            "q": "Miten kauan olut pysyy hyvänä uudessa muovipullossa?",
            "modelFi": "Puoli vuotta eli kuusi kuukautta.",
            "modelEn": "Half a year, or six months.",
            "evidenceFi": "Puoli vuotta eli kuusi kuukautta."
          }
        ]
      },
      {
        "id": "yki-reading-doc-3-5",
        "task": 5,
        "title": "Kauppojen hintamerkinnät usein epäselviä",
        "textFi": "Kaupat merkitsevät hintansa entistä useammin liian epäselvästi. Yleisimmät ongelmat ovat, että hintatieto sijaitsee liian kaukana tuotteesta tai kauppa ei ilmoita alennustuotteiden lopullista hintaa. Lopullinen hinta pitäisi aina olla esillä tuotteessa tai sen välittömässä läheisyydessä silloinkin, kun tavara on alennuksessa. Sama sääntö koskee kaikkia tavaroita vaatteista elintarvikkeisiin.\n\nKuluttajavirasto on saanut lääninhallituksilta runsaasti ilmoituksia hintamerkintöjen sääntöjä rikkovista liikkeistä.\n- Ongelmat ovat yleisempiä kuin vain yhtä kauppaketjua koskevia, sanoo Kuluttajaviraston apulaisjohtaja Päivi Seppälä.\nTavallinen ongelma on se, että kaupat ilmoittavat asiakkaalle pelkän alennusprosentin, kun ne myyvät vanhentumassa olevia elintarvikkeita halvemmalla. Tällöin kuluttaja joutuu itse laskemaan tuotteen oikean hinnan.\n\nPäivittäistavarakauppa ry:n puheenjohtajan Ilkka Niemisen mukaan hinnan laskeminen valmiiksi jokaiseen alennustuotteeseen teettäisi kaupoilla niin paljon työtä, että liikkeet jopa mieluummin luopuvat vanhenevien elintarvikkeiden myynnistä. Tämä lisää tuotteiden hävikkiä.\n- Yleensä alennusprosentit ovat yksinkertaisia, tuotteen saa vaikkapa puolen hintaan. Haluamme nyt neuvotella Kuluttajaviraston kanssa siitä, olisiko tämä riittävän selkeä merkintä tai voidaanko hinnat ilmoittaa taulukoissa, sanoo Nieminen.\nValituksia on tullut myös siitä, että hedelmien ja vihannesten punnitus tapahtuu joissakin kaupoissa vasta kassalla. Kuluttajan pitää saada tietää tuotteen hinta ennen kassalle saapumista.\n\nSeppälä arvelee, että hintoja merkitään epäselvästi, koska muut kuin säädösten mukaiset hintamerkintätavat voivat olla helpompia toteuttaa.\n- Syynä on yleensä tilanpuute. Esimerkiksi pakastealtailla hinnat ovat usein listassa, jolloin tuotteen ja hinnan välillä on etäisyyttä. Ongelmat liittyvät myyntikalusteisiin ja tilan suunnitteluun, Nieminen selvittää.\nKuluttajat ry:n toiminnanjohtaja Kaisa Pannimaa sen sijaan arvelee, että merkinnät ovat epäselviä tai sijaitsevat väärässä paikassa, koska asiakasta ei arvosteta tarpeeksi. Tutkimusten mukaan kuluttajat pitävät hintoja tärkeinä. Selkeät merkinnät helpottavat hintojen vertailua ja edistävät kilpailua.\n- En pidä mahdollisena, että hintamerkinnät olisivat tahallisesti puutteellisia. Kuluttaja jättää usein ostamatta, jos hintaa ei ole. Hinnan puuttuminen koetaan myös huonoksi palveluksi, joka ärsyttää, Nieminen vastaa.\n\nKuluttajavirasto on muistuttanut kauppaketjuja, Päivittäistavarakauppa ry:tä ja Suomen Kaupan Liittoa hinnan ilmoittamisen perussäännöistä.\n- Nyt seuraamme tilannetta ja toivomme parannuksia. Jos merkinnät eivät parane, ryhdymme toimenpiteisiin, Päivi Seppälä kertoo.\nJos hintaa ei löydy, kuluttajan kannattaa ensimmäiseksi ottaa yhteyttä myyjään.\n- Valitettavasti asiakaspalautteita pitää yleensä tulla satoja, ennen kuin kauppiaat muuttavat toimintatapojaan, Pannimaa sanoo.\nPäivittäistavarakauppa ry uskoo kauppojen itse huolehtivan hintalappunsa kuntoon.\n- Hintamerkintöjen selkeys on osa kauppojen laatutyötä. Myymälöillä on intressi erottua edukseen, Nieminen sanoo. Selvästi esitetyt hinnat voivat olla kaupalle kilpailuvaltti.\n\nKeski-Uusimaa 10.6.2008 (lyhennetty)",
        "questions": [
          {
            "kind": "choice",
            "q": "Tavallisin hintamerkintöjen ongelma on, että hinnat",
            "options": [
              "puuttuvat kokonaan",
              "ovat hyllyssä erilaisia kuin kassalla",
              "eivät ole riittävän lähellä tuotetta."
            ],
            "answer": 2,
            "evidenceFi": "Hintatieto sijaitsee liian kaukana tuotteesta."
          },
          {
            "kind": "choice",
            "q": "Alennustuotteissa täytyy aina olla näkyvissä",
            "options": [
              "lopullinen alennettu hinta",
              "alennusprosentti",
              "alkuperäinen hinta."
            ],
            "answer": 0,
            "evidenceFi": "Lopullinen hinta pitäisi aina olla esillä myös alennuksessa."
          },
          {
            "kind": "choice",
            "q": "Kaupat merkitsevät hinnat usein huonosti, koska",
            "options": [
              "se säästää rahaa",
              "tilaa ei ole riittävästi",
              "hinnat muuttuvat jatkuvasti."
            ],
            "answer": 1,
            "evidenceFi": "Niemisen mukaan syynä on yleensä tilanpuute."
          },
          {
            "kind": "choice",
            "q": "Asiakkaiden mielestä selkeät hintamerkinnät",
            "options": [
              "ovat osoitus hyvistä alennuksista",
              "auttavat vertailemaan hintoja",
              "eivät vaikuta ostopäätökseen."
            ],
            "answer": 1,
            "evidenceFi": "Selkeät merkinnät helpottavat hintojen vertailua."
          },
          {
            "kind": "choice",
            "q": "Kauppaketjut ovat",
            "options": [
              "parantaneet hintamerkintöjä",
              "ottaneet yhteyttä Kuluttajavirastoon",
              "saaneet muistutuksen asiasta."
            ],
            "answer": 2,
            "evidenceFi": "Kuluttajavirasto on muistuttanut kauppaketjuja perussäännöistä."
          },
          {
            "kind": "choice",
            "q": "Jos asiakas ei löydä hintaa, hänen kannattaa ensin",
            "options": [
              "kysyä asiasta myyjältä",
              "valittaa Kuluttajavirastoon",
              "pyytää alennusta."
            ],
            "answer": 0,
            "evidenceFi": "Kuluttajan kannattaa ensimmäiseksi ottaa yhteyttä myyjään."
          },
          {
            "kind": "choice",
            "q": "Kaupat haluavat saada hinnat esille selkeästi, koska",
            "options": [
              "asiakkaat valittavat liikaa huonosta palvelusta",
              "ne haluavat olla parempia kuin muut kaupat",
              "kassalla tapahtuu liian paljon virheitä."
            ],
            "answer": 1,
            "evidenceFi": "Myymälöillä on intressi erottua edukseen; selkeät hinnat voivat olla kilpailuvaltti."
          }
        ]
      }
    ]
  }
];
