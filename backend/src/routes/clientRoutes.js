const express = require("express")
const router = express.Router()
const {
  getClients,
  getClient,
  signUp,
  loginIn,
  getMe,
  updateClient,
  deleteClient,
} = require("../controllers/clientController")
const { protect } = require("../middleware/authMiddleware")

router.post("/signUp", signUp)
router.post("/login", loginIn)
router.get("/me", protect, getMe)

module.exports = router
