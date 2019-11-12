import AbstractBlock from '../../AbstractBlock';
import { getComponentForElement } from 'muban-core';

export default class InfoCursor extends AbstractBlock {
  public static displayName: string = 'info-cursor';

  public static getInstance = (element: HTMLElement) => {
    const instance = getComponentForElement(element) as InfoCursor | null;

    if (!instance) throw new Error(`Couldn't get InfoCursor instance.`);

    return instance;
  };

  constructor(el: HTMLElement) {
    super(el);
  }

  public dispose() {
    super.dispose();
  }
}
