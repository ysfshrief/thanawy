# Be Different · خلوة إعدادي بنين

نظام تفاعلي كامل لخلوة كنيسة رئيس الملائكة الجليل ميخائيل بدمنهور.
مبني بـ **React + Vite + TailwindCSS** مع **Firebase** كـ backend، وجاهز للنشر على **Netlify**.

---

## ✨ المميزات

- **عربي بالكامل** + دعم RTL ، تصميم **Mobile-first**.
- **الصفحة الرئيسية**: خلفية مقسومة لصورتين (طريق العالم / طريق المسيح)، شعار الخلوة في المنتصف، عدّاد تنازلي واضح، الآية، شريط "النشاط الحالي".
- **البرنامج**: تمييز النشاط الحالي تلقائياً، النشاط القادم، عدّاد للحدث القادم، شريط تقدّم لليوم.
- **الفرق**: ٣ فرق بصور قصصها، وكل صفحة فريق فيها: «أنا مين؟»، القصة كاملة (تظهر عند الضغط على "عرض القصة")، «تتعلم مني إيه؟»، «رسالتي ليك»، الأعضاء، والخدام.
- **شعارات الفرق**: مكان فارغ مخصص لكل فريق، يرفعه المشرف لاحقاً.
- **النقاط**: نظام نقاط للفرق لا يظهر إلا بعد "نشر النتائج".
- **معرض الصور**: روابط Google Drive، عرض Grid، فتح Fullscreen، تحميل.
- **الترانيم**: ٣ ترانيم أساسية مدمجة (من ملف PDF)، + إضافة ترانيم جديدة من لوحة التحكم.
- **الكلمة والدراسة**: عرض محتوى من Google Drive + تحميل.
- **لوحة تحكم المشرف**: محمية بتسجيل دخول، تتحكم في كل ما سبق.
- **يعمل بدون Firebase**: في حالة عدم ضبط Firebase، يعمل الموقع في وضع محلي (localStorage) حتى لا يتوقف أثناء الخلوة.

---

## 🔐 بيانات دخول المشرف

```
اسم المستخدم: costa
كلمة المرور:  0 10 11428739
```

الدخول من خلال زر "دخول المشرف" أسفل الموقع، أو مباشرة على `/admin`.

---

## 🚀 خطوات التشغيل المحلي

تحتاج **Node.js 18+**.

```bash
npm install
npm run dev      # تشغيل محلي على http://localhost:5173
npm run build    # بناء نسخة الإنتاج في مجلد dist/
npm run preview  # معاينة نسخة الإنتاج
```

في وضع التشغيل المحلي بدون Firebase، كل التعديلات تُحفظ على جهازك فقط.

---

## 🔥 إعداد Firebase (مهم للنشر الحي)

لكي تظهر تعديلات المشرف **للجميع مباشرة** (وليس على جهاز واحد فقط):

1. ادخل على <https://console.firebase.google.com> وأنشئ مشروع جديد.
2. من **Build → Firestore Database** اضغط **Create database** واختر وضع البدء (Production أو Test).
3. من إعدادات المشروع **⚙️ → Project settings → General**، انزل لـ **Your apps** واضغط أيقونة الويب `</>` لإنشاء Web App.
4. انسخ قيم `firebaseConfig` (apiKey, authDomain, projectId ... إلخ).
5. الصق القيم في متغيرات البيئة (انظر الخطوة التالية).
6. من تبويب **Rules** في Firestore، الصق محتوى ملف `firestore.rules` الموجود في المشروع، ثم **Publish**.

> ملاحظة أمان: القواعد الحالية تجعل البيانات قابلة للقراءة والكتابة للجميع، وهذا مقبول لخلوة قصيرة وخاصة. لو أردت حماية أقوى، استخدم Firebase Authentication.

---

## 🌐 النشر على Netlify

### الطريقة الأسهل (من GitHub)

1. ارفع المشروع على مستودع GitHub.
2. ادخل <https://app.netlify.com> → **Add new site → Import an existing project** → اختر المستودع.
3. Netlify سيقرأ ملف `netlify.toml` تلقائياً:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. قبل النشر، أضف متغيرات البيئة من **Site settings → Environment variables**:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

5. اضغط **Deploy**. خلاص! 🎉

### الطريقة اليدوية (سحب وإفلات)

```bash
npm install
npm run build
```

ثم اسحب مجلد `dist/` إلى صفحة **Deploys** في Netlify.
(في هذه الحالة أضف متغيرات Firebase قبل البناء في ملف `.env`.)

---

## 🖼️ ربط الصور والملفات من Google Drive

عند رفع أي ملف على Google Drive:

1. اضغط **مشاركة (Share)**.
2. غيّر الصلاحية إلى **Anyone with the link** (أي شخص لديه الرابط).
3. انسخ الرابط والصقه في لوحة التحكم.

الموقع يحوّل الرابط تلقائياً للعرض والتحميل، أياً كان شكله.

---

## 🗂️ بنية البيانات في Firestore

كل البيانات في collection اسمها `app`، كل مستند منها:

| المستند | المحتوى |
|---|---|
| `points` | نقاط كل فريق |
| `rankingState` | حالة نشر النتائج |
| `gallery` | صور المعرض |
| `hymns` | الترانيم المضافة |
| `bibleStudy` | دراسة الكتاب |
| `spiritualWord` | الكلمة الروحية |
| `teamLogos` | شعارات الفرق |

أما الفرق والبرنامج والترانيم الأساسية فهي ثابتة في الكود (`src/lib/seed.js`).

---

## 📁 الأصول (Assets)

- `public/assets/church-logo.png` — شعار الكنيسة (خلفية شفافة).
- `public/assets/camp-logo.png` — شعار الخلوة (خلفية شفافة).
- `public/assets/hero-left.jpg` — صورة الهيرو اليسرى (طريق العالم).
- `public/assets/hero-right.jpg` — صورة الهيرو اليمنى (طريق المسيح).
- `public/assets/team-vashti.jpg` — صورة فريق وشتي.
- `public/assets/team-joseph.jpg` — صورة فريق يوسف.
- `public/assets/team-elijah.jpg` — صورة فريق إيليا.
- `public/hymns/hymn-1..3.pdf` — الترانيم الثلاث (ملفات منفصلة).
- `public/hymns/hymn-1..3-preview.png` — معاينة كل ترنيمة.

لاستبدال أي أصل، ضع ملفاً بنفس الاسم في نفس المكان.

---

## 🛠️ تعديل المحتوى الثابت

- **الفرق / الأعضاء / القصص**: `src/lib/seed.js` → `TEAMS`
- **البرنامج الزمني**: `src/lib/seed.js` → `SCHEDULE`
- **بيانات الخلوة (التاريخ، المكان، الآية)**: `src/lib/seed.js` → `RETREAT`
- **الألوان والخطوط**: `tailwind.config.js`

---

كنيسة رئيس الملائكة الجليل ميخائيل بدمنهور
Developed & designed by **Youssef Shrief Arands**
