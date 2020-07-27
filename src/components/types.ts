import { FormikErrors, FormikValues } from 'formik';

export type FormFieldValue = undefined | null | string | boolean | number | Date | FormFieldValue[] | FormValues | {
  [field: string]: FormFieldValue;
};
export interface FormValues {
  [field: string]: FormFieldValue | FormValues
}
export type FormData = FormikValues;
export type FormError = string | null;
export type FormErrors = FormikErrors<FormikValues>;

export enum MarkupType {
  Text = 'text',
  TextArea = 'textarea',
  Number = 'number',
  Switch = 'switch',
  Select = 'select',
  Checkbox = 'checkbox',
  CheckboxGroup = 'checkbox_group',
  RadioGroup = 'radio_group',
  Date = 'date',
  Timezone = 'timezone',
  Submit = 'submit'
}

export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

export interface Option {
  label: string,
  value: string | number
}
