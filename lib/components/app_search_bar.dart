import 'package:flutter/material.dart';

import '../theme/tokens.dart';
import '../theme/typography.dart';
import 'app_button.dart';

/// Plassering av søkeikonet – Figma `Icon Position`.
enum SearchIconPosition { left, right }

/// Søkefelt (siden «Search» i Figma, settet «Searchbar»).
///
/// Figma → kode:
/// - `Style=Square/Rounded` → [rounded]
/// - `Icon Position=Left/Right` + `Icon visible` → [iconPosition] (null = uten ikon)
/// - `SearchField text` → [placeholder]
/// - `Clear visible` → [showClear] (vises når feltet har tekst)
/// - `Button visible` → [buttonLabel] (null = uten knapp)
/// - `State=Placeholder/Hover/Active` følger fokus og hover
class AppSearchBar extends StatefulWidget {
  const AppSearchBar({
    super.key,
    this.controller,
    this.placeholder = 'Søk',
    this.rounded = false,
    this.iconPosition = SearchIconPosition.left,
    this.showClear = true,
    this.buttonLabel = 'Søk',
    this.onChanged,
    this.onSubmitted,
  });

  final TextEditingController? controller;
  final String placeholder;
  final bool rounded;
  final SearchIconPosition? iconPosition;
  final bool showClear;
  final String? buttonLabel;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onSubmitted;

  @override
  State<AppSearchBar> createState() => _AppSearchBarState();
}

class _AppSearchBarState extends State<AppSearchBar> {
  late final TextEditingController _controller =
      widget.controller ?? TextEditingController();
  final _focus = FocusNode();
  bool _hovered = false;

  @override
  void initState() {
    super.initState();
    _focus.addListener(() => setState(() {}));
    _controller.addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    _focus.dispose();
    if (widget.controller == null) _controller.dispose();
    super.dispose();
  }

  void _submit() => widget.onSubmitted?.call(_controller.text);

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final active = _focus.hasFocus;
    final radius = widget.rounded ? AppRadius.full : AppRadius.s;
    final searchIcon = Icon(Icons.search, size: 18, color: p.textTertiary);
    final clear = widget.showClear && _controller.text.isNotEmpty
        ? IconButton(
            tooltip: 'Tøm søk',
            icon: Icon(Icons.close, size: 18, color: p.textSecondary),
            onPressed: () {
              _controller.clear();
              widget.onChanged?.call('');
            },
          )
        : null;

    final field = MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 120),
        height: 46,
        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.s),
        decoration: BoxDecoration(
          // Placeholder: grå flate. Hover: grønn kant. Active: hvit med lys kant.
          color: active || _hovered ? p.surfacePrimary : p.surfaceSecondary,
          borderRadius: BorderRadius.circular(radius),
          border: Border.all(
            color: _hovered && !active
                ? p.ctaPrimaryDefault
                : (active ? p.borderSecondary : Colors.transparent),
          ),
        ),
        child: Row(children: [
          if (widget.iconPosition == SearchIconPosition.left) ...[
            searchIcon,
            const SizedBox(width: AppSpacing.xs),
          ],
          Expanded(
            child: TextField(
              controller: _controller,
              focusNode: _focus,
              textInputAction: TextInputAction.search,
              onChanged: widget.onChanged,
              onSubmitted: (_) => _submit(),
              style: AppType.bodySmall.copyWith(color: p.textPrimary),
              cursorColor: p.ctaPrimaryDefault,
              decoration: InputDecoration(
                isCollapsed: true,
                border: InputBorder.none,
                hintText: widget.placeholder,
                hintStyle: AppType.bodySmall.copyWith(color: p.textSecondary),
              ),
            ),
          ),
          if (clear != null) clear,
          if (widget.iconPosition == SearchIconPosition.right) ...[
            const SizedBox(width: AppSpacing.xs),
            searchIcon,
          ],
        ]),
      ),
    );

    if (widget.buttonLabel == null) return field;
    return Row(children: [
      Expanded(child: field),
      const SizedBox(width: AppSpacing.xs),
      AppButton(label: widget.buttonLabel, onPressed: _submit),
    ]);
  }
}
