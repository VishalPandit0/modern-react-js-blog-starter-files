const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
const port = 3001; // You can change the port if needed

app.use(bodyParser.json());

app.post('/api/addBlog', (req, res) => {
  const blogData = req.body;

  // Read existing data from the JSON file
  let existingData = [];
  try {
    existingData = require('./blogsData.json');
  } catch (error) {
    // File does not exist yet
  }

  // Add the new blog data to the existing data
  existingData.push(blogData);

  // Write the updated data back to the JSON file
  fs.writeFileSync('./blogsData.json', JSON.stringify(existingData, null, 2));

  res.json({ success: true, message: 'Blog data added successfully!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
