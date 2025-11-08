import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CardUI } from './card.component';

@Component({
  template: `
    <nex-card>
      <div nex-card-header>Header</div>
      <div nex-card-body>Body Content</div>
      <div>Default Content</div>
      <div nex-card-footer>Footer</div>
    </nex-card>
  `,
  standalone: true,
  imports: [CardUI],
})
class TestHostComponent {}

@Component({
  template: `
    <nex-card>
      <div>Only Content</div>
    </nex-card>
  `,
  standalone: true,
  imports: [CardUI],
})
class NoHeaderFooterHost {}

describe('CardUI', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('deve renderizar header, body, default content e footer', () => {
    const card: HTMLElement = fixture.nativeElement.querySelector('.nex-card');
    expect(card.querySelector('[nex-card-header]')?.textContent).toContain(
      'Header'
    );
    expect(
      card.querySelector('.nex-card-content [nex-card-body]')?.textContent
    ).toContain('Body Content');
    expect(card.querySelector('.nex-card-content')?.textContent).toContain(
      'Default Content'
    );
    expect(card.querySelector('[nex-card-footer]')?.textContent).toContain(
      'Footer'
    );
  });

  it('deve renderizar apenas content quando não há header/footer', async () => {
    await TestBed.resetTestingModule()
      .configureTestingModule({
        imports: [NoHeaderFooterHost],
      })
      .compileComponents();

    const fixture2 = TestBed.createComponent(NoHeaderFooterHost);
    fixture2.detectChanges();
    const card: HTMLElement = fixture2.nativeElement.querySelector('.nex-card');
    expect(card.querySelector('[nex-card-header]')).toBeNull();
    expect(card.querySelector('[nex-card-footer]')).toBeNull();
    expect(card.querySelector('.nex-card-content')?.textContent).toContain(
      'Only Content'
    );
  });
});
