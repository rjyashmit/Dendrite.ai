const express = require('express');
const multer = require('multer'); // For handling file uploads
const model = require('./model'); // Your ML model handling file

const app = express();
const port = 3001;

app.use(express.json());

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  const imageBuffer = req.file.buffer; // Get uploaded image buffer

  // Pass image buffer to model for prediction
  const predictions = model.predict(imageBuffer);

  res.json({ predictions });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
