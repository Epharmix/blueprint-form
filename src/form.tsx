/**
 * Form instance
 */

import React, { useEffect } from 'react';
import {
  Formik,
  FormikValues,
  FormikProps,
  FormikContextType,
  useFormikContext
} from 'formik';

import { FormErrors } from './components/types';
import FormInstance from './instance';
import { isFunction } from './utils';

interface FormikOnChangeProps<Values extends FormikValues> {
  onChange: (context: FormikContextType<Values>) => void;
}

const FormikOnChange = <Values extends FormikValues>({ onChange }: FormikOnChangeProps<Values>) => {
  const context = useFormikContext<Values>();
  useEffect(() => {
    onChange(context);
  }, [context, onChange]);
  return null;
};

interface FormProps<Values extends FormikValues> {
  form: FormInstance<Values>,
  validate?: (values: Values) => void | FormErrors | Promise<FormErrors>;
  validateOnChange?: boolean;
  children?: ((props: FormikProps<Values>) => JSX.Element) | JSX.Element | JSX.Element[],
  onSubmit?: (data: any) => void,
  onChange?: (data: any) => void,
  className?: string,
  style?: React.CSSProperties
}

const Form = <Values extends FormikValues>({
  form: instance,
  validate,
  validateOnChange,
  children,
  onSubmit,
  onChange,
  className,
  style
}: FormProps<Values>): JSX.Element => {
  const _onChange = ({ values, isValid, dirty }: FormikContextType<Values>) => {
    if (onChange && isValid && dirty) {
      onChange(values);
    }
  };
  return (
    <Formik<Values>
      initialValues={instance.initialData}
      validate={validate}
      validateOnChange={validateOnChange}
      validateOnMount={true}
      onSubmit={onSubmit}
    >
      {(props) => {
        instance.setForm(props);
        return (
          <form
            className={className}
            style={style}
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
            <FormikOnChange<Values>
              onChange={_onChange}
            />
          </form>
        );
      }}
    </Formik>
  );
};

export default Form;
