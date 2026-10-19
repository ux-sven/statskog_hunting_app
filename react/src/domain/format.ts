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
