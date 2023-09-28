const mongoose = require('mongoose');

const fileSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    file_path: {
      type: String,
     
    },
    file_mimetype: {
      type: String,
     
    }
  },
  {
    timestamps: true
  }
);

const File = mongoose.model('File', fileSchema);

module.exports = File;