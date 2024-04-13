export function fixToastPosition() {
  const toastContainer = document.getElementById('toast-container');
  let isFixed = false
  if (toastContainer) {
    const position = window.getComputedStyle(toastContainer).getPropertyValue('position');
    console.log('Toast position:', position);
    if(position !== 'fixed') {
      console.log('Setting toast position to fixed');
      toastContainer.style.position = 'fixed';
    }
    isFixed = true;
  }
  return isFixed;
}
