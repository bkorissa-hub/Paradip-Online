const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      unique: true,
    },
    jobCardNo: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    customer: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    gadget: {
      brand: String,
      model: String,
      productName: String, // e.g., Laptop, Printer
      serial: String,
      condition: String,
    },
    images: {
      type: [String], // Array of Cloudinary WebP URLs
      default: [],
    },
    estimatedPrice: {
      type: Number,
      default: 0,
    },
    advanceReceived: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      default: '123456', // Default password for new tickets
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: [
        'Open',
        'Diagnosing',
        'In Progress',
        'Awaiting Parts',
        'Ready for Pickup',
        'Closed',
        'Cancelled'
      ],
      default: 'Open',
    },
    date: {
      type: String,
    },
    comment: {
      type: String,
      default: '',
    },
    history: [
      {
        status: String,
        note: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Auto-generate ticketId and default jobCardNo if missing
ticketSchema.pre('save', async function (next) {
  if (!this.ticketId) {
    const count = await mongoose.model('Ticket').countDocuments();
    this.ticketId = `TCK-${1000 + count + 1}`;
  }
  if (!this.jobCardNo) {
    this.jobCardNo = this.ticketId; // Default jobCardNo to ticketId if not explicitly provided
  }
  if (!this.date) {
    this.date = new Date().toISOString().split('T')[0];
  }
  next();
});

ticketSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret.ticketId;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Ticket', ticketSchema);
