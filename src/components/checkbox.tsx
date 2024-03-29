/**
 * Checkbox & Checkbox Group
 */

import React from 'react';
import { Field, FormikProps } from 'formik';
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
    this.validate = this.validate.bind(this);
  }

  private validate(value: any): FormError {
    let error = null;
    if (this.props.required && !value) {
      error = this.props.requiredErrorMessage || 'This is required!';
    }
    return error;
  }

  public render(): JSX.Element {
    const label = this.props.labelElement
      ? this.props.labelElement
      : this.props.label;
    return (
      <Field name={this.props.name} type="checkbox" validate={this.validate}>
        {({ field, meta }) => (
          <FormGroup
            intent={meta.error && meta.touched ? 'danger' : 'none'}
            helperText={meta.touched ? this.getErrorNode(meta.error) : null}
          >
            <_Checkbox
              aria-describedby={this.errorId}
              id={this.id}
              labelElement={<label htmlFor={this.id}>{label}</label>}
              inline={this.props.inline}
              large={this.props.large}
              value={this.props.value}
              checked={field.checked}
              name={field.name}
              required={this.props.required}
              onChange={(event) => {
                field.onChange(event);
                if (this.props.onChange) {
                  this.props.onChange(event);
                }
              }}
              onBlur={field.onBlur}
              disabled={this.props.disabled || this.context.isDisabled}
            />
          </FormGroup>
        )}
      </Field>
    );
  }

}

export interface CheckboxGroupProps extends MarkupProps {
  inline?: boolean,
  options: Option[],
  numItems?: number,
  minItems?: number,
  maxItems?: number
}

export class CheckboxGroup extends Markup<CheckboxGroupProps> {

  public readonly type: MarkupType = MarkupType.CheckboxGroup;
  private form: FormikProps<any>;

  constructor(props: CheckboxGroupProps) {
    super(props);
    this.validate = this.validate.bind(this);
  }

  public componentDidUpdate(): void {
    const limit = this.props.maxItems || this.props.numItems;
    if (limit > 0 && this.form) {
      const value: any[] = this.form.values[this.props.name];
      if (Array.isArray(value) && value.length > limit) {
        this.form.setFieldValue(this.props.name, value.slice(0, limit));
      }
    }
  }

  private validate(value: string[] | number[] | null): FormError {
    const { numItems, minItems, maxItems } = this.props;
    let error = this._validate(value);
    if (!error && value != null) {
      if (numItems && value.length !== numItems) {
        error = `Exactly ${numItems} ${numItems === 1 ? 'item is' : 'items are'} needed!`;
      } else if (minItems && value.length < minItems) {
        error = `At least ${minItems} ${minItems === 1 ? 'item is' : 'items are'} needed!`;
      } else if (maxItems && value.length > maxItems) {
        error = `At most ${maxItems} ${maxItems === 1 ? 'item is' : 'items are'} needed!`;
      }
    }
    if (!error && this.props.validate) {
      error = this.props.validate(value);
    }
    return error;
  }

  private isDisabled(value: any, values: any[]): boolean {
    const { numItems, maxItems } = this.props;
    const limit = numItems || maxItems;
    if (limit == null) {
      return false;
    }
    return values.length >= limit && !values.includes(value);
  }

  public render(): JSX.Element {
    return (
      <Field name={this.props.name} validate={this.validate}>
        {({ field, form, meta }) => {
          this.form = form;
          return (
            <FormGroup
              label={this.props.label}
              intent={meta.error && meta.touched ? 'danger' : 'none'}
              helperText={meta.touched ? this.getErrorNode(meta.error) : null}
            >
              {
                this.props.options.map((option, i) => (
                  <_Checkbox
                    aria-describedby={this.errorId}
                    className={field.value && field.value.includes(option.value) ? 'bp3-checkbox-checked' : null}
                    style={this.props.style}
                    key={i}
                    id={`${this.id}.${i}`}
                    name={this.props.name}
                    labelElement={<label htmlFor={`${this.id}.${i}`}>{option.label}</label>}
                    checked={field.value && field.value.includes(option.value)}
                    value={String(option.value)}
                    inline={this.props.inline}
                    large={this.props.large}
                    disabled={this.props.disabled || this.context.isDisabled || this.isDisabled(option.value, field.value)}
                    onChange={(event) => {
                      const isChecked = event.currentTarget.checked;
                      const _value: any[] = field.value || [];
                      let value: any[];
                      if (isChecked) {
                        value = _value.concat(option.value);
                      } else {
                        value = _value.filter((part) => part !== option.value);
                      }
                      form.setFieldValue(field.name, value);
                      form.setFieldTouched(field.name, true, false);
                      if (this.props.onChange) {
                        this.props.onChange(event);
                      }
                    }}
                  />
                ))
              }
            </FormGroup>
          );
        }}
      </Field>
    );
  }

}
