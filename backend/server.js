const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.post('/api/data-collect/:source', (req, res) => {
  const source = req.params.source;
  const params = req.body;
  axios.post(`http://localhost:8000/api/collect/${source}/`, params)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.status(500).send('Error collecting data');
    });
});

app.get('/api/visualization', (req, res) => {
  axios.get('http://localhost:8000/api/visualization', { responseType: 'stream' })
    .then(response => {
      response.data.pipe(res);
    })
    .catch(error => {
      res.status(500).send('Error fetching visualization');
    });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
