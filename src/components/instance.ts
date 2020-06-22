import { FormikProps } from 'formik';
import moment from 'moment-timezone';

import { 
  FormFieldValue,
  FormValues
} from './types';

const SerializeDate = (value: Date | null, format: string): string | null => {
  if (value === null) {
    return null;
  }
  return moment(value).format(format);
};

const DeserializeDate = (value: string | null, format: string, tz?: string): Date | null | undefined => {
  if (value === null) {
    return null;
  }
  tz = tz || moment.tz.guess();
  return moment.tz(value, format, tz).toDate();
};

export default class FormInstance<T extends {[key in keyof T]: FormFieldValue | FormValues}> {

  protected form: FormikProps<T> | null;
  public readonly initialData: T | null;

  constructor(initialData: T) {
    this.form = null;
    this.initialData = initialData;
  }

  public setForm(form: FormikProps<T>): void {
    this.form = form;
  }

  public setData(data: T): void {
    this.form?.setValues(data);
  }

  // Expose serialization methods

  static SerializeDate = SerializeDate;
  static DeserializeDate = DeserializeDate;

}
