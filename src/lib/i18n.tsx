import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const LANGS = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
  { code: "bn", label: "বাংলা" },
  { code: "ta", label: "தமிழ்" },
] as const;
export type Lang = (typeof LANGS)[number]["code"];

type Dict = Record<string, string>;

const en: Dict = {
  nav_home: "Home", nav_map: "Live Map", nav_monitor: "Monitoring", nav_report: "Report", nav_insights: "Restoration", nav_about: "About",
  hero_tag: "Forest intelligence for Bharat",
  hero_title: "Every forest has a pulse. We help you hear it.",
  hero_sub: "VanRakshak-AI combines satellite signals, GIS mapping and community reports to show where India's forests are under stress — and where restoration should begin.",
  cta_map: "Open live map", cta_report: "Report an issue",
  stat_sites: "Forest landscapes monitored", stat_area: "km² under watch", stat_reports: "Community reports", stat_critical: "Critical priority zones",
  chain_title: "From signal to action", chain_sub: "One restoration-oriented workflow instead of scattered data layers.",
  c1: "Satellite & environmental data", c2: "Community reports", c3: "Data processing", c4: "Risk & priority analysis", c5: "GIS restoration priority",
  f_title: "Five modules. One clear view.",
  f1: "Forest Monitoring", f1d: "Track vegetation condition, fire impact and habitat degradation over time.",
  f2: "GIS Map", f2d: "Forest condition, reported issues and priority areas on an interactive map.",
  f3: "AI Analysis", f3d: "Weighted indicator logic scores degradation risk for every landscape.",
  f4: "Community Reporting", f4d: "Locals submit geo-tagged observations with photos from any phone.",
  f5: "Restoration Insights", f5d: "Ranked priority zones with practical inputs for field planning.",
  impact_title: "Built for the people who protect forests",
  i1: "Forest & local agencies", i1d: "Focus field attention on areas showing real signs of degradation.",
  i2: "NGOs & conservation groups", i2d: "Use mapped evidence to plan restoration and outreach.",
  i3: "Local communities", i3d: "Make biodiversity concerns visible and contribute local knowledge.",
  i4: "Researchers & decision-makers", i4d: "Consolidated geospatial insights for evidence-based action.",
  join_title: "Seen something in your forest?", join_sub: "Your observation takes 60 seconds and goes straight onto the priority map.",
  risk: "Risk score", priority: "Priority", critical: "Critical", high: "High", moderate: "Moderate", low: "Low",
  ndvi: "Vegetation (NDVI)", veg_loss: "Vegetation loss", fire: "Fire impact", habitat: "Habitat disturbance", community: "Community signal",
  layers: "Layers", l_sites: "Forest sites", l_reports: "Community reports", basemap: "Basemap", satellite: "Satellite", streets: "Streets",
  mon_title: "Forest monitoring", mon_sub: "Twelve-month indicator trends per landscape (representative sample data).",
  select_site: "Select landscape", fire_alerts: "Fire alerts / month", ndvi_trend: "NDVI trend",
  rep_title: "Community report", rep_sub: "Share what you observe. Location, photo and a short note are enough.",
  your_name: "Your name", issue_type: "Issue type", description: "What did you observe?", location: "Location", use_gps: "Use my location", pick_map: "or click on the map",
  photo: "Photo (optional)", severity: "Severity", submit: "Submit report", submitted: "Report submitted — thank you, VanRakshak!",
  t_deforestation: "Tree cutting / deforestation", t_fire: "Forest fire", t_wildlife: "Wildlife / biodiversity concern", t_encroachment: "Encroachment", t_dumping: "Waste dumping", t_other: "Other",
  recent: "Recent reports",
  ins_title: "Restoration priority", ins_sub: "Landscapes ranked by combined degradation risk, with recommended field actions.",
  action: "Recommended action", nearby_reports: "nearby reports",
  a_critical: "Immediate field verification, assisted natural regeneration and protection patrols.",
  a_high: "Schedule survey within 30 days; plan native-species plantation with community.",
  a_moderate: "Increase monitoring frequency; fire-line maintenance and awareness drives.",
  a_low: "Maintain routine monitoring; document as reference healthy site.",
  about_title: "About VanRakshak-AI",
  footer: "A Code4Nature (FES) prototype. Sample data is representative and will be replaced with verified datasets.",
  watch: "Watch the forest breathe",
};

