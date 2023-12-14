import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routingComponents } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { AuthGuard } from './guard/staff-auth.guard';
import { StudentAuthGuard } from './guard/student-auth.guard';
import { DialogComponent } from './dialog/dialog.component';
import { AdminDashbordComponent } from './admin-dashbord/admin-dashbord.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AddUserComponent } from './add-user/add-user.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    StudentRegisterComponent,
    StaffDashboardComponent,
    StudentDashboardComponent,
    DialogComponent,
    AdminDashbordComponent,
    ConfirmDialogComponent,
    AddUserComponent,
    StudentProfileComponent,
    StaffProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatTooltipModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, StudentAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
