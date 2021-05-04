/**
 * Base markup
 */

import uid from 'uid';

import React, { Component, FormEvent } from 'react';

import { MarkupType, FormFieldValue, FormError } from './types';

export interface MarkupProps {
  style?: React.CSSProperties,
  className?: string,
  label?: string,
  labelElement?: JSX.Element,
  name?: string,
  bare?: boolean,
  fill?: boolean,
  large?: boolean,
  required?: boolean,
  requiredErrorMessage?: string,
  disabled?: boolean,
  autoComplete?: string,
  validate?: (value: any) => FormError,
  onChange?: (event?: FormEvent) => any,
}

export abstract class Markup<P extends MarkupProps, S = unknown> extends Component<P, S> {

  static getID = (): string => uid(16);

  public readonly abstract type: MarkupType;
  protected readonly id: string;
  protected readonly errorId: string;

  constructor(props: P) {
    super(props);
    this.id = Markup.getID();
    this.errorId = Markup.getID();
  }

  protected _validate(value: FormFieldValue): FormError {
    let error: FormError = null;
    if (this.props.required) {
      if (value == null || value === '') {
        if (this.props.requiredErrorMessage != null) {
          error = this.props.requiredErrorMessage;
        } else {
          const name = this.props.label.toLowerCase();
          error = `The ${name} is required!`;
        }
      }
    }
    return error;
  }

  protected getErrorNode(error: string, id?: string): JSX.Element {
    if (!error) {
      return null;
    }
    return <span className="bpf-error-message" id={id || this.errorId} aria-live="polite">{error}</span>;
  }

  public abstract render(): JSX.Element;

}
