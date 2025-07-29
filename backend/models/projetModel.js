const mongoose = require('mongoose')
const validator = require('validator')
const slugify = require('slugify')

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the project.'],
  },
  slug: {
    type: String,
    unique: true
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
  demoLink: {
    type: String,
    required: [true, 'Please provide a link to the project demo.'],
    validate: [validator.isURL, 'Please provide a valid URL.'],
  },
  imageURL: {
    type: String,
    required: [true, 'Please provide an image URL for the project.'],
    validate: [validator.isURL, 'Please provide a valid URL.'],
  },
}, { timestamps: true })

projectSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  next()
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project
