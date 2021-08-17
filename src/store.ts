import { derived, Readable, Writable, writable } from "svelte/store";
import type { Color } from "./models/Color";

export const primaryColor: Writable<Color> = writable()
export const complementColor: Readable<string> = derived(primaryColor, ($primaryColor) => $primaryColor?.tinycolor.complement().toHexString())
export const primaryColorText: Readable<string> = derived(primaryColor, ($primaryColor) => $primaryColor.textColor())
export const primaryColorClamped: Readable<string> = derived(primaryColor, ($primaryColor) => $primaryColor?.chroma.luminance(0.5).saturate(1).hex())

export const outputFormat: Writable<string> = writable()
