/**
 * Number Input
 */

import React from 'react';
import { Field } from 'formik';
import { FormGroup, NumericInput } from '@blueprintjs/core';

import { MarkupType, FormError } from './types';
import { MarkupProps, Markup } from './markup';

export interface NumberInputProps extends MarkupProps {
  min?: number,
  max?: number
}

export default class TextInput extends Markup<NumberInputProps> {
  
  public readonly type: MarkupType = MarkupType.Number;

  constructor(props: NumberInputProps) {
    super(props);
    this.validate = this.validate.bind(this);
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

  public render(): JSX.Element {
    return (
      <Field name={this.props.name} validate={this.validate}>
        {({ field, form, meta }) => (
          <FormGroup
            label={this.props.label}
            labelFor={this.id}
            labelInfo={this.props.required ? '(required)' : ''}
            intent={meta.error && meta.touched ? 'danger' : 'none'}
            helperText={meta.touched ? meta.error : null}
          >
            <NumericInput
              className={this.props.className}
              style={this.props.style}
              fill={this.props.fill}
              id={this.id}
              name={field.name}
              min={this.props.min}
              max={this.props.max}
              intent={meta.error && meta.touched ? 'danger' : 'none'}
              value={field.value || ''}
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
              }}
              disabled={this.props.disabled}
            />
          </FormGroup>
        )}
      </Field>
    );
  }

}
