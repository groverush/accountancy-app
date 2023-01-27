const asyncHandler = require("express-async-handler")
const Client = require("../models/Client")
const Service = require("../models/Service")
// GET
const getServices = async (req, res) => {
  try {
    const services = await Service.find({ client: req.user.id })
    res.status(200).json(services)
  } catch (error) {
    console.log(error)
  }
}

const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    res.status(200).json(service)
  } catch (error) {
    console.log(error)
  }
}
// POST

// const setClient = asyncHandler(async (req, res) => {
//   if (!req.body.text) {
//     res.status(400)
//     throw new Error("Please fill the fields")
//   }
//   res.status(200).json({ message: "Post request" })
// })

const setService = async (req, res) => {
  try {
    if (!req.body.name || !req.body.documents) {
      res.status(400)
      throw new Error("Please add the fields")
    }
    let service = await Service.create({
      name: req.body.name,
      documents: req.body.documents,
      client: req.user.id,
    })

    res.json(service)
  } catch (error) {
    console.log(error)
  }
}

// UPDATE

const updateService = async (req, res) => {
  try {
    const { name, documents } = req.body
    let service = await Service.findById(req.params.id)
    if (!service) {
      res.status(404)
      throw new Error("The service doesn't exist")
    }

    const client = await Client.findById(req.user.id)
    // check for client
    if (!client) {
      res.status(401)
      throw new Error("Client not found")
    }

    // make sure the logged in client matches the service

    if (service.client.toString() !== client.id) {
      res.status(401)
      throw new Error("Client no authorized")
    }
    service.name = name
    service.documents = documents

    service = await Service.findOneAndUpdate({ _id: req.params.id }, service, {
      new: true,
    })
    res.json(service)
  } catch (error) {
    console.log(error)
    res.status(500)
    throw new Error("There was an error with data")
  }
}
// const updateClient = asyncHandler(async (req, res) => {
//   res.status(200).json({ message: `update request ${req.params.id}` })
// })

// DELETE

const deleteService = async (req, res) => {
  try {
    let service = await Service.findById(req.params.id)
    if (!service) {
      res.status(404)
      throw new Error("The service does not exists")
    }

    const client = await Client.findById(req.user.id)
    // check for client
    if (!client) {
      res.status(401)
      throw new Error("Client not found")
    }

    // make sure the logged in client matches the service

    if (service.client.toString() !== client.id) {
      res.status(401)
      throw new Error("Client no authorized")
    }
    await Service.findByIdAndRemove({ _id: req.params.id })
    res.json({ msg: "Delete success" })
  } catch (error) {
    console.log(error)
    res.status(500)
    throw new Error("Error not found")
  }
}
// const deleteClient = asyncHandler(async (req, res) => {
//   res.status(200).json({ message: `delete request ${req.params.id}` })
// })

module.exports = {
  getServices,
  getService,
  setService,
  updateService,
  deleteService,
}
