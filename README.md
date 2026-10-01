# موقع السيرة الذاتية المصغّرة — أ. عائشة البروانية

## الملفات
- `index.html` الموقع كاملًا في صفحة واحدة (السبورة، المؤهلات، المبادرات وعدّاد الرفوف، الأبحاث، الإنجازات)
- `books.js` رابط عدّاد رفوف القرائي
- `books-counter.gs` كود العدّاد الذي يُلصق في Google Apps Script
- `.nojekyll` ملف فارغ يمنع GitHub من معالجة الموقع (اتركيه كما هو)

## الرفع على GitHub Pages
1. من حسابك على GitHub أنشئي مستودعًا جديدًا باسم مثل `aisha-cv` واجعليه Public.
2. اضغطي **Add file ← Upload files** واسحبي جميع الملفات من هذا المجلد (بما فيها `.nojekyll`).
3. اضغطي **Commit changes**.
4. من **Settings ← Pages** اختاري: Source = `Deploy from a branch`، Branch = `main` / `(root)` ثم **Save**.
5. بعد دقيقة أو دقيقتين يظهر الرابط: `https://aishaabdullh1998-ui.github.io/aisha-cv/`

## إضافة شهادة
1. ارفعي صورة الشهادة داخل مجلد `images` في المستودع (مثل `images/cert1.jpg`).
2. افتحي `index.html` وابحثي عن `const CERTS=[];` واكتبي داخلها:
   `{t:"اسم الشهادة", s:"الجهة والسنة", img:"images/cert1.jpg"},`

## ملاحظة
الخطوط تُحمَّل من الإنترنت، فتظهر بشكلها الصحيح عند فتح الموقع متصلًا.

## عدّاد رفوف القرائي (الإضافة من الموقع نفسه)
يُحفظ الرقم في Google Apps Script مجانًا، فيراه كل الزوّار، وتضيفين الكتب من الموقع بضغطة.

### التجهيز (مرة واحدة)
1. افتحي https://script.google.com واضغطي **New project**.
2. احذفي ما في المحرر والصقي محتوى ملف `books-counter.gs`، وغيّري الرمز السري في السطر `const PIN = '1234';`.
3. اضغطي **Deploy ← New deployment**، واختاري النوع **Web app**.
4. Execute as: **Me**، و Who has access: **Anyone**، ثم **Deploy** ووافقي على الأذونات.
5. انسخي رابط **Web app URL** (ينتهي بـ `/exec`).
6. في GitHub افتحي `books.js` وضعي الرابط: `window.BOOKS_API = "الرابط";` ثم **Commit changes**.

### الإضافة اليومية
- افتحي الموقع برابط ينتهي بـ `#admin`، مثل:
  `https://aishaabdullh1998-ui.github.io/aisha-cv/index.html#admin`
- يظهر تحت الرفّ زرّا **+ أضيفي كتابًا** و **− تراجع**. أول مرة يطلب الرمز السري ويحفظه في جهازك.
- الزوّار العاديون لا يرون الزرّين.
