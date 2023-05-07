import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgSwitch, NgSwitchCase } from '@angular/common';
import { IFormFromApi } from 'src/app/core/interfaces/form.interface';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormRecord, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    NgFor,
    NgSwitch,
    NgSwitchCase,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  template: `
    <form (ngSubmit)="emitSubmitForm()" [formGroup]="form" class="question-cards-container">
      <mat-card *ngFor="let question of formConfig.questions; index as index" appearance="outlined">
        <p>{{ question.text }}</p>
        <ng-container [ngSwitch]="question.type">
          <mat-form-field *ngSwitchCase="'text'">
            <input type="text" [formControlName]="index" matInput />
          </mat-form-field>
          <mat-form-field *ngSwitchCase="'number'">
            <input type="number" [formControlName]="index" matInput />
          </mat-form-field>
          <mat-form-field *ngSwitchCase="'select'">
            <mat-select [formControlName]="index">
              <ng-container *ngFor="let option of question.options">
                <mat-option [value]="option">{{ option }}</mat-option>
              </ng-container>
            </mat-select>
          </mat-form-field>
        </ng-container>
      </mat-card>
      <button mat-raised-button color="primary" type="submit">Submit</button>
    </form>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
      }

      .question-cards-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 1000px;
        max-width: 1000px;
        margin-top: 3rem;
      }

      mat-card {
        padding: 1rem 2rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  @Input()
  formConfig!: IFormFromApi;

  @Input()
  form!: FormRecord<FormControl<string | number | null>>;

  @Output()
  submitForm = new EventEmitter<void>();

  emitSubmitForm(): void {
    this.submitForm.emit();
  }
}
