import { FormArray, FormControl } from '@angular/forms';
import { TFormField } from "src/app/core/types/form-field.type";

export interface IQuestionControl {
  text: FormControl<string>;
  type: FormControl<TFormField>;
  options: FormArray<FormControl<string>>;
}
