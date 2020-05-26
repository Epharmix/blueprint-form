import React from 'react';
import { Form, DatePicker } from 'antd';

import { MarkupType, MarkupProps, Markup } from './interfaces';

type DateFormat = 'YYYY-MM-DD' | 'MM/DD/YYYY';

interface DateInputProps extends MarkupProps {
  format?: DateFormat
}

export default class DateInput extends Markup {

  public readonly type: MarkupType = MarkupType.Date;
  public readonly format: DateFormat;

  constructor(props: DateInputProps) {
    super(props);
    this.format = props.format || 'MM/DD/YYYY';
  }

  public render(): JSX.Element {
    const rules = this.getRules();
    return (
      <Form.Item
        label={this.label}
        name={this.name}
        rules={rules}
      >
        <DatePicker
          style={{ width: '100%' }}
        />
      </Form.Item>
    );
  }

}
