import { inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectTitle } from '../core/router.selectors';
import { layoutActions } from './layout.actions';

export const setPageTitle$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);

    return actions$.pipe(
      ofType(routerNavigatedAction),
      concatLatestFrom(() => store.select(selectTitle)),
      map(([, title]) => layoutActions.setPageTitle({ title: title || '' }))
    );
  },
  { functional: true }
);
