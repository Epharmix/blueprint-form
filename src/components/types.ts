import { FormikErrors, FormikValues } from 'formik';

export type FormValue = string | number | boolean | Date | null;
export type FormData = FormikValues;
export type FormError = string | null;
export type FormErrors = FormikErrors<FormData>;

export enum MarkupType {
  Text = 'text',
  Number = 'number',
  Switch = 'switch',
  Date = 'date',
  Submit = 'submit'
}
