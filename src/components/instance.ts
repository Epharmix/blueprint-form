import { FormInstance as _FormInstance } from 'antd/lib/form';

export interface FormData {
  [name: string]: any;
}

export default abstract class FormInstance {

  protected form: _FormInstance;

  constructor() {
    this.form = null;
  }

  public setForm(form: _FormInstance): void {
    this.form = form;
  }

  protected _setData(data: FormData): void {
    if (!this.form) {
      return;
    }
    this.form.setFieldsValue(data);
    return;
  }

  protected _getData(): FormData {
    if (!this.form) {
      return {};
    }
    return this.form.getFieldsValue();
  }

  public abstract getData(): any;

  public abstract setData(data: any): void;

}
