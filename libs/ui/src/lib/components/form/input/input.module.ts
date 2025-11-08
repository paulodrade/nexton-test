import { NgModule } from '@angular/core';
import { InputUI } from './input.component';
import { LabelUI } from '../label/label.component';

@NgModule({
  imports: [InputUI, LabelUI],
  exports: [InputUI],
})
export class InputModule {}
