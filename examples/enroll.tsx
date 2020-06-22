
import moment from 'moment-timezone';

import React, { useEffect } from 'react';
import {
  Card
} from '@blueprintjs/core';

import {
  Form,
  FormInstance,
  FormErrors,
  FormData,
  FormValues,
  DateInput,
  StartDateInput,
  EndDateInput,
  TextInput,
  NumberInput,
  SubmitButton,
  SwitchInput
} from '../src/index';

const {
  SerializeDate,
  DeserializeDate
} = FormInstance;

export type EnrollData = {
  start: Date,
  end?: Date | null,
  examAt?: Date | null,
  firstName: string,
  lastName: string,
  hasScale: boolean,
  baselineWeight?: number | null
};

const REGEX_NAME = /^[a-zA-Z ]+$/;
const DATE_FORMAT = 'YYYY-MM-DD';

export interface EnrollProps {
  data?: FormValues,
  onSubmit: (data: any) => void
}

const Enroll = ({ onSubmit, data }: EnrollProps): JSX.Element => {

  // Instantiate the form instance
  const form = new FormInstance<EnrollData>({
    start: moment().add(1, 'day').toDate(),
    end: null,
    examAt: null,
    firstName: 'John',
    lastName: 'Doe',
    hasScale: false,
    baselineWeight: null
  });

  const serialize = (data: EnrollData): FormValues => {
    const values: FormValues = {};
    for (const key of Object.keys(data)) {
      if (data[key] instanceof Date) {
        values[key] = SerializeDate(data[key], DATE_FORMAT);
      } else {
        values[key] = data[key];
      }
    }
    return values;
  };

  const deserialize = (values: FormValues): EnrollData => {
    const data: EnrollData = {
      start: DeserializeDate(values.start as string, DATE_FORMAT) as Date,
      end: DeserializeDate(values.end as string, DATE_FORMAT),
      examAt: DeserializeDate(values.examAt as string, DATE_FORMAT),
      firstName: values.firstName as string,
      lastName: values.lastName as string,
      hasScale: values.hasScale as boolean,
      baselineWeight: values.baselineWeight as number
    };
    return data;
  };

  useEffect(() => {
    if (!data) {
      return;
    }
    form.setData(deserialize(data));
  }, [JSON.stringify(data)]);

  const validate = (values: FormData): FormErrors => {
    const errors: FormErrors = {};
    if (values.start != null && values.end != null && values.start > values.end) {
      errors.end = 'The end date must be after the start date!';
    }
    return errors;
  };

  const _onSubmit = (data: EnrollData) => {
    const _data = serialize(data);
    onSubmit(_data);
  };

  return (
    <Card>
      <Form
        form={form}
        validate={validate}
        onSubmit={_onSubmit}
      >
        {(props) => (
          <React.Fragment>
            <StartDateInput
              label="Start Date"
              name="start"
              fill
              required
            />
            <EndDateInput
              label="End Date"
              name="end"
              fill
            />
            <DateInput
              label="Exam Date"
              name="examAt"
              fill
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
              <NumberInput
                label="Baseline Weight (lbs)"
                name="baselineWeight"
                fill
                required
              />
            )}
            <br />
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
