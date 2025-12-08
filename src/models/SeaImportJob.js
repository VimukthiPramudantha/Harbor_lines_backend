// backend/models/SeaImportJob.js
import mongoose from 'mongoose';

const seaImportJobSchema = new mongoose.Schema({
  jobNum: {
    type: String,
    required: true,
    unique: true
  },
  jobDate: { type: Date, default: Date.now },
  finalizeDate: Date,
  jobCategory: {
    type: String,
    enum: ['SOC', 'Freight Forwarding', 'Car Carrier', 'Casual Caller', 'Transhipment', 'Main Line', 'FF + Clearing', 'NVOCC'],
    default: 'Freight Forwarding'
  },
  vesselId: String,
  vesselName: String,
  voyage: String,
  portDepartureId: String,
  portDepartureName: String,
  portDischargeId: String,
  portDischargeName: String,
  originAgentId: String,
  originAgentName: String,
  carrierId: String,
  carrierName: String,
  shipAgentId: String,
  shipAgentName: String,
  principleCustomerId: String,
  principleCustomerName: String,
  localAgentId: String,
  localAgentName: String,
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
  impNo: String
}, { timestamps: true });

export default mongoose.model('SeaImportJob', seaImportJobSchema);