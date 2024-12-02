import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { LoginPromptComponent } from './components/login-prompt/login-prompt.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { QrModalModule } from './components/qr-modal/qr-modal.module';
import { SuccessModalComponent } from './components/succes-modal/succes-modal.component';

@NgModule({
  declarations: [AppComponent, LoginPromptComponent, AlertModalComponent, SuccessModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, QrModalModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Geolocation],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
