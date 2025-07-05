const Client = require("../models/Client");

// Get all clients
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    res.json({
      success: true,
      data: clients,
      message: "Clients fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch clients",
      error: error.message,
    });
  }
};

// Get client by ID
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    res.json({
      success: true,
      data: client,
      message: "Client fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching client:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch client",
      error: error.message,
    });
  }
};

// Create new client
const createClient = async (req, res) => {
  try {
    const clientData = {
      ...req.body,
      createdBy: req.admin.id,
    };

    const client = new Client(clientData);
    await client.save();

    const populatedClient = await Client.findById(client._id).populate(
      "createdBy",
      "name email"
    );

    res.status(201).json({
      success: true,
      data: populatedClient,
      message: "Client created successfully",
    });
  } catch (error) {
    console.error("Error creating client:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Client with this email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create client",
      error: error.message,
    });
  }
};

// Update client
const updateClient = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      updatedBy: req.admin.id,
    };

    const client = await Client.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    res.json({
      success: true,
      data: client,
      message: "Client updated successfully",
    });
  } catch (error) {
    console.error("Error updating client:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Client with this email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update client",
      error: error.message,
    });
  }
};

// Delete client
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    res.json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete client",
      error: error.message,
    });
  }
};

// Get client statistics
const getClientStats = async (req, res) => {
  try {
    const totalClients = await Client.countDocuments();
    const activeClients = await Client.countDocuments({ status: "active" });
    const inactiveClients = await Client.countDocuments({ status: "inactive" });
    const prospectClients = await Client.countDocuments({ status: "prospect" });

    // Get recent clients (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentClients = await Client.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    });

    // Get total contract value
    const totalContractValue = await Client.aggregate([
      { $group: { _id: null, total: { $sum: "$contractValue" } } },
    ]);

    const stats = {
      total: totalClients,
      active: activeClients,
      inactive: inactiveClients,
      prospect: prospectClients,
      recent: recentClients,
      totalContractValue: totalContractValue[0]?.total || 0,
    };

    res.json({
      success: true,
      data: stats,
      message: "Client statistics fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching client stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch client statistics",
      error: error.message,
    });
  }
};

// Search clients
const searchClients = async (req, res) => {
  try {
    const { query, status, industry } = req.query;

    let searchCriteria = {};

    if (query) {
      searchCriteria.$or = [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { industry: { $regex: query, $options: "i" } },
      ];
    }

    if (status) {
      searchCriteria.status = status;
    }

    if (industry) {
      searchCriteria.industry = industry;
    }

    const clients = await Client.find(searchCriteria)
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    res.json({
      success: true,
      data: clients,
      message: "Clients searched successfully",
    });
  } catch (error) {
    console.error("Error searching clients:", error);
    res.status(500).json({
      success: false,
      message: "Failed to search clients",
      error: error.message,
    });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientStats,
  searchClients,
};
