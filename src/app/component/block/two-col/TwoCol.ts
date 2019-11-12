// import Icon from '../../general/icon/Icon';
import CustomCursor from '../custom-cursor/CustomCursor';
import AbstractBlock from '../AbstractBlock';

export default class TwoCol extends AbstractBlock {
  public static readonly displayName: string = 'two-col';

  constructor(el: HTMLElement) {
    super(el);

    const customCursor = CustomCursor.getInstance();
    customCursor.setCustomCursorForElement(el, 'scroll');
  }

  // public dispose() {
  //   super.dispose();
  // }
}
