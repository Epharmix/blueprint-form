/**
 * Base markup
 */

import uid from 'uid';

import React, { Component } from 'react';

import { MarkupType, FormFieldValue, FormError } from './types';

export interface MarkupProps {
  style?: React.CSSProperties,
  className?: string,
  label?: string,
  name?: string,
  bare?: boolean,
  fill?: boolean,
  large?: boolean,
  required?: boolean,
  disabled?: boolean,
  autoComplete?: string,
  validate?: (value: any) => FormError
}

export abstract class Markup<P extends MarkupProps, S = unknown> extends Component<P, S> {

  static getID = (): string => uid(16);

  public readonly abstract type: MarkupType;
  protected readonly id: string;

  constructor(props: P) {
    super(props);
    this.id = Markup.getID();
  }

  protected _validate(value: FormFieldValue): FormError {
    let error: FormError = null;
    if (this.props.required) {
      if (value == null || value === '') {
        error = 'This field is required!';
      }
    }
    return error;
  }

  public abstract render(): JSX.Element;

}
