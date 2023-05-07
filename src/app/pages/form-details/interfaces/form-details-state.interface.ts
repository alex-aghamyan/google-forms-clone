import { IFormFromApi } from 'src/app/core/interfaces/form.interface';
import { IFormResponse } from './form-response.interface';

export interface IFormDetailsState {
  form: IFormFromApi;
  responses: IFormResponse[];
  usersLatestResponse: IFormResponse;
}
