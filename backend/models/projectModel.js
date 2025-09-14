const mongoose = require('mongoose')
const validator = require('validator')

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the project.'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description.'],
  },
  tags: {
    type: [String],
    default: [],
  },
  codeLink: {
    type: String,
    required: [true, 'Please provide a link to the project code.'],
    validate: [validator.isURL, 'Please provide a valid URL.'],
  },
  isFinished: {
    type: Boolean,
    required: true,
    default: false
  },
  link: {
    type: String,
    required: function () {
      return this.isFinished;
    },
    validate: [validator.isURL, 'Please provide a valid URL.'],
  },
  imageUrl: {
    type: String,
    validate: [validator.isURL, 'Please provide a valid URL.'],
  },
}, { timestamps: true })


const Project = mongoose.model('Project', projectSchema)
module.exports = Project
