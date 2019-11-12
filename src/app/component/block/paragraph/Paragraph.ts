// import { getComponentForElement } from 'muban-core';
// import Icon from '../../general/icon/Icon';
import CustomCursor from '../custom-cursor/CustomCursor';
import AbstractBlock from '../AbstractBlock';

export default class Paragraph extends AbstractBlock {
  public static readonly displayName: string = 'paragraph';

  constructor(el: HTMLElement) {
    super(el);

    const customCursor = CustomCursor.getInstance();
    customCursor.setCustomCursorForElement(el, 'video');
  }

  public dispose() {
    super.dispose();
  }
}
