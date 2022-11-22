import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export const seriesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            lowercase: true,
        },
        description: {
            type: String,
            minlength: 200,
        },
        duration: {
            type: String,
            default: 5
        },
        image: {},
        video: {},
        free_preview: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);


export const castSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            lowercase: true,
        },
        role: {
            type: String,
            lowercase: true,
        },
        image: {},
    },
    { timestamps: true }
);


const movieModel = new mongoose.Schema(
    {
        title: {
            type: String,
            default: null
        },
        slug: {
            type: String,
            lowercase: true,
        },
        description: {
            type: String,
            default: null,
        },
        release_date: {
            type: String,
            default: null
        },
        status: {
            type: String,
            default: null
        },
        rating: {
            type: Number,
            default: 5
        },
        language: {
            type: String,
            default: 5
        },
        duration: {
            type: String,
            default: 5
        },
        isSeries: {
            type: Boolean,
            default: false
        },
        director:{
            type: String,
            default: 5
        },
        posterImage: {},
        video: {},
        cast:[castSchema],
        series: [seriesSchema],
    }, {
    timestamps: true
}
)

const Movie = mongoose.model("Movie", movieModel)
export default Movie