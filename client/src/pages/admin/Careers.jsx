import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  ExpandMore as ExpandMoreIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Description as DescriptionIcon,
  Link as LinkIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import jobListings from "../../data/jobListings";

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);
  const [applicationStats, setApplicationStats] = useState({
    total: 0,
    pending: 0,
    shortlisted: 0,
    rejected: 0,
    hired: 0,
    recentApplications: 0,
  });
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    description: "",
    requirements: "",
    responsibilities: "",
    salary: "",
    status: "open",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchCareers();
    fetchApplications();
    fetchApplicationStats();
  }, []);

  const fetchCareers = async () => {
    try {
      // Use the shared jobListings data instead of API call
      setCareers(jobListings);
      setError("");
    } catch (error) {
      setError("Failed to fetch careers");
      console.error("Error fetching careers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      setApplicationsLoading(true);
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`${API_BASE_URL}/api/applications`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setApplications(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch applications');
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to fetch applications",
        severity: "error",
      });
    } finally {
      setApplicationsLoading(false);
    }
  };

  const fetchApplicationStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/api/applications/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setApplicationStats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching application stats:", error);
    }
  };

  const handleOpen = (career = null) => {
    if (career) {
      setSelectedCareer(career);
      setFormData({
        title: career.title,
        department: career.department,
        location: career.location,
        type: career.type,
        description: career.description,
        requirements: career.requirements ? career.requirements.join('\n') : "",
        responsibilities: career.responsibilities || "",
        salary: career.salary || "",
        status: career.status || "open",
      });
    } else {
      setSelectedCareer(null);
      setFormData({
        title: "",
        department: "",
        location: "",
        type: "",
        description: "",
        requirements: "",
        responsibilities: "",
        salary: "",
        status: "open",
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCareer(null);
    setFormData({
      title: "",
      department: "",
      location: "",
      type: "",
      description: "",
      requirements: "",
      responsibilities: "",
      salary: "",
      status: "open",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCareer) {
        // Update existing career
        const updatedCareers = careers.map(career => 
          career.id === selectedCareer.id 
            ? { ...career, ...formData, requirements: formData.requirements.split('\n').filter(req => req.trim()) }
            : career
        );
        setCareers(updatedCareers);
        setSnackbar({
          open: true,
          message: "Career updated successfully",
          severity: "success",
        });
      } else {
        // Add new career
        const newCareer = {
          id: `career_${Date.now()}`, // Generate unique ID
          ...formData,
          requirements: formData.requirements.split('\n').filter(req => req.trim())
        };
        setCareers([...careers, newCareer]);
        setSnackbar({
          open: true,
          message: "Career created successfully",
          severity: "success",
        });
      }
      handleClose();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Operation failed",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this career posting?")) {
      try {
        const updatedCareers = careers.filter(career => career.id !== id);
        setCareers(updatedCareers);
        setSnackbar({
          open: true,
          message: "Career deleted successfully",
          severity: "success",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Failed to delete career",
          severity: "error",
        });
      }
    }
  };

  const handleApplicationClick = (application) => {
    setSelectedApplication(application);
    setApplicationDialogOpen(true);
  };

  const handleApplicationStatusChange = async (applicationId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.put(`${API_BASE_URL}/api/applications/${applicationId}/status`, {
        status: newStatus,
        notes: selectedApplication?.notes || ""
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        // Update local state
        const updatedApplications = applications.map(app => 
          app._id === applicationId ? { ...app, status: newStatus } : app
        );
        setApplications(updatedApplications);
        
        // Update selected application
        if (selectedApplication && selectedApplication._id === applicationId) {
          setSelectedApplication({ ...selectedApplication, status: newStatus });
        }

        setSnackbar({
          open: true,
          message: `Application status updated to ${newStatus}`,
          severity: "success",
        });

        // Refresh stats
        fetchApplicationStats();
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to update application status",
        severity: "error",
      });
    }
  };

  const handleDeleteApplication = async (applicationId) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        const token = localStorage.getItem('adminToken');
        
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.delete(`${API_BASE_URL}/api/applications/${applicationId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          const updatedApplications = applications.filter(app => app._id !== applicationId);
          setApplications(updatedApplications);
          setApplicationDialogOpen(false);
          
          setSnackbar({
            open: true,
            message: "Application deleted successfully",
            severity: "success",
          });

          // Refresh stats
          fetchApplicationStats();
        }
      } catch (error) {
        console.error("Error deleting application:", error);
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Failed to delete application",
          severity: "error",
        });
      }
    }
  };

  const handleRefreshApplications = () => {
    fetchApplications();
    fetchApplicationStats();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "success";
      case "closed":
        return "error";
      case "draft":
        return "warning";
      default:
        return "default";
    }
  };

  const getApplicationStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "shortlisted":
        return "info";
      case "rejected":
        return "error";
      case "hired":
        return "success";
      default:
        return "default";
    }
  };

  const getDepartmentColor = (department) => {
    switch (department) {
      case "engineering":
        return "primary";
      case "design":
        return "secondary";
      case "marketing":
        return "success";
      case "sales":
        return "warning";
      case "product":
        return "info";
      case "data":
        return "error";
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ flexGrow: 1, py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Careers Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Career
        </Button>
      </Box>

      {/* Tabs for Careers and Applications */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
          <Tab label="Job Postings" />
          <Tab label={`Applications (${applications.length})`} />
        </Tabs>
      </Box>

      {selectedTab === 0 && (
        <>
          {/* Career Statistics */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Career Statistics
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Chip label={`Total: ${careers.length}`} color="primary" />
              <Chip label={`Engineering: ${careers.filter(c => c.department === 'engineering').length}`} color="primary" />
              <Chip label={`Design: ${careers.filter(c => c.department === 'design').length}`} color="secondary" />
              <Chip label={`Marketing: ${careers.filter(c => c.department === 'marketing').length}`} color="success" />
              <Chip label={`Sales: ${careers.filter(c => c.department === 'sales').length}`} color="warning" />
              <Chip label={`Product: ${careers.filter(c => c.department === 'product').length}`} color="info" />
              <Chip label={`Data: ${careers.filter(c => c.department === 'data').length}`} color="error" />
            </Box>
          </Box>

          {/* Careers Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {careers.map((career) => (
                  <TableRow key={career.id}>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {career.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={career.department} 
                        color={getDepartmentColor(career.department)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{career.location}</TableCell>
                    <TableCell>{career.type}</TableCell>
                    <TableCell>
                      <Chip 
                        label={career.status || "open"} 
                        color={getStatusColor(career.status || "open")}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpen(career)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(career.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Detailed Career Cards */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Detailed Career Information
            </Typography>
            {careers.map((career) => (
              <Accordion key={career.id} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
                    <Typography variant="h6">{career.title}</Typography>
                    <Chip 
                      label={career.department} 
                      color={getDepartmentColor(career.department)}
                      size="small"
                    />
                    <Chip 
                      label={career.location} 
                      variant="outlined"
                      size="small"
                    />
                    <Chip 
                      label={career.type} 
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpen(career)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(career.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                  
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Description:</strong>
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {career.description}
                  </Typography>
                  
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Requirements:</strong>
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {career.requirements.map((req, index) => (
                      <Typography key={index} component="li" variant="body2">
                        {req}
                      </Typography>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </>
      )}

      {selectedTab === 1 && (
        <>
          {/* Application Statistics */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Application Statistics
              </Typography>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={handleRefreshApplications}
                disabled={applicationsLoading}
              >
                Refresh
              </Button>
            </Box>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Chip label={`Total: ${applicationStats.total}`} color="primary" />
              <Chip label={`Pending: ${applicationStats.pending}`} color="warning" />
              <Chip label={`Shortlisted: ${applicationStats.shortlisted}`} color="info" />
              <Chip label={`Hired: ${applicationStats.hired}`} color="success" />
              <Chip label={`Rejected: ${applicationStats.rejected}`} color="error" />
              <Chip label={`Recent (7 days): ${applicationStats.recentApplications}`} color="secondary" />
            </Box>
          </Box>

          {/* Applications Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Candidate Name</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Applied Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applicationsLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <CircularProgress size={24} />
                    </TableCell>
                  </TableRow>
                ) : applications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body2" color="text.secondary">
                        No applications found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  applications.map((application) => (
                    <TableRow key={application._id}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Avatar sx={{ width: 32, height: 32 }}>
                            <PersonIcon />
                          </Avatar>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {application.candidateName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{application.jobTitle}</TableCell>
                      <TableCell>
                        <Chip 
                          label={application.department} 
                          color={getDepartmentColor(application.department)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{formatDate(application.appliedDate)}</TableCell>
                      <TableCell>
                        <Chip 
                          label={application.status} 
                          color={getApplicationStatusColor(application.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{application.experience}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleApplicationClick(application)}>
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedCareer ? "Edit Career" : "Add New Career"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <TextField
              fullWidth
              label="Requirements (one per line)"
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <TextField
              fullWidth
              label="Responsibilities"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Salary"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              margin="normal"
              select
              SelectProps={{ native: true }}
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedCareer ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Application Details Dialog */}
      <Dialog open={applicationDialogOpen} onClose={() => setApplicationDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Application Details - {selectedApplication?.candidateName}
        </DialogTitle>
        <DialogContent>
          {selectedApplication && (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <Avatar sx={{ width: 64, height: 64 }}>
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedApplication.candidateName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Applied for {selectedApplication.jobTitle}
                  </Typography>
                  <Chip 
                    label={selectedApplication.status} 
                    color={getApplicationStatusColor(selectedApplication.status)}
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Button
                  variant="outlined"
                  onClick={() => handleApplicationStatusChange(selectedApplication._id, 'shortlisted')}
                  disabled={selectedApplication.status === 'shortlisted'}
                >
                  Shortlist
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => handleApplicationStatusChange(selectedApplication._id, 'hired')}
                  disabled={selectedApplication.status === 'hired'}
                >
                  Hire
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleApplicationStatusChange(selectedApplication._id, 'rejected')}
                  disabled={selectedApplication.status === 'rejected'}
                >
                  Reject
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteApplication(selectedApplication._id)}
                >
                  Delete
                </Button>
              </Box>

              <List>
                <ListItem>
                  <ListItemAvatar>
                    <EmailIcon />
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Email" 
                    secondary={selectedApplication.email} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <PhoneIcon />
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Phone" 
                    secondary={selectedApplication.phone} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <WorkIcon />
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Experience" 
                    secondary={selectedApplication.experience} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <DescriptionIcon />
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Resume" 
                    secondary={selectedApplication.resume} 
                  />
                </ListItem>
                {selectedApplication.portfolio && (
                  <ListItem>
                    <ListItemAvatar>
                      <LinkIcon />
                    </ListItemAvatar>
                    <ListItemText 
                      primary="Portfolio" 
                      secondary={
                        <a href={selectedApplication.portfolio} target="_blank" rel="noopener noreferrer">
                          {selectedApplication.portfolio}
                        </a>
                      } 
                    />
                  </ListItem>
                )}
              </List>

              <Divider sx={{ my: 2 }} />

              {selectedApplication.skills && selectedApplication.skills.length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Skills
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                    {selectedApplication.skills.map((skill, index) => (
                      <Chip key={index} label={skill} size="small" />
                    ))}
                  </Box>
                </>
              )}

              <Typography variant="h6" gutterBottom>
                Cover Letter
              </Typography>
              <Typography variant="body2" paragraph>
                {selectedApplication.coverLetter}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Notes
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={selectedApplication.notes || ""}
                onChange={(e) => {
                  const updatedApplications = applications.map(app => 
                    app._id === selectedApplication._id 
                      ? { ...app, notes: e.target.value }
                      : app
                  );
                  setApplications(updatedApplications);
                  setSelectedApplication({ ...selectedApplication, notes: e.target.value });
                }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApplicationDialogOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Careers; 