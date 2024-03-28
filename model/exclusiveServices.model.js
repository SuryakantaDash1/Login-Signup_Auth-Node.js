import mongoose from "mongoose";

const exclusiveServicesSchema = new mongoose.Schema({
    uniqueId: {
        type: String,
        required: true
    },
    servicesName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
});

export default mongoose.model('ExclusiveServices', exclusiveServicesSchema);
