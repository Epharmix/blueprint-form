/**
 * Submit Button
 */

import React from 'react';
import { Button } from '@blueprintjs/core';

import { MarkupType } from './types';
import { MarkupProps, Markup } from './markup';

interface SubmitButtonProps extends MarkupProps {
  icon?: JSX.Element,
  validate?: never
}

export default class SubmitButton extends Markup<SubmitButtonProps> {
  
  public readonly type: MarkupType = MarkupType.Submit;

  constructor(props: SubmitButtonProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Button
        className={this.props.className}
        style={this.props.style}
        type="submit"
        icon={this.props.icon}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </Button>
    );
  }

}
