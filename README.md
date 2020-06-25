# blueprint-form

An accessibility-friendly form composition library for [BlueprintJS](https://blueprintjs.com/) using TypeScript, striving to be WCAG 2.1 compliant.

### Development

After cloning the repo locally, install the required packages for the repo: `npm install`

To start development, run: `npm run dev`

This will start the `webpack-dev-server` at port `9000`, with hot reload enabled.

### Capabilities

- [x] TypeScript based environment
- [x] Two-way (get & set) form setup
- [x] Ability to have fully flexible JSX mockup within the forms
- [x] Individual input validation controls
- [x] Input dependencies and variations 
- [x] Customization framework (e.g. composite controls)
- [ ] File upload input

### Milestones

- [x] Proof of concept with all capabilities
- [x] Input portfolio development
- [ ] Unit tests
- [ ] Documentation and packaging

### Components

- Text Input
- TextArea Input
- Number Input
- Date Input (Start Date, End Date variations)
- Switch
- Checkbox
- Checkbox Group
- Radio Group
- Submit

In addition, you may use the `useField` hook exposed to create your own composite components. The reference of the hook can be found [here](https://jaredpalmer.com/formik/docs/api/useField).

### Example

This is a form that show cases the full range of functions and components:

```tsx
/**
 * Example form
 */

// Create an interface that defines the form data structure
export interface EnrollData {
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
}

// Create the markup
const Enroll = (): JSX.Element => {

  const isLarge = false;
  const isDisabled = false;

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

  // Provide form level validation (e.g. validation on 2+ values)
  const validate = (values: FormData): FormErrors => {
    const errors: FormErrors = {};
    if (values.start != null && values.end != null && values.start > values.end) {
      errors.end = 'The end date must be after the start date!';
    }
    return errors;
  };

  // Submission
  const onSubmit = (data: EnrollData) => {
    console.log(data);
  };

  return (
    <Form
      form={form}
      validate={validate}
      onSubmit={onSubmit}
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
  );

};
```