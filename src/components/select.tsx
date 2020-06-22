/**
 * Select Input
 */

import React from 'react';
import { Field } from 'formik';
import { FormGroup, HTMLSelect } from '@blueprintjs/core';

import { MarkupType, Option } from './types';
import { MarkupProps, Markup } from './markup';

export interface SelectInputProps extends MarkupProps {
  options: Option[]
}

export default class SelectInput extends Markup<SelectInputProps> {

  public readonly type: MarkupType = MarkupType.Select;

  constructor(props: SelectInputProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Field name={this.name}>
        {({ field, meta }) => (
          <FormGroup
            label={this.label}
            labelFor={this.id}
            labelInfo={this.required ? '(required)' : ''}
            intent={meta.error && meta.touched ? 'danger' : 'none'}
            helperText={meta.touched ? meta.error : null}
          >
            <HTMLSelect
              fill={this.props.fill}
              id={this.id}
              intent={meta.error && meta.touched ? 'danger' : 'none'}
              options={this.props.options}
              {...field}
            />
          </FormGroup>
        )}
      </Field>
    );
  }

}
