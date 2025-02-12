import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  importProvidersFrom(IonicStorageModule.forRoot({
    name: 'testdb',
    driverOrder:  [Drivers.IndexedDB]
  }))
