import { FormikProps } from 'formik';
import moment from 'moment-timezone';

import { 
  FormFieldValue,
  FormErrors
} from './components/types';

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

type Transformer<T, S> = (data: T) => S;
type SubmitHandler = (data: any) => any;
type ChangeHandler = (data: any, isValid: boolean) => any;

export type DateSerialized<T, K extends keyof T> = {
  [key in K]: Date;
} & Omit<T, K>;

export interface FormInstanceOptions<T extends {[key in keyof T]: FormFieldValue}, S extends any = never> {
  serialize?: Transformer<T, S>;
  deserialize?: Transformer<S, T>;
}

export default class FormInstance<T extends {[key in keyof T]: FormFieldValue}, S extends any = never> {

  protected form: FormikProps<T> | null;
  public readonly initialData: T | null;
  private serialize: Transformer<T, S> | null;
  private deserialize: Transformer<S, T> | null;

  constructor(initialData: T, opts?: FormInstanceOptions<T, S>) {
    this.form = null;
    this.initialData = initialData;
    if (opts?.serialize) {
      this.serialize = opts.serialize;
    }
    if (opts?.deserialize) {
      this.deserialize = opts.deserialize;
    }
  }

  public setForm(form: FormikProps<T>): void {
    this.form = form;
  }

  public getForm(): FormikProps<T> {
    return this.form;
  }

  public setData(data: T | S): void {
    if (this.deserialize) {
      this.form?.setValues(this.deserialize(data as S));
    } else {
      this.form?.setValues(data as T);
    }
  }

  public setFieldValue<K extends keyof T & string>(field: K, value: T[K], shouldValidate?: boolean): void {
    this.form?.setFieldValue(field, value, shouldValidate);
  }

  public reset(): void {
    this.form?.resetForm();
  }

  public submit(): Promise<void> {
    return this.form?.submitForm();
  }

  public validate(): Promise<FormErrors> {
    return this.form?.validateForm();
  }
  
  // Provide a middle layer to transform data appropriately

  public onSubmit(data: T, onSubmit?: SubmitHandler): void {
    if (!onSubmit) {
      return;
    }
    if (this.serialize) {
      onSubmit(this.serialize(data));
    } else {
      onSubmit(data);
    }
  }

  public onChange(data: T, isValid: boolean, onChange?: ChangeHandler): void {
    if (!onChange) {
      return;
    }
    if (this.serialize) {
      onChange(this.serialize(data), isValid);
    } else {
      onChange(data, isValid);
    }
  }

  // Expose serialization methods

  static SerializeDate = SerializeDate;
  static DeserializeDate = DeserializeDate;

}
