import mongoose from "mongoose";

const proofOfWorkSchema = new mongoose.Schema({
    uniqueId: {
        type: String,
        required: true
    },
    workName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    // Add more fields as needed
});

export default mongoose.model('ProofOfWork', proofOfWorkSchema);
