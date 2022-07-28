import mongoose, { Schema } from 'mongoose';
import Animal from '../interfaces/interfaces';

const schema: Schema = new Schema({
  url: { type: String, required: true },
  size: {
    width: { type: Number },
    height: { type: Number }
  }

},
{
  timestamps: true
});

export default mongoose.model<Animal>('Animals', schema);
