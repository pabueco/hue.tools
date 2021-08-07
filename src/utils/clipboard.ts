import { toast } from '@zerodevx/svelte-toast'

export const copyToClipboard = (text: string | number): void => {
  navigator.clipboard.writeText(String(text)).then(() =>
    toast.push('Copied to clipboard!')
  )
};