import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDataComponent } from './components/form-data/form-data.component';
import { SharedModule } from '../shared/shared.module';
import { FormRoutingModule } from './form-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormDataComponent],
  imports: [CommonModule, FormRoutingModule, SharedModule , FormsModule],
})
export class FormModule {}
