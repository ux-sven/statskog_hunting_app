import 'package:flutter/material.dart';

import '../../../app/widgets.dart';
import '../../../data/demo_store.dart';
import '../../../jakt_fiske.dart';
import '../../filter/screens/filter_list_screen.dart';

/// Tilbud med kart øverst og liste i et ark som kan dras opp
/// (eksempelvisningene «Hunting Map View» / «Hunting Offers View»).
class OffersScreen extends StatefulWidget {
  const OffersScreen({super.key});

  @override
  State<OffersScreen> createState() => _OffersScreenState();
}

class _OffersScreenState extends State<OffersScreen> {
  SpeciesGroup _group = SpeciesGroup.game;
  String _query = '';
  Set<Species> _species = {};

  Future<void> _openFilter() async {
    var selection = {..._species};
    await Navigator.of(context).push(MaterialPageRoute(
      builder: (_) => Scaffold(
        body: SafeArea(
          child: FilterListScreen<Species>(
            title: 'Art',
            items: _group == SpeciesGroup.game ? Species.game : Species.fish,
            labelOf: (s) => s.label,
            speciesOf: (s) => s,
            initialSelection: _species,
            onChanged: (s) => selection = s,
          ),
        ),
      ),
    ));
    setState(() => _species = selection);
  }

  void _buy(Offer o) {
    showModalBottomSheet(
      context: context,
      showDragHandle: true,
      builder: (context) => Padding(
        padding: const EdgeInsets.fromLTRB(AppSpacing.m, 0, AppSpacing.m, AppSpacing.l),
        child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.stretch, children: [
          Text('Kjøp hos Inatur', style: AppType.headlineH2),
          const SizedBox(height: AppSpacing.xs),
          Text('Kjøpet av «${o.title}» fullføres på inatur.no. Kortet dukker opp under Jaktkort når kjøpet er gjennomført.',
              style: AppType.bodyMedium),
          const SizedBox(height: AppSpacing.m),
          AppButton(
            label: 'Gå til inatur.no',
            trailingIcon: const AppIcon(AppIcons.externalLink),
            expand: true,
            onPressed: () => Navigator.pop(context),
          ),
        ]),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final store = AppScope.of(context);
    final p = AppPalette.of(context);
    final offers = store.offers(_group, query: _query, species: _species);
    final title = _group == SpeciesGroup.game ? 'Tilbud småviltjakt' : 'Tilbud fiske';

    return Column(children: [
      Container(
        color: p.surfacePrimary,
        padding: const EdgeInsets.fromLTRB(AppSpacing.m, AppSpacing.s, AppSpacing.m, AppSpacing.s),
        child: Column(children: [
          AppSearchBar(
            rounded: true,
            buttonLabel: null,
            placeholder: 'Søk',
            onChanged: (v) => setState(() => _query = v),
          ),
          const SizedBox(height: AppSpacing.s),
          Row(children: [
            AppButton(
              label: _species.isEmpty ? 'Filter' : 'Filter (${_species.length})',
              style: AppButtonStyle.tertiary,
              leadingIcon: const AppIcon(AppIcons.filter),
              onPressed: _openFilter,
            ),
            if (_species.isNotEmpty) ...[
              const SizedBox(width: AppSpacing.xs),
              AppChip(
                label: 'Nullstill',
                size: AppSize.medium,
                onSelected: (_) => setState(() => _species = {}),
                onDeleted: () => setState(() => _species = {}),
              ),
            ],
          ]),
        ]),
      ),
      Expanded(
        child: Stack(children: [
          const Positioned.fill(child: MapPlaceholder()),
          DraggableScrollableSheet(
            initialChildSize: 0.62,
            minChildSize: 0.18,
            maxChildSize: 1,
            snap: true,
            builder: (context, scroll) => Container(
              decoration: BoxDecoration(
                color: p.surfaceSecondary,
                borderRadius: const BorderRadius.vertical(top: Radius.circular(AppRadius.xl)),
                boxShadow: [BoxShadow(color: p.shadeSecondary, blurRadius: 12)],
              ),
              child: CustomScrollView(controller: scroll, slivers: [
                SliverToBoxAdapter(
                  child: Column(children: [
                    Container(
                      margin: const EdgeInsets.only(top: AppSpacing.xs),
                      width: 48,
                      height: 4,
                      decoration: BoxDecoration(
                          color: p.borderSecondary, borderRadius: BorderRadius.circular(AppRadius.full)),
                    ),
                    ScreenTitle(title),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.s),
                      child: AppSegmentedControl(
                        segments: const ['Småviltjakt', 'Fiske'],
                        selectedIndex: _group == SpeciesGroup.game ? 0 : 1,
                        onChanged: (i) => setState(() {
                          _group = i == 0 ? SpeciesGroup.game : SpeciesGroup.fish;
                          _species = {};
                        }),
                      ),
                    ),
                    const SizedBox(height: AppSpacing.s),
                  ]),
                ),
                if (offers.isEmpty)
                  const SliverToBoxAdapter(
                    child: Padding(
                      padding: EdgeInsets.all(AppSpacing.s),
                      child: AppNotice(text: 'Ingen tilbud passer søket. Prøv et annet søk eller nullstill filteret.'),
                    ),
                  ),
                SliverList.separated(
                  itemCount: offers.length,
                  separatorBuilder: (_, __) => const SizedBox(height: AppSpacing.s),
                  itemBuilder: (context, i) => Padding(
                    padding: const EdgeInsets.symmetric(horizontal: AppSpacing.s),
                    child: OfferCard(
                      offer: offers[i],
                      onBuy: () => _buy(offers[i]),
                      onInfo: () => _buy(offers[i]),
                      onShowInMap: () => showMapSheet(context, offers[i].title),
                    ),
                  ),
                ),
                const SliverToBoxAdapter(child: SizedBox(height: AppSpacing.l)),
              ]),
            ),
          ),
        ]),
      ),
    ]);
  }
}
