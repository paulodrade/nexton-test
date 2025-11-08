import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconUI } from './icon.component';
import { DomSanitizer } from '@angular/platform-browser';

describe('IconUI', () => {
  let component: IconUI;
  let fixture: ComponentFixture<IconUI>;
  let sanitizer: DomSanitizer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconUI],
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: (v: string) => `safe:${v}`,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IconUI);
    component = fixture.componentInstance;
    sanitizer = TestBed.inject(DomSanitizer);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set icon and sanitize content', async () => {
    // Mock fetch
    const mockSvg = '<?xml version="1.0"?><svg>icon</svg>';
    // Jest: mock fetch
    (window.fetch as any) = jest.fn().mockResolvedValue({
      text: () => Promise.resolve(mockSvg),
    });
    const spySanitize = jest.spyOn(sanitizer, 'bypassSecurityTrustHtml');

    component.icon = 'apps';
    // Espera o fetch e sanitização
    await new Promise((r) => setTimeout(r, 0));

    expect(component._icon).toBe('apps');
    expect(spySanitize).toHaveBeenCalledWith('<svg>icon</svg>');
    expect(component._iconContent).toBe('safe:<svg>icon</svg>');
  });

  it('should build correct _iconPath for svg', () => {
    component._icon = 'servers';
    component.type = 'svg';
    expect(component._iconPath).toBe('assets/icons/svg/servers.svg');
  });

  it('should build correct _iconPath for png', () => {
    component._icon = 'chevron-down';
    component.type = 'png';
    expect(component._iconPath).toBe('assets/icons/png/chevron-down.png');
  });

  it('should build correct _iconPath for jpg', () => {
    component._icon = 'refresh';
    component.type = 'jpg';
    expect(component._iconPath).toBe('assets/icons/jpg/refresh.jpg');
  });

  it('should set spin input', () => {
    component.spin = true;
    expect(component.spin).toBe(true);
    component.spin = false;
    expect(component.spin).toBe(false);
  });

  it('should fetch SVG content via loadSvgContent$', async () => {
    component._icon = 'apps';
    component.type = 'svg';
    (window.fetch as any) = jest.fn().mockResolvedValue({
      text: () => Promise.resolve('<svg>icon</svg>'),
    });
    const content = await component.loadSvgContent$();
    expect(content).toBe('<svg>icon</svg>');
  });
});
