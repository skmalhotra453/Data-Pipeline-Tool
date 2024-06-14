import React, { useState } from 'react';
import DataSourceSelector from './components/DataSourceSelector';
import DataSourceForm from './components/DataSourceForm';
import DataVisualization from './components/DataVisualization';

function App() {
  const [selectedSource, setSelectedSource] = useState('');

  return (
    <div className="App">
      <DataSourceSelector onSelect={setSelectedSource} />
      {selectedSource && <DataSourceForm selectedSource={selectedSource} />}
      <DataVisualization />
    </div>
  );
}

export default App;
