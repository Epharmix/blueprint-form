/**
 * Number Input
 */

import React from 'react';
import { Field } from 'formik';
import { FormGroup, NumericInput } from '@blueprintjs/core';

import { MarkupType, FormError } from './types';
import { MarkupProps, Markup } from './markup';

export interface NumberInputProps extends MarkupProps {
  placeholder?: string,
  min?: number,
  max?: number
}

export default class TextInput extends Markup<NumberInputProps> {
  
  public readonly type: MarkupType = MarkupType.Number;
  private ref: HTMLInputElement;

  constructor(props: NumberInputProps) {
    super(props);
    this.validate = this.validate.bind(this);
    this.ref = null;
  }

  private validate(value: number | null): FormError {
    let error = this._validate(value);
    if (!error && value != null) {
      if (this.props.min != null && value < this.props.min) {
        error = `The number cannot be less than ${this.props.min}!`;
      }
      if (this.props.max != null && value > this.props.max) {
        error = `The number cannot be greater than ${this.props.max}!`;
      }
    }
    if (!error && this.props.validate) {
      error = this.props.validate(value);
    }
    return error;
  }

  public componentDidMount(): void {
    this.ref.setAttribute('aria-label', this.props.label);
    this.ref.setAttribute('aria-describedby', this.errorId);
  }

  private getInput(field, form, meta): JSX.Element {
    return (
      <NumericInput
        inputRef={(ref) => this.ref = ref}
        className={this.props.className}
        style={this.props.style}
        fill={this.props.fill}
        large={this.props.large}
        id={this.id}
        name={field.name}
        min={this.props.min}
        max={this.props.max}
        intent={meta.error && meta.touched ? 'danger' : 'none'}
        value={field.value || ''}
        placeholder={this.props.placeholder}
        onFocus={() => {
          form.setFieldTouched(field.name);
        }}
        onValueChange={(value, valueAsString) => {
          let _value: number | null = value;
          if (valueAsString.trim().length === 0) {
            _value = null;
          }
          form.setFieldTouched(field.name);
          form.setFieldValue(field.name, _value);
          if (this.props.onChange) {
            this.props.onChange();
          }
        }}
        disabled={this.props.disabled}
      />
    );
  }

  public render(): JSX.Element {
    return (
      <Field name={this.props.name} validate={this.validate}>
        {({ field, form, meta }) => {
          const input = this.getInput(field, form, meta);
          if (this.props.bare) {
            return input;
          }
          return (
            <FormGroup
              label={this.props.label}
              labelFor={this.id}
              labelInfo={this.props.required ? '(required)' : ''}
              intent={meta.error && meta.touched ? 'danger' : 'none'}
              helperText={meta.touched ? this.getErrorNode(meta.error) : null}
            >
              {input}
            </FormGroup>
          );
        }}
      </Field>
    );
  }

}
