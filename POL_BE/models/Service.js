const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    icon: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    detailedDescription: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: 'General',
    },
    features: {
      type: [String],
      default: [],
    },
    price: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      default: 'blue',
    },
    popular: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

serviceSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Service', serviceSchema);
