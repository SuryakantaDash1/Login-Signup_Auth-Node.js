import mongoose from 'mongoose';

const { Schema } = mongoose;

const userRequestSchema = new Schema({
    serviceId: {
        type: String,
    },
    requiredServices: {
        type: [String],
        required: true
    },
    additionalServices: {
        type: [String]
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    siteImage: {
        name: {
            type: String,
        },
        path: {
            type: String,
        }
    },
    siteArea: {
        type: String
    },
    siteSpaceType: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const UserRequest = mongoose.model('UserRequest', userRequestSchema);

export default UserRequest;
