import { goto } from "$app/navigation";
import { Color } from "$src/models/Color";

export const updateQuery = (key: string, value: string | string[]): void => {

  const paramValue = Array.isArray(value) ? value.join(';') : value

  goto(`?${key}=${paramValue.replace(/#/g, '')}`, {
    keepfocus: true,
    replaceState: true,
    noscroll: true
  });
}

export const getColorsFromUrl = (key = 'colors'): Color[] | undefined => {
  const query = new URLSearchParams(location.search)
  const value = query.get(key)

  if (!value) return

  console.log(value);
  

  let colors
  
  if (value.includes(';')) {
    colors = value.split(';')
  } else {
    colors = [value]
  }

  return colors.map(c => c.trim()).map(c => new Color(c))
}

export const getColorFromUrl = (key = 'color'): Color | undefined => {
  return getColorsFromUrl(key)?.[0] || undefined
}