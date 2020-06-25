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
  options: Option[],
  validate?: never
}

export default class RadioGroup extends Markup<RadioGroupProps> {

  public readonly type: MarkupType = MarkupType.RadioGroup;

  constructor(props: RadioGroupProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Field name={this.props.name} type="checkbox">
        {({ field }) => (
          <_RadioGroup
            className={this.props.className}
            label={this.props.label}
            name={this.props.name}
            inline={this.props.inline}
            onChange={field.onChange}
            selectedValue={field.value}
            disabled={this.props.disabled}
          >
            {
              this.props.options.map((option, i) => (
                <Radio
                  style={this.props.style}
                  large={this.props.large}
                  key={i}
                  label={option.label}
                  value={String(option.value)}
                />
              ))
            }
          </_RadioGroup>
        )}
      </Field>
    );
  }

}
