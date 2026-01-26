import mongoose from 'mongoose';

const exportJobSchema = new mongoose.Schema({
  jobNum: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  blNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  onBoardDate: {
    type: Date,
    required: true
  },
  deliveryApplyTo: {
    type: String,
    required: true
  },

  // Parties (references)
  shipperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomerSupplier',
    required: true
  },
  consigneeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomerSupplier',
    required: true
  },
  notifyPartyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomerSupplier'
  },

  // Shipment info (can be auto-filled or manual)
  vesselVoyage: String,
  portLoading: String,
  portDischarge: String,
  placeDelivery: String,

  // Payment & B/L
  freightPayableAt: String,
  numOriginalBLs: {
    type: Number,
    min: 1,
    default: 3
  },

  // Cargo
  marksNumbers: String,
  containerSealNumbers: String,
  numPackages: Number,
  descriptionGoods: String,
  grossWeight: Number,
  measurementCBM: Number,

  status: {
    type: String,
    enum: ['Draft', 'Confirmed', 'Shipped', 'Cancelled'],
    default: 'Draft'
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('ExportJob', exportJobSchema);