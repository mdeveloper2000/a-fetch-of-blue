import Movie from "../models/Movie.js"

export const list = async (req, res) => {
    try {
        const movies = await Movie.find({}).sort({year: 'desc'}).limit(4)
        res.send(movies)
    }
    catch(error) {
        console.log(error)
    }
}

export const search = async (req, res) => {
    try {
        const search = req.params.search
        const movies = await Movie.find({title: new RegExp(search, 'i')}).limit(8)
        res.send(movies)
    }
    catch(error) {
        console.log(error)
    }
}

export const show = async (req, res) => {
    try {
        const movie = await Movie.findById({_id: req.params.id})        
        if(movie) {
            const moviecast = movie.cast.split(",")
            const protagonist = moviecast[0]
            const suggestions = await Movie.find({ cast: new RegExp(protagonist, 'i') }).where({_id: {$ne: movie._id}}).limit(12)
            res.status(200).send({ movie, suggestions, errors:  0 })
        }
        else {
            res.status(500).send({ errors: 1 })
        }
    }
    catch(error) {
        console.log(error)
        res.status(500).send({ errors: 1 })
    }
}

export const show_recently = async (req, res) => {
    try {
        const recently_movies = await Movie.find({_id: {$in: req.params.ids.split(",")}}, 'title gallery')
        res.send(recently_movies)
    }
    catch(error) {
        console.log(error)
    }
}