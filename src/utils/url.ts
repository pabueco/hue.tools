import { goto } from '$app/navigation'
import { page } from '$app/stores'
import { Color } from '$src/models/Color'
import { get } from 'svelte/store'

/**
 * Write a list of colors to the URL.
 */
export const updateQuery = (key: string, value: string | string[]): void => {
  if (!value) return

  const paramValue = Array.isArray(value) ? value.join(';') : value

  const searchParams = get(page).url.searchParams
  searchParams.set(key, paramValue.replace(/#/g, ''))

  goto('?' + searchParams.toString(), {
    keepfocus: true,
    replaceState: true,
    noscroll: true,
  })
}

/**
 * Extract multiple colors from the URL.
 */
export const getColorsFromUrl = (key = 'colors'): Color[] | undefined => {
  const query = new URLSearchParams(location.search)
  const value = query.get(key)

  if (!value) return

  let colors

  if (value.includes(';')) {
    colors = value.split(';')
  } else {
    colors = [value]
  }

  return colors.map((c) => c.trim()).map((c) => new Color(c))
}

/**
 * Extract a single color from the URL.
 */
export const getColorFromUrl = (key = 'color'): Color | undefined => {
  return getColorsFromUrl(key)?.[0] || undefined
}

/**
 * Extract multiple colors from the URL.
 */
export const getQueryParam = (key: string, fallback = null): string => {
  const query = new URLSearchParams(location.search)
  return query.get(key) || fallback
}
