import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SnackToastrService } from './core/services/snackToastr.service';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatDatepickerModule,
    LayoutModule,
    
  ],

  bootstrap: [AppComponent],
  providers:[{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },DatePipe,SnackToastrService,MatDatepickerModule]
})
export class AppModule {}
