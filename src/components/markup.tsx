import uid from 'uid';

import { Component } from 'react';

import { MarkupType } from './types';

export interface MarkupProps {
  label?: string,
  name?: string,
  required?: boolean
}

export abstract class Markup<P extends MarkupProps> extends Component<P> {

  public readonly abstract type: MarkupType;
  public readonly label?: string;
  public readonly name?: string;
  public required?: boolean;

  protected readonly id: string;

  constructor(props: P) {
    super(props);
    this.label = props.label;
    this.name = props.name;
    this.required = props.required;
    this.id = uid(16);
  }

  protected getRules(): any[] {
    const rules: any[] = [];
    if (this.required) {
      rules.push({
        required: true,
        message: 'This is required!'
      });
    }
    return rules;
  }

  public abstract render(): JSX.Element;

}
