const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route for collecting data from CSV
app.post('/api/data-collect/csv', (req, res) => {
  const filePath = req.body.filePath;

  if (!filePath) {
    return res.status(400).json({ message: 'File path is required' });
  }

  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    return res.status(400).json({ message: 'File does not exist' });
  }

  const results = [];

  fs.createReadStream(absolutePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.status(200).json({ message: 'Data collected from CSV', data: results });
    })
    .on('error', (err) => {
      console.error('Error reading CSV file:', err);
      res.status(500).json({ message: 'Error reading CSV file', error: err.message });
    });
});

// Route for fetching visualization data
app.get('/api/visualization', (req, res) => {
  // Example visualization data
  const visualizationData = {
    charts: [
      { type: 'bar', data: [1, 2, 3, 4] },
      { type: 'line', data: [5, 6, 7, 8] }
    ]
  };

  res.status(200).json(visualizationData);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
