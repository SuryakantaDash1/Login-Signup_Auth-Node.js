import mongoose from "mongoose";

const exclusiveGallerySchema = new mongoose.Schema({
    uniqueId: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
});

export default mongoose.model('ExclusiveGallery', exclusiveGallerySchema);
