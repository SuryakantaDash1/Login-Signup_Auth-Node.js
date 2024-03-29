import mongoose from 'mongoose';

const { Schema } = mongoose;

const helpCenterSchema = new Schema({
    helpRequestId: {
        type: String,
    },
    message: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const HelpCenter = mongoose.model('helpCenter', helpCenterSchema);

export default HelpCenter;
