import { ColorInput, mostReadable, RGBA, TinyColor } from '@ctrl/tinycolor'
import type { ColorFormats } from '@ctrl/tinycolor'
import chroma from 'chroma-js'
import { uniqueId } from 'lodash-es'

export class Color {
  public chroma: chroma.Color
  public tinycolor: TinyColor

  public computedTextColor: string

  public id: string

  constructor(color?: ColorInput) {
    this.id = uniqueId('color_')
    if (color) {
      this.update(color)
    }
  }

  public toString(format?: ColorFormats | string): string {
    if (format === 'hsi') {
      return this.chroma
        .hsi()
        .map((n) => n.toFixed(3))
        .toString()
    } else if (format === 'lab') {
      return this.chroma
        .lab()
        .map((n) => n.toFixed(3))
        .toString()
    }

    return this.tinycolor.toString(
      (format as ColorFormats) || this.tinycolor.format
    )
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
    if (!this.computedTextColor) {
      this.computedTextColor = mostReadable(this.toString('hex'), [
        '#fff',
        '#000',
      ]).toHexString()
    }

    return this.computedTextColor
  }

  public hex(): string {
    return this.chroma.hex()
  }

  public update(color: ColorInput): Color {
    this.tinycolor = new TinyColor(color)
    this.chroma = chroma(this.tinycolor.toRgbString())

    return this
  }

  static random(alpha = 1): Color {
    const c = chroma.random().alpha(alpha)
    return Color.fromChroma(c)
  }
}
