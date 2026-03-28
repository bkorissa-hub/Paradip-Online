const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      trim: true,
    },
    author: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
    },
    readTime: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    contentPath: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

blogSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
