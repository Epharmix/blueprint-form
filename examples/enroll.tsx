
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
  Switch,
  Checkbox,
  CheckboxGroup
} from '../src/index';

const {
  SerializeDate,
  DeserializeDate
} = FormInstance;

export type EnrollData = {
  start: Date,
  end?: Date,
  examAt?: Date,
  firstName: string,
  lastName: string,
  hasScale: boolean,
  baselineWeight?: number,
  isLevelA: boolean,
  isLevelB: boolean,
  modules: string[],
  days: number[]
};

export type SerializedEnrolleData = {
  [key in keyof EnrollData]: 
    EnrollData[key] extends Date ? string : EnrollData[key]
}

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
    baselineWeight: null,
    isLevelA: false,
    isLevelB: false,
    modules: ['Y'],
    days: []
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

  const deserialize = (values: SerializedEnrolleData): EnrollData => {
    const data: EnrollData = {
      start: DeserializeDate(values.start, DATE_FORMAT),
      end: DeserializeDate(values.end, DATE_FORMAT),
      examAt: DeserializeDate(values.examAt, DATE_FORMAT),
      firstName: values.firstName,
      lastName: values.lastName,
      hasScale: values.hasScale,
      baselineWeight: values.baselineWeight,
      isLevelA: values.isLevelA,
      isLevelB: values.isLevelB,
      modules: values.modules,
      days: values.days
    };
    return data;
  };

  useEffect(() => {
    if (!data) {
      return;
    }
    form.setData(deserialize(data as SerializedEnrolleData));
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
            <Switch
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
            <Checkbox
              label="Level A"
              name="isLevelA"
            />
            {props.values.isLevelA && (
              <Checkbox
                label="Level B"
                name="isLevelB"
              />
            )}
            <CheckboxGroup
              label="Modules"
              name="modules"
              options={[{
                label: 'Module X',
                value: 'X'
              }, {
                label: 'Module Y',
                value: 'Y'
              }, {
                label: 'Module Z',
                value: 'Z'
              }]}
              inline
            />
            <CheckboxGroup
              label="Pick 2-3 Days of Week"
              name="days"
              options={[{
                label: 'Sunday',
                value: 0
              }, {
                label: 'Monday',
                value: 1
              }, {
                label: 'Tuesday',
                value: 2
              }, {
                label: 'Wednesday',
                value: 3
              }, {
                label: 'Thursday',
                value: 4
              }, {
                label: 'Friday',
                value: 5
              }, {
                label: 'Saturday',
                value: 6
              }]}
              isNumeric
              inline
              minItems={2}
              maxItems={3}
            />
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
