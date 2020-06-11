/**
 * Switch Input
 */

import React from 'react';
import { Field } from 'formik';
import { Switch } from '@blueprintjs/core';

import { MarkupType } from './types';
import { MarkupProps, Markup } from './markup';

export interface SwitchInputProps extends MarkupProps {
  innerLabel?: string,
  innerLabelChecked?: string
}

export default class SwitchInput extends Markup<SwitchInputProps> {
  
  public readonly type: MarkupType = MarkupType.Switch;

  constructor(props: SwitchInputProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Field name={this.name} type="checkbox">
        {({ field }) => (
          <Switch
            id={this.id}
            labelElement={<label htmlFor={this.id}>{this.label}</label>}
            checked={field.checked}
            name={field.name}
            onChange={field.onChange}
            onBlur={field.onBlur}
            innerLabel={this.props.innerLabel}
            innerLabelChecked={this.props.innerLabelChecked}
          />
        )}
      </Field>
    );
  }

}
