import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountValidationComponent } from 'src/app/pages/accountValidation/account-validation/account-validation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';

@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    DashboardComponent,
    AccountValidationComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    FontAwesomeModule,
  ],
})
export class DefaultModule {}
