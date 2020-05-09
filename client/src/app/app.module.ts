import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AuthGuardService } from './shared/services/guard/auth-guard.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { userReducer } from './shared/state/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from './shared/state/user.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './shared/state/custom-router-serializer';
import { DefaultModule } from './layouts/default/default.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule,
    NgxWebstorageModule.forRoot(),
    StoreModule.forRoot(
      { user: userReducer },
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
          strictStateSerializability: false,
          strictActionSerializability: false,
        },
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([UserEffect]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    DefaultModule,
    SharedModule,
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
  exports: [
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
  ],
})
export class AppModule {}
