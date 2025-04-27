import { ApplicationConfig, importProvidersFrom, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { provideApollo } from 'apollo-angular';

import { routes } from './app.routes';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        }
      }),
    ),
    provideApollo(() => ({
      cache: new InMemoryCache(),
      link: inject(HttpLink).create({
        uri: 'https://rickandmortyapi.com/graphql',
      }),
    })),
  ]
};
