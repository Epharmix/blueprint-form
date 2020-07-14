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
  private ref: HTMLSelectElement;

  constructor(props: SelectInputProps) {
    super(props);
    this.ref = null;
  }

  public componentDidMount(): void {
    this.ref.setAttribute('aria-label', this.props.label);
  }

  private getInput(field, meta): JSX.Element {
    return (
      <HTMLSelect
        elementRef={(ref) => this.ref = ref}
        className={this.props.className}
        style={this.props.style}
        fill={this.props.fill}
        large={this.props.large}
        id={this.id}
        intent={meta.error && meta.touched ? 'danger' : 'none'}
        options={this.props.options}
        disabled={this.props.disabled}
        {...field}
      />
    );
  }

  public render(): JSX.Element {
    return (
      <Field name={this.props.name}>
        {({ field, meta }) => {
          const input = this.getInput(field, meta);
          if (this.props.bare) {
            return input;
          }
          return (
            <FormGroup
              label={this.props.label}
              labelFor={this.id}
              labelInfo={this.props.required ? '(required)' : ''}
              intent={meta.error && meta.touched ? 'danger' : 'none'}
              helperText={meta.touched ? meta.error : null}
            >
              {input}
            </FormGroup>
          );
        }}
      </Field>
    );
  }

}
