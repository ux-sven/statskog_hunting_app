/**
 * Hindrer at hele siden zoomes med fingrene, slik en app oppfører seg.
 * Kartet zoomer fortsatt selv (ArcGIS håndterer sine egne berøringer).
 *
 * - Android/Chrome: `user-scalable=no` i viewport (index.html).
 * - iOS/Safari ignorerer `user-scalable=no`; derfor stoppes Safari sine
 *   `gesture*`-hendelser og dobbelttrykk-zoom her og med `touch-action` i CSS.
 *   `maximum-scale=1` hindrer at Safari zoomer inn når et tekstfelt får fokus.
 *
 * NB: Zoom er et hjelpemiddel for svaksynte (WCAG 1.4.4). Erstatt det med
 * en innstilling for tekststørrelse før appen brukes av andre enn testere.
 */
export function preventPageZoom() {
  const stop = (e: Event) => e.preventDefault();
  for (const type of ['gesturestart', 'gesturechange', 'gestureend']) {
    document.addEventListener(type, stop, { passive: false });
  }
  // Knipebevegelse utenfor kartet (eldre Safari uten gesture-hendelser).
  document.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches.length > 1 && !(e.target as Element).closest?.('.esri-view')) e.preventDefault();
    },
    { passive: false },
  );
}
