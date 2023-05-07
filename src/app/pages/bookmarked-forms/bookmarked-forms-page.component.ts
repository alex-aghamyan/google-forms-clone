import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { LetModule } from '@ngrx/component';
import { FormCardComponent } from '../../shared/components/form-card/form-card.component';
import { Store } from '@ngrx/store';
import { formsActions } from 'src/app/core/store/forms/forms.actions';
import { formsFeature } from 'src/app/core/store/forms/forms.feature';

@Component({
  selector: 'app-bookmarked-forms-page',
  standalone: true,
  imports: [LetModule, NgFor, FormCardComponent],
  template: `
    <section *ngrxLet="bookmarkedForms$ as forms" class="form-cards-container">
      <ng-container *ngFor="let form of forms">
        <app-form-card
          (toggleBookmarkedStatus)="toggleFormBookmarkedStatusById($event)"
          (deleteForm)="deleteFormById($event)"
          [form]="form"
        />
      </ng-container>
    </section>
  `,
  styles: [
    `
      .form-cards-container {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BookmarkedFormsPageComponent implements OnInit {
  readonly store = inject(Store);

  readonly bookmarkedForms$ = this.store.select(formsFeature.selectBookmarkedForms);

  ngOnInit(): void {
    this.store.dispatch(formsActions.loadFormsAttempt());
  }

  deleteFormById(formId: number) {
    this.store.dispatch(formsActions.deleteFormAttempt({ id: formId }));
  }

  toggleFormBookmarkedStatusById(formId: number) {
    this.store.dispatch(formsActions.toggleFormBookmarkedStatus({ id: formId }));
  }
}
