const express = require("express")
const router = express.Router()
const {
  getServices,
  getService,
  setService,
  updateService,
  deleteService,
} = require("../controllers/serviceController")
const { protect } = require("../middleware/authMiddleware")
router.route("/").get(protect, getServices).post(protect, setService)
router
  .route("/:id")
  .get(protect, getService)
  .put(protect, updateService)
  .delete(protect, deleteService)

module.exports = router
