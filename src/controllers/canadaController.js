// backend/controllers/canadaController.js
import mongoose from 'mongoose';
import CanadaHBL from '../models/CanadaHBL.js';

// Connect to different DB
const canadaDB = mongoose.connection.useDb('canada_client'); // New DB name in same instance

const HLManifest = canadaDB.model('HLManifest', CanadaHBL.schema); // Use model on new DB

// Create new manifest
export const createManifest = async (req, res) => {
  try {
    const { hbls } = req.body;

    // Calculate totals
    let totalWeight = 0;
    let totalCBM = 0;

    hbls.forEach(hbl => {
      hbl.references.forEach(ref => {
        totalWeight += ref.weight || 0;
        totalCBM += (ref.cbmPerPackage || 0) * (ref.noOfPackages || 0);
      });
    });

    const newManifest = await HLManifest.create({
      hbls,
      totalWeight,
      totalCBM
    });

    res.status(201).json({ success: true, data: newManifest });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all manifests (optional for list/view)
export const getAllManifests = async (req, res) => {
  try {
    const manifests = await HLManifest.find().sort({ createdAt: -1 });
    res.json({ success: true, data: manifests });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};