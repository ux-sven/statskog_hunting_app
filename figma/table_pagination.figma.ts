// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=1286-2340
// source=lib/components/app_table.dart
// component=AppTablePagination
import figma from 'figma'
const instance = figma.selectedInstance

const compact = instance.getEnum('Property 1', { 'Variant 1': false, 'Variant 2': true })
const size = instance.getEnum('Size', {
  'Small': 'AppSize.small',
  'Medium': 'AppSize.medium',
  'Large': 'AppSize.large',
})

export default {
  example: figma.code`AppTablePagination${compact ? '.compact' : ''}(
  currentPage: 1,
  pageCount: 8,
  size: ${size},
  onPageChanged: (page) {},
)`,
  imports: ["import 'package:jakt_fiske/components/components.dart';"],
  id: 'app-table-pagination',
  metadata: { nestable: true },
}
