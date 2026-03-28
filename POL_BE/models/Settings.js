const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    showScrollingHeadline: {
      type: Boolean,
      default: true,
    },
    showSidebar: {
      type: Boolean,
      default: false,
    },
    enableTicketing: {
      type: Boolean,
      default: false,
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    headlines: {
      type: [String],
      default: [],
    },
    contactDefaults: {
      address: {
        type: String,
        default: "Paradeep Online Computer Service,\nUnit -1, Badapadia, Vijay Market,\nParadip, Odisha, India - 754142"
      },
      email: {
        type: String,
        default: "mail@paradiponline.com"
      },
      salesPhone: {
        type: String,
        default: "+91-9583839432"
      },
      supportPhone: {
        type: String,
        default: "+91-9439869690"
      },
      complaintsPhone: {
        type: String,
        default: "+91-7008700609"
      }
    }
  },
  {
    timestamps: true,
  }
);

settingsSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

// Ensure singleton pattern
settingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model('Settings', settingsSchema);
