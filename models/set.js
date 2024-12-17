import mongoose, { models, Schema } from 'mongoose'

const setSchema = new Schema({
    setId: { type: String, required: true },
    setNumber: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true }
})

const Set = models.Set || mongoose.model('Set', setSchema);
export default Set;