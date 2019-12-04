import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NzIconModule,
  NzButtonModule,
  NzDropDownModule,
  NzFormModule,
  NzInputModule,
  NzDatePickerModule,
  NzSelectModule,
  NzTableModule,
  NzCheckboxModule,
  NzPaginationModule
} from 'ng-zorro-antd';

import { MvwTableComponent } from './mvw-table/mvw-table.component';
@NgModule({
  declarations: [MvwTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzIconModule,
    NzButtonModule,
    NzDropDownModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
    NzTableModule,
    NzCheckboxModule,
    NzPaginationModule,
  ],
  exports: [
    MvwTableComponent
  ]
})
export class MvwPackegeModule { }
