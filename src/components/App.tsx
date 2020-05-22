import React from 'react';

interface AppProps {
  name: string;
}

const App = ({ name }: AppProps) => {
  return <div>Hello {name}!</div>;
}

export default App;
