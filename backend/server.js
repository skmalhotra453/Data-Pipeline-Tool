const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.post('/api/data-collect/:source', async (req, res) => {
  const source = req.params.source;
  const params = req.body;

  try {
    const response = await axios.post(`http://localhost:8000/api/data-collect/${source}/`, params);
    res.send(response.data);
  } catch (error) {
    console.error('Error collecting data:', error.message);
    res.status(500).send('Error collecting data');
  }
});

app.get('/api/visualization', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:8000/api/visualization', { responseType: 'stream' });
    response.data.pipe(res);
  } catch (error) {
    console.error('Error fetching visualization:', error.message);
    res.status(500).send('Error fetching visualization');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
