import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FormEditRoutingModule } from './form-edit-routing.module';
import { FormEditComponent } from './components/form-edit.component';
@NgModule({
  declarations: [FormEditComponent],
  imports: [CommonModule, FormEditRoutingModule, FormsModule,SharedModule,],
  /* SharedModule <- usando lazy loading se cargan en el import del modulo  */
})
export class FormEditModule {}