const hi: Dict = {
  nav_home: "होम", nav_map: "लाइव मानचित्र", nav_monitor: "निगरानी", nav_report: "रिपोर्ट", nav_insights: "पुनर्स्थापन", nav_about: "परिचय",
  hero_tag: "भारत के लिए वन बुद्धिमत्ता",
  hero_title: "हर जंगल की एक धड़कन है। हम उसे सुनने में मदद करते हैं।",
  hero_sub: "वनरक्षक-AI उपग्रह संकेत, GIS मानचित्र और समुदाय की रिपोर्ट को जोड़कर दिखाता है कि भारत के जंगल कहाँ संकट में हैं — और पुनर्स्थापन कहाँ से शुरू हो।",
  cta_map: "लाइव मानचित्र खोलें", cta_report: "समस्या रिपोर्ट करें",
  stat_sites: "निगरानी में वन क्षेत्र", stat_area: "वर्ग किमी निगरानी में", stat_reports: "समुदाय रिपोर्ट", stat_critical: "गंभीर प्राथमिकता क्षेत्र",
  chain_title: "संकेत से कार्रवाई तक", chain_sub: "बिखरे डेटा के बजाय एक पुनर्स्थापन-केंद्रित प्रक्रिया।",
  c1: "उपग्रह व पर्यावरण डेटा", c2: "समुदाय रिपोर्ट", c3: "डेटा प्रोसेसिंग", c4: "जोखिम व प्राथमिकता विश्लेषण", c5: "GIS पुनर्स्थापन प्राथमिकता",
  f_title: "पाँच मॉड्यूल। एक स्पष्ट दृश्य।",
  f1: "वन निगरानी", f1d: "वनस्पति, आग का प्रभाव और आवास क्षरण समय के साथ ट्रैक करें।",
  f2: "GIS मानचित्र", f2d: "वन स्थिति, रिपोर्ट और प्राथमिकता क्षेत्र इंटरैक्टिव मानचित्र पर।",
  f3: "AI विश्लेषण", f3d: "भारित संकेतक हर क्षेत्र के क्षरण जोखिम का स्कोर देते हैं।",
  f4: "समुदाय रिपोर्टिंग", f4d: "स्थानीय लोग किसी भी फ़ोन से फ़ोटो सहित स्थान-आधारित अवलोकन भेजें।",
  f5: "पुनर्स्थापन अंतर्दृष्टि", f5d: "क्षेत्र योजना के लिए क्रमबद्ध प्राथमिकता क्षेत्र।",
  impact_title: "जंगल बचाने वालों के लिए बनाया गया",
  i1: "वन व स्थानीय विभाग", i1d: "वास्तविक क्षरण वाले क्षेत्रों पर ध्यान केंद्रित करें।",
  i2: "NGO व संरक्षण समूह", i2d: "पुनर्स्थापन योजना के लिए मानचित्रित साक्ष्य।",
  i3: "स्थानीय समुदाय", i3d: "जैव विविधता की चिंताएँ सामने लाएँ।",
  i4: "शोधकर्ता व निर्णयकर्ता", i4d: "साक्ष्य-आधारित निर्णय के लिए समेकित जानकारी।",
  join_title: "अपने जंगल में कुछ देखा?", join_sub: "आपकी रिपोर्ट 60 सेकंड में सीधे प्राथमिकता मानचित्र पर।",
  risk: "जोखिम स्कोर", priority: "प्राथमिकता", critical: "गंभीर", high: "उच्च", moderate: "मध्यम", low: "निम्न",
  ndvi: "वनस्पति (NDVI)", veg_loss: "वनस्पति हानि", fire: "आग का प्रभाव", habitat: "आवास व्यवधान", community: "समुदाय संकेत",
  layers: "परतें", l_sites: "वन क्षेत्र", l_reports: "समुदाय रिपोर्ट", basemap: "आधार मानचित्र", satellite: "उपग्रह", streets: "सड़कें",
  mon_title: "वन निगरानी", mon_sub: "प्रत्येक क्षेत्र के बारह महीनों के रुझान (नमूना डेटा)।",
  select_site: "क्षेत्र चुनें", fire_alerts: "आग अलर्ट / माह", ndvi_trend: "NDVI रुझान",
  rep_title: "समुदाय रिपोर्ट", rep_sub: "जो देखा वह बताएँ। स्थान, फ़ोटो और छोटा नोट पर्याप्त है।",
  your_name: "आपका नाम", issue_type: "समस्या का प्रकार", description: "आपने क्या देखा?", location: "स्थान", use_gps: "मेरा स्थान लें", pick_map: "या मानचित्र पर क्लिक करें",
  photo: "फ़ोटो (वैकल्पिक)", severity: "गंभीरता", submit: "रिपोर्ट भेजें", submitted: "रिपोर्ट भेजी गई — धन्यवाद, वनरक्षक!",
  t_deforestation: "पेड़ कटाई / वनों की कटाई", t_fire: "जंगल की आग", t_wildlife: "वन्यजीव / जैव विविधता", t_encroachment: "अतिक्रमण", t_dumping: "कचरा फेंकना", t_other: "अन्य",
  recent: "हाल की रिपोर्ट",
  ins_title: "पुनर्स्थापन प्राथमिकता", ins_sub: "संयुक्त क्षरण जोखिम के अनुसार क्रमबद्ध क्षेत्र और सुझाए गए कदम।",
  action: "सुझाया गया कदम", nearby_reports: "निकट रिपोर्ट",
  a_critical: "तुरंत क्षेत्र सत्यापन, प्राकृतिक पुनर्जनन और सुरक्षा गश्त।",
  a_high: "30 दिनों में सर्वे; समुदाय के साथ देशी प्रजातियों का रोपण।",
  a_moderate: "निगरानी बढ़ाएँ; फायर-लाइन रखरखाव और जागरूकता अभियान।",
  a_low: "नियमित निगरानी जारी रखें; स्वस्थ संदर्भ स्थल के रूप में दर्ज करें।",
  about_title: "वनरक्षक-AI के बारे में",
  footer: "Code4Nature (FES) प्रोटोटाइप। नमूना डेटा को सत्यापित डेटा से बदला जाएगा।",
  watch: "जंगल को साँस लेते देखें",
};

