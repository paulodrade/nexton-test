import { NgModule } from '@angular/core';
import { SelectUI } from './select.component';
import { LabelUI } from '../label/label.component';
import { IconModule } from '@nexton-test/icons';

@NgModule({
  imports: [SelectUI, LabelUI, IconModule],
  exports: [SelectUI],
})
export class SelectModule {}
