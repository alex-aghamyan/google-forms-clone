import { createActionGroup, props } from '@ngrx/store';

export const layoutActions = createActionGroup({
  source: 'Layout',
  events: {
    'Set Page Title': props<{ title: string }>(),
  }
})