import { NgModule } from '@angular/core';
import { RadioGroupUI } from './radio-group.component';
import { LabelUI } from '../label/label.component';

@NgModule({
  imports: [RadioGroupUI, LabelUI],
  exports: [RadioGroupUI],
})
export class RadioGroupModule {}
