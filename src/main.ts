import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [provideHttpClient(), provideRouter(routes)],
  }).catch((err) => {
    console.error('Error during app bootstrap:', err);
  });