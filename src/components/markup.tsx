import uid from 'uid';

import { Component } from 'react';

import { MarkupType, FormFieldValue, FormError } from './types';

export interface MarkupProps {
  label?: string,
  name?: string,
  fill?: boolean,
  required?: boolean
}

export abstract class Markup<P extends MarkupProps, S = unknown> extends Component<P, S> {

  public readonly abstract type: MarkupType;
  public readonly label?: string;
  public readonly name?: string;
  public required?: boolean;

  protected readonly id: string;

  constructor(props: P) {
    super(props);
    this.label = props.label;
    this.name = props.name;
    this.required = props.required;
    this.id = uid(16);
  }

  protected _validate(value: FormFieldValue): FormError {
    let error: FormError = null;
    if (this.required) {
      if (value == null) {
        error = 'This field is required!';
      }
    }
    return error;
  }

  public abstract render(): JSX.Element;

}
