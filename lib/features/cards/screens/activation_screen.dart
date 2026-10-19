import 'package:flutter/material.dart';

import '../../../app/widgets.dart';
import '../../../data/demo_store.dart';
import '../../../jakt_fiske.dart';

/// Aktiver jaktkort for én eller flere dager («Activation View»).
class ActivationScreen extends StatefulWidget {
  const ActivationScreen({super.key, required this.license});

  final HuntingLicense license;

  @override
  State<ActivationScreen> createState() => _ActivationScreenState();
}

class _ActivationScreenState extends State<ActivationScreen> {
  final _days = <DateTime>{};
  bool _busy = false;

  Future<void> _submit() async {
    final store = AppScope.of(context);
    setState(() => _busy = true);
    try {
      await store.activate(widget.license, _days);
      if (!mounted) return;
      showAppMessage(context, _days.length == 1 ? 'Jaktkortet er aktivert.' : 'Jaktkortet er aktivert for ${_days.length} dager.');
      Navigator.pop(context, true);
    } on OfflineException catch (e) {
      if (mounted) showAppMessage(context, e.message);
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final store = AppScope.of(context);
    final p = AppPalette.of(context);
    final n = _days.length;
    return Scaffold(
      backgroundColor: p.surfacePrimary,
      body: SafeArea(
        child: Column(children: [
          const BackHeader(title: 'Aktiver jaktkort'),
          Expanded(
            child: ListView(children: [
              LicenseSummary(license: widget.license),
              Padding(
                padding: const EdgeInsets.fromLTRB(AppSpacing.m, AppSpacing.m, AppSpacing.m, AppSpacing.xs),
                child: Text('Velg dager du skal jakte', style: AppType.subtitleLarge.copyWith(color: p.textPrimary)),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: AppSpacing.m),
                child: Text('Tallet nederst viser hvor mange som har aktivert den dagen.',
                    style: AppType.bodySmall.copyWith(color: p.textSecondary)),
              ),
              const SizedBox(height: AppSpacing.s),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: AppSpacing.m),
                child: DayPicker(
                  slots: store.activationSlots(widget.license),
                  selected: _days,
                  onToggle: (d) => setState(() => _days.contains(d) ? _days.remove(d) : _days.add(d)),
                ),
              ),
              if (store.offline)
                const Padding(
                  padding: EdgeInsets.all(AppSpacing.m),
                  child: AppNotice(text: 'Du er uten dekning. Aktivering krever nett.'),
                ),
            ]),
          ),
          Padding(
            padding: const EdgeInsets.all(AppSpacing.m),
            child: AppButton(
              label: n == 0 ? 'Velg minst én dag' : (n == 1 ? 'Aktiver 1 dag' : 'Aktiver $n dager'),
              style: AppButtonStyle.accent,
              expand: true,
              onPressed: n == 0 || _busy ? null : _submit,
            ),
          ),
        ]),
      ),
    );
  }
}
