/**
 * Text Input
 */

import React from 'react';
import { Field } from 'formik';
import { FormGroup, InputGroup } from '@blueprintjs/core';

import { MarkupType, MarkupProps, Markup } from './interfaces';

export interface TextInputProps extends MarkupProps {
  pattern?: RegExp
}

export default class TextInput extends Markup<TextInputProps> {
  
  public readonly type: MarkupType = MarkupType.Text;
  public readonly pattern?: RegExp;

  constructor(props: TextInputProps) {
    super(props);
    this.pattern = props.pattern;
    this.validate = this.validate.bind(this);
  }

  private validate(value): string {
    let error: string;
    if (this.pattern && !this.pattern.test(value)) {
      error = 'This is not in valid format!';
    }
    return error;
  }

  public render(): JSX.Element {
    return (
      <Field name={this.name} validate={this.validate}>
        {({ field, meta }) => (
          <FormGroup
            label={this.label}
            labelFor={this.name}
            labelInfo={this.required ? '(required)' : ''}
            intent={meta.error && meta.touched ? 'danger' : 'none'}
            helperText={meta.error}
          >
            <InputGroup 
              intent={meta.error && meta.touched ? 'danger' : 'none'}
              {...field} 
            />
          </FormGroup>
        )}
      </Field>
    );
  }

}
