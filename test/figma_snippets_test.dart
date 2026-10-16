// Generert fra figma/*.figma.ts: sjekker at koden Figma viser i Dev Mode kompilerer.
// ignore_for_file: prefer_const_constructors, unnecessary_const
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:jakt_fiske/components/components.dart';

const String? valgtVerdi = null;

List<Widget> snippets() => <Widget>[
  // button_large.figma.ts
  AppButton(
    label: 'Label',
    style: AppButtonStyle.primary,
    size: AppSize.large,
    leadingIcon: const Icon(Icons.star),
    trailingIcon: const Icon(Icons.star),
    onPressed: () {},
  ),
  // button_large.figma.ts
  AppButton(
    style: AppButtonStyle.secondary,
    size: AppSize.large,
    onPressed: null,
  ),
  // button_large.figma.ts
  AppButton(
    label: 'Label',
    style: AppButtonStyle.tertiary,
    size: AppSize.large,
    leadingIcon: const Icon(Icons.star),
    trailingIcon: const Icon(Icons.star),
    onPressed: () {},
  ),
  // button_large.figma.ts
  AppButton(
    style: AppButtonStyle.primary,
    size: AppSize.large,
    visited: true,
    onPressed: () {},
  ),
  // button_large.figma.ts
  AppButton(
    label: 'Label',
    style: AppButtonStyle.secondary,
    size: AppSize.large,
    leadingIcon: const Icon(Icons.star),
    trailingIcon: const Icon(Icons.star),
    onPressed: () {},
  ),
  // button_large.figma.ts
  AppButton(
    style: AppButtonStyle.tertiary,
    size: AppSize.large,
    onPressed: () {},
  ),
  // button_medium.figma.ts
  AppButton(
    label: 'Label',
    style: AppButtonStyle.primary,
    size: AppSize.medium,
    leadingIcon: const Icon(Icons.star),
    trailingIcon: const Icon(Icons.star),
    onPressed: () {},
  ),
  // button_medium.figma.ts
  AppButton(
    style: AppButtonStyle.secondary,
    size: AppSize.medium,
    onPressed: null,
  ),
  // button_medium.figma.ts
  AppButton(
    label: 'Label',
    style: AppButtonStyle.tertiary,
    size: AppSize.medium,
    leadingIcon: const Icon(Icons.star),
    trailingIcon: const Icon(Icons.star),
    onPressed: () {},
  ),
  // button_medium.figma.ts
  AppButton(
    style: AppButtonStyle.primary,
    size: AppSize.medium,
    visited: true,
    onPressed: () {},
  ),
  // button_medium.figma.ts
  AppButton(
    label: 'Label',
    style: AppButtonStyle.secondary,
    size: AppSize.medium,
    leadingIcon: const Icon(Icons.star),
    trailingIcon: const Icon(Icons.star),
    onPressed: () {},
  ),
  // button_medium.figma.ts
  AppButton(
    style: AppButtonStyle.tertiary,
    size: AppSize.medium,
    onPressed: () {},
  ),
  // button_small.figma.ts
  AppButton(
    label: 'Label',
    style: AppButtonStyle.primary,
    size: AppSize.small,
    leadingIcon: const Icon(Icons.star),
    trailingIcon: const Icon(Icons.star),
    onPressed: () {},
  ),
  // button_small.figma.ts
  AppButton(
    style: AppButtonStyle.secondary,
    size: AppSize.small,
    onPressed: null,
  ),
  // button_small.figma.ts
  AppButton(
    label: 'Label',
    style: AppButtonStyle.tertiary,
    size: AppSize.small,
    leadingIcon: const Icon(Icons.star),
    trailingIcon: const Icon(Icons.star),
    onPressed: () {},
  ),
  // button_small.figma.ts
  AppButton(
    style: AppButtonStyle.primary,
    size: AppSize.small,
    visited: true,
    onPressed: () {},
  ),
  // button_small.figma.ts
  AppButton(
    label: 'Label',
    style: AppButtonStyle.secondary,
    size: AppSize.small,
    leadingIcon: const Icon(Icons.star),
    trailingIcon: const Icon(Icons.star),
    onPressed: () {},
  ),
  // button_small.figma.ts
  AppButton(
    style: AppButtonStyle.tertiary,
    size: AppSize.small,
    onPressed: () {},
  ),
  // button_vertical_large.figma.ts
  AppButton(
    label: 'Label',
    style: AppButtonStyle.primary,
    size: AppSize.large,
    orientation: AppButtonOrientation.vertical,
    leadingIcon: const Icon(Icons.star),
    trailingIcon: const Icon(Icons.star),
    onPressed: () {},
  ),
  // button_vertical_large.figma.ts
  AppButton(
    style: AppButtonStyle.secondary,
    size: AppSize.large,
    orientation: AppButtonOrientation.vertical,
    onPressed: () {},
  ),
  // button_vertical_large.figma.ts
  AppButton(
    label: 'Label',
    style: AppButtonStyle.tertiary,
    size: AppSize.large,
    orientation: AppButtonOrientation.vertical,
    leadingIcon: const Icon(Icons.star),
    trailingIcon: const Icon(Icons.star),
    onPressed: null,
  ),
  // button_vertical_large.figma.ts
  AppButton(
    style: AppButtonStyle.primary,
    size: AppSize.large,
    orientation: AppButtonOrientation.vertical,
    onPressed: () {},
  ),
  // button_vertical_large.figma.ts
  AppButton(
    label: 'Label',
    style: AppButtonStyle.secondary,
    size: AppSize.large,
    orientation: AppButtonOrientation.vertical,
    leadingIcon: const Icon(Icons.star),
    trailingIcon: const Icon(Icons.star),
    visited: true,
    onPressed: () {},
  ),
  // button_vertical_large.figma.ts
  AppButton(
    style: AppButtonStyle.tertiary,
    size: AppSize.large,
    orientation: AppButtonOrientation.vertical,
    onPressed: () {},
  ),
  // button_vertical_medium.figma.ts
  AppButton(
    label: 'Label',
    style: AppButtonStyle.primary,
    size: AppSize.medium,
    orientation: AppButtonOrientation.vertical,
    leadingIcon: const Icon(Icons.star),
    trailingIcon: const Icon(Icons.star),
    onPressed: () {},
  ),
  // button_vertical_medium.figma.ts
  AppButton(
    style: AppButtonStyle.secondary,
    size: AppSize.medium,
    orientation: AppButtonOrientation.vertical,
    onPressed: () {},
  ),
  // button_vertical_medium.figma.ts
  AppButton(
    label: 'Label',
    style: AppButtonStyle.tertiary,
    size: AppSize.medium,
    orientation: AppButtonOrientation.vertical,
    leadingIcon: const Icon(Icons.star),
    trailingIcon: const Icon(Icons.star),
    onPressed: null,
  ),
  // button_vertical_medium.figma.ts
  AppButton(
    style: AppButtonStyle.primary,
    size: AppSize.medium,
    orientation: AppButtonOrientation.vertical,
    onPressed: () {},
  ),
  // button_vertical_medium.figma.ts
  AppButton(
    label: 'Label',
    style: AppButtonStyle.secondary,
    size: AppSize.medium,
    orientation: AppButtonOrientation.vertical,
    leadingIcon: const Icon(Icons.star),
    trailingIcon: const Icon(Icons.star),
    visited: true,
    onPressed: () {},
  ),
  // button_vertical_medium.figma.ts
  AppButton(
    style: AppButtonStyle.tertiary,
    size: AppSize.medium,
    orientation: AppButtonOrientation.vertical,
    onPressed: () {},
  ),
  // button_vertical_small.figma.ts
  AppButton(
    label: 'Label',
    style: AppButtonStyle.primary,
    size: AppSize.small,
    orientation: AppButtonOrientation.vertical,
    leadingIcon: const Icon(Icons.star),
    trailingIcon: const Icon(Icons.star),
    onPressed: () {},
  ),
  // button_vertical_small.figma.ts
  AppButton(
    style: AppButtonStyle.secondary,
    size: AppSize.small,
    orientation: AppButtonOrientation.vertical,
    onPressed: () {},
  ),
  // button_vertical_small.figma.ts
  AppButton(
    label: 'Label',
    style: AppButtonStyle.tertiary,
    size: AppSize.small,
    orientation: AppButtonOrientation.vertical,
    leadingIcon: const Icon(Icons.star),
    trailingIcon: const Icon(Icons.star),
    onPressed: null,
  ),
  // button_vertical_small.figma.ts
  AppButton(
    style: AppButtonStyle.primary,
    size: AppSize.small,
    orientation: AppButtonOrientation.vertical,
    onPressed: () {},
  ),
  // button_vertical_small.figma.ts
  AppButton(
    label: 'Label',
    style: AppButtonStyle.secondary,
    size: AppSize.small,
    orientation: AppButtonOrientation.vertical,
    leadingIcon: const Icon(Icons.star),
    trailingIcon: const Icon(Icons.star),
    visited: true,
    onPressed: () {},
  ),
  // button_vertical_small.figma.ts
  AppButton(
    style: AppButtonStyle.tertiary,
    size: AppSize.small,
    orientation: AppButtonOrientation.vertical,
    onPressed: () {},
  ),
  // cabin_poi.figma.ts
  CabinPoi(onTap: () {}),
  // cabin_poi.figma.ts
  CabinPoi(onTap: () {}),
  // cabin_poi.figma.ts
  CabinPoi(onTap: () {}),
  // cabin_poi.figma.ts
  CabinPoi(onTap: () {}),
  // cabin_poi.figma.ts
  CabinPoi(onTap: () {}),
  // cabin_poi.figma.ts
  CabinPoi(onTap: () {}),
  // checkbox.figma.ts
  AppCheckbox(
    value: true,
    label: 'Label',
    onChanged: (value) {},
  ),
  // checkbox.figma.ts
  AppCheckbox(
    value: false,
    onChanged: (value) {},
  ),
  // checkbox.figma.ts
  AppCheckbox(
    value: false,
    label: 'Label',
    onChanged: (value) {},
  ),
  // checkbox.figma.ts
  AppCheckbox(
    value: null,
    tristate: true,
    onChanged: (value) {},
  ),
  // checkbox.figma.ts
  AppCheckbox(
    value: false,
    label: 'Label',
    onChanged: null,
  ),
  // checkbox.figma.ts
  AppCheckbox(
    value: true,
    onChanged: (value) {},
  ),
  // checkbox_icon.figma.ts
  AppCheckbox(
    value: true,
    onChanged: (value) {},
  ),
  // checkbox_icon.figma.ts
  AppCheckbox(
    value: null,
    tristate: true,
    onChanged: (value) {},
  ),
  // checkbox_icon.figma.ts
  AppCheckbox(
    value: false,
    onChanged: (value) {},
  ),
  // checkbox_icon.figma.ts
  AppCheckbox(
    value: false,
    onChanged: (value) {},
  ),
  // checkbox_icon.figma.ts
  AppCheckbox(
    value: false,
    onChanged: null,
  ),
  // checkbox_icon.figma.ts
  AppCheckbox(
    value: true,
    onChanged: (value) {},
  ),
  // chip_large.figma.ts
  AppChip(
    label: 'Label',
    size: AppSize.large,
    onSelected: (selected) {},
    onDeleted: () {},
  ),
  // chip_large.figma.ts
  AppChip(
    label: 'Label',
    size: AppSize.large,
    onSelected: (selected) {},
  ),
  // chip_large.figma.ts
  AppChip(
    label: 'Label',
    size: AppSize.large,
    onSelected: (selected) {},
    onDeleted: () {},
  ),
  // chip_large.figma.ts
  AppChip(
    label: 'Label',
    size: AppSize.large,
    enabled: false,
    onSelected: (selected) {},
  ),
  // chip_large.figma.ts
  AppChip(
    label: 'Label',
    size: AppSize.large,
    selected: true,
    onSelected: (selected) {},
    onDeleted: () {},
  ),
  // chip_large.figma.ts
  AppChip(
    label: 'Label',
    size: AppSize.large,
    onSelected: (selected) {},
  ),
  // chip_medium.figma.ts
  AppChip(
    label: 'Label',
    size: AppSize.medium,
    onSelected: (selected) {},
    onDeleted: () {},
  ),
  // chip_medium.figma.ts
  AppChip(
    label: 'Label',
    size: AppSize.medium,
    onSelected: (selected) {},
  ),
  // chip_medium.figma.ts
  AppChip(
    label: 'Label',
    size: AppSize.medium,
    onSelected: (selected) {},
    onDeleted: () {},
  ),
  // chip_medium.figma.ts
  AppChip(
    label: 'Label',
    size: AppSize.medium,
    enabled: false,
    onSelected: (selected) {},
  ),
  // chip_medium.figma.ts
  AppChip(
    label: 'Label',
    size: AppSize.medium,
    selected: true,
    onSelected: (selected) {},
    onDeleted: () {},
  ),
  // chip_medium.figma.ts
  AppChip(
    label: 'Label',
    size: AppSize.medium,
    onSelected: (selected) {},
  ),
  // chip_small.figma.ts
  AppChip(
    label: 'Label',
    size: AppSize.small,
    onSelected: (selected) {},
    onDeleted: () {},
  ),
  // chip_small.figma.ts
  AppChip(
    label: 'Label',
    size: AppSize.small,
    onSelected: (selected) {},
  ),
  // chip_small.figma.ts
  AppChip(
    label: 'Label',
    size: AppSize.small,
    onSelected: (selected) {},
    onDeleted: () {},
  ),
  // chip_small.figma.ts
  AppChip(
    label: 'Label',
    size: AppSize.small,
    enabled: false,
    onSelected: (selected) {},
  ),
  // chip_small.figma.ts
  AppChip(
    label: 'Label',
    size: AppSize.small,
    selected: true,
    onSelected: (selected) {},
    onDeleted: () {},
  ),
  // chip_small.figma.ts
  AppChip(
    label: 'Label',
    size: AppSize.small,
    onSelected: (selected) {},
  ),
  // link.figma.ts
  AppLink(
    text: 'Text',
    icon: const Icon(Icons.star),
    onTap: () {},
  ),
  // link.figma.ts
  AppLink(
    text: 'Text',
    inList: true,
    onTap: () {},
  ),
  // link.figma.ts
  AppLink(
    text: 'Text',
    icon: const Icon(Icons.star),
    visited: true,
    onTap: () {},
  ),
  // link.figma.ts
  AppLink(
    text: 'Text',
    inList: true,
    onTap: null,
  ),
  // link.figma.ts
  AppLink(
    text: 'Text',
    icon: const Icon(Icons.star),
    onTap: () {},
  ),
  // link.figma.ts
  AppLink(
    text: 'Text',
    inList: true,
    onTap: () {},
  ),
  // main_map_navigation.figma.ts
  MainMapNavigation(
    onHome: () {},
    onZoomIn: () {},
    onZoomOut: () {},
    onCompassNorth: () {},
    userLocationMode: UserLocationMode.notActive,
    onUserLocation: () {},
  ),
  // main_map_navigation.figma.ts
  MainMapNavigation(
  ),
  // main_map_navigation.figma.ts
  MainMapNavigation(
    onHome: () {},
    onZoomIn: () {},
    onZoomOut: () {},
    onCompassNorth: () {},
    userLocationMode: UserLocationMode.notActive,
    onUserLocation: () {},
  ),
  // main_map_navigation.figma.ts
  MainMapNavigation(
  ),
  // main_map_navigation.figma.ts
  MainMapNavigation(
    onHome: () {},
    onZoomIn: () {},
    onZoomOut: () {},
    onCompassNorth: () {},
    userLocationMode: UserLocationMode.notActive,
    onUserLocation: () {},
  ),
  // main_map_navigation.figma.ts
  MainMapNavigation(
  ),
  // map_button.figma.ts
  MapButton(
    icon: const Icon(Icons.star),
    label: 'Label',
    onPressed: () {},
  ),
  // map_button.figma.ts
  MapButton(
    icon: const Icon(Icons.star),
    onPressed: () {},
  ),
  // map_button.figma.ts
  MapButton(
    icon: const Icon(Icons.star),
    label: 'Label',
    onPressed: () {},
  ),
  // map_button.figma.ts
  MapButton(
    icon: const Icon(Icons.star),
    onPressed: () {},
  ),
  // map_button.figma.ts
  MapButton(
    icon: const Icon(Icons.star),
    label: 'Label',
    onPressed: () {},
  ),
  // map_button.figma.ts
  MapButton(
    icon: const Icon(Icons.star),
    onPressed: () {},
  ),
  // map_zoom.figma.ts
  MapZoomControl(
    onZoomIn: () {},
    onZoomOut: () {},
  ),
  // map_zoom.figma.ts
  MapZoomControl(
    onZoomIn: () {},
    onZoomOut: () {},
  ),
  // map_zoom.figma.ts
  MapZoomControl(
    onZoomIn: () {},
    onZoomOut: () {},
  ),
  // map_zoom.figma.ts
  MapZoomControl(
    onZoomIn: () {},
    onZoomOut: () {},
  ),
  // map_zoom.figma.ts
  MapZoomControl(
    onZoomIn: () {},
    onZoomOut: () {},
  ),
  // map_zoom.figma.ts
  MapZoomControl(
    onZoomIn: () {},
    onZoomOut: () {},
  ),
  // radio.figma.ts
  AppRadio<String>(
    value: 'verdi',
    groupValue: valgtVerdi,
    label: 'Label',
    onChanged: (value) {},
  ),
  // radio.figma.ts
  AppRadio<String>(
    value: 'verdi',
    groupValue: valgtVerdi,
    onChanged: (value) {},
  ),
  // radio.figma.ts
  AppRadio<String>(
    value: 'verdi',
    groupValue: 'verdi',
    label: 'Label',
    onChanged: (value) {},
  ),
  // radio.figma.ts
  AppRadio<String>(
    value: 'verdi',
    groupValue: valgtVerdi,
    onChanged: null,
  ),
  // radio.figma.ts
  AppRadio<String>(
    value: 'verdi',
    groupValue: valgtVerdi,
    label: 'Label',
    onChanged: (value) {},
  ),
  // radio.figma.ts
  AppRadio<String>(
    value: 'verdi',
    groupValue: valgtVerdi,
    onChanged: (value) {},
  ),
  // radio_icon.figma.ts
  AppRadio<String>(
    value: 'verdi',
    groupValue: valgtVerdi,
    onChanged: (value) {},
  ),
  // radio_icon.figma.ts
  AppRadio<String>(
    value: 'verdi',
    groupValue: valgtVerdi,
    onChanged: (value) {},
  ),
  // radio_icon.figma.ts
  AppRadio<String>(
    value: 'verdi',
    groupValue: 'verdi',
    onChanged: (value) {},
  ),
  // radio_icon.figma.ts
  AppRadio<String>(
    value: 'verdi',
    groupValue: valgtVerdi,
    onChanged: null,
  ),
  // radio_icon.figma.ts
  AppRadio<String>(
    value: 'verdi',
    groupValue: valgtVerdi,
    onChanged: (value) {},
  ),
  // radio_icon.figma.ts
  AppRadio<String>(
    value: 'verdi',
    groupValue: valgtVerdi,
    onChanged: (value) {},
  ),
  // search_bar.figma.ts
  AppSearchBar(
    placeholder: 'SearchField text',
    iconPosition: SearchIconPosition.left,
    onSubmitted: (query) {},
  ),
  // search_bar.figma.ts
  AppSearchBar(
    placeholder: 'SearchField text',
    rounded: true,
    iconPosition: null,
    showClear: false,
    buttonLabel: null,
    onSubmitted: (query) {},
  ),
  // search_bar.figma.ts
  AppSearchBar(
    placeholder: 'SearchField text',
    iconPosition: SearchIconPosition.left,
    onSubmitted: (query) {},
  ),
  // search_bar.figma.ts
  AppSearchBar(
    placeholder: 'SearchField text',
    rounded: true,
    iconPosition: null,
    showClear: false,
    buttonLabel: null,
    onSubmitted: (query) {},
  ),
  // search_bar.figma.ts
  AppSearchBar(
    placeholder: 'SearchField text',
    iconPosition: SearchIconPosition.left,
    onSubmitted: (query) {},
  ),
  // search_bar.figma.ts
  AppSearchBar(
    placeholder: 'SearchField text',
    rounded: true,
    iconPosition: null,
    showClear: false,
    buttonLabel: null,
    onSubmitted: (query) {},
  ),
  // secondary_map_navigation.figma.ts
  SecondaryMapNavigation(
    onMapLayers: () {},
    onBasemaps: () {},
    onLegend: () {},
    onMeasure: () {},
    onPrint: () {},
    onDraw: () {},
    onTools: () {},
    on3D: () {},
  ),
  // secondary_map_navigation.figma.ts
  SecondaryMapNavigation(
  ),
  // secondary_map_navigation.figma.ts
  SecondaryMapNavigation(
    onMapLayers: () {},
    onBasemaps: () {},
    onLegend: () {},
    onMeasure: () {},
    onPrint: () {},
    onDraw: () {},
    onTools: () {},
    on3D: () {},
  ),
  // secondary_map_navigation.figma.ts
  SecondaryMapNavigation(
  ),
  // secondary_map_navigation.figma.ts
  SecondaryMapNavigation(
    onMapLayers: () {},
    onBasemaps: () {},
    onLegend: () {},
    onMeasure: () {},
    onPrint: () {},
    onDraw: () {},
    onTools: () {},
    on3D: () {},
  ),
  // secondary_map_navigation.figma.ts
  SecondaryMapNavigation(
  ),
  // tab_bar_medium.figma.ts
  AppTabBar(
    size: AppSize.medium,
    tabs: const [
      AppTab(label: 'Tab Bar Button Small 1'),
      AppTab(label: 'Tab Bar Button Small 2'),
      AppTab(label: 'Tab Bar Button Small 3'),
      AppTab(label: 'Tab Bar Button Small 4'),
      AppTab(label: 'Tab Bar Button Small 5'),
      AppTab(label: 'Tab Bar Button Small 6'),
      AppTab(label: 'Tab Bar Button Small 7'),
      AppTab(label: 'Tab Bar Button Small 8'),
    ],
    selectedIndex: 1,
    onChanged: (index) {},
  ),
  // tab_bar_medium.figma.ts
  AppTabBar(
    size: AppSize.medium,
    tabs: const [
      AppTab(label: 'Tab Bar Button Small 1'),
      AppTab(label: 'Tab Bar Button Small 2'),
      AppTab(label: 'Tab Bar Button Small 3'),
      AppTab(label: 'Tab Bar Button Small 4'),
      AppTab(label: 'Tab Bar Button Small 5'),
      AppTab(label: 'Tab Bar Button Small 6'),
      AppTab(label: 'Tab Bar Button Small 7'),
      AppTab(label: 'Tab Bar Button Small 8'),
    ],
    selectedIndex: 1,
    onChanged: (index) {},
  ),
  // tab_bar_medium.figma.ts
  AppTabBar(
    size: AppSize.medium,
    tabs: const [
      AppTab(label: 'Tab Bar Button Small 1'),
      AppTab(label: 'Tab Bar Button Small 2'),
      AppTab(label: 'Tab Bar Button Small 3'),
      AppTab(label: 'Tab Bar Button Small 4'),
      AppTab(label: 'Tab Bar Button Small 5'),
      AppTab(label: 'Tab Bar Button Small 6'),
      AppTab(label: 'Tab Bar Button Small 7'),
      AppTab(label: 'Tab Bar Button Small 8'),
    ],
    selectedIndex: 1,
    onChanged: (index) {},
  ),
  // tab_bar_medium.figma.ts
  AppTabBar(
    size: AppSize.medium,
    tabs: const [
      AppTab(label: 'Tab Bar Button Small 1'),
      AppTab(label: 'Tab Bar Button Small 2'),
      AppTab(label: 'Tab Bar Button Small 3'),
      AppTab(label: 'Tab Bar Button Small 4'),
      AppTab(label: 'Tab Bar Button Small 5'),
      AppTab(label: 'Tab Bar Button Small 6'),
      AppTab(label: 'Tab Bar Button Small 7'),
      AppTab(label: 'Tab Bar Button Small 8'),
    ],
    selectedIndex: 1,
    onChanged: (index) {},
  ),
  // tab_bar_medium.figma.ts
  AppTabBar(
    size: AppSize.medium,
    tabs: const [
      AppTab(label: 'Tab Bar Button Small 1'),
      AppTab(label: 'Tab Bar Button Small 2'),
      AppTab(label: 'Tab Bar Button Small 3'),
      AppTab(label: 'Tab Bar Button Small 4'),
      AppTab(label: 'Tab Bar Button Small 5'),
      AppTab(label: 'Tab Bar Button Small 6'),
      AppTab(label: 'Tab Bar Button Small 7'),
      AppTab(label: 'Tab Bar Button Small 8'),
    ],
    selectedIndex: 1,
    onChanged: (index) {},
  ),
  // tab_bar_medium.figma.ts
  AppTabBar(
    size: AppSize.medium,
    tabs: const [
      AppTab(label: 'Tab Bar Button Small 1'),
      AppTab(label: 'Tab Bar Button Small 2'),
      AppTab(label: 'Tab Bar Button Small 3'),
      AppTab(label: 'Tab Bar Button Small 4'),
      AppTab(label: 'Tab Bar Button Small 5'),
      AppTab(label: 'Tab Bar Button Small 6'),
      AppTab(label: 'Tab Bar Button Small 7'),
      AppTab(label: 'Tab Bar Button Small 8'),
    ],
    selectedIndex: 1,
    onChanged: (index) {},
  ),
  // tab_bar_small.figma.ts
  AppTabBar(
    size: AppSize.small,
    tabs: const [
      AppTab(label: 'Tab Bar Button Small 1'),
      AppTab(label: 'Tab Bar Button Small 2'),
      AppTab(label: 'Tab Bar Button Small 3'),
      AppTab(label: 'Tab Bar Button Small 4'),
      AppTab(label: 'Tab Bar Button Small 5'),
      AppTab(label: 'Tab Bar Button Small 6'),
      AppTab(label: 'Tab Bar Button Small 7'),
      AppTab(label: 'Tab Bar Button Small 8'),
    ],
    selectedIndex: 1,
    onChanged: (index) {},
  ),
  // tab_bar_small.figma.ts
  AppTabBar(
    size: AppSize.small,
    tabs: const [
    ],
    selectedIndex: 0,
    onChanged: (index) {},
  ),
  // tab_bar_small.figma.ts
  AppTabBar(
    size: AppSize.small,
    tabs: const [
      AppTab(label: 'Tab Bar Button Small 1'),
      AppTab(label: 'Tab Bar Button Small 2'),
      AppTab(label: 'Tab Bar Button Small 3'),
      AppTab(label: 'Tab Bar Button Small 4'),
      AppTab(label: 'Tab Bar Button Small 5'),
      AppTab(label: 'Tab Bar Button Small 6'),
      AppTab(label: 'Tab Bar Button Small 7'),
      AppTab(label: 'Tab Bar Button Small 8'),
    ],
    selectedIndex: 1,
    onChanged: (index) {},
  ),
  // tab_bar_small.figma.ts
  AppTabBar(
    size: AppSize.small,
    tabs: const [
    ],
    selectedIndex: 0,
    onChanged: (index) {},
  ),
  // tab_bar_small.figma.ts
  AppTabBar(
    size: AppSize.small,
    tabs: const [
      AppTab(label: 'Tab Bar Button Small 1'),
      AppTab(label: 'Tab Bar Button Small 2'),
      AppTab(label: 'Tab Bar Button Small 3'),
      AppTab(label: 'Tab Bar Button Small 4'),
      AppTab(label: 'Tab Bar Button Small 5'),
      AppTab(label: 'Tab Bar Button Small 6'),
      AppTab(label: 'Tab Bar Button Small 7'),
      AppTab(label: 'Tab Bar Button Small 8'),
    ],
    selectedIndex: 1,
    onChanged: (index) {},
  ),
  // tab_bar_small.figma.ts
  AppTabBar(
    size: AppSize.small,
    tabs: const [
    ],
    selectedIndex: 0,
    onChanged: (index) {},
  ),
  // tab_button_medium.figma.ts
  AppTabButton(
    label: 'Label',
    size: AppSize.medium,
    icon: const Icon(Icons.star),
    onPressed: () {},
  ),
  // tab_button_medium.figma.ts
  AppTabButton(
    label: 'Label',
    size: AppSize.medium,
    onPressed: () {},
  ),
  // tab_button_medium.figma.ts
  AppTabButton(
    label: 'Label',
    size: AppSize.medium,
    icon: const Icon(Icons.star),
    onPressed: () {},
  ),
  // tab_button_medium.figma.ts
  AppTabButton(
    label: 'Label',
    size: AppSize.medium,
    onPressed: null,
  ),
  // tab_button_medium.figma.ts
  AppTabButton(
    label: 'Label',
    size: AppSize.medium,
    icon: const Icon(Icons.star),
    active: true,
    onPressed: () {},
  ),
  // tab_button_medium.figma.ts
  AppTabButton(
    label: 'Label',
    size: AppSize.medium,
    onPressed: () {},
  ),
  // tab_button_small.figma.ts
  AppTabButton(
    label: 'Label',
    size: AppSize.small,
    icon: const Icon(Icons.star),
    onPressed: () {},
  ),
  // tab_button_small.figma.ts
  AppTabButton(
    label: 'Label',
    size: AppSize.small,
    onPressed: () {},
  ),
  // tab_button_small.figma.ts
  AppTabButton(
    label: 'Label',
    size: AppSize.small,
    icon: const Icon(Icons.star),
    onPressed: () {},
  ),
  // tab_button_small.figma.ts
  AppTabButton(
    label: 'Label',
    size: AppSize.small,
    onPressed: null,
  ),
  // tab_button_small.figma.ts
  AppTabButton(
    label: 'Label',
    size: AppSize.small,
    icon: const Icon(Icons.star),
    active: true,
    onPressed: () {},
  ),
  // tab_button_small.figma.ts
  AppTabButton(
    label: 'Label',
    size: AppSize.small,
    onPressed: () {},
  ),
  // table_cell_large.figma.ts
  AppTableCell(
    text: 'Label',
    size: AppSize.large,
    content: AppTableCellContent.text,
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_cell_large.figma.ts
  AppTableCell(
    text: 'Label',
    size: AppSize.large,
    odd: true,
    content: AppTableCellContent.number,
  ),
  // table_cell_large.figma.ts
  AppTableCell(
    text: 'Label',
    size: AppSize.large,
    content: AppTableCellContent.link,
    onTap: () {},
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_cell_large.figma.ts
  AppTableCell(
    text: 'Label',
    size: AppSize.large,
    odd: true,
    content: AppTableCellContent.input,
  ),
  // table_cell_large.figma.ts
  AppTableCell(
    text: 'Label',
    size: AppSize.large,
    content: AppTableCellContent.icon,
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_cell_large.figma.ts
  AppTableCell(
    text: 'Label',
    size: AppSize.large,
    odd: true,
    content: AppTableCellContent.status,
  ),
  // table_cell_medium.figma.ts
  AppTableCell(
    text: 'Label',
    size: AppSize.medium,
    content: AppTableCellContent.text,
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_cell_medium.figma.ts
  AppTableCell(
    text: 'Label',
    size: AppSize.medium,
    odd: true,
    content: AppTableCellContent.number,
  ),
  // table_cell_medium.figma.ts
  AppTableCell(
    text: 'Label',
    size: AppSize.medium,
    content: AppTableCellContent.link,
    onTap: () {},
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_cell_medium.figma.ts
  AppTableCell(
    text: 'Label',
    size: AppSize.medium,
    odd: true,
    content: AppTableCellContent.input,
  ),
  // table_cell_medium.figma.ts
  AppTableCell(
    text: 'Label',
    size: AppSize.medium,
    content: AppTableCellContent.icon,
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_cell_medium.figma.ts
  AppTableCell(
    text: 'Label',
    size: AppSize.medium,
    odd: true,
    content: AppTableCellContent.status,
  ),
  // table_cell_small.figma.ts
  AppTableCell(
    text: 'Label',
    size: AppSize.small,
    content: AppTableCellContent.text,
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_cell_small.figma.ts
  AppTableCell(
    text: 'Label',
    size: AppSize.small,
    odd: true,
    content: AppTableCellContent.number,
  ),
  // table_cell_small.figma.ts
  AppTableCell(
    text: 'Label',
    size: AppSize.small,
    content: AppTableCellContent.link,
    onTap: () {},
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_cell_small.figma.ts
  AppTableCell(
    text: 'Label',
    size: AppSize.small,
    odd: true,
    content: AppTableCellContent.input,
  ),
  // table_cell_small.figma.ts
  AppTableCell(
    text: 'Label',
    size: AppSize.small,
    content: AppTableCellContent.icon,
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_cell_small.figma.ts
  AppTableCell(
    text: 'Label',
    size: AppSize.small,
    odd: true,
    content: AppTableCellContent.status,
  ),
  // table_header_large.figma.ts
  AppTableHeaderCell(
    size: AppSize.large,
    label: 'Label',
    onSort: () {},
    onFilter: () {},
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_header_large.figma.ts
  AppTableHeaderCell(
    size: AppSize.large,
    numeric: true,
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_header_large.figma.ts
  AppTableHeaderCell(
    size: AppSize.large,
    label: 'Label',
    onSort: () {},
    onFilter: () {},
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_header_large.figma.ts
  AppTableHeaderCell(
    size: AppSize.large,
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_header_large.figma.ts
  AppTableHeaderCell(
    size: AppSize.large,
    label: 'Label',
    numeric: true,
    onSort: () {},
    onFilter: () {},
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_header_large.figma.ts
  AppTableHeaderCell(
    size: AppSize.large,
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_header_medium.figma.ts
  AppTableHeaderCell(
    size: AppSize.medium,
    label: 'Label',
    onSort: () {},
    onFilter: () {},
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_header_medium.figma.ts
  AppTableHeaderCell(
    size: AppSize.medium,
    numeric: true,
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_header_medium.figma.ts
  AppTableHeaderCell(
    size: AppSize.medium,
    label: 'Label',
    onSort: () {},
    onFilter: () {},
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_header_medium.figma.ts
  AppTableHeaderCell(
    size: AppSize.medium,
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_header_medium.figma.ts
  AppTableHeaderCell(
    size: AppSize.medium,
    label: 'Label',
    numeric: true,
    onSort: () {},
    onFilter: () {},
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_header_medium.figma.ts
  AppTableHeaderCell(
    size: AppSize.medium,
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_header_small.figma.ts
  AppTableHeaderCell(
    size: AppSize.small,
    label: 'Label',
    onSort: () {},
    onFilter: () {},
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_header_small.figma.ts
  AppTableHeaderCell(
    size: AppSize.small,
    numeric: true,
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_header_small.figma.ts
  AppTableHeaderCell(
    size: AppSize.small,
    label: 'Label',
    onSort: () {},
    onFilter: () {},
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_header_small.figma.ts
  AppTableHeaderCell(
    size: AppSize.small,
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_header_small.figma.ts
  AppTableHeaderCell(
    size: AppSize.small,
    label: 'Label',
    numeric: true,
    onSort: () {},
    onFilter: () {},
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_header_small.figma.ts
  AppTableHeaderCell(
    size: AppSize.small,
    checkboxValue: false,
    onCheckboxChanged: (value) {},
  ),
  // table_pagination.figma.ts
  AppTablePagination(
    currentPage: 1,
    pageCount: 8,
    size: AppSize.small,
    onPageChanged: (page) {},
  ),
  // table_pagination.figma.ts
  AppTablePagination.compact(
    currentPage: 1,
    pageCount: 8,
    size: AppSize.medium,
    onPageChanged: (page) {},
  ),
  // table_pagination.figma.ts
  AppTablePagination(
    currentPage: 1,
    pageCount: 8,
    size: AppSize.large,
    onPageChanged: (page) {},
  ),
  // table_pagination.figma.ts
  AppTablePagination.compact(
    currentPage: 1,
    pageCount: 8,
    size: AppSize.small,
    onPageChanged: (page) {},
  ),
  // table_pagination.figma.ts
  AppTablePagination(
    currentPage: 1,
    pageCount: 8,
    size: AppSize.medium,
    onPageChanged: (page) {},
  ),
  // table_pagination.figma.ts
  AppTablePagination.compact(
    currentPage: 1,
    pageCount: 8,
    size: AppSize.large,
    onPageChanged: (page) {},
  ),
  // text_field_large.figma.ts
  AppTextField(
    size: AppSize.large,
    label: 'Label Text',
    initialValue: 'Input Text',
    preIcon: const Icon(Icons.star),
    postIcon: const Icon(Icons.star),
    showClear: true,
    onTapDropdown: () {},
  ),
  // text_field_large.figma.ts
  AppTextField(
    size: AppSize.large,
    initialValue: 'Input Text',
    readOnlyDisplay: true,
  ),
  // text_field_large.figma.ts
  AppTextField(
    size: AppSize.large,
    label: 'Label Text',
    initialValue: 'Input Text',
    preIcon: const Icon(Icons.star),
    postIcon: const Icon(Icons.star),
    showClear: true,
    onTapDropdown: () {},
  ),
  // text_field_large.figma.ts
  AppTextField(
    size: AppSize.large,
    initialValue: 'Input Text',
    readOnlyDisplay: true,
  ),
  // text_field_large.figma.ts
  AppTextField(
    size: AppSize.large,
    label: 'Label Text',
    initialValue: 'Input Text',
    preIcon: const Icon(Icons.star),
    postIcon: const Icon(Icons.star),
    showClear: true,
    onTapDropdown: () {},
    errorText: 'Feilmelding',
  ),
  // text_field_large.figma.ts
  AppTextField(
    size: AppSize.large,
    initialValue: 'Input Text',
    readOnlyDisplay: true,
    enabled: false,
  ),
  // text_field_medium.figma.ts
  AppTextField(
    size: AppSize.medium,
    label: 'Label Text',
    initialValue: 'Input Text',
    preIcon: const Icon(Icons.star),
    postIcon: const Icon(Icons.star),
    showClear: true,
    onTapDropdown: () {},
  ),
  // text_field_medium.figma.ts
  AppTextField(
    size: AppSize.medium,
    initialValue: 'Input Text',
    readOnlyDisplay: true,
  ),
  // text_field_medium.figma.ts
  AppTextField(
    size: AppSize.medium,
    label: 'Label Text',
    initialValue: 'Input Text',
    preIcon: const Icon(Icons.star),
    postIcon: const Icon(Icons.star),
    showClear: true,
    onTapDropdown: () {},
  ),
  // text_field_medium.figma.ts
  AppTextField(
    size: AppSize.medium,
    initialValue: 'Input Text',
    readOnlyDisplay: true,
  ),
  // text_field_medium.figma.ts
  AppTextField(
    size: AppSize.medium,
    label: 'Label Text',
    initialValue: 'Input Text',
    preIcon: const Icon(Icons.star),
    postIcon: const Icon(Icons.star),
    showClear: true,
    onTapDropdown: () {},
    errorText: 'Feilmelding',
  ),
  // text_field_medium.figma.ts
  AppTextField(
    size: AppSize.medium,
    initialValue: 'Input Text',
    readOnlyDisplay: true,
    enabled: false,
  ),
  // text_field_small.figma.ts
  AppTextField(
    size: AppSize.small,
    label: 'Label Text',
    initialValue: 'Input Text',
    preIcon: const Icon(Icons.star),
    postIcon: const Icon(Icons.star),
    showClear: true,
    onTapDropdown: () {},
  ),
  // text_field_small.figma.ts
  AppTextField(
    size: AppSize.small,
    initialValue: 'Input Text',
    readOnlyDisplay: true,
  ),
  // text_field_small.figma.ts
  AppTextField(
    size: AppSize.small,
    label: 'Label Text',
    initialValue: 'Input Text',
    preIcon: const Icon(Icons.star),
    postIcon: const Icon(Icons.star),
    showClear: true,
    onTapDropdown: () {},
  ),
  // text_field_small.figma.ts
  AppTextField(
    size: AppSize.small,
    initialValue: 'Input Text',
    readOnlyDisplay: true,
  ),
  // text_field_small.figma.ts
  AppTextField(
    size: AppSize.small,
    label: 'Label Text',
    initialValue: 'Input Text',
    preIcon: const Icon(Icons.star),
    postIcon: const Icon(Icons.star),
    showClear: true,
    onTapDropdown: () {},
    errorText: 'Feilmelding',
  ),
  // text_field_small.figma.ts
  AppTextField(
    size: AppSize.small,
    initialValue: 'Input Text',
    readOnlyDisplay: true,
    enabled: false,
  ),
  // user_location.figma.ts
  UserLocationButton(
    mode: UserLocationMode.notActive,
    onPressed: () {},
  ),
  // user_location.figma.ts
  UserLocationButton(
    mode: UserLocationMode.active,
    onPressed: () {},
  ),
  // user_location.figma.ts
  UserLocationButton(
    mode: UserLocationMode.north,
    onPressed: () {},
  ),
  // user_location.figma.ts
  UserLocationButton(
    mode: UserLocationMode.notActive,
    onPressed: () {},
  ),
  // user_location.figma.ts
  UserLocationButton(
    mode: UserLocationMode.active,
    onPressed: () {},
  ),
  // user_location.figma.ts
  UserLocationButton(
    mode: UserLocationMode.north,
    onPressed: () {},
  ),
];

void main() {
  test('Code Connect-snuttene kompilerer', () {
    // Kompilering er selve testen; enkelte kombinasjoner (f.eks. knapp uten
    // tekst og ikon) er ugyldige og konstrueres derfor ikke.
    expect(snippets, isA<Function>());
  });
}
