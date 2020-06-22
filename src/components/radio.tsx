/**
 * Radio Group
 */

import React from 'react';
import { Field } from 'formik';
import { RadioGroup as _RadioGroup, Radio } from '@blueprintjs/core';

import { MarkupType, Option } from './types';
import { MarkupProps, Markup } from './markup';

export interface RadioGroupProps extends MarkupProps {
  inline?: boolean,
  options: Option[]
}

export default class RadioGroup extends Markup<RadioGroupProps> {

  public readonly type: MarkupType = MarkupType.RadioGroup;

  constructor(props: RadioGroupProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Field name={this.name} type="checkbox">
        {({ field }) => (
          <_RadioGroup
            label={this.label}
            name={this.name}
            inline={this.props.inline}
            onChange={field.onChange}
            selectedValue={field.value}
          >
            {
              this.props.options.map((option, i) => (
                <Radio key={i} label={option.label} value={String(option.value)} />
              ))
            }
          </_RadioGroup>
        )}
      </Field>
    );
  }

}
