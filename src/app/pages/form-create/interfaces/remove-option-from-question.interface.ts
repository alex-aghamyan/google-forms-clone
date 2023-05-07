import { FormGroup } from '@angular/forms';
import { IQuestionControl } from './question-control.interface';

export interface IRemoveOptionFromQuestion {
  questionControl: FormGroup<IQuestionControl>;
  optionControlIndex: number;
}
