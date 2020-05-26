import moment from 'moment-timezone';

import React, { useEffect } from 'react';
import {
  Card,
  Row,
  Col
} from 'antd';

import {
  Form,
  FormInstance,
  DateInput,
  TextInput,
  SubmitButton
} from '../src/index';

export interface EnrollData {
  start?: string,
  end?: string,
  firstName?: string,
  lastName?: string
}

const DATE_FORMAT = 'YYYY-MM-DD';

class EnrollFormInstance extends FormInstance {

  public getData(): EnrollData {
    const values = this._getData();
    const start = values.start as moment.Moment;
    const end = values.end as moment.Moment;
    const data = {
      start: start ? start.format(DATE_FORMAT) : null,
      end: end ? end.format(DATE_FORMAT) : null,
      firstName: values.firstName || '',
      lastName: values.lastName || ''
    };
    return data;
  }

  public setData(data: EnrollData): void {
    let start: moment.Moment = null;
    if (data.start) {
      const _start = moment(data.start, DATE_FORMAT, true);
      if (_start.isValid()) {
        start = _start;
      }
    }
    let end: moment.Moment = null;
    if (data.end) {
      const _end = moment(data.end, DATE_FORMAT, true);
      if (_end.isValid()) {
        end = _end;
      }
    }
    const values = {
      start: start,
      end: end,
      firstName: data.firstName,
      lastName: data.lastName
    };
    this._setData(values);
  }

}

export interface EnrollProps {
  data?: EnrollData,
  onSubmit: (data: EnrollData) => void
}

const Enroll = ({ onSubmit, data }: EnrollProps): JSX.Element => {

  const form = new EnrollFormInstance();

  useEffect(() => {
    if (!data) {
      return;
    }
    form.setData(data);
  }, [data]);

  return (
    <Card>
      <Form
        form={form}
        layout="vertical"
        onSubmit={onSubmit}
      >
        <Row gutter={12}>
          <Col span={12}>
            <DateInput
              label="Start Date"
              name="start"
              required
            />
          </Col>
          <Col span={12}>
            <DateInput
              label="End Date"
              name="end"
            />
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <TextInput
              label="First Name"
              name="firstName"
              required
            />
          </Col>
          <Col span={12}>
            <TextInput
              label="Last Name"
              name="lastName"
            />
          </Col>
        </Row>
        <SubmitButton>
          Get Data
        </SubmitButton>
      </Form>
    </Card>
  )

};

export default Enroll;
