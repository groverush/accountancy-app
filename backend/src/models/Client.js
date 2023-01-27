const mongoose = require("mongoose")
const { Schema } = mongoose
const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registro: { type: Date, default: Date.now() },
})

const Client = mongoose.model("Client", clientSchema)

module.exports = Client
