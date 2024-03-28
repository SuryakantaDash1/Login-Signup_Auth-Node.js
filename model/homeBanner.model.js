import mongoose from "mongoose";

const homeBannerSchema = new mongoose.Schema({
    uniqueId: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
});

export default mongoose.model('HomeBanner', homeBannerSchema);
