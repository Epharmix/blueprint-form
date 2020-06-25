/**
 * Checkbox & Checkbox Group
 */

import React from 'react';
import { Field, FieldArray } from 'formik';
import { FormGroup, Checkbox as _Checkbox } from '@blueprintjs/core';

import { MarkupType, Option, FormError } from './types';
import { MarkupProps, Markup } from './markup';

export interface CheckboxProps extends MarkupProps {
  inline?: boolean,
  value?: string,
  validate?: never
}

export default class Checkbox extends Markup<CheckboxProps> {
  
  public readonly type: MarkupType = MarkupType.Checkbox;

  constructor(props: CheckboxProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Field name={this.props.name} type="checkbox">
        {({ field }) => (
          <_Checkbox
            id={this.id}
            labelElement={<label htmlFor={this.id}>{this.props.label}</label>}
            inline={this.props.inline}
            large={this.props.large}
            value={this.props.value}
            checked={field.checked}
            name={field.name}
            onChange={field.onChange}
            onBlur={field.onBlur}
            disabled={this.props.disabled}
          />
        )}
      </Field>
    );
  }

}

export interface CheckboxGroupProps extends MarkupProps {
  inline?: boolean,
  options: Option[],
  minItems?: number,
  maxItems?: number
}

export class CheckboxGroup extends Markup<CheckboxGroupProps> {

  public readonly type: MarkupType = MarkupType.CheckboxGroup;

  constructor(props: CheckboxGroupProps) {
    super(props);
    this.validate = this.validate.bind(this);
  }

  private validate(value: string[] | number[] | null): FormError {
    let error = this._validate(value);
    if (!error && value != null) {
      if (this.props.minItems && value.length < this.props.minItems) {
        error = `At least ${this.props.minItems} ${this.props.minItems === 1 ? 'item is' : 'items are'} required!`;
      } else if (this.props.maxItems && value.length > this.props.maxItems) {
        error = `At most ${this.props.maxItems} ${this.props.maxItems === 1 ? 'item is' : 'items are'} required!`;
      }
    }
    if (!error && this.props.validate) {
      error = this.props.validate(value);
    }
    return error;
  }

  private isDisabled(value: any, values: any[]): boolean {
    if (this.props.maxItems == null) {
      return false;
    }
    return values.length >= this.props.maxItems && !values.includes(value);
  }

  public render(): JSX.Element {
    return (
      <Field name={this.props.name} validate={this.validate}>
        {({ field, form, meta }) => (
          <FieldArray name={this.props.name} render={(helpers) => (
            <FormGroup
              label={this.props.label}
              intent={meta.error && meta.touched ? 'danger' : 'none'}
              helperText={meta.touched ? meta.error : null}
            >
              {
                this.props.options.map((option, i) => (
                  <_Checkbox
                    className={this.props.className}
                    style={this.props.style}
                    key={i}
                    id={`${this.id}.${i}`}
                    name={this.props.name}
                    labelElement={<label htmlFor={`${this.id}.${i}`}>{option.label}</label>}
                    checked={field.value.includes(option.value)}
                    value={String(option.value)}
                    inline={this.props.inline}
                    large={this.props.large}
                    disabled={this.props.disabled || this.isDisabled(option.value, field.value)}
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                      const isChecked = event.currentTarget.checked;
                      if (isChecked) {
                        helpers.push(option.value);
                      } else {
                        helpers.remove(field.value.indexOf(option.value));
                      }
                      form.setFieldTouched(field.name);
                    }}
                  />
                ))
              }
            </FormGroup>
          )
          }/>
        )}
      </Field>
    );
  }

}
