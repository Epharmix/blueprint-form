import Form from './components/form';
import FormInstance from './components/instance';
import DateInput, { StartDateInput, EndDateInput } from './components/date';
import TextInput from './components/text';
import NumberInput from './components/number';
import Switch from './components/switch';
import Checkbox, { CheckboxGroup } from './components/checkbox';
import SubmitButton from './components/submit';

import { FormData, FormValues, FormErrors } from './components/types';

export type {
  FormData,
  FormValues,
  FormErrors
};

export {
  Form,
  FormInstance,
  DateInput,
  StartDateInput,
  EndDateInput,
  TextInput,
  NumberInput,
  Switch,
  Checkbox,
  CheckboxGroup,
  SubmitButton
};