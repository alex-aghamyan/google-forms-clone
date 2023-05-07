import { inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IForm } from '../../interfaces/form.interface';
import { FormsApiService } from '../../../pages/form-details/data-access/forms-api.service';
import { formsActions } from './forms.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

export const loadForms$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const formsApiService = inject(FormsApiService);

    return actions$.pipe(
      ofType(formsActions.loadFormsAttempt),
      switchMap(() => {
        return formsApiService.getForms().pipe(
          map((forms) => formsActions.loadFormsSuccess({ forms })),
          catchError(() => of(formsActions.loadFormsFailure({ error: '' })))
        );
      })
    );
  },
  { functional: true }
);

export const setFormsBookmarkedStatusOnLoad$ = createEffect(
  () => {
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(formsActions.loadFormsSuccess),
      map(({ forms }) => {
        let storedIds: number[] = JSON.parse(localStorage.getItem('bookmarkedFormsIds') ?? '[]') as number[];

        if (!Array.isArray(storedIds)) {
          storedIds = [];
        }

        const formsWithBookmarkedStatus: IForm[] = forms.map((form) => ({
          ...form,
          isBookmarked: storedIds.includes(form.id),
        }));

        return formsActions.setFormsWithBookmarkedStatus({ forms: formsWithBookmarkedStatus });
      })
    );
  },
  { functional: true }
);

export const createForm$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const formsApiService = inject(FormsApiService);

    return actions$.pipe(
      ofType(formsActions.createFormAttempt),
      switchMap(({ form }) => {
        return formsApiService.createFrom(form).pipe(
          map((response) => formsActions.createFormSuccess({ form: { ...response, isBookmarked: false }, messageToShow: 'Successfully Created' })),
          catchError(() => of(formsActions.createFormFailure({ error: '' })))
        );
      })
    );
  },
  { functional: true }
);

export const toggleBookmarkedFormIdInLocalStorage$ = createEffect(
  () => {
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(formsActions.toggleFormBookmarkedStatus),
      tap({
        next: ({ id }) => {
          let storedIds: number[] = JSON.parse(localStorage.getItem('bookmarkedFormsIds') ?? '[]') as number[];

          if (!Array.isArray(storedIds)) {
            storedIds = [];
          }

          const ids = storedIds.includes(id) ? storedIds.filter(storedId => storedId !== id) : [...storedIds, id];
          localStorage.setItem('bookmarkedFormsIds', JSON.stringify(ids));
        },
      })
    );
  },
  { functional: true, dispatch: false }
);

export const deleteForm$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const formsApiService = inject(FormsApiService);

    return actions$.pipe(
      ofType(formsActions.deleteFormAttempt),
      switchMap(({ id }) => {
        return formsApiService.deleteFormById(id).pipe(
          map(() => formsActions.deleteFormSuccess({ id, messageToShow: 'Successfully Deleted!' })),
          catchError(() => of(formsActions.deleteFormFailure({ error: '' })))
        )
      })
    )
  },
  { functional: true }
)

export const handleFormsApiErrors$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const snackBarService = inject(MatSnackBar);

    return actions$.pipe(
      ofType(
        formsActions.loadFormsFailure,
        formsActions.deleteFormFailure,
        formsActions.createFormFailure
      ),
      tap({
        next: () => snackBarService.open('Error occurred, please try later!', 'Close'),
      })
    );
  },
  { functional: true, dispatch: false }
);

export const handleFormsApiSuccess$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const snackBarService = inject(MatSnackBar);

    return actions$.pipe(
      ofType(formsActions.deleteFormSuccess, formsActions.createFormSuccess),
      tap({
        next: ({ messageToShow }) => snackBarService.open(messageToShow, 'Close', { duration: 3000 }),
      })
    );
  },
  { functional: true, dispatch: false }
);
