const express = require('express');
const multer = require('multer');
const MyImage = require('./models/Image');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3030;
app.use(cors());

const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/file_upload', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './uploads');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'Only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(null, true); // continue with upload
  },
});

app.post('/up', upload.single('file'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const { path, mimetype } = req.file;
    const myImage = new MyImage({
      title,
      description,
      file_path: path,
      file_mimetype: mimetype,
    });
    await myImage.save();
    res.json(myImage);
  } catch (error) {
    console.error(error);
    res.status(500).json('Error during file upload.');
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/getfiles', async (req, res) => {
    try {
      const files = await MyImage.find({});
      const sortedByCreationDate = files.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      
    

      res.send(sortedByCreationDate);
    } catch (error) {
      res.status(400).send('Error while getting list of files. Try again later.');
    }
  });

  
  app.get('/download/:id', async (req, res) => {
    try {
      const file = await MyImage.findById(req.params.id);
      res.set({
        'Content-Type': file.file_mimetype
      });
      res.sendFile(path.join(__dirname, file.file_path));
    } catch (error) {
      res.status(400).send('Error while downloading file. Try again later.');
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
