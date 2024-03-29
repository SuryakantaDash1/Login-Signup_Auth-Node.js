import faqSchema from "../models/faq.js";
import ShortUniqueId from 'short-unique-id';

export const createFaq = async (req, res) => {
  try {
    const { Question, Answer } = req.body;
    const uid = new ShortUniqueId({ length: 10 });
    const unId = uid();

    const faq = new faqSchema({
      questionId: `FAQ_${unId}`.toUpperCase(),
      Question,
      Answer  
    });
    const result = await faq.save();
    console.log(result);
    res.status(200).json({ message: "FAQ added !!", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFaq = async (req, res) => {
  try {
    const findFaq = await faqSchema.find();
    console.log(findFaq);
    res.status(200).json({ message: "FAQ fetched!!", findFaq });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFaqById = async (req, res) => {
  const { id } = req.params;
  try {
    const findFaq = await faqSchema.findById(id);
    if (!findFaq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    res.status(200).json({ message: "FAQ fetched successfully!!", findFaq });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeFaq = async (req, res) => {
  const { id } = req.params;
  try {
    const findFaq = await faqSchema.findById(id);
    if (!findFaq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    const removedFaq = await faqSchema.findByIdAndRemove(id);
    res.status(200).json({ message: "FAQ removed successfully!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
