import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

function DataSourceForm({ selectedSource }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({});
  }, [selectedSource]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/data-collect/${selectedSource}`, formData)
      .then(response => {
        console.log('Data collected:', response.data);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {selectedSource === 's3' && (
        <>
          <TextField label="AWS Access Key" name="awsAccessKey" onChange={handleChange} required />
          <TextField label="AWS Secret Key" name="awsSecretKey" onChange={handleChange} required />
          <TextField label="Bucket Name" name="bucketName" onChange={handleChange} required />
          <TextField label="Object Key" name="objectKey" onChange={handleChange} required />
        </>
      )}
      {/* Add similar fields for other data sources */}
      <Button variant="contained" type="submit">Submit</Button>
    </form>
  );
}

export default DataSourceForm;
