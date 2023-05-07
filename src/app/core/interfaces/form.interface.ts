import { IQuestion } from "./question.interface";

export interface IFormFromApi {
  id: number;
  name: string;
  description: string;
  questions: IQuestion[];
}

export interface IForm extends IFormFromApi {
  isBookmarked: boolean;
}
