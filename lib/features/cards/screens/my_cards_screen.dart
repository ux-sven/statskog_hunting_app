import 'package:flutter/material.dart';

import '../../../app/widgets.dart';
import '../../../data/demo_store.dart';
import '../../../jakt_fiske.dart';
import '../../report/screens/report_capture_screen.dart';
import 'activation_screen.dart';

/// Mine jakt- eller fiskekort («Hunting Cards View», «Fishing Cards Views»).
class MyCardsScreen extends StatefulWidget {
  const MyCardsScreen({super.key, required this.group});

  final SpeciesGroup group;

  @override
  State<MyCardsScreen> createState() => _MyCardsScreenState();
}

class _MyCardsScreenState extends State<MyCardsScreen> {
  int _tab = 0;

  bool get _hunting => widget.group == SpeciesGroup.game;

  void _openDetails(HuntingLicense l) {
    Navigator.of(context).push(MaterialPageRoute(
      builder: (_) => Scaffold(
        body: SafeArea(
          child: Column(children: [
            BackHeader(title: 'Kortnr ${l.cardNumber}'),
            Expanded(
              child: SingleChildScrollView(
                child: LicenseCard.details(
                  license: l,
                  onActivate: _hunting ? () => _activate(l) : null,
                  onShowInMap: () => showMapSheet(context, l.title),
                  onRules: () {},
                  onReceipt: () {},
                  onOfferInfo: () {},
                  onDownloadOfflineMap: () => showAppMessage(context, 'Kartområdet lastes ned for bruk uten dekning.'),
                ),
              ),
            ),
          ]),
        ),
      ),
    ));
  }

  Future<void> _activate(HuntingLicense l) async {
    final done = await Navigator.of(context).push<bool>(
      MaterialPageRoute(builder: (_) => ActivationScreen(license: l)),
    );
    if (done == true && mounted) setState(() => _tab = 1);
  }

  Future<void> _remove(Activation a) async {
    final store = AppScope.of(context);
    try {
      await store.removeActivation(a);
      if (mounted) showAppMessage(context, 'Aktiveringen er fjernet.');
    } on OfflineException catch (e) {
      if (mounted) showAppMessage(context, e.message);
    }
  }

  @override
  Widget build(BuildContext context) {
    final store = AppScope.of(context);
    final licenses = store.licenses(widget.group);
    final today = DateTime.now();
    final activations = store.activations();

    final List<Widget> items;
    if (!_hunting || _tab == 0) {
      items = [
        if (licenses.isEmpty)
          AppNotice(
              text: _hunting
                  ? 'Du har ingen jaktkort. Finn et tilbud under Tilbud.'
                  : 'Du har ingen fiskekort. Finn et tilbud under Tilbud.'),
        for (final l in licenses)
          LicenseCard(
            license: l,
            onActivate: _hunting ? () => _activate(l) : null,
            onInfo: () => _openDetails(l),
            onShowInMap: () => showMapSheet(context, l.title),
          ),
        AppNotice.callout(
          text: 'Last ned offline kartområder med jaktgrenser dersom du skal jakte i områder uten mobildekning.',
          action: AppButton(
            label: 'Last ned her',
            style: AppButtonStyle.secondary,
            leadingIcon: const AppIcon(AppIcons.downloadFromCloud),
            onPressed: () => showAppMessage(context, 'Kartområdet lastes ned for bruk uten dekning.'),
          ),
        ),
      ];
    } else {
      items = [
        if (activations.isEmpty)
          const AppNotice(
              text: 'Du har ingen aktiveringer.\nHusk å aktivere jaktkortet ditt før du går på jakt.'),
        for (final a in activations)
          ActivationCard(
            activation: a,
            onRemove: a.date.isAfter(today) ? () => _remove(a) : null,
            onReportCapture: !a.date.isAfter(today) && !store.isReported(a)
                ? () => Navigator.of(context).push(
                    MaterialPageRoute(builder: (_) => ReportCaptureScreen(activation: a)))
                : null,
            onReceipt: () {},
            onShowInMap: () => showMapSheet(context, a.licenseTitle),
          ),
      ];
    }

    return ColoredBox(
      color: AppPalette.of(context).surfaceSecondary,
      child: ListView(
        padding: const EdgeInsets.only(bottom: AppSpacing.l),
        children: [
          ScreenTitle(_hunting ? 'Mine jaktkort' : 'Mine fiskekort'),
          if (_hunting)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.s),
              child: AppSegmentedControl(
                segments: const ['Jaktkort', 'Aktiveringer'],
                selectedIndex: _tab,
                onChanged: (i) => setState(() => _tab = i),
              ),
            ),
          for (final w in items)
            Padding(
              padding: const EdgeInsets.fromLTRB(AppSpacing.s, AppSpacing.s, AppSpacing.s, 0),
              child: w,
            ),
        ],
      ),
    );
  }
}
