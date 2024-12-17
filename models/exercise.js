import mongoose, { models, Schema } from 'mongoose'

const exerciseSchema = new Schema({
    exerciseId: { type: String, required: true },
    name: { type: String, required: true },
    sets: { type: [String], required: true }
})

const Exercise = models.Exercise || mongoose.model('Exercise', exerciseSchema);
export default Exercise;