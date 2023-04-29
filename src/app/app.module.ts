import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { RecyclingPointsSearchComponent } from './private/recycling-points-search/recycling-points-search.component';
import { RecyclingHistoryComponent } from './private/recycling-history/recycling-history.component';
import { RecyclableMaterialsSearchComponent } from './private/recyclable-materials-search/recyclable-materials-search.component';
import { RecyclingActivityRegistrationComponent } from './private/recycling-activity-registration/recycling-activity-registration.component';
import { AdministrationComponent } from './private/administration/administration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    RecyclingPointsSearchComponent,
    RecyclingHistoryComponent,
    RecyclableMaterialsSearchComponent,
    RecyclingActivityRegistrationComponent,
    AdministrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
