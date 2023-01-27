const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv").config()
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")

const port = process.env.PORT || 8000

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/v1/client", require("./routes/clientRoutes"))
app.use("/api/v1/service", require("./routes/serviceRoutes"))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})