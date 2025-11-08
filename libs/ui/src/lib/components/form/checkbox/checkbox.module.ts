import { NgModule } from '@angular/core';
import { CheckboxUI } from './checkbox.component';
import { LabelUI } from '../label/label.component';

@NgModule({
  imports: [CheckboxUI, LabelUI],
  exports: [CheckboxUI],
})
export class CheckboxModule {}
