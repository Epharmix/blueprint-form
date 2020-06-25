/**
 * Submit Button
 */

import React from 'react';
import { Button, IButtonProps } from '@blueprintjs/core';

import { MarkupType } from './types';
import { MarkupProps, Markup } from './markup';

interface SubmitButtonProps extends MarkupProps {
  validate?: never
}

export default class SubmitButton extends Markup<SubmitButtonProps & IButtonProps> {
  
  public readonly type: MarkupType = MarkupType.Submit;

  constructor(props: SubmitButtonProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Button
        {...this.props}
        className={this.props.className}
        style={this.props.style}
        type="submit"
        disabled={this.props.disabled}
      >
        {this.props.children}
      </Button>
    );
  }

}
