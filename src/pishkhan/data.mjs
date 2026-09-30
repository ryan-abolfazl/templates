// Demo content for Pishkhan. Replace with your own data or render from your backend.

export const customers = [
  { name: 'علی رضایی', email: 'ali.rezaei@gmail.com', city: 'تهران', phone: '۰۹۱۲ ۴۵۶ ۷۸۹۰', orders: 18, spent: 42850000, joined: '۱۲ فروردین ۱۴۰۴', tier: 'vip' },
  { name: 'مریم احمدی', email: 'maryam.ahmadi@yahoo.com', city: 'اصفهان', phone: '۰۹۱۳ ۲۲۱ ۴۵۶۷', orders: 11, spent: 23600000, joined: '۳ اردیبهشت ۱۴۰۴', tier: 'gold' },
  { name: 'رضا کریمی', email: 'reza.karimi@outlook.com', city: 'شیراز', phone: '۰۹۱۷ ۸۸۰ ۱۲۳۴', orders: 7, spent: 11240000, joined: '۲۰ خرداد ۱۴۰۴', tier: 'silver' },
  { name: 'زهرا حسینی', email: 'zahra.hosseini@gmail.com', city: 'مشهد', phone: '۰۹۱۵ ۳۳۴ ۹۸۷۶', orders: 24, spent: 61900000, joined: '۵ دی ۱۴۰۳', tier: 'vip' },
  { name: 'امیر نوروزی', email: 'amir.nowruzi@gmail.com', city: 'تبریز', phone: '۰۹۱۴ ۵۶۷ ۱۱۲۲', orders: 3, spent: 4380000, joined: '۲ مرداد ۱۴۰۴', tier: 'new' },
  { name: 'نگار صادقی', email: 'negar.sadeghi@gmail.com', city: 'کرج', phone: '۰۹۱۲ ۹۹۰ ۳۳۴۴', orders: 9, spent: 15720000, joined: '۱۸ بهمن ۱۴۰۳', tier: 'gold' },
  { name: 'حسین مرادی', email: 'hossein.moradi@yahoo.com', city: 'اهواز', phone: '۰۹۱۶ ۲۱۰ ۵۵۶۶', orders: 5, spent: 7650000, joined: '۹ تیر ۱۴۰۴', tier: 'silver' },
  { name: 'فاطمه جعفری', email: 'fatemeh.jafari@gmail.com', city: 'قم', phone: '۰۹۱۹ ۱۲۳ ۴۴۵۵', orders: 14, spent: 28300000, joined: '۲۷ آبان ۱۴۰۳', tier: 'gold' },
  { name: 'محمد شریفی', email: 'm.sharifi@outlook.com', city: 'رشت', phone: '۰۹۱۱ ۸۷۶ ۵۴۳۲', orders: 2, spent: 2190000, joined: '۱ شهریور ۱۴۰۴', tier: 'new' },
  { name: 'سمیرا قاسمی', email: 'samira.ghasemi@gmail.com', city: 'یزد', phone: '۰۹۱۳ ۶۵۴ ۷۸۹۰', orders: 16, spent: 33480000, joined: '۱۴ مهر ۱۴۰۳', tier: 'vip' },
  { name: 'پویا عباسی', email: 'pouya.abbasi@gmail.com', city: 'کرمان', phone: '۰۹۱۳ ۴۴۵ ۶۶۷۷', orders: 6, spent: 9120000, joined: '۲۲ فروردین ۱۴۰۴', tier: 'silver' },
  { name: 'الهام رحیمی', email: 'elham.rahimi@yahoo.com', city: 'همدان', phone: '۰۹۱۸ ۳۲۱ ۰۹۸۷', orders: 4, spent: 5540000, joined: '۷ خرداد ۱۴۰۴', tier: 'new' },
];

export const TIERS = {
  vip: ['ویژه', 't-accent'],
  gold: ['طلایی', 't-warning'],
  silver: ['نقره‌ای', 't-info'],
  new: ['جدید', 't-success'],
};

