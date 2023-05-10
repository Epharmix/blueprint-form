import React, {
  useContext,
  createContext
} from 'react';

import {
  FormikValues,
  useFormikContext,
  FormikContextType
} from 'formik';

interface FormExtraContextValue {
  isDisabled?: boolean;
  setIsDisabled?: boolean;
}

export const FormExtraContext = createContext<FormExtraContextValue>({
  isDisabled: null
});

interface FormExtraContextProviderProps {
  isDisabled?: boolean;
}

export const FormExtraContextProvider: React.FC<FormExtraContextProviderProps> = (props) => {
  const value: FormExtraContextValue = {
    isDisabled: props.isDisabled
  };
  return <FormExtraContext.Provider value={value} {...props} />;
};

export const useFormContext = <Values extends FormikValues>(): FormikContextType<Values> & FormExtraContextValue => {
  return {
    ...useContext(FormExtraContext),
    ...useFormikContext<Values>()
  };
};
