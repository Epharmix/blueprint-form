
import moment from 'moment-timezone';
import * as z from 'zod';

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
  StartDateInput,
  EndDateInput,
  TextInput,
  NumberInput,
  SubmitButton,
  SwitchInput
} from '../src/index';

const EnrollSchema = z.object({
  start: z.date(),
  end: z.date().nullable(),
  examAt: z.date().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  hasScale: z.boolean(),
  baselineWeight: z.number().nullable().optional()
});

export type EnrollData = z.infer<typeof EnrollSchema>;

const REGEX_NAME = /^[a-zA-Z ]+$/;

export interface EnrollProps {
  data?: EnrollData,
  onSubmit: (data: EnrollData) => void
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
        onSubmit={(data) => onSubmit(data)}
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
