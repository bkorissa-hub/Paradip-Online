const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    content: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    enabled: {
        type: Boolean,
        default: true,
    },
});

const pageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
        },
        sections: [sectionSchema],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Page', pageSchema);
