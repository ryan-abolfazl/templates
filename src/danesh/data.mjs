// Demo content for Danesh academy.

export const categories = [
  { key: 'web', name: 'برنامه‌نویسی وب', icon: 'code-xml', tone: 'lime', count: 64 },
  { key: 'design', name: 'طراحی UI/UX', icon: 'pen-tool', tone: 'pink', count: 38 },
  { key: 'ai', name: 'هوش مصنوعی و داده', icon: 'brain-circuit', tone: 'violet', count: 42 },
  { key: 'marketing', name: 'بازاریابی دیجیتال', icon: 'megaphone', tone: 'coral', count: 29 },
  { key: 'english', name: 'زبان انگلیسی', icon: 'languages', tone: 'sky', count: 51 },
  { key: 'business', name: 'مدیریت و کسب‌وکار', icon: 'briefcase-business', tone: 'amber', count: 33 },
  { key: 'media', name: 'عکاسی و تدوین', icon: 'clapperboard', tone: 'mint', count: 24 },
  { key: 'security', name: 'شبکه و امنیت', icon: 'shield-check', tone: 'ink', count: 19 },
];

export const instructors = [
  { slug: 'arash', name: 'آرش کاظمی', role: 'توسعه‌دهنده ارشد فرانت‌اند', tone: 'lime', students: 18400, courses: 9, rating: 4.9 },
  { slug: 'niloufar', name: 'نیلوفر رحمانی', role: 'طراح محصول', tone: 'pink', students: 12650, courses: 6, rating: 4.8 },
  { slug: 'kaveh', name: 'کاوه صدری', role: 'دانشمند داده', tone: 'violet', students: 15300, courses: 7, rating: 4.9 },
  { slug: 'mina', name: 'مینا فرهادی', role: 'مدرس زبان، IELTS 8.5', tone: 'sky', students: 22100, courses: 11, rating: 4.9 },
  { slug: 'babak', name: 'بابک نوری', role: 'مشاور بازاریابی دیجیتال', tone: 'coral', students: 9800, courses: 5, rating: 4.7 },
  { slug: 'shirin', name: 'شیرین مقدم', role: 'مربی کسب‌وکار', tone: 'amber', students: 7400, courses: 4, rating: 4.8 },
];

export const courses = [
  { id: 1, title: 'جاوااسکریپت از صفر تا حرفه‌ای', cat: 'web', level: 'مقدماتی', teacher: 0, lessons: 142, hours: 38, students: 6240, rating: 4.9, reviews: 812, price: 1890000, old: 2900000, icon: 'braces', tone: 'lime', code: 'JS-101', badge: 'پرفروش' },
  { id: 2, title: 'طراحی رابط کاربری با فیگما', cat: 'design', level: 'مقدماتی', teacher: 1, lessons: 76, hours: 21, students: 4120, rating: 4.8, reviews: 530, price: 1290000, icon: 'layout-template', tone: 'pink', code: 'UI-201' },
  { id: 3, title: 'پایتون برای علم داده و یادگیری ماشین', cat: 'ai', level: 'متوسط', teacher: 2, lessons: 118, hours: 34, students: 5310, rating: 4.9, reviews: 690, price: 2450000, old: 3200000, icon: 'brain-circuit', tone: 'violet', code: 'ML-310', badge: 'جدید' },
  { id: 4, title: 'آیلتس ۷+ در ۱۲ هفته', cat: 'english', level: 'متوسط', teacher: 3, lessons: 96, hours: 30, students: 8830, rating: 4.9, reviews: 1204, price: 1650000, icon: 'languages', tone: 'sky', code: 'EN-IELTS' },
  { id: 5, title: 'ری‌اکت و نکست‌جی‌اس پیشرفته', cat: 'web', level: 'پیشرفته', teacher: 0, lessons: 104, hours: 29, students: 3470, rating: 4.8, reviews: 402, price: 2190000, icon: 'atom', tone: 'mint', code: 'RE-401' },
  { id: 6, title: 'دیجیتال مارکتینگ و سئو کاربردی', cat: 'marketing', level: 'مقدماتی', teacher: 4, lessons: 64, hours: 18, students: 2980, rating: 4.7, reviews: 311, price: 990000, old: 1400000, icon: 'megaphone', tone: 'coral', code: 'MK-120' },
  { id: 7, title: 'مدیریت محصول: از ایده تا بازار', cat: 'business', level: 'متوسط', teacher: 5, lessons: 48, hours: 14, students: 1860, rating: 4.8, reviews: 207, price: 1450000, icon: 'rocket', tone: 'amber', code: 'PM-220' },
  { id: 8, title: 'آموزش رایگان HTML و CSS', cat: 'web', level: 'مقدماتی', teacher: 0, lessons: 40, hours: 9, students: 14200, rating: 4.8, reviews: 1890, price: 0, icon: 'code-xml', tone: 'ink', code: 'WEB-000', badge: 'رایگان' },
  { id: 9, title: 'تدوین ویدیو با پریمیر و افترافکت', cat: 'media', level: 'مقدماتی', teacher: 1, lessons: 58, hours: 17, students: 2240, rating: 4.7, reviews: 260, price: 1190000, icon: 'clapperboard', tone: 'mint', code: 'VD-150' },
  { id: 10, title: 'امنیت شبکه و تست نفوذ مقدماتی', cat: 'security', level: 'متوسط', teacher: 2, lessons: 72, hours: 23, students: 1570, rating: 4.8, reviews: 188, price: 1990000, icon: 'shield-check', tone: 'violet', code: 'SEC-230' },
  { id: 11, title: 'مکالمه انگلیسی برای محیط کار', cat: 'english', level: 'مقدماتی', teacher: 3, lessons: 60, hours: 16, students: 5020, rating: 4.9, reviews: 734, price: 890000, icon: 'message-circle', tone: 'sky', code: 'EN-WORK' },
  { id: 12, title: 'هوش مصنوعی مولد برای همه', cat: 'ai', level: 'مقدماتی', teacher: 2, lessons: 36, hours: 8, students: 9320, rating: 4.9, reviews: 1022, price: 690000, old: 990000, icon: 'sparkles', tone: 'lime', code: 'AI-GEN', badge: 'داغ' },
];

