import express from 'express';
import { getAllExportJobs, createExportJob } from '../controllers/exportJobController.js';

const router = express.Router();

// GET all export jobs
router.get('/getAllExportJobs', getAllExportJobs);

// POST create new export B/L
router.post('/createExportJob', createExportJob);

export default router;