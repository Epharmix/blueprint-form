
import moment from 'moment-timezone';

import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  FormGroup,
  Dialog,
  Button
} from '@blueprintjs/core';

import {
  Form,
  FormInstance,
  Markup,
  FormError,
  FormErrors,
  FormData,
  FormValues,
  DateInput,
  StartDateInput,
  EndDateInput,
  TextInput,
  TextArea,
  NumberInput,
  SubmitButton,
  Switch,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  SelectInput,
  useField
} from '../src/index';

/**
 * Example composite input
 */

interface CountryInputProps {
  label?: string,
  name: string,
  required?: boolean,
  large?: boolean,
  disabled?: boolean
}

const COUNTRIES = ['Water Tribes', 'Earth Kingdom', 'Fire Nation', 'Air Nomads'];

const CountryInput = (props: CountryInputProps) => {

  const [field, meta, helpers] = useField({
    validate: (country): FormError => {
      let error: FormError = null;
      if (!country) {
        error = 'A valid country selection is required!';
      }
      return error;
    },
    ...props
  });
  const idRef = useRef(Markup.getID());
  const [isOpen, setIsOpen] = useState(false);

  const _setCountry = (country: string) => {
    helpers.setTouched(true);
    helpers.setValue(country);
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <FormGroup
        label={props.label}
        labelFor={idRef.current}
        labelInfo={props.required ? '(required)' : ''}
        intent={meta.error && meta.touched ? 'danger' : 'none'}
        helperText={meta.touched ? meta.error : null}
      >
        <div>
          <span className={props.large ? 'bp3-text-large' : ''} style={{ marginRight: '15px' }}>
            Current Selection: <b>{field.value || 'None'}</b>
          </span>
          <Button
            onClick={() => setIsOpen(true)}
            disabled={props.disabled}
            large={props.large}
          >
            Pick Country
          </Button>
        </div>
        <input
          id={idRef.current}
          {...field} 
          type="hidden"
          value={field.value || ''}
        />
      </FormGroup>
      <Dialog
        title="Pick Your Favorite Country"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div style={{ padding: '20px' }}>
          {
            COUNTRIES.map((country, i) => (
              <Button
                key={i} 
                active={field.value === country}
                onClick={_setCountry.bind(this, country)}
                fill
                style={{
                  marginTop: '10px'
                }}
              >
                {country}
              </Button>
            ))
          }
        </div>
      </Dialog>
    </React.Fragment>
  );

};

const {
  SerializeDate,
  DeserializeDate
} = FormInstance;

export type EnrollData = {
  start: Date,
  end?: Date,
  examAt?: Date,
  tz: string,
  firstName: string,
  lastName: string,
  pin: string,
  hasScale: boolean,
  baselineWeight?: number,
  description: string,
  isLevelA: boolean,
  isLevelB: boolean,
  modules: string[],
  days: number[],
  dmType: string,
  color: string,
  country: string
};

export type SerializedEnrolleData = {
  [key in keyof EnrollData]: 
    EnrollData[key] extends Date ? string : EnrollData[key]
}

const REGEX_NAME = /^[a-zA-Z ]+$/;
const DATE_FORMAT = 'YYYY-MM-DD';

export interface EnrollProps {
  data?: FormValues,
  isDisabled?: boolean,
  isLarge?: boolean,
  onSubmit: (data: any) => void
}

/**
 * Example form
 */
const Enroll = ({ onSubmit, data, isDisabled, isLarge }: EnrollProps): JSX.Element => {

  // Set the initial data and create the form instance
  const initialData: EnrollData = {
    start: moment().add(1, 'day').toDate(),
    end: null,
    examAt: null,
    tz: 'US/Mountain',
    firstName: 'John',
    lastName: 'Doe',
    pin: '123',
    hasScale: true,
    baselineWeight: 123,
    description: 'Etiam varius neque feugiat elit aliquam venenatis.',
    isLevelA: true,
    isLevelB: false,
    modules: ['Y'],
    days: [1, 5],
    dmType: 'II',
    color: 'green',
    country: 'Air Nomads'
  };
  const form = new FormInstance<EnrollData>(initialData);

  // Some helper methods that do common serializations (e.g. Date -> string)
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
      ...values,
      start: DeserializeDate(values.start, DATE_FORMAT),
      end: DeserializeDate(values.end, DATE_FORMAT),
      examAt: DeserializeDate(values.examAt, DATE_FORMAT)
    };
    return data;
  };

  // Set the passed down data on the form
  useEffect(() => {
    if (!data) {
      return;
    }
    form.setData(deserialize(data as SerializedEnrolleData));
  }, [JSON.stringify(data)]);

  // Pass up the initial data after mount
  useEffect(() => {
    onSubmit(serialize(initialData));
  }, []);

  // Provide form level validation (e.g. validation on 2+ values)
  const validate = (values: FormData): FormErrors => {
    const errors: FormErrors = {};
    if (values.start != null && values.end != null && values.start > values.end) {
      errors.end = 'The end date must be after the start date!';
    }
    return errors;
  };

  // Serialize the data and pass it up
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
              large={isLarge}
              disabled={isDisabled}
            />
            <EndDateInput
              label="End Date"
              name="end"
              fill
              large={isLarge}
              disabled={isDisabled}
            />
            <DateInput
              label="Exam Date"
              name="examAt"
              fill
              large={isLarge}
              disabled={isDisabled}
            />
            <TextInput
              label="First Name"
              name="firstName"
              pattern={REGEX_NAME}
              required
              large={isLarge}
              disabled={isDisabled}
            />
            <TextInput
              label="Last Name"
              name="lastName"
              required
              large={isLarge}
              disabled={isDisabled}
            />
            <TextInput
              label="PIN"
              name="pin"
              type="password"
              large={isLarge}
              disabled={isDisabled}
            />
            <Switch
              label="Has Scale"
              name="hasScale"
              large={isLarge}
              disabled={isDisabled}
            />
            {props.values.hasScale && (
              <NumberInput
                label="Baseline Weight (lbs)"
                name="baselineWeight"
                fill
                required
                large={isLarge}
                disabled={isDisabled}
              />
            )}
            <TextArea
              label="Description"
              name="description"
              fill
              growVertically
              disabled={isDisabled}
            />
            <Checkbox
              label="Level A"
              name="isLevelA"
              large={isLarge}
              disabled={isDisabled}
            />
            {props.values.isLevelA && (
              <Checkbox
                label="Level B"
                name="isLevelB"
                large={isLarge}
                disabled={isDisabled}
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
              large={isLarge}
              disabled={isDisabled}
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
              inline
              minItems={2}
              maxItems={3}
              large={isLarge}
              disabled={isDisabled}
            />
            <RadioGroup
              label="Diabetes Type"
              name="dmType"
              options={[{
                label: 'Type I',
                value: 'I'
              }, {
                label: 'Type II',
                value: 'II'
              }]}
              large={isLarge}
              disabled={isDisabled}
            />
            <SelectInput
              label="Favorite Color"
              name="color"
              options={[{
                label: 'Red',
                value: 'red'
              }, {
                label: 'Yellow',
                value: 'yellow'
              }, {
                label: 'Green',
                value: 'green'
              }]}
              fill
              large={isLarge}
              disabled={isDisabled}
            />
            <CountryInput
              label="Country"
              name="country"
              large={isLarge}
              disabled={isDisabled}
            />
            <br />
            <SubmitButton
              large={isLarge}
              disabled={isDisabled}
            >
              Get Data
            </SubmitButton>
          </React.Fragment>
        )}
      </Form>
    </Card>
  );

};

export default Enroll;