export const products = [
  { name: 'هدفون بی‌سیم نوا', sku: 'NV-210', cat: 'صوتی', price: 3890000, stock: 3, sold: 412, icon: 'headphones', tone: 't-primary', rating: 4.8 },
  { name: 'ساعت هوشمند آرکا', sku: 'AR-S5', cat: 'پوشیدنی', price: 6450000, stock: 28, sold: 356, icon: 'watch', tone: 't-accent', rating: 4.6 },
  { name: 'اسپیکر همراه طنین', sku: 'TN-90', cat: 'صوتی', price: 2150000, stock: 64, sold: 298, icon: 'speaker', tone: 't-success', rating: 4.5 },
  { name: 'دوربین ورزشی پرواز', sku: 'PV-4K', cat: 'دوربین', price: 9800000, stock: 12, sold: 187, icon: 'camera', tone: 't-warning', rating: 4.7 },
  { name: 'لپ‌تاپ سبک آسمان ۱۴', sku: 'AS-14', cat: 'کامپیوتر', price: 48500000, stock: 7, sold: 96, icon: 'laptop', tone: 't-info', rating: 4.9 },
  { name: 'کیبورد مکانیکی کلید', sku: 'KL-87', cat: 'لوازم جانبی', price: 3250000, stock: 41, sold: 233, icon: 'keyboard', tone: 't-primary', rating: 4.4 },
  { name: 'ماوس بی‌صدا نسیم', sku: 'NS-M2', cat: 'لوازم جانبی', price: 890000, stock: 0, sold: 541, icon: 'mouse', tone: 't-success', rating: 4.3 },
  { name: 'پاوربانک ۲۰ هزار نیرو', sku: 'NR-20', cat: 'شارژ', price: 1450000, stock: 88, sold: 620, icon: 'battery-charging', tone: 't-warning', rating: 4.6 },
  { name: 'گوشی هوشمند پارس X', sku: 'PX-12', cat: 'موبایل', price: 27900000, stock: 15, sold: 144, icon: 'smartphone', tone: 't-accent', rating: 4.7 },
  { name: 'تبلت آموزشی دانا', sku: 'DN-T8', cat: 'تبلت', price: 12300000, stock: 22, sold: 118, icon: 'tablet', tone: 't-info', rating: 4.5 },
  { name: 'میکروفون استودیو صدا', sku: 'SD-MC', cat: 'صوتی', price: 4750000, stock: 9, sold: 77, icon: 'mic', tone: 't-danger', rating: 4.8 },
  { name: 'مانیتور ۲۷ اینچ افق', sku: 'OF-27', cat: 'کامپیوتر', price: 18900000, stock: 5, sold: 63, icon: 'monitor', tone: 't-primary', rating: 4.6 },
];

const days = ['۸ مهر ۱۴۰۵', '۸ مهر ۱۴۰۵', '۷ مهر ۱۴۰۵', '۷ مهر ۱۴۰۵', '۶ مهر ۱۴۰۵', '۵ مهر ۱۴۰۵', '۵ مهر ۱۴۰۵', '۴ مهر ۱۴۰۵', '۳ مهر ۱۴۰۵', '۲ مهر ۱۴۰۵', '۱ مهر ۱۴۰۵', '۳۱ شهریور ۱۴۰۵'];
const statuses = ['processing', 'shipping', 'delivered', 'delivered', 'pending', 'shipping', 'delivered', 'cancelled', 'delivered', 'processing', 'delivered', 'shipping'];
const pays = ['درگاه زرین‌پال', 'کارت به کارت', 'درگاه سامان', 'پرداخت در محل', 'کیف پول'];

export const orders = Array.from({ length: 24 }, (_, i) => {
  const c = customers[(i * 5) % customers.length];
  const p = products[(i * 7) % products.length];
  const qty = (i % 3) + 1;
  return {
    id: 4821 - i,
    customer: c.name,
    city: c.city,
    product: p.name,
    icon: p.icon,
    tone: p.tone,
    qty,
    total: p.price * qty + (i % 4) * 150000,
    date: days[i % days.length],
    dateValue: 1405070800 - Math.floor(i / 2) * 100,
    status: statuses[i % statuses.length],
    pay: pays[i % pays.length],
  };
});

export const activity = [
  { icon: 'package-check', tone: 't-success', text: '<b>۱۲ سفارش</b> به شرکت پست تحویل داده شد.', time: '۱۰ دقیقه پیش' },
  { icon: 'user-plus', tone: 't-primary', text: '<b>امیر نوروزی</b> در فروشگاه ثبت‌نام کرد.', time: '۴۵ دقیقه پیش' },
  { icon: 'star', tone: 't-warning', text: 'نظر ۵ ستاره برای <b>ساعت هوشمند آرکا</b> ثبت شد.', time: '۲ ساعت پیش' },
  { icon: 'undo-2', tone: 't-danger', text: 'درخواست مرجوعی سفارش <b>#۴۸۱۴</b> بررسی شد.', time: '۵ ساعت پیش' },
  { icon: 'tag', tone: 't-info', text: 'کد تخفیف <b>MEHR1405</b> فعال شد.', time: 'دیروز' },
];

export const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

export const team = ['سارا محمدی', 'علی رضایی', 'مریم احمدی', 'رضا کریمی', 'نگار صادقی', 'پویا عباسی'];
