export const categories=['All','Leadership','Influence','Strategy','Reputation','Communication'];
export type Law={id:number,title:string,category:string,summary:string,application:string,caution:string,example:string};
export const laws:Law[]=[
  {
    "id": 1,
    "title": "Never Outshine the Master",
    "category": "Leadership",
    "summary": "Kapag masyadong natatabunan ang isang leader, puwedeng makita niya ang galing mo bilang threat. Para kay Greene, mahalaga ang paraan ng pagpapakita ng talent at pagbibigay ng recognition.",
    "application": "Ipakita ang contribution mo at kilalanin din ang support ng iba. Kung sensitibo ang correction, kausapin muna ang tao privately.",
    "caution": "Huwag itago ang seryosong mali para lang protektahan ang ego ng boss. Hindi rin kailangang burahin ang sarili mong contribution.",
    "example": "Sa project review, ipinakita mo ang analysis mo, pinasalamatan ang sponsor, at malinaw na binanggit kung sino ang gumawa ng bawat bahagi."
  },
  {
    "id": 2,
    "title": "Never Put Too Much Trust in Friends, Learn How to Use Enemies",
    "category": "Influence",
    "summary": "Hindi automatic na mahusay na katrabaho ang isang kaibigan. Sabi ni Greene, minsan mas nagsisikap ang dating rival dahil may kailangan siyang patunayan.",
    "application": "Pumili ng collaborator base sa track record, malinaw na responsibilities, at pareho ninyong interests.",
    "caution": "Hindi lahat ng kaibigan ay traydor, at hindi rin automatic na mapagkakatiwalaan ang dating kalaban.",
    "example": "May proposal ang kaibigan mo at ang dati mong competitor. Pareho mong sinuri ang skills at commitments nila bago pumili."
  },
  {
    "id": 3,
    "title": "Conceal Your Intentions",
    "category": "Strategy",
    "summary": "Kapag maaga mong inilabas ang buong plano, may oras ang iba para harangin ito. Inirerekomenda ni Greene na huwag agad ipakita ang tunay na direction ng bawat move.",
    "application": "I-share ang plano sa tamang stage at sa mga taong kailangan ito para makakilos.",
    "caution": "Magkaiba ang privacy at panloloko. Kailangan pa rin ng collaborators ng totoong impormasyon para makapagdesisyon.",
    "example": "Tahimik mo munang tine-test ang business idea bago mag-announce ng launch date na hindi pa sigurado."
  },
  {
    "id": 4,
    "title": "Always Say Less Than Necessary",
    "category": "Communication",
    "summary": "Kapag sobrang daming paliwanag, puwedeng humina ang punto mo o may masabi kang hindi kailangan. Para kay Greene, may power sa malinaw na salita at tamang pause.",
    "application": "Sabihin nang diretso ang main point, tapos makinig. Hindi kailangang punuin ang bawat katahimikan.",
    "caution": "Huwag gawing dahilan ang pagiging maikli para malabo ang expectations o kulang ang importanteng facts.",
    "example": "Matapos mong ipresent ang proposal at ebidensya, hinayaan mong sumagot ang kausap sa halip na tuloy-tuloy na magpaliwanag."
  },
  {
    "id": 5,
    "title": "So Much Depends on Reputation—Guard It with Your Life",
    "category": "Reputation",
    "summary": "Bago pa malaman ng tao ang buong kuwento, naaapektuhan na sila ng reputation mo. Para kay Greene, ang consistent na image ay puwedeng proteksyon at source ng influence.",
    "application": "Bumuo ng magandang track record. Itama ang maling impormasyong may tunay na epekto gamit ang ebidensya.",
    "caution": "Hindi sapat ang pagprotekta sa image kung may totoong pagkakamaling kailangan mong akuin.",
    "example": "Kinuwestiyon ang reliability mo. Ipinakita mo ang delivery record at inayos ang delay na ikaw ang sanhi."
  },
  {
    "id": 6,
    "title": "Court Attention at All Cost",
    "category": "Reputation",
    "summary": "Kung hindi ka napapansin, mahirap makilala ang value mo. Sabi ni Greene, malaking bahagi ng power ang pagiging visible at madaling matandaan.",
    "application": "Gawing madaling makita ang kapaki-pakinabang mong trabaho at kung saan ka magaling.",
    "caution": "Ang attention na galing sa gulo o outrage ay puwedeng sumira sa tiwalang kailangan mo later.",
    "example": "Nag-share ang designer ng malinaw na before-and-after case study sa halip na umasa na may makakapansin sa work niya."
  },
  {
    "id": 7,
    "title": "Get Others to Do the Work for You, but Always Take the Credit",
    "category": "Leadership",
    "summary": "Inilalarawan ni Greene kung paano lumalakas ang mga taong nag-oorganize ng trabaho ng iba at kumukuha ng credit. Pinapakita nito ang pagitan ng paggawa ng value at pagtanggap ng recognition.",
    "application": "Linawin kung sino ang gagawa at sino ang kikilalanin bago magsimula ang group project.",
    "caution": "Nakakasira ng teamwork ang pag-angkin sa gawa ng iba. Dito, ang practical lesson ay fair delegation at tamang credit.",
    "example": "Bago magsimula ang research, napagkasunduan ng team ang ownership at kung paano ipapakita ang contributions sa presentation."
  },
  {
    "id": 8,
    "title": "Make Other People Come to You—Use Bait if Necessary",
    "category": "Strategy",
    "summary": "Kapag ang ibang tao ang lumalapit sa iyo, mas may control ka sa timing at setting. Sabi ni Greene, puwedeng gumamit ng incentives para mahikayat silang sumunod sa iyong setup.",
    "application": "Mag-offer ng tunay na value at pumili ng setting kung saan puwedeng makagawa ng malinaw na decision.",
    "caution": "Huwag gumamit ng pekeng pangako para mapasok ang isang tao sa agreement.",
    "example": "Nag-organize ka ng useful working session na may malinaw na agenda sa halip na paulit-ulit humabol sa vague na partnership calls."
  },
  {
    "id": 9,
    "title": "Win Through Your Actions, Never Through Argument",
    "category": "Communication",
    "summary": "Puwede kang manalo sa argumento pero mawalan ng support. Para kay Greene, mas malakas ang demonstration na may resulta kaysa paliwanag na nag-iiwan ng sama ng loob.",
    "application": "Magmungkahi ng maliit na test. Mag-agree muna kung paano ninyo susukatin ang resulta.",
    "caution": "Kailangan pa rin ang usapan kapag may dapat ipaliwanag, akuin, o pagdesisyunan nang may consent.",
    "example": "Hindi magkasundo ang dalawang team sa process. Nag-run sila ng one-week pilot at kinumpara ang completion time."
  },
  {
    "id": 10,
    "title": "Infection: Avoid the Unhappy and Unlucky",
    "category": "Influence",
    "summary": "Para kay Greene, nakakahawa ang emosyon at destructive patterns. Ang payo niya ay protektahan ang sarili sa mga relasyong paulit-ulit kang hinihila sa gulo.",
    "application": "Ihiwalay ang pansamantalang hirap sa paulit-ulit na harmful behavior. Magtakda ng boundaries sa huli.",
    "caution": "Hindi character flaw ang malas o paghihirap. Puwedeng tumulong habang may healthy boundaries.",
    "example": "Tinutulungan mo ang struggling na colleague pero hindi ka sumasali sa araw-araw na cycle ng sisihan at tsismis."
  },
  {
    "id": 11,
    "title": "Learn to Keep People Dependent on You",
    "category": "Influence",
    "summary": "Kapag mahalaga at mahirap palitan ang contribution mo, mas malakas ang bargaining position mo. Iniuugnay ni Greene ang pagiging kailangan sa pagkakaroon ng independence.",
    "application": "Palalimin ang useful skill at alamin kung saan may malaking epekto ang expertise mo.",
    "caution": "Ang pagtatago ng kaalaman ay nagpapahina sa team. Gawing mahalaga ang skills mo, hindi ang problemang ikaw lang ang puwedeng ayusin.",
    "example": "Ikaw ang trusted specialist, pero dini-document mo rin ang process para tuloy ang trabaho kapag wala ka."
  },
  {
    "id": 12,
    "title": "Use Selective Honesty and Generosity to Disarm Your Victim",
    "category": "Influence",
    "summary": "Ang isang honest o generous na gesture ay puwedeng magpababa ng suspicion. Inilalarawan ni Greene kung paano ginagamit ang piling katotohanan para makuha ang tiwala ng tao.",
    "application": "Tandaan na hindi patunay ng buong character ang isang regalo o candid na pag-amin.",
    "caution": "Kapag ginamit ang honesty bilang cover ng panloloko, malaki ang puwedeng maging damage sa trust.",
    "example": "Na-appreciate mo ang libreng tulong ng vendor, pero binasa mo pa rin ang buong terms bago pumirma."
  },
  {
    "id": 13,
    "title": "When Asking for Help, Appeal to People’s Self-Interest, Never to Their Mercy or Gratitude",
    "category": "Communication",
    "summary": "Hindi garantiya ng tulong bukas ang pabor mo kahapon. Payo ni Greene: ipakita kung ano ang mapapala ng kausap sa request mo.",
    "application": "Linawin ang shared benefit, ang specific na tulong na kailangan, at ang contribution mo rin.",
    "caution": "Huwag mag-imbento ng benefit. Totoong care at goodwill ay maaari ring dahilan kung bakit tumutulong ang tao.",
    "example": "Humingi ka ng tulong sa dashboard at ipinakita kung paano nito mababawasan ang weekly reporting work ng kabilang team."
  },
  {
    "id": 14,
    "title": "Pose as a Friend, Work as a Spy",
    "category": "Strategy",
    "summary": "May advantage ang nakakaalam ng motives at priorities ng iba. Inilalarawan ni Greene ang social conversations bilang paraan para makakuha ng impormasyong hindi direktang ibinibigay.",
    "application": "Magtanong nang maayos at i-check ang assumptions gamit ang impormasyong kusang ibinabahagi.",
    "caution": "Huwag magpanggap na kaibigan para manloko, manghimasok sa privacy, o kumuha ng confidential na impormasyon.",
    "example": "Bago gumawa ng proposal, tinanong mo ang stakeholders kung aling problema ang pinakamahalaga sa kanila."
  },
  {
    "id": 15,
    "title": "Crush Your Enemy Totally",
    "category": "Strategy",
    "summary": "Babala ni Greene: kung hindi tapos ang conflict, puwedeng bumalik ang dating kalaban. Para sa kanya, unstable ang victory kung buhay pa ang pinagmumulan ng laban.",
    "application": "Ayusin ang root cause ng paulit-ulit na conflict at linawin kung ano ang ibig sabihin ng tapos na.",
    "caution": "Hindi dahilan ang matinding wording ng libro para manakit, manghiya, o gumanti.",
    "example": "Matapos ayusin ang away sa responsibilities, isinulat ng dalawang team kung sino ang may decision rights para hindi bumalik ang parehong issue."
  },
  {
    "id": 16,
    "title": "Use Absence to Increase Respect and Honor",
    "category": "Reputation",
    "summary": "Kapag established na ang value mo, puwedeng maging ordinaryo ang tingin dito kung lagi kang available. Para kay Greene, ang tamang absence ay nakakapagbalik ng appreciation.",
    "application": "Protektahan ang focus time at gawing intentional ang availability mo.",
    "caution": "Kung wala pang trust o napapabayaan ang responsibilities, ang pagkawala mo ay puwedeng magmukhang pagiging unreliable.",
    "example": "Sa halip na laging sumagot sa chat, nagtakda ang adviser ng reliable office hours at mas substantive na guidance."
  },
  {
    "id": 17,
    "title": "Keep Others in Suspended Terror: Cultivate an Air of Unpredictability",
    "category": "Strategy",
    "summary": "Kapag predictable ang bawat reaction mo, mas madaling maunahan ka. Inilalarawan ni Greene ang uncertainty bilang paraan para mapaisip nang husto ang rivals.",
    "application": "Huwag puro automatic reaction. Baguhin ang approach kapag hindi na gumagana ang nakasanayan.",
    "caution": "Kung unpredictable ka sa teammates, puwedeng mawala ang sense of safety at trust nila.",
    "example": "Hindi na automatic na nagbibigay ng concession ang negotiator sa bawat pause; pinag-iisipan muna niya ang ibang terms."
  },
  {
    "id": 18,
    "title": "Do Not Build Fortresses to Protect Yourself—Isolation Is Dangerous",
    "category": "Influence",
    "summary": "Ang sobrang paglayo sa iba ay puwedeng magputol sa impormasyon at relationships na nagpoprotekta sa iyo. Para kay Greene, may seguridad sa connections, hindi lang sa isolation.",
    "application": "Panatilihin ang relationships sa labas ng maliit mong circle at makinig sa ibang perspective.",
    "caution": "Hindi kailangang laging social. Mahalaga pa rin ang boundaries at oras para mag-focus.",
    "example": "Kinausap ng bagong manager ang iba’t ibang departments bago umasa sa report ng iisang adviser."
  },
  {
    "id": 19,
    "title": "Know Who You’re Dealing With—Do Not Offend the Wrong Person",
    "category": "Influence",
    "summary": "Hindi pare-pareho ang reaction ng tao sa isang tactic. Babala ni Greene: puwedeng maliitin mo ang pride, persistence, o kakayahan ng isang taong lumaban pabalik.",
    "application": "Kilalanin muna ang interests at context ng tao bago pumili ng paraan ng pag-disagree.",
    "caution": "Dapat may respeto kahit wala siyang kapangyarihang gumanti.",
    "example": "Nalaman mo kung paano gustong tumanggap ng feedback ang stakeholder, kaya privately at may ebidensya mo inilapit ang concern."
  },
  {
    "id": 20,
    "title": "Do Not Commit to Anyone",
    "category": "Strategy",
    "summary": "Kapag maaga kang pumili ng side, puwedeng mawala ang options mo. Payo ni Greene na protektahan ang independence habang hindi pa malinaw ang alternatives.",
    "application": "Huwag mangako nang padalos-dalos. Sabihin nang malinaw kung ano ang agreed na at ano ang hindi pa.",
    "caution": "Kung ayaw mong mag-commit kahit kailan, mahirap kang pagkatiwalaan. Kapag pumayag ka na, tuparin mo.",
    "example": "Sinuri mo muna ang parehong proposal bago mag-endorse, tapos binigyan mo ng malinaw na sagot ang napili mong team."
  },
  {
    "id": 21,
    "title": "Play a Sucker to Catch a Sucker—Seem Dumber Than Your Mark",
    "category": "Communication",
    "summary": "Kapag pakiramdam ng tao ay mas matalino siya, puwede siyang maging kampante. Inilalarawan ni Greene kung paano nakababawas ng suspicion ang hindi pagyayabang ng ability.",
    "application": "Magtanong kahit basic. Hindi kailangang patunayan ang expertise mo sa bawat usapan.",
    "caution": "Useful ang curiosity; puwedeng mag-backfire ang pagpapanggap na walang alam para manloko.",
    "example": "Kahit experienced na, hiniling ng analyst na ipaliwanag muna ng team ang assumptions bago siya nagbigay ng solution."
  },
  {
    "id": 22,
    "title": "Use the Surrender Tactic: Transform Weakness into Power",
    "category": "Strategy",
    "summary": "Kung talo ka sa direct confrontation, minsan mas matalinong umatras muna. Para kay Greene, ang pag-yield ay puwedeng magbigay ng oras at resources para makabawi.",
    "application": "Mag-concede sa maliit na bagay kung napoprotektahan nito ang mas malaking goal at future options.",
    "caution": "Dapat may purpose ang pause. Ibang usapan ang pagsuko sa core boundaries mo.",
    "example": "Ipinagpaliban mo ang kulang-sa-support na proposal, nangalap ng mas maayos na ebidensya, at bumalik sa susunod na planning cycle."
  },
  {
    "id": 23,
    "title": "Concentrate Your Forces",
    "category": "Strategy",
    "summary": "Kapag hati-hati ang effort, humihina ang bawat move. Payo ni Greene na palalimin ang pinaka-productive na opportunity kaysa laging magbukas ng bagong front.",
    "application": "Piliin ang pinakamahalagang goal at bigyan ito ng sapat na oras at resources para matapos.",
    "caution": "Magkaroon pa rin ng backup. Delikado ang umasa sa iisang fragile na source ng support.",
    "example": "Tinapos muna ng maliit na team ang importanteng customer workflow bago magsimula ng apat na unrelated features."
  },
  {
    "id": 24,
    "title": "Play the Perfect Courtier",
    "category": "Leadership",
    "summary": "Sa hierarchy, mahalaga ang tact, timing, at sensitivity sa status. Ang courtier ni Greene ay marunong mag-navigate ng competing interests nang hindi ginagawang confrontation ang lahat.",
    "application": "Basahin ang room, magbigay ng tamang credit, at ilapit ang disagreement nang maingat.",
    "caution": "Hindi dapat maging dahilan ang diplomacy para manahimik sa seryosong mali.",
    "example": "Bago ang difficult meeting, kinausap mo ang key colleagues at inilatag ang concerns bilang mga problemang puwedeng ayusin ng grupo."
  },
  {
    "id": 25,
    "title": "Re-create Yourself",
    "category": "Reputation",
    "summary": "Puwedeng limitahan ka ng role na idinikit sa iyo ng ibang tao. Payo ni Greene na sadyang hubugin ang identity mo sa halip na tanggapin itong fixed na.",
    "application": "Magpakita ng totoong ebidensya ng skills at responsibilities na gusto mong makilala sa iyo.",
    "caution": "Kailangan ng substance ang bagong image; hindi sapat ang presentation lang.",
    "example": "Nag-develop at nagpakita muna ng research skills ang support specialist bago lumipat sa product work."
  },
  {
    "id": 26,
    "title": "Keep Your Hands Clean",
    "category": "Reputation",
    "summary": "Inilalarawan ni Greene ang leaders na malinis ang image dahil inilalayo nila ang sarili sa unpopular decisions at ipinapasa ang sisi. Pinapakita ng law kung paano natatago ang accountability.",
    "application": "Linawin at i-document kung sino ang nagdesisyon, nag-approve, at nag-execute.",
    "caution": "Ang pagsisi sa iba ay nagpapasa lang ng cost. Kasama sa matibay na reputation ang pag-ako sa sariling decisions.",
    "example": "Inako ng sponsor ang decision sa difficult rollout sa halip na hayaang ang delivery team lang ang batikusin."
  },
  {
    "id": 27,
    "title": "Play on People’s Need to Believe to Create a Cultlike Following",
    "category": "Influence",
    "summary": "Malakas humatak ng loyalty ang belonging, rituals, at magandang pangako. Inilalarawan ni Greene kung paano nagiging source ng influence ang pag-asa na malabo ang basehan.",
    "application": "Suriin ang groups na humihingi ng loyalty pero kulang sa ebidensya at accountability.",
    "caution": "Ang shared mission ay dapat may space para sa disagreement at independent judgment.",
    "example": "Sinuri mo ang actual outcomes at transparency ng charismatic na group, hindi lang ang excitement ng members."
  },
  {
    "id": 28,
    "title": "Enter Action with Boldness",
    "category": "Leadership",
    "summary": "Puwedeng humina ang execution kapag puro pag-aalinlangan. Para kay Greene, mahalaga ang decisive action kapag napili na ang direction.",
    "application": "Maghanda, magdesisyon, at sabihin nang malinaw ang next move.",
    "caution": "Hindi kapalit ng ebidensya ang confidence. Kung mataas ang uncertainty, magsimula sa reversible na test.",
    "example": "Matapos i-validate ang demand, nag-commit ka sa maliit na launch sa halip na paulit-ulit buksan ang parehong decision."
  },
  {
    "id": 29,
    "title": "Plan All the Way to the End",
    "category": "Strategy",
    "summary": "Puwedeng may nakatagong problema pagkatapos ng unang win. Payo ni Greene na pag-isipan ang consequences, obstacles, at ending bago ilaan ang resources.",
    "application": "I-define ang success, possible failure points, stopping rule, at mangyayari pagkatapos ng unang milestone.",
    "caution": "I-update ang plano kapag nagbago ang assumptions. Hindi kailangang maging rigid para maging prepared.",
    "example": "Bago mag-launch ng service, pinagplanuhan mo ang support capacity, costs, at kung kailan dapat i-pause ang rollout."
  },
  {
    "id": 30,
    "title": "Make Your Accomplishments Seem Effortless",
    "category": "Reputation",
    "summary": "Kapag polished ang resulta, puwedeng magmukhang natural ang mastery. Payo ni Greene na huwag laging ilantad ang paghahanda at mechanics sa likod ng performance.",
    "application": "Mag-rehearse nang maayos at ipresent ang final result nang malinaw.",
    "caution": "Kung itatago lahat ng effort, puwedeng maging unrealistic ang expectations at mas mahirap magturo.",
    "example": "Nag-practice ang presenter hanggang maging kalmado ang demo, pero kinilala pa rin niya ang paghahanda ng team."
  },
  {
    "id": 31,
    "title": "Control the Options: Get Others to Play with the Cards You Deal",
    "category": "Strategy",
    "summary": "Ang taong nagtatakda ng options ay may influence bago pa pumili ang iba. Pinapakita ni Greene ang power sa likod ng choice na mukhang malaya.",
    "application": "Magbigay ng malinaw at workable na alternatives. Tingnan din kung anong options ang hindi ipinapakita sa iyo.",
    "caution": "Huwag itago ang pamimilit sa anyong choice. Dapat malinaw ang tradeoffs at puwedeng tumanggi.",
    "example": "Naglatag ang lead ng dalawang feasible delivery plans, ipinaliwanag ang cost, at tumanggap ng pangatlong suggestion."
  },
  {
    "id": 32,
    "title": "Play to People’s Fantasies",
    "category": "Influence",
    "summary": "Minsan mas madaling paniwalaan ang magandang pangako kaysa mahirap na reality. Inilalarawan ni Greene kung paano napapahina ng desire ang pagdududa.",
    "application": "I-connect ang vision sa tunay na hopes, pero hanapin ang ebidensya sa likod ng appealing na promises.",
    "caution": "Huwag magbenta ng imposibleng outcome o palitan ang facts ng puro aspiration.",
    "example": "Ipinakita mo ang vision ng mas magandang workflow kasama ang working prototype at mga limitasyong kailangan pang ayusin."
  },
  {
    "id": 33,
    "title": "Discover Each Man’s Thumbscrew",
    "category": "Influence",
    "summary": "May behaviors na mas naiintindihan kapag alam mo ang hidden needs at insecurities. Para kay Greene, ang mga pressure point na ito ay puwedeng maging leverage.",
    "application": "Unawain kung ano ang mahalaga sa kausap at kung saan vulnerable ang sarili mong judgment.",
    "caution": "Hindi permission para mang-exploit ang pagkakaalam sa kahinaan ng iba.",
    "example": "Nabawasan ang resistance ng colleague nang na-address mo ang totoong concern niyang mawalan ng ownership sa trabaho."
  },
  {
    "id": 34,
    "title": "Be Royal in Your Own Fashion: Act Like a King to Be Treated Like One",
    "category": "Reputation",
    "summary": "Nakaaapekto sa pagtrato sa iyo ang standards at confidence na ipinapakita mo. Para kay Greene, ang dignity at self-respect ay puwedeng humatak ng respeto.",
    "application": "Sabihin nang kalmado ang value mo at maging consistent sa expectations.",
    "caution": "Nakakairita ang entitlement na walang competence. Hindi kailangang magmataas para magkaroon ng self-respect.",
    "example": "Ipinaliwanag mo ang scope at fee nang hindi humihingi ng paumanhin sa pagkakaroon ng professional boundaries."
  },
  {
    "id": 35,
    "title": "Master the Art of Timing",
    "category": "Strategy",
    "summary": "Puwedeng pumalya ang magandang move kung mali ang timing. Para kay Greene, kailangan ang patience, awareness sa pagbabago, at decisiveness kapag dumating ang opening.",
    "application": "Alamin kung anong conditions ang hinihintay mo at kung kailan mo muling susuriin ang sitwasyon.",
    "caution": "Kung wala kang clear signal na hinihintay, baka avoidance na ang paghihintay.",
    "example": "Inihanda mo ang staffing proposal bago ang budget planning, hindi pagkatapos ma-finalize ang allocations."
  },
  {
    "id": 36,
    "title": "Disdain Things You Cannot Have: Ignoring Them Is the Best Revenge",
    "category": "Strategy",
    "summary": "Kapag binibigyan mo ng sobrang attention ang isang slight o bagay na hindi makuha, lumalaki ang importance nito. Payo ni Greene na minsan mas may power sa hindi paghabol.",
    "application": "Piliin kung aling distraction ang dapat sagutin at ibalik ang effort sa mahalagang goal.",
    "caution": "Huwag balewalain ang totoong harm o problemang kailangan talagang ayusin.",
    "example": "Hindi ka na sumali sa paikot-ikot na online argument at bumalik ka sa trabahong may epekto sa goals mo."
  },
  {
    "id": 37,
    "title": "Create Compelling Spectacles",
    "category": "Communication",
    "summary": "Malakas ang unang epekto ng images at symbols bago pa pumasok ang detailed reasoning. Para kay Greene, malaking bahagi ng influence ang kung ano ang nakikita at natatandaan ng audience.",
    "application": "Gumamit ng malinaw na demo o visual story para maging konkreto ang idea.",
    "caution": "Dapat suportahan ng magandang presentation ang ebidensya, hindi takpan ang kawalan nito.",
    "example": "Ipinakita ng team ang working customer journey sa halip na ipaimagine lang ito mula sa dense na slides."
  },
  {
    "id": 38,
    "title": "Think as You Like but Behave Like Others",
    "category": "Influence",
    "summary": "Kapag lantad mong minamaliit ang nakasanayan ng isang grupo, baka tanggihan ka bago pa marinig ang idea. Payo ni Greene na intindihin ang conventions habang independent pa rin ang isip mo.",
    "application": "Alamin muna ang language at norms ng bagong setting bago magmungkahi ng ibang approach.",
    "caution": "Hindi dapat kailanganing talikuran ang principles mo para lang makibagay.",
    "example": "Ipinaliwanag mo ang bagong practice gamit ang terms na familiar sa team sa halip na maliitin ang kasalukuyan nilang paraan."
  },
  {
    "id": 39,
    "title": "Stir Up Waters to Catch Fish",
    "category": "Communication",
    "summary": "Kapag galit ang isang tao, mas humihina ang judgment at mas predictable ang reaction niya. Inilalarawan ni Greene ang pagprovoke sa iba habang kalmado ang sarili.",
    "application": "Pansinin kung pini-provoke ka. Mag-pause at bumalik sa facts at sa tunay na objective.",
    "caution": "Puwedeng lumala ang conflict kung sadya mong dini-distress ang tao. Ang defensive lesson dito ay composure.",
    "example": "Nang may nang-asar sa meeting, nagtanong ka tungkol sa specific na assumption sa halip na sagutin ang insulto."
  },
  {
    "id": 40,
    "title": "Despise the Free Lunch",
    "category": "Strategy",
    "summary": "Ang libreng offer ay puwedeng may kapalit na obligasyon o hidden cost. Iniuugnay ni Greene ang sariling pagbabayad sa pagiging independent sa guilt at unwanted influence.",
    "application": "Alamin kung ano ang hinihinging kapalit later at ikumpara ang buong cost.",
    "caution": "May tunay na generosity. Suriin ang terms sa halip na isipin agad na trap ang bawat regalo.",
    "example": "Bago tumanggap ng free trial, tinanong mo kung automatic itong magiging paid at kung may cost ang pag-alis."
  },
  {
    "id": 41,
    "title": "Avoid Stepping into a Great Man’s Shoes",
    "category": "Reputation",
    "summary": "Mahirap sumunod sa celebrated na predecessor dahil lagi kang ikukumpara. Payo ni Greene na gumawa ng sariling identity at purpose.",
    "application": "Intindihin ang dating gumagana, tapos tukuyin kung anong contribution ang kailangan ngayon.",
    "caution": "Huwag basta mag-iba para lang maging different. May continuity na worth keeping.",
    "example": "Pinanatili ng bagong lead ang successful na rituals pero nagtakda ng priority na akma sa bagong customer needs."
  },
  {
    "id": 42,
    "title": "Strike the Shepherd and the Sheep Will Scatter",
    "category": "Leadership",
    "summary": "Minsan umiikot ang group conflict sa isang central source ng influence. Payo ni Greene na hanapin ang source kaysa labanan nang paisa-isa ang lahat.",
    "application": "Imbestigahan ang root cause ng paulit-ulit na disruption at ayusin ito sa patas na process.",
    "caution": "Huwag gawing scapegoat ang isang tao para sa structural problems o parusahan ang simpleng disagreement.",
    "example": "Sinuri ng manager kung paano kumakalat ang maling impormasyon at nilinaw ang decision process kasama ang mga involved."
  },
  {
    "id": 43,
    "title": "Work on the Hearts and Minds of Others",
    "category": "Influence",
    "summary": "Puwedeng sumunod ang tao dahil sa pressure pero magkimkim ng resistance. Para kay Greene, mas matibay ang support kapag naiintindihan mo ang emotions at interests nila.",
    "application": "Makinig sa kung ano ang kinatatakutan nilang mawala at i-connect ang proposal sa bagay na mahalaga sa kanila.",
    "caution": "Dapat may tunay na option na tumanggi; huwag gamitin ang vulnerabilities para mamilit.",
    "example": "Bago baguhin ang schedule, pinakinggan mo ang constraints ng team at sabay ninyong dinisenyo ang maliit na pilot."
  },
  {
    "id": 44,
    "title": "Disarm and Infuriate with the Mirror Effect",
    "category": "Communication",
    "summary": "Kapag nire-reflect mo ang behavior o pananaw ng tao, puwedeng mabuo ang connection o ma-unsettle siya. Inilalarawan ni Greene ang mirroring bilang persuasive at disruptive na technique.",
    "application": "Ibalik sa sariling salita ang concern na narinig mo at i-check kung tama ang understanding mo.",
    "caution": "Kapag ginamit para mang-asar o manipulahin, puwedeng lumala ang usapan.",
    "example": "Binuod mo muna ang concern ng stakeholder bago magmungkahi ng sagot."
  },
  {
    "id": 45,
    "title": "Preach the Need for Change, but Never Reform Too Much at Once",
    "category": "Leadership",
    "summary": "Puwedeng gusto ng tao ang change in principle pero ayaw sa disruption nito. Payo ni Greene na i-connect ang reform sa familiar na practices at gawin ito sa manageable na steps.",
    "application": "Panatilihin ang useful na continuity at mag-test muna ng isang improvement bago palawakin.",
    "caution": "May urgent problems na kailangan ng mabilis na action. Hindi laging tama ang mabagal na change.",
    "example": "Isang handoff muna ang inayos ng bagong leader kasama ang team, sa halip na palitan lahat ng process sa unang linggo."
  },
  {
    "id": 46,
    "title": "Never Appear Too Perfect",
    "category": "Reputation",
    "summary": "Kapag parang wala kang flaws, puwedeng makaramdam ng inggit o distance ang iba. Payo ni Greene na magpakita ng sapat na fallibility para maging approachable.",
    "application": "Maging honest sa uncertainty at ordinaryong pagkakamali.",
    "caution": "Huwag mag-imbento ng weakness o maliitin ang error na nakaapekto sa ibang tao.",
    "example": "Ikinuwento ng senior colleague ang dating maling judgment at kung ano ang binago niya pagkatapos."
  },
  {
    "id": 47,
    "title": "Do Not Go Past the Mark You Aimed For; In Victory, Learn When to Stop",
    "category": "Strategy",
    "summary": "Pagkatapos manalo, madaling maging overconfident at lumampas sa original goal. Babala ni Greene: ang hindi kailangang next move ay puwedeng sumira sa magandang outcome.",
    "application": "Mag-set ng stopping rule bago kumilos at mag-pause kapag naabot mo na ang target.",
    "caution": "Kung may bagong evidence, puwedeng baguhin ang goal—pero dapat deliberate, hindi dala lang ng excitement.",
    "example": "Naabot na ang acceptable terms, kaya kinumpirma mo ang agreement sa halip na humingi pa ng huling concession na puwedeng makasira sa deal."
  },
  {
    "id": 48,
    "title": "Assume Formlessness",
    "category": "Strategy",
    "summary": "Kapag rigid ang method, nagiging predictable at madaling masira kapag nagbago ang conditions. Payo ni Greene na manatiling adaptable kaysa kumapit sa fixed na plano.",
    "application": "Panatilihin ang purpose habang ina-adjust ang paraan base sa bagong impormasyon.",
    "caution": "Kailangan pa rin ng principles. Kung pabago-bago ka nang walang dahilan, mahirap kang pagkatiwalaan.",
    "example": "Binago ng team ang delivery method matapos makatanggap ng feedback, pero pareho pa rin ang customer outcome na pinaninindigan nila."
  }
];
export type Scenario={id:number,law:number,title:string,setting:string,text:string,choices:[string,number,string][]};
export const scenarios:Scenario[]=[
  {
    "id": 1,
    "law": 1,
    "title": "Napunta sa iyo ang spotlight.",
    "setting": "Workplace · Recognition",
    "text": "Gumawa ka ng analysis na nagpapaganda sa proposal ng manager mo. Sa leadership review, ikaw ang pinapresent ng director. Halatang protective ang manager mo sa original niyang plano. Paano mo hahawakan ang moment?",
    "choices": [
      [
        "Ipakita kung bakit outdated na ang original proposal niya.",
        0,
        "Naipakita mo nga ang galing mo, pero puwedeng maging kalaban mo ang manager dahil sa public comparison. Ang useful na contribution ay naging paligsahan sa status."
      ],
      [
        "I-present ang improvement, kilalanin ang support ng sponsor, at linawin ang contributions ng team.",
        2,
        "Visible ang value mo at may dahilan pa rin ang manager para suportahan ang resulta. Na-apply mo ang Law 1 nang hindi ibinibigay sa iba ang totoong credit mo."
      ],
      [
        "Manahimik at hayaang kunin ng manager ang lahat ng credit.",
        1,
        "Naiwasan mo ang tension ngayon, pero nawala rin ang ebidensya ng contribution mo. Hindi kailangang mawala ka sa eksena para maging maingat."
      ]
    ]
  },
  {
    "id": 2,
    "law": 9,
    "title": "Paikot-ikot na ang meeting.",
    "setting": "Workplace · Persuasion",
    "text": "Hindi magkasundo ang dalawang team kung makakatipid ng oras ang bagong handoff process. Dalawang beses mo nang ipinaliwanag ang reasoning mo. Ipinagtatanggol pa rin ng kabilang lead ang lumang paraan. Ano ang next move mo?",
    "choices": [
      [
        "Mag-propose ng one-week pilot na may agreed measures at review date.",
        2,
        "May pagkakataon ang parehong team na matuto sa resulta nang walang kailangang mapahiya. Ito ang Law 9: mas may bigat ang demonstration kaysa walang-katapusang argumento."
      ],
      [
        "Ulitin ang argumento nang mas madiin at dagdagan ng slides.",
        0,
        "Baka lalo lang tumigas ang posisyon nila. Hindi na kakulangan ng slides ang problema—baka ayaw na lang nilang bumitaw sa kanilang paninindigan."
      ],
      [
        "Bitawan agad ang proposal para matapos ang tension.",
        1,
        "Nabawasan ang friction, pero hindi nasagot ang tunay na tanong. Puwedeng i-test ang idea nang maliit at reversible habang maayos pa rin ang cooperation."
      ]
    ]
  },
  {
    "id": 3,
    "law": 13,
    "title": "Kailangan mo ng tulong ng ibang team.",
    "setting": "Collaboration · Shared interests",
    "text": "Kailangan mo ng dalawang oras mula sa busy na operations colleague para matapos ang reporting tool. Makakatanggal din ito ng paulit-ulit na weekly task ng team niya. Paano ka hihingi ng tulong?",
    "choices": [
      [
        "Ipaalala ang mga pabor na utang niya sa iyo.",
        0,
        "Puwedeng makaramdam siya ng pressure o sama ng loob, at hindi nito sinasagot ang priorities niya ngayon. Mas binibigyang-diin ni Greene ang present na benefit kaysa inaakalang utang na loob."
      ],
      [
        "Sabihing urgent para sa iyo at umasang maaawa siya.",
        1,
        "Baka may concern siya sa iyo, pero siya pa ang manghuhula kung bakit dapat mauna ang task mo. Mas madaling magdesisyon kung malinaw ang shared benefit."
      ],
      [
        "Ipaliwanag ang weekly work na mawawala, humingi ng dalawang oras, at mag-offer na ikaw ang bahala sa setup.",
        2,
        "Specific ang request, konkreto ang benefit, at may ambag ka rin. Practical na application ito ng Law 13."
      ]
    ]
  },
  {
    "id": 4,
    "law": 23,
    "title": "Lahat na lang, priority.",
    "setting": "Planning · Focus",
    "text": "May apat na exciting project ideas ang maliit ninyong team, pero isa lang ang kaya ninyong tapusin ngayong buwan. May isang tumutugon sa paulit-ulit na customer problem; promising pero untested ang iba. Ano ang pipiliin mo?",
    "choices": [
      [
        "Simulan lahat para walang ma-miss na opportunity.",
        0,
        "Hahati ang limitado ninyong capacity at dadami ang coordination work. Baka walang matapos nang maayos—ito ang dilution na binabalaan ng Law 23."
      ],
      [
        "Tapusin ang validated na customer project at mag-set ng review para sa iba.",
        2,
        "May malinaw kayong resultang matatapos, habang may pagkakataon pa ring balikan ang ibang ideas. Hindi ibig sabihin ng focus na kalimutan na ang alternatives."
      ],
      [
        "Gawin kung alin ang pinaka-interesting sa araw na iyon.",
        0,
        "Nagiging reactive ang direction ninyo. Nawawala ang tuloy-tuloy na effort na kailangan para maging actual result ang magandang idea."
      ]
    ]
  },
  {
    "id": 5,
    "law": 29,
    "title": "Ready na ang launch. Sigurado ba?",
    "setting": "Planning · Consequences",
    "text": "Mas maraming users kaysa expected ang sumali sa pilot. Gusto ng team na mag-full launch bukas, pero wala pang plano para sa support o kung lumampas sa capacity ang demand. Ano ang gagawin mo?",
    "choices": [
      [
        "Linawin muna ang capacity limits, support owner, at kung kailan dapat mag-pause bago palawakin.",
        2,
        "Pinag-isipan mo ang kasunod ng unang win. Sa Law 29, kasama sa plano ang obstacles, consequences, at exit conditions."
      ],
      [
        "Mag-launch agad at saka na ayusin ang problems.",
        0,
        "Useful ang momentum, pero puwedeng gawing failure ng unplanned support work ang unang success. Kailangan ding paghandaan ang next stage."
      ],
      [
        "Maghintay hanggang wala nang anumang uncertainty.",
        1,
        "Nakikita mo ang risk, pero hindi realistic ang zero uncertainty. Mas actionable ang staged expansion na may malinaw na limits."
      ]
    ]
  },
  {
    "id": 6,
    "law": 35,
    "title": "Kailangan ng tamang timing ang proposal.",
    "setting": "Workplace · Timing",
    "text": "Gusto mo ng budget para sa bagong internal tool. Magbubukas ang annual planning sa loob ng dalawang linggo. Sa ngayon, may service incident at nakatutok sa recovery ang budget owner. Ano ang approach mo?",
    "choices": [
      [
        "Ipasok ang buong funding pitch sa incident meeting.",
        0,
        "Nasa ibang problema ang attention nila. Puwedeng ma-reject ang magandang idea dahil wala pang space para pag-isipan ito nang maayos."
      ],
      [
        "Maghintay lang hanggang may magtanong tungkol sa idea.",
        1,
        "Naiwasan mo ang bad timing, pero umaasa ka na lang sa chance. Mas useful ang patience kung may preparation at specific na next step."
      ],
      [
        "Ihanda ang ebidensya ngayon at mag-book ng short review bago ang planning deadline.",
        2,
        "Naitapat mo ang preparation sa actual decision window. Ang Law 35 ay tungkol sa pagkilala at paggamit ng tamang moment, hindi basta paghihintay."
      ]
    ]
  },
  {
    "id": 7,
    "law": 39,
    "title": "May gustong magpa-react sa iyo.",
    "setting": "Conflict · Composure",
    "text": "Sa discussion, may colleague na nagparinig tungkol sa competence mo. Dapat ang pinag-uusapan ay kung aling delivery plan ang feasible. Anong response ang mas makakaprotekta sa objective mo?",
    "choices": [
      [
        "Sagutin siya ng personal na insulto rin.",
        0,
        "Mapupunta ang usapan sa insultuhan at mas madali niyang makokontrol ang reaction mo. Lalayo ang grupo sa actual decision."
      ],
      [
        "Mag-pause, itanong kung aling specific assumption ang kinukuwestiyon niya, at bumalik sa ebidensya.",
        2,
        "Hindi mo hinayaang ang pang-aasar ang magdikta ng discussion. Defensive application ito ng Law 39 tungkol sa emotion at judgment."
      ],
      [
        "Sumang-ayon sa insulto para matapos na ang tension.",
        1,
        "Baka kumalma ang moment, pero puwedeng humina ang discussion kung tatanggap ka ng maling premise. Mas useful ang kalmadong paghingi ng specifics."
      ]
    ]
  },
  {
    "id": 8,
    "law": 43,
    "title": "Pumayag sila, pero hindi kumikilos.",
    "setting": "Leadership · Buy-in",
    "text": "Pumayag ang team sa bagong workflow sa meeting, pero hindi nila ginagamit. Nalaman mong takot silang mawalan ng discretion at ma-measure nang unfair. Ano ang pinakamagandang next move?",
    "choices": [
      [
        "Pakinggan ang concerns at gumawa ng maliit na pilot na may malinaw at fair na measures.",
        2,
        "Na-address mo ang dahilan ng resistance at may role sila sa solution. Iniuugnay ng Law 43 ang matibay na support sa interests at emotions ng tao."
      ],
      [
        "Sabihing final na ang agreement at kailangan lang nilang sumunod.",
        0,
        "Baka magkaroon ng temporary compliance, pero nandiyan pa rin ang concern at puwedeng lumabas sa ibang paraan."
      ],
      [
        "Mag-offer ng reward nang hindi pinag-uusapan ang concerns.",
        1,
        "Puwedeng dumami ang sasali sa simula. Pero hindi nito nasasagot ang takot nilang ma-treat nang unfair, na siyang humaharang sa trust."
      ]
    ]
  },
  {
    "id": 9,
    "law": 45,
    "title": "Ikaw ang bagong team leader.",
    "setting": "Leadership · Change",
    "text": "Sa first week mo, may napansin kang inefficient na routines. Proud ang team sa past work nila at wary sila sa outsiders. May room para mag-experiment, at wala namang urgent crisis na kailangan ng total overhaul. Ano ang gagawin mo?",
    "choices": [
      [
        "Palitan agad ang lahat ng routines para ma-establish ang authority mo.",
        0,
        "Humihingi ka ng malaking adjustment bago ka pa magkaroon ng trust. Sa Law 45, puwedeng magkaisa ang mga tao laban sa sobrang bilis na reform."
      ],
      [
        "Ipangakong wala kang babaguhin kahit ano.",
        1,
        "Nakapagbigay ka ng reassurance, pero hindi maaayos ang totoong problems. Puwedeng pagsabayin ang continuity at improvement."
      ],
      [
        "Alamin muna kung bakit may ganoong routines, tapos mag-pilot ng isang useful improvement kasama ang team.",
        2,
        "May continuity at may ebidensya mula sa maliit na change. Akma ito sa Law 45 sa sitwasyong ibinigay: walang crisis at hindi pa established ang trust."
      ]
    ]
  },
  {
    "id": 10,
    "law": 47,
    "title": "Nakuha mo na ang agreement na gusto mo.",
    "setting": "Negotiation · Restraint",
    "text": "Pumayag ang partner sa terms na itinuring mong good outcome bago pa ang meeting. Gusto mo pang humingi ng extra concession dahil maayos naman ang takbo ng negotiation. Ano ang decision mo?",
    "choices": [
      [
        "Humingi pa dahil nasa iyo ang momentum.",
        0,
        "Puwedeng mabuksan ulit ang agreement at masira ang trust dahil sa huling demand na hindi naman kailangan. Hindi nawawala ang risk ng overreach pagkatapos manalo."
      ],
      [
        "Kumpirmahin ang agreed terms at i-close ang usapan; hiwalay na i-review ang future opportunities.",
        2,
        "Sinunod mo ang goal na pinili bago ka na-excite sa panalo. Ang Law 47 ay tungkol sa pag-alam kung kailan sapat na ang useful na victory."
      ],
      [
        "Tanggapin verbally pero huwag nang isulat ang details.",
        1,
        "Tama ang pag-stop, pero puwedeng masira later ang result dahil sa kalabuan. Kasama sa pag-secure ng agreement ang pag-confirm ng details."
      ]
    ]
  },
  {
    "id": 11,
    "law": 2,
    "title": "Kaibigan mo o dating rival?",
    "setting": "Teamwork · Choosing partners",
    "text": "Kailangan mo ng co-lead para sa high-stakes project. Close friend mo ang unang volunteer pero madalas siyang late. Ang dating rival mo naman ay consistent at malinaw kausap, kahit hindi pa kayo close. Paano ka pipili?",
    "choices": [
      [
        "Piliin agad ang kaibigan dahil mas komportable kayong mag-usap.",
        0,
        "Mahalaga ang comfort, pero hindi nito nasasagot ang reliability na kailangan ng project. Puwedeng madamay pati friendship kapag hindi malinaw ang expectations."
      ],
      [
        "Piliin ang dating rival para lang mapatunayan na wala kang kinikilingan.",
        1,
        "Posibleng tama ang tao pero mali ang dahilan. Ang symbolic na pagpili ay hindi kapalit ng pag-check sa skills, commitment, at working agreement."
      ],
      [
        "I-compare ang track record, capacity, at commitment nila; piliin ang best fit at ilagay sa sulat ang roles.",
        2,
        "Ginamit mo ang ebidensya kaysa closeness o history lang. Practical na lens ito ng Law 2: piliin ang collaborator ayon sa actual na behavior at aligned interests."
      ]
    ]
  },
  {
    "id": 12,
    "law": 4,
    "title": "Humihina na ang punto sa dami ng paliwanag.",
    "setting": "Communication · Executive update",
    "text": "May limang minuto ka para i-update ang leadership tungkol sa delayed project. Kumpleto ang analysis mo pero isang decision lang ang kailangan nila ngayon. Ano ang sasabihin mo?",
    "choices": [
      [
        "Ikuwento ang buong timeline para makita nilang pinag-isipan mo lahat.",
        0,
        "Makikita ang effort mo pero baka matabunan ang decision sa detalye. Kapag limitado ang attention, ang sobrang context ay puwedeng maging ingay."
      ],
      [
        "Sabihin ang delay, pangunahing dahilan, rekomendasyon, at eksaktong decision na kailangan—saka sagutin ang tanong nila.",
        2,
        "Malinaw ang essential facts at may space silang magtanong. Ito ang useful side ng Law 4: concise pero hindi kulang sa impormasyong kailangan sa decision."
      ],
      [
        "Sabihing may delay pero huwag magbigay ng dahilan hangga't hindi hinihingi.",
        1,
        "Maikli ito, pero maaaring masyadong malabo para makapagdesisyon sila. Ang brevity ay hindi pagtatago ng material facts."
      ]
    ]
  },
  {
    "id": 13,
    "law": 5,
    "title": "May kumakalat na maling kuwento tungkol sa iyo.",
    "setting": "Career · Reputation",
    "text": "May nagsasabing ikaw ang dahilan ng missed deadline, pero nasa project record na dalawang linggo kang nag-flag ng dependency. May isang maliit na delay ka ring talagang kasalanan. Ano ang gagawin mo?",
    "choices": [
      [
        "I-post ang project record, linawin ang dependency, at akuin nang diretso ang maliit na delay mo.",
        2,
        "Pinrotektahan mo ang reputation gamit ang facts habang hindi umiiwas sa tunay mong accountability. Mas credible ang correction dahil hindi mo binura ang sarili mong pagkukulang."
      ],
      [
        "Hayaan na lang; alam naman ng close teammates mo ang totoo.",
        1,
        "Maaaring mawala ang tsismis, pero puwede ring manatili ang maling record sa mga taong gumagawa ng decisions. Hindi lahat ng issue ay dapat patulan, pero material ito sa work mo."
      ],
      [
        "Sisihin nang buo ang kabilang team at huwag banggitin ang delay mo.",
        0,
        "Makakagawa ka ng counterattack pero mahina ito kapag lumabas ang omitted fact. Ang pagtatanggol sa image na walang accountability ay puwedeng makasira lalo sa tiwala."
      ]
    ]
  },
  {
    "id": 14,
    "law": 6,
    "title": "Maganda ang trabaho mo, pero walang nakakaalam.",
    "setting": "Career · Visibility",
    "text": "Nakabawas ng walong oras kada linggo ang automation na ginawa mo, pero ang nakikita lang ng ibang leaders ay ang final dashboard. Review season na sa susunod na buwan. Ano ang move mo?",
    "choices": [
      [
        "Maghintay na lang na may makapansin; sapat dapat ang good work.",
        1,
        "May integrity ang tahimik na delivery, pero hindi automatic na nakikita ng decision-makers ang impact. Kailangan pa ring gawing legible ang value."
      ],
      [
        "Gumawa ng maikling before-and-after case study, ilagay ang metrics, at kilalanin ang tumulong.",
        2,
        "Naging visible ang resulta nang hindi ginagawang spectacle ang sarili. Ang attention ay nakatali sa tunay na value at tamang credit."
      ],
      [
        "I-announce araw-araw na ikaw ang gumawa ng pinakamahalagang tool ng team.",
        0,
        "Mapapansin ka, pero posibleng mas maalala ang self-promotion kaysa actual impact. Hindi lahat ng attention ay nakakatulong sa reputation."
      ]
    ]
  },
  {
    "id": 15,
    "law": 8,
    "title": "Paulit-ulit kang humahabol sa potential client.",
    "setting": "Freelance · Positioning",
    "text": "Tatlong beses nang na-reschedule ng prospect ang vague na discovery call. Alam mong common sa industry nila ang isang costly reporting problem na kaya mong i-diagnose. Ano ang susunod mong gagawin?",
    "choices": [
      [
        "Magpadala araw-araw ng follow-up hanggang sumagot sila.",
        0,
        "Baka makakuha ka ng reply dahil sa pressure, pero lalo mong ipinapakitang wala kang control sa oras at setup. Hindi rin nagiging mas malinaw ang value ng meeting."
      ],
      [
        "Itigil lahat ng contact nang walang paliwanag.",
        1,
        "Naprotektahan mo ang oras mo, pero isinara mo rin ang opportunity bago subukang baguhin ang vague na setup."
      ],
      [
        "Mag-offer ng 20-minute reporting audit na may malinaw na output at dalawang available schedule.",
        2,
        "May dahilan na silang lumapit at malinaw ang next step. Ginamit mo ang Law 8 sa pamamagitan ng tunay na value, hindi pekeng bait."
      ]
    ]
  },
  {
    "id": 16,
    "law": 12,
    "title": "Sobrang generous ng bagong vendor.",
    "setting": "Business · Due diligence",
    "text": "Nagbigay ang vendor ng libreng setup at candid na umamin sa isang minor limitation. Kapalit nito, gusto nilang pumirma ka ngayong araw sa one-year contract na hindi pa nababasa ng legal. Ano ang response mo?",
    "choices": [
      [
        "Pumirma dahil napatunayan na ng honesty at free setup na trustworthy sila.",
        0,
        "Ang isang honest gesture ay magandang signal pero hindi ebidensya para sa lahat ng terms. Ang urgency ay lalo pang dahilan para basahin ang buong agreement."
      ],
      [
        "Pasalamatan sila, i-document ang offer, at ipa-review pa rin ang contract bago mag-commit.",
        2,
        "Tinanggap mo ang gesture nang hindi isinusuko ang due diligence. Ito ang defensive lesson ng Law 12: huwag hayaang palitan ng isang magandang signal ang buong pagsusuri."
      ],
      [
        "I-reject agad dahil siguradong manipulation ang kahit anong libreng offer.",
        1,
        "Protektado ka sa risk pero baka isara mo ang useful deal base rin sa assumption. Ang tamang sagot ay verification, hindi automatic trust o automatic suspicion."
      ]
    ]
  },
  {
    "id": 17,
    "law": 16,
    "title": "Lagi kang available—at nauubos ang focus mo.",
    "setting": "Work · Boundaries",
    "text": "Ikaw ang subject-matter expert at halos bawat chat ay sinasagot mo agad. Dumami ang interruptions, bumagal ang deep work, at nasanay ang team na hindi muna maghanap ng sagot. Ano ang babaguhin mo?",
    "choices": [
      [
        "Magtakda ng office hours, gumawa ng FAQ, at mag-iwan ng emergency channel.",
        2,
        "Mas intentional na ang availability mo habang reliable pa rin sa urgent work. Ang absence dito ay structured focus, hindi pagkawala sa responsibilities."
      ],
      [
        "I-mute lahat ng messages nang isang linggo nang walang abiso.",
        0,
        "Makakakuha ka ng focus pero mawawala ang predictability at tiwala ng team. Ang scarcity na walang malinaw na boundary ay mukhang unreliability."
      ],
      [
        "Ipagpatuloy ang instant replies pero magtrabaho na lang nang mas mahaba.",
        1,
        "Nananatili kang helpful ngayon, pero hindi sustainable at walang natututuhang independence ang team. Hindi oras lang ang problema; system din."
      ]
    ]
  },
  {
    "id": 18,
    "law": 18,
    "title": "Iisang adviser lang ang naririnig mo.",
    "setting": "Leadership · Information",
    "text": "Remote ang team mo at isang senior lead ang laging nagbibigay ng updates. Maayos ang reports niya, pero may signs na iba ang experience ng frontline staff. Ano ang gagawin mo?",
    "choices": [
      [
        "Magtiwala lang sa senior lead para malinaw ang chain of command.",
        0,
        "Simple ang information flow pero vulnerable ka sa iisang lens. Kahit mahusay ang adviser, may blind spots ang isolation."
      ],
      [
        "Magbukas ng regular listening sessions at anonymous channel habang malinaw pa rin ang role ng senior lead.",
        2,
        "Pinalawak mo ang sources nang hindi binubura ang accountability structure. Ito ang practical warning ng Law 18 laban sa information fortress."
      ],
      [
        "Kausapin nang palihim ang lahat at itago ito sa senior lead.",
        1,
        "Makakakuha ka ng ibang impormasyon pero gagawa ka rin ng distrust. Puwedeng maging transparent ang listening system at hindi personal na imbestigasyon."
      ]
    ]
  },
  {
    "id": 19,
    "law": 19,
    "title": "Pareho ang feedback, iba ang taong tatanggap.",
    "setting": "Client work · Stakeholders",
    "text": "Kailangan mong sabihing hindi feasible ang request ng influential client sponsor. Kilala siyang mabilis mapahiya kapag kino-correct sa malaking meeting, pero receptive sa evidence sa one-on-one. Ano ang approach mo?",
    "choices": [
      [
        "I-correct siya sa all-hands para walang duda kung sino ang tama.",
        0,
        "Publicly clear ang position mo pero tinaasan mo ang status cost ng pagbabago niya ng isip. Ang format ay puwedeng maging mas malaking problema kaysa facts."
      ],
      [
        "I-approve ang request kahit infeasible para hindi siya ma-offend.",
        1,
        "Naiwasan mo ang immediate tension pero gumawa ka ng mas malaking delivery problem. Ang pag-intindi sa tao ay hindi pagsuko sa professional judgment."
      ],
      [
        "Mag-one-on-one muna, ipakita ang constraints, at dalhin sa meeting ang options na pareho ninyong na-review.",
        2,
        "Inangkop mo ang delivery sa tao habang nananatiling totoo ang impormasyon. Ang Law 19 ay context, hindi special treatment na walang boundaries."
      ]
    ]
  },
  {
    "id": 20,
    "law": 20,
    "title": "Pinipilit kang pumili ng kampo nang maaga.",
    "setting": "Community · Competing proposals",
    "text": "May dalawang grupo na may magkaibang proposal para sa community fund. Pareho silang humihingi ng public endorsement bago mailabas ang budget at feasibility details. Ano ang gagawin mo?",
    "choices": [
      [
        "Sabihing magre-review ka kapag kumpleto na ang criteria at data, at magtakda ng petsa para sa decision.",
        2,
        "Pinrotektahan mo ang independence habang malinaw na hindi ka iiwas sa commitment habambuhay. May process at deadline ang paghihintay mo."
      ],
      [
        "I-endorse pareho kahit hindi puwedeng pondohan pareho.",
        0,
        "Mukhang neutral sa simula pero hindi credible ang mutually incompatible promises. Mawawala ang tiwala kapag kailangan nang pumili."
      ],
      [
        "Tumangging magbigay ng kahit anong sagot kahit kumpleto na ang impormasyon.",
        1,
        "Napanatili mo ang options pero hindi na ito useful independence. Kapag oras na ng decision, ang walang commitment ay nagiging unreliability."
      ]
    ]
  },
  {
    "id": 21,
    "law": 22,
    "title": "Hindi mo kayang manalo sa direct fight ngayon.",
    "setting": "Startup · Resource constraints",
    "text": "Mas malaking competitor ang nag-price cut sa market. Kaunti ang runway mo at hindi mo kayang tapatan ang presyo nang anim na buwan. May loyal niche na pinahahalagahan ang specialized support mo. Ano ang move?",
    "choices": [
      [
        "Tapatan agad ang price cut kahit maubos ang runway.",
        0,
        "Nakipaglaban ka sa field kung saan pinakamalakas ang competitor. Ang symbolic resistance ay puwedeng maubos ang resources bago gumana ang advantage mo."
      ],
      [
        "Umatras sa broad market, protektahan ang niche, at gamitin ang oras para palalimin ang specialized offer.",
        2,
        "Ang tactical retreat ay nagligtas ng oras at resources habang binabago mo ang battlefield. Hindi ito permanenteng pagsuko sa objective."
      ],
      [
        "Isara agad ang business dahil may mas malaking competitor.",
        1,
        "Iniwasan mo ang costly fight pero isinuko mo pati ang niche advantage na puwede pang protektahan. May pagitan ang retreat at total exit."
      ]
    ]
  },
  {
    "id": 22,
    "law": 24,
    "title": "May idea kang kokontra sa room.",
    "setting": "Leadership · Diplomacy",
    "text": "Sa strategy meeting, enthusiastic ang executives sa proposal. May data kang nagpapakitang delikado ang isang assumption, pero hindi mo kailangang sirain ang buong direction para ma-test ito. Paano ka kokontra?",
    "choices": [
      [
        "Sabihing reckless ang proposal at mali ang lahat ng sumusuporta rito.",
        0,
        "Nailabas mo ang concern pero tinaasan mo ang social cost ng pakikinig sa iyo. Baka depensahan nila ang status imbes na suriin ang assumption."
      ],
      [
        "Manahimik at hintaying mag-fail ang proposal.",
        1,
        "Hindi ka nakabangga pero hindi mo rin ginampanan ang responsibilidad mong magbigay ng material evidence. Diplomacy ay hindi passive compliance."
      ],
      [
        "Kilalanin ang objective, ipakita ang risky assumption, at mag-propose ng maliit na test bago ang full commitment.",
        2,
        "Napanatili mo ang dignity ng room at nailipat ang disagreement sa testable question. Ito ang skilled diplomacy na inilalarawan ng Law 24."
      ]
    ]
  },
  {
    "id": 23,
    "law": 25,
    "title": "Nakakahon ka na sa lumang role.",
    "setting": "Career · Reinvention",
    "text": "Kilala ka bilang reliable support person, pero gusto mong lumipat sa product strategy. May chance kang manguna sa maliit na research project na magiging ebidensya ng bagong direction. Ano ang gagawin mo?",
    "choices": [
      [
        "Tanggapin ang project, linawin ang strategic ownership, at gumawa ng visible na output na tugma sa role na gusto mo.",
        2,
        "Hindi ka lang nag-announce ng bagong identity; gumawa ka ng evidence para rito. Ang reinvention ay mas credible kapag may consistent na action."
      ],
      [
        "Palitan agad ang title mo online kahit wala ka pang ginagawa sa bagong field.",
        1,
        "Nagsimula kang baguhin ang framing, pero puwedeng maging hollow kung walang bagong work o skill na susuporta rito."
      ],
      [
        "Tumanggi sa lahat ng support work ngayon para putulin ang lumang identity.",
        0,
        "Decisive ang break pero maaari mong sirain ang reputation bago mabuo ang kapalit. Puwedeng gumawa ng transition nang may continuity."
      ]
    ]
  },
  {
    "id": 24,
    "law": 26,
    "title": "May desisyong siguradong may magagalit.",
    "setting": "Management · Accountability",
    "text": "Kailangan bawasan ang scope para maabot ang legal deadline. Gusto ng ilang leaders na ipasa sa project coordinator ang announcement kahit ikaw ang final decision-maker. Ano ang gagawin mo?",
    "choices": [
      [
        "Hayaan ang coordinator ang mag-announce para malinis ang pangalan mo.",
        0,
        "Nailayo mo ang sarili sa bad news pero malinaw kung sino talaga ang may authority. Puwedeng mawala ang tiwala sa iyo at maipit ang taong walang final say."
      ],
      [
        "I-delay ang announcement hanggang wala nang puwedeng mag-object.",
        1,
        "Naiwasan mo muna ang reaction pero lumiliit ang oras ng team para mag-adjust. Ang delay ay puwedeng magpalala sa parehong conflict."
      ],
      [
        "Akuin ang decision, ipaliwanag ang constraint, at ipahawak sa coordinator ang malinaw na implementation plan.",
        2,
        "Malinis ang roles: sa iyo ang accountability, sa coordinator ang execution na may support. Hindi mo ginamit ang Law 26 bilang excuse para gawing shield ang ibang tao."
      ]
    ]
  },
  {
    "id": 25,
    "law": 31,
    "title": "Ikaw ang magse-set ng choices sa negotiation.",
    "setting": "Negotiation · Options",
    "text": "Kailangan ng client ng mas mabilis na delivery, pero hindi puwedeng sabay na fixed ang scope, deadline, at budget. Hinihintay nila ang recommendation mo. Ano ang ihaharap mo?",
    "choices": [
      [
        "Sabihin lang na imposible ang request at sila na ang mag-isip ng kapalit.",
        1,
        "Totoo ang constraint pero iniwan mong walang path ang decision. Mas useful ang boundary kapag may viable alternatives."
      ],
      [
        "Magbigay ng tatlong honest options: bawas scope, dagdag budget, o phased launch—kasama ang tradeoff ng bawat isa.",
        2,
        "Ikaw ang nag-frame ng realistic decision space habang tunay pa rin ang choice ng client. Ethical application ito ng Law 31."
      ],
      [
        "Magpakita ng tatlong option pero sadyang gawing absurd ang dalawa para mapili ang gusto mo.",
        0,
        "Makokontrol mo ang choice sa maikling panahon, pero deceptive ang setup at puwedeng masira ang trust kapag nakita ang manipulation."
      ]
    ]
  },
  {
    "id": 26,
    "law": 32,
    "title": "Mas madaling ibenta ang magandang pangako.",
    "setting": "Creator · Audience trust",
    "text": "Mas mataas ang click rate ng headline na nangangakong 'instant transformation,' pero ang program mo ay nangangailangan ng consistent na practice sa loob ng ilang linggo. Ano ang ilalabas mo?",
    "choices": [
      [
        "Gamitin ang instant claim; saka na lang ipaliwanag ang effort pagkatapos bumili.",
        0,
        "Mas attractive ang fantasy pero mismatch ito sa actual experience. Ang short-term conversion ay puwedeng maging refunds at pagkawala ng trust."
      ],
      [
        "Iwasan ang kahit anong inspiring language at ilista lang ang technical details.",
        1,
        "Tumpak pero baka hindi makita ng audience kung bakit mahalaga ang program. Hindi kailangang patayin ang aspiration para maging honest."
      ],
      [
        "Ipakita ang desirable outcome, ang realistic timeline, at ang effort na kailangan para makarating doon.",
        2,
        "Nakipag-usap ka sa aspiration nang hindi gumagawa ng pekeng shortcut. Nakuha mo ang insight ng Law 32 habang pinoprotektahan ang informed choice."
      ]
    ]
  },
  {
    "id": 27,
    "law": 33,
    "title": "Hindi gumagana ang parehong motivation sa lahat.",
    "setting": "Mentoring · Motivation",
    "text": "Mahusay ang mentee mo pero hindi niya tinatapos ang optional stretch assignments. Akala mo recognition ang gusto niya, pero sinabi niyang mas interesado siyang magkaroon ng autonomy at portfolio evidence. Ano ang next move?",
    "choices": [
      [
        "Bigyan siya ng mas maraming public praise para ma-pressure siyang mag-deliver.",
        0,
        "Ginamit mo ang assumption mo kahit sinabi na niya ang actual motivator. Puwede pang maging unwanted exposure ang praise."
      ],
      [
        "Bigyan siya ng maliit na project na siya ang magde-design at puwede niyang ilagay sa portfolio, na may malinaw na deadline.",
        2,
        "Inangkop mo ang opportunity sa tunay niyang motivation habang malinaw ang responsibility. Insight ang ginamit mo, hindi exploitation."
      ],
      [
        "Itigil lahat ng stretch work dahil hindi siya motivated.",
        1,
        "Nabawasan ang pressure pero binale-wala mo ang mas specific na signal. Baka mali lang ang incentive at format, hindi ang willingness niyang lumago."
      ]
    ]
  },
  {
    "id": 28,
    "law": 38,
    "title": "Iba ang paniniwala mo sa group norm.",
    "setting": "Social · Belonging",
    "text": "Sa professional group, normal ang pag-post ng confidential-looking client screenshots para magmukhang successful. Ayaw mong gawin iyon, pero ayaw mo ring gawing public moral battle ang bawat interaction. Ano ang approach mo?",
    "choices": [
      [
        "Gayahin ang posts para hindi ka mapag-iwanan.",
        0,
        "Nakibagay ka pero nilabag mo ang boundary na mahalaga sa iyo at posibleng privacy obligations din. Hindi lahat ng norm ay dapat sundin."
      ],
      [
        "Panatilihin ang boundary, mag-share ng anonymized case studies, at pumili ng tamang moment para ipaliwanag ang practice mo.",
        2,
        "Nakahanap ka ng socially legible na paraan nang hindi isinusuko ang principle. Ang adaptation ay nasa presentation, hindi sa ethics."
      ],
      [
        "Tawaging unethical ang buong group sa bawat post.",
        1,
        "Malinaw ang paninindigan mo pero maaaring wala nang makinig dahil adversarial ang bawat moment. May mas targeted na paraan para protektahan ang boundary at impluwensiya."
      ]
    ]
  },
  {
    "id": 29,
    "law": 40,
    "title": "Libre raw—pero ano ang tunay na kapalit?",
    "setting": "Personal finance · Offers",
    "text": "May free productivity app na humihingi ng access sa contacts, calendar, at browsing activity. May paid alternative na basic lang ang permissions at malinaw ang business model. Kailangan mo lang ng task list at reminders. Ano ang pipiliin mo?",
    "choices": [
      [
        "Piliin ang free app dahil walang lalabas na pera.",
        0,
        "Zero ang cash price pero may kapalit na data at access na hindi kailangan sa goal mo. Ang libre ay hindi awtomatikong walang cost."
      ],
      [
        "Ikumpara ang total cost at permissions; piliin ang option na tugma sa needs at privacy boundary mo.",
        2,
        "Tiningnan mo ang buong exchange imbes na sticker price lang. Ito ang practical caution ng Law 40 tungkol sa hidden obligations at tradeoffs."
      ],
      [
        "Iwasan lahat ng tools dahil may kapalit ang bawat serbisyo.",
        1,
        "Naiwasan mo ang hidden cost pero pati useful exchange ay tinanggihan mo. Ang goal ay informed tradeoff, hindi automatic rejection sa lahat ng bayad o libre."
      ]
    ]
  },
  {
    "id": 30,
    "law": 48,
    "title": "Nagbago ang conditions sa gitna ng plano.",
    "setting": "Crisis · Adaptability",
    "text": "Naka-design ang event para sa 200 onsite guests, pero dalawang araw bago ito ay nagkaroon ng transport disruption. Available ang livestream setup at puwedeng hatiin ang program. Ano ang gagawin mo?",
    "choices": [
      [
        "Ituloy nang eksakto ang original plan para ipakitang consistent ka.",
        0,
        "Consistent ang format pero hindi na ito tugma sa conditions. Ang rigidity ay puwedeng gawing failure ang commitment mo sa lumang method."
      ],
      [
        "I-cancel agad lahat kahit may viable na hybrid option.",
        1,
        "Decisive ang response at maaaring kailangan kung unsafe, pero sa ibinigay na context ay may paraan pang protektahan ang core outcome."
      ],
      [
        "Panatilihin ang core sessions, ilipat online ang iba, at magtakda ng malinaw na update channel para sa guests.",
        2,
        "Pinanatili mo ang purpose habang binabago ang form. Ito ang Law 48: adaptability na may stable na principles at malinaw na communication."
      ]
    ]
  }
];
export const quizQuestions=['Kapag may bagong challenge, ano ang una mong ginagawa?','Kapag may disagreement, anong move ang pinaka-natural sa iyo?','Kailan mo nararamdamang handa ka na?','Paano ka karaniwang nakakabuo ng influence?','Kapag hindi umuusad ang plano, saan ka unang tumitingin?','Aling contribution mo ang malamang mapansin ng katrabaho?'];
export const quizOptions=[['I-map ang goal at possible na obstacles','Intindihin ang mga taong involved','Gumawa ng maliit pero decisive na first step','Obserbahan muna ang patterns'],['Linawin ang outcome na gusto natin','Humanap ng shared interest','Mag-propose ng concrete na decision','Magtanong at makinig'],['May plano at backup options','Nakausap ko na ang key people','Na-test ko na ang unang move','Naiintindihan ko na ang context'],['Magbigay ng pinag-isipang recommendation','Bumuo ng trust at cooperation','Mag-deliver ng visible na results','I-share ang perspective na hindi napansin ng iba'],['Sa plano at assumptions nito','Sa relationships at incentives','Sa next action na puwede kong gawin','Sa impormasyong baka kulang pa'],['Pag-iisip nang advance','Diplomacy at pakikisama','Initiative at pagkilos','Matalas na observation']];
export const archetypes=[{name:'The Strategist',line:'Nakikita mo ang move pagkatapos ng kasalukuyang moment.',strengths:['Pagpaplano nang advance','Pagkilala sa tradeoffs','Pag-alala sa tunay na objective'],weaknesses:['Sobrang planning bago kumilos','Pagkapit sa outdated na assumptions'],practice:'Mag-set ng decision deadline para sa isang plano ngayong linggo.',laws:[29,23,48]},{name:'The Diplomat',line:'Naiintindihan mo kung ano ang nag-uugnay sa mga tao.',strengths:['Pagbasa sa motivations','Pagbuo ng trust','Paghahanap ng common ground'],weaknesses:['Pag-iwas sa useful na disagreement','Sobrang pag-oo para mapasaya ang iba'],practice:'Mag-practice ng isang malinaw at respectful na boundary ngayong linggo.',laws:[43,13,24]},{name:'The Initiator',line:'Nagagawa mong gawing first move ang isang possibility.',strengths:['Mabilis pero malinaw na pagdesisyon','Pagbuo ng momentum','Pagkatuto sa actual na pagkilos'],weaknesses:['Pagkilos bago malinaw ang context','Pag-overreach pagkatapos ng unang win'],practice:'Isulat ang stopping rule bago ang susunod mong malaking move.',laws:[28,47,35]},{name:'The Observer',line:'Napapansin mo ang hindi nakita ng iba.',strengths:['Maingat na pakikinig','Pagkilala sa patterns','Pagiging kalmado sa pressure'],weaknesses:['Sobrang paghihintay bago mag-contribute','Pagiging distant sa grupo'],practice:'Mag-share ng isang useful na observation bago matapos ang next meeting.',laws:[4,18,19]}];
export function scoreProfile(answers:number[]){const counts=[0,0,0,0];answers.forEach(a=>counts[a]++);const max=Math.max(...counts);const dominant=counts.indexOf(max);return {answers,counts,dominant,tied:counts.filter(n=>n===max).length>1};}
