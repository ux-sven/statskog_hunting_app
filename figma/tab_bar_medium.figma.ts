// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=1286-4420
// source=lib/components/app_tab_bar.dart
// component=AppTabBar
import figma from 'figma'
const instance = figma.selectedInstance

// Fanene leses fra knappene «Tab Bar Button Small 1–8» i komponenten.
let tabs = ''
let selected = 0
let count = 0
for (let i = 1; i <= 8; i++) {
  const btn = instance.findInstance('Tab Bar Button Small ' + i)
  if (!btn || btn.type !== 'INSTANCE') continue
  const props = btn.executeTemplate().metadata.props || {}
  if (props.active) selected = count
  tabs += "\n    AppTab(label: '" + props.label + "'" + (props.disabled ? ', enabled: false' : '') + '),'
  count++
}

export default {
  example: figma.code`AppTabBar(
  size: AppSize.medium,
  tabs: const [${tabs}
  ],
  selectedIndex: ${selected},
  onChanged: (index) {},
)`,
  imports: ["import 'package:jakt_fiske/components/components.dart';"],
  id: 'app-tab-bar-medium',
  metadata: { nestable: true },
}
