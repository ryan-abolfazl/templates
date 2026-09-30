// Menu and content for Zaferan restaurant.

export const CATS = [
  ['starters', 'پیش‌غذا', 'salad'],
  ['kebabs', 'کباب‌ها', 'flame'],
  ['stews', 'خورش‌ها', 'soup'],
  ['classics', 'غذاهای سنتی', 'cooking-pot'],
  ['desserts', 'دسر', 'cake-slice'],
  ['drinks', 'نوشیدنی', 'coffee'],
];

export const menu = [
  { cat: 'kebabs', dish: 'koobideh', name: 'چلوکباب کوبیده', desc: 'دو سیخ کوبیده گوسفندی زغالی، برنج ایرانی زعفرانی، گوجه کبابی و کره محلی', price: 485000, tags: ['امضای سرآشپز'], spicy: false },
  { cat: 'kebabs', dish: 'joojeh', name: 'جوجه‌کباب زعفرانی', desc: 'سینه مرغ مزه‌دار شده با زعفران و لیمو، سرو با چلو و زرده تخم‌مرغ', price: 395000, tags: ['پرطرفدار'] },
  { cat: 'kebabs', dish: 'koobideh', name: 'کباب برگ ممتاز', desc: 'فیله گوساله نرم شده با پیاز و زعفران، یک سیخ برگ و یک سیخ کوبیده', price: 720000, tags: [] },
  { cat: 'stews', dish: 'ghormeh', name: 'خورش قورمه‌سبزی', desc: 'سبزی تازه سرخ‌شده، لوبیا قرمز، گوشت گوسفندی و لیمو عمانی؛ پخت آرام ۶ ساعته', price: 345000, tags: ['پرطرفدار'] },
  { cat: 'stews', dish: 'fesenjan', name: 'خورش فسنجان', desc: 'گردوی گیلان، رب انار ساوه و مرغ محلی؛ ملس و خوش‌عطر', price: 385000, tags: ['گیاهی موجود'] },
  { cat: 'stews', dish: 'ghormeh', name: 'خورش قیمه بادمجان', desc: 'لپه، گوشت، بادمجان کبابی و سیب‌زمینی خلالی، با گلاب', price: 335000, tags: [] },
  { cat: 'classics', dish: 'tahdig', name: 'ته‌چین مرغ', desc: 'ته‌چین طلایی با ماست و زعفران، زرشک و پسته', price: 365000, tags: ['امضای سرآشپز'] },
  { cat: 'classics', dish: 'ash', name: 'آش رشته', desc: 'رشته، حبوبات، سبزی تازه با کشک، نعناداغ و پیاز داغ', price: 185000, tags: ['گیاهی'] },
  { cat: 'starters', dish: 'shirazi', name: 'سالاد شیرازی', desc: 'خیار، گوجه، پیاز و نعنای خشک با آبغوره تازه', price: 95000, tags: ['گیاهی'] },
  { cat: 'starters', dish: 'ash', name: 'کشک بادمجان', desc: 'بادمجان کبابی، کشک محلی، گردو و نعناداغ، با نان سنگک', price: 165000, tags: ['گیاهی'] },
  { cat: 'desserts', dish: 'sholeh', name: 'شله‌زرد', desc: 'برنج و زعفران و گلاب قمصر، تزیین دارچین، بادام و پسته', price: 115000, tags: [] },
  { cat: 'desserts', dish: 'tahdig', name: 'فالوده شیرازی', desc: 'رشته نشاسته یخ‌زده با گلاب و آبلیمو، سرو با بستنی سنتی', price: 125000, tags: ['تابستانی'] },
  { cat: 'drinks', dish: 'chai', name: 'چای و نبات زعفرانی', desc: 'چای دارجلینگ دم‌کرده روی سماور، با نبات زعفرانی و خرما', price: 65000, tags: [] },
  { cat: 'drinks', dish: 'doogh', name: 'دوغ محلی', desc: 'دوغ گازدار با پونه و گل‌محمدی', price: 55000, tags: ['گیاهی'] },
];

export const hours = [
  ['شنبه تا چهارشنبه', '۱۲:۰۰ تا ۲۳:۳۰'],
  ['پنجشنبه و جمعه', '۱۲:۰۰ تا ۰۰:۳۰'],
  ['ناهار', '۱۲:۰۰ تا ۱۶:۰۰'],
  ['شام و موسیقی زنده', '۱۹:۰۰ تا ۲۳:۰۰'],
];
