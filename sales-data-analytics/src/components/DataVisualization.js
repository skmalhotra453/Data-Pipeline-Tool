import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataVisualization() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    axios.get('/api/visualization', { responseType: 'blob' })
      .then(response => {
        const url = URL.createObjectURL(response.data);
        setImageUrl(url);
      });
  }, []);

  return (
    <div>
      {imageUrl && <img src={imageUrl} alt="Visualization" />}
    </div>
  );
}

export default DataVisualization;
