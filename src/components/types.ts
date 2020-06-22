import { FormikErrors, FormikValues } from 'formik';

export type FormFieldValue = undefined | null | string | boolean | number | Date | FormData[];
export interface FormValues {
  [field: string]: FormFieldValue | FormValues
}
export type FormData = FormikValues;
export type FormError = string | null;
export type FormErrors = FormikErrors<FormikValues>;

export enum MarkupType {
  Text = 'text',
  Number = 'number',
  Switch = 'switch',
  Date = 'date',
  Submit = 'submit'
}

export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';
