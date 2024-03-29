import mongoose from 'mongoose';

const { Schema } = mongoose;

const faqSchema = new Schema({
    questionId: {
        type: String,
    },
    Question: {
        type: String,
        required: true
    },
    Answer: {
        type: String,
        required: true
    }
});

const Faq = mongoose.model('Faq', faqSchema);

export default Faq;
