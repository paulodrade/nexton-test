import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service for managing the wizard's busy state.
 * Provides a reactive API to notify components when the wizard is busy (e.g., during async operations).
 */
@Injectable({
  providedIn: 'root',
})
export class WizardService {
  /**
   * Internal busy state flag.
   */
  private _busy = false;

  /**
   * BehaviorSubject to emit busy state changes.
   */
  private _busy$ = new BehaviorSubject<boolean>(this._busy);

  /**
   * Gets the current busy state.
   */
  public get busy(): boolean {
    return this._busy;
  }

  /**
   * Sets the busy state and notifies subscribers.
   */
  public set busy(value: boolean) {
    this._busy = value;
    this._busy$.next(value);
  }

  /**
   * Observable that emits the current busy state.
   * Components can subscribe to this to react to busy state changes.
   */
  public readonly isBusy$: Observable<boolean> = this._busy$.asObservable();
}
