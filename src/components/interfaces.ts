import { Component } from 'react';
import { FormikErrors, FormikValues } from 'formik';

export type FormErrors = FormikErrors<FormikValues>;
export type FormData = FormikValues;

export enum MarkupType {
  Text = 'text',
  Date = 'date',
  Submit = 'submit'
}

export interface MarkupProps {
  label?: string,
  name?: string,
  required?: boolean
}

export abstract class Markup<P extends MarkupProps> extends Component<P> {

  public readonly abstract type: MarkupType;
  public readonly label?: string;
  public readonly name?: string;
  public required?: boolean;

  constructor(props: P) {
    super(props);
    this.label = props.label;
    this.name = props.name;
    this.required = props.required;
  }

  protected getRules(): any[] {
    const rules: any[] = [];
    if (this.required) {
      rules.push({
        required: true,
        message: 'This is required!'
      });
    }
    return rules;
  }

  public abstract render(): JSX.Element;

}
