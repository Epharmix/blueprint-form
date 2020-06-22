import moment from 'moment';
import uid from 'uid';

import React from 'react';
import { Field, FormikValues, connect, FormikContextType } from 'formik';
import { FormGroup } from '@blueprintjs/core';
import { DateInput as _DateInput } from '@blueprintjs/datetime';

import { MarkupType, FormError } from './types';
import { MarkupProps, Markup } from './markup';
import { Switch } from '@blueprintjs/core';

type DateFormat = 'YYYY-MM-DD' | 'MM/DD/YYYY';
const DEFAULT_FORMAT = 'MM/DD/YYYY';

interface DateInputProps extends MarkupProps {
  format?: DateFormat,
  min?: Date,
  max?: Date,
  isEndDate?: boolean
}

interface DateInputState {
  isNoEnd: boolean
}

class DateInput extends Markup<DateInputProps & { formik?: FormikContextType<FormikValues> }, DateInputState> {

  public readonly type: MarkupType = MarkupType.Date;
  private switchId: string;

  constructor(props: DateInputProps) {
    super(props);
    this.formatDate = this.formatDate.bind(this);
    this.parseDate = this.parseDate.bind(this);
    this.validate = this.validate.bind(this);
    this.toggleNoEnd = this.toggleNoEnd.bind(this);
    this.switchId = uid(16);
    this.state = {
      isNoEnd: false
    };
    return;
  }

  public componentDidUpdate(props: DateInputProps & { formik?: FormikContextType<FormikValues> }, state: DateInputState) {
    if (this.props.isEndDate && this.props.formik) {
      const { values } = this.props.formik;
      if (!(!state.isNoEnd && this.state.isNoEnd)) {
        if (values[this.name as string] != null && this.state.isNoEnd) {
          this.setState({
            isNoEnd: false
          });
        }
      }
    }
  }

  private formatDate(date: Date): string {
    const _date = moment(date);
    if (!_date.isValid()) {
      return '';
    }
    return _date.format(this.props.format || DEFAULT_FORMAT);
  }

  private parseDate(value: string): Date | null {
    const date = moment(value, this.props.format || DEFAULT_FORMAT);
    if (!date.isValid()) {
      return null;
    }
    return date.toDate();
  }

  private validate(value: Date | null): FormError {
    let error = this._validate(value);
    if (!error && value != null) {
      if (this.props.min && value < this.props.min) {
        const minDate = moment(this.props.min).format(DEFAULT_FORMAT);
        error = `The date must be on or after ${minDate}!`;
      }
      if (this.props.max && value > this.props.max) {
        const maxDate =  moment(this.props.max).format(DEFAULT_FORMAT);
        error = `The date must be on or before ${maxDate}!`;
      }
    }
    return error;
  }

  private toggleNoEnd(event: React.ChangeEvent<HTMLInputElement>): void {
    if (!this.props.formik) {
      return;
    }
    const { setFieldValue } = this.props.formik;
    const isNoEnd = event.currentTarget.checked;
    this.setState({
      isNoEnd: isNoEnd
    }, () => {
      if (isNoEnd) {
        setFieldValue(this.name as string, null);
      }
    });
  }
  
  public render(): JSX.Element {
    return (
      <Field name={this.name} validate={this.validate}>
        {({ field, form, meta }) => (
          <FormGroup
            label={this.label}
            labelFor={this.id}
            labelInfo={this.required ? '(required)' : ''}
            intent={meta.error && meta.touched ? 'danger' : 'none'}
            helperText={meta.touched ? meta.error : null}
          >
            <div style={{
              position: 'relative',
              paddingLeft: this.props.isEndDate ? '150px' : 0
            }}>
              {
                this.props.isEndDate && (
                  <React.Fragment>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }}>
                      <Switch
                        id={this.switchId}
                        labelElement={<label htmlFor={this.switchId}>No End</label>}
                        checked={this.state.isNoEnd}
                        onChange={this.toggleNoEnd}
                      />
                    </div>
                    <div className="bp3-control" style={{
                      position: 'absolute',
                      top: 0,
                      left: '110px',
                      paddingLeft: 0
                    }}>
                      OR
                    </div>
                  </React.Fragment>
                )
              }
              <div style={{
                width: '100%'
              }}>
                <_DateInput
                  fill={this.props.fill || this.props.isEndDate}
                  formatDate={this.formatDate}
                  parseDate={this.parseDate}
                  placeholder={this.props.format || DEFAULT_FORMAT}
                  showActionsBar
                  minDate={this.props.min}
                  maxDate={this.props.max}
                  inputProps={{
                    id: this.id,
                    name: field.name,
                    intent: meta.error && meta.touched ? 'danger' : 'none'
                  }}
                  value={meta.value}
                  onChange={(value: Date) => {
                    form.setFieldTouched(field.name);
                    form.setFieldValue(field.name, value);
                  }}
                  disabled={this.state.isNoEnd}
                />
              </div>
            </div>
          </FormGroup>
        )}
      </Field>
    );
  }

}

const DateInputWrapper = connect((props: DateInputProps & { formik?: FormikContextType<FormikValues> }) => (
  <DateInput {...props} />
));

interface StartDateInputProps extends MarkupProps {
  format?: DateFormat,
  max?: Date
}

export const StartDateInput = (props: StartDateInputProps): JSX.Element => {

  const start = moment().startOf('day').toDate();

  return (
    <DateInputWrapper
      {...props}
      min={start}
    />
  );

};

export const EndDateInput = (props: DateInputProps): JSX.Element => {

  return (
    <DateInputWrapper
      {...props}
      isEndDate
    />
  );

};

export default DateInputWrapper;