/**
 * Form instance
 */

import React from 'react';
import { Form as _Form } from 'antd';

import FormInstance from './instance';

interface FormProps {
  form: FormInstance,
  children?: React.ReactElement[],
  layout?: 'vertical' | 'horizontal' | 'inline',
  onSubmit?: (data: any) => void
}

const Form = ({form: instance, children, layout, onSubmit}: FormProps): JSX.Element => {

  const [_form] = _Form.useForm();

  instance.setForm(_form);

  const onFinish = () => {
    if (onSubmit) {
      onSubmit(instance.getData());
    }
  }

  return (
    <_Form
      form={_form}
      onFinish={onFinish}
      layout={layout}
    >
      {children}
    </_Form>
  );

};

export default Form;