export const catOf = (key) => categories.find((c) => c.key === key);

export const syllabus = [
  { title: 'شروع کار و آشنایی با ابزارها', lessons: [['خوش آمدید! نقشه راه دوره', '۰۴:۱۲', true], ['نصب VS Code و افزونه‌ها', '۰۹:۳۵', true], ['اولین برنامه: سلام دنیا', '۱۲:۰۸'], ['کنسول مرورگر و دیباگ', '۱۴:۲۰']] },
  { title: 'مبانی زبان', lessons: [['متغیرها و انواع داده', '۱۸:۴۴'], ['عملگرها و عبارات', '۱۵:۱۰'], ['شرط‌ها و حلقه‌ها', '۲۲:۳۰'], ['تمرین: ماشین‌حساب ساده', '۲۵:۰۰']] },
  { title: 'توابع و محدوده', lessons: [['تعریف تابع و پارامترها', '۱۹:۵۵'], ['Arrow Function و this', '۲۱:۱۲'], ['Closure به زبان ساده', '۱۷:۴۰']] },
  { title: 'آرایه‌ها و آبجکت‌ها', lessons: [['متدهای کاربردی آرایه', '۲۴:۱۸'], ['Destructuring و Spread', '۱۶:۲۲'], ['پروژه: لیست کارها', '۳۸:۰۵']] },
  { title: 'DOM و رویدادها', lessons: [['انتخاب و تغییر عناصر', '۲۰:۳۰'], ['مدیریت رویدادها', '۱۸:۴۰'], ['پروژه: گالری تصاویر', '۴۲:۱۵']] },
  { title: 'برنامه‌نویسی ناهمگام', lessons: [['Promise و async/await', '۲۶:۱۰'], ['کار با Fetch API', '۲۲:۴۵'], ['پروژه پایانی: اپ آب‌وهوا', '۵۵:۳۰']] },
];

export const testimonials = [
  { name: 'پریسا نادری', role: 'فرانت‌اند دولوپر در یک استارتاپ فین‌تک', text: 'با دوره جاوااسکریپت آرش، بعد از ۵ ماه اولین کارم را پیدا کردم. پروژه‌های عملی دوره دقیقاً همان چیزی بود که در مصاحبه پرسیدند.', tone: 'lime' },
  { name: 'امید رستمی', role: 'تحلیلگر داده', text: 'توضیحات کاوه آن‌قدر ساده و دقیق است که مفاهیم یادگیری ماشین برایم شبیه داستان شد. پشتیبانی هم همیشه پاسخگو بود.', tone: 'violet' },
  { name: 'سحر ملکی', role: 'دانشجوی کارشناسی ارشد', text: 'نمره آیلتس من از ۶ به ۷٫۵ رسید. برنامه هفتگی و آزمون‌های شبیه‌سازی‌شده فوق‌العاده بودند.', tone: 'sky' },
  { name: 'حامد یزدانی', role: 'طراح محصول', text: 'دوره فیگما پر از نکته‌های واقعی از پروژه‌های تجاری بود. بالاخره فهمیدم دیزاین سیستم را چطور بسازم.', tone: 'pink' },
];

export const posts = [
  { slug: 'post', title: 'نقشه راه فرانت‌اند در ۱۴۰۵: از کجا شروع کنیم؟', cat: 'برنامه‌نویسی', date: '۵ مهر ۱۴۰۵', read: 9, tone: 'lime', icon: 'map' },
  { slug: 'post', title: '۷ عادت یادگیری که در ۳۰ روز زندگی‌تان را تغییر می‌دهد', cat: 'یادگیری', date: '۲ مهر ۱۴۰۵', read: 6, tone: 'amber', icon: 'sprout' },
  { slug: 'post', title: 'هوش مصنوعی شغل برنامه‌نویس‌ها را می‌گیرد؟', cat: 'هوش مصنوعی', date: '۲۸ شهریور ۱۴۰۵', read: 11, tone: 'violet', icon: 'bot' },
  { slug: 'post', title: 'راهنمای کامل ساخت رزومه برای اولین شغل', cat: 'بازار کار', date: '۲۴ شهریور ۱۴۰۵', read: 8, tone: 'coral', icon: 'file-user' },
  { slug: 'post', title: 'چطور در آزمون آیلتس Writing نمره ۷ بگیریم', cat: 'زبان', date: '۲۰ شهریور ۱۴۰۵', read: 12, tone: 'sky', icon: 'pen-line' },
  { slug: 'post', title: 'اصول رنگ در طراحی رابط کاربری', cat: 'طراحی', date: '۱۵ شهریور ۱۴۰۵', read: 7, tone: 'pink', icon: 'palette' },
];
