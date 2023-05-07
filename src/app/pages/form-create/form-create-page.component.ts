/* eslint-disable @typescript-eslint/unbound-method */
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormQuestionItemComponent } from './ui/form-question-item/form-question-item.component';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { formsActions } from 'src/app/core/store/forms/forms.actions';
import { TFormField } from "src/app/core/types/form-field.type";
import { IRemoveOptionFromQuestion } from './interfaces/remove-option-from-question.interface';
import { IQuestionControl } from './interfaces/question-control.interface';

@Component({
  selector: 'app-form-create-page',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    FormQuestionItemComponent,
    MatButtonModule,
    MatIconModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './form-create-page.component.html',
  styleUrls: ['./form-create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FormCreatePageComponent {
  readonly store = inject(Store);
  readonly formBuilder = inject(FormBuilder);

  readonly formCreationForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', Validators.maxLength(100)],
    questions: this.formBuilder.array([
      this.formBuilder.nonNullable.group({
        text: ['', Validators.required],
        type: 'text' as TFormField,
        options: this.formBuilder.array<FormControl<string>>([])
      }),
    ]),
  });

  addQuestion(): void {
    const questionFormGroup = this.formBuilder.nonNullable.group({
      text: '',
      type: 'text' as TFormField,
      options: this.formBuilder.array<FormControl<string>>([]),
    });

    this.formCreationForm.controls.questions.push(questionFormGroup);
  }

  removeQuestion(questionControlIndex: number): void {
    this.formCreationForm.controls.questions.removeAt(questionControlIndex);
  }

  addOptionToQuestion(questionControl: FormGroup<IQuestionControl>): void {
    questionControl.controls.options.push(this.formBuilder.nonNullable.control('', { validators: Validators.required }));
  }

  removeOptionFromQuestion({ questionControl, optionControlIndex }: IRemoveOptionFromQuestion): void {
    questionControl.controls.options.removeAt(optionControlIndex);
  }

  createForm(): void {
    this.formCreationForm.markAllAsTouched();

    if (this.formCreationForm.invalid) return;

    this.store.dispatch(
      formsActions.createFormAttempt({ form: this.formCreationForm.getRawValue() })
    );
  }
}
