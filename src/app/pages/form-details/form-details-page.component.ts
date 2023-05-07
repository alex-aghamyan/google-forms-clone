import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormDetailsStore } from './data-access/form-details.store';
import { LetModule } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';
import { MatTabsModule } from '@angular/material/tabs';
import { FormComponent } from './ui/form/form.component';
import { ResponsesComponent } from './ui/responses/responses.component';
import { tap } from 'rxjs/operators';
import { FormControl, FormRecord } from '@angular/forms';
import { buildFormGroup } from './utils/form-group-builder.util';

@Component({
  selector: 'app-form-details-page',
  standalone: true,
  imports: [LetModule, FormComponent, ResponsesComponent, MatTabsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(FormDetailsStore)],
  template: `
    <ng-container *ngrxLet="vm$ as vm">
      <mat-tab-group [mat-stretch-tabs]="false" mat-align-tabs="center">
        <mat-tab label="Questions">
          <ng-template matTabContent>
            <app-form (submitForm)="submitForm()" [form]="form" [formConfig]="vm.form" />
          </ng-template>
        </mat-tab>
        <mat-tab label="Responses">
          <ng-template matTabContent>
            <app-responses [responses]="vm.responses" [questions]="vm.form.questions" />
          </ng-template>
        </mat-tab>
      </mat-tab-group>
    </ng-container>
  `,
})
export default class FormDetailsPageComponent {
  readonly formDetailsStore = inject(FormDetailsStore);

  readonly vm$ = this.formDetailsStore.vm$.pipe(
    tap({
      next: (vm) => {
        this.form = buildFormGroup(vm.form.questions, vm.usersLatestResponse.answers);
      },
    })
  );

  form = new FormRecord<FormControl<string | number | null>>({});

  submitForm(): void {
    const responseData = Object.values(this.form.getRawValue());
    this.formDetailsStore.submitForm(responseData);
  }
}
