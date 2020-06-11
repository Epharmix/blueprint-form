/**
 * Submit Button
 */

import React from 'react';
import { Button } from '@blueprintjs/core';

import { MarkupType } from './types';
import { MarkupProps, Markup } from './markup';

interface SubmitButtonProps extends MarkupProps {
  icon?: JSX.Element
}

export default class SubmitButton extends Markup<SubmitButtonProps> {
  
  public readonly type: MarkupType = MarkupType.Submit;

  constructor(props: SubmitButtonProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Button type="submit" icon={this.props.icon}>
        {this.props.children}
      </Button>
    );
  }

}
