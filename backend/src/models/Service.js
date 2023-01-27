const mongoose = require("mongoose")
const { Schema } = mongoose

const serviceSchema = new Schema({
  client: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref: "Client",
  },
  name: {
    type: String,
    required: true,
  },
  documents: {
    type: Array,
    required: true,
  },
  registro: {
    type: Date,
    default: Date.now(),
  },
})

const Service = mongoose.model("Service", serviceSchema)
module.exports = Service
