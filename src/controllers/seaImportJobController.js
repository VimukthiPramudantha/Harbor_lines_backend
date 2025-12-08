// backend/controllers/seaImportJobController.js
import SeaImportJob from '../models/SeaImportJob.js';

// CREATE Job
export const createJob = async (req, res) => {
  try {
    const { jobNum, jobDate } = req.body;
    if (!jobNum || !jobDate) {
      return res.status(400).json({ success: false, message: 'Job Number and Date are required' });
    }

    const existing = await SeaImportJob.findOne({ jobNum });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Job Number already exists' });
    }

    const job = new SeaImportJob(req.body);
    await job.save();

    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET ALL Jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await SeaImportJob.find().sort({ createdAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE Job
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await SeaImportJob.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Job not found' });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};