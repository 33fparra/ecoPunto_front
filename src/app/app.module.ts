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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GoogleMapsModule } from '@angular/google-maps';
import { NavbarComponent } from './private/navbar/navbar.component';
import { environment } from '../environments/environment.prod';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserManagementComponent } from './private/user-management/user-management.component';
import { DeleteComponent } from './util/components/delete/delete.component';
import {MatDialogModule} from '@angular/material/dialog';


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
    AdministrationComponent,
    NavbarComponent,
    UserManagementComponent,
    DeleteComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule
  ], exports: [
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
