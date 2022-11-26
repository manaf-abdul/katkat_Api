import Movie from '../Models/Movie.model.js'

export const createMovie = async (req, res) => {
    try {
        console.log("req.files", req.files["video"][0]);
        console.log("req.file", req.filess);
        console.log("req.body", req.body);
        const { isSeries, release_date, director,
            status, duration, title,
            language, description, rating
        } = req.body
        let newMovie = new Movie({
            isSeries, release_date, director,
            status, duration, title,
            language, description, rating,
            video: req.files && req.files["video"] ? req.files["video"][0] : null,
            posterImage: req.files && req.files["posterImage"] ? req.files["posterImage"][0] : null
        })
        newMovie = newMovie.save()
        return res.status(200).json({ errorcode: 0, status: false, msg: "Created Successfully", data: newMovie })
    } catch (e) {
        return res.status(200).json({ errorcode: 5, status: false, msg: e, data: e });
    }
};

export const createSeriesChapter = async (req, res) => {
    try {
        // const { id } = req.params
        // console.log("req",req.body);
        // console.log("req files",req.files);
        const { id,title, description, duration, freePreview } = req.body;
        let data = await Movie.findById(id)
        if (!data.isSeries) return res.status(200).json({ errorcode: 2, status: false, msg: "Not a Series", data: null })
        let uptObj = {
            title:title,
            description:description,
            duration:duration,
            freePreview:freePreview,
            video: req.files && req.files["video"] ? req.files["video"][0] : null,
            image: req.files && req.files["image"] ? req.files["image"][0] : null
        }
        data = await Movie.updateOne({ _id: id }, { $push: { series: uptObj } })
        return res.status(200).json({ errorcode: 0, status: true, msg: "Created new Season Successfully", data: data });
    } catch (e) {
        return res.status(200).json({ errorcode: 5, status: false, msg: e, data: e });
    }
};

export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params
        let movie = await Movie.findById(id)
        return res.status(200).json({ errorcode: 0, status: false, msg: "Fetched Successfully", data: movie })
    } catch (e) {
        return res.status(200).json({ errorcode: 5, status: false, msg: e, data: e });
    }
};

export const getMovies = async (req, res) => {
    try {
        let movie = await Movie.find()
        console.log("movir0",movie);
        return res.status(200).json({ errorcode: 0, status: false, msg: "Fetched Successfully", data: movie })
    } catch (e) {
        return res.status(200).json({ errorcode: 5, status: false, msg: e, data: e });
    }
};