import express from "express"
import activityRoutes from "./routes/activity.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/", activityRoutes)

app.listen(8080, () => {
    console.log("servidor rodando")
})