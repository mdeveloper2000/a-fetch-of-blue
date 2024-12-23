import express from "express"
import mongoose from "mongoose"
import router from "./routes/routes.js"

const app = express()
app.use(express.static("public"))
app.use(express.json())

mongoose.set("strictQuery", true)
const database = process.env.DATABASE
mongoose.connect(database)
    .then((result) => app.listen(process.env.PORT || 8000))    
    .catch((error) => console.log(error))

app.use(router)