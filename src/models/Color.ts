import { ColorFormats, mostReadable, TinyColor } from "@ctrl/tinycolor";
import chroma from "chroma-js";

export class Color {

  public chroma: chroma.Color;
  public tinycolor: TinyColor;

  constructor(color?: string) {
    if (color) {
      this.chroma = chroma(color)
      this.tinycolor = new TinyColor(color)
    }
  }

  public toString(format?: ColorFormats | string): string {
     if (format === 'hsi') {
      return this.chroma.hsi().toString()
    } else if (format === 'lab') {
      return this.chroma.lab().toString()
    }

    return this.tinycolor.toString((format as ColorFormats) || this.tinycolor.format)
  }

  static fromChroma(color: chroma.Color): Color {
    const c = new Color()
    c.chroma = color
    c.tinycolor = new TinyColor(color.hex())
    return c
  }

  static fromTinyColor(color: TinyColor): Color {
    const c = new Color()
    c.chroma = chroma(color.toHexString())
    c.tinycolor = color
    return c
  }

  public textColor(): string {
    return mostReadable(this.chroma.hex(), ['#fff', '#000']).toHexString()
  }

  public hex(): string {
    return this.chroma.hex()
  }

  static random(): Color {
    const c = chroma.random()
    return Color.fromChroma(c)
  }
}