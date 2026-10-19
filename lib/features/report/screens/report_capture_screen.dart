import 'package:flutter/material.dart';

import '../../../app/widgets.dart';
import '../../../data/demo_store.dart';
import '../../../data/repositories.dart';
import '../../../jakt_fiske.dart';

/// Lever fangstrapport for en aktivering («Report Capture Hunting»).
/// Rapporten lagres på telefonen og sendes til Jaktdatabasen når det er nett.
class ReportCaptureScreen extends StatefulWidget {
  const ReportCaptureScreen({super.key, required this.activation});

  final Activation activation;

  @override
  State<ReportCaptureScreen> createState() => _ReportCaptureScreenState();
}

class _ReportCaptureScreenState extends State<ReportCaptureScreen> {
  int _mode = 0; // 0 = jaktet, 1 = jaktet ikke
  final _counts = <Species, int>{};

  static const _species = [
    Species.lirype,
    Species.fjellrype,
    Species.orrfugl,
    Species.tiur,
    Species.jerpe,
    Species.hare,
    Species.rodrev,
  ];

  Future<void> _send() async {
    final store = AppScope.of(context);
    await store.submit(CaptureReport(
      activation: widget.activation,
      catches: _mode == 0 ? ({..._counts}..removeWhere((_, v) => v == 0)) : const {},
      hunted: _mode == 0,
      createdAt: DateTime.now(),
    ));
    if (!mounted) return;
    showAppMessage(
        context,
        store.offline
            ? 'Fangstrapporten er lagret og sendes når du får dekning.'
            : 'Takk! Fangstrapporten er sendt.');
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final a = widget.activation;
    final total = _counts.values.fold(0, (x, y) => x + y);
    return Scaffold(
      backgroundColor: p.surfacePrimary,
      body: SafeArea(
        child: Column(children: [
          const BackHeader(title: 'Fangstrapport'),
          Expanded(
            child: ListView(children: [
              Padding(
                padding: const EdgeInsets.all(AppSpacing.m),
                child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
                  MetaRow(icon: AppIcons.contact, text: '${a.licenseTitle} (${a.cardNumber})',
                      style: AppType.bodyLarge.copyWith(color: p.textSecondary)),
                  const SizedBox(height: AppSpacing.s),
                  MetaRow(icon: AppIcons.schedule, text: formatDate(a.date),
                      style: AppType.bodyLarge.copyWith(color: p.textPrimary, fontWeight: FontWeight.w700)),
                  const SizedBox(height: AppSpacing.m),
                  AppSegmentedControl(
                    segments: const ['Jeg jaktet', 'Jeg jaktet ikke'],
                    selectedIndex: _mode,
                    onChanged: (i) => setState(() => _mode = i),
                  ),
                ]),
              ),
              if (_mode == 0) ...[
                Padding(
                  padding: const EdgeInsets.fromLTRB(AppSpacing.m, 0, AppSpacing.m, AppSpacing.xs),
                  child: Text('Hva fikk du?', style: AppType.subtitleLarge.copyWith(color: p.textPrimary)),
                ),
                for (final s in _species) ...[
                  FilterOptionTile.counter(
                    label: s.label,
                    species: s,
                    count: _counts[s] ?? 0,
                    onChanged: (v) => setState(() => _counts[s] = v),
                  ),
                  Container(height: 1, color: p.borderPrimary),
                ],
              ] else
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: AppSpacing.m),
                  child: AppNotice(text: 'Du rapporterer at du ikke jaktet denne dagen. Det er også viktig for forvaltningen.'),
                ),
            ]),
          ),
          Padding(
            padding: const EdgeInsets.all(AppSpacing.m),
            child: AppButton(
              label: _mode == 1
                  ? 'Send rapport'
                  : (total == 0 ? 'Send rapport uten fangst' : 'Send rapport ($total)'),
              expand: true,
              onPressed: _send,
            ),
          ),
        ]),
      ),
    );
  }
}
