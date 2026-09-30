// Demo catalog for Vitrin. Colors: [name, hex]. bg = backdrop tone behind the illustration.

export const COLORS = {
  ink: ['مشکی', '#1f1d1b'],
  bone: ['استخوانی', '#e9e1d3'],
  camel: ['شتری', '#b98a56'],
  clay: ['آجری', '#b5532f'],
  olive: ['زیتونی', '#6b6a45'],
  navy: ['سرمه‌ای', '#243049'],
  sage: ['مریمی', '#9aa58a'],
  rose: ['گلبهی', '#d9a296'],
  cream: ['کرم', '#efe6d2'],
  denim: ['جین', '#4d6583'],
};

export const products = [
  { id: 1, name: 'بارانی بلند کتان', cat: 'women', kind: 'coat', color: 'camel', colors: ['camel', 'ink', 'olive'], bg: '#e8dfd1', price: 7890000, old: 9900000, badge: 'جدید', rating: 4.8, reviews: 64 },
  { id: 2, name: 'پیراهن لینن آستین‌بلند', cat: 'men', kind: 'shirt', color: 'bone', colors: ['bone', 'sage', 'navy'], bg: '#d9cbb4', price: 1890000, rating: 4.7, reviews: 112 },
  { id: 3, name: 'پیراهن زنانه میدی', cat: 'women', kind: 'dress', color: 'clay', colors: ['clay', 'ink', 'rose'], bg: '#efe4d8', price: 3450000, badge: 'پرفروش', rating: 4.9, reviews: 203 },
  { id: 4, name: 'شلوار پارچه‌ای راسته', cat: 'men', kind: 'pants', color: 'olive', colors: ['olive', 'ink', 'camel'], bg: '#e6e2d6', price: 2290000, rating: 4.6, reviews: 88 },
  { id: 5, name: 'بافت یقه‌گرد پشمی', cat: 'women', kind: 'sweater', color: 'cream', colors: ['cream', 'sage', 'clay'], bg: '#c9bda8', price: 2690000, old: 3200000, rating: 4.8, reviews: 145 },
  { id: 6, name: 'کیف دستی چرم طبیعی', cat: 'accessories', kind: 'bag', color: 'clay', colors: ['clay', 'ink', 'camel'], bg: '#ebe3d6', price: 4190000, badge: 'دست‌دوز', rating: 4.9, reviews: 57 },
  { id: 7, name: 'کتانی چرم مینیمال', cat: 'men', kind: 'shoe', color: 'bone', colors: ['bone', 'ink'], bg: '#d8d3c7', price: 3890000, rating: 4.7, reviews: 176 },
  { id: 8, name: 'دامن پلیسه بلند', cat: 'women', kind: 'skirt', color: 'sage', colors: ['sage', 'ink', 'rose'], bg: '#ece6da', price: 1990000, rating: 4.5, reviews: 41 },
  { id: 9, name: 'کاپشن کوتاه جین', cat: 'men', kind: 'jacket', color: 'denim', colors: ['denim', 'ink'], bg: '#e3ddd0', price: 3290000, old: 3990000, rating: 4.6, reviews: 92 },
  { id: 10, name: 'کلاه باکت کتان', cat: 'accessories', kind: 'hat', color: 'olive', colors: ['olive', 'cream', 'ink'], bg: '#ddd4c4', price: 690000, rating: 4.4, reviews: 38 },
  { id: 11, name: 'تی‌شرت پنبه ارگانیک', cat: 'men', kind: 'tee', color: 'ink', colors: ['ink', 'bone', 'sage', 'clay'], bg: '#e9e4da', price: 890000, badge: 'پایه', rating: 4.8, reviews: 311 },
  { id: 12, name: 'شال نخی ترمه‌دار', cat: 'accessories', kind: 'scarf', color: 'rose', colors: ['rose', 'clay', 'cream'], bg: '#efe8dc', price: 1190000, rating: 4.7, reviews: 66 },
];

export const CATS = { women: 'زنانه', men: 'مردانه', accessories: 'اکسسوری' };

export const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export const journal = [
  { title: 'راهنمای لایه‌پوشی پاییزی: گرم، سبک، شیک', cat: 'استایل', date: '۶ مهر ۱۴۰۵', kind: 'coat', color: 'camel', bg: '#e8dfd1' },
  { title: 'چرا لینن بهترین پارچه برای هوای ایران است', cat: 'پارچه', date: '۲۸ شهریور ۱۴۰۵', kind: 'shirt', color: 'bone', bg: '#d9cbb4' },
  { title: 'کمد لباس کپسولی: ۱۲ تکه برای ۳۰ ترکیب', cat: 'راهنما', date: '۱۹ شهریور ۱۴۰۵', kind: 'tee', color: 'ink', bg: '#e9e4da' },
];
