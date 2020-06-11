import { FormikErrors, FormikValues } from 'formik';

export type FormData = FormikValues;
export type FormErrors = FormikErrors<FormData>;

export enum MarkupType {
  Text = 'text',
  Switch = 'switch',
  Date = 'date',
  Submit = 'submit'
}
