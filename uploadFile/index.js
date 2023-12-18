const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json()); // Parse JSON request bodies

app.post('/upload', (req, res) => {
    console.log(`Received file upload request with ${req.files} files`);
  if (!req.body || !req.body.image) {
    return res.status(400).json({ error: 'No image data provided' });
  }

  // Assuming the data is base64 encoded
  const base64Data = req.body.image.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');

  // Specify the file path where you want to save the image
  const filePath = 'uploads/image.jpg';

  // Write the file to the specified path
  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error('Error saving file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    } else {
      return res.status(200).json({ message: 'File uploaded successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
