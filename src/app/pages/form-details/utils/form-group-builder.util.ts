import { FormRecord, FormControl } from '@angular/forms';
import { IQuestion } from 'src/app/core/interfaces/question.interface';

export function buildFormGroup(
  questions: IQuestion[],
  answers: Array<string | number | null>
): FormRecord<FormControl<string | number | null>> {
  return questions.reduce((formGroup, question, currentIndex) => {
    formGroup.addControl(String(currentIndex), new FormControl(answers[currentIndex]));
    return formGroup;
  }, new FormRecord<FormControl<string | number | null>>({}));
}
