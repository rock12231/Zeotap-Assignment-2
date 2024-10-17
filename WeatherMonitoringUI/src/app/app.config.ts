import { ApplicationConfig } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthInterceptorService } from './shared/interceptor/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withRouterConfig({})),
    { provide: LocationStrategy , useClass: PathLocationStrategy },
    provideAnimations(),
    provideHttpClient(),
    provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ]
};
