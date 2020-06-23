import '../src/style.scss';

import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Card, Button, Toaster, Intent, Position } from '@blueprintjs/core';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-okaidia.css';

import Enroll from './enroll';

const App = () => {

  const [rawData, setRawData] = useState('');
  const [formData, setFormData] = useState(undefined);
  const [isDisabled, setIsDisabled] = useState(false);

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  const onSubmit = (data: any) => {
    setRawData(JSON.stringify(data, null, 2));
  };

  const setData = (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const data = JSON.parse(rawData);
      setFormData(data);
    } catch (err) {
      Toaster.create({
        position: Position.TOP
      }).show({
        intent: Intent.DANGER,
        message: 'The form data is not valid JSON, please check!'
      });
      return;
    }
  };

  return (
    <div style={{ padding: '0 20px' }}>
      <h1>Weaver Form Example</h1>
      <Card
        style={{
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <div style={{
          width: '50%'
        }}>
          <Enroll
            data={formData}
            isDisabled={isDisabled}
            onSubmit={onSubmit}
          />
        </div>
        <Card className="exclude-axe" style={{
          marginLeft: '20px',
          width: '50%'
        }}>
          <Editor
            highlight={value => highlight(value, languages.json)}
            value={rawData}
            onValueChange={(value) => setRawData(value)}
            tabSize={2}
            insertSpaces={true}
            style={{
              minHeight: '150px',
              backgroundColor: '#1E1E1E',
              caretColor: '#FFF',
              color: '#FFF'
            }}
            padding={20}
          />
          <br />
          <Button
            style={{
              marginRight: '10px'
            }}
            onClick={setData}
          >
            Set Data
          </Button>
          <Button onClick={toggleDisabled}>
            Toggle Disabled
          </Button>
        </Card>
      </Card>
    </div>
  );

};

const render = () => {
  ReactDOM.render(<App />, document.querySelector('#container'));
};

import('react-axe').then(({ default: axe }) => {
  axe(React, ReactDOM, 1000, {}, {
    exclude: [['.exclude-axe']]
  });
  render();
});

/* eslint-disable no-console */

if (module && module.hot) {
  module.hot.accept();
  module.hot.addStatusHandler((status) => {
    if (status === 'prepare') console.clear();
  });
}
