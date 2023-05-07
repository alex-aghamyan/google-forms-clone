import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Store } from '@ngrx/store';
import { formsFeature } from 'src/app/core/store/forms/forms.feature';
import { LetModule } from '@ngrx/component';
import { formsActions } from 'src/app/core/store/forms/forms.actions';
import { MatIconModule } from '@angular/material/icon';
import { FormCardComponent } from 'src/app/shared/components/form-card/form-card.component';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [NgFor, LetModule, MatIconModule, MatRippleModule, FormCardComponent, RouterModule],
  template: `
    <section *ngrxLet="forms$ as forms" class="form-cards-container">
      <button routerLink="/forms/create" matRipple class="add-form-button">
        <mat-icon>add</mat-icon>
      </button>
      <ng-container *ngFor="let form of forms">
        <app-form-card
          (toggleBookmarkedStatus)="toggleFormBookmarkedStatusById($event)"
          (deleteForm)="deleteFormById($event)"
          [form]="form"
        />
      </ng-container>
    </section>
  `,
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit {
  readonly store = inject(Store);

  readonly forms$ = this.store.select(formsFeature.selectAll);

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
