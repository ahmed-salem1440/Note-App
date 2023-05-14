import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';




@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[MatInputModule,MatIconModule,MatButtonModule,MatToolbarModule,MatDialogModule,MatMenuModule,MatCardModule]
})
export class SharedModule { }
