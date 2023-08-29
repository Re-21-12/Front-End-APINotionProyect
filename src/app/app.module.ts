import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FormEditModule } from './form-edit/form-edit.module';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    DatePipe
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
