import 'package:flutter/material.dart';

/// Holder styr på hover/pressed/focused/disabled og gir dem til [builder].
///
/// Brukes av komponentene slik at tilstandene i Figma (normal, hover, focus,
/// pressed, disabled) styres av ekte interaksjon i appen i stedet for props.
class InteractiveBuilder extends StatefulWidget {
  const InteractiveBuilder({
    super.key,
    required this.onTap,
    required this.builder,
    this.selected = false,
    this.semanticLabel,
    this.isButton = true,
    this.mouseCursor,
  });

  final VoidCallback? onTap;
  final bool selected;
  final String? semanticLabel;
  final bool isButton;
  final MouseCursor? mouseCursor;
  final Widget Function(BuildContext context, Set<WidgetState> states) builder;

  @override
  State<InteractiveBuilder> createState() => _InteractiveBuilderState();
}

class _InteractiveBuilderState extends State<InteractiveBuilder> {
  bool _hovered = false;
  bool _pressed = false;
  bool _focused = false;

  bool get _enabled => widget.onTap != null;

  Set<WidgetState> get _states => {
        if (!_enabled) WidgetState.disabled,
        if (_enabled && _hovered) WidgetState.hovered,
        if (_enabled && _pressed) WidgetState.pressed,
        if (_enabled && _focused) WidgetState.focused,
        if (widget.selected) WidgetState.selected,
      };

  void _set(void Function() fn) => setState(fn);

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: widget.isButton,
      enabled: _enabled,
      selected: widget.selected,
      label: widget.semanticLabel,
      child: FocusableActionDetector(
        enabled: _enabled,
        mouseCursor: widget.mouseCursor ??
            (_enabled ? SystemMouseCursors.click : SystemMouseCursors.basic),
        onShowHoverHighlight: (v) => _set(() => _hovered = v),
        onShowFocusHighlight: (v) => _set(() => _focused = v),
        actions: {
          ActivateIntent: CallbackAction<ActivateIntent>(
            onInvoke: (_) => widget.onTap?.call(),
          ),
        },
        child: GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: widget.onTap,
          onTapDown: _enabled ? (_) => _set(() => _pressed = true) : null,
          onTapUp: _enabled ? (_) => _set(() => _pressed = false) : null,
          onTapCancel: _enabled ? () => _set(() => _pressed = false) : null,
          child: widget.builder(context, _states),
        ),
      ),
    );
  }
}

/// Velger verdi etter prioritet: disabled > pressed > focused > hovered > normal.
T resolveState<T>(
  Set<WidgetState> states, {
  required T normal,
  T? hovered,
  T? focused,
  T? pressed,
  T? disabled,
}) {
  if (states.contains(WidgetState.disabled)) return disabled ?? normal;
  if (states.contains(WidgetState.pressed)) return pressed ?? normal;
  if (states.contains(WidgetState.focused)) return focused ?? normal;
  if (states.contains(WidgetState.hovered)) return hovered ?? normal;
  return normal;
}
