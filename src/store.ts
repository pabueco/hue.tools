import { mostReadable, TinyColor } from "@ctrl/tinycolor";
import { derived, Readable, Writable, writable } from "svelte/store";

export const primaryColor: Writable<chroma.Color> = writable()
export const complementColor: Readable<string> = derived(primaryColor, ($primaryColor) => new TinyColor($primaryColor?.hex()).complement().toHexString())
export const primaryColorText: Readable<string> = derived(primaryColor, ($primaryColor) => mostReadable($primaryColor.hex(), ['#fff', '#000']).toHexString())
export const primaryColorClamped: Readable<string> = derived(primaryColor, ($primaryColor) => $primaryColor?.luminance(0.5).saturate(1).hex())