import { Router } from "express"
import { list, search, show, show_recently } from "../controllers/movieController.js"

const router = Router()

router.get("/api", list)
router.get("/api/movies/search/:search", search)
router.get("/api/movie/:id", show)
router.get("/api/movies/:ids", show_recently)

export default router