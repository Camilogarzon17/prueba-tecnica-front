import { Routes } from '@angular/router';
import { FormUserComponent } from './component/form-user/form-user.component';
import { InfUserComponent } from './component/inf-user/inf-user.component';

export const routes: Routes = [
  { path: '', redirectTo: 'form-user', pathMatch: 'full' },
  { path: 'form-user', component: FormUserComponent },
  { path: 'inf-user', component: InfUserComponent },
];
