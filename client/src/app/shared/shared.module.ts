import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ClickOutsideDirective } from './directives/handleClick/clickOutside.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
    SpinnerComponent,
    ClickOutsideDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
  ],
  exports: [
    HeaderComponent,
    SidenavComponent,
    SpinnerComponent,
    ClickOutsideDirective,
  ],
})
export class SharedModule {}
