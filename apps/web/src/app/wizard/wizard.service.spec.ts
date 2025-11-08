import { TestBed } from '@angular/core/testing';
import { WizardService } from './wizard.service';

/**
 * Unit tests for the WizardService.
 * Verifies that the service is created and injectable.
 */
describe('WizardService', () => {
  let service: WizardService;

  /**
   * Sets up the testing module and injects the service before each test.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WizardService);
  });

  /**
   * Checks if the service instance is created.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get busy state', () => {
    service.busy = true;
    expect(service.busy).toBe(true);
    service.busy = false;
    expect(service.busy).toBe(false);
  });

  it('should emit busy state changes via isBusy$', (done) => {
    const states: boolean[] = [];
    const sub = service.isBusy$.subscribe((val) => {
      states.push(val);
      if (states.length === 3) {
        expect(states).toEqual([false, true, false]);
        sub.unsubscribe();
        done();
      }
    });
    service.busy = true;
    service.busy = false;
  });

  it('should emit again if busy is set to same value', (done) => {
    let emitCount = 0;
    const sub = service.isBusy$.subscribe(() => {
      emitCount++;
    });
    service.busy = false; // já está false, mas emite novamente
    setTimeout(() => {
      expect(emitCount).toBe(2); // emissão inicial + repetição
      sub.unsubscribe();
      done();
    }, 50);
  });
});
