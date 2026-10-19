import 'package:flutter/material.dart';

import '../../../app/widgets.dart';
import '../../../data/demo_store.dart';
import '../../../jakt_fiske.dart';
import 'report_capture_screen.dart';

/// Oversikt over fangstrapportering («Reporting Home View»).
class ReportingHomeScreen extends StatelessWidget {
  const ReportingHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final store = AppScope.of(context);
    final p = AppPalette.of(context);
    final today = DateTime.now();
    final toReport = store.activations().where((a) => !a.date.isAfter(today) && !store.isReported(a)).toList();
    final reports = store.reports();

    return ColoredBox(
      color: p.surfaceSecondary,
      child: ListView(
        padding: const EdgeInsets.only(bottom: AppSpacing.l),
        children: [
          const ScreenTitle('Fangstrapportering'),
          if (store.pendingReports > 0)
            Padding(
              padding: const EdgeInsets.fromLTRB(AppSpacing.s, 0, AppSpacing.s, AppSpacing.s),
              child: AppNotice(
                icon: AppIcons.synchronize,
                text: store.pendingReports == 1
                    ? '1 fangstrapport venter på dekning og sendes automatisk.'
                    : '${store.pendingReports} fangstrapporter venter på dekning og sendes automatisk.',
              ),
            ),
          ExpandableSection(
            title: 'Til rapportering',
            children: [
              if (toReport.isEmpty)
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: AppSpacing.s),
                  child: AppNotice(text: 'Du har ingen jaktdager som venter på rapport.'),
                ),
              for (final a in toReport)
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: AppSpacing.s),
                  child: ActivationCard(
                    activation: a,
                    onReportCapture: () => Navigator.of(context).push(
                        MaterialPageRoute(builder: (_) => ReportCaptureScreen(activation: a))),
                    onShowInMap: () => showMapSheet(context, a.licenseTitle),
                  ),
                ),
            ],
          ),
          const SizedBox(height: AppSpacing.m),
          ExpandableSection(
            title: 'Tidligere rapporteringer',
            children: [
              if (reports.isEmpty)
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: AppSpacing.s),
                  child: AppNotice(text: 'Rapporter du sender, vises her.'),
                ),
              for (final r in reports)
                AppListTile(
                  title: '${formatDate(r.activation.date)} · ${r.activation.municipality}',
                  subtitle: [
                    r.hunted ? (r.total == 0 ? 'Ingen fangst' : '${r.total} stk') : 'Jaktet ikke',
                    r.synced ? 'Sendt' : 'Venter på dekning',
                  ].join(' · '),
                  icon: r.synced ? AppIcons.report : AppIcons.synchronize,
                ),
            ],
          ),
        ],
      ),
    );
  }
}
