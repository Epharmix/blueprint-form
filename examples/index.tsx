import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Card, Button, Toaster, Intent, Position } from '@blueprintjs/core';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-okaidia.css';

import Enroll, { EnrollData } from './enroll';

const App = () => {

  const [rawData, setRawData] = useState('');
  const [formData, setFormData] = useState(null);

  const onSubmit = (data: EnrollData) => {
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
    <Card>
      <Enroll
        data={formData}
        onSubmit={onSubmit}
      />
      <br />
      <Card>
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
        <Button onClick={setData}>
          Set Data
        </Button>
      </Card>
    </Card>
  );

};

ReactDOM.render(<App />, document.querySelector('#container'));

if (module && module.hot) {
  module.hot.accept();

  module.hot.addStatusHandler((status) => {
    if (status === 'prepare') console.clear();
  });
}
