import { createFeature, createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { layoutActions } from './layout.actions';

export interface ILayoutState {
  title: string;
}

const initialState: ILayoutState = {
  title: '',
};

export const layoutFeature = createFeature({
  name: 'layout',
  reducer: createReducer(
    initialState,
    immerOn(layoutActions.setPageTitle, (state, { title }) => {
      state.title = title;
    })
  ),
});
