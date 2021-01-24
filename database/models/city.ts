import mongoose from 'mongoose';

const { Schema } = mongoose;

const citySchema = new Schema({
  name: {type: String, required: true},
  country: {type: String, required: true},
  coordinates: {type: [Number], required: true}
})

export default mongoose.models.City || mongoose.model('City', citySchema, 'cities')
