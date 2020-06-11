import moment from 'moment';

import React from 'react';
import { Field } from 'formik';
import { FormGroup } from '@blueprintjs/core';
import { DateInput as _DateInput } from "@blueprintjs/datetime";

import { MarkupType, MarkupProps, Markup } from './interfaces';

type DateFormat = 'YYYY-MM-DD' | 'MM/DD/YYYY';

interface DateInputProps extends MarkupProps {
  format?: DateFormat
}

export default class DateInput extends Markup<DateInputProps> {

  public readonly type: MarkupType = MarkupType.Date;
  public readonly format: DateFormat;

  constructor(props: DateInputProps) {
    super(props);
    this.format = props.format || 'MM/DD/YYYY';
    this.formatDate = this.formatDate.bind(this);
    this.parseDate = this.parseDate.bind(this);
    this.validate = this.validate.bind(this);
  }

  private formatDate(date: Date): string {
    const _date = moment(date);
    if (!_date.isValid()) {
      return '';
    }
    return _date.format(this.format);
  }

  private parseDate(value: string): Date {
    const date = moment(value, this.format);
    if (!date.isValid()) {
      return null;
    }
    return date.toDate();
  }

  private validate(value: string): string {
    let error: string;
    if (this.required && value == null) {
      error = 'A date is required!';
    }
    return error;
  }

  public render(): JSX.Element {
    return (
      <Field name={this.name} validate={this.validate}>
        {({ field, form, meta }) => (
          <FormGroup
            label={this.label}
            labelFor={this.name}
            labelInfo={this.required ? '(required)' : ''}
            intent={meta.error && meta.touched ? 'danger' : 'none'}
            helperText={meta.error}
          >
            <_DateInput
              formatDate={this.formatDate}
              parseDate={this.parseDate}
              placeholder={this.format}
              inputProps={{
                name: field.name,
                intent: meta.error && meta.touched ? 'danger' : 'none'
              }}
              value={meta.value}
              onChange={(value: Date) => {
                form.setFieldTouched(field.name);
                form.setFieldValue(field.name, value);
              }}
            />
          </FormGroup>
        )}
      </Field>
    );
  }

}
