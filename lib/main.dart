import 'package:flutter/material.dart';

import 'components/app_button.dart';
import 'theme/tokens.dart';

void main() => runApp(const JaktFiskeApp());

/// Minimal app som viser komponentene fra designsystemet, slik at Figma-koblingen
/// kan sammenlignes visuelt med koden.
class JaktFiskeApp extends StatelessWidget {
  const JaktFiskeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Jakt & fiske',
      theme: ThemeData(
        colorSchemeSeed: AppColors.ctaPrimaryDefault,
        scaffoldBackgroundColor: AppColors.surfacePrimary,
      ),
      home: const ComponentShowcase(),
    );
  }
}

class ComponentShowcase extends StatelessWidget {
  const ComponentShowcase({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Komponenter')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          for (final style in AppButtonStyle.values) ...[
            Text(style.name),
            const SizedBox(height: 8),
            Wrap(spacing: 12, runSpacing: 12, children: [
              AppButton(label: 'Kjøp', style: style, onPressed: () {}),
              AppButton(
                label: 'Kjøp',
                style: style,
                leadingIcon: const Icon(Icons.shopping_cart_outlined),
                onPressed: () {},
              ),
              AppButton(label: 'Kjøp', style: style, onPressed: null),
            ]),
            const SizedBox(height: 24),
          ],
        ],
      ),
    );
  }
}
