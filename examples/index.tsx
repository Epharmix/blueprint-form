import ReactDOM from 'react-dom';
import React, { useState, useRef } from 'react';
import { Layout, Card, Button, Modal } from 'antd';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-okaidia.css';

const { Content } = Layout;

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
      Modal.error({
        title: 'Invalid Form Data',
        content: 'The form data is not valid JSON, please check!'
      });
      return;
    }
  };

  return (
    <Layout>
      <Content style={{ padding: '50px' }}>
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
          <Button type="primary" onClick={setData}>
            Set Data
          </Button>
        </Card>
      </Content>
    </Layout>
  );

};

ReactDOM.render(<App />, document.querySelector('#container'));

if (module && module.hot) {
  module.hot.accept();

  module.hot.addStatusHandler((status) => {
    if (status === 'prepare') console.clear();
  });
}
