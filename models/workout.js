import mongoose, { models, Schema } from 'mongoose'

const workoutSchema = new Schema({
    workoutId: { type: String, required: true },
    name: { type: String, required: true },
    exercises: { type: [String], required: true },
})

const Workout = models.Workout || mongoose.model('Workout', workoutSchema);
export default Workout;