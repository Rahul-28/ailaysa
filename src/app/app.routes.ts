import { Routes } from '@angular/router';
import { BoxComponent } from './box/box.component';
import { BoxListComponent } from './box-list/box-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'box-list', pathMatch: 'full' },
  { path: 'box-list', component: BoxListComponent },
  { path: 'box/:id', component: BoxComponent },
  { path: '**', redirectTo: 'box-list' },
];
