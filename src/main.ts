import { importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routing';
import * as formsEffects from './app/core/store/forms/forms.effects';
import * as layoutEffects from './app/core/store/layout/layout.effects';
import { formsFeature } from './app/core/store/forms/forms.feature';
import { layoutFeature } from './app/core/store/layout/layout.feature';
import { MatSnackBarModule } from '@angular/material/snack-bar';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideStore({ router: routerReducer }),
    provideState(formsFeature),
    provideState(layoutFeature),
    provideRouterStore(),
    provideEffects(formsEffects, layoutEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    importProvidersFrom([MatSnackBarModule]),
  ],
}).catch((err) => console.error(err));