const mr: Dict = {
  ...en,
  nav_home: "मुख्यपृष्ठ", nav_map: "थेट नकाशा", nav_monitor: "देखरेख", nav_report: "अहवाल", nav_insights: "पुनर्संचयन", nav_about: "माहिती",
  hero_tag: "भारतासाठी वन बुद्धिमत्ता",
  hero_title: "प्रत्येक जंगलाला एक स्पंदन असते. आम्ही ते ऐकायला मदत करतो.",
  hero_sub: "वनरक्षक-AI उपग्रह संकेत, GIS नकाशे आणि समुदायाचे अहवाल एकत्र करून भारतातील जंगले कुठे धोक्यात आहेत ते दाखवते.",
  cta_map: "थेट नकाशा उघडा", cta_report: "समस्या नोंदवा",
  stat_sites: "देखरेखीखालील वनक्षेत्रे", stat_area: "चौ.किमी देखरेखीखाली", stat_reports: "समुदाय अहवाल", stat_critical: "गंभीर प्राधान्य क्षेत्रे",
  chain_title: "संकेतापासून कृतीपर्यंत", f_title: "पाच मॉड्यूल. एक स्पष्ट दृश्य.",
  f1: "वन देखरेख", f2: "GIS नकाशा", f3: "AI विश्लेषण", f4: "समुदाय अहवाल", f5: "पुनर्संचयन अंतर्दृष्टी",
  join_title: "तुमच्या जंगलात काही दिसले?", risk: "धोका गुण", priority: "प्राधान्य", critical: "गंभीर", high: "उच्च", moderate: "मध्यम", low: "कमी",
  rep_title: "समुदाय अहवाल", your_name: "तुमचे नाव", issue_type: "समस्येचा प्रकार", description: "तुम्ही काय पाहिले?", location: "स्थान", use_gps: "माझे स्थान वापरा",
  submit: "अहवाल पाठवा", submitted: "अहवाल पाठवला — धन्यवाद, वनरक्षक!", recent: "अलीकडील अहवाल",
  ins_title: "पुनर्संचयन प्राधान्य", mon_title: "वन देखरेख", select_site: "क्षेत्र निवडा", about_title: "वनरक्षक-AI विषयी", watch: "जंगलाचा श्वास पाहा",
};

