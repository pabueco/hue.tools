import { toast } from '@zerodevx/svelte-toast'

export const copyToClipboard = (text: string | number, message?: string): void => {
  navigator.clipboard.writeText(String(text)).then(() =>
    toast.push(message || `Copied: ${text}`)
  )
};