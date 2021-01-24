import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const categorySchema = new Schema({
  userId: {type: ObjectId, required: true},
  name: {type: String, required: true},
  color: {type: String, required: true},
  cities: {type: [ObjectId], required: true}
})

export default mongoose.models.Category || mongoose.model('Category', categorySchema, 'categories')
