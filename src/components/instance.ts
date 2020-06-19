import { FormikProps } from 'formik';

export default class FormInstance<Data> {

  protected form: FormikProps<Data> | null;
  public readonly initialData: Data | null;

  constructor(initialData: Data) {
    this.form = null;
    this.initialData = initialData;
  }

  public setForm(form: FormikProps<Data>): void {
    this.form = form;
  }

  public setData(data: Data): void {
    this.form?.setValues(data);
  }

}
