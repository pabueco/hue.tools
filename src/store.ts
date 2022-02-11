import { derived, writable } from 'svelte/store'
import type { Readable, Writable } from 'svelte/store'
import { Color } from './models/Color'

/**
 * The current primary color.
 * This is mainly used for the site background.
 */
export const primaryColor: Writable<Color> = writable()

/**
 * The complementary color of the current primary color.
 * Mainly used for text selection background.
 */
export const complementColor: Readable<
  Color | undefined
> = derived(primaryColor, ($primaryColor) =>
  $primaryColor
    ? Color.fromTinyColor($primaryColor?.tinycolor.complement())
    : undefined
)

/**
 * The color used for text on top of the primary color.
 * It's either black or white.
 */
export const primaryColorText: Readable<string> = derived(
  primaryColor,
  ($primaryColor) => $primaryColor && $primaryColor.textColor()
)

/**
 * The primary color but fixed the a certain brightness that is always readable.
 * This is used for elements like the logo, buttons and links.
 */
export const primaryColorClamped: Readable<string> = derived(
  primaryColor,
  ($primaryColor) => $primaryColor?.chroma.luminance(0.5).saturate(1).hex()
)
export const complementColorClamped: Readable<string> = derived(
  complementColor,
  ($complementColor) =>
    $complementColor?.chroma.luminance(0.5).saturate(1).hex()
)

/**
 * The selected color format used to display generated colors and when copying a color to the clipboard.
 */
export const outputFormat: Writable<string> = writable()
