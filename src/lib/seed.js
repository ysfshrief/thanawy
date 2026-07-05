// ──────────────────────────────────────────────────────────────
//  Initial seed content for the retreat — خلوة ثانوي بنين.
//  Teams, schedule and the 3 starter hymns are defined here.
//
//  ⚙️  لتعديل البرنامج لاحقاً: عدّل مصفوفة SCHEDULE بالأسفل فقط.
//      كل فقرة فيها: start (البداية) و end (النهاية) و title (الاسم)
//      و desc (وصف اختياري) و icon (أيقونة). أضف/احذف/رتّب بحرية.
// ──────────────────────────────────────────────────────────────

export const TEAMS = [
  {
    id: "tango",
    name: "فريق طانخو",
    nameCopt: "Ⲧⲁⲛϧⲟ",
    subtitle: "المتجددين",
    color: "#1769b0",
    accent: "#2f93e0",
    emoji: "🌊",
    image: "/assets/team-tango.jpg",
    verseRef: "",
    whoAmI: "",
    message: "",
    story: [],
    lessons: [],
    leader: "بيشوي صفوت",
    members: [
      "بيشوي صفوت",
      "يوسف سمير",
      "كيرلس إيهاب",
      "ريمون مينا",
      "فيلوباتير رضا",
      "نوفير أنطوان",
      "فيلوباتير ملاك",
      "كيرلس حنا",
      "بيتر سامح",
      "توماس هاني",
    ],
  },
  {
    id: "katsht",
    name: "فريق كات هيت",
    nameCopt: "Ⲕⲁⲧϣⲏⲧ",
    subtitle: "العاقلين",
    color: "#1d8a3a",
    accent: "#33b95a",
    emoji: "🌿",
    image: "/assets/team-katsht.jpg",
    verseRef: "",
    whoAmI: "",
    message: "",
    story: [],
    lessons: [],
    leader: "مينا حبشي",
    members: [
      "مينا حبشي",
      "كاراس أيوب",
      "كيرلس فؤاد",
      "يوسف شريف",
      "مينا عزت",
      "بولا علاء",
      "نوفير مجدي",
      "كيرلس سمير",
      "كيرلس ماجد",
      "فيلوباتير سلامة",
    ],
  },
  {
    id: "shesh",
    name: "فريق شيش",
    nameCopt: "Ϣⲏϣ",
    subtitle: "المعتدلين",
    color: "#6b2d8f",
    accent: "#9b4fc4",
    emoji: "🔥",
    image: "/assets/team-shesh.jpg",
    verseRef: "",
    whoAmI: "",
    message: "",
    story: [],
    lessons: [],
    leader: "رويس وليم",
    members: [
      "رويس وليم",
      "إبرام فرج",
      "مينا ماهر",
      "مارك سمير",
      "توماس أنطوان",
      "مارك فيكتور",
      "يوسف ملاك",
      "يوسف شاكر",
      "بافلي ماجد",
      "يوسف داود",
    ],
  },
];

