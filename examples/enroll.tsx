
import moment from 'moment-timezone';

import React, { useEffect, useRef, useState, FormEvent } from 'react';
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
  TextInputModes,
  TextArea,
  NumberInput,
  SubmitButton,
  Switch,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  SelectInput,
  SelectBooleanInput,
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

  const [field, meta, helpers] = useField<string>({
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

export interface EnrollData {
  start: Date,
  end?: Date,
  endAlt?: Date,
  examAt?: Date,
  annualAt?: Date,
  dateAt?: Date,
  tz: string,
  firstName: string,
  lastName: string,
  pin: string,
  phone: string,
  hasScale: boolean,
  baselineWeight?: number,
  isHappy: boolean,
  hasAccepted?: boolean,
  description: string,
  isLevelA: boolean,
  isLevelB: boolean,
  modules: string[],
  days: number[],
  dmType: string,
  color: string,
  country: string,
  height: number,
  salute: string,
  holiday: string
}

export type SerializedEnrollData = {
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

  // Some helper methods that do common serializations (e.g. Date -> string)
  const serialize = (data: EnrollData): SerializedEnrollData => {
    const values: FormValues = {};
    for (const key of Object.keys(data)) {
      if (key === 'annualAt') {
        values[key] = SerializeDate(data[key], 'MM/DD');
      } else if (data[key] instanceof Date) {
        values[key] = SerializeDate(data[key], DATE_FORMAT);
      } else {
        values[key] = data[key];
      }
    }
    return values as SerializedEnrollData;
  };

  const deserialize = (values: SerializedEnrollData): EnrollData => {
    const data: EnrollData = {
      ...values,
      start: DeserializeDate(values.start, DATE_FORMAT),
      end: DeserializeDate(values.end, DATE_FORMAT),
      endAlt: DeserializeDate(values.endAlt, DATE_FORMAT),
      examAt: DeserializeDate(values.examAt, DATE_FORMAT),
      annualAt: DeserializeDate(values.annualAt, 'MM/DD'),
      dateAt: DeserializeDate(values.dateAt, DATE_FORMAT)
    };
    return data;
  };

  // Set the initial data and create the form instance
  const initialData: EnrollData = {
    start: moment().add(1, 'day').toDate(),
    end: null,
    endAlt: moment().add(90, 'days').toDate(),
    annualAt: moment().add(5, 'days').toDate(),
    dateAt: null,
    examAt: null,
    tz: 'US/Mountain',
    firstName: 'John',
    lastName: 'Doe',
    pin: '123',
    phone: '',
    hasScale: true,
    baselineWeight: 123,
    isHappy: false,
    hasAccepted: null,
    description: 'Etiam varius neque feugiat elit aliquam venenatis.',
    isLevelA: true,
    isLevelB: false,
    modules: [],
    days: [1, 5],
    dmType: 'II',
    color: 'green',
    country: 'Air Nomads',
    height: 180,
    salute: 'HTTR!',
    holiday: 'christmas'
  };
  const form = new FormInstance<EnrollData, SerializedEnrollData>(initialData, {
    serialize, deserialize
  });

  // Set the passed down data on the form
  useEffect(() => {
    if (!data) {
      return;
    }
    form.setData(deserialize(data as SerializedEnrollData));
  }, [JSON.stringify(data)]);

  // Pass up the initial data after mount
  useEffect(() => {
    onSubmit(serialize(initialData));
  }, []);

  // Provide form level validation (e.g. validation on 2+ values)
  const validate = (values: FormData): FormErrors => {
    const errors: FormErrors = {};
    if (values.start != null && values.end != null && moment(values.start).startOf('day') > moment(values.end).startOf('day')) {
      errors.end = 'The end date must be after the start date!';
    }
    return errors;
  };

  // Receive the data on change
  const onChange = (data: SerializedEnrollData, isValid: boolean) => {
    console.info('On Change:', isValid ? 'Valid' : 'Invalid');
    console.info(data);
  };

  // Ensure the per field on change is working properly
  const onFieldChange = (field: string, event: FormEvent) => {
    console.info('Field Change:', field);
    console.info(event);
  };

  return (
    <Card>
      <Form
        form={form}
        validate={validate}
        onSubmit={onSubmit}
        onChange={onChange}
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
              onChange={onFieldChange.bind(this, 'start')}
            />
            <EndDateInput
              label="End Date"
              name="end"
              fill
              min={props.values.start}
              large={isLarge}
              disabled={isDisabled}
              onChange={onFieldChange.bind(this, 'end')}
            />
            <EndDateInput
              label="End Date (With Value)"
              name="endAlt"
              fill
              min={props.values.start}
              large={isLarge}
              disabled={isDisabled}
              onChange={onFieldChange.bind(this, 'endAlt')}
            />
            <DateInput
              label="Anniversary Date"
              name="annualAt"
              format="MM/DD"
              fill
              large={isLarge}
              disabled={isDisabled}
              onChange={onFieldChange.bind(this, 'annualAt')}
            />
            <DateInput
              label="Blank Date"
              name="dateAt"
              format="MM/DD"
              fill
              large={isLarge}
              disabled={isDisabled}
              onChange={onFieldChange.bind(this, 'dateAt')}
            />
            <TextInput
              label="First Name"
              name="firstName"
              pattern={REGEX_NAME}
              required
              large={isLarge}
              disabled={isDisabled}
              onChange={onFieldChange.bind(this, 'firstName')}
            />
            <TextInput
              label="Last Name"
              name="lastName"
              required
              large={isLarge}
              disabled={isDisabled}
              onChange={onFieldChange.bind(this, 'lastName')}
            />
            <Switch
              label="Has Scale"
              name="hasScale"
              large={isLarge}
              disabled={isDisabled}
              onChange={onFieldChange.bind(this, 'hasScale')}
            />
            {props.values.hasScale && (
              <NumberInput
                label="Baseline Weight (lbs)"
                name="baselineWeight"
                fill
                required
                large={isLarge}
                disabled={isDisabled}
                onChange={onFieldChange.bind(this, 'baselineWeight')}
              />
            )}
            <TextArea
              label="Description"
              name="description"
              fill
              growVertically
              spellCheck
              disabled={isDisabled}
              onChange={onFieldChange.bind(this, 'description')}
            />
            <TextInput
              label="Short Description"
              name="shortDescription"
              fill
              spellCheck
              onChange={onFieldChange.bind(this, 'shortDescription')}
            />
            <Checkbox
              label="Level A"
              name="isLevelA"
              large={isLarge}
              disabled={isDisabled}
              onChange={onFieldChange.bind(this, 'isLevelA')}
            />
            {props.values.isLevelA && (
              <Checkbox
                label="Level B"
                name="isLevelB"
                large={isLarge}
                disabled={isDisabled}
                onChange={onFieldChange.bind(this, 'isLevelB')}
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
              minItems={1}
              inline
              large={isLarge}
              disabled={isDisabled}
              onChange={onFieldChange.bind(this, 'modules')}
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
              onChange={onFieldChange.bind(this, 'days')}
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
              onChange={onFieldChange.bind(this, 'dmType')}
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
              onChange={onFieldChange.bind(this, 'color')}
            />
            <SelectBooleanInput
              label="Are you happy?"
              name="isHappy"
              trueLabel="Very Happy"
              falseLabel="Not Happy"
              fill
              large={isLarge}
              disabled={isDisabled}
              onChange={onFieldChange.bind(this, 'isHappy')}
            />
            <Checkbox
              label="I have read and agree to accepte the EULA"
              name="hasAccepted"
              required
              large={isLarge}
              disabled={isDisabled}
              onChange={onFieldChange.bind(this, 'hasAccepted')}
            />
            <CountryInput
              label="Country"
              name="country"
              large={isLarge}
              disabled={isDisabled}
            />
            <div>
              <b>Bare Elements</b>
              <br /><br />
              <TextInput
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="address@domain.com"
                bare
                large={isLarge}
                disabled={isDisabled}
                onChange={onFieldChange.bind(this, 'email')}
              />
              <br />
              <TextInput
                label="PIN"
                name="pin"
                type="password"
                autoComplete="password"
                placeholder="PIN"
                bare
                large={isLarge}
                disabled={isDisabled}
                onChange={onFieldChange.bind(this, 'pin')}
              />
              <br />
              <TextInput
                label="Phone Number"
                name="phone"
                type="tel"
                mode={TextInputModes.Phone}
                placeholder="555-555-5555"
                bare
                large={isLarge}
                disabled={isDisabled}
                onChange={onFieldChange.bind(this, 'phone')}
              />
              <br />
              <NumberInput
                label="Height"
                name="height"
                placeholder="Height (cm)"
                bare
                fill
                required
                large={isLarge}
                disabled={isDisabled}
                onChange={onFieldChange.bind(this, 'height')}
              />
              <br />
              <TextArea
                label="Salute"
                name="salute"
                placeholder="Write your own salutation here..."
                bare
                fill
                growVertically
                spellCheck
                disabled={isDisabled}
                onChange={onFieldChange.bind(this, 'salute')}
              />
              <br /><br />
              <SelectInput
                label="Holiday of Choice"
                name="holiday"
                options={[{
                  label: 'New Years Day',
                  value: 'nyd'
                }, {
                  label: 'Christmas',
                  value: 'christmas'
                }]}
                bare
                fill
                large={isLarge}
                disabled={isDisabled}
                onChange={onFieldChange.bind(this, 'holiday')}
              />
              <br /><br />
              <DateInput
                label="Exam Date"
                name="examAt"
                format="YYYY-MM-DD"
                bare
                fill
                large={isLarge}
                disabled={isDisabled}
                onChange={onFieldChange.bind(this, 'examAt')}
              />
            </div>
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
