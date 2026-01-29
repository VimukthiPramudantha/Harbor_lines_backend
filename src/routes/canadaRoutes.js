// backend/routes/canadaRoutes.js
import express from 'express';
import { createManifest, getAllManifests, updateHBLCharges } from '../controllers/canadaController.js';

const router = express.Router();

router.post('/createManifest', createManifest);
router.get('/getAllManifests', getAllManifests);
router.put('/updateHBLCharges/:manifestId/:hblNumber', updateHBLCharges);

export default router;