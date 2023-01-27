const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const Client = require("../models/Client")

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1]

      // verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get client from the token

      req.user = await Client.findById(decoded.id).select("-password")

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error("Not authorized")
    }
  }
  if (!token) {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
})

module.exports = { protect }
