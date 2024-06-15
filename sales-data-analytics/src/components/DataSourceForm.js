import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

function DataSourceForm({ selectedSource }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({});
  }, [selectedSource]);

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/data-collect/${selectedSource}`, formData);
      console.log('Data collected:', response.data);
    } catch (error) {
      console.error('Error collecting data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {selectedSource === 's3' && (
        <>
          <TextField 
            label="AWS Access Key" 
            name="awsAccessKey" 
            onChange={handleChange} 
            required 
          />
          <TextField 
            label="AWS Secret Key" 
            name="awsSecretKey" 
            onChange={handleChange} 
            required 
          />
          <TextField 
            label="Bucket Name" 
            name="bucketName" 
            onChange={handleChange} 
            required 
          />
          <TextField 
            label="Object Key" 
            name="objectKey" 
            onChange={handleChange} 
            required 
          />
        </>
      )}
      {/* Add similar fields for other data sources as needed */}
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
}

export default DataSourceForm;
