import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '@nexton-test/core/mocks';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }), // enables zone-based change detection with event coalescing
    provideRouter(appRoutes), // provides application routes
    provideHttpClient(withFetch()), // provides HttpClient with Fetch API

    // 👇 use the mock only in dev mode
    ...(isDevMode()
      ? [
          importProvidersFrom(
            HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
              delay: Math.floor(Math.random() * (300 - 30 + 1)) + 30, // simulates random network latency between 30 and 300ms
              passThruUnknownUrl: false, // blocks URLs outside the mock
            })
          ),
        ]
      : []),
  ],
};
