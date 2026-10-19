import 'package:flutter/material.dart';

import '../icons/app_icon.dart';
import '../icons/app_icons.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';

/// Tekstfelt (siden «Text Input» i Figma: «Inputfield Small / Medium / Large»).
///
/// Figma → kode:
/// - Settnavn → [size]
/// - `Label` + `Label Text` → [label]
/// - `Input Text` → [initialValue] / [controller]
/// - `Show Pre Icon` + `Pre Icon` → [preIcon]
/// - `Show Post Icon` + `Post Icon` → [postIcon]
/// - `Show Clear Text` → [showClear]
/// - `Is Dropdown` → [onTapDropdown] (feltet blir en nedtrekksliste)
/// - `Type=Display` → [readOnlyDisplay] (kun etikett og verdi, uten ramme)
/// - `State=error` → [errorText]
/// - `State=disabled` → `enabled: false`
/// - `State=hover/focus` følger ekte interaksjon
class AppTextField extends StatefulWidget {
  const AppTextField({
    super.key,
    this.label,
    this.controller,
    this.initialValue,
    this.hintText,
    this.size = AppSize.medium,
    this.preIcon,
    this.postIcon,
    this.showClear = false,
    this.errorText,
    this.enabled = true,
    this.readOnlyDisplay = false,
    this.onTapDropdown,
    this.keyboardType,
    this.onChanged,
  });

  final String? label;
  final TextEditingController? controller;
  final String? initialValue;
  final String? hintText;
  final AppSize size;
  final Widget? preIcon;
  final Widget? postIcon;
  final bool showClear;
  final String? errorText;
  final bool enabled;
  final bool readOnlyDisplay;
  final VoidCallback? onTapDropdown;
  final TextInputType? keyboardType;
  final ValueChanged<String>? onChanged;

  @override
  State<AppTextField> createState() => _AppTextFieldState();
}

class _AppTextFieldState extends State<AppTextField> {
  late final TextEditingController _controller =
      widget.controller ?? TextEditingController(text: widget.initialValue);
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

  double get _height => switch (widget.size) {
        AppSize.small => 38,
        AppSize.medium => 55,
        AppSize.large => 72,
      };

  TextStyle get _labelStyle => switch (widget.size) {
        AppSize.small => AppType.bodyXtraSmall,
        AppSize.medium => AppType.bodySmall,
        AppSize.large => AppType.bodyMedium,
      };

  TextStyle get _inputStyle => switch (widget.size) {
        AppSize.small => AppType.bodySmall,
        AppSize.medium => AppType.bodyMedium,
        AppSize.large => AppType.bodyLarge,
      };

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final label = widget.label == null
        ? null
        : Text(widget.label!, style: _labelStyle.copyWith(color: p.textSecondary));

    if (widget.readOnlyDisplay) {
      return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        if (label != null) label,
        Text(_controller.text, style: _inputStyle.copyWith(color: p.textPrimary)),
      ]);
    }

    final hasError = widget.errorText != null;
    final focused = _focus.hasFocus;
    final Color border = !widget.enabled
        ? p.borderSecondary
        : hasError
            ? p.attentionError
            : focused
                ? p.ctaPrimarySelected
                : (_hovered ? p.ctaPrimaryHover : p.borderSecondary);
    final isDropdown = widget.onTapDropdown != null;

    final field = MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 120),
        height: _height,
        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.s),
        decoration: BoxDecoration(
          color: p.surfacePrimary,
          borderRadius: BorderRadius.circular(
              widget.size == AppSize.small ? AppRadius.m : AppRadius.s),
          border: Border.all(color: border, width: focused && !hasError ? 2 : 1),
        ),
        child: IconTheme.merge(
          data: IconThemeData(color: p.textSecondary, size: 18),
          child: Row(children: [
            if (widget.preIcon != null) ...[
              widget.preIcon!,
              const SizedBox(width: AppSpacing.xs),
            ],
            Expanded(
              child: TextField(
                controller: _controller,
                focusNode: _focus,
                enabled: widget.enabled,
                readOnly: isDropdown,
                onTap: widget.onTapDropdown,
                keyboardType: widget.keyboardType,
                onChanged: widget.onChanged,
                style: _inputStyle.copyWith(
                    color: widget.enabled ? p.textPrimary : p.textTertiary),
                cursorColor: p.ctaPrimaryDefault,
                decoration: InputDecoration(
                  isCollapsed: true,
                  border: InputBorder.none,
                  hintText: widget.hintText,
                  hintStyle: _inputStyle.copyWith(color: p.textTertiary),
                ),
              ),
            ),
            if (widget.showClear && _controller.text.isNotEmpty && widget.enabled)
              GestureDetector(
                onTap: () {
                  _controller.clear();
                  widget.onChanged?.call('');
                },
                child: Semantics(
                    button: true,
                    label: 'Tøm feltet',
                    child: const AppIcon(AppIcons.cancel)),
              ),
            if (isDropdown) const AppIcon(AppIcons.chevronDownSmall),
            if (widget.postIcon != null) ...[
              const SizedBox(width: AppSpacing.xs),
              widget.postIcon!,
            ],
          ]),
        ),
      ),
    );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (label != null) ...[label, const SizedBox(height: 2)],
        field,
        if (hasError) ...[
          const SizedBox(height: 4),
          Text(widget.errorText!,
              style: AppType.bodyXtraSmall.copyWith(color: p.attentionError)),
        ],
      ],
    );
  }
}
