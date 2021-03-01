/**
 * Form instance
 */

import React, { useEffect, useState, useRef } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
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
  const { values, isValid, dirty } = context;
  useDeepCompareEffect(() => {
    onChange(context);
  }, [values, isValid, dirty]);
  return null;
};

interface FormikOnErrorProps {
  form: HTMLFormElement;
}

const isObject = (object: any): boolean => {
  return typeof object === 'object' && object !== null;
};

const getFirstErrorKey = (object: any, keys: string[] = []): string => {
  const firstErrorKey = Object.keys(object)[0];
  if (isObject(object[firstErrorKey])) {
    return getFirstErrorKey(object[firstErrorKey], [...keys, firstErrorKey]);
  }
  return [...keys, firstErrorKey].join('.');
};

const FormikOnError = <Values extends FormikValues>({ form }: FormikOnErrorProps) => {
  const { errors, isValid, submitCount: _submitCount } = useFormikContext<Values>();
  const [submitCount, setSubmitCount] = useState(_submitCount);
  useEffect(() => {
    if (!isValid && form && _submitCount > submitCount) {
      const key = getFirstErrorKey(errors);
      const inputs = form.querySelectorAll<HTMLInputElement>(`[name="${key}"]`);
      if (inputs && inputs.length > 0) {
        const input = inputs[0];
        input.focus();
        input.scrollIntoView({ behavior: 'smooth' });
      }
      setSubmitCount(_submitCount);
    }
  }, [errors, isValid, _submitCount]);
  return null;
};

interface FormProps<Values extends FormikValues, S extends any = never> {
  form: FormInstance<Values, S>,
  validate?: (values: Values) => void | FormErrors | Promise<FormErrors>;
  validateOnChange?: boolean;
  children?: ((props: FormikProps<Values>) => JSX.Element) | JSX.Element | JSX.Element[],
  onSubmit?: (data: any) => void,
  onChange?: (data: any, isValid: boolean) => void,
  className?: string,
  style?: React.CSSProperties
}

const Form = <Values extends FormikValues, S extends any = never>({
  form: instance,
  validate,
  validateOnChange,
  children,
  onSubmit,
  onChange,
  className,
  style
}: FormProps<Values, S>): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);
  const _onChange = ({ values, isValid, dirty }: FormikContextType<Values>) => {
    if (dirty) {
      instance.onChange(values, isValid, onChange);
    }
  };
  return (
    <Formik<Values>
      initialValues={instance.initialData}
      validate={validate}
      validateOnChange={validateOnChange}
      validateOnMount={true}
      onSubmit={(data) => instance.onSubmit(data, onSubmit)}
    >
      {(props) => {
        instance.setForm(props);
        return (
          <form
            ref={formRef}
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
            <FormikOnChange<Values> onChange={_onChange} />
            <FormikOnError<Values> form={formRef.current} />
          </form>
        );
      }}
    </Formik>
  );
};

export default Form;
