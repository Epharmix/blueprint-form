/**
 * Text Input
 */

import React from 'react';
import { Form, Input } from 'antd';

import { MarkupType, MarkupProps, Markup } from './interfaces';

interface TextInputProps extends MarkupProps {
  pattern?: RegExp
}

export default class TextInput extends Markup {
  
  public readonly type: MarkupType = MarkupType.Text;
  public readonly pattern?: RegExp;

  constructor(props: TextInputProps) {
    super(props);
    this.pattern = props.pattern;
  }

  private _getRules(): any[] {
    const rules: any[] = this.getRules();
    if (this.pattern != null) {
      rules.push({
        pattern: this.pattern,
        message: 'The format is invalid, please check and try again!'
      });
    }
    return rules;
  }

  public render(): JSX.Element {
    const rules = this._getRules();
    return (
      <Form.Item
        label={this.label}
        name={this.name}
        rules={rules}
      >
        <Input />
      </Form.Item>
    );
  }

}
