import mongoose from "mongoose"

const Movie = new mongoose.model("Movie", new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },    
    cast: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    gallery: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
}))

export default Movie