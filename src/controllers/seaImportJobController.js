// backend/controllers/seaImportJobController.js
import SeaImportJob from '../models/SeaImportJob.js';

// CREATE Job
export const createJob = async (req, res) => {
  try {
    const { jobNum, mblNumber } = req.body;

    // Validate required fields
    if (!jobNum) {
      return res.status(400).json({ success: false, message: 'Job Number is required' });
    }

    // Check duplicate job number
    const existingJob = await SeaImportJob.findOne({ jobNum });
    if (existingJob) {
      return res.status(400).json({ success: false, message: 'Job Number already exists' });
    }

    // Optional: Check duplicate MBL
    if (mblNumber) {
      const existingMBL = await SeaImportJob.findOne({ mblNumber });
      if (existingMBL) {
        return res.status(400).json({ success: false, message: 'MBL Number already exists' });
      }
    }

    const job = new SeaImportJob(req.body);
    await job.save();

    res.status(201).json({
      success: true,
      data: job,
      message: 'Sea Import Job created successfully'
    });
  } catch (error) {
    console.error('Create Job Error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET ALL Jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await SeaImportJob.find()
      .populate('vesselId', 'code name')
      .populate('portDepartureId', 'code name')
      .populate('portDischargeId', 'code name')
      .populate('portOfLoadingId', 'code name')
      .populate('originAgentId carrierId shipAgentId principleCustomerId localAgentId', 'code name type')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE Job
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Prevent changing jobNum or duplicate MBL
    if (updates.mblNumber) {
      const existing = await SeaImportJob.findOne({ 
        mblNumber: updates.mblNumber, 
        _id: { $ne: id } 
      });
      if (existing) {
        return res.status(400).json({ success: false, message: 'MBL Number already in use' });
      }
    }

    const job = await SeaImportJob.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('vesselId portDepartureId portDischargeId portOfLoadingId originAgentId carrierId shipAgentId principleCustomerId localAgentId');

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.json({ success: true, data: job, message: 'Job updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};