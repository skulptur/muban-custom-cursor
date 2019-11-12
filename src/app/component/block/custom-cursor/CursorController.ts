import { loop } from './loop';

export class CursorController {
  private x = 0;
  private y = 0;
  private offsetTop: number = 0;
  private disposeLoop: ReturnType<typeof loop>;

  constructor(private element: HTMLElement) {
    document.documentElement.style.overflowX = 'hidden';
    document.addEventListener('mouseenter', this.handleDocumentMouseEnter);
    document.addEventListener('mouseleave', this.handleDocumentMouseLeave);
    document.addEventListener('mousemove', this.handleMove);
    window.addEventListener('scroll', this.handleScroll);

    this.disposeLoop = loop(this.updatePosition);
  }

  private handleDocumentMouseEnter = () => {
    this.element.style.opacity = '1';
  };

  private handleDocumentMouseLeave = () => {
    this.element.style.opacity = '0';
  };

  private handleScroll = () => {
    this.offsetTop = document.documentElement.scrollTop;
  };

  private handleMove = (event: MouseEvent) => {
    event.preventDefault();

    this.x = event.clientX;
    this.y = event.clientY;
  };

  public updatePosition = () => {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y + this.offsetTop}px`;
  };

  public dispose() {
    document.removeEventListener('mousemove', this.handleMove);
    document.removeEventListener('mouseenter', this.handleDocumentMouseEnter);
    document.removeEventListener('mouseleave', this.handleDocumentMouseLeave);
    window.removeEventListener('scroll', this.handleScroll);

    this.disposeLoop();
  }
}
