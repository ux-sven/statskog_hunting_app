/// Enkle norske formateringer uten ekstra avhengigheter.
library;

const _weekdays = ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'];
const _months = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'];

String _two(int n) => n.toString().padLeft(2, '0');

/// 13.12.2024
String formatDate(DateTime d) => '${_two(d.day)}.${_two(d.month)}.${d.year}';

/// Man, Tir, …
String weekdayShort(DateTime d) => _weekdays[d.weekday - 1];

/// jan, feb, …
String monthShort(DateTime d) => _months[d.month - 1];

/// 75 → «75,-», 1250 → «1 250,-»
String formatKroner(int amount) {
  final s = amount.toString();
  final b = StringBuffer();
  for (var i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 == 0) b.write(' ');
    b.write(s[i]);
  }
  return '$b,-';
}
