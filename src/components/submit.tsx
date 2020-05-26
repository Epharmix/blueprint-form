/**
 * Submit Button
 */

import React from 'react';
import { Form, Button } from 'antd';

import { MarkupType, MarkupProps, Markup } from './interfaces';

export default class SubmitButton extends Markup {
  
  public readonly type: MarkupType = MarkupType.Submit;

  constructor(props: MarkupProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {this.props.children}
        </Button>
      </Form.Item>
    );
  }

}
