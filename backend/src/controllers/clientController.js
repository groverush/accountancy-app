const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const Client = require("../models/Client")
// GET
const getClients = async (req, res) => {
  try {
    const clients = await Client.find()
    res.status(200).json(clients)
  } catch (error) {
    console.log(error)
  }
}

const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
    res.status(200).json(client)
  } catch (error) {
    console.log(error)
  }
}

// POST
const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  //  check if user exists

  const clientExists = await Client.findOne({ email })
  if (clientExists) {
    res.status(400)
    throw new Error("Client already exists")
  }

  // hash password

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create client

  const client = await Client.create({
    name,
    email,
    password: hashedPassword,
  })

  if (client) {
    res.status(200).json({
      _id: client.id,
      name: client.name,
      email: client.email,
      token: generateToken(client._id),
    })
    console.log(client)
  } else {
    res.status(400)
    throw new Error("Invalid client data")
  }
})

// AUTH USER

const loginIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // check for user email
  const client = await Client.findOne({ email })

  if (client && (await bcrypt.compare(password, client.password))) {
    res.status(200).json({
      _id: client.id,
      name: client.name,
      email: client.email,
      token: generateToken(client._id),
    })
    console.log(client.token)
  } else {
    res.status(400)
    throw new Error("Invalid client credentials")
  }
})

//  GET ME
//  Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await Client.findById(req.user.id)
  res.status(200).json({
    _id,
    name,
    email,
  })
})

//  GENERATE JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

// UPDATE

const updateClient = async (req, res) => {
  try {
    const { name, email, password } = req.body
    let client = await Client.findById(req.params.id)
    if (!client) {
      res.status(404).json({ msg: "El cliente no existe" })
    }
    client.name = name
    client.email = email
    client.password = password
    client = await Client.findOneAndUpdate({ _id: req.params.id }, client, {
      new: true,
    })
    res.json(client)
  } catch (error) {
    console.log(error)
    res.status(500)
    throw new Error("There was an error with data")
  }
}

// DELETE

const deleteClient = async (req, res) => {
  try {
    let client = await Client.findById(req.params.id)
    if (!client) {
      res.status(404)
      throw new Error("The client does not exists")
    }
    await Client.findByIdAndRemove({ _id: req.params.id })
    res.json({ msg: "Delete success" })
  } catch (error) {
    console.log(error)
    res.status(500)
    throw new Error("Error not found")
  }
}

module.exports = {
  getClients,
  getClient,
  signUp,
  loginIn,
  getMe,
  updateClient,
  deleteClient,
}
