import { FormikProps } from 'formik';

import { FormData } from './interfaces';

export default abstract class FormInstance<Data> {

  protected form: FormikProps<FormData>;
  public readonly initialData: Data;

  constructor(initialData?: Data) {
    this.form = null;
    this.initialData = initialData;
  }

  public setForm(form: FormikProps<FormData>): void {
    this.form = form;
  }

  public setData(data: Data): void {
    this.form.setValues(this.toFormData(data));
  }

  public abstract toFormData(data: Data): FormData;
  public abstract fromFormData(data: FormData): Data;

}
