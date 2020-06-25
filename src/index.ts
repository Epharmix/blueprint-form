import { useField } from 'formik';

import Form from './form';
import FormInstance from './instance';
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
  TextAreaProps
} from './components/text';
import NumberInput, { NumberInputProps } from './components/number';
import SelectInput, { SelectInputProps } from './components/select';
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
  MarkupProps,
  DateInputProps,
  StartDateInputProps,
  TextInputProps,
  TextAreaProps,
  NumberInputProps,
  SelectInputProps,
  SwitchInputProps,
  CheckboxProps,
  CheckboxGroupProps,
  RadioGroupProps,
  SubmitButtonProps
};

export {
  Form,
  FormInstance,
  Markup,
  DateInput,
  StartDateInput,
  EndDateInput,
  TextInput,
  TextArea,
  NumberInput,
  SelectInput,
  Switch,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  SubmitButton,
  useField
};
