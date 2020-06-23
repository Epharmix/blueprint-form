/**
 * Select Input
 */

import React from 'react';
import { Field } from 'formik';
import { FormGroup, HTMLSelect } from '@blueprintjs/core';

import { MarkupType, Option } from './types';
import { MarkupProps, Markup } from './markup';

export interface SelectInputProps extends MarkupProps {
  options: Option[],
  validate?: never
}

export default class SelectInput extends Markup<SelectInputProps> {

  public readonly type: MarkupType = MarkupType.Select;

  constructor(props: SelectInputProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Field name={this.props.name}>
        {({ field, meta }) => (
          <FormGroup
            label={this.props.label}
            labelFor={this.id}
            labelInfo={this.props.required ? '(required)' : ''}
            intent={meta.error && meta.touched ? 'danger' : 'none'}
            helperText={meta.touched ? meta.error : null}
          >
            <HTMLSelect
              className={this.props.className}
              style={this.props.style}
              fill={this.props.fill}
              id={this.id}
              intent={meta.error && meta.touched ? 'danger' : 'none'}
              options={this.props.options}
              disabled={this.props.disabled}
              {...field}
            />
          </FormGroup>
        )}
      </Field>
    );
  }

}
