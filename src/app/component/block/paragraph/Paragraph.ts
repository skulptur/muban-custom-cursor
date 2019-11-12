// import { getComponentForElement } from 'muban-core';
// import Icon from '../../general/icon/Icon';
import CustomCursor from '../custom-cursor/CustomCursor';
import AbstractBlock from '../AbstractBlock';

export default class Paragraph extends AbstractBlock {
  public static readonly displayName: string = 'paragraph';

  private unsetCustomCursor = CustomCursor.getInstance().setCustomCursorForElement(
    this.element,
    'video',
  );

  constructor(el: HTMLElement) {
    super(el);
  }

  public dispose() {
    this.unsetCustomCursor();
    super.dispose();
  }
}
