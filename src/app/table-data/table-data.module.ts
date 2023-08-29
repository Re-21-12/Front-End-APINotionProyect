import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataComponent } from './components/test-api.component';
import { SharedModule } from '../shared/shared.module';
import { TableDataRoutingModule } from './table-data-routitng.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [DataComponent],
  imports: [CommonModule, SharedModule, TableDataRoutingModule,FormsModule ],
})
export class TableDataModule {}
