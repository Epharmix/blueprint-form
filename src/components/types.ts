import { FormikErrors, FormikValues } from 'formik';

export type FormFieldValue = undefined | null | string | boolean | number | Date | FormFieldValue[] | FormData;
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
  Checkbox = 'checkbox',
  CheckboxGroup = 'checkbox_group',
  Date = 'date',
  Submit = 'submit'
}

export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

export interface Option {
  label: string,
  value: string | number
}
