import { Component } from 'react';

export enum MarkupType {
  Text = 'text',
  Date = 'date',
  Submit = 'submit'
}

export interface MarkupProps {
  label?: string,
  name?: string,
  required?: boolean
}

export abstract class Markup extends Component<MarkupProps> {

  public readonly abstract type: MarkupType;
  public readonly label?: string;
  public readonly name?: string;
  public required?: boolean;

  constructor(props: MarkupProps) {
    super(props);
    this.label = props.label;
    this.name = props.name;
    this.required = props.required;
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
