import {
  useField,
  connect,
  FieldArray,
  ArrayHelpers
} from 'formik';

import Form from './form';
import FormInstance, { DateSerialized } from './instance';
import { useFormContext } from './context';
import { Markup, MarkupProps } from './components/markup';
import DateInput, {
  DateInputProps,
  StartDateInput,
  StartDateInputProps,
  EndDateInput
} from './components/date';
import TextInput, {
  TextInputProps,
  TextArea,
  TextAreaProps,
  TextInputModes
} from './components/text';
import NumberInput, { NumberInputProps } from './components/number';
import SelectInput, {
  SelectInputProps,
  SelectBooleanInput,
  SelectBooleanInputProps
} from './components/select';
import Switch, { SwitchInputProps } from './components/switch';
import Checkbox, {
  CheckboxProps,
  CheckboxGroup,
  CheckboxGroupProps
} from './components/checkbox';
import RadioGroup, { RadioGroupProps } from './components/radio';
import SubmitButton, { SubmitButtonProps } from './components/submit';
import { FormData, FormValues, FormError, FormErrors } from './components/types';

export type {
  FormData,
  FormValues,
  FormError,
  FormErrors,
  DateSerialized,
  MarkupProps,
  DateInputProps,
  StartDateInputProps,
  TextInputProps,
  TextAreaProps,
  NumberInputProps,
  SelectInputProps,
  SelectBooleanInputProps,
  SwitchInputProps,
  CheckboxProps,
  CheckboxGroupProps,
  RadioGroupProps,
  SubmitButtonProps,
  // Export formik types
  ArrayHelpers
};

export {
  Form,
  FormInstance,
  Markup,
  DateInput,
  StartDateInput,
  EndDateInput,
  TextInput,
  TextInputModes,
  TextArea,
  NumberInput,
  SelectInput,
  SelectBooleanInput,
  Switch,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  SubmitButton,
  // Expose formik components
  useField,
  useFormContext,
  connect,
  FieldArray
};
