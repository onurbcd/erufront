import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from 'ngx-clipboard';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  ConfirmDialogComponent,
  CopyButtonComponent,
  EruActionsComponent,
  EruButtonsComponent,
  EruInputComponent,
} from './components';

export const importModules = [
  CommonModule,
  MatDialogModule,
  MatButtonModule,
  TranslateModule,
  MatRadioModule,
  ReactiveFormsModule,
  MatInputModule,
  MatTooltipModule,
  MatIconModule,
  RouterModule,
  ClipboardModule,
];

export const exportModules = [
  MatDialogModule,
  CommonModule,
  RouterModule,
  // FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatTooltipModule,
  MatIconModule,
  MatGridListModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatTableModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  TranslateModule,
  MatSelectModule,
  MatExpansionModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  ClipboardModule,
  MatProgressBarModule,
];

export const components = [
  ConfirmDialogComponent,
  CopyButtonComponent,
  EruActionsComponent,
  EruButtonsComponent,
  EruInputComponent,
];

@NgModule({
  imports: [...importModules],
  exports: [...exportModules, ...components],
  declarations: [...components],
  providers: [],
})
export class SharedModule {}
