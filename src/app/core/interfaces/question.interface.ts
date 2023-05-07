import { TFormField } from "../types/form-field.type";

export interface IQuestion {
  text: string;
  type: TFormField;
  options?: string[];
}
