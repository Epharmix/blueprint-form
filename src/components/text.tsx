/**
 * Text Input
 */

import React from 'react';
import { Field } from 'formik';
import { FormGroup, InputGroup, TextArea as _TextArea } from '@blueprintjs/core';

import { MarkupType, FormError } from './types';
import { MarkupProps, Markup } from './markup';

export interface TextInputProps extends MarkupProps {
  type?: string,
  round?: boolean,
  small?: boolean,
  leftIcon?: string,
  leftElement?: JSX.Element,
  rightElement?: JSX.Element,
  placeholder?: string,
  pattern?: RegExp,
  patternError?: string
}

export default class TextInput extends Markup<TextInputProps> {
  
  public readonly type: MarkupType = MarkupType.Text;
  private ref: HTMLInputElement;

  constructor(props: TextInputProps) {
    super(props);
    this.validate = this.validate.bind(this);
    this.ref = null;
  }

  public componentDidMount(): void {
    this.ref.setAttribute('aria-label', this.props.label);
    this.ref.setAttribute('aria-describedby', this.errorId);
  }

  private validate(value: string | null): FormError {
    let error = this._validate(value);
    if (!error && value != null) {
      if (this.props.pattern && !this.props.pattern.test(value)) {
        error = this.props.patternError || 'This is not in valid format!';
      }
    }
    if (!error && this.props.validate) {
      error = this.props.validate(value);
    }
    return error;
  }

  private getInput(field, meta): JSX.Element {
    return (
      <InputGroup
        inputRef={(ref) => this.ref = ref}
        className={this.props.className}
        style={this.props.style}
        fill={this.props.fill}
        large={this.props.large}
        small={this.props.small}
        leftIcon={this.props.leftIcon}
        leftElement={this.props.leftElement}
        rightElement={this.props.rightElement}
        placeholder={this.props.placeholder}
        id={this.id}
        intent={meta.error && meta.touched ? 'danger' : 'none'}
        disabled={this.props.disabled}
        type={this.props.type}
        autoComplete={this.props.autoComplete}
        {...field} 
      />
    );
  }

  public render(): JSX.Element {
    return (
      <Field name={this.props.name} validate={this.validate}>
        {({ field, meta }) => {
          const input = this.getInput(field, meta);
          if (this.props.bare) {
            return input;
          }
          return (
            <FormGroup
              label={this.props.label}
              labelFor={this.id}
              labelInfo={this.props.required ? '(required)' : ''}
              intent={meta.error && meta.touched ? 'danger' : 'none'}
              helperText={meta.touched ? this.getErrorNode(meta.error) : null}
            >
              {this.getInput(field, meta)}
            </FormGroup>
          );
        }}
      </Field>
    );
  }

}

export interface TextAreaProps extends MarkupProps {
  placeholder?: string,
  pattern?: RegExp,
  patternError?: string
  growVertically?: boolean
}

export class TextArea extends Markup<TextAreaProps> {

  public readonly type: MarkupType = MarkupType.TextArea;
  private ref: HTMLTextAreaElement;

  constructor(props: TextInputProps) {
    super(props);
    this.validate = this.validate.bind(this);
    this.ref = null;
  }

  public componentDidMount(): void {
    this.ref.setAttribute('aria-label', this.props.label);
    this.ref.setAttribute('aria-describedby', this.errorId);
  }

  private validate(value: string | null): FormError {
    let error = this._validate(value);
    if (!error && value != null) {
      if (this.props.pattern && !this.props.pattern.test(value)) {
        error = this.props.patternError || 'This is not in valid format!';
      }
    }
    if (!error && this.props.validate) {
      error = this.props.validate(value);
    }
    return error;
  }

  private getInput(field, meta): JSX.Element {
    return (
      <_TextArea
        inputRef={(ref) => this.ref = ref}
        className={this.props.className}
        style={Object.assign({
          resize: 'none'
        }, this.props.style)}
        id={this.id}
        fill={this.props.fill}
        large={this.props.large}
        growVertically={this.props.growVertically}
        intent={meta.error && meta.touched ? 'danger' : 'none'}
        placeholder={this.props.placeholder}
        disabled={this.props.disabled}
        autoComplete={this.props.autoComplete}
        {...field} 
      />
    );
  }

  public render(): JSX.Element {
    return (
      <Field name={this.props.name} validate={this.validate}>
        {({ field, meta }) => {
          const input = this.getInput(field, meta);
          if (this.props.bare) {
            return input;
          }
          return (
            <FormGroup
              label={this.props.label}
              labelFor={this.id}
              labelInfo={this.props.required ? '(required)' : ''}
              intent={meta.error && meta.touched ? 'danger' : 'none'}
              helperText={meta.touched ? this.getErrorNode(meta.error) : null}
            >
              {input}
            </FormGroup>
          );
        }}
      </Field>
    );
  }

}
