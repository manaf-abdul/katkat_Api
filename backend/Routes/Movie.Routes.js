import express from "express";
const router = express.Router()
import { createMovie, createSeriesChapter, getMovieById } from '../Controllers/Movie.Controller.js'
import { s3StorageImages, s3StorageMovies } from "../Middlewares/S3.js";

router.post("/create", s3StorageImages.fields([
    { name: "posterImage", maxCount: 1 },
    { name: "video", maxCount: 1 }
]), createMovie)

router.post("/createSeason", s3StorageMovies.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 }
]), createSeriesChapter)

router.get("/:id", getMovieById)

export default router