import { fixToastPosition } from '../utils/fixcss.service';
describe('fixToastPosition', () => {
  let toastContainer: HTMLElement;

  beforeEach(() => {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  });

  afterEach(() => {
    //document.body.removeChild(toastContainer);
  });

  it('should set toast position to fixed if it is not already fixed', () => {
    toastContainer.style.position = 'absolute';
    const result = fixToastPosition();
    expect(result).toBe(true);
    expect(toastContainer.style.position).toBe('fixed');
  });

  it('should not change toast position if it is already fixed', () => {
    toastContainer.style.position = 'fixed';
    const result = fixToastPosition();
    expect(result).toBe(true);
  });


});
