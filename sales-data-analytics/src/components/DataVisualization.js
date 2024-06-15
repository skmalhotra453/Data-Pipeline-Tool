import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataVisualization() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/visualization', { responseType: 'blob' });
        const url = URL.createObjectURL(response.data);
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching the visualization:', error);
      }
    };

    fetchData();

    // Cleanup function to revoke the object URL
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div>
      {imageUrl && <img src={imageUrl} alt="Visualization" />}
    </div>
  );
}

export default DataVisualization;
