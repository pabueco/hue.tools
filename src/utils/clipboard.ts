// import { toast } from '@zerodevx/svelte-toast'
import { sample } from 'lodash'

/**
 * Copy a piece of text to the clipboard.
 *
 * @param event The native MouseEvent
 * @param text The text to copy to the clipboard
 * @param message The success message to display afterwards
 */
export const copyToClipboard = (
  event: MouseEvent,
  text: string | number,
  message?: string
): void => {
  navigator.clipboard.writeText(String(text)).then(() => {
    // toast.push(message || `Copied: ${text}`);
    showFloatingTooltip(event, message)
  })
}

/**
 * Shows a little floating tooltip thing that disappears after a few seconds.
 *
 * @param event The native MouseEvent
 * @param message The text to show
 */
const showFloatingTooltip = (event: MouseEvent, message = 'Copied!') => {
  const el = document.createElement('div')

  el.style.position = 'fixed'
  el.style.zIndex = '10000'
  el.style.transition = 'all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)'
  el.style.transform = `translateX(-50%) scale(0) rotate(${sample([
    -25,
    -12.5,
    12.5,
    25,
  ])}deg)`
  el.style.pointerEvents = 'none'

  el.style.backgroundColor = '#fff'
  el.style.color = '#000'

  // el.style.boxShadow = 'rgb(0 0 0 / 50%) 0px 3px 2px'
  el.className =
    'rounded-lg px-2 py-1 font-medium text-sm tracking-wide shadow-md'
  el.textContent = message

  const x = event.clientX
  const y = event.clientY

  el.style.left = `${x}px`
  el.style.top = `${y - 35}px`

  document.body.append(el)

  setTimeout(() => {
    el.style.transform = 'translateX(-50%) scale(1) rotate(0)'
  }, 50)
  setTimeout(() => {
    el.style.transition = 'transform 1500ms, opacity 1000ms'
    el.style.transform = 'translateX(-50%) translateY(-100px) scale(1)'
    el.style.opacity = '0'
  }, 750)

  setTimeout(() => {
    el.remove()
  }, 2000)
}
