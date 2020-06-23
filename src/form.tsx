/**
 * Form instance
 */

import React from 'react';
import { Formik, FormikValues, FormikProps } from 'formik';

import { FormErrors } from './components/types';
import FormInstance from './instance';
import { isFunction } from './utils';

interface FormProps<Values extends FormikValues> {
  form: FormInstance<Values>,
  validate?: (values: Values) => void | FormErrors | Promise<FormErrors>;
  children?: ((props: FormikProps<Values>) => JSX.Element) | JSX.Element | JSX.Element[],
  onSubmit: (data: any) => void
}

const WeaverForm = <Values extends FormikValues>({form: instance, validate, children, onSubmit}: FormProps<Values>): JSX.Element => {

  return (
    <Formik
      initialValues={instance.initialData}
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
            {
              children
                ? isFunction(children)  
                  ? (children as (props: FormikProps<Values>) => JSX.Element)(props)
                  : children
                : null
            }
          </form>
        );
      }}
    </Formik>
  );

};

export default WeaverForm;
