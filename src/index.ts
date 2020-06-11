import './style.scss';

import Form from './components/form';
import FormInstance from './components/instance';
import DateInput from './components/date';
import TextInput from './components/text';
import SubmitButton from './components/submit';

import { FormData, FormErrors } from './components/interfaces';

export type {
  FormData,
  FormErrors
};

export {
  Form,
  FormInstance,
  DateInput,
  TextInput,
  SubmitButton
};
