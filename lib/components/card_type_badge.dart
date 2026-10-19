import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../domain/card_type.dart';
import '../theme/tokens.dart';

/// Symbol for korttype («Card» og «Card Inactive» på Components-siden).
///
/// Figma → kode:
/// - «Card» `Property 1` → [type]
/// - «Card Inactive» → `inactive: true` (diagonal strek over symbolet)
///
/// Fargene i SVG-ene byttes til temafarger, slik at symbolet fungerer i mørk modus.
class CardTypeBadge extends StatelessWidget {
  const CardTypeBadge(this.type, {super.key, this.inactive = false, this.size = 48});

  final CardType type;
  final bool inactive;
  final double size;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final picture = SvgPicture(
      SvgAssetLoader(type.assetPath, colorMapper: _CardColors(p)),
      width: size,
      height: size,
      semanticsLabel: inactive ? '${type.label} (inaktivt)' : type.label,
    );
    if (!inactive) return picture;
    return SizedBox.square(
      dimension: size,
      child: CustomPaint(
        foregroundPainter: _StrikePainter(line: p.textSecondary, gap: p.surfacePrimary),
        child: picture,
      ),
    );
  }
}

class _CardColors extends ColorMapper {
  const _CardColors(this.p);
  final AppPalette p;

  @override
  Color substitute(String? id, String elementName, String attributeName, Color color) {
    final v = color.toARGB32() & 0xFFFFFF;
    if (v == 0xF6F6F7) return p.surfaceSecondary;
    if (v == 0x555555) return p.textSecondary;
    return color;
  }
}

/// Strek fra nedre venstre til øvre høyre hjørne, med lys kant over
/// (to rektangler rotert −37° i Figma).
class _StrikePainter extends CustomPainter {
  _StrikePainter({required this.line, required this.gap});
  final Color line, gap;

  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width / 48;
    final w = 2.5 * s;
    final from = Offset(3 * s, 40 * s);
    final to = Offset(47 * s, 6 * s);
    final offset = Offset(0.9 * s, -1.6 * s);
    canvas.drawLine(from + offset, to + offset,
        Paint()..color = gap..strokeWidth = w);
    canvas.drawLine(from, to, Paint()..color = line..strokeWidth = w);
  }

  @override
  bool shouldRepaint(_StrikePainter old) => old.line != line || old.gap != gap;
}