// ──────────────────────────────────────────────────────────────
//  برنامج الخلوة (ديناميكي) — عدّل هنا فقط.
//  كل يوم له items، وكل فقرة: { start, end, title, desc?, icon }
//  الأوقات بنظام 24 ساعة في التخزين، وتُعرض تلقائياً 12 ساعة AM/PM.
// ──────────────────────────────────────────────────────────────
export const SCHEDULE = [
  {
    id: "day1",
    label: "اليوم الأول",
    date: "2026-07-09",
    weekday: "الخميس",
    items: [
      { start: "08:00", end: "10:00", title: "التجمع والتحرك", desc: "التجمع الساعة ٨ ص", icon: "👋" },
      { start: "10:00", end: "10:00", title: "الوصول إلى البيت", desc: "", icon: "🏠" },
      { start: "10:00", end: "11:00", title: "استلام الغرف", desc: "", icon: "🛏️" },
      { start: "11:00", end: "12:00", title: "دراسة كتاب", desc: "", icon: "📖" },
      { start: "12:00", end: "13:00", title: "لعبة المهام", desc: "", icon: "🎯" },
      { start: "13:00", end: "14:00", title: "كلمة روحية", desc: "", icon: "✝️" },
      { start: "14:00", end: "16:00", title: "بسين", desc: "حمام السباحة", icon: "🏊" },
      { start: "16:00", end: "17:00", title: "غداء", desc: "", icon: "🍽️" },
      { start: "17:00", end: "19:00", title: "ألعاب", desc: "", icon: "🎮" },
      { start: "19:00", end: "20:00", title: "تشطيف وراحة", desc: "", icon: "🧹" },
      { start: "20:00", end: "21:00", title: "صلاة النوم وخلوة", desc: "", icon: "🙏" },
      {
        start: "21:00",
        end: "23:00",
        title: "فقرات متنوعة للفرق",
        desc: "بودكاست · اللغز · المسابقة",
        icon: "🎤",
        rotation: {
          places: ["البسين", "قاعة مارمينا", "قاعة أبو سيفين"],
          slots: [
            { time: "9:00 – 9:30", teams: ["كات هيت", "طانخو", "شيش"] },
            { time: "9:30 – 10:00", teams: ["شيش", "كات هيت", "طانخو"] },
            { time: "10:00 – 10:30", teams: ["طانخو", "شيش", "كات هيت"] },
          ],
        },
      },
      { start: "23:00", end: "24:00", title: "عشاء", desc: "", icon: "🍽️" },
      { start: "24:00", end: "25:00", title: "هوس إيروف", desc: "", icon: "🎵" },
    ],
  },
  {
    id: "day2",
    label: "اليوم الثاني",
    date: "2026-07-10",
    weekday: "الجمعة",
    items: [
      { start: "07:30", end: "10:00", title: "قداس", desc: "", icon: "⛪" },
      { start: "10:00", end: "11:00", title: "فطار", desc: "", icon: "🍳" },
      { start: "11:00", end: "11:30", title: "سؤال محيّرني", desc: "", icon: "❓" },
      { start: "11:30", end: "12:30", title: "دراسة كتاب", desc: "", icon: "📖" },
      { start: "12:30", end: "13:00", title: "شاي وحاجة حلوة", desc: "", icon: "🍰" },
      { start: "13:00", end: "14:00", title: "فقرة يلا ننمو", desc: "", icon: "🌱" },
      { start: "14:00", end: "15:00", title: "كلمة روحية", desc: "", icon: "✝️" },
      { start: "15:00", end: "17:00", title: "بسين", desc: "حمام السباحة", icon: "🏊" },
      { start: "17:00", end: "18:30", title: "غداء وتشطيف", desc: "", icon: "🍽️" },
      { start: "18:30", end: "19:30", title: "خلوة وصلاة الغروب", desc: "", icon: "🌅" },
      { start: "19:30", end: "21:00", title: "فقرة الاسكتشات", desc: "", icon: "🎭" },
      { start: "21:00", end: "22:00", title: "معرض الهدايا", desc: "", icon: "🎁" },
      { start: "22:00", end: "23:00", title: "هوس إيروف", desc: "", icon: "🎵" },
      { start: "23:00", end: "24:00", title: "عشاء", desc: "", icon: "🍽️" },
      { start: "24:00", end: "26:00", title: "لعب كورة وطايرة", desc: "", icon: "⚽" },
    ],
  },
  {
    id: "day3",
    label: "اليوم الثالث",
    date: "2026-07-11",
    weekday: "السبت",
    items: [
      { start: "07:00", end: "07:30", title: "صلاة باكر", desc: "", icon: "🌄" },
      { start: "07:30", end: "09:00", title: "بسين وفطار", desc: "", icon: "🏊" },
      { start: "10:00", end: "11:00", title: "التوجّه إلى دير مارمينا", desc: "", icon: "⛪" },
    ],
  },
];

// starter hymns shipped with the build (from the split PDF)
export const SEED_HYMNS = [
  {
    id: "hymn-tande",
    title: "تنده عليا و اسكتك",
    pdf: "/hymns/hymn-1.pdf",
    preview: "/hymns/hymn-1-preview.png",
    builtin: true,
  },
  {
    id: "hymn-dayman",
    title: "دايماً بتخبيني",
    pdf: "/hymns/hymn-2.pdf",
    preview: "/hymns/hymn-2-preview.png",
    builtin: true,
  },
  {
    id: "hymn-ahdan",
    title: "بالأحضان الأبوية",
    pdf: "/hymns/hymn-3.pdf",
    preview: "/hymns/hymn-3-preview.png",
    builtin: true,
  },
];

export const RETREAT = {
  title: "خلوة ثانوي بنين",
  titleAr: "خلوة ثانوي بنين",
  subtitle: "خلوة ثانوي بنين",
  // مواعيد الخلوة
  startISO: "2026-07-09T09:00:00+02:00",
  endISO: "2026-07-11T13:00:00+02:00",
  dateLabel: "٩ – ١١ يوليو ٢٠٢٦",
  location: "بيت بينسوتير",
  locationCopt: "Ⲡⲉⲛⲥⲱⲧⲏⲣ",
  verse:
    "وَأَمَّا الآنَ فَاطْرَحُوا عَنْكُمْ أَنْتُمْ أَيْضًا الْكُلَّ: الْغَضَبَ، السَّخَطَ، الْخُبْثَ، التَّجْدِيفَ، الْكَلاَمَ الْقَبِيحَ مِنْ أَفْوَاهِكُمْ.",
  verseRef: "كولوسي ٣ : ٨",
  church: "كنيسة رئيس الملائكة الجليل ميخائيل بدمنهور",
  developer: "Youssef Shrief Arands",
};

export const ADMIN = {
  username: "abanoub",
  password: "01067873773",
};
