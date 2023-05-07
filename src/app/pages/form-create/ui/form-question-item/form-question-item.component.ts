import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { IRemoveOptionFromQuestion } from '../../interfaces/remove-option-from-question.interface';
import { IQuestionControl } from '../../interfaces/question-control.interface';

@Component({
  selector: 'app-form-question-item',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './form-question-item.component.html',
  styleUrls: ['./form-question-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FormQuestionItemComponent {
  @Input()
  questionControl!: FormGroup<IQuestionControl>;

  @Output()
  addOptionToQuestion = new EventEmitter<FormGroup>();

  @Output()
  removeOptionFromQuestion = new EventEmitter<IRemoveOptionFromQuestion>();

  @Output()
  removeQuestion = new EventEmitter<void>();

  get optionControls(): FormControl<string | null>[] {
    return this.questionControl.controls.options.controls;
  }

  get isQuestionTypeSelect(): boolean {
    return this.questionControl.controls.type.value === 'select';
  }

  emitRemoveQuestion(): void {
    this.removeQuestion.emit();
  }

  emitAddOptionToQuestion(): void {
    this.addOptionToQuestion.emit(this.questionControl);
  }

  emitRemoveOptionFromQuestion(optionControlIndex: number): void {
    this.removeOptionFromQuestion.emit({
      questionControl: this.questionControl,
      optionControlIndex,
    });
  }
}
