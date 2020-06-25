/**
 * Text Input
 */

import React from 'react';
import { Field } from 'formik';
import { FormGroup, InputGroup, TextArea as _TextArea } from '@blueprintjs/core';

import { MarkupType, FormError } from './types';
import { MarkupProps, Markup } from './markup';

export interface TextInputProps extends MarkupProps {
  type?: string,
  pattern?: RegExp,
  patternError?: string
}

export default class TextInput extends Markup<TextInputProps> {
  
  public readonly type: MarkupType = MarkupType.Text;

  constructor(props: TextInputProps) {
    super(props);
    this.validate = this.validate.bind(this);
  }

  private validate(value: string | null): FormError {
    let error = this._validate(value);
    if (!error && value != null) {
      if (this.props.pattern && !this.props.pattern.test(value)) {
        error = this.props.patternError || 'This is not in valid format!';
      }
    }
    if (!error && this.props.validate) {
      error = this.props.validate(value);
    }
    return error;
  }

  public render(): JSX.Element {
    return (
      <Field name={this.props.name} validate={this.validate}>
        {({ field, meta }) => (
          <FormGroup
            label={this.props.label}
            labelFor={this.id}
            labelInfo={this.props.required ? '(required)' : ''}
            intent={meta.error && meta.touched ? 'danger' : 'none'}
            helperText={meta.touched ? meta.error : null}
          >
            <InputGroup 
              className={this.props.className}
              style={this.props.style}
              id={this.id}
              fill={this.props.fill}
              large={this.props.large}
              intent={meta.error && meta.touched ? 'danger' : 'none'}
              disabled={this.props.disabled}
              type={this.props.type}
              {...field} 
            />
          </FormGroup>
        )}
      </Field>
    );
  }

}

export interface TextAreaProps extends MarkupProps {
  pattern?: RegExp,
  patternError?: string
  growVertically?: boolean
}

export class TextArea extends Markup<TextAreaProps> {

  public readonly type: MarkupType = MarkupType.TextArea;

  constructor(props: TextInputProps) {
    super(props);
    this.validate = this.validate.bind(this);
  }

  private validate(value: string | null): FormError {
    let error = this._validate(value);
    if (!error && value != null) {
      if (this.props.pattern && !this.props.pattern.test(value)) {
        error = this.props.patternError || 'This is not in valid format!';
      }
    }
    if (!error && this.props.validate) {
      error = this.props.validate(value);
    }
    return error;
  }

  public render(): JSX.Element {
    return (
      <Field name={this.props.name} validate={this.validate}>
        {({ field, meta }) => (
          <FormGroup
            label={this.props.label}
            labelFor={this.id}
            labelInfo={this.props.required ? '(required)' : ''}
            intent={meta.error && meta.touched ? 'danger' : 'none'}
            helperText={meta.touched ? meta.error : null}
          >
            <_TextArea
              className={this.props.className}
              style={Object.assign({
                resize: 'none'
              }, this.props.style)}
              id={this.id}
              fill={this.props.fill}
              large={this.props.large}
              growVertically={this.props.growVertically}
              intent={meta.error && meta.touched ? 'danger' : 'none'}
              disabled={this.props.disabled}
              {...field} 
            />
          </FormGroup>
        )}
      </Field>
    );
  }

}
