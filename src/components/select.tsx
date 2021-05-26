/**
 * Select Input
 */

import React from 'react';
import { Field } from 'formik';
import { FormGroup, HTMLSelect } from '@blueprintjs/core';

import { MarkupType, Option, FormError } from './types';
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
    this.validate = this.validate.bind(this);
    this.ref = null;
  }

  private validate(value: number | null): FormError {
    const error = this._validate(value);
    if (error !== null) {
      this.ref.setAttribute('aria-describedby', this.errorId);
    } else {
      this.ref.removeAttribute('aria-describedby');
    }
    return error;
  }

  public componentDidMount(): void {
    if (this.props.ariaLabel) {
      this.ref.setAttribute('aria-label', this.props.ariaLabel);
    }
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
        onChange={(event) => {
          field.onChange(event);
          if (this.props.onChange) {
            this.props.onChange(event);
          }
        }}
      />
    );
  }

  public render(): JSX.Element {
    return (
      <Field name={this.props.name} validate={this.validate}>
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

export type SelectBooleanInputProps = Omit<SelectInputProps, 'options'> & {
  trueLabel?: string,
  falseLabel?: string
}

export class SelectBooleanInput extends Markup<SelectBooleanInputProps> {

  public readonly type: MarkupType = MarkupType.Select;
  private ref: HTMLSelectElement;

  constructor(props: SelectInputProps) {
    super(props);
    this.validate = this.validate.bind(this);
    this.ref = null;
  }

  private validate(value: number | null): FormError {
    const error = this._validate(value);
    if (error !== null) {
      this.ref.setAttribute('aria-describedby', this.errorId);
    } else {
      this.ref.removeAttribute('aria-describedby');
    }
    return error;
  }

  public componentDidMount(): void {
    if (this.props.ariaLabel) {
      this.ref.setAttribute('aria-label', this.props.ariaLabel);
    }
  }

  private getInput(field, form, meta): JSX.Element {
    const options = [{
      label: this.props.trueLabel || 'Yes',
      value: 'true'
    }, {
      label: this.props.falseLabel || 'No',
      value: 'false'
    }];
    return (
      <HTMLSelect
        elementRef={(ref) => this.ref = ref}
        className={this.props.className}
        style={this.props.style}
        fill={this.props.fill}
        large={this.props.large}
        id={this.id}
        intent={meta.error && meta.touched ? 'danger' : 'none'}
        options={options}
        disabled={this.props.disabled}
        {...field}
        value={String(field.value)}
        onChange={(event) => {
          const value = event.currentTarget.value === 'true';
          form.setFieldTouched(this.props.name, true);
          form.setFieldValue(field.name, value);
          if (this.props.onChange) {
            this.props.onChange(event);
          }
        }}
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
