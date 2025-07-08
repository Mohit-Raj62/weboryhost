import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import axios from 'axios';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    socialLinks: { facebook: '', twitter: '', linkedin: '', instagram: '' },
    theme: { primaryColor: '', secondaryColor: '' },
    features: { enableBlog: true, enableNewsletter: true, enableContactForm: true },
    maintenanceMode: false,
    allowRegistration: true,
    maxLoginAttempts: 5,
    sessionTimeout: 30,
    emailNotifications: true,
    customFooterText: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    fetchSettings();
    fetchActivityLog();
    // eslint-disable-next-line
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/admin/settings');
      setSettings({
        ...settings,
        ...response.data,
        socialLinks: { ...settings.socialLinks, ...response.data.socialLinks },
        theme: { ...settings.theme, ...response.data.theme },
        features: { ...settings.features, ...response.data.features },
      });
      setError('');
    } catch (error) {
      setError('Error loading settings');
      showSnackbar('Error loading settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchActivityLog = async () => {
    try {
      const res = await axios.get('/api/admin/activity-log');
      setActivityLog(res.data);
    } catch (e) {
      // ignore
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (name.startsWith('socialLinks.')) {
      const key = name.split('.')[1];
      setSettings((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [key]: value },
      }));
    } else if (name.startsWith('theme.')) {
      const key = name.split('.')[1];
      setSettings((prev) => ({
        ...prev,
        theme: { ...prev.theme, [key]: value },
      }));
    } else if (name.startsWith('features.')) {
      const key = name.split('.')[1];
      setSettings((prev) => ({
        ...prev,
        features: { ...prev.features, [key]: type === 'checkbox' ? checked : value },
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.put('/api/admin/settings', settings);
      showSnackbar('Settings updated successfully');
      setError('');
    } catch (error) {
      setError('Error updating settings');
      showSnackbar('Error updating settings', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        System Settings
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                General Settings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Site Name"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Site Description"
                    name="siteDescription"
                    value={settings.siteDescription}
                    onChange={handleChange}
                    multiline
                    rows={2}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Contact Email"
                    name="contactEmail"
                    value={settings.contactEmail}
                    onChange={handleChange}
                    type="email"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                Social Links
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Facebook"
                    name="socialLinks.facebook"
                    value={settings.socialLinks.facebook || ''}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Twitter"
                    name="socialLinks.twitter"
                    value={settings.socialLinks.twitter || ''}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="LinkedIn"
                    name="socialLinks.linkedin"
                    value={settings.socialLinks.linkedin || ''}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Instagram"
                    name="socialLinks.instagram"
                    value={settings.socialLinks.instagram || ''}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                Theme
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Primary Color"
                    name="theme.primaryColor"
                    value={settings.theme.primaryColor || ''}
                    onChange={handleChange}
                    type="color"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Secondary Color"
                    name="theme.secondaryColor"
                    value={settings.theme.secondaryColor || ''}
                    onChange={handleChange}
                    type="color"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                Features
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.features.enableBlog}
                        onChange={handleChange}
                        name="features.enableBlog"
                      />
                    }
                    label="Enable Blog"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.features.enableNewsletter}
                        onChange={handleChange}
                        name="features.enableNewsletter"
                      />
                    }
                    label="Enable Newsletter"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.features.enableContactForm}
                        onChange={handleChange}
                        name="features.enableContactForm"
                      />
                    }
                    label="Enable Contact Form"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                Security Settings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Max Login Attempts"
                    name="maxLoginAttempts"
                    value={settings.maxLoginAttempts}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Session Timeout (minutes)"
                    name="sessionTimeout"
                    value={settings.sessionTimeout}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                System Preferences
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.maintenanceMode}
                        onChange={handleChange}
                        name="maintenanceMode"
                      />
                    }
                    label="Maintenance Mode"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.allowRegistration}
                        onChange={handleChange}
                        name="allowRegistration"
                      />
                    }
                    label="Allow User Registration"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.emailNotifications}
                        onChange={handleChange}
                        name="emailNotifications"
                      />
                    }
                    label="Email Notifications"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                Custom Footer Text
              </Typography>
              <TextField
                fullWidth
                label="Footer Text"
                name="customFooterText"
                value={settings.customFooterText || ''}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" color="primary" disabled={submitting}>
              {submitting ? <CircularProgress size={24} /> : 'Save Settings'}
            </Button>
          </Box>
        </form>
      </Paper>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Admin Activity Log
        </Typography>
        <Paper sx={{ p: 2, maxHeight: 300, overflow: 'auto' }}>
          {activityLog.length === 0 ? (
            <Typography>No recent admin activity.</Typography>
          ) : (
            activityLog.map((log) => (
              <Box key={log._id} sx={{ mb: 1 }}>
                <Typography variant="body2">
                  <b>{log.admin?.name || 'Unknown Admin'}</b> - {log.action} - {new Date(log.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {JSON.stringify(log.details)}
                </Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))
          )}
        </Paper>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings; 