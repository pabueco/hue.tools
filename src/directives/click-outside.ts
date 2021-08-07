/** Dispatch event on click outside of node */
export function clickOutside(node: HTMLElement): { destroy: CallableFunction } {
  
  const handleClick = event => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent('clickoutside')
      )
    }
  }

	document.addEventListener('click', handleClick, true);
  
  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
	}
}