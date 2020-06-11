
import moment from 'moment-timezone';

import React, { useEffect } from 'react';
import {
  Card
} from '@blueprintjs/core';

import {
  Form,
  FormInstance,
  FormData,
  FormErrors,
  DateInput,
  TextInput,
  SubmitButton,
  SwitchInput
} from '../src/index';

/**
 * Enroll Data
 * 
 * This is the outward facing data schema to expose
 */
export interface EnrollData {
  start?: string,
  end?: string,
  firstName?: string,
  lastName?: string,
  hasScale: boolean,
  baselineWeight?: number
}

const REGEX_NAME = /^[a-zA-Z ]+$/;

/**
 * Enroll Form Instance
 * 
 * Encapsulates data transformation methods
 */
class EnrollFormInstance extends FormInstance<EnrollData> {

  constructor(initialData: EnrollData) {
    super(initialData);
  }

  /**
   * Translate to internal data to be used in forms
   * 
   * @param data the external data
   */
  public toInternal(data: EnrollData): FormData {
    const _data = {
      start: null,
      end: null,
      firstName: data.firstName,
      lastName: data.lastName,
      hasScale: data.hasScale
    };
    if (data.start != null) {
      const start = moment(data.start, 'MM/DD/YYYY', true);
      if (start.isValid()) {
        _data.start = start.toDate();
      }
    }
    if (data.end != null) {
      const end = moment(data.end, 'MM/DD/YYYY', true);
      if (end.isValid()) {
        _data.end = end.toDate();
      }
    }
    return _data;
  }

  /**
   * Translate internal form data to external format
   * 
   * @param data the internal form data
   */
  public toExternal(data: FormData): EnrollData {
    const _data = {
      start: null,
      end: null,
      firstName: data.firstName,
      lastName: data.lastName,
      hasScale: data.hasScale
    };
    if (data.start) {
      _data.start = moment(data.start).format('MM/DD/YYYY');
    }
    if (data.end) {
      _data.end = moment(data.end).format('MM/DD/YYYY');
    }
    return _data;
  }

}

export interface EnrollProps {
  data?: EnrollData,
  onSubmit: (data: EnrollData) => void
}

const Enroll = ({ onSubmit, data }: EnrollProps): JSX.Element => {

  // Instantiate the form instance
  const form = new EnrollFormInstance({
    start: '01/01/2020',
    end: null,
    firstName: 'John',
    lastName: 'Doe',
    hasScale: false,
    baselineWeight: null
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    form.setData(data);
  }, [JSON.stringify(data)]);

  const validate = (values: FormData): FormErrors => {
    const errors: FormErrors = {};
    if (values.start != null && values.end != null && values.start > values.end) {
      errors.end = 'The end date must be after the start date!';
    }
    return errors;
  };

  return (
    <Card>
      <Form
        form={form}
        validate={validate}
        onSubmit={(data) => onSubmit(form.toExternal(data))}
      >
        {(props) => (
          <React.Fragment>
            <DateInput
              label="Start Date"
              name="start"
              required
            />
            <DateInput
              label="End Date"
              name="end"
            />
            <TextInput
              label="First Name"
              name="firstName"
              pattern={REGEX_NAME}
              required
            />
            <TextInput
              label="Last Name"
              name="lastName"
              pattern={REGEX_NAME}
              required
            />
            <SwitchInput
              label="Has Scale"
              name="hasScale"
            />
            {props.values.hasScale && (
              <TextInput
                label="Baseline Weight (lbs)"
                name="baselineWeight"
                required
              />
            )}
            <SubmitButton>
              Get Data
            </SubmitButton>
          </React.Fragment>
        )}
      </Form>
    </Card>
  );

};

export default Enroll;
