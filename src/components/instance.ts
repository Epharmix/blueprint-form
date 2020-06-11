import { FormikProps } from 'formik';

import { FormData } from './types';

export default abstract class FormInstance<Data> {

  protected form: FormikProps<FormData>;
  public readonly initialData: Data;
  public readonly initialFormData: FormData;

  constructor(initialData?: Data) {
    this.form = null;
    this.initialData = initialData;
    this.initialFormData = this.toInternal(initialData);
  }

  public setForm(form: FormikProps<FormData>): void {
    this.form = form;
  }

  public setData(data: Data): void {
    this.form.setValues(this.toInternal(data));
  }

  public abstract toInternal(data: Data): FormData;
  public abstract toExternal(data: FormData): Data;

}
