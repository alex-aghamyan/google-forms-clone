import { EntityState } from "@ngrx/entity";
import { createEntityAdapter } from "@ngrx/entity";
import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { IForm } from "../../interfaces/form.interface";
import { formsActions } from "./forms.actions";

export interface IFormsState extends EntityState<IForm> {}

const formsAdapter = createEntityAdapter<IForm>();

const initialState: IFormsState = formsAdapter.getInitialState();

export const formsFeature = createFeature({
  name: 'forms',
  reducer: createReducer(
    initialState,
    on(formsActions.setFormsWithBookmarkedStatus, (state, { forms }) => formsAdapter.setAll(forms, state)),
    on(formsActions.createFormSuccess, (state, { form }) => formsAdapter.addOne(form, state)),
    on(formsActions.deleteFormSuccess, (state, { id }) => formsAdapter.removeOne(id, state)),
    on(formsActions.toggleFormBookmarkedStatus, (state, { id }) => {
      const form = state.entities[id]!;

      return formsAdapter.updateOne({
        id,
        changes: {
          isBookmarked: !form.isBookmarked,
        }
      }, state);
    }),
  ),
  extraSelectors(baseSelectors) {
    const formsAdapterSelectors = formsAdapter.getSelectors(baseSelectors.selectFormsState);

    const selectBookmarkedForms = createSelector(
      formsAdapterSelectors.selectAll,
      (forms) => forms.filter(form => form.isBookmarked)
    )

    return { ...formsAdapterSelectors, selectBookmarkedForms };
  }
})
