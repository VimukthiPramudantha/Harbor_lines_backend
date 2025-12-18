// backend/models/SeaImportJob.js
import mongoose from 'mongoose';

const containerSchema = new mongoose.Schema({
  sno: { type: Number, required: true },
  containerNo: { 
    type: String, 
    required: true 
  },
  containerType: { 
    type: String, 
    required: true,
    enum: [
      '45HC', '45 Reefer', '45 GP', 'AIR Freight',
      '40 HC', '40 OT', '40 Reefdry', '40 Flat Rack', '40 Flat', '40 GP',
      '20 Vertical', '20 OT', '20 Reefdry', '20 Flat', '20 GP'
    ]
  },
  sealNo: String,
  yardCode: String,
  yardName: String,
  fclLcl: {
    type: String,
    required: true,
    enum: ['FCL/FCL', 'FCL/LCL', 'LCL/LCL', 'MCC+Local', 'MCC+Full']
  },
  onAccount: String
}, { _id: false });

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
    enum: [
      'SOC', 'Freight Forwarding', 'Car Carrier',
      'Casual Caller', 'Transhipment', 'Main Line',
      'FF + Clearing', 'NVOCC'
    ],
    default: 'Freight Forwarding'
  },

  vesselId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vessel' },
  vesselName: String,
  voyage: String,

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

  principleCustomerId: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerSupplier' },
  principleCustomerName: String,
  localAgentId: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerSupplier' },
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
  terminal: {
    type: String,
    enum: ['JCT', 'UCT', 'SAGT', 'CICT', 'CWIT'],
    default: 'JCT'
  },
  slpaReference: String,
  numContainers: Number,
  impNo: String,

  portOfLoadingId: { type: mongoose.Schema.Types.ObjectId, ref: 'SeaDestination' },
  portOfLoadingName: String,
  mblNumber: { type: String, uppercase: true, trim: true },

  containers: [containerSchema]
}, { 
  timestamps: true 
});

seaImportJobSchema.index(
  { mblNumber: 1 },
  { unique: true, sparse: true }
);

export default mongoose.model('SeaImportJob', seaImportJobSchema);
