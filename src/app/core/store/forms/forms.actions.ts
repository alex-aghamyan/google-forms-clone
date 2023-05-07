import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IForm, IFormFromApi } from '../../interfaces/form.interface';

export const formsActions = createActionGroup({
  source: 'Forms',
  events: {
    'Load Forms Attempt': emptyProps(),
    'Load Forms Success': props<{ forms: IFormFromApi[] }>(),
    'Load Forms Failure': props<{ error: unknown }>(),
    'Create Form Attempt': props<{ form: Omit<IFormFromApi, 'id'> }>(),
    'Create Form Success': props<{ form: IForm; messageToShow: string }>(),
    'Create Form Failure': props<{ error: unknown }>(),
    'Delete Form Attempt': props<{ id: number }>(),
    'Delete Form Success': props<{ id: number; messageToShow: string }>(),
    'Delete Form Failure': props<{ error: unknown }>(),
    'Set Forms With Bookmarked Status': props<{ forms: IForm[] }>(),
    'Toggle Form Bookmarked Status': props<{ id: number }>(),
  },
});
