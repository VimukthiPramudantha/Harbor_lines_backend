// backend/models/SeaImportJob.js
import mongoose from 'mongoose';

const seaImportJobSchema = new mongoose.Schema({
  jobNum: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  jobDate: { type: Date, default: Date.now },
  finalizeDate: Date,
  jobCategory: {
    type: String,
    enum: ['SOC', 'Freight Forwarding', 'Car Carrier', 'Casual Caller', 'Transhipment', 'Main Line', 'FF + Clearing', 'NVOCC'],
    default: 'Freight Forwarding'
  },
  vesselId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vessel' },
  vesselName: String,
  voyage: String,

  // Loading Vessel
  portDepartureId: { type: mongoose.Schema.Types.ObjectId, ref: 'SeaDestination' },
  portDepartureName: String,
  portDischargeId: { type: mongoose.Schema.Types.ObjectId, ref: 'SeaDestination' },
  portDischargeName: String,
  originAgentId: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerSupplier' },
  originAgentName: String,
  carrierId: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerSupplier' },
  carrierName: String,
  shipAgentId: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerSupplier' },
  shipAgentName: String,

  // Final Destination
  principleCustomerId: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerSupplier' },
  principleCustomerName: String,
  localAgentId: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerSupplier' },
  localAgentName: String,

  // Additional Details
  etaDateTime: Date,
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  loadingVoyage: String,
  lastPortEtd: Date,
  cargoCategory: { type: String, enum: ['Console', 'Co-loads', 'FCL'], default: 'FCL' },
  commodity: { type: String, enum: ['Cargo', 'General Cargo'], default: 'General Cargo' },
  currency: String,
  exchangeRate: Number,
  terminalRef: String,
  service: String,
  terminal: { type: String, enum: ['JCT', 'UCT', 'SAGT', 'CICT', 'CWIT'], default: 'JCT' },
  slpaReference: String,
  numContainers: Number,
  impNo: String,

  // NEW: Port of Loading Information
  portOfLoadingId: { type: mongoose.Schema.Types.ObjectId, ref: 'SeaDestination' },
  portOfLoadingName: String,
  mblNumber: {
    type: String,
    trim: true,
    uppercase: true
  }
}, { 
  timestamps: true 
});

// Indexes
seaImportJobSchema.index({ jobNum: 1 }, { unique: true });
seaImportJobSchema.index({ mblNumber: 1 }, { unique: true, sparse: true }); // optional: make MBL unique

export default mongoose.model('SeaImportJob', seaImportJobSchema);