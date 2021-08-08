import { ColorFormats, TinyColor } from "@ctrl/tinycolor";
import chroma from "chroma-js";

export class Color {

  public chroma: chroma.Color;
  public tinycolor: TinyColor;

  constructor(color: string) {
    this.chroma = chroma(color)
    this.tinycolor = new TinyColor(color)
  }

  public toString(format?: ColorFormats): string {
    return this.tinycolor.toString(format || this.tinycolor.format)
  }
}