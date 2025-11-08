import { Component, Input, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type IconName = 'apps' | 'servers' | 'chevron-down' | 'refresh';

@Component({
  selector: 'nex-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconUI {
  private sanitizer = inject(DomSanitizer);
  @Input() type: 'svg' | 'png' | 'jpg' = 'svg';
  @Input() spin = false;

  @Input()
  set icon(value: IconName) {
    this._icon = value;
    this.loadSvgContent$().then((content: string) => {
      const cleanedContent = content.replace(/^<\?xml[^>]*\?>\s*/i, '');

      this._iconContent =
        this.sanitizer.bypassSecurityTrustHtml(cleanedContent);
    });
  }

  _icon!: string;
  _iconContent!: SafeHtml;

  get _iconPath() {
    return `assets/icons/${this.type}/${this._icon}.${this.type}`;
  }

  loadSvgContent$() {
    return fetch(this._iconPath).then((response) => response.text());
  }
}
