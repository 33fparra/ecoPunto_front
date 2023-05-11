import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { RecyclingPointsSearchComponent } from './private/recycling-points-search/recycling-points-search.component';
import { RecyclingHistoryComponent } from './private/recycling-history/recycling-history.component';
import { RecyclableMaterialsSearchComponent } from './private/recyclable-materials-search/recyclable-materials-search.component';
import { RecyclingActivityRegistrationComponent } from './private/recycling-activity-registration/recycling-activity-registration.component';
import { AdministrationComponent } from './private/administration/administration.component';
import { UserManagementComponent } from './private/user-management/user-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'recycling-points-search', component: RecyclingPointsSearchComponent },
  { path: 'recycling-history', component: RecyclingHistoryComponent },
  { path: 'recyclable-materials-search', component: RecyclableMaterialsSearchComponent },
  { path: 'recycling-activity-registration', component: RecyclingActivityRegistrationComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'user-management', component: UserManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
