import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ComponentStore, OnStoreInit, tapResponse } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { FormsApiService } from 'src/app/pages/form-details/data-access/forms-api.service';
import { selectRouteParam } from 'src/app/core/store/core/router.selectors';
import { layoutActions } from 'src/app/core/store/layout/layout.actions';
import { IFormDetailsState } from '../interfaces/form-details-state.interface';
import { IFormResponse } from '../interfaces/form-response.interface';
import { FormResponsesApiService } from './form-responses-api.service';

@Injectable()
export class FormDetailsStore extends ComponentStore<IFormDetailsState> implements OnStoreInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly formResponsesApiService = inject(FormResponsesApiService);
  private readonly formsApiService = inject(FormsApiService);
  private readonly snackBarService = inject(MatSnackBar);

  readonly vm$ = this.select((state) => state);

  private readonly updateResponses = this.updater(
    (state, updateData: IFormResponse): IFormDetailsState => {
      return {
        ...state,
        responses: [...state.responses, updateData],
        usersLatestResponse: updateData,
      };
    }
  );

  private readonly setPageTitle = this.effect((formName$: Observable<string>) => {
    return formName$.pipe(
      tap({
        next: (formName) => {
          this.store.dispatch(layoutActions.setPageTitle({ title: formName }));
        },
      })
    );
  });

  private readonly setUserResponseToLocalStorage = this.effect(
    (response$: Observable<IFormResponse>) => {
      return response$.pipe(
        tap({
          next: (response) => {
            const responseLocalStorageKey = `userLatestResponseToForm${response.formId}`;
            const existingResponse = JSON.parse(
              localStorage.getItem(responseLocalStorageKey) ?? 'null'
            ) as IFormResponse | null;

            if (!existingResponse) {
              return localStorage.setItem(responseLocalStorageKey, JSON.stringify(response));
            }

            localStorage.removeItem(responseLocalStorageKey);
            localStorage.setItem(responseLocalStorageKey, JSON.stringify(response));
          },
        })
      );
    }
  );

  private readonly getUserLatestResponseFromLocalStorage = this.effect(
    (formId$: Observable<string>) => {
      return formId$.pipe(
        tap({
          next: (formId) => {
            const responseLocalStorageKey = `userLatestResponseToForm${formId}`;
            const usersLatestResponse = JSON.parse(
              localStorage.getItem(responseLocalStorageKey) ?? 'null'
            ) as IFormResponse | null;

            if (!usersLatestResponse) return;

            this.patchState({ usersLatestResponse });
          },
        })
      );
    }
  );

  private readonly getFormAndResponsesById = this.effect(($) => {
    return $.pipe(
      concatLatestFrom(() => this.store.select(selectRouteParam('formId'))),
      map(([, formId]) => formId ?? ''),
      switchMap((formId) => {
        return this.formsApiService.getFormById(formId).pipe(
          switchMap((form) => {
            return this.formResponsesApiService.getResponsesByFormId(form.id).pipe(
              tapResponse(
                (responses) => {
                  this.setState((state) => {
                    return {
                      form,
                      responses,
                      usersLatestResponse: responses.at(-1) || state.usersLatestResponse,
                    };
                  });

                  this.getUserLatestResponseFromLocalStorage(formId);
                },
                () => this.handleApiError()
              )
            );
          }),
          tap({
            error: () => this.handleApiError(),
          })
        );
      })
    );
  });

  readonly submitForm = this.effect((value$: Observable<Array<string | number | null>>) => {
    return value$.pipe(
      concatLatestFrom(() => this.select((state) => state.form.id)),
      map(([value, formId]): IFormResponse => ({ formId, answers: value })),
      switchMap((responseData) => {
        return this.formResponsesApiService.submitResponse(responseData).pipe(
          tapResponse(
            (response) => {
              this.updateResponses(response);
              this.setUserResponseToLocalStorage(response);
              this.snackBarService.open('Successfully submitted!', 'Close', { duration: 3000 });
            },
            () => this.handleApiError()
          )
        );
      })
    );
  });

  ngrxOnStoreInit(): void {
    this.setState({
      responses: [],
      form: { id: 0, description: '', name: '', questions: [] },
      usersLatestResponse: { formId: 0, answers: [] },
    });

    this.getFormAndResponsesById();
    this.setPageTitle(this.select((state) => state.form.name));
  }

  private handleApiError(): void {
    this.snackBarService.open('Error occurred, please try later!', 'Close', { duration: 3000 });
    void this.router.navigate(['dashboard']);
  }
}
