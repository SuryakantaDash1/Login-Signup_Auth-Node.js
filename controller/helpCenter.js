import helpCenterSchema from '../models/helpCenter.js';
import ShortUniqueId from 'short-unique-id';

export const createConcernRequest = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const uid = new ShortUniqueId({ length: 10 });
    const unId = uid();

    const createRequest = new helpCenterSchema({
      helpRequestId: `HELP_${unId}`.toUpperCase(),
      userId,
      message
    });

    const result = await createRequest.save();
    res.status(200).json({ success: true, message: 'Concern request received successfully', result });
  } catch (error) {
    console.error('Error processing concern request:', error.message);
    res.status(400).json({ success: false, error: error.message });
  }
};
