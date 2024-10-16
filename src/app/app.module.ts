import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';

import { IonicStorageModule } from '@ionic/storage-angular';
import { MatDialogModule } from '@angular/material/dialog';

//import { LocalNotifications, LocalNotificationsOriginal } from '@awesome-cordova-plugins/local-notifications';




@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, IonicStorageModule.forRoot(),
 MatDialogModule,  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
