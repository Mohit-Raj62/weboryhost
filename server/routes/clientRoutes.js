const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientStats,
  searchClients,
} = require("../controllers/clientController");

// Public routes (if needed)
// router.get('/public', getPublicClients);

// Admin routes (protected)
router.get("/", adminAuth, getAllClients);
router.get("/stats", adminAuth, getClientStats);
router.get("/search", adminAuth, searchClients);
router.get("/:id", adminAuth, getClientById);
router.post("/", adminAuth, createClient);
router.put("/:id", adminAuth, updateClient);
router.delete("/:id", adminAuth, deleteClient);

module.exports = router;
