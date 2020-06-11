/**
 * Form instance
 */

import React from 'react';
import { Formik, FormikValues } from 'formik';

import { FormErrors } from './interfaces';
import FormInstance from './instance';

interface FormProps<Values extends FormikValues> {
  form: FormInstance<Values>,
  validate?: (values: Values) => void | FormErrors | Promise<FormErrors>;
  children?: React.ReactElement[],
  onSubmit?: (data: any) => void
}

const WeaverForm = <Values extends FormikValues>({form: instance, validate, children, onSubmit}: FormProps<Values>): JSX.Element => {

  return (
    <Formik
      initialValues={instance.toFormData(instance.initialData)}
      validate={validate}
      onSubmit={onSubmit}
    >
      {(props) => {
        instance.setForm(props);
        return (
          <form
            onReset={props.handleReset}
            onSubmit={props.handleSubmit}
          >
            {children}
          </form>
        );
      }}
    </Formik>
  );

};

export default WeaverForm;
