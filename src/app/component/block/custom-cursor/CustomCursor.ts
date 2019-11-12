import AbstractBlock from '../../AbstractComponent';
import { getComponentForElement } from 'muban-core';
import { CursorController } from './CursorController';

export default class CustomCursor extends AbstractBlock {
  public static displayName: string = 'custom-cursor';

  public static getInstance = (element?: HTMLElement) => {
    const cursorElement: HTMLElement | null =
      element || document.body.querySelector(`[data-component="custom-cursor"]`);

    const instance = cursorElement && getComponentForElement(cursorElement);

    if (!instance) throw new Error(`Couldn't get CustomCursor instance.`);

    return instance as CustomCursor;
  };

  private cursor = this.getElement('[data-cursor-container]');
  private cursors: HTMLElement[] = Array.from(this.cursor.querySelectorAll('[data-cursor]'));
  private ids = this.cursors.map(element => {
    const id = element.getAttribute('data-cursor');
    if (!id) throw new Error(`CustomCursor: Coudn't get data-cursor attribute for element.`);
    return id;
  });

  private activeCursorId: string | null = null;
  private cursorController: CursorController;
  private registeredElements: Array<{ element: HTMLElement; removeListeners: () => void }> = [];

  constructor(element: HTMLElement) {
    super(element);

    this.cursorController = new CursorController(this.cursor);
    this.unsetCursor();
  }

  public isValidCursorId = (cursorId: string) => this.ids.includes(cursorId);

  public setCursor = (cursorId: string) => {
    if (!this.isValidCursorId(cursorId)) throw new Error('CustomCursor: Invalid cursor id.');
    if (this.activeCursorId === cursorId) return;

    // here you would do whatever kind of transition you want
    // I'm just going to hide everything that isn't the cursor with the cursorId
    // the display flex is because the info-cursor has display flex...
    const index = this.ids.findIndex(id => id === cursorId);
    this.cursors.forEach(
      (cursorElement, id) => (cursorElement.style.display = index === id ? 'flex' : 'none'),
    );
  };

  public unsetCursor = () => {
    this.cursors.forEach(cursorElement => (cursorElement.style.display = 'none'));
  };

  public setCustomCursorForElement(element: HTMLElement, cursorId: string) {
    const enterHandler = () => this.setCursor(cursorId);
    element.addEventListener('mouseenter', enterHandler);
    element.addEventListener('mouseleave', this.unsetCursor);

    this.registeredElements.push({
      element,
      removeListeners: () => {
        element.removeEventListener('mouseenter', enterHandler);
        element.removeEventListener('mouseleave', this.unsetCursor);
      },
    });

    return () => this.unsetCustomCursorForElement(element);
  }

  public unsetCustomCursorForElement(element: HTMLElement) {
    this.registeredElements = this.registeredElements.filter(({ element: el, removeListeners }) => {
      if (element !== el) return true;

      removeListeners();
      return false;
    });
  }

  public dispose() {
    this.cursorController.dispose();
    super.dispose();
  }
}