const bn: Dict = {
  ...en,
  nav_home: "হোম", nav_map: "লাইভ মানচিত্র", nav_monitor: "পর্যবেক্ষণ", nav_report: "রিপোর্ট", nav_insights: "পুনরুদ্ধার", nav_about: "পরিচিতি",
  hero_tag: "ভারতের জন্য বন বুদ্ধিমত্তা",
  hero_title: "প্রতিটি বনের একটি স্পন্দন আছে। আমরা তা শুনতে সাহায্য করি।",
  hero_sub: "বনরক্ষক-AI উপগ্রহ সংকেত, GIS মানচিত্র ও সম্প্রদায়ের রিপোর্ট মিলিয়ে দেখায় ভারতের বন কোথায় বিপদে।",
  cta_map: "লাইভ মানচিত্র খুলুন", cta_report: "সমস্যা জানান",
  stat_sites: "পর্যবেক্ষিত বনাঞ্চল", stat_area: "বর্গ কিমি নজরে", stat_reports: "সম্প্রদায় রিপোর্ট", stat_critical: "গুরুতর অগ্রাধিকার অঞ্চল",
  chain_title: "সংকেত থেকে পদক্ষেপ", f_title: "পাঁচটি মডিউল। একটি স্পষ্ট দৃশ্য।",
  f1: "বন পর্যবেক্ষণ", f2: "GIS মানচিত্র", f3: "AI বিশ্লেষণ", f4: "সম্প্রদায় রিপোর্টিং", f5: "পুনরুদ্ধার অন্তর্দৃষ্টি",
  join_title: "আপনার বনে কিছু দেখেছেন?", risk: "ঝুঁকি স্কোর", priority: "অগ্রাধিকার", critical: "গুরুতর", high: "উচ্চ", moderate: "মাঝারি", low: "নিম্ন",
  rep_title: "সম্প্রদায় রিপোর্ট", your_name: "আপনার নাম", issue_type: "সমস্যার ধরন", description: "আপনি কী দেখেছেন?", location: "অবস্থান", use_gps: "আমার অবস্থান নিন",
  submit: "রিপোর্ট পাঠান", submitted: "রিপোর্ট পাঠানো হয়েছে — ধন্যবাদ!", recent: "সাম্প্রতিক রিপোর্ট",
  ins_title: "পুনরুদ্ধার অগ্রাধিকার", mon_title: "বন পর্যবেক্ষণ", select_site: "অঞ্চল বাছুন", about_title: "বনরক্ষক-AI সম্পর্কে", watch: "বনের শ্বাস দেখুন",
};

const ta: Dict = {
  ...en,
  nav_home: "முகப்பு", nav_map: "நேரடி வரைபடம்", nav_monitor: "கண்காணிப்பு", nav_report: "புகார்", nav_insights: "மீட்பு", nav_about: "பற்றி",
  hero_tag: "பாரதத்திற்கான வன நுண்ணறிவு",
  hero_title: "ஒவ்வொரு காட்டுக்கும் ஒரு துடிப்பு உண்டு. அதைக் கேட்க உதவுகிறோம்.",
  hero_sub: "வனரக்ஷக்-AI செயற்கைக்கோள் தரவு, GIS வரைபடம், சமூக புகார்களை இணைத்து இந்தியக் காடுகள் எங்கே அழுத்தத்தில் உள்ளன எனக் காட்டுகிறது.",
  cta_map: "நேரடி வரைபடம்", cta_report: "சிக்கலைப் புகாரளி",
  stat_sites: "கண்காணிக்கப்படும் காடுகள்", stat_area: "சதுர கிமீ கண்காணிப்பில்", stat_reports: "சமூக புகார்கள்", stat_critical: "முக்கிய முன்னுரிமை பகுதிகள்",
  chain_title: "சமிக்ஞையிலிருந்து செயலுக்கு", f_title: "ஐந்து தொகுதிகள். ஒரு தெளிவான பார்வை.",
  f1: "வன கண்காணிப்பு", f2: "GIS வரைபடம்", f3: "AI பகுப்பாய்வு", f4: "சமூக புகார்", f5: "மீட்பு நுண்ணறிவு",
  join_title: "உங்கள் காட்டில் ஏதாவது கண்டீர்களா?", risk: "அபாய மதிப்பெண்", priority: "முன்னுரிமை", critical: "மிக முக்கியம்", high: "உயர்", moderate: "நடுத்தர", low: "குறைவு",
  rep_title: "சமூக புகார்", your_name: "உங்கள் பெயர்", issue_type: "சிக்கல் வகை", description: "நீங்கள் என்ன கண்டீர்கள்?", location: "இடம்", use_gps: "என் இருப்பிடம்",
  submit: "புகார் அனுப்பு", submitted: "புகார் அனுப்பப்பட்டது — நன்றி!", recent: "சமீபத்திய புகார்கள்",
  ins_title: "மீட்பு முன்னுரிமை", mon_title: "வன கண்காணிப்பு", select_site: "பகுதியைத் தேர்ந்தெடு", about_title: "வனரக்ஷக்-AI பற்றி", watch: "காடு சுவாசிப்பதைப் பாருங்கள்",
};

const DICTS: Record<Lang, Dict> = { en, hi: { ...en, ...hi }, mr, bn, ta };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => en[k] ?? k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const s = localStorage.getItem("vanrakshak.lang") as Lang | null;
    if (s && s in DICTS) setLangState(s);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("vanrakshak.lang", l);
  };
  const t = (k: string) => DICTS[lang][k] ?? en[k] ?? k;
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useT = () => useContext(Ctx);
