
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
  SubmitButton
} from '../src/index';

export interface EnrollData {
  start?: string,
  end?: string,
  firstName?: string,
  lastName?: string
}

const REGEX_NAME = /^[a-zA-Z ]+$/;

class EnrollFormInstance extends FormInstance<EnrollData> {

  constructor(initialData: EnrollData) {
    super(initialData);
  }

  public toFormData(data: EnrollData): FormData {
    const _data = {
      start: null,
      end: null,
      firstName: data.firstName,
      lastName: data.lastName
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

  public fromFormData(data: FormData): EnrollData {
    const _data = {
      start: null,
      end: null,
      firstName: data.firstName,
      lastName: data.lastName
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

  const form = new EnrollFormInstance({
    start: '01/01/2020',
    end: null,
    firstName: 'John',
    lastName: 'Doe'
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    form.setData(data);
  }, [data]);

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
        onSubmit={(data) => onSubmit(form.fromFormData(data))}
      >
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
        <SubmitButton>
          Get Data
        </SubmitButton>
      </Form>
    </Card>
  )

};

export default Enroll;
