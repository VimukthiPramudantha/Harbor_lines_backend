// backend/routes/canadaRoutes.js
import express from 'express';
import { createManifest, getAllManifests } from '../controllers/canadaController.js';

const router = express.Router();

router.post('/createManifest', createManifest);
router.get('/getAllManifests', getAllManifests);

export default router;