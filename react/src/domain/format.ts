/** Enkle norske formateringer. */
const weekdays = ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'];
const months = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'];
const two = (n: number) => String(n).padStart(2, '0');

/** 13.12.2024 */
export const formatDate = (d: Date) => `${two(d.getDate())}.${two(d.getMonth() + 1)}.${d.getFullYear()}`;
/** Man, Tir, … */
export const weekdayShort = (d: Date) => weekdays[d.getDay()];
/** jan, feb, … */
export const monthShort = (d: Date) => months[d.getMonth()];
/** 75 → «75,-», 1250 → «1 250,-» */
export const formatKroner = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')},-`;

export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
export const sameDay = (a: Date, b: Date) => a.getTime() === b.getTime() || startOfDay(a).getTime() === startOfDay(b).getTime();

/** «2024-11-14» → Date (lokal midnatt). */
export const parseDay = (s: string) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};
/** Date → «2024-11-14». */
export const isoDay = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const longMonths = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'];
/** 14. november 2024 */
export const formatLongDate = (d: Date) => `${d.getDate()}. ${longMonths[d.getMonth()]} ${d.getFullYear()}`;
/** «Sist oppdatert 12:04» / «i går 18:30» */
export const formatTime = (d: Date) => {
  const t = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  const today = startOfDay(new Date()).getTime();
  const that = startOfDay(d).getTime();
  return that === today ? t : that === today - 86400000 ? `i går ${t}` : `${formatDate(d)} ${t}`;
};
