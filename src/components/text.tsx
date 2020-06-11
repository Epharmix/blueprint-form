/**
 * Text Input
 */

import React from 'react';
import { Field } from 'formik';
import { FormGroup, InputGroup } from '@blueprintjs/core';

import { MarkupType } from './types';
import { MarkupProps, Markup } from './markup';

export interface TextInputProps extends MarkupProps {
  pattern?: RegExp
}

export default class TextInput extends Markup<TextInputProps> {
  
  public readonly type: MarkupType = MarkupType.Text;

  constructor(props: TextInputProps) {
    super(props);
    this.validate = this.validate.bind(this);
  }

  private validate(value): string {
    let error: string;
    if (this.props.pattern && !this.props.pattern.test(value)) {
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
            labelFor={this.id}
            labelInfo={this.required ? '(required)' : ''}
            intent={meta.error && meta.touched ? 'danger' : 'none'}
            helperText={meta.error}
          >
            <InputGroup 
              id={this.id}
              intent={meta.error && meta.touched ? 'danger' : 'none'}
              {...field} 
            />
          </FormGroup>
        )}
      </Field>
    );
  }

}
