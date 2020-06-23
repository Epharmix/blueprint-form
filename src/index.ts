import { useField } from 'formik';

import Form from './form';
import FormInstance from './instance';
import { Markup } from './components/markup';
import DateInput, { StartDateInput, EndDateInput } from './components/date';
import TextInput, { TextArea } from './components/text';
import NumberInput from './components/number';
import SelectInput from './components/select';
import Switch from './components/switch';
import Checkbox, { CheckboxGroup } from './components/checkbox';
import RadioGroup from './components/radio';
import SubmitButton from './components/submit';

import { FormData, FormValues, FormError, FormErrors } from './components/types';

export type {
  FormData,
  FormValues,
  FormError,
  FormErrors
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
